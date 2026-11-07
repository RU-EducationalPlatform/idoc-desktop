<!-- Generated from the IDoc editor's own catalog. Do not edit by hand. -->
<!-- Gemini CLI: save as GEMINI.md in your project root (or ~/.gemini/GEMINI.md for every project). -->

# IDoc: instructions for Gemini

When editing `.idoc`, `.style` or `.course` files you are writing **IDoc**, a
plain-text document and assessment language where every command starts with `@`.

## Non-negotiables
- Every command starts with `@`. **Never use backslashes**, math included.
- `@ ` (at + space) is a line comment; `@@` is a literal `@`; `@* … *@` is a block comment.
- **Close every block**: `@end` / `@e`, or its dedicated closer (`@endquiz`, `@endtable`).
- Math goes in `@eqn … @end` (display) or `@eqi(…)` / `@eqn{…}` / `$…$` (inline). Write `frac{a}{b}`, `sqrt[3]{x}`, `sin^2{alpha}`, Greek by name.
- Inside `@quiz … @endquiz`, **one question per line**.
- Prefer terse fused flags (`fci`, `fsi`) over dotted or verbose forms.
- Do not invent directives. If it is not in the reference, it does not exist.

## Common shapes
- Headings: `@title(...)`, `@section(...)`, `@subsection(...)` (auto-numbered).
- Lists: `@ul` / `@ol` + one item per line + `@end`. Column lists: `@list(cols=5) a, b, c … @end`.
- Tables: `@table` / header line / rows (comma or `| a | b |` cells) / `@endtable`.
- Questions: `@q(KIND, …)`. Kinds include `mch`/`mcv`/`mcd` (multiple choice, `*` correct, `~` partial), `f` (exact; `fci`/`fsi`), `fn` (numeric or range, `>20`, `10:20`), `fr` (regex), `eq` (math), `essay`, `match`, `order`, `likert5`, `m` (matrix), `draw`. Forms: `@q(f: answer)`, `@q(mch, *a, b)`, `@q answer @e`, `@q(4)`.
- Code: `@code(lang, run) … @end` with `@tests … @end`; `@codex(file.py)` from a file; `@solution … @end` inside a runnable block is the teacher's working program.
- Randomize: `@rand(m, 1:9)`, `@set(x=…)`, `@var(x)`, `@formulaq(F = m*a, 0.1)`.
- Studios: `@lab(TYPE, …) … @end`; electrical CAD is `@EECad(sourdough|schematic|pcb, …) … @end`; `@visual_debug(LANG, id=…)` mounts a debugger on a `@code` block.
- Slides: `@deck(theme=, accent=, footer=, slidenumbers)`, `@slide(Title)`, `@titleslide`, `@step(anim=)`, `@col`, `@notes`.
- Stylesheets: `@style(Name)` applies `Name.style` (itself IDoc); `@inherits(Parent)` extends one; `@textstyle(role, font=, color=)`.
- Paper exams: `@scanform` makes a printable scan form (one box per graded `@q`).
- Course files: `@course(…)`, `@assign(…)`, `@exam(…, grading=scan)`, `@provide(folder/)`, `@grading(split=wrong, deal=question, double=10%)`.

## The full spec

The complete IDoc reference (`llms.txt`) follows, embedded, so this file needs
nothing else. The current version is always at https://github.com/RU-EducationalPlatform/idoc-desktop/releases/download/editor-support/llms.txt

When unsure whether a directive exists, check this reference rather than
inventing one; the IDoc linter flags unknown `@name`s.

<!-- llms.txt begins -->

# IDoc — a single-introducer document & assessment language (llms.txt)

IDoc is a plain-text format where every command starts with `@`. One source
covers prose (Markdown/LaTeX ground), embedded auto-graded assessments, slide
decks, data-viz, and PDF/Word/PowerPoint export. Files: `.idoc` (documents),
`.style` (reusable stylesheets — same syntax).

## Core syntax
- `@name(args)` — a directive. Args are `key=value` or positional, comma-separated.
- `@ ` (at + space) — a line comment to end of line. `@@` is a literal `@`.
- `@* … *@` — a block comment.
- `@end` (or `@e`) closes a block; some blocks have explicit closers (`@endquiz`,
  `@endtable`). No backslashes anywhere — math included.
- Inline formatting: `@b{bold}` `@i{italic}` `@u{underline}` `@code{verbatim}`.

## Structure
- `@title(...)`, `@section(...)`, `@subsection(...)` — auto-numbered headings.
- `@doc(template=ieee|academic|report)`, `@abstract … @end`, `@authors(ids)`.
- Lists: `@ul`/`@ol` then items, or `@item one-per-line`, closed by `@end`.
- Code from a file: `@codex(path/first.sv)` — the suffix names the language and
  the block is runnable when that language has a runner (`norun`, `edit`, `lang=`,
  and `expect=`/`tests=`/`pts=`/`submit=server`/`id=` for a graded exercise).
- Column lists: `@list(cols=5) a, b, c, … @end` — ONE comma-separated run over
  as many lines as needed (a newline separates like a comma), laid out in N
  columns. `cols=auto` fits as many as it can; flags `mono` (monospace items),
  `plain` (no bullets), `ol` (numbered); `sep=;` changes the separator.
  `cols=`/`mono`/`plain` also work on `@ul`/`@ol`.
- `@table` / header line / rows (cells split on commas OR markdown `| a | b |`) / `@endtable`.
- `@img(file=path)`, `@figure`, `@box(x=,y=,w=,h=)` (fixed geometry).

## Math (no backslashes)
- `frac{a}{b}`, `sqrt[3]{x}`, `sin^2{alpha}`, greek by name (`alpha`, `theta`).
- Display: `@eqn` newline math newline `@end`. Inline: `@eqn(style=inline) … @end`
  or the terse `@eqn{ … }` / `@eqi(…)`.

## Questions — `@q(KIND, …)` (auto-graded)
Kinds: `mch`/`mcv`/`mcd` (multiple choice horizontal/vertical/dropdown; `*`=correct,
`~`=partial), `f` (exact, fused flags `fci`/`fsi` for case/space-insensitive),
`fn` (numeric/range, also `>20`/`10:20`), `fr` (regex), `eq` (math, algebraic
equivalence), `c` (complex), `likert5`, `match`, `order`, `essay`, `m` (matrix),
`draw`/`markdraw`/`moddraw`. Forms: `@q(f:answer)` colon, `@q(mch,*a,b,c)` comma,
`@q answer @e` inline, `@q(4)` bare numeric. `@quiz … @endquiz` wraps many (one
per line). `@qc` sets points. `@rubric … @end` adds grading criteria.

## Dynamic
- `@rand(m, 1:9)`, `@set(x=...)`, `@var(x)`, `@print(x)` — randomized variants.
- `@formulaq(F = m*a, 0.1)` — graded formula questions.
- `@code(lang, run)` + `@tests` — runnable, output-graded code.
- `@verb … @end` (aliases `@verbatim`/`@pre`) — verbatim/preformatted text shown exactly as typed (monospace, whitespace preserved). Args: `font=mono|sans|serif|<family>`, `size=`, `color=`, `bg=`, `wrap`, `plain`, `align=`.
- `@graph(...)`, `@gpu(field=…)`, `@geo(...)`, `@octave … @end`.
- `@lab(TYPE, …args) … @end` — one namespace for every studio/editor widget: `cad`, `octave` (aliases `octo`/`cas`), `logic`, `sim`, `mesh` (`blender`), `chem`, `automaton` (`fsm`), `spreadsheet` (`sheet`), `music`, `flashcards`, `shader`, `notebook` (`nb`), `graph` (`chart`), `code`. `@lab(cad, kernel=occ) … @end` == `@cad(kernel=occ) … @end`. The classic directives keep working.
- `@EECad(TYPE, …) … @end` — electrical CAD, one namespace (`@lab(EECad=TYPE, …)` is the same block). `sourdough` is a breadboard + Arduino workbench, simulated, with an `@sketch … @end` of real Arduino C++; `schematic` is a KiCad-class schematic with ngspice (`.ac`/`.tran`/`.dc`/`.op` lines); `pcb` is the board studio, or with `file=` a board viewer. `expect=` + a `@solution … @end` make it a graded exercise. It replaces `@tinker`, `@schematic`, `@pcb` and `@breadboard`.
- `@visual_debug(LANG, id=…)` — the debugger in the document, bound to a `@code` block by `id=` or a file by `src=`: a waveform for Verilog/SystemVerilog (`signals=`, `radix=`), a timeline/flamegraph/roofline for C, C++, CUDA, Rust (`profile=`, `build=`). `expect=` over the trace makes it markable.
- The craft studios — the block's body IS the work, one line per thing, and every click in the card writes a line: `@photo … @end` (`canvas WxH [16bit|32bit] [gray|lab|cmyk profile=…]`, then `layer NAME fill|import|smart|adjust|text …` bottom first, `group NAME`, `in=`, `mask=rect:|poly:|wand:|subject|file.psd#n@mask`, `stroke`/`erase` with `points=x,y[,pressure];…`, `export x.psd`), `@film … @end` (`size WxH fps=N`, `track NAME`, `clip FILE IN..OUT at=T`, `title`, `caption "…" at= dur=`, `audio …`, `export x.mp4`), `@audioeditor … @end` (`track`, `clip`, `fx eq|highpass|lowpass|comp|gate|delay|reverb|gain …`, `auto vol|pan|eq.mid|fx2.f T:V …`, `master`, `export x.wav`), and `@pdf(file=x.pdf, edit) … @end` (`pages 1-3`, `rotate 2 90`, `note 1 at 30%,40% "…" id=n1`, `note … reply=n1`, `highlight`, `redact`, `fill name="…"`, `protect`, `export`). `@draw` words are space-separated keyword then value (`path p1 d "M…" stroke #c sw 2 cap round`, `fill linear(#a,#b,90)`, `envelope …`, `mesh … grid CxR colors …`) — never `key=value`; it opens DXF and DWG (R2000–R2018, not R2007), SVG, PDF, AI and EPS. Each takes `id=`, `pts=`, `expect="…"` to be marked on the server from the text.
- `@lab(prove, id=p1, pts=6, goal="(a+b)^2 = a^2 + 2ab + b^2") @solution … @end` — a proof the student writes, one step a line with its reason (`= … by ring`, `induction n`, `by IH`); IDoc's own kernel checks it in the browser and again on the server. `partial` gives credit per step.
- `@solution … @end` inside any runnable block (`@code`, `@codex`, a notebook cell, `@octave`, `@shader`, `@draw`, `@EECad`) is the teacher's working program; grading runs it and compares outputs. Stripped from what students receive.

## Exams on paper
- `@scanform` (or `@scanform(mc=letters, paper=a4)`) turns a quiz into a printable scan form: one fixed answer box per graded question, registration marks, a page/seed barcode. Every graded `@q` needs its own box, so keep one per line.
- In a course file, `@exam(midterm.idoc, grading=scan, variants=4)` says the exam is sat on paper and marked from scans.

## The course file (`.course`)
A course is a plain file of lines; the file is the syllabus and the gradebook's input.
- `@course(ECE231, title="…", term="Fall 2026")`, then items: `@assign(hw1.idoc, due="2026-09-08 23:59", pts=100, cat=Homework)`, `@exam(quiz1.idoc, due=…, pts=25, time=30m)`.
- `@assign(…, attempts=2, keep=highest|latest|average, post=manual, markers=2)`.
- `@provide(labs/lab4-starter/)` hands a folder of files to each student's own workspace (`when=auto`, `overwrite=never|ask|always`).
- `@grading(split=wrong|paper, deal=question|task, double=10%)` divides the marking among TAs: `deal=question` gives one marker a whole question, `double=10%` blind-marks a share twice.

## Slides
- `@deck(theme=, accent=, footer=, logo=, presenter=, institution=, slidenumbers,
  transition=)` — deck defaults. `@slide(layout=|Free Title Text)` starts a slide;
  free text becomes its heading. `@titleslide` builds a cover from `@title`.
  `@step(anim=, order=, group=)` build animations. `@col` splits columns.

## Stylesheets & inheritance
- `@style(ClassName)` applies `ClassName.style`. A `.style` is just `.idoc`
  (holds `@deck`, `@textstyle`, `@set`). `@inherits(Parent)` extends another sheet
  (parent first, child overrides). `@textstyle(role, font=, size=, color=)` styles
  roles `normal/title/heading1.../code`; decks consume these too.

## Worked examples
```
@title(Quiz 1)
The capital of France is @q(f: Paris).
@q(mch, *4, 3, 5)   @ 2+2 — the * marks the correct option
@eqn
E = m c^2
@end
```
```
@deck(theme=light, accent=#cc0033)
@slide(Welcome)
@ul
First point
Second point
@end
@step(anim=fly) revealed on click @end
```
```
@ a reusable brand stylesheet, Rutgers.style:
@deck(theme=light, accent=#cc0033, logo=img/logo.svg, institution=Rutgers)
@textstyle(title, font=Archivo, color=#cc0033)
```

When generating IDoc: never use backslashes; close every block; put math in
`@eqn`; one `@q` per line inside `@quiz`; prefer terse fused flags.

---

# Complete reference (generated)

Everything below is generated from the IDoc editor's own catalog, the same
tables its @-menu and linter use. If a directive is not listed here, it does
not exist: do not invent one.

267 directives, 55 question kinds.

Conventions in this list: `block` means the directive takes a body that must be
closed (by the closer named). `args:` lists the named arguments it accepts;
`a|b|c` are its allowed values. Every directive also accepts:
- `id=` — a name for this element, unique in the document — @ref(id), @qref(id), @calc(for=id), #id links and the grader's key all use it
Styleable directives (`@box` `@cad` `@eqn` `@eqnnum` `@figure` `@graph` `@heading` `@img` `@octave` `@section` `@subsection` `@subsubsection` `@subtitle` `@title`) also take the layout arguments `x` `y` `w` `h` `maxw` `minw` `fs` `size` `align` `color` `bg` `z` `m` `mb` `mt` `ml` `mr` `pad` `gap`.

## Document structure

- `@align` (block, closed by `@end`) — Aligns everything inside it: left, right, center or justify. @center, @right and @justify open this same block under their own names, so pick whichever reads better in the source.
  ```
  @align(center)
  All of this is centred.
  @end
  ```
- `@appendices` — The same as @appendix — everything after it letters A, B, C.
  e.g. `@appendices`
- `@appendix` — Everything after this is an appendix: sections letter A, B, C and their subsections number A.1, A.2 — in the preview and the PDF alike.
  e.g. `@appendix`
