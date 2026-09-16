# IDoc, as an app

IDoc is a document format and editor for teaching: prose, mathematics, slides,
circuits and autograded questions in one file. This repository is where the
**installed app** is published — the downloads, its add-on packs, and the feed
the app checks for updates. The source lives in the project's own repository.

## Download

Take the newest build from [Releases](../../releases/latest).

| Your computer | File |
|---|---|
| macOS, Apple silicon | `IDoc-<version>-arm64.dmg` |
| Windows 10/11, 64-bit | `IDoc Setup <version>.exe` |
| Linux, 64-bit | `IDoc-<version>-x86_64.AppImage` |

**These builds are not signed yet.** macOS will say the app is from an
unidentified developer: open it once with right-click → Open. Windows
SmartScreen will warn: More info → Run anyway. Signing identities are being
arranged, and until they are, this notice is the honest state of it.

## What it does that a browser cannot

- **Everything works offline.** The editor, PDF export, Python, C and C++, the
  circuit simulator, read-aloud and the voice commands all run on your own
  machine. Nothing is sent anywhere to make a document work.
- **Your work is yours.** Documents are files in a folder you choose. Answers
  typed into a paper survive a crash or a lost connection, and are handed in
  when the connection comes back.
- **Locked exams.** A course can set a paper that is taken only in the app's
  locked window. It is not spyware: it takes no pictures and watches no
  screens. It puts the paper in a window you cannot leave without the attempt
  recording that you did, and it says so on screen before you start.
- **A course still comes from the server.** Signing in, the class list, marks
  and hand-ins are the same as on the web — the app signs in through your own
  browser, and you can sign a computer out from your profile at any time.

## Add-on packs

The app installs small, and offers the heavy parts when you need them:
speech-to-text, the voices for read-aloud, the full Python library set,
Arduino sketch compilation, and a C toolchain on Windows and Linux. IDoc menu →
Add-ons, or the setup screen on first run. Each pack is downloaded from this
repository's releases and checked against a fingerprint before anything is
installed; a file that does not match is refused and nothing is written.

`manifest.json` on a release lists the packs it carries. `latest.json` is what
the app reads to notice a new version — it never installs one behind your back.

## Reporting a problem

Open an issue here. Please say what you were doing, which build you have (IDoc
menu → About), and what happened instead. A document that shows the problem
helps more than anything else.
