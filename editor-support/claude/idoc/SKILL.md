---
name: idoc
description: Read and write IDoc, the single-@ plain-text language for documents, quizzes, auto-graded exams, slide decks, paper scan forms and course files. Use when a task involves .idoc, .style or .course files, or asks for an IDoc document, quiz, exam, assignment, slide deck or course.
---

# IDoc

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

## Before you write

- Read `reference.md` in this folder for anything not covered above. It is the
  complete, generated reference: every directive with its arguments and allowed
  values, every question kind, the closers, and the names that look like
  directives but are not. Search it for the directive you need (for example
  `@deck`, `@EECad`, `@visual_debug`, `@scanform`, `@assign`) rather than guessing.
- If a directive is not in `reference.md`, it does not exist. Do not invent one.

## A complete small example

```
@title(Quiz 1)
@ a comment: the at-sign followed by a space
The capital of France is @q(fci: Paris).
@q(mch, *4, 3, 5)
@eqn
E = m c^2
@end
```