- `@box` (block, closed by `@end`) — An absolutely-placed box: position it with x/y, size it with w/h, style it with bg/border/pad.
  args: `x` (left edge — absolute placement); `y` (top edge — absolute placement); `w` (width (px % em cm in pt)); `h` (height (any unit)); `pad` (inner padding · also padding=); `bg` (background · also background=); `color` (text colour · also fg=, textcolor=, foreground=); `border` (e.g. 1px solid #ddd); `float=left|right` (left/right); `align=left|center|right` (text alignment inside the box); `fs` (font size · also fontsize=); `z=back|behind|front` (back/front); `shape=circle` (circle — round the box into a circle)
  ```
  @box(x=2cm, y=3cm, w=6cm)
  content
  @end
  ```
- `@centertext` — Template-layer centred text, optionally placed absolutely — used by generated layouts and stylesheets.
  e.g. `@centertext(text=Final Exam)`
- `@col` — The column break inside @columns — and the column split on a two-column slide.
  e.g. `@col`
- `@cols` (block, closed by `@end`) — Auto-flowing columns; @col splits them. The short spelling of @columns, and the same block — it works in the PDF too.
  ```
  @cols(count=2)
  left text
  @col
  right text
  @end
  ```
- `@columns` (block, closed by `@end`) — Auto-flowing columns; @col splits them. Works in the PDF too. Aliases: `@cols`.
  ```
  @columns(count=2)
  left text
  @col
  right text
  @end
  ```
- `@doc` — Document-wide settings: paper template, theme, shuffling, question numbering, default fill-in width.
  args: `template=article|ieee|acm|academic|research|report|proposal|thesis|letter|exam` (article / ieee / acm / academic / research / report / proposal / thesis / letter / exam); `colgap` (space between the paper's columns, e.g. colgap=0.3in (alias gutter=) — default comes from the venue); `theme=light|dark|auto` (light / dark / auto); `a11y=colorblind|dyslexia` (colorblind / dyslexia (space-separated)); `shuffle=mc` (mc — shuffle multiple-choice options per variant); `spread` (deal every @frompool / @pick so neighbouring versions share as little as the pools allow (flag)); `qnumbers` (Q1/Q2 prefixes (flag)); `fillsize` (blank width); `columns` (1 or 2 — page columns); `fontsize` (body font size); `font=Times New Roman|Georgia|Palatino|Garamond|Arial|Helvetica|Calibri|Computer Modern|serif|sans|mono` (body font family (Times New Roman, Georgia, sans…)); `margin` (page margin); `margintop` (top page margin on its own (overrides margin=)); `marginx` (left/right page margin on its own (overrides margin=)); `pagenumbers` (print page numbers (=true; numbers= is the older spelling)); `numbers` (the older spelling of pagenumbers=); `refsize` (the size references are set in (8pt by default)); `keywordlabel` (what the keyword block is called (“Index Terms” by default)); `marginbottom` (bottom page margin on its own (overrides margin=)); `speech` (how much mathematics says: beginner (names every structure) / standard / expert (shortest) — a reader may override); `speechrate` (how fast mathematics is read aloud (default 0.85 — slower than prose)); `pausefactor` (how much a spoken reading breathes — 0 removes structural pauses, 1 as authored, 2 doubles them); `lang` (language mathematics is read aloud in (en fr de es it hi ko ca da nb nn sv)); `paper` (us-letter/a4)
  e.g. `@doc(template=ieee)`
- `@fixedpage` (block, closed by `@end`) — Alias of @page — a fixed-geometry page. Aliases: `@page`.
  e.g. `@fixedpage … @endpage`
- `@footer` — A running page footer with left / center / right slots.
  e.g. `@footer(center=Page @@page)`
- `@h1` — Outline level 1 — the same heading as @section, under its HTML/Word name.
  e.g. `@h1(Introduction)`
- `@h2` — Outline level 2 — the same heading as @subsection.
  e.g. `@h2(Background)`
- `@h3` — Outline level 3 — the same heading as @subsubsection.
  e.g. `@h3(Details)`
- `@h4` — Outline level 4 — an unnumbered run-in heading at body size.
  e.g. `@h4(Fine point)`
- `@h5` — Outline level 5 — an unnumbered run-in heading.
  e.g. `@h5(Finer point)`
- `@h6` — Outline level 6 — the deepest unnumbered run-in heading.
  e.g. `@h6(Finest point)`
- `@header` — A running page header with left / center / right slots.
  e.g. `@header(left=Course, center=Exam 1, right=Page)`
- `@heading` — An UNNUMBERED heading (h2) — a section head that stays out of the numbering and the table of contents.
  e.g. `@heading(Agenda)`
- `@hfill` — A flexible horizontal spacer — pushes what follows to the right.
  e.g. `@hfill`
- `@hspace` — A horizontal gap of a given length.
  e.g. `@hspace(2em)`
- `@multicol` (block, closed by `@end`) — Auto-flowing item columns: mark each item with @item (or @next) — or mark nothing and every source line is an item — and the column count falls out of the width, on screen and in print. gap=/min=/cols= tune it; header=1:5 makes those items span full width; border=1 cards each item.
  ```
  @multicol(min=170)
  @item one
  @item two
  @item three
  @end
  ```
- `@newpage` — A page break (print and PDF). Aliases: `@pagebreak`.
  e.g. `@newpage`
- `@next` — The item marker inside @multicol — identical to @item, both spellings read naturally.
  e.g. `@next`
- `@pack` (block, closed by `@end`) — A shared document's tail — every stylesheet, include, picture and data file the document needs, appended as ONE block so the file opens the same on any machine. Nobody writes this by hand: File → Share as one file makes it, and on the receiving side the quiet switch beside the mode badge (Use idoc) unpacks it into a folder. Text entries are stored with every @ doubled; pictures are base64.
  args: `v` (the pack format version — the snapshot reader's SNAPSHOT_VERSION; a build refuses a v it does not know); `mode` (edit = Use idoc unpacks a working folder; view = the file opens in the reader and offers a copy); `sha` (SHA-256 of the body — two files with one sha are the same share)
  ```
  @pack(v=1, mode=edit, sha=0000)
  manifest
  {"root":"quiz3.idoc","entries":[]}
  @end
  ```
- `@page` (block, closed by `@end`) — A fixed-geometry page: everything inside is positioned in real page coordinates.
  args: `w` (page width); `h` (page height)
  ```
  @page(w=8.5in, h=11in)
  @box(x=1in, y=1in, w=3in) …@end
  @endpage
  ```
- `@pagesetup` — Paper size and margins for the whole document (put it in a .style to share it).
  e.g. `@pagesetup(size=letter, margin=1in)`
- `@section` — A numbered section heading (h2).
  e.g. `@section(Part 1)`
- `@subsection` — A numbered sub-heading (h3).
  e.g. `@subsection(Topic)`
- `@subsubsection` — A numbered sub-sub-heading (h4).
  e.g. `@subsubsection(Detail)`
- `@subtitle` — A subtitle line under the title (also feeds @titleslide).
  e.g. `@subtitle(Spring 2026)`
- `@title` — The document title — the biggest heading, and the name the PDF carries.
  e.g. `@title(My Exam)`
- `@titlepage` — A cover page: title, author, date, then a page break.
  e.g. `@titlepage(title="Final Exam", author="Prof. X", date="2026")`
- `@toc` — A table of contents. In a deck it lists slides and each entry jumps to its slide.
  e.g. `@toc`
- `@vfill` — A flexible vertical spacer — pushes what follows to the bottom.
  e.g. `@vfill`
- `@vspace` — A vertical gap of a given length.
  e.g. `@vspace(2em)`
- `@watermark` — Big faded text behind the page content (DRAFT, CONFIDENTIAL…).
  e.g. `@watermark(DRAFT)`

## Text & lists

- `@b` — Bold text — @b{like this}. Aliases: `@strong`.
  e.g. `@b{bold}`
- `@center` (block, closed by `@end`) — Centre a block of content.
  ```
  @center
  content
  @end
  ```
- `@em` — Italic text (alias of @i). Aliases: `@i`.
  e.g. `@em{italic}`
- `@emph` — Emphasis — italic (alias of @em; spelled out, because @e already means @end). Aliases: `@em` `@i`.
  e.g. `@emph{stressed}`
- `@endcell` — Closes a @cell. Optional — the next @cell or @row closes it anyway.
  e.g. `@endcell`
- `@endrow` — Closes a @row. Optional — the next @row or the end of the table closes it anyway.
  e.g. `@endrow`
- `@enum` (block, closed by `@end`) — Short spelling of @enumerate / @ol. Aliases: `@ol`.
  ```
  @enum
  @item First
  @end
  ```
- `@enumerate` (block, closed by `@end`) — LaTeX spelling of @ol — a numbered list. Aliases: `@ol`.
  ```
  @enumerate
  @item First
  @end
  ```
- `@font` (block, closed by `@end`) — Set the typeface for some words, the rest of a paragraph, or a whole block.
  args: `name` (typeface (Times New Roman, Georgia, sans…) · also font=); `size` (optional size (14pt, 1.2em)); `text` (the words to style, when not given in braces)
  e.g. `@font(Georgia){these words}`
- `@footnote` — A numbered footnote at the bottom of the page.
  e.g. `text@footnote{the note}`
- `@i` — Italic text. Aliases: `@em` `@it`.
  e.g. `@i{italic}`
- `@inherits` — Inside a .style: splice the parent stylesheet in first, so this sheet's settings override it.
  e.g. `@inherits(Rutgers)`
- `@it` — Italic text (alias of @i). Aliases: `@i`.
  e.g. `@it{italic}`
- `@item` — One list entry, LaTeX-style. Its content may span lines.
  e.g. `@item First point`
- `@itemize` (block, closed by `@end`) — LaTeX spelling of @ul — a bulleted list. Aliases: `@ul`.
  ```
  @itemize
  @item First
  @end
  ```
- `@justify` (block, closed by `@end`) — Justify a block (flush both edges).
  e.g. `@justify … @end`
- `@left` (block, closed by `@end`) — Left-align a block.
  e.g. `@left … @end`
- `@link` — A hyperlink. A .idoc target opens that document in the editor; add #section to land on a particular heading — its label=, or a slug of its title. In a .course file the same word means an external resource listed in the course.
  args: `text` (the words to show); `url` (where it goes · also href=); `img` (thumbnail: a file, or empty/auto to render one (PDF, .idoc) · also thumb=, preview=); `size` (card width (e.g. 16em, 300px) · also w=)
  e.g. `@link(https://example.com, click here)`
- `@list` (block, closed by `@end`) — A COLUMN list: one comma-separated run — across as many lines as you like — laid out in N columns, balanced so no two columns differ by more than one item. For reference tables (every keyword, every unit).
  args: `cols` (column count (or auto)); `order=col|row` (col = fill down each column (default) · row = read across); `sort=az|za|len|natural` (az | za | len | natural — sorted once, so every output agrees); `marker=disc|circle|square|dash|arrow|chevron|triangle|check|star|none` (disc circle square dash arrow chevron triangle check star none, or any character); `mono` (monospace items (flag)); `plain` (no bullets (flag)); `sep` (item separator (default comma; newlines always separate)); `ol` (numbered instead of bulleted (flag)); `style` (marker when numbered: 1/A/a/I/i)
  ```
  @list(cols=5)
  a, b, c,
  d, e
  @end
  ```
- `@newline` — Alias of @nl — a line break. Aliases: `@nl`.
  e.g. `@newline`
- `@nl` — A line break (the explicit form inside a quiz line). Aliases: `@newline`.
  e.g. `@nl`
- `@ol` (block, closed by `@end`) — A numbered list. The marker is 1 / A / a / I / i, and 1a or 1.1 gives combined nested numbering. Aliases: `@enumerate`.
  args: `cols` (column count (or auto)); `order=col|row` (col (default) or row); `sort=az|za|len|natural` (az | za | len | natural); `mono` (monospace items (flag)); `style` (marker: 1/A/a/I/i)
  ```
  @ol
  First
  Second
  @end
  ```
- `@pre` (block, closed by `@end`) — Alias of @verb — raw, exact text. Aliases: `@verb`.
  e.g. `@pre … @end`
- `@right` (block, closed by `@end`) — Right-align a block.
  e.g. `@right … @end`
- `@row` (block, closed by `@end`) — Starts a table row in the explicit form, where newlines mean nothing and only @row and @cell divide the table. Use it when a cell holds something that takes more than one line — a chart with its own data, a code listing, a CAD model. @endrow is optional: the next @row ends the last one.
  ```
  @table
  @row
  @cell
  @graph(type=bar, src=a.csv)
  @endcell
  @cell
  @graph(type=pie, src=b.csv)
  @endcell
  @endtable
  ```
- `@strong` — Bold text (alias of @b). Aliases: `@b`.
  e.g. `@strong{bold}`
- `@style` — Apply a class stylesheet: a bare name finds styles/Name.style.
  e.g. `@style(ECE231)`
- `@table` (block, closed by `@endtable`) — A table — rows on newlines, cells on commas (sep= changes that). Cells hold anything: equations, code, questions, nested tables. Numeric columns auto right-align. Column sizes are yours when you want them: widths=30% 70%, widths=2fr 1fr 1fr, widths=1 1 3 — same result on screen and in the PDF. When a cell needs MORE than one line — a chart with its own data, a code listing — use @row and @cell instead and newlines stop meaning anything.
  args: `header` (how many of the first rows are HEADER rows (default 1; header=0 = no header row, header=2 = a two-row header)); `span` (break across BOTH columns of a two-column paper (IEEE table*) — the fix for a wide table crammed into one column (flag)); `style` (clean / grid / zebra / card / minimal); `sep` (cell separator, e.g. sep=| — commas then stay literal in cells); `scramble` (shuffle the body rows for each student (per seed); the header rows, ## section rows and rowspan rows stay put, and every @q moves with its row (flag)); `rows` (rows to colour, counting the header as row 1: 2, 1..3 or (1 3 5); with bg= or color=. @2 colours whatever row prints second under scramble); `columns` (columns to colour: 2, 1..3 or (1 3 5); with bg= or color= (cols= is the width list)); `cells` (a block to colour: r2..3 c2..3 (the crossing of those rows and columns), with bg= or color=); `bg` (background for rows= / columns= / cells=); `color` (text colour for rows= / columns= / cells= (alone, its old meaning)); `paint` (several colour rules: r1..2:yellow; c(1 3 5):red text; r2..3 c2..3:lightblue — later rules win; a colour follows its row under scramble, @r2 colours the position); `side` (sit beside the previous table instead of stacking (flag)); `accent` (header/hover tint (#hex)); `align` (per-column l,r,c); `zebra` (striped rows (flag)); `compact` (tight padding (flag)); `roomy` (generous padding (flag)); `border` (ruled cells = grid (flag)); `caption` (caption under the table); `widths` (per-COLUMN widths: widths=30% 70%, widths=2fr 1fr 1fr, widths=1 1 3, or equal / auto (alias cols=)); `width` (whole-table width · also w=); `label` (name for @ref to point at)
  ```
  @table
  Head1, Head2
  a, b
  @endtable
  ```
- `@textstyle` — Typography for a named role, set once, honored on screen AND in the PDF. Roles: normal (alias body), title, author, abstract, heading1-6 (aliases h1/section, h2/subsection, ...), code, caption, table, tableheader. So the font of every table is @textstyle(table, font=..., size=...), and the header row alone is tableheader.
  args: `font=Times New Roman|Georgia|Palatino|Garamond|Arial|Helvetica|Calibri|Computer Modern|serif|sans|mono` (font family); `size` (font size); `align=left|center|right|justify` (text alignment); `color` (text colour); `fg` (text colour (alias of color=)); `fgcolor` (text colour (alias of color=)); `bgcolor` (background); `background` (background (alias of bgcolor=)); `paragraphstyle` (how paragraphs are separated: indent or space)
  e.g. `@textstyle(normal, font="Georgia", size=18pt)`
- `@theme` — Pin a named colour theme for THIS document (the reader can still override it in Appearance).
  e.g. `@theme(nord)`
- `@u` — Underlined text.
  e.g. `@u{underline}`
- `@ul` (block, closed by `@end`) — A bulleted list — one item per line, or @item per entry. Lists nest. Aliases: `@itemize`.
  args: `cols` (column count (or auto)); `order=col|row` (col (default) or row); `sort=az|za|len|natural` (az | za | len | natural); `marker=disc|circle|square|dash|arrow|chevron|triangle|check|star|none` (disc circle square dash arrow check none, or any character); `mono` (monospace items (flag)); `plain` (no bullets (flag))
  ```
  @ul
  First
  Second
  @end
  ```
- `@verb` (block, closed by `@end`) — Raw text shown exactly as typed — monospace, whitespace preserved, nothing interpreted.
  args: `text` (the verbatim text, when it is not the first argument); `font` (mono (default) / sans / serif / a font family); `size` (font size (e.g. 13 or 0.9rem)); `color` (text colour (#rrggbb)); `bg` (background colour (#rrggbb)); `align` (left / center / right); `wrap` (soft-wrap long lines instead of scrolling (flag)); `plain` (no box/background (flag)); `w` (cell width); `h` (height of the block)
  e.g. `@verb{inline}`
- `@verbatim` (block, closed by `@end`) — Alias of @verb — raw, exact text. Aliases: `@verb`.
  e.g. `@verbatim … @end`

## Questions

- `@connect` (block, closed by `@end`) — Draw connections between nodes — A - B or A -> B.
  args: `src` (image or SVG to connect on); `directed` (arrows (flag)); `w` (image width); `h` (image height); `prompt` (question text); `pts` (points it is worth)
  ```
  @connect(src=map.svg)
  #a -> #b
  @end
  ```
- `@dragdrop` (block, closed by `@end`) — Drag labels or parts onto a diagram.
  args: `src` (image or SVG to drop onto); `w` (image width); `h` (image height); `prompt` (question text); `pts` (points it is worth)
  ```
  @dragdrop(src=circuit.svg)
  R1 -> #R1
  @end
  ```
- `@exceptionset` — A named list of extra right answers, written once and used by any fill-in with except=name: a student who writes one of its words is right, ignoring case and spaces (NaN, nan and N A N all match). Two sets: except=volt+units. The printed key and the scan grader include the words; a misspelt name is reported with the nearest one.
  e.g. `@exceptionset(volt: float, nan, inf)`
- `@fillsize` — The document-wide default width (in characters) of a text fill-in box.
  e.g. `@fillsize(12)`
- `@hotspot` (block, closed by `@end`) — Click the right place on an image or SVG to answer. targets= is #svg-id or x,y,r in percent; max= caps the picks. From the keyboard the picture is focusable: arrows move a crosshair and Enter places a marker, and nothing announces where a target is.
  args: `src` (image/SVG); `targets` (#id or x,y,r · also answer=); `max` (max picks); `w` (image width); `h` (image height); `prompt` (question text); `pts` (points it is worth)
  ```
  @hotspot(src=circuit.svg, targets=#R2)
  Click R2.
  @end
  ```
- `@likert5` (block, closed by `@end`) — A Likert table: statements down the side, a 1–5 scale across.
  args: `scale` (number of points (default 5)); `labels` (custom column headers, pipe-separated: Strongly disagree|Disagree|Neutral|Agree|Strongly agree)
  ```
  @likert5
  I enjoyed the course
  @endlikert5
  ```
- `@optset` (block, closed by `@end`) — A named set of dropdown options, reused inline with @q(name: answer).
  ```
  @optset(units)
  V, A, W
  @end
  ```
- `@q` — A question or a blank. The kind is the first argument — see the question-kind list for all 40+ forms.
  args: `pts` (points this question is worth); `partial` (partial-credit rule); `grading=all|any|first` (all/any/first); `penalty` (points removed for a wrong answer); `shuffle` (shuffle options (flag)); `label` (for @qref); `boxes` (the printed scan form gives this write-in one answer box per ;-part of the answer, each graded separately: @q(f: x=2; y=3, boxes) — boxes=N pins the count); `w` (widget width (e.g. 300px) — or drag the grip); `h` (widget height)
  e.g. `@q(mch: 3, *4, 5)`
- `@quiz` (block, closed by `@end`) — A quiz container — ONE question per line.
  ```
  @quiz
  2+2? @q(fn: 4)
  @endquiz
  ```

## Grading & feedback

- `@branch` (block, closed by `@end`) — An adaptive follow-up shown depending on how the previous question was answered.
  args: `if=correct|wrong|answered` (correct / wrong / answered)
  ```
  @branch(if=wrong)
  Review section 2.
  @end
  ```
- `@cbm` (block, closed by `@end`) — Alias of @confidence — certainty-based marking. Aliases: `@confidence`.
  e.g. `@cbm … @end`
- `@confidence` (block, closed by `@end`) — Certainty-based marking: the student rates their confidence, and calibration is scored.
  e.g. `@confidence … @end`
- `@hint` (block, closed by `@end`) — A hint ladder shown after a question — one hint per line, revealed one at a time.
  args: `penalty` (points off per hint revealed)
  ```
  @hint(penalty=1)
  Start from KVL
  Now sum the drops
  @end
  ```
- `@modelans` (block, closed by `@end`) — A reference answer for the open question above — feeds the auto-grader's semantic tiers.
  ```
  @modelans
  Because the current divides…
  @end
  ```
- `@qc` — A numbered points marker: the P points are split across the questions that follow. `choose=K` makes it "answer any K of these" and grades the student's best K.
  e.g. `@qc(10)`
- `@rubric` (block, closed by `@end`) — Criteria for the question just above — one `text: points` per line. Shown in teacher answer mode, exported in the .ans key, editable in the Rubric panel. `name=` defines a reusable one and `use=` applies it, so a lab rubric lives in one place (and in a shared file, in one place for a whole department).
  ```
  @rubric
  States the law: 2
  Correct units: 1
  @end
  ```
- `@solution` — The teacher's WORKING PROGRAM, inside any runnable block — @code, @codex, a @notebook cell, @octave, @shader, @draw and the @EECad studios. Grading runs it and compares its output to the student's, so nobody transcribes expected output; with @tests giving only inputs (`<<< 5`), the expected side comes from the solution. Stripped from a published exam, and run in its own process so the student's code never shares one with it.
  ```
  @code(python, run, pts=20)
  def total(xs):
      return 0
  @solution
  def total(xs):
      return sum(xs)
  @end
  @tests
  <<< 1 2 3
  <<< 4 5
  @end
  @end
  ```
- `@tol` — Short spelling of @tolerance. Aliases: `@tolerance`.
  e.g. `@tol(2)`
- `@tolerance` — The default ± for numeric answers: a percent (5), an absolute (0.05abs), or ±0.05. Aliases: `@tol`.
  e.g. `@tolerance(5)`

## Math

- `@algo` (block, closed by `@end`) — A pseudocode algorithm listing, numbered and indented.
  ```
  @algo(Binary search)
  while lo <= hi
    …
  @end
  ```
- `@dict` (block, closed by `@end`) — Define a library of named equations, reusable with @eq / @eqsrc. Indented lines under an entry add its fields (label:, caption:, expanded:, term: symbol | spoken | meaning | units, source:, author:, checked:); `short = Name` is an alias.
  ```
  @dict(trig)
  pythag: a^2 + b^2 = c^2
  @end
  ```
- `@eq` — Insert a library equation from a @dict by name (read-only). An entry with a stored caption is read aloud by that caption. Flags show its stored fields: label, caption, expanded, terms, source, author, or all; num numbers it for @eqref.
  args: `inline` (inline, in the sentence (flag)); `num` (numbered (N); @eqref(cat.name) points at it (flag)); `label` (show the stored label (flag)); `caption` (show the stored spoken caption (flag; also cap)); `expanded` (show the expanded caption (flag; also exp)); `terms` (show the terms table (flag)); `source` (show the source (flag; also src)); `author` (show who wrote and who checked it (flag)); `all` (show every stored field (flag))
  e.g. `@eq(trig.pythag)`
- `@eqi` — Inline math, short form of @eqn(style=inline) — it flows with the prose.
  e.g. `the value @eqi(x^2) grows`
- `@eqinfo` — A dictionary entry's stored fields as a block, without the equation: label, spoken caption, expanded caption, terms table, source, and who wrote and checked it. Name fields to show only those.
  args: `label` (the stored label (flag)); `caption` (the spoken caption (flag)); `expanded` (the expanded caption (flag)); `terms` (the terms table (flag)); `source` (the source (flag)); `author` (who wrote / checked it (flag)); `all` (every stored field — the default (flag))
  e.g. `@eqinfo(med.Beer-Lambert-Intensity)`
- `@eqn` (block, closed by `@end`) — A display equation in IDoc math — no backslashes: frac{a}{b}, sqrt{x}, sin^2{alpha}, greek by name.
  args: `style=inline` (inline — flow with the prose instead of standing alone); `gap` (number↔equation gap (when numbered)); `label` (for @eqref)
  ```
  @eqn
  frac{a}{b} = c
  @end
  ```
- `@eqnnum` (block, closed by `@end`) — A numbered display equation — referenceable with @eqref.
  args: `gap` (number↔equation gap); `label` (for @eqref)
  ```
  @eqnnum(label=ohm)
  V = I R
  @end
  ```
- `@eqref` — Reference a numbered equation by its label.
  e.g. `as shown in @eqref(ohm)`
- `@eqsrc` — Pull a library equation's SOURCE so you can edit it in place.
  e.g. `@eqsrc(trig.pythag)`

## Randomize & reuse

- `@bin` — Print a value in BINARY. A width in the name zero-pads it: @bin4(m) → 0110. Composes with @rand/@var, so the decimal stays the reusable value.
  e.g. `@bin(m)`
- `@def` (block, closed by `@end`) — Define a reusable macro with parameters; call it as @name(args).
  ```
  @def(warn(text))
  @b{Warning:} text
  @enddef
  ```
- `@eval` — Alias of @exp — evaluate and print. Aliases: `@exp`.
  e.g. `@eval(2*pi*f)`
- `@exp` — Evaluate an expression inline and print the result. Aliases: `@eval`.
  e.g. `@exp(V/R)`
- `@factorial` — n! printed exactly, however many digits it takes. Composes with @rand and @set, so a factorial can be the ANSWER to a generated question rather than only something shown. In an expression, fact(n), factorial(n) and postfix n! all work up to 18!, past which they refuse rather than return a number that has quietly lost digits.
  e.g. `@factorial(20)`
- `@formulaq` — A graded formula question: the expected answer is computed from the variables, so every variant is marked correctly.
  args: `tol` (tolerance); `solve` (unknown var); `show` (vars to display); `w` (answer-box width (px))
  e.g. `@formulaq(V/R, unit=A)`
- `@formularand` — A graded formula question over randomized inputs.
  args: `tol` (± tolerance accepted); `solve` (variable to solve for); `show` (which values to print); `w` (answer-box width (px))
  e.g. `@formularand(R=1,10; V=5,20; ans=V/R)`
- `@frompool` — Draw N random items from a named @pool.
  e.g. `@frompool(kinematics, 3)`
- `@getvar` — Read a value from a PROFILE — a `key=value` file of the things that are true about you rather than about the document (your name, your school, this year and semester). Keys can be indexed, so one profile holds a value per course.
  args: `` (key, then the profile name: @getvar(instructor, PROFILE))
  e.g. `@getvar(instructor, PROFILE)`
- `@hex` — Print a value in HEX; a width in the name zero-pads it (@hex2(n) → 0A).
  e.g. `@hex(n)`
- `@if` (block, closed by `@end`) — Conditional content — @else gives the alternative.
  ```
  @if(level > 2)
  harder version
  @else
  easier version
  @end
  ```
- `@let` — Alias of @set. Aliases: `@set`.
  e.g. `@let(x=3)`
- `@oct` — Print a value in OCTAL; a width in the name zero-pads it.
  e.g. `@oct(x)`
- `@param` — A parameter passed into an included document or stylesheet, readable as a variable.
  e.g. `@param(topic)`
- `@pick` (block, closed by `@end`) — Pick N items at random from this inline pool.
  ```
  @pick(2)
  @item Q1
  @item Q2
  @item Q3
  @endpick
  ```
- `@pool` (block, closed by `@end`) — Declare a named question bank (it renders nothing on its own).
  ```
  @pool(kinematics)
  @item …
  @endpool
  ```
- `@print` — Print `name = value` for a variable (or just the value for an expression).
  e.g. `@print(V)`
- `@profile` — Name the profile a bare @getvar(key) reads from. Defaults to PROFILE. The file lives in profiles/<name>.profile (or styles/, or beside the document).
  e.g. `@profile(Teaching)`
- `@rand` — A random value, fixed per student seed: a range, a step grid, or a choice list.
  e.g. `@rand(x=1,10)`
- `@randsym` — Pick one symbol/word and reuse it consistently across the document.
  e.g. `@randsym(sym=V,I,R)`
- `@repeat` (block, closed by `@end`) — Repeat a block N times, drawing fresh @rand values each copy. Aliases: `@repl` `@rept`.
  ```
  @repeat(5)
  @rand(a=1,9) … @q(fn: @exp(a*2))
  @end
  ```
- `@repl` (block, closed by `@end`) — Alias of @repeat. Aliases: `@repeat`.
  e.g. `@repl(3) … @end`
- `@rept` (block, closed by `@end`) — Alias of @repeat. Aliases: `@repeat`.
  e.g. `@rept(3) … @end`
- `@selectquestion` — Draw one question from the document's bank by id. Several ids = one is picked per student seed; toggle= instead offers the reader a switch between the versions, and every selector sharing a toggle value switches together. An id that names nothing shows a visible note.
  args: `fromid` (comma-separated question ids to choose between); `toggle` (lock = the reader can switch versions, and every locked selector switches together); `points` (points (carried through from a Runestone conversion))
  e.g. `@selectquestion(id="s1", fromid="q_easy,q_hard")`
- `@set` — Set a variable — a fixed value or an expression over other variables. Aliases: `@let`.
  e.g. `@set(V=12)`
- `@shuffle` (block, closed by `@end`) — Randomize the order of the @item chunks inside, per student seed.
  ```
  @shuffle
  @item A
  @item B
  @endshuffle
  ```
- `@val` — Alias of @var — print a variable's value. Aliases: `@var`.
  e.g. `@val(R)`
- `@var` — Print a variable's value. Unset prints NOTHING — and the editor squiggles it, because that is almost always a typo. Use @var_noc for a slot that is meant to be optional. Aliases: `@val`.
  e.g. `R = @var(R) ohms`
- `@var_noc` — Print a variable's value, no check. Same as @var, except the editor stays quiet when nothing sets it — for a slot a stylesheet offers and a document may legitimately not fill (an acknowledgement, a co-instructor).
  e.g. `@var_noc(acknowledge)`

## Media & figures

- `@audioeditor` (block, closed by `@end`) — Multitrack audio editing in the document. `@audioplayer` plays a file; `@audioeditor` is the editor. The body IS the session: `track NAME vol= pan= mute solo`, then its `clip FILE IN..OUT at=T gain= fadein= fadeout= speed=` lines, its effects in chain order — `fx eq low= mid= high=`, `fx highpass f=`, `fx lowpass f=`, `fx comp threshold= ratio= attack= release= makeup=`, `fx gate threshold=`, `fx delay time= feedback= mix=`, `fx reverb mix= size=`, `fx gain db=` — and automation: `auto vol T:V T:V`, `auto pan T:V …`, or any effect's parameter after the effect, named by its place (`auto fx2.f 0:200 4:4000`, the second effect's frequency) or its kind (`auto eq.mid 0:0 2:6`, `auto lowpass.f …`, `auto gain.db …`); then `master vol= limit=-1 loudness=-16` and `export mix.wav`. The kernel mixes it (loudness by ITU-R BS.1770, checked against pyloudnorm); the same mix plays in the card, exports as WAV, and is measured by the grader. With `id=`, `pts=`, `expect=` it is marked on the server: `fx(Voice)=comp, auto(Music)=vol, pan(Voice)<0, lufs=-16±1` — `lufs=` renders the student's own mix from their WAV files.
  args: `expect` (what to check — tracks>=2 · clips>=3 · fx=comp · fx(Voice)=eq · auto>=1 · auto(Music)=vol · pan(Voice)<0 · mute(Music) · solo(Voice) · fades>=1 · duration=30±1 · loudness=-16±1 (the master's target) · lufs=-16±1 (the mix measured on the server) · limit<=-1 · exports=wav · uses=voice.wav); `pts` (points this exercise is worth); `noedit` (the mix alone, no editing (flag))
  ```
  @audioeditor
  track Voice
  clip voice.wav 0..10 at=0 fadein=0.2
  fx highpass f=80
  fx comp threshold=-20 ratio=3 attack=10 release=120
  track Music vol=0.4
  clip bed.wav 0..10 at=0
  fx lowpass f=8000
  auto vol 0:0.4 4:0.15 9:0.4
  auto lowpass.f 0:8000 4:1200 9:8000
  master limit=-1 loudness=-16
  export mix.wav
  @end
  ```
- `@diagram` — A figure that is computed, not drawn: give the measures and it is solved and drawn to scale, varies with @rand, prints as vector, is described for screen readers, and ask= turns its unknown into a graded blank with a computed answer. Types: triangle, symbol (schematic symbols at their natural size, US or IEC), circuit (series/parallel, solved), freebody (net force), numberline (inequalities), vector, polygon, circle, cylinder; and rectangle (a rectangle (or square) to scale; ask= area, perimeter or diagonal); parallelogram (a parallelogram from its base, side and angle (or height); ask= area, perimeter or height); trapezoid (a trapezoid from its parallel sides and height (isosceles unless shift= is given); ask= area, perimeter or a leg); kite (a kite (or rhombus) from its diagonals; ask= area or a side); angles (an angle pair — complementary, supplementary or vertical — with one angle given; ask=other); transversal (two parallel lines cut by a transversal; give one numbered angle (1–8), ask= another); grid (a coordinate grid with points A(2,3) and segments; ask= distance, slope, midx or midy of the first two points); prism (a rectangular prism (box) with hidden edges dashed; ask= volume, surface or diagonal); cylinder (a solid cylinder from its radius and height (with value= it is a graduated cylinder to read); ask= volume, surface or lateral); cone (a cone from its radius and height; ask= volume, surface, lateral or slant); pyramid (a square pyramid from its base edge and height; ask= volume, surface or slant (the faces' height)); sphere (a sphere (or hemisphere) from its radius; ask= volume or surface); boxplot (a box plot from data= (or five= min,Q1,median,Q3,max) on a number line; ask= median, q1, q3, iqr, range, min or max); mapping (a mapping diagram of a relation: two ovals, arrows from inputs to outputs; ask=function (1 if it is one, 0 if not)); ruler (an object against a ruler (cm with mm marks, or inches to 1/16); ask=reading for its length); buret (a close-up of a buret (0 at the top, 0.1 mL marks) with the meniscus at value=; ask=reading); beaker (a beaker with coarse graduations and liquid at value=; ask=reading (an estimate: set tol=)); thermometer (a liquid-in-glass thermometer with the column at value=; ask=reading); balance (a triple-beam balance with its riders set to value= (0–610 g); ask=reading); springscale (a spring scale with its pointer at value=; ask=reading); syringe (a gas syringe with its plunger at value=; ask=reading); phmeter (an analog pH meter, needle at value= (0–14); ask=reading); displacement (two graduated cylinders: the water before, and with an object sunk in it; ask=volume (of the object)); incline (a block on a frictionless (or rough: mu=) incline with its forces; ask= weight, parallel, normal, friction or accel); pulley (an Atwood machine: two masses over a pulley; ask= a (acceleration) or T (tension)); projectile (a projectile's path from its launch speed and angle (from the ground or height=); ask= range, time, maxheight, vx or vy); motion (a position–time or velocity–time graph through points="t,value …"; ask= displacement, distance, or slopeN (segment N's slope)); wave (a transverse wave (or kind=longitudinal) with its wavelength and amplitude marked; ask= wavelength, amplitude, frequency or period (give speed=)); vectors (two or three vectors tip to tail (A=3@0, B=4@90) and their resultant; ask= resultant, angle, rx or ry); titration (a titration curve: a strong or weak acid (pKa=) titrated with a strong base, or a base (pKb=) with a strong acid; ask= equivalence, pheq, half, initial); heating (a heating (or cooling) curve with its melting and boiling plateaus (substance= or mp=, bp=); ask= mp or bp); particles (a particle diagram: solid, liquid or gas; an element, a compound or a mixture); bohr (a Bohr model: the nucleus (protons, neutrons) and electrons by shell, for an atom or ion (Na, O2-, charge=); ask= valence or shells); orbitals (an orbital (box) diagram filled by Aufbau, Pauli and Hund (exceptions Cr, Cu, Mo, Ag…); ask= unpaired or electrons); lewis (a Lewis structure for a molecule or ion with one central atom (NH3, CO2, SO4^2-, XeF4); ask= lonepairs, bonds, electrons or domains); spectrum (a visible line spectrum (emission, or kind=absorption) for an element or your own lines=; ask=count); pes (a photoelectron spectrum (H–K built in, or energies=): one peak per subshell, height = electrons; ask= peaks or electrons); massspec (an element's mass spectrum from its isotopes (built in, or isotopes="35:75.8 37:24.2"); ask= average (atomic mass)).
  args: `a` (side a (opposite angle A)); `b` (side b); `c` (side c); `A` (angle A in degrees); `B` (angle B in degrees); `C` (angle C in degrees); `ask` (the unknown to ask for (a side or angle): a graded blank whose answer the figure computes); `tol` (how far off an answer may be: a number or a percentage (default 1%)); `units` (units for the sides (cm, m, in)); `width` (drawing width in px); `solution` (2 = the other triangle in the ambiguous case); `style` (symbol style: us or iec); `name` (which symbol (resistor, capacitor, battery, earth ground, vcc, diode, led…)); `type` (the figure: triangle, symbol, circuit, freebody, numberline, vector, polygon, circle, cylinder, rectangle, parallelogram, trapezoid, kite, angles, transversal, grid, prism, cone, pyramid, sphere, boxplot, mapping, ruler, buret, beaker, thermometer, balance, springscale, syringe, phmeter, displacement, incline, pulley, projectile, motion, wave, vectors, titration, heating, particles, bohr, orbitals, lewis, spectrum, pes, massspec); `V` (circuit source voltage); `R1` (circuit resistor 1 (2k, 470, 4.7M)); `R2` (circuit resistor 2); `R3` (circuit resistor 3); `R4` (circuit resistor 4); `kind` (circuit: series / parallel); `body` (free body: block / dot); `from` (number line start); `to` (number line end); `step` (tick spacing / cylinder graduation); `show` (number line: an inequality, e.g. -2<x<=3 or x>1); `points` (number line: points to mark); `vx` (vector: x component (or the 2nd positional: @diagram(vector, 3, 4))); `vy` (vector: y component); `n` (regular polygon: number of sides); `side` (regular polygon: side length); `r` (circle radius); `d` (circle diameter); `max` (cylinder: top of the scale); `value` (cylinder: where the liquid is); `label.a` (what side a shows (a name like x, or none)); `label.b` (what side b shows); `label.c` (what side c shows); `label.A` (what angle A shows); `label.B` (what angle B shows); `label.C` (what angle C shows); `l` (rectangle: length); `base` (parallelogram: the base); `angle` (parallelogram: the acute angle in degrees); `height` (parallelogram: the height (instead of angle)); `top` (trapezoid: the top parallel side); `bottom` (trapezoid: the bottom parallel side); `shift` (trapezoid: how far the top's left end sits right of the bottom's (default: centred)); `d1` (kite: the long (axis) diagonal); `d2` (kite: the cross diagonal); `at` (kite: where the cross diagonal meets the axis, as a fraction from the top (0.5 = a rhombus; default 0.3)); `range` (grid: both axes, e.g. -6:6); `xrange` (grid: the x axis, e.g. -2:10); `yrange` (grid: the y axis); `segments` (grid: segments between points: AB BC); `data` (boxplot: the values); `five` (boxplot: or the five-number summary: min, Q1, median, Q3, max); `method` (boxplot: quartiles: exclusive (TI-84, default) or inclusive); `pairs` (mapping: input>output pairs: 1>3, 2>5); `domain` (mapping: label over the inputs (default x)); `length` (ruler: the object's length); `start` (ruler: where the object starts on the ruler (default 0)); `before` (displacement: the water level without the object); `after` (displacement: the level with it); `mass` (incline: the block's mass in kg); `mu` (incline: coefficient of kinetic friction (default 0)); `g` (incline: gravity (default 9.8)); `m1` (pulley: the left mass (kg)); `m2` (pulley: the right mass (kg)); `v` (projectile: launch speed (m/s)); `tunit` (motion: time unit (default s)); `wavelength` (wave: the wavelength); `amplitude` (wave: the amplitude); `cycles` (wave: how many wavelengths to draw (default 2)); `speed` (wave: the wave speed, for ask=frequency or period); `Ca` (titration: the analyte's concentration (M)); `Va` (titration: its volume (mL)); `Cb` (titration: the titrant's concentration (M)); `pKa` (titration: a weak acid's pKa); `pKb` (titration: a weak base's pKb (the analyte is a base)); `strength` (titration: strong (default) or weak); `substance` (heating: water, ethanol, methanol, acetone, benzene, mercury, ammonia, nitrogen); `mp` (heating: melting point, °C); `bp` (heating: boiling point, °C); `state` (particles: solid, liquid or gas); `seed` (particles: a different arrangement); `element` (bohr: symbol, name or Z (or the first positional: Na)); `charge` (bohr: the ion's charge); `neutrons` (bohr: neutrons (default: from the standard atomic weight)); `formula` (lewis: the formula (or the first positional): NH3, CO2, NO3-); `lines` (spectrum: your own wavelengths in nm); `energies` (pes: your own binding energies in MJ/mol, one per subshell); `isotopes` (massspec: your own: mass:abundance pairs); `gravity` (freebody: a force, magnitude@angle in degrees (gravity=20@270); any other name works too); `weight` (freebody: a force, magnitude@angle in degrees (weight=20@270); any other name works too); `normal` (freebody: a force, magnitude@angle in degrees (normal=20@270); any other name works too); `friction` (freebody: a force, magnitude@angle in degrees (friction=20@270); any other name works too); `applied` (freebody: a force, magnitude@angle in degrees (applied=20@270); any other name works too); `tension` (freebody: a force, magnitude@angle in degrees (tension=20@270); any other name works too); `spring` (freebody: a force, magnitude@angle in degrees (spring=20@270); any other name works too); `air` (freebody: a force, magnitude@angle in degrees (air=20@270); any other name works too); `drag` (freebody: a force, magnitude@angle in degrees (drag=20@270); any other name works too); `lift` (freebody: a force, magnitude@angle in degrees (lift=20@270); any other name works too); `thrust` (freebody: a force, magnitude@angle in degrees (thrust=20@270); any other name works too)
  e.g. `@diagram(triangle, a=5, b=7, C=40, ask=c, units=cm)`
- `@dicom` (block, closed by `@end`) — Medical images in the document — CT, MRI and any DICOM study, viewed, measured and graded. `src=` names a `.bvol` block the card made from a DICOM folder (drop the folder or the CD onto the card; it is de-identified in your browser to DICOM PS3.15 Annex E before anything is kept, and the server refuses a study that still names a patient), or `phantom` for the built-in synthetic chest CT. The body is the view, one line each: `layout 1x2`, `series 2 window=lung slice=31`, `point x,y label=lesion`, `length L1 from=… to=…`, `roi liver poly=…`; a 3-D pane takes `plane=3d yaw= pitch= cut=x0,x1,y0,y1,z0,z1` (or an oblique `cutplane=nx,ny,nz,d`, “Cut along the view”) and the block a `preset bone|soft|lung|vessels|skin|mr` line or a hand-made `tf -150:#993d33:0 60:#e07a5f:0.08 500:#ffffff:0.7` (the card's Edit draws it over the study's histogram); a PET reads in SUV and SUL (`suvmax(lesion)=…`, `suvmean`, `suvpeak` — PERCIST's 1 mL sphere — and the lean-body-mass `sulmax`/`sulmean`/`sulpeak` grade it); every click in the card writes a line. With `id=`, `pts=` and `expect=` it is a question marked on the server in millimetres: `hotspot(lesion)=solution ±8mm`, `length(L1)=42±2mm`, `roi(liver)~solution dice>=0.85`, `window=brain ±10%`; the key is a `@solution` section in the body. Teaching and research; not for diagnosis.
  ```
  @dicom(src=phantom)
  layout 1x2
  series 2 window=lung slice=31
  series 2 window=soft slice=31
  @end
  ```
- `@emerge` — The Emerge studio, in the preview: a card or short video where a message forms out of rippling water run exactly backward (or particles), spoken as it lands, with photos, video clips, a particle timelapse and music. Everything you change in the preview is written back into the block, and the block is the card — one scene per line: `cover`, `message` (or a bare line), `timelapse` with `frame` lines, `photo`, `video`, `music`, `aspect`; an indented `say` or `recording` belongs to the scene above. `|` breaks a line. Make video renders an MP4 on your device; from Python, `idoc.Emerge()` builds the same card.
  args: `noedit` (the player alone, no studio (flag))
  ```
  @emerge
  Happy | Birthday
    say "Happy birthday."
  @end
  ```
- `@figure` — A NUMBERED figure with a caption, referenceable with @ref. `span` makes it full-measure in a two-column paper.
  args: `src` (image file); `caption` (caption printed under the figure); `alt` (alt text for screen readers); `w` (display width); `label` (name for @ref to point at); `span` (full measure — across both columns in a two-column paper (flag))
  e.g. `@figure(file=plot.png, caption=Result, label=fig1)`
- `@film` (block, closed by `@end`) — Video editing in the document. `@video` plays a file; `@film` is the editor. The body IS the timeline: `size WxH fps=N`, then `track NAME` lines, each followed by its items — `clip FILE IN..OUT at=T` (the part of the file it uses, and where it starts), `image FILE at=T dur=D`, `title "text" at=T dur=D size= color= bg= y=`, `caption "text" at=T dur=D` (a caption track, drawn as subtitles and burned in when exported), `color #rrggbb at=T dur=D`, `audio FILE IN..OUT at=T vol= duck=V1` — with `fadein=`, `fadeout=`, `speed=`, `transition=dissolve|wipe|slide|fade:SECONDS`, colour (`bright= contrast= sat= hue= blur=`) and position (`x= y= scale= rot= opacity=`, each a number or keyframes like `1@0,1.3@4`); `marker T "label"` and `export film.mp4`. The first track is underneath. In the card: drag a clip to move it and its edges to trim; Shift on an edge ripples (everything after follows), Alt on an edge two clips share rolls the cut, Alt on a clip's body slips its source under it, Shift on the body slides it between its neighbours; I and O mark the source's in and out and X clears them, so Add media is a three-point edit; S splits, Delete removes (Shift closes the gap). Add caption takes an SRT or WebVTT file; Export as writes the captions (SRT, WebVTT) or the timeline (OpenTimelineIO, CMX 3600 EDL, Final Cut Pro XML), and Open timeline reads any of the three; Scopes shows the frame's histogram, luma waveform and vectorscope (BT.709). Make video encodes an MP4 on this device, the soundtrack mixed by the same kernel that grades it. With `id=`, `pts=`, `expect=` it is marked on the server from the text: `clips>=3, transitions>=1, titles>=1, captions>=1, duration=30±3, fades>=1, keyframes>=1, graded>=1, ducked, exports=mp4`.
  args: `expect` (what to check — clips>=3 · tracks>=2 · duration=30±3 · titles>=1 · transitions>=1 · transition=dissolve · fades>=1 · keyframes>=1 · graded>=1 (colour) · ducked · speed · audio>=1 · size=1920x1080 · fps=30 · exports=mp4 · uses=intro.mp4; each term one check, the score is the fraction right); `pts` (points this exercise is worth); `noedit` (the player alone, no editing (flag))
  ```
  @film
  size 1920x1080 fps=30
  track V1
  clip intro.mp4 0..8 at=0 fadein=0.5
  clip demo.mp4 2..14 at=8 transition=dissolve:0.5
  track T1
  title "Week 3" at=0 dur=3 size=72 y=80%
  track C1
  caption "Today: Thévenin equivalents" at=1 dur=4
  track A1
  audio song.mp3 0..20 at=0 vol=0.4 duck=V1
  export week3.mp4
  @end
  ```
- `@icon` — A built-in icon glyph, sized and coloured like text.
  e.g. `@icon(check)`
- `@img` — An image. Size with w/h, float it, caption it.
  args: `fit` (contain / cover — fill the enclosing box (a scanform cell, a @fixedpage box) without overflowing it); `src` (image path); `w` (display width (px % em cm)); `h` (display height); `caption` (caption under the image); `alt` (alt text — read by screen readers, checked by the a11y audit); `float=left|right` (left/right); `inline` (inline icon (flag)); `gap` (space after); `label` (name for @ref to point at)
  e.g. `@img(file=plot.png, w=60%)`
- `@model` — A 3-D model viewer (.cmesh/.obj) or an inline .svg.
  args: `time` (live class: how long it stays open once the teacher opens it); `src` (.cmesh/.obj/.svg in <doc>.assets/); `shade=smooth|flat|wire` (smooth / flat / wire); `color` (solid colour (#rrggbb)); `height` (viewer height); `width` (viewer width)
  e.g. `@model(file=part.cmesh)`
- `@module` — Embed a Knowsy interactive module (calculus, CPU animator, bits…) inside the document.
  args: `url` (a module by page name or full URL instead of an id); `base` (where the modules are served from (defaults to the deployment's host)); `title` (override the title shown in the bar); `h` (how tall the frame is (460px by default)); `challenge` (yes = keep Knowsy's own challenge bar and navbar; they are hidden by default, because in a document they are another site's task)
  e.g. `@module(cpu-animator)`
- `@pdf` — A PDF in the document. Without `edit`, the browser's own viewer shows it — it scrolls, zooms, searches and fills in a form. @inc of a .pdf becomes this. With the `edit` flag it is edited in the document: its pages are drawn by IDoc's own PDF renderer, and the block's lines are the edits, each naming a page by its number in the original (or `other.pdf#2`) and positions as percentages from the top left: `pages 1-3,5` (keep and order), `rotate 2 90`, `insert appendix.pdf 1-2 after 5`, `note 1 at 30%,40% "…"` (a real comment; `id=n1` names it, and `note 1 at 34%,40% "…" reply=n1 by="Ada"` answers it, so comments thread as they do in Acrobat), `highlight 2 10%,20%,60%,4%`, `text 1 at 62%,8% "…" size=12`, `rect`, `ink 3 points=x,y;x,y`, `redact 2 10%,50%,80%,5%` (the page becomes its own picture with the box burned in, so nothing under it is left in the file), `fill name="…"` (a form field, drawn in the field's own font; a name with spaces is quoted), `protect allow=print` (AES-256; the password is asked for at export, never written down), `export out.pdf`. The card draws pages and thumbnails, lists the form's fields and the notes with their replies in its side panel, writes every edit as a line, and Export PDF writes the result. With `id=`, `pts=`, `expect=` it is marked on the server from the lines: `pages=4, order=3 1 2, rotated>=1, notes>=1, highlights>=2, filled(name), redactions>=1, protected, exports=pdf`.
  args: `file` (the PDF to show); `w` (width (e.g. 60%, 400px)); `h` (height (default 60vh)); `caption` (a caption under it); `alt` (for a screen reader); `edit` (edit it in the document (flag): the block's lines are the edits, to @end — pages, rotate, insert, note, highlight, text, rect, ink, redact, fill, protect, export); `expect` (what to check (with edit) — pages=4 · order=3 1 2 · rotated>=1 · inserted>=1 · notes>=1 · highlights>=2 · texts>=1 · boxes>=1 · ink>=1 · redactions>=1 · marks>=3 · fills>=1 · filled(name) · filled(name)=Ada · protected · exports=pdf); `pts` (points this exercise is worth); `noedit` (show the edits, no tools (flag))
  e.g. `@pdf(file=notes.pdf)`
- `@photo` (block, closed by `@end`) — Raster editing in the document, layers and all. The body IS the picture: `canvas WxH`, with `16bit` or `32bit` (floating point, linear light) and a colour space — `srgb` (the default), `gray`, `lab`, or `cmyk profile=press.icc` (a CMYK canvas needs its press's ICC profile) — shown in the card as it will come out. Then one line per layer, bottom first: `layer NAME fill #color`, `fill #a→#b angle=N` (a gradient), `import path.png` (or `file.psd#2`, a layer of a layered file), `smart logo.png scale=0.5 rotate=15 at=320,240` (a smart object: drawn from its source through the transform every time, never resampled twice; `quad=` takes its eight corner numbers), `adjust KIND …` — Photoshop's fifteen: `brightness by=`, `contrast by=`, `levels black= white= gamma=`, `curves rgb=(in,out)…`, `exposure stops= offset= gamma=`, `vibrance by= sat=`, `huesat hue= sat= light=`, `colorbalance shadows=r,g,b mids= highlights=`, `bw r= g= b=`, `photofilter color=# density= keep=no`, `mixer r=r,g,b[,+] g= b=`, `invert`, `posterize levels=`, `threshold level=`, `gradientmap #a→#b` — or `text "…" font=F size color=# at x%,y%`. `group NAME` gathers the layers that say `in=NAME` (isolated; `group NAME pass` is pass-through), and groups nest. Any layer takes `blend=multiply`, `opacity=0.4`, `hidden` and a mask: `mask=rect:x0,y0,x1,y1`, `mask=poly:x,y;x,y;…` (the lasso), `mask=wand:x,y,tolerance`, `mask=subject` (Select Subject: a classical saliency seed and graph cut, not a trained model; `mask=subject:x0,y0,x1,y1` says where the subject is), or `mask=file.psd#2@mask` (a layer mask kept from an opened file). Paint is text too, in the order it happened: `stroke LAYER color=# size= points=x,y;x,y` (a pen's pressure per point as `x,y,p`), `erase LAYER size= points=…`, `rect LAYER x0,y0,x1,y1 color=#`. `export poster.psd poster.png` names what to write. Open reads Photoshop (PSD and PSB, 8, 16 and 32 bits, with groups, smart objects, adjustment layers and layer masks), Krita (.kra), OpenRaster (GIMP, MyPaint) and PNG as layers; Export writes PSD (PSB past 30000 px), KRA, ORA, PNG and, on a 32-bit canvas, a floating-point TIFF. The kernel composites in linear light, on the GPU when there is one and the CPU reference otherwise. With `id=`, `pts=`, `expect=` it is marked on the server from the text: `layers>=3, masks>=1, adjustment=curves, size=1800x2400, blend(Shade)=multiply, opacity(Shade)<=0.5, hidden(Shade), exports=psd`.
  ```
  @photo
  canvas 1800x2400
  layer Background fill #f4d35e→#c8553d angle=160
  layer Title text "RUTGERS DESIGN WEEK" font=Schibsted 72 color=#f7f7f2 at 8%,78%
  @end
  ```
- `@problem` — The task a student is set inside the @module above it — marked by a named template, worth points, and openable in a live class like any other exercise. The key = value lines in its body are the answer key and are stripped from a student's paper.
  args: `template` (which adapter marks it: bits.kmap-min, bits.truth-table, asm.final-register, asm.final-memory, writeup.contains, writeup.length); `pts` (points this problem is worth); `time` (live class: how long it stays open once the teacher opens it (8m, 90s))
  ```
  @problem(bits.kmap-min, pts=10)
    Cover every min-term in at most 8 literals.
    minTerms = 0 2 5 7
    maxLiterals = 8
  @end
  ```
- `@shape` — A vector shape: rect, ellipse, triangle, diamond, pentagon, hexagon, star, arrow, line, callout. Add x=/y= to place it on a slide.
  e.g. `@shape(star, w=80, fill=#f5b800)`
- `@smartart` — A laid-out diagram from a list: process (arrows), list (stacked), cycle (ring), hierarchy (org chart).
  e.g. `@smartart(process, Plan; Build; Ship)`
- `@video` — A video player.
  args: `src` (video file); `poster` (still image shown before play); `width` (player width); `label` (name for @ref to point at · also title=); `autoplay` (start playing on load (flag)); `loop` (repeat when it ends (flag))
  e.g. `@video(file=demo.mp4, width=60%, poster=thumb.png)`

## Code

- `@benchmark` (block, closed by `@end`) — Times everything inside, from render to the last run, and records it in milliseconds under the name given — `@benchmark(result) … @end`. For one widget's own run, put `benchmark=NAME` on @lab / @code / @octave / @graph / @cad / @notebook and the time shows in its toolbar. A question does not run, so it has nothing to time.
  args: `` (the name that receives the milliseconds — @benchmark(result) … @end)
  ```
  @benchmark(result)
  @lab(octo, run)
  x = rand(500); s = sum(sum(x))
  @end
  @end
  ```
- `@cell` (block, closed by `@end`) — One runnable notebook cell; a bare @cell inherits the previous cell's language. Inside a @table it means the other kind of cell — one cell of an explicit @row, holding anything, newlines and all.
  e.g. `@cell(python) … @end`
- `@code` (block, closed by `@end`) — A code block. Add `run` to make it runnable, and @q(...) inside for gradeable blanks.
  args: `text` (inline @code(text): the code itself, when it is not the first argument); `language` (language for highlighting and for running it); `run` (make it runnable (flag)); `expect` (expected output (graded)); `tol` (tolerance); `tests` (hidden test checks — inline, or a file: tests=sv/alu_tb.sv (a Verilog testbench compiled with the student's module)); `pts` (points this exercise is worth; without it, a checked block right after @qc(P) is that question and takes P); `lines` (scan form: ruled lines for the handwritten answer (default: twice the starter, 8 to 30)); `time` (live class: how long it stays open once the teacher opens it (5m, 90s)); `stdin` (input fed to the program); `submit` (server = submittable); `timeout` (seconds before it is stopped); `width` (editor cols); `height` (editor rows); `active` (editable lines); `debug` (per-test grading (flag)); `caption` (caption under the listing); `label` (name for @ref to point at); `benchmark` (name that receives this widget's run time in ms (shown in its toolbar; @benchmark blocks and getBenchmark read it))
  ```
  @code(python)
  print(1)
  @end
  ```
- `@codeblock` (block, closed by `@end`) — A read-only code listing. Aliases: `@listing`.
  e.g. `@codeblock(language=python) … @end`
- `@codebox` (block, closed by `@end`) — An editable code box (no Run).
  e.g. `@codebox(python) … @end`
- `@codegen` — A randomized code template (idoc-pre): a program in its own language with setup lines (#@ n = rand(2, 9), check, stdin, rename), @(expr:fmt) values in any bit width, @blank(code) fill-ins and @ans output questions. Every mistake is listed before anything is generated; @gencode places it.
  ```
  @codegen(python, id=strings)
  #@ n = rand(2, 4)
  print("ab" * @(n)) # @ans
  x = @blank(@(n) * 2)
  print(x) # @ans
  @end
  ```
- `@codepre` — Generates a .pre template file in place, the same way as @gencode: its language comes from the name before .pre (ops.sv.pre is SystemVerilog), and the program is run for its answers.
  e.g. `@codepre(src=code/ops.sv.pre)`
- `@codex` — The terse code include: @codex(first.sv). The suffix names the language, and it arrives runnable when that language has a runner — a .md or .json stays a plain listing.
  args: `src` (the file to show and run, relative to this document (also file=, path=, source=)); `lang` (override the language when the suffix can't say · also language=); `run` (force a Run button (flag)); `norun` (listing only, never runnable (flag)); `edit` (editable editor instead (flag)); `expect` (expected output (graded)); `tests` (hidden test checks); `stdin` (input fed to the program); `pts` (points this exercise is worth); `submit` (server = submittable); `timeout` (seconds before it is stopped)
  e.g. `@codex(01beginner/first.sv)`
- `@gencode` — Places a @codegen template generated for each student's seed and run on the server for its answers: the listing with its blanks, then one question per @ans line. A second number places that many variants.
  e.g. `@gencode(strings)`
- `@inc` — Include a file: another .idoc splices in, an image becomes @img, anything else becomes a code listing. `edit`/`run` make it interactive; `#name` pulls one @snip region. Aliases: `@input` `@include`.
  e.g. `@inc(file=part.idoc)`
- `@include` — Extract a named @snip region from a file.
  e.g. `@include("code/lib.cpp", solve)`
- `@incsyntax` — Include a whole file as a syntax-highlighted code listing.
  e.g. `@incsyntax(file=example.cpp)`
- `@input` — Include a whole .idoc, recursively (spec spelling). In a COURSE file it splices the department's half of the course — one late policy, one grade scale, one set of outcomes, in one place instead of pasted into every course; in a document it brings in a question bank or a shared rubric. Aliases: `@inc`.
  e.g. `@input("partials/intro.idoc")`
- `@listing` (block, closed by `@end`) — Alias of @codeblock. Aliases: `@codeblock`.
  e.g. `@listing(c) … @end`
- `@notebook` (block, closed by `@end`) — A Jupyter/Colab-style notebook — cells sharing one kernel.
  args: `time` (live class: how long it stays open once the teacher opens it); `kernel` (python / js); `benchmark` (name that receives this widget's run time in ms (shown in its toolbar; @benchmark blocks and getBenchmark read it))
  ```
  @notebook(kernel=python)
  @cell … @end
  @end
  ```
- `@shellbox` (block, closed by `@end`) — A terminal / shell box.
  ```
  @shellbox
  $ make
  @end
  ```
- `@snip` (block, closed by `@end`) — Mark a named region of a source file so @include can pull just that region.
  ```
  // @snip(g)
  void g() {}
  // @endsnip(g)
  ```
- `@tests` (block, closed by `@end`) — Hidden test checks for a runnable code question. Each line is one check; `<<<` adds stdin for that check.
  ```
  @tests
  sum is 5
  total is 7 <<< 3 4
  @end
  ```
- `@variantlabel` — This paper's variant and seed, as "Variant 12 · seed 14845" (the seed alone for a student's online paper; nothing in the editor's unseeded preview). Put it in a header to print it on every page. @var(seed) and @var(variant) give the numbers alone.
  e.g. `@variantlabel`

## Interactive studios

- `@algoviz` (block, closed by `@end`) — A step-through algorithm visualizer — sorts (bubble/insertion/quick/merge) and graph search (bfs/dfs/dijkstra).
  args: `time` (live class: how long it stays open once the teacher opens it); `expect` (what the run produced, e.g. "final=1,2,5,8" (final/order/steps/dist(NODE))); `submit` (server = submittable exercise); `pts` (points it is worth); `theme=dark|studio|showcase` (dark / studio / showcase)
  e.g. `@algoviz(quicksort) … @end`
- `@automaton` (block, closed by `@end`) — A finite automaton or Turing machine — state diagram, and step the input string (DFA/NFA/TM).
  args: `accepts` (comma-separated strings the machine must accept (an empty entry is the empty string) — each is one check); `rejects` (comma-separated strings it must reject); `pts` (points this exercise is worth); `time` (live class: how long it stays open); `theme=dark|studio|showcase` (dark / studio / showcase); `input` (preset test string); `noedit` (hide the DSL editor (flag))
  ```
  @automaton
  start -> q1 on a
  @end
  ```
- `@cad` (block, closed by `@end`) — Parametric 3-D CAD — OpenSCAD-style CSG, orbit viewport, STEP/STL export. kernel=occ gives real BREP fillets and chamfers.
  args: `submit` (server = the student can submit this exercise; the submission is kept and graded); `expect` (measurements the solid must have, e.g. "volume=8000, w=20" (volume/area/triangles/w/d/h/cx/cy/cz/watertight)); `tolerance` (how far a measurement may be off); `pts` (points this exercise is worth); `theme=dark|studio|showcase` (dark / studio / showcase); `height` (viewport height); `color` (solid colour (#rrggbb)); `kernel` (occ = OpenCASCADE BREP (real fillet/chamfer/STEP)); `axes` (show X/Y/Z axes + grid (default on; =false hides)); `light=studio|soft|technical|dramatic|sun` (lighting rig: studio / soft / technical / dramatic / sun); `noedit` (hide the source editor (flag)); `w` (cell width); `x` (left edge — absolute placement); `y` (top edge — absolute placement); `z` (back/front); `benchmark` (name that receives this widget's run time in ms (shown in its toolbar; @benchmark blocks and getBenchmark read it))
  ```
  @cad
  cube([10,10,10]);
  @end
  ```
- `@calc` — An on-screen calculator — basic, scientific, graphing, or RPN. `for=N` fills question N.
  args: `theme` (light / dark — the calculator's own colours; default follows the document); `mode=basic|scientific|graphing|hp48|rpn` (scientific/graphing/rpn); `for` (which question(s) it fills — by id (for=prob6 prob7), the Nth fill-in (for=2), or active · also bind=); `w` (calculator width); `h` (calculator height); `float=left|right` (wrap text on the left or right)
  e.g. `@calc(scientific)`
- `@chem` (block, closed by `@end`) — Chemistry: draw a molecule from SMILES, or balance an equation.
  args: `time` (live class: how long it stays open once the teacher opens it); `expect` (the balanced equation, e.g. "2H2 + O2 -> 2H2O" (arrow spelling and spacing do not matter)); `submit` (server = submittable exercise); `theme=dark|studio|showcase` (dark / studio / showcase)
  ```
  @chem
  CCO
  @end
  ```
- `@draw` (block, closed by `@end`) — The vector drawing studio — shapes, text, arrows, paths, circuit parts and wires; edits write back as a line DSL, and a drawing can be an exercise the server marks (expect= pairs and a drawn @solution key). Tools: Select, Direct selection (drag a path's anchors and handles; double-click an anchor for smooth or corner; Alt-click a segment adds a node; Delete removes one), Pen (click for a corner, drag for a smooth curve, Alt breaks the handles, click the first anchor to close), Shape builder (drag across the selection's regions to merge them, Alt-drag to delete), and the shape tools. Pathfinder unites, subtracts, intersects or excludes the selected shapes into one path; `fill linear(#a,#b,angle)` and `fill radial(#a,#b)` are gradient fills; a path is `path p1 d "M 0 0 C …"` and any shape takes `stroke #c`, `sw 2`, `dash 4,2`, `rule evenodd`, `cap round|square|butt` and `join round|bevel|miter`, and `matrix a,b,c,d,e,f` for a stroke drawn under a skew; `envelope TL TR BR BL` bends any shape into four corners and `mesh … grid CxR colors …` is a gradient mesh with movable nodes; `blend b1 from r1 to e1 steps 5` draws the shapes between two and follows them as they move; `artboard Name at x,y size w,h` names a region that Export artboards writes as its own SVG. Export writes SVG, PNG and DXF. Open DXF/DWG brings in a CAD drawing with its layers, arcs, ellipses, splines, polylines, text and blocks — a DWG of R2000, R2004, R2010, R2013 or R2018 through our own reader (an R2007 file is refused, with the way round it); Open SVG an Illustrator, Inkscape or Figma drawing; Open PDF/AI/EPS reads a PDF page, an Illustrator file or an EPS by our own readers, every shape a path and every run of text a text element. What a file has that is not drawn (hatches in a DWG, 3D solids) is counted and said. A question can ask `blends=` and `artboards=` too.
  args: `expect` (what to check, as named pairs — parts=battery,switch,lamp · count(resistor)=2 · connected=b1-s1 · series=b1,s1,l1 · polarity=b1:+→s1 · labelled=Vin · shape=triangle · within(l1)=80,40,10 · match=solution · curve=solution; each pair is one check, the score is the fraction right); `tolerance` (how far a position may be off, in drawing units (default 8)); `pts` (points this exercise is worth); `height` (drawing height in px (the page's height)); `width` (drawing width in px (the page's width)); `grid` (snap pitch in px, or off); `caption` (a caption under the printed figure); `src` (a picture to draw over (circle the fault) — stretched to width × height, on screen and in the PDF, so give those its proportions); `theme=dark|studio|showcase` (dark / studio / showcase); `noedit` (show the drawing, no tools (flag)); `time` (live class: how long it stays open once the teacher opens it)
  ```
  @draw(height=280)
  rect r1 at 40,40 size 120,70
  text t1 at 50,60 "A box"
  @end
  ```
- `@eecad` (block, closed by `@end`) — Electrical CAD, one namespace: @EECad(type, …). sourdough is the breadboard workbench — a real breadboard, an Arduino and real components, wired by hand and SIMULATED, its @sketch compiled and run; schematic is the KiCad-class schematic — symbols, wires, ERC, ngspice; pcb is the board studio, or with file= a board to view (.brd, .kicad_pcb, .bpcb). Every type can be an exercise the server marks against expect= and a @solution key. @lab(EECad=type, …) is the same block.
  args: `type` (the first argument, and required — sourdough (the breadboard workbench) · schematic · pcb); `expect` (sourdough: what to check, as named pairs — nets=solution · parts=led,resistor · count(resistor)=1 · V(bb1.e12)>4.5 · current(d1)<25mA · blink(d1)=1Hz±10% · led(d1)=on · serial~=/ready/i · burnt=none · net(bb1.a5)=bb1.a1,bb1.j20 (all joined to it) · apart(bb1.e5)=bb1.f5 (none joined); each pair is one check, the score is the fraction right  ·  schematic: checks as named pairs: node voltages from .op ("V(OUT)=3.33" — label the net and grade THAT), and the circuit's STRUCTURE — parts=vsource,resistor · count(resistor)=2 · nets=solution (the wiring equals the body's @solution key up to names and placement, values within tolerance) · erc=clean · missing=0 · extra=0; each pair is one check  ·  pcb: checks as named pairs over the student's board: drc=clean · unrouted=0 · connected=solution (the same pads joined as in the body's @solution key, whatever the route) · parts=R1,R2,J1 · count(R0805)=2 · missing=0 · extra=0 · tracks= · vias= · layers=; each pair is one check); `pts` (sourdough: points this exercise is worth  ·  schematic: points this exercise is worth  ·  pcb: points this exercise is worth); `run` (sourdough: how long to simulate before reading, in milliseconds (grading)); `seed` (sourdough: seeds every noise source, so a graded run reproduces exactly); `speed` (sourdough: simulated seconds per real second (1 = real time)); `sim` (sourdough: on = start simulating straight away · auto · off); `board` (sourdough: the microcontroller: uno · nano · mega (2560) · attiny85); `parts` (sourdough: restrict the component panel to these components — `@EECad(sourdough, led, resistor, battery)` also works. A name the parts table does not have is a lint warning that says so, because the panel cannot); `tolerance` (sourdough: how far a measured value may be off, as a fraction (default 0.05)  ·  schematic: how far a voltage may be off); `code` (sourdough: which code panel a student gets — blocks · both (blocks beside the text) · text · none); `labels` (sourdough: yes = show part names like D1 on the canvas (off by default)  ·  pcb: false = no reference designators on a .brd board); `pinlabels` (sourdough: no = hide a board's own pin lettering); `grid` (sourdough: no = a plain drawing surface, without the dot grid); `bg` (sourdough: the drawing surface's colour (white by default) — any CSS colour); `views` (sourdough: which views of the circuit the block offers, as a list: breadboard · schematic · pcb (all three by default; both = breadboard and schematic) — views=schematic makes a schematic exercise of it); `noedit` (sourdough: show the circuit, no tools (flag)  ·  schematic: hide the source editor (flag)  ·  pcb: hide the source editor (flag)); `hex` (sourdough: a compiled sketch, when a publication carried one); `time` (sourdough: live class: how long it stays open once the teacher opens it  ·  schematic: live class: how long it stays open once the teacher opens it  ·  pcb: live class: how long it stays open once the teacher opens it); `submit` (schematic: server = the student can submit this exercise; the submission is kept and graded); `height` (schematic: the schematic view’s own height (--sch-h) — h= sizes the whole card instead); `probes` (schematic: the nets Simulate plots (OUT,VIN) — the studio's Probe tool writes this when you click a pin or a wire; nothing here = every net); `theme` (schematic: dark / studio / showcase  ·  pcb: dark / studio / showcase); `file` (pcb: a board to show as it is: an EAGLE .brd, a KiCad .kicad_pcb, or a .bpcb block (a head naming a file is the one-line viewer; a head without one opens the board studio and the body is the board DSL)); `ask` (pcb: identify = the student clicks a named part on a .brd board); `target` (pcb: the part to click (with ask=identify)); `ratsnest` (pcb: false = no ratsnest lines on a .brd board)
  ```
  @EECad(sourdough, id=bench)
  uno u1 at 40,120
  breadboard bb1 at 300,60
  led d1 at bb1.e12 to bb1.e13
  resistor r1 at bb1.a13 to bb1.-t value 220
  wire u1.13 to bb1.a12 color green
  wire u1.gnd to bb1.-t color black
  @sketch
  void setup() { pinMode(13, OUTPUT); }
  void loop() { digitalWrite(13, HIGH); delay(500); digitalWrite(13, LOW); delay(500); }
  @end
  @end
  ```
- `@flashcards` (block, closed by `@end`) — A spaced-repetition deck (front :: back) with SM-2 scheduling; progress is saved locally.
  args: `time` (live class: how long it stays open once the teacher opens it); `theme=dark|studio|showcase` (dark / studio / showcase); `deck` (alias of id)
  ```
  @flashcards
  ohm :: V = I R
  @end
  ```
- `@gpu` — A WebGPU field visualization driven by a maths expression.
  args: `field` (math expr); `scale` (resolution scale); `height` (canvas height); `colors` (colour ramp); `interval` (animation step (ms))
  e.g. `@gpu(field=sin(x*4)+cos(y*4))`
- `@lab` (block, closed by `@end`) — One namespace for every studio widget: cad / octave / logic / sim / mesh / chem / automaton / schematic / notebook / spreadsheet / music / flashcards / shader / graph / code / prove (a proof the student writes: @lab(prove, pts=6, goal="…") — checked by IDoc's kernel in their browser for feedback and re-checked on the server for the mark). `file=` loads external source; `submit=server` makes it a submittable exercise.
  e.g. `@lab(cad) … @end`
- `@logic` (block, closed by `@end`) — Digital logic: truth table, Karnaugh map with the minimized form, and a live gate simulator. Gates as calls with any number of inputs (NAND(A, B, C, D)), components of your own (def Name(a, b) = …, drawn as a box that opens into its gates), feedback by naming (Q = NOR(R, Qn)), flip-flops and latches clock first (Q, Qn = DFF(CLK, D); TFF, JKFF, DLATCH, SRLATCH), tristate buses (BUS = TRI(A, EN)), MUX, DEC, HA, FA, loops (S[i], C[i+1] = FA(A[i], B[i], C[i])  for i in 0..3 — one line per bit — or for i = 0..7 { … } blocks, nested, with def … { … }, vector ports a[4], slices s[4k .. 4k+3], skipped outputs and // comments), and @(col,row) to place a gate on the grid (or, on a line of its own, A @(0,3) to place an input's or output's terminal) — @(col,row,flip) mirrors it and r90, r180, r270 turn it (@(flip) alone works too). A circuit is drawn as a schematic; a sequential one has Pulse CLK, a state table and a timing diagram. Graded by answer= (one expression, or one per output) and check= clock traces.
  args: `answer` (the boolean expression the FIRST output must be equivalent to (truth table), e.g. answer=a&b; or one per output, answer="S = A^B; Cout = AB + Cin(A^B)" — marked by the server on hand-in); `check` (clock traces a sequential circuit must follow, e.g. check="CLK:0101 D:1100 -> Q:0011" (- is don't care; several separated by ;)); `pts` (points this exercise is worth); `time` (live class: how long it stays open once the teacher opens it (4m, 90s)); `theme=dark|studio|showcase` (dark / studio / showcase); `noedit` (hide the source editor (flag))
  ```
  @logic
  Y = A & B | ~C
  @end
  ```
- `@mesh` (block, closed by `@end`) — A Blender-style mesh editor: primitives, edit mode, G/R/S/E, modifiers, glTF/OBJ/STL export.
  args: `time` (live class: how long it stays open once the teacher opens it); `expect` (counts the finished mesh must have, e.g. "verts=8, faces=6" (verts/faces/tris)); `submit` (server = submittable exercise); `pts` (points it is worth); `theme=dark|studio|showcase` (dark / studio / showcase); `height` (viewport height); `h` (height)
  e.g. `@mesh … @end`
- `@music` (block, closed by `@end`) — Music notation on a staff, with Web Audio playback.
  args: `time` (live class: how long it stays open once the teacher opens it); `expect` (the notes played, e.g. "count=5, notes=C4 D4 E4" (notes/count/tempo/clef)); `submit` (server = submittable exercise); `theme=dark|studio|showcase` (dark / studio / showcase)
  ```
  @music
  c4 d4 e4
  @end
  ```
- `@octave` (block, closed by `@end`) — Octave compute + plot, in the browser.
  args: `expect` (the printed output (or the value side of `ans = 5`) that marks it — the server re-runs the program, seeded and time-boxed); `tolerance` (how far a printed number may be off); `pts` (points this exercise is worth); `time` (live class: how long it stays open); `theme=dark|studio|showcase` (dark / studio / showcase); `height` (code-area height); `w` (cell width); `h` (height); `x` (left edge — absolute placement); `y` (top edge — absolute placement); `z` (back/front); `benchmark` (name that receives this widget's run time in ms (shown in its toolbar; @benchmark blocks and getBenchmark read it)); `noedit` (hide the code pane, keep the toolbar (flag; nosrc means the same))
  ```
  @octave
  A = [1 2; 3 4]; det(A)
  @end
  ```
- `@quantum` (block, closed by `@end`) — A quantum circuit in @logic's grammar: q0, q1 = QUBITS(2), gates H X Y Z S T RX RY RZ CNOT CZ SWAP TOFFOLI, c0 = MEASURE(q0), classical control (X(q1) if c0) and classical logic on the bits. Drawn in the standard notation; the exact probability of every outcome, each qubit's chance of reading 1 and the final state. Graded by answer="00:0.5 11:0.5".
  args: `answer` (every classical outcome with its probability, e.g. answer="00:0.5 11:0.5" — marked by the server on hand-in); `bits` (the order of the outcome digits, e.g. bits="c1 c0" (default: the order the bits are first written)); `tol` (how far a probability may be off (default 0.01)); `inputs` (classical inputs held while grading, e.g. inputs="a=1 b=0"); `pts` (points this exercise is worth); `theme=dark|studio|showcase` (dark / studio / showcase); `noedit` (hide the source editor (flag))
  ```
  @quantum
  q0, q1 = QUBITS(2)
  H(q0)
  CNOT(q0, q1)
  c0 = MEASURE(q0)
  c1 = MEASURE(q1)
  @end
  ```
- `@shader` (block, closed by `@end`) — An editable WGSL shader with a live preview — and it can be graded.
  args: `time` (live class: how long it stays open once the teacher opens it); `scale` (resolution scale); `height` (canvas height); `tol` (± tolerance when grading the output · also tolerance=); `prompt` (question text shown above); `pts` (points it is worth)
  ```
  @shader(tol=0.02)
  …WGSL…
  @end
  ```
- `@sim` (block, closed by `@end`) — An interactive physics sandbox with live sliders — pendulum, projectile, spring, orbit, double pendulum.
  args: `pts` (points this exercise is worth — the student hands in the settings they reached and a teacher marks them); `time` (live class: how long it stays open once the teacher opens it); `theme=dark|studio|showcase` (dark / studio / showcase)
  e.g. `@sim(pendulum) … @end`
- `@sketch` (block, closed by `@end`) — The program, inside an @EECad(sourdough) block — real Arduino C++, compiled and executed on a simulated ATmega328P, which is why the LED blinks when you press Start.
  ```
  @sketch
  void setup() { pinMode(13, OUTPUT); }
  void loop() { digitalWrite(13, HIGH); delay(500); digitalWrite(13, LOW); delay(500); }
  @end
  ```
- `@spreadsheet` (block, closed by `@end`) — A real sheet: ~60 functions (SUM, IF, VLOOKUP, COUNTIF, dates, text, & concat), $-anchored refs that translate on copy/fill, selection + keyboard + undo, TSV/CSV clipboard and import/export, insert/delete with formula rewriting, sort, a fill handle, an @styles sub-block (bold/fill/color/align/format, border=thin|medium|thick with bordercolor= and edges=tblr for some edges only (edges=b underlines a header row; a fill without color= gets text that reads on it), cross-sheet refs (=MAX(Readings!B2:B9)), merge for a merged range, when= conditional rules), freeze=r:c panes, widths= column widths, and a PDF that prints the computed grid with its merges and borders. File › Export › Excel workbook writes every @spreadsheet in the document as one .xlsx (one sheet each, its @graph(source=sheet:NAME) charts as Excel charts), and Import reads a workbook back the same way. Name it and a chart reads it LIVE: @graph(source=sheet:NAME). source=data.bct opens a read-only big-data view.
  args: `time` (live class: how long it stays open once the teacher opens it); `name` (the sheet's name — @graph(source=sheet:NAME) charts it live; sheet:NAME!A1:B20 charts a range); `freeze` (rows:cols pinned while scrolling, e.g. freeze=1:1); `widths` (column widths in px, space-separated); `source` (a .bct column table opens as a read-only million-row data view); `submit` (server = the student can submit this exercise; the submission is kept and graded); `theme=dark|studio|showcase` (dark / studio / showcase); `readonly` (non-editable grid (flag)); `expect` (cells that must hold given values, e.g. "B2=42, C3=7" — each is a check, the score is the fraction right); `tolerance` (how far a numeric cell may be off); `pts` (points this exercise is worth)
  e.g. `@spreadsheet(name=grades, freeze=1:1) … @end`
- `@studio` (block, closed by `@end`) — A studio widget — the same block as @lab, which the parser dispatches to the same handler. Use whichever name reads better; the arguments are identical.
  ```
  @studio(cad, height=460)
  …
  @end
  ```
- `@vdebug` — The debugger in the document — the short spelling of @visual_debug, dispatched to the same place by the parser. Everything written about @visual_debug applies unchanged.
  e.g. `@vdebug(cpp, id=sort, profile=flamegraph)`
- `@visual_debug` — The debugger, in the document. Point it at a @code block (id=) or a file (src=) and it mounts the real debugger under it — a waveform for Verilog/SystemVerilog, a timeline/flamegraph/roofline for C, C++, CUDA and Rust. SystemVerilog needs no build command: the $dumpfile block is added for you, because there is one way to compile a testbench. C++ and CUDA DO get a build line, because -O0 and -O3 are different programs. Profiles are taken on your own machine, never on the server.
  args: `language` (the language, when the first argument does not name it (printed in the PDF's placeholder)); `w` (width of the debugger panel (any unit) · also width=); `src` (a file to debug instead (one of id= or src=, never both)); `profile` (timeline · flamegraph · roofline · source · memory, joined with + (not for HDL)); `build` (the compile line — C/C++/CUDA/Rust only; a testbench has one way to build); `controls` (yes = the reader may edit the build line and re-run (default no)); `signals` (the waveform's signals, authored: tb.clk, tb.q[3:0]:hex, group(alu){ … }); `radix` (hex · bin · dec · oct · ascii · signed (per-signal overrides go in signals=)); `from` (start of the visible window (40ns, 1.5ms)); `to` (end of the visible window); `capture` (a profile taken elsewhere: .json (Chrome/nsys), a perf fold, or an ncu csv); `expect` (an assertion over the trace, which makes it markable); `pts` (points this is worth); `h` (height of the panel)
  e.g. `@visual_debug(systemverilog, id=counter)`
- `@visualdebug` — The debugger in the document — the same block as @visual_debug, under a second spelling the parser also accepts. Everything written about @visual_debug applies unchanged.
  e.g. `@visualdebug(systemverilog, id=counter)`
- `@widget` (block, closed by `@end`) — A studio widget — the same block as @lab, which the parser dispatches to the same handler. Use whichever name reads better; the arguments are identical.
  ```
  @widget(logic, height=420)
  …
  @end
  ```

## Data & charts

- `@data` (block, closed by `@end`) — Inline CSV/JSON data for the @graph directly above it.
  ```
  @graph(type=line)
  @data
  x,y
  1,2
  @end
  ```
- `@geo` — Paste a Google Maps URL, download the area, compress it to our block format and get a ready @graph. Needs the local server.
  args: `type=flyover|terrain|map|street` (flyover / terrain / map / street — the first word does this too); `name` (a name for the place (used for the asset file)); `url` (paste a Google Maps URL — the bbox fills itself in); `west` (bounding box — west longitude); `south` (bounding box — south latitude); `east` (bounding box — east longitude); `north` (bounding box — north latitude); `exag` (vertical exaggeration of the terrain); `z` (zoom level)
  e.g. `@geo(type=terrain)`
- `@graph` (block, closed by `@end`) — A data-driven chart. Every type below is a complete example you can paste into a document: it carries its own data and will draw as it stands. `ask=fit`/`ask=readvalue` make a chart into a graded question.
  args: `type=bar|stacked_bar|waterfall|funnel|pie|donut|line|area|step|candlestick|timeline|histogram|…` (chart type); `pts` (points a GRADED chart (ask=fit / ask=readvalue) is worth — note points= is the inline data shorthand, not a mark); `src` (data file (.csv/.json/.bct/.obj…) — source=/file= still work); `x` (x column / range lo:hi — a;b list pairs each x with its own y series); `y` (y column / range lo:hi); `z` (z=f(x,y) expression); `r` (intermediate expr (e.g. sqrt(x^2+y^2))); `view=heatmap|contour|surface|heatmap+contour` (heatmap/contour/surface); `size` (bubble-size column); `color=roygbv|rainbow|jet|turbo|viridis|plasma|inferno|magma|coolwarm|greys` (category column / colour); `time` (time column (animation)); `label` (label column); `value` (value column — on type=terrain, readings (lon,lat,value in @data) draped over the relief); `region` (region column (choropleth)); `lon` (longitude column); `lat` (latitude column); `geo=world|us-states` (world / us-states); `projection=Natural|Mercator|EqualEarth|Equirectangular|Orthographic|AzimuthalEqualArea` (map projection); `basemap=dark|light|blueprint` (dark/light/blueprint/night); `detail` (map: high = the sharp Natural Earth 1:10m coastlines and borders (a bigger download, only for this map)); `layer=graduated|heatmap|cluster|bin|hotspot|track` (graduated/heatmap/cluster); `classes` (class-breaks N); `classify=quantile|equal` (quantile/equal); `colormap=viridis|plasma|inferno|magma|blues|greens|reds|oranges|greys|spectral|coolwarm|bwr|…` (colour scale (viridis/coolwarm/tab10…)); `colors=#0072b2;#e69f00;#009e73|#4e79a7;#f28e2b;#e15759|#1f77b4;#ff7f0e;#2ca02c|#cc0033;#5f6a72|steelblue;darkorange` (your own colours, in order: #0072b2;#e69f00); `trend=linear|poly:2|poly:3|exp|power|log|none` (trendline / fit); `showR2` (R² beside the trendline equation — shown by default; showR2=no hides it); `model=linear|poly:2|poly:3|exp|power|log` (fit model); `stat=corr` (corr — show a correlation matrix); `reduce=pca` (pca — project onto principal components); `cluster=kmeans:3|kmeans:4|kmeans:5` (kmeans:K — colour points by cluster); `normalize=percent|max|zscore` (percent/max/zscore); `agg=sum|mean|count|min|max` (sum/mean/count…); `shade=smooth|flat|wire` (smooth/flat/wire); `markers=circle|square|diamond|triangle|point|none` (marker shape (older spelling of marker=)); `ask=fit|readvalue|plot` (fit/readvalue); `center` (map centre "lon,lat"); `zoom` (initial map zoom level); `exag` (terrain exaggeration); `spin` (3-D mesh/model: on = a slow full turn, sway = a gentle turn about the front (a logo), until touched); `weather` (terrain: a .bct/.csv of readings over time (time in epoch hours, lon, lat, temp, precip, wind, winddir) — temperature, rain and wind layers with a time slider); `frame` (none — no card border or background (a globe also hides its projection bar), so the drawing floats on the slide); `sky` (terrain: the colour behind it — #hex, or none so the slide shows through); `res` (function plot: grid samples per axis (96 by default)); `title` (chart title); `xlabel` (x axis label); `ylabel` (y axis label); `width` (the width the chart is DRAWN at, in px, and the widest it is shown — a narrower card or page column shrinks the whole drawing to fit, like a picture; w= sizes the card); `height` (chart drawing height in px — w=/h= size the whole card, height= sizes the plot); `fontsize=large|huge|small|18|1.4` (size of ALL the chart text — a word (small/large/huge), a px size (18), or a multiple (1.4)); `ticksize` (tick-number size — a word, px, or a multiple); `labelsize` (axis-title (xlabel/ylabel) size — a word, px, or a multiple); `titlesize` (chart-title size — a word, px, or a multiple); `legendsize` (legend size as a multiple (1.4); legend=large/small is the word form); `marker=circle|square|diamond|triangle|point|none` (marker shape for every point: circle/square/diamond/triangle/point/none); `markersize=4|8|12|large` (marker radius in px (4 by default) — or a word/multiple; size= still spreads bubbles above it); `grid=on|off|x|y` (grid lines: on / off / x / y); `fncolor` (colour of the curve a student types into an ask=fit question); `ymin` (y axis starts here — set the scale yourself); `ymax` (y axis ends here); `xmin` (x axis starts here); `xmax` (x axis ends here); `log` (log scale: x / y / both); `bins` (histogram bin count); `legend=on|off|bottom|left|right|large|small|large bottom` (on / off / bottom — a pie shows a legend on its own when the slice names will not fit); `values` (pie/donut: print the number beside each slice — on / percent / both); `stack` (a bar chart with several series: stack them instead of grouping them (the same as type=stacked_bar)); `from` (slopegraph: the earlier column; network: the source column); `to` (slopegraph: the later column; network: the target column); `mark` (network: name these nodes on the picture (id or label; fd.nv;med.bl)); `dict` (network: draw the equation dictionaries themselves — one hub per dictionary, links where one idea crosses disciplines); `cats` (network with dict: only these dictionaries (fd;ee;med)); `target` (bullet chart: the target column); `yerr` (error bars: the ± column — one per y series (y=a;b, yerr=ea;eb); type=error_bar draws them as points); `benchmark` (name that receives this widget's run time in ms (shown in its toolbar; @benchmark blocks and getBenchmark read it))
  ```
  Bar — One number per category. The default when you have labels and values.
  @graph(type=bar, x=field, y=Bachelor, title="Bachelor's degrees awarded")
  @data
  field,Bachelor,Master,Doctorate
  Engineering,126000,52000,11000
  Computer science,104000,48000,2300
  Biology,131000,15000,8100
  Physics,9600,2100,1900
  @end
  ```

## Slides

- `@deck` — Deck-wide defaults — theme, transition, ratio, footer, fonts. Any document with @deck or @slide is a presentation. Autoplay never starts on its own: autoplay=8s sets how long each slide holds, autostart is how you ask it to begin playing.
  args: `theme=dark|light|midnight|ember|paper|slate|vivid|mono|ocean|forest|sunset|graphite|…` (colour theme); `presenter` (who is presenting — printed on the title slide (author= does the same)); `author` (the deck's author, shown on the title slide when there is no presenter=); `institution` (the school or company, under the presenter on the title slide); `background` (a background image for every slide (bg= is the colour)); `autoadvance` (the older spelling of autoplay=); `speak` (read each slide aloud as it arrives); `narrate` (the older spelling of speak=); `transition=fade|slide|push|cover|reveal|zoom|fade-through-black|none` (slide transition); `ratio=16:9|4:3|16:10` (16:9 / 4:3); `size=small|normal|large|xlarge|huge` (small/large/huge); `pad` (slide inset — pad=2% or pad=1% 3% (vertical horizontal); pad=0 uses the whole stage); `fontscale` (scale every font on the deck (e.g. 1.3)); `footer` (footer text); `logo` (image path); `slidenumbers` (page numbers (flag)); `date` (show date (flag)); `accent` (brand colour); `font` (heading font); `bodyfont` (body font); `bg` (background); `fg` (text colour); `muted` (muted colour); `titlesize` (title font size on the title slide); `headingsize` (slide-heading font size); `bodysize` (body font size); `subtitlesize` (subtitle font size); `qsize` (question font size); `autoplay` (seconds between slides when autoplay is running (e.g. 8s) — does NOT start it); `autostart` (start autoplay as soon as the deck opens (flag)); `eqnsize` (equation size)
  e.g. `@deck(theme=midnight, slidenumbers)`
- `@fragment` (block, closed by `@end`) — Alias of @step — a build/reveal. Aliases: `@step`.
  e.g. `@fragment … @end`
- `@notes` (block, closed by `@end`) — Presenter notes — visible in presenter view, never on the slide.
  ```
  @notes
  remember the demo
  @end
  ```
- `@reveal` (block, closed by `@end`) — Alias of @step — content that appears on the next advance. Aliases: `@step`.
  e.g. `@reveal … @end`
- `@script_generate` — Write the deck's speaker notes out as a separate IDoc script on every save — one numbered section per slide, the notes verbatim. `talk.idoc` writes `talk-script.idoc`; `file=` names it. Renders nothing on the slides.
  e.g. `@script_generate`
- `@slide` — Starts a slide. A free positional is its title; layouts are title/section/content/two-col/center/quote/statement/picture-caption/comparison/full/blank.
  args: `layout=title|section|center|content|two-col|twocol|full|blank|quote|statement|picture-caption|comparison` (slide layout — title/section/content/two-col/center/quote/statement/picture-caption/comparison/full/blank); `transition=fade|slide|push|cover|reveal|zoom|fade-through-black|none` (how this slide arrives); `bg` (background colour/image); `advance` (auto-advance (5s)); `class` (CSS class)
  e.g. `@slide(My Results)`
- `@step` (block, closed by `@end`) — A build: reveals on the next advance. `each` turns a list into one build per item; anim=/dir= animate it. Aliases: `@reveal` `@fragment`.
  args: `anim=fade|fly|zoom|grow|wipe|float` (build animation); `dir=left|right|top|bottom` (direction the build comes from); `order` (reveal order); `dur` (how long the animation runs (s)); `delay` (wait before it starts (s)); `group` (merge with others); `each` (one build per item (flag))
  ```
  @step
  point
  @end
  ```
- `@titleslide` — A ready-made centred title slide built from the document's @title/@subtitle.
  e.g. `@titleslide`

## Papers & citations

- `@abstract` (block, closed by `@end`) — The paper abstract block.
  ```
  @abstract
  The summary.
  @end
  ```
- `@anonymous` — Blind review: replace every author with Author 1, Author 2…
  e.g. `@anonymous`
- `@author` — One author line — name, department, affiliation, email.
  args: `name` (author name); `department` (department); `affiliation` (institution); `email` (contact email)
  e.g. `@author(name=Dov Kruger, department=ECE, affiliation=Rutgers)`
- `@author_cr` — An author credit line from author.db: each name links to the generated Authors page with photo, contact and every other field.
  e.g. `@author_cr(dk, sg)`
- `@authors` — Authors pulled from author.db by id; style=full|names|short|ieee|email, or anon for blind review.
  e.g. `@authors(dk, sg)`
- `@bibliography` — Print the reference list — from a .bib file or from @references.
  e.g. `@bibliography(file=refs.bib)`
- `@cite` — Cite a reference → [n], numbered in first-citation order.
  e.g. `@cite(shannon48)`
- `@corollary` (block, closed by `@end`) — A numbered corollary block.
  e.g. `@corollary … @end`
- `@definition` (block, closed by `@end`) — A numbered definition block.
  e.g. `@definition(Entropy) … @end`
- `@example` (block, closed by `@end`) — A numbered example block.
  e.g. `@example … @end`
- `@indexterms` — Index terms for a paper (IEEE prints them as Index Terms). Aliases: `@keywords`.
  e.g. `@indexterms(fpga, timing)`
- `@keywords` — Paper keywords — IEEE prints them as Index Terms. Aliases: `@indexterms`.
  e.g. `@keywords(fpga, timing)`
- `@label` — Attach a label to the thing above so @ref/@eqref/@qref can point at it.
  e.g. `@label(fig1)`
- `@lemma` (block, closed by `@end`) — A numbered lemma block.
  e.g. `@lemma … @end`
- `@nocite` — Include a reference in the bibliography without citing it in the text.
  e.g. `@nocite(shannon48)`
- `@note` (block, closed by `@end`) — A numbered note block.
  e.g. `@note … @end`
- `@proof` (block, closed by `@end`) — A proof block (set in italics, ends with ∎). With check, @proof(check) is a proof IDoc's own kernel checks, in the reader's browser: a chain of equations, each with its reason (by ring), proving the theorem just above it (or goal="…"); reasons are ring (algebra), sum (the definition of a sum) and IH, and `induction n` with base:/step: chains proves a statement for every n (a base case the kernel can compute may be left out). A wrong step is named with what each side really is; the PDF prints the verdict.
  args: `check` (check this proof with IDoc's kernel: each line a = b, a <= b or a < b with its reason (by ring, sum, IH, auto)); `goal` (the statement it proves, quoted (default: the theorem just above))
  e.g. `@proof … @end`
- `@proposition` (block, closed by `@end`) — A numbered proposition block.
  e.g. `@proposition … @end`
- `@qref` — Reference a labelled question — prints its number ("Q3").
  e.g. `as in @qref(kvl)`
- `@ref` — Reference a labelled figure, table or section by its label.
  e.g. `see @ref(fig1)`
- `@references` (block, closed by `@end`) — Define references inline — one per line, `key: full text`.
  ```
  @references
  shannon48: C. E. Shannon, …
  @end
  ```
- `@remark` (block, closed by `@end`) — A numbered remark block.
  e.g. `@remark … @end`
- `@theorem` (block, closed by `@end`) — A numbered theorem block (the family: lemma, proof, definition, corollary, example, note, proposition, remark).
  ```
  @theorem(Pythagoras)
  a^2 + b^2 = c^2
  @end
  ```

## Exams on paper

- `@makescan` — Alias of @scanform. Aliases: `@scanform`.
  e.g. `@makescan`
- `@noai` — A notice on every printed scan-exam page that an AI model reads from a photo of it and declines to answer; faint enough that students reading the paper don't notice it. Covers the whole page except the answer boxes, so it can't be cropped out. Presets: standard (the default), light, strong (survives a scanner app's black-and-white mode), visible, off.
  args: `layers=wm+fine|wm|fine|wm+fine+band+qline|band+qline` (which parts print, joined with +: wm, fine, band, qline); `text` (the hidden wording (watermark and fine print)); `band` (the visible band's wording); `wm` (watermark strength, in printer dots out of 64); `wmsize` (watermark letter size in pt); `angle` (watermark slant in degrees); `fine=black|grey|0.5` (fine-print ink: black, grey, or a tint 0.3-1); `finesize` (fine-print letter size in pt); `finegap` (space between fine-print rows in pt); `clear` (clear space around every answer field in pt (can only grow)); `on=paper|screen|both` (where it appears)
  e.g. `@noai`
- `@noprint` (block, closed by `@end`) — Content shown on screen and left out of the PDF, the scan form and Print. Questions inside are still graded online.
  e.g. `@noprint … @end`
- `@scanform` — Turn the quiz into a printable scan form: a fixed answer box per question, registration marks, and a page/seed barcode — then Grade → Grade scans marks the uploads. Aliases: `@makescan`.
  args: `mc=bubbles|letters` (bubbles/letters); `paper=us-letter|letter|a4` (us-letter/a4); `margin` (page margin in pt (e.g. 54)); `gap` (vertical space between questions in pt (default 14)); `seed` (bind compile seed as @var(seed))
  e.g. `@scanform`

## Accessibility & audio

- `@audio` — Alias of @audioplayer — an audio player. Aliases: `@audioplayer`.
  e.g. `@audio(file=clip.mp3)`
- `@audioplayer` — An audio player — one file, or dir=folder for a playlist. Aliases: `@audio`.
  args: `src` (audio file); `dir` (playlist folder); `tracks` (several files, comma-separated — a playlist); `label` (name for @ref to point at · also title=); `autoplay` (start playing on load (flag)); `loop` (repeat when it ends (flag))
  e.g. `@audioplayer(file=clip.mp3)`
- `@braille` — Render text as Braille — and, at the top of a document, export the whole thing as a 3-D printable Braille plate. eq=cat.name brailles a dictionary entry's stored caption, or, when it has none, the spoken reading of its equation (literary Braille of the words, not Nemeth).
  args: `eq` (a dictionary key: braille its stored caption (add `, expanded` for the expanded one))
  e.g. `@braille(Hello)`
- `@enable` — Turn on document features — notably `accessibility`, which adds per-equation listen buttons and a whole-document Read aloud.
  e.g. `@enable(accessibility)`
- `@say` — Speak text with the neural voice — math inside $…$ is read as English. The whole argument is spoken, commas included. eq=cat.name speaks a dictionary entry's stored caption (expanded for its expanded caption).
  args: `text` (what to say); `eq` (a dictionary key: say its stored caption); `expanded` (with eq=: say the expanded caption instead (flag)); `speak` (what to SAY when it differs from what is shown); `voice` (e.g. mika); `rate` (speaking speed (1 = normal)); `pitch` (voice pitch); `energy` (loudness/energy); `emotion=neutral|calm|confident|warm|sad|angry|fearful|excited|reassuring|urgent` (emotional colour); `articulation` (crispness of pronunciation); `context=default|formal|conversational|clinical|educational` (speaking context — formal/conversational/clinical/educational); `autoplay` (play on load (flag))
  e.g. `@say(Welcome to lecture 1)`

## Blocks & closers

- `@e` — Short form of @end. Aliases: `@end`.
  e.g. `@e`
- `@else` — The alternative branch of @if.
  e.g. `@else`
- `@end` — Closes the innermost block. @e is the short form. Aliases: `@e`.
  e.g. `@end`
- `@enddef` — Closes @def.
  e.g. `@enddef`
- `@endlikert5` — Closes @likert5.
  e.g. `@endlikert5`
- `@endpage` — Closes @page.
  e.g. `@endpage`
- `@endpick` — Closes @pick.
  e.g. `@endpick`
- `@endpool` — Closes @pool.
  e.g. `@endpool`
- `@endquiz` — Closes @quiz (a plain @end works too).
  e.g. `@endquiz`
- `@endshuffle` — Closes @shuffle.
  e.g. `@endshuffle`
- `@endsnip` — Closes a @snip region in a source file.
  e.g. `// @endsnip(name)`
- `@endtable` — Closes @table.
  e.g. `@endtable`

## The course file

- `@assign` — Work to hand in. An .idoc assignment marks itself; anything else is an upload box. `attempts=N` with `keep=highest|latest|average`, `post=manual` to hold the marks back, `section=A` for one section, `markers=2` for two independent markers, `outcomes=` for what it measures.
  e.g. `@assign(hw1.idoc, due="2026-09-08 23:59", pts=100, cat=Homework)`
- `@course` — Names the course. The .course file IS the syllabus AND what the gradebook runs on, so a date cannot be right in one and wrong in the other.
  e.g. `@course(ECE231, title="Digital Logic Design", term="Fall 2026")`
- `@discuss` — A graded discussion. posts= and replies= state what taking part means before anybody starts, and the mark follows from it.
  e.g. `@discuss(prompt.idoc, pts=10, posts=1, replies=2)`
- `@drop` — How many lowest scores each category drops. The set dropped is the one that helps the student most, and never the last mark standing.
  e.g. `@drop(Homework=2)`
- `@exam` — A timed paper. As @assign plus a time limit; reveal=yes releases the answers with the marked paper (off by default — a key handed back is a key in next year's class). grading=scan (grade= also works) says it is sat ON PAPER and marked from scanned copies — the one column that offers Grade scans — with ONE printed paper unless variants=N asks for more; signup=required makes a student sign in to sit it, signup=optional only records attendance.
  e.g. `@exam(quiz1.idoc, due="2026-09-10 17:00", pts=25, time=30m)`
- `@gate` — Mastery before the next topic opens: what a student must reach HERE to unlock what follows. The lock says what it wants, rather than hiding the topic.
  e.g. `@gate(score>=70)`
- `@grader` — Somebody who marks but does not teach. The same list as @staff.
  e.g. `@grader(netid)`
- `@grading` — How the marking is DIVIDED among the people doing it. split=wrong deals one task per wrong answer, so a perfect paper costs a TA nothing and "one part each" means equal work rather than equal paper count; split=paper deals one task per student, for the items somebody wants read whole. An item's own split= overrides it. deal=question gives one marker a whole question for the entire class, so every copy of it is marked the same way (deal=task, the default, deals tasks as they come); double=10% sends that share of the marking to a second marker blind, to measure agreement.
  e.g. `@grading(split=wrong)`
- `@groups` — Names a set of student groups. The roster column `group:Lab` says who is in which, and an item with group=Lab is marked once for the whole group.
  e.g. `@groups(Lab, size=3, self=true)`
- `@hours` — Office hours a student can book. The door notice IS the configuration — the slots are computed from it, so changing your hours is changing one line and nothing has to be migrated. Aliases: `@officehours`.
  e.g. `@hours("Tuesday 14:00-16:00", each=15m, where="ENG 214")`
- `@late` — The late policy in one line: penalty per day or hour, a hard cut-off, and a grace period — because a wrong clock is not lateness.
  e.g. `@late(percent=10, per=day, max=3, grace=15m)`
- `@meet` — Where the class meets when it is not a room — Zoom, Meet, Teams, Discord, Webex. The link lives in the course file with every other fact about the course, instead of in a pinned message, an email from week one, and a slide nobody kept. IDoc does not host video; the feature is that the link is in the same file as the schedule. Aliases: `@meeting`.
  e.g. `@meet(https://zoom.us/j/123, title="Lecture", when="Mon & Wed 10:00")`
- `@observers` — Which page an OBSERVER gets. page=student (the default) shows them the class as a student meets it; page=staff shows them the teacher's page — the gradebook, the roster, the answers — read-only. The instructor's to choose: a TA or a grader cannot change this line. On either page an observer changes nothing. Name the observers themselves with @observer(netid) or @staff(netid=observer).
  e.g. `@observers(page=staff)`
- `@outcome` — What the course claims its students will be able to DO. Tag work with outcomes=id, and the Outcomes tab says who can and who cannot — which a percentage never answers.
  e.g. `@outcome(fsm, "Design a finite state machine", master=80)`
- `@provide` — Files the course hands over: the brief, the starter code, the data. They land in the STUDENT'S own workspace, under the course folder, where the editor they are about to work in can already see them — not in a Downloads folder they then go looking for. Nothing is written until they press Download, unless you set when=auto. A file they have already edited is never overwritten.
  args: `folder` (a folder inside the course); `title` (the button's label); `into` (where it lands in the student's workspace); `when` (click (default) or auto); `overwrite` (never (default), ask or always)
  e.g. `@provide(labs/lab4-starter/)`
- `@read` — Something to read: ungraded material in the course.
  e.g. `@read(lectures/01.idoc, title="Boolean basics")`
- `@scale` — The letter cut-offs. Highest matching cut-off wins.
  e.g. `@scale(A=93, A-=90, B=83, C=73)`
- `@staff` — Who is teaching it: teacher, ta, grader or observer. Aliases: `@teacher` `@ta` `@grader`.
  e.g. `@staff(dk1261=teacher, sg2231=ta)`
- `@ta` — A teaching assistant. The same list as @staff.
  e.g. `@ta(sg2231)`
- `@teacher` — One teacher, with a name. The same list as @staff.
  e.g. `@teacher(dk1261, name="Dov Kruger")`
- `@tool` — Somebody else's tool, inside the course — an LTI 1.3 launch. The publisher's homework system, a simulation, the department's lab tool: the student is already identified and their role already stated, so nobody signs in twice. Register the tool once in your account (Account → Tools), then name it here.
  e.g. `@tool(publisher-hw, title="Chapter 4 homework", pts=20, cat=Homework)`
- `@topic` — A block of the course — Canvas calls it a module. Runs until the next @topic; there is no closing tag to forget. Aliases: `@week` `@unit`.
  e.g. `@topic(Boolean Algebra)`
- `@unit` — A block of the course. The same thing as @topic.
  e.g. `@unit(Sequential Logic)`
- `@week` — A block of the course, for a course organised by week. The same thing as @topic.
  e.g. `@week(1, opens=2026-09-01)`
- `@weights` — What the grade is made of: category weights as percentages. Printed in the syllabus and applied by the gradebook, from this one line.
  e.g. `@weights(Homework=20, Quizzes=15, Exams=65)`

## Question kinds

`@q(kind: answer)` colon form; `@q(kind, a, *b, c)` comma form (`*` correct, `~` partial);
`@q answer @e` inline. `@qc(P)` sets points for the questions that follow.

- `@q(c:answer)` — exact answer
- `@q(draw)` — freehand sketch on a blank canvas — manually graded
- `@q(e:answer)` — alias for eq — math answer, whitespace/case normalised
- `@q(eq:form1 | form2)` — equation/math box (accepts forms); 'e:' is shorthand
- `@q(eq.expanded:x^2+3x+2)` — answer must be MULTIPLIED OUT — rejects (x+2)(x+1) copied back from the prompt
- `@q(eq.factored:(x+1)(x+1))` — answer must be FACTORED — accepts (1+x)^2, rejects the expanded x^2+2x+1
- `@q(eq.min:A'B'+A'C'+A'D)` — OPTIMAL (Karnaugh) answer: the same function, in the key's form (sum of products or product of sums), no more terms or literals — any equally small cover is right, a longer one is wrong (also eq.minimal, eq.optimal)
- `@q(eq.reduced:1/3)` — answer must be in LOWEST TERMS — rejects 2/6 and the un-evaluated 3/4+1/6
- `@q(eq.strict:x+1)` — no algebraic equivalence — exact normalized string
- `@q(essay: starter text)` — essay with editable starter text
- `@q(essay)` — free-text essay
- `@q(essay500.store:)` — written survey answer: OCR-transcribed + recorded on scan grading, 0 points (also 'survey')
- `@q(f, answer, space insensitive)` — or spell it out: case sensitive | space insensitive | insensitive
- `@q(f:answer)` — text fill-in (exact, case-insensitive by default)
- `@q(f:watt|watts)` — any of the |-separated answers is correct (e.g. watt|watts)
- `@q(f.cs:Answer)` — exact match, case matters (the strict form)
- `@q(f72:answer)` — fill-in with a fixed box width (px)
- `@q(fc, 3, 4, 0.01)` — COMPLEX answer (real, imaginary, tolerance) — the student may type 3+4j or 5*exp(i*pi/6)
- `@q(fci:answer)` — case-insensitive (explicit; same as f)
- `@q(fcs:Answer)` — the exact case is required — 'answer' does not match 'Answer' (same as f.cs)
- `@q(fcsi:answer)` — ignores both case and whitespace (explicit)
- `@q(fi:answer)` — ignores case AND whitespace (the loosest match)
- `@q(fi.min:A'B'+BC'+AC)` — a fill-in that accepts ANY minimal cover of the same map, in any order (A'C'+B'C+AB here), and rejects a longer equivalent
- `@q(fn:lo,hi)` — numeric (range, value, or >20 / >=20 / <5 threshold)
- `@q(formula: V/R)` — symbolic/derived answer, graded like eq (algebraic equivalence)
- `@q(fr:pattern)` — regex answer
- `@q(fsi:Paris France)` — ignores whitespace — 'ParisFrance' also matches
- `@q(hmc, *a, b, c)` — alias of mch — multiple choice, options across the line
- `@q(likert5)` — 5-point Likert scale
- `@q(m:3,3: =A,=B,=AND, =0,=0,_0, =1,=1,_1)` — truth table: =given labels/inputs, _value = graded blank, bare _ = ungraded
- `@q(m:rows,cols:_v1,_v2,_v3)` — matrix grid — graded cells are _value (e.g. _0); given/labels are =value; bare _ is ungraded
- `@q(m:rows,cols)` — matrix grid (ungraded)
- `@q(mad: *a, *b, c, d)` — select all that apply (multi-select list)
- `@q(mah: *a, *b, c, d)` — select all that apply (checkboxes, horizontal)
- `@q(markdraw, src=circuit.svg)` — freehand marking OVER an image — circle the fault, annotate the diagram
- `@q(match, a=1, b=2, cols=2)` — cols=N lays the pairs out in N columns instead of one tall stack
- `@q(match, a=1, b=2, distractor1, distractor2)` — bare entries (no =) are DISTRACTORS: extra wrong choices in the answer bank
- `@q(match, term1=def1, term2=def2)` — matching pairs — repeated right values dedupe in the bank
- `@q(mav: *a, *b, c, d)` — select all that apply (checkboxes, vertical)
- `@q(mcd, *correct, wrong1, wrong2)` — multiple choice (dropdown)
- `@q(mch, *a, *b, ~0.5 c, d)` — * correct · ~ partial 'more-correct' · plain wrong
- `@q(mch, *correct, wrong1, wrong2)` — multiple choice (horizontal)
- `@q(mch, grading=partial, penalty=1, *a, *b, c)` — policy: partial|proportional|jaccard|allornothing
- `@q(mcv, *correct, b, c, d, cols=2)` — cols=N lays the choices out in N columns instead of one tall stack
- `@q(mcv, *correct, wrong1, wrong2)` — multiple choice (vertical)
- `@q(moddraw, src=plot.svg, strokes=…)` — freehand over an image that starts with the author's own strokes loaded — the student modifies them
- `@q(mwidth,height:rows,cols)` — matrix grid, fixed px size
- `@q(n, 5)` — INTEGER answer (rejects 3.5); @q(n, 1, 10) = integer in range
- `@q(order, first, second, third)` — put in order
- `@q(range, 3, 5)` — answer is an interval; student types '3-5'. + mode=overlap|contains|within, tol=
- `@q(slider, min=0, max=100, answer=42, tol=2)` — drag a slider to answer, graded within ±tol
- `@q(unordered:red, white, blue)` — student lists all members in any order; partial credit; each member may use | alternatives
- `@q(uo: red, white, blue)` — terse alias of unordered — all members, any order, partial credit
- `@q(uo3:AMD|Advanced Micro Devices, Intel, Nvidia, TSMC, Samsung)` — uo3: = any 3 of the accepted pool count; more never hurts; case-insensitive (.cs opts out, .si ignores spaces)
- `@q(vmc, *a, b, c)` — alias of mcv — multiple choice, one option per line

Fused flags on `f`: trailing `i` = insensitive, `c` = case, `s` = space —
`fci` `fsi` `fi` `fcsi`. `e` is a terse alias for `eq`; `eq.strict` opts out of
algebraic equivalence.

## Generated code: the idoc-pre template language

Inside `@codegen(lang, id=X) … @end` (placed with `@gencode(X)`) or a `.pre` file (`@codepre(src=…)`):
a program in its own language plus setup lines `<c>@ name = expr` (`<c>` is the language's line
comment), `@(expr)` / `@(expr:fmt)` values, `@blank(code)` fill-ins and `<c> @ans(kind)` output questions.

Functions:
- `rand(start, end) · rand(start, step, end)` — a whole number from start to end inclusive, on the step's grid (Dov's start:step:end order) e.g. `rand(8, 4, 24)`
- `randf(lo, hi, decimals=2)` — a decimal from lo to hi, rounded to that many places e.g. `randf(1, 10, 2)`
- `pick(a, b, …)` — one of the values (or one item of a list) e.g. `pick("red", "green", "blue")`
- `pickn(n, a, b, …)` — n different values, in random order e.g. `pickn(2, "a", "b", "c", "d")`
- `shuffle(a, b, …)` — the values in a random order e.g. `shuffle(1, 2, 3, 4)`
- `randn(n, start, end)` — n different whole numbers from start to end e.g. `randn(3, 1, 20)`
- `coin(p=0.5)` — 1 with probability p, else 0 e.g. `coin(0.5)`
- `word("noun" | "verb" | "adj" | "name")` — a word from a small built-in list (no network, the same everywhere) e.g. `word("noun")`
- `ident()` — a short random identifier that is no keyword e.g. `ident()`
- `matrix(rows, cols, lo, hi)` — a rows × cols list of lists of whole numbers from lo to hi e.g. `matrix(2, 3, 1, 9)`
- `mask(start, length)` — length ones from bit start up e.g. `mask(4, 4) → 240`
- `span(start, end)` — ones from bit start to bit end inclusive e.g. `span(4, 7) → 240`
- `splitbits(width, fields, min, max)` — fields non-overlapping bit fields of min to max bits inside a word: start, end for each e.g. `splitbits(32, 3, 2, 6)`
- `bitrange(start, end)` — the range written high..low, as a hardware field is e.g. `bitrange(20, 23) → 23..20`
- `bit(n)` — the value with only bit n set e.g. `bit(5) → 32`
- `setbit(v, n)` — v with bit n set e.g. `setbit(0b1000, 1) → 10`
- `clrbit(v, n)` — v with bit n cleared e.g. `clrbit(0xFF, 0) → 254`
- `flipbit(v, n)` — v with bit n inverted e.g. `flipbit(0b1010, 3) → 2`
- `field(v, start, length)` — length bits of v from bit start e.g. `field(0xABCD, 4, 8) → 188`
- `popcount(v)` — how many bits of v are 1 (v at least 0) e.g. `popcount(0xF0F0) → 8`
- `parity(v)` — 1 when v has an odd number of 1 bits e.g. `parity(7) → 1`
- `wrap(v, w)` — v cut to its low w bits (unsigned) e.g. `wrap(-1, 8) → 255`
- `sext(v, w)` — v's low w bits read as a signed (two's complement) number e.g. `sext(0xF0, 8) → -16`
- `rotl(v, n, w)` — v rotated left n places within w bits e.g. `rotl(0b10010110, 3, 8) → 180`
- `rotr(v, n, w)` — v rotated right n places within w bits e.g. `rotr(0b10010110, 3, 8) → 210`
- `revbits(v, w)` — v's low w bits in reverse order e.g. `revbits(0b0001, 4) → 8`
- `gray(v)` — the Gray code of v e.g. `gray(5) → 7`
- `ungray(g)` — the number whose Gray code is g e.g. `ungray(7) → 5`
- `bcd(n)` — n in binary-coded decimal (each decimal digit in 4 bits) e.g. `bcd(59) → 89`
- `clog2(n)` — the bits needed to count n values (Verilog's $clog2) e.g. `clog2(100) → 7`
- `min(a, b, …)` — the smallest value e.g. `min(4, 9, 2) → 2`
- `max(a, b, …)` — the largest value e.g. `max(4, 9, 2) → 9`
- `abs(x)` — x without its sign e.g. `abs(-7) → 7`
- `clamp(x, lo, hi)` — x, held inside lo to hi e.g. `clamp(15, 0, 10) → 10`
- `gcd(a, b)` — the greatest common divisor e.g. `gcd(84, 36) → 12`
- `pow(base, exp)` — base to the power exp, exact for whole numbers of any size e.g. `pow(2, 70) → 1180591620717411303424`
- `fact(n)` — n factorial, exact e.g. `fact(20) → 2432902008176640000`
- `choose(n, k)` — the number of ways to choose k of n e.g. `choose(10, 3) → 120`
- `fib(n)` — the nth Fibonacci number (fib(0) = 0) e.g. `fib(30) → 832040`
- `isprime(n)` — 1 when n is prime e.g. `isprime(97) → 1`
- `primes(start, end)` — the primes from start to end e.g. `primes(10, 30) → 11, 13, 17, 19, 23, 29`
- `digits(n)` — the decimal digits of n e.g. `digits(4096) → 4, 0, 9, 6`
- `base(n, b)` — n written in base b (2 to 36) e.g. `base(255, 2) → 11111111`
- `roman(n)` — n in Roman numerals (1 to 3999) e.g. `roman(2026) → MMXXVI`
- `int(x)` — x as a whole number (text is read, decimals cut toward zero) e.g. `int("42") → 42`
- `round(x, d=0)` — x rounded to d decimal places e.g. `round(3.14159, 2) → 3.14`
- `range(start, end) · range(start, step, end)` — the whole numbers from start to end inclusive, on the step's grid e.g. `range(10, -3, 1) → 10, 7, 4, 1`
- `list(a, b, …)` — the values as a list e.g. `list(1, "a", 3) → 1, a, 3`
- `len(x)` — how many items a list has, or characters a text e.g. `len("hello") → 5`
- `sum(a, b, …)` — the values added up e.g. `sum(1, 2, 3, 4) → 10`
- `sorted(a, b, …)` — the values in increasing order e.g. `sorted(5, 3, 9, 1) → 1, 3, 5, 9`
- `count(x, item)` — how many times item occurs in a text or list e.g. `count("banana", "a") → 3`
- `index(x, item)` — where item first occurs (from 0), or -1 e.g. `index("banana", "n") → 2`
- `slice(x, start, end)` — items or characters from start up to (not including) end e.g. `slice("violin", 1, 4) → iol`
- `rep(s, n) · rep(s, sep, n) · rep(s, start, end) · rep(s, start, end, copies)` — s repeated: n times; n times with sep between; or with the numbers start to end between the copies (copies = how many times s appears; by default one more than the numbers) e.g. `rep("ab", 1, 4) → ab1ab2ab3ab4ab`
- `join(sep, a, b, …)` — the values as text with sep between them e.g. `join("-", 1, 2, 3) → 1-2-3`
- `upper(s)` — s in capitals e.g. `upper("idoc") → IDOC`
- `lower(s)` — s in small letters e.g. `lower("IDoc") → idoc`
- `reverse(x)` — a text or list backwards e.g. `reverse("stressed") → desserts`
- `pad(x, width, fill=" ")` — x padded on the LEFT to width characters e.g. `pad(42, 6, "0") → 000042`
- `padr(x, width, fill=" ")` — x padded on the RIGHT to width characters e.g. `padr("ab", 5, ".") → ab...`
- `substr(s, start, length)` — length characters of s from start e.g. `substr("hello world", 6, 5) → world`
- `chr(code)` — the character with that code e.g. `chr(65) → A`
- `ord(c)` — the code of the first character e.g. `ord("a") → 97`
- `bytes(s)` — the character codes of s e.g. `bytes("Hi") → 72, 105`
- `xorbytes(s, key)` — each character code of s XORed with key (as in an XOR cipher exercise) e.g. `xorbytes("Hi", 0x20) → 104, 73`
- `hexstr(v, bits)` — v's low bits as hex digits, zero-padded, no prefix e.g. `hexstr(-1, 12) → FFF`
- `binstr(v, bits)` — v's low bits as binary digits, zero-padded e.g. `binstr(5, 8) → 00000101`

Formats (after a value, `@(m:hex32)`):
- `:hexN` — a hex literal of N bits, in the program's language (0xABC, 12'hABC, $((16#ABC)) …). Written after a value: @(m:hex32).
- `:binN` — a binary literal of N bits. Written after a value: @(m:bin8).
- `:decN` — the low N bits as a decimal literal. Written after a value: @(m:dec12).
- `:sdecN` — the low N bits read as signed (two's complement), as a decimal. Written after a value: @(m:sdec12).
- `:xN` — the hex digits of N bits, no prefix (for comments and question text). Written after a value: @(m:x12).
- `:bN` — the binary digits of N bits, no prefix. Written after a value: @(m:b8).
- `:dN` — the decimal digits of the low N bits, no prefix. Written after a value: @(m:d12).
- `:sdN` — the low N bits as a signed decimal, no prefix. Written after a value: @(m:sd12).
- `:str` — a string literal, quoted safely for the language. Written after a value: @(w:str).
- `:list` — an array literal of numbers, in the language's own form. Written after a value: @(xs:list).
- `:strs` — an array literal of quoted strings. Written after a value: @(names:strs).
- `:text` — a list as "1, 2, 3", for prose. Written after a value: @(xs:text).

A template is a program in one of 16 languages: python, javascript, cpp, c, rust, go, java, ruby, php, bash, lua, r, perl, systemverilog, verilog, assembly. Its setup lines start with the language's own comment (//@, #@, --@).

## Closers

`@end` and `@e` close any block. Dedicated closers, clearer when blocks nest:
`@e` `@end` `@enddef` `@endlikert5` `@endnotebook` `@endpage` `@endquiz` `@endtable`

- `@table` is closed ONLY by `@endtable` (its cells may hold `@eqn … @end`).

## Names that are NOT directives

The linter tolerates these, but the engine ignores them. Write the alternative.

- `@accessibility` — @enable(accessibility)
- `@ans` — @q(...) carries its own answer; use Export → scan answer key for the .ans file
- `@choice` — @q(mch/mcv/mcd, …) for multiple choice
- `@date` — @titlepage(date=…) or @doc(date=…)
- `@defmacro` — @def(name(args)) … @enddef
- `@discussion` — @q(essay) for a written response
- `@endblock` — @end
- `@endqc` — delete it; @qc(P) needs no @endqc
- `@eqnin` — $E = mc^2$ for maths inside a line, or @eqn for a display equation
- `@feedback` — @branch(if=wrong) for a response to an answer, or @hint for a ladder
- `@grade` — @qc(points) + @rubric, then Grade → Check answers
- `@inlinecode` — @code{inline} — braces make it inline
- `@jupyter` — @notebook for a notebook-style document, or @code(python, run) for one runnable cell
- `@livecode` — @code(lang, run) or @lab(code, …)
- `@parsons` — @q(order, …) — drag the lines into the right order, and it grades
- `@since` — plain prose, or a comment (@ + space)
- `@tab` — @columns or separate sections
- `@tabbed` — @columns for side-by-side, or @step in a deck
- `@timed` — publish it as an exam (the accounts service enforces the time limit)
- `@version` — @var(version)

<!-- llms.txt ends -->
