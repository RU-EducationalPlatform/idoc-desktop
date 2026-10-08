# IDoc editor and AI support

IDoc is a plain-text language, every command starting with `@`, for documents,
quizzes, auto-graded exams, slide decks and course files. This folder makes
editors highlight it and AI assistants write it correctly. Everything here is
generated from the IDoc editor's own catalog, so it matches the language the app
accepts.

| folder / file | what it is for |
|---|---|
| `llms.txt` | the complete IDoc reference, written for AI assistants |
| `claude/idoc/` | a Claude Agent Skill (`SKILL.md` + `reference.md`); `claude/idoc-skill.zip` is the same folder zipped |
| `vscode/idoc.vsix` | the extension for VS Code, Cursor, VSCodium and Windsurf: highlighting, completions, snippets, diagnostics |
| `vim/` | Vim and Neovim: filetype detection, syntax, comment settings |
| `textmate/` | the TextMate grammar, for Sublime Text, JetBrains IDEs, Zed and others |
| `agents/` | instruction files for coding agents: Claude Code, Codex and AGENTS.md readers, Cursor, Copilot, Gemini CLI, Windsurf |

Single files are also attached to the `editor-support` release, for short URLs:
https://github.com/RU-EducationalPlatform/idoc-desktop/releases/download/editor-support/

## Claude (Claude Code, Claude Agent SDK)

Install the skill for every project (macOS / Linux):

```sh
mkdir -p ~/.claude/skills && curl -fL https://github.com/RU-EducationalPlatform/idoc-desktop/releases/download/editor-support/idoc-skill.zip -o /tmp/idoc-skill.zip && unzip -o /tmp/idoc-skill.zip -d ~/.claude/skills/
```

Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force "$HOME\.claude\skills" | Out-Null; Invoke-WebRequest https://github.com/RU-EducationalPlatform/idoc-desktop/releases/download/editor-support/idoc-skill.zip -OutFile "$env:TEMP\idoc-skill.zip"; Expand-Archive -Force "$env:TEMP\idoc-skill.zip" "$HOME\.claude\skills"
```

The skill lands in `~/.claude/skills/idoc/`. For one project only, unzip into that
project's `.claude/skills/` instead. Claude loads it whenever a task involves IDoc.

Or, without a skill, give one project the instructions directly:

```sh
curl -fL https://github.com/RU-EducationalPlatform/idoc-desktop/releases/download/editor-support/CLAUDE.md -o CLAUDE.md
```

(If the project already has a `CLAUDE.md`, append instead: `curl -fL ... >> CLAUDE.md`.)

## VS Code, Cursor, VSCodium, Windsurf

macOS / Linux:

```sh
curl -fL https://github.com/RU-EducationalPlatform/idoc-desktop/releases/download/editor-support/idoc.vsix -o /tmp/idoc.vsix && code --install-extension /tmp/idoc.vsix --force
```

Windows PowerShell:

```powershell
Invoke-WebRequest https://github.com/RU-EducationalPlatform/idoc-desktop/releases/download/editor-support/idoc.vsix -OutFile "$env:TEMP\idoc.vsix"; code --install-extension "$env:TEMP\idoc.vsix" --force
```

Replace `code` with `cursor`, `codium` or `windsurf` for those editors. Or use the
editor's Extensions view: "..." menu > Install from VSIX.

## Vim and Neovim

macOS / Linux, Vim:

```sh
for d in ftdetect ftplugin syntax; do mkdir -p ~/.vim/$d && curl -fL https://raw.githubusercontent.com/RU-EducationalPlatform/idoc-desktop/main/editor-support/vim/$d/idoc.vim -o ~/.vim/$d/idoc.vim; done
```

macOS / Linux, Neovim:

```sh
for d in ftdetect ftplugin syntax; do mkdir -p ~/.config/nvim/$d && curl -fL https://raw.githubusercontent.com/RU-EducationalPlatform/idoc-desktop/main/editor-support/vim/$d/idoc.vim -o ~/.config/nvim/$d/idoc.vim; done
```

Windows PowerShell (Vim uses `~\vimfiles`, Neovim uses `~\AppData\Local\nvim`):

```powershell
$dst = "$HOME\vimfiles"; foreach ($d in "ftdetect","ftplugin","syntax") { New-Item -ItemType Directory -Force "$dst\$d" | Out-Null; Invoke-WebRequest https://raw.githubusercontent.com/RU-EducationalPlatform/idoc-desktop/main/editor-support/vim/$d/idoc.vim -OutFile "$dst\$d\idoc.vim" }
```

Files ending `.idoc`, `.style` and `.course` are then highlighted, and `gc`-style
commenting uses IDoc's `@ ` comment. (A tree-sitter grammar for Neovim is not
published yet; this is regular Vim syntax and works in both.)

## Sublime Text, JetBrains, Zed and other TextMate editors

Download `https://raw.githubusercontent.com/RU-EducationalPlatform/idoc-desktop/main/editor-support/textmate/idoc.tmLanguage.json` and follow
`textmate/README.md`.

## Coding agents

Put the file for your agent in your project; each file says at its top where it goes.

| agent | file | where it goes |
|---|---|---|
| Claude Code | `agents/CLAUDE.md` | `CLAUDE.md` at the project root |
| OpenAI Codex CLI, and any agent that reads AGENTS.md | `agents/AGENTS.md` | `AGENTS.md` at the project root |
| Cursor | `agents/.cursor/rules/idoc.mdc` | `.cursor/rules/idoc.mdc` (older Cursor: `agents/cursorrules` as `.cursorrules`) |
| GitHub Copilot | `agents/copilot-instructions.md` | `.github/copilot-instructions.md` |
| Gemini CLI | `agents/GEMINI.md` | `GEMINI.md` at the project root |
| Windsurf | `agents/windsurfrules` | `.windsurfrules` at the project root |

For example, macOS / Linux, from your project root:

```sh
curl -fL https://github.com/RU-EducationalPlatform/idoc-desktop/releases/download/editor-support/AGENTS.md -o AGENTS.md
mkdir -p .cursor/rules && curl -fL "https://raw.githubusercontent.com/RU-EducationalPlatform/idoc-desktop/main/editor-support/agents/.cursor/rules/idoc.mdc" -o .cursor/rules/idoc.mdc
mkdir -p .github && curl -fL https://raw.githubusercontent.com/RU-EducationalPlatform/idoc-desktop/main/editor-support/agents/copilot-instructions.md -o .github/copilot-instructions.md
curl -fL https://raw.githubusercontent.com/RU-EducationalPlatform/idoc-desktop/main/editor-support/agents/GEMINI.md -o GEMINI.md
curl -fL https://raw.githubusercontent.com/RU-EducationalPlatform/idoc-desktop/main/editor-support/agents/windsurfrules -o .windsurfrules
```

Windows PowerShell, from your project root:

```powershell
Invoke-WebRequest https://github.com/RU-EducationalPlatform/idoc-desktop/releases/download/editor-support/AGENTS.md -OutFile AGENTS.md
```

(the same pattern, `Invoke-WebRequest <url> -OutFile <name>`, for the others).

Any other assistant: paste `llms.txt` into the chat, or keep it at your project
root, where many assistants look for it.

Licence: MIT.
