# IDoc TextMate grammar

`idoc.tmLanguage.json` is the IDoc grammar in TextMate format (scope `source.idoc`).
Editors that read TextMate grammars can use it directly.

- **Sublime Text**: Preferences > Browse Packages, make a folder `IDoc`, put
  `idoc.tmLanguage.json` in it, then View > Syntax > IDoc. (Sublime reads JSON
  TextMate grammars; if your version does not, convert it with PackageDev.)
- **JetBrains IDEs** (IntelliJ, PyCharm, WebStorm, CLion, ...): Settings > Editor >
  TextMate Bundles > +, and choose a folder containing this file.
- **Zed, Nova, Lapce and others**: point the editor's TextMate grammar setting at
  this file and associate `*.idoc`, `*.style`, `*.course` with it.
- **VS Code / Cursor / VSCodium / Windsurf**: install `../vscode/idoc.vsix` instead;
  it carries this grammar plus completions, snippets and diagnostics.
