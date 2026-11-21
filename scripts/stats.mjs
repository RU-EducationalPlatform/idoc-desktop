#!/usr/bin/env node
/**
 * Download statistics for this repository's installers, from GitHub's own release counters.
 *
 *   node scripts/stats.mjs              read the releases (GITHUB_TOKEN if set), rewrite stats/ and the README block (only if the README has the markers)
 *   node scripts/stats.mjs --check      the same, written nowhere: prints what it would write
 *
 * Counted: the installers a person downloads (macOS .dmg, Windows Setup .exe, Linux .AppImage) on released versions (v1.2.3).
 * Not counted: add-on packs, the command-line archives, the update feed, editor-support and any pre-release.
 * A count is a download, not a person: it includes re-downloads and this project's own release checks.
 * Deterministic on purpose: no date is written anywhere, so the daily job commits only when a number changed.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const PLATFORMS = [["mac", "macOS"], ["win", "Windows"], ["linux", "Linux"]];

/** Which platform an asset is the installer for, or null for anything that is not an installer. */
export function classify(name) {
  if (/\.dmg$/i.test(name)) return "mac";
  if (/^IDoc-Setup-[^/]+\.exe$/i.test(name)) return "win";
  if (/\.AppImage$/i.test(name)) return "linux";
  return null;
}

/** A released version: a v-tag that is neither a draft nor a pre-release. */
export const isRelease = (r) => /^v\d+\.\d+\.\d+$/.test(r.tag_name ?? "") && !r.draft && !r.prerelease;

/** Totals per platform for one release. */
export function releaseCounts(release) {
  const c = { mac: 0, win: 0, linux: 0 };
  for (const a of release.assets ?? []) { const p = classify(a.name); if (p) c[p] += Number(a.download_count) || 0; }
  return c;
}

/** Everything the README, the badge and the chart show. `releases` is the API's list, any order. */
export function summarise(releases) {
  const rel = releases.filter(isRelease).sort((a, b) => String(b.published_at).localeCompare(String(a.published_at)));
  const total = { mac: 0, win: 0, linux: 0 };
  const series = [];
  for (const r of rel) {
    const c = releaseCounts(r);
    for (const [p] of PLATFORMS) total[p] += c[p];
    series.push({ tag: r.tag_name, count: c.mac + c.win + c.linux });
  }
  const latest = rel[0] ? { tag: rel[0].tag_name, ...releaseCounts(rel[0]) } : { tag: "", mac: 0, win: 0, linux: 0 };
  const all = total.mac + total.win + total.linux;
  return { latest, total, all, series: series.slice(0, 12).reverse() };   // the chart reads oldest to newest
}

const sum = (c) => c.mac + c.win + c.linux;
const fmt = (n) => Number(n).toLocaleString("en-US");

/** The shields.io endpoint file: https://img.shields.io/endpoint?url=<raw url of this file>. */
export const shieldsEndpoint = (s) => ({ schemaVersion: 1, label: "downloads", message: fmt(s.all), color: "5b49d6" });

/** The README block between the markers: a table by platform and a note on what is counted. */
export function renderBlock(s) {
  const v = s.latest.tag || "latest";
  const rows = PLATFORMS.map(([p, label]) => `| ${label} | ${fmt(s.latest[p])} | ${fmt(s.total[p])} |`).join("\n");
  return [
    "### Downloads",
    "",
    `| Platform | ${v} | All releases |`,
    "|---|---:|---:|",
    rows,
    `| **Total** | **${fmt(sum(s.latest))}** | **${fmt(s.all)}** |`,
    "",
    '<img src="stats/releases.svg" alt="Installer downloads per release, last 12 releases" width="640">',
    "",
    "<sub>Counted from GitHub's own release counters: the installers only, not add-on packs or tools. A count is a download, not a person.</sub>",
  ].join("\n");
}

export const START = "<!-- stats:start -->", END = "<!-- stats:end -->";

/** Does the README carry the markers? Without them the README is left alone (the count is not shown anywhere). */
export const hasMarkers = (readme) => readme.includes(START) && readme.indexOf(END) > readme.indexOf(START);

/** Put `block` between the markers (kept), leaving everything else exactly as it was. */
export function spliceReadme(readme, block) {
  const i = readme.indexOf(START), j = readme.indexOf(END);
  if (i < 0 || j < i) throw new Error(`README.md needs the two markers ${START} and ${END}, in that order`);
  return `${readme.slice(0, i + START.length)}\n${block}\n${readme.slice(j)}`;
}

/** A small bar chart of installer downloads per release, as a self-contained SVG that reads in light and dark. */
export function chartSvg(series) {
  const W = 640, H = 150, pad = 28, base = H - 34, top = 20;
  const max = Math.max(1, ...series.map((p) => p.count));
  const gap = 8, bw = Math.max(8, Math.floor((W - 2 * pad - gap * (series.length - 1)) / Math.max(1, series.length)));
  const bars = series.map((p, i) => {
    const h = Math.round((p.count / max) * (base - top)), x = pad + i * (bw + gap), y = base - h;
    const last = i === series.length - 1;
    return `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="3" fill="${last ? "#5b49d6" : "#8b949e"}" opacity="${last ? 1 : 0.65}"/>`
      + `<text x="${x + bw / 2}" y="${y - 5}" font-size="11" text-anchor="middle" fill="#8b949e">${p.count}</text>`
      + `<text x="${x + bw / 2}" y="${H - 14}" font-size="10" text-anchor="middle" fill="#8b949e">${p.tag.replace(/^v/, "")}</text>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Installer downloads per release" font-family="-apple-system,Segoe UI,Helvetica,Arial,sans-serif"><line x1="${pad}" y1="${base}" x2="${W - pad}" y2="${base}" stroke="#8b949e" stroke-opacity=".4"/>${bars}</svg>\n`;
}

async function fetchReleases(token) {
  const out = [];
  for (let page = 1; ; page++) {
    const r = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPOSITORY || "RU-EducationalPlatform/idoc-desktop"}/releases?per_page=100&page=${page}`, {
      headers: { accept: "application/vnd.github+json", "user-agent": "idoc-desktop-stats", ...(token ? { authorization: `Bearer ${token}` } : {}) },
    });
    if (!r.ok) throw new Error(`GitHub answered ${r.status} for the release list`);
    const batch = await r.json();
    out.push(...batch);
    if (batch.length < 100) return out;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const releases = await fetchReleases(process.env.GITHUB_TOKEN);
  const s = summarise(releases);
  if (!releases.length || !s.series.length) throw new Error("no released versions found: refusing to overwrite the README with zeros");
  const files = { "stats/summary.json": JSON.stringify(s, null, 2) + "\n", "stats/downloads.json": JSON.stringify(shieldsEndpoint(s)) + "\n", "stats/releases.svg": chartSvg(s.series) };
  const current = readFileSync("README.md", "utf8");
  if (process.argv.includes("--check")) { console.log(renderBlock(s)); console.log(shieldsEndpoint(s)); process.exit(0); }
  mkdirSync("stats", { recursive: true });
  for (const [f, text] of Object.entries(files)) writeFileSync(f, text);
  if (hasMarkers(current)) writeFileSync("README.md", spliceReadme(current, renderBlock(s)));
  console.log(`total ${s.all}; latest ${s.latest.tag} ${sum(s.latest)}`);
}
