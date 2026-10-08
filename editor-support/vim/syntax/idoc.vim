" Vim syntax file
" Language: IDoc (.idoc, .style, .course)
" Generated from the IDoc editor's own catalog: 261 directives, 29 question kinds.
" Do not edit by hand.

if exists("b:current_syntax")
  finish
endif

syn case ignore

" Any @name is a directive-shaped word; the known ones are matched after it, so they win.
syn match idocUnknown "@\h\w*"

" Known directives (one alternation per group keeps the file readable).
syn match idocDirective "@\%(accessibility\|bibliography\|audioplayer\|appendices\|centertext\|confidence\|anonymous\|author_cr\|automaton\|benchmark\|codeblock\|abstract\|appendix\|algoviz\|authors\|braille\|codebox\|columns\|assign\|author\|branch\|center\|choice\|align\|audio\|codex\|algo\|calc\|cell\|chem\|cite\|code\|cols\|ans\|bin\|box\|cad\|cbm\|col\|b\)\>"
syn match idocDirective "@\%(definition\|discussion\|corollary\|enumerate\|factorial\|fixedpage\|defmacro\|dragdrop\|feedback\|fillsize\|connect\|discuss\|example\|course\|enable\|eqinfo\|eqnnum\|figure\|eecad\|eqnin\|eqref\|eqsrc\|data\|date\|deck\|dict\|draw\|drop\|else\|emph\|enum\|eval\|exam\|def\|doc\|eqi\|eqn\|exp\|em\|eq\)\>"
syn match idocDirective "@\%(formularand\|flashcards\|indexterms\|incsyntax\|footnote\|formulaq\|fragment\|frompool\|inherits\|grading\|heading\|hotspot\|include\|footer\|getvar\|grader\|groups\|header\|hspace\|grade\|graph\|hfill\|hours\|font\|gate\|hint\|icon\|geo\|gpu\|hex\|img\|inc\|h1\|h2\|h3\|h4\|h5\|h6\|if\|i\)\>"
syn match idocDirective "@\%(inlinecode\|observers\|keywords\|livecode\|makescan\|modelans\|multicol\|notebook\|itemize\|jupyter\|justify\|likert5\|listing\|newline\|newpage\|noprint\|matlab\|module\|nocite\|input\|label\|lemma\|logic\|model\|music\|notes\|item\|late\|left\|link\|list\|meet\|mesh\|next\|noai\|note\|lab\|let\|it\|nl\)\>"
syn match idocDirective "@\%(proposition\|references\|pagesetup\|scanform\|outcome\|parsons\|problem\|profile\|provide\|randsym\|octave\|optset\|remark\|repeat\|reveal\|rubric\|param\|print\|proof\|right\|scale\|pack\|page\|pick\|pool\|qref\|quiz\|rand\|read\|repl\|rept\|oct\|pdf\|pre\|ref\|row\|say\|ol\|qc\|q\)\>"
syn match idocDirective "@\%(script_generate\|selectquestion\|subsubsection\|spreadsheet\|subsection\|titleslide\|textstyle\|titlepage\|tolerance\|shellbox\|smartart\|solution\|subtitle\|section\|shuffle\|teacher\|theorem\|shader\|sketch\|strong\|studio\|tabbed\|shape\|since\|slide\|staff\|style\|table\|tests\|theme\|timed\|title\|snip\|step\|set\|sim\|tab\|toc\|tol\|ta\)\>"
syn match idocDirective "@\%(visual_debug\|visualdebug\|watermark\|verbatim\|var_noc\|version\|weights\|vdebug\|vspace\|widget\|topic\|vfill\|video\|tool\|unit\|verb\|week\|val\|var\|ul\|u\)\>"
syn match idocStructural "@\%(subsubsection\|subsection\|titleslide\|abstract\|section\|slide\|title\|deck\)\>"
syn match idocCloser "@\%(endlikert5\|endshuffle\|endblock\|endtable\|endcell\|endpage\|endpick\|endpool\|endquiz\|endsnip\|enddef\|endrow\|endqc\|end\|e\)\>"

" Question kinds, right after @q(
syn match idocQKind "\%(@q(\s*\)\@<=\%(unordered\|markdraw\|formula\|likert5\|moddraw\|slider\|essay\|match\|order\|range\|draw\|hmc\|mad\|mah\|mav\|mcd\|mch\|mcv\|vmc\|eq\|fc\|fn\|fr\|uo\|c\|e\|f\|m\|n\)\>"

" Arguments: key= inside a directive head, and quoted strings.
syn match idocArgKey "\<\h\w*\ze\s*=" contained
syn region idocString start=+"+ skip=+\\"+ end=+"+ oneline contained
syn match idocMarker "[*~]\ze\S" contained
syn region idocArgs matchgroup=idocParen start="\%(@\h\w*\)\@<=(" end=")" oneline contains=idocArgKey,idocString,idocMarker,idocMath,idocUnknown,idocDirective,idocQKind

" Inline math between dollars.
syn region idocMath start="\$\ze\S" end="\S\zs\$" oneline

" @@ is a literal @. Comments last so they win.
syn match idocEscape "@@"
syn match idocComment "@[ \t].*$" contains=@Spell
syn region idocBlockComment start="@\*" end="\*@" contains=@Spell

hi def link idocUnknown Identifier
hi def link idocDirective Keyword
hi def link idocStructural Title
hi def link idocCloser Statement
hi def link idocQKind Type
hi def link idocArgKey Special
hi def link idocString String
hi def link idocMarker Operator
hi def link idocParen Delimiter
hi def link idocMath Constant
hi def link idocEscape SpecialChar
hi def link idocComment Comment
hi def link idocBlockComment Comment

let b:current_syntax = "idoc"
