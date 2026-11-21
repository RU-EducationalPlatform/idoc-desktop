import { test } from "node:test";
import assert from "node:assert/strict";
import { classify, isRelease, summarise, countedFor, makeBaseline, renderBlock, spliceReadme, shieldsEndpoint, chartSvg, hasMarkers, START, END } from "./stats.mjs";

const asset = (name, n) => ({ name, download_count: n });
const rel = (tag, date, assets, extra = {}) => ({ tag_name: tag, published_at: date, draft: false, prerelease: false, assets, ...extra });
const RELEASES = [
  rel("v1.1.0", "2026-11-21", [asset("IDoc-1.1.0-arm64.dmg", 5), asset("IDoc-1.1.0.dmg", 2), asset("IDoc-Setup-1.1.0.exe", 2), asset("IDoc-1.1.0-x86_64.AppImage", 4), asset("idoc-autograde-0.1.4-darwin-arm64.tar.gz", 99), asset("latest.json", 40)]),
  rel("v1.0.0", "2026-11-17", [asset("IDoc-1.0.0-arm64.dmg", 7), asset("IDoc-Setup-1.0.0.exe", 2), asset("IDoc-1.0.0-x86_64.AppImage", 2)]),
  rel("editor-support", "2026-11-20", [asset("idoc.vsix", 50)], { prerelease: true }),
  rel("v1.2.0", "2026-11-22", [asset("IDoc-1.2.0.dmg", 1000)], { draft: true }),
  rel("packs-v1", "2026-11-01", [asset("python.tar.gz", 500)]),
];

test("only installers count, by platform", () => {
  assert.equal(classify("IDoc-1.1.0-arm64.dmg"), "mac");
  assert.equal(classify("IDoc-Setup-1.1.0.exe"), "win");
  assert.equal(classify("IDoc-1.1.0-x86_64.AppImage"), "linux");
  for (const n of ["idoc-autograde-0.1.4-win32-x64.zip", "latest.json", "manifest.json", "python.tar.gz", "voices.tar.gz", "IDoc-1.1.0-arm64.dmg.blockmap"]) assert.equal(classify(n), null, n);
});

test("a released version is a v-tag that is not a draft or a pre-release", () => {
  assert.deepEqual(RELEASES.filter(isRelease).map((r) => r.tag_name), ["v1.1.0", "v1.0.0"]);
});

test("totals, the latest release, and a chart series oldest to newest", () => {
  const s = summarise(RELEASES);
  assert.deepEqual(s.latest, { tag: "v1.1.0", mac: 7, win: 2, linux: 4 });
  assert.deepEqual(s.total, { mac: 14, win: 4, linux: 6 });
  assert.equal(s.all, 24);
  assert.deepEqual(s.series, [{ tag: "v1.0.0", count: 11 }, { tag: "v1.1.0", count: 13 }]);
});

test("the README block is spliced between its markers and nothing else moves", () => {
  const s = summarise(RELEASES);
  const readme = `top\n${START}\nold\n${END}\nbottom\n`;
  const out = spliceReadme(readme, renderBlock(s));
  assert.ok(out.startsWith("top\n") && out.endsWith("\nbottom\n"));
  assert.match(out, /\| macOS \| 7 \| 14 \|/);
  assert.match(out, /\*\*Total\*\* \| \*\*13\*\* \| \*\*24\*\*/);
  assert.doesNotMatch(out, /\bold\b/);
  assert.equal(spliceReadme(out, renderBlock(s)), out, "running it twice changes nothing: the daily job commits only when a number moved");
  assert.throws(() => spliceReadme("no markers", "x"), /markers/);
});

test("the badge file is a shields endpoint with the total", () => {
  assert.deepEqual(shieldsEndpoint(summarise(RELEASES)), { schemaVersion: 1, label: "downloads", message: "24", color: "5b49d6" });
});

test("the chart is a valid, self-contained SVG with one bar per release", () => {
  const svg = chartSvg(summarise(RELEASES).series);
  assert.match(svg, /^<svg [^>]*viewBox/);
  assert.equal((svg.match(/<rect /g) ?? []).length, 2);
});

test("a README without the markers is left alone: the count is shown nowhere until someone puts the markers back", () => {
  assert.equal(hasMarkers("# IDoc\nno markers here"), false);
  assert.equal(hasMarkers(`${END}\n${START}`), false, "in the wrong order is not a block");
  assert.equal(hasMarkers(`a\n${START}\nx\n${END}\n`), true);
});

test("our own downloads are filtered: only what comes after the baseline counts", () => {
  const baseline = makeBaseline(RELEASES, "2026-11-21");
  assert.equal(baseline.assets["IDoc-1.1.0-arm64.dmg"], 5);
  assert.equal(baseline.testers, 0);
  assert.equal(baseline.assets["latest.json"], undefined, "only installers are baselined");
  assert.equal(summarise(RELEASES, baseline).all, 0, "right after verifying, nothing is counted");
  const later = RELEASES.map((r) => ({ ...r, assets: r.assets.map((a) => a.name === "IDoc-1.1.0-arm64.dmg" ? { ...a, download_count: a.download_count + 3 } : a) }));
  const s = summarise(later, baseline);
  assert.deepEqual([s.all, s.latest.mac, s.total.win], [3, 3, 0], "three real downloads after the baseline");
});

test("an installer that is not in the baseline yet (a release we have not finished checking) counts as zero, never our own testing", () => {
  const baseline = makeBaseline(RELEASES, "2026-11-21");
  const fresh = [...RELEASES, rel("v1.1.1", "2026-11-23", [asset("IDoc-1.1.1.dmg", 9), asset("IDoc-Setup-1.1.1.exe", 4)])];
  const s = summarise(fresh, baseline);
  assert.equal(s.latest.tag, "v1.1.1");
  assert.equal(s.latest.mac + s.latest.win, 0);
});

test("a baseline never makes a count negative, and no baseline at all means raw counts", () => {
  assert.equal(countedFor({ name: "IDoc-1.0.0.dmg", download_count: 2 }, { assets: { "IDoc-1.0.0.dmg": 5 } }), 0);
  assert.equal(countedFor({ name: "IDoc-1.0.0.dmg", download_count: 2 }, undefined), 2);
});

test("the chart appears only once there is something to chart, and the note says when counting began", () => {
  const baseline = makeBaseline(RELEASES, "2026-11-21");
  const empty = renderBlock(summarise(RELEASES, baseline));
  assert.doesNotMatch(empty, /releases\.svg/);
  assert.match(empty, /counting began 2026-11-21/);
  assert.match(renderBlock(summarise(RELEASES)), /releases\.svg/, "raw counts have something to chart");
});

test("the early testers are counted once, as their own row, and real downloads add to them", () => {
  const baseline = makeBaseline(RELEASES, "2026-11-21", 10);
  assert.equal(baseline.testers, 10);
  const s = summarise(RELEASES, baseline);
  assert.deepEqual([s.testers, s.all, s.total.mac], [10, 10, 0]);
  const block = renderBlock(s);
  assert.match(block, /\| Early testers \| \| 10 \|/);
  assert.match(block, /\*\*Total\*\* \| \*\*0\*\* \| \*\*10\*\*/);
  const later = RELEASES.map((r) => ({ ...r, assets: r.assets.map((a) => a.name === "IDoc-1.1.0-arm64.dmg" ? { ...a, download_count: a.download_count + 2 } : a) }));
  assert.equal(summarise(later, baseline).all, 12, "ten testers and two real downloads");
  assert.deepEqual(shieldsEndpoint(summarise(later, baseline)).message, "12");
});
