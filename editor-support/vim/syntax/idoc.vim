" Vim syntax file
" Language: IDoc (.idoc, .style, .course)
" Generated from the IDoc editor's own catalog: 310 directives, 29 question kinds.
" Do not edit by hand.

if exists("b:current_syntax")
  finish
endif

syn case ignore

" Any @name is a directive-shaped word; the known ones are matched after it, so they win.
syn match idocUnknown "@\h\w*"

" Known directives (one alternation per group keeps the file readable).
syn match idocDirective "@\%(accessibility\|bibliography\|audioeditor\|audioplayer\|appendices\|centertext\|anonymous\|author_cr\|automaton\|benchmark\|codeblock\|abstract\|appendix\|boxstyle\|algoviz\|authors\|braille\|codebox\|codegen\|assign\|author\|branch\|center\|choice\|align\|audio\|algo\|calc\|cell\|chem\|cite\|code\|ans\|bin\|box\|cad\|cbm\|cd\|ce\|b\)\>"
syn match idocDirective "@\%(confidence\|definition\|discussion\|corollary\|enumerate\|colbreak\|defmacro\|dragdrop\|codepre\|columns\|connect\|diagram\|discuss\|dropcap\|course\|emerge\|enable\|eqinfo\|codex\|color\|dicom\|eecad\|cols\|data\|date\|deck\|dict\|draw\|drop\|else\|emph\|enum\|col\|def\|doc\|eqi\|eqn\|dl\|em\|eq\)\>"
syn match idocDirective "@\%(exceptionset\|formularand\|flashcards\|factorial\|fixedpage\|feedback\|fillsize\|footnote\|formulaq\|fragment\|frompool\|glossary\|example\|gencode\|grading\|eqnnum\|figure\|footer\|getvar\|grader\|groups\|eqnin\|eqref\|eqsrc\|gloss\|grade\|graph\|eqns\|eval\|exam\|film\|font\|gate\|exp\|geo\|gpu\|h1\|h2\|h3\|h4\)\>"
syn match idocDirective "@\%(interlinear\|indexterms\|inlinecode\|incsyntax\|inherits\|keywords\|heading\|hotspot\|include\|itemize\|jupyter\|justify\|likert5\|header\|hspace\|hfill\|hours\|input\|label\|lemma\|hint\|icon\|item\|lang\|late\|left\|link\|list\|hex\|idx\|img\|inc\|lab\|let\|h5\|h6\|hl\|if\|it\|i\)\>"
syn match idocDirective "@\%(observers\|pagesetup\|livecode\|makescan\|modelans\|multicol\|nohyphen\|notebook\|listing\|newline\|newpage\|noprint\|outcome\|parsons\|margin\|matlab\|module\|newthm\|nocite\|octave\|optset\|logic\|model\|music\|notes\|param\|meet\|mesh\|next\|noai\|note\|over\|pack\|page\|path\|num\|oct\|par\|nl\|ol\)\>"
syn match idocDirective "@\%(script_generate\|printglossary\|proposition\|printindex\|references\|scanform\|problem\|profile\|provide\|quantum\|randsym\|remark\|repeat\|reveal\|rotate\|rubric\|photo\|print\|proof\|right\|scale\|pick\|pool\|qref\|quiz\|rand\|read\|repl\|rept\|rule\|pdf\|pre\|qty\|ref\|row\|say\|qc\|sc\|q\|s\)\>"
syn match idocDirective "@\%(selectquestion\|subsubsection\|spreadsheet\|subsection\|titleslide\|textstyle\|titlepage\|shellbox\|smartart\|solution\|subtitle\|section\|shuffle\|teacher\|theorem\|shader\|sketch\|strong\|studio\|tabbed\|shape\|since\|slide\|staff\|style\|table\|tests\|theme\|timed\|title\|size\|snip\|step\|set\|sim\|sub\|sup\|tab\|si\|ta\)\>"
syn match idocDirective "@\%(variantlabel\|visual_debug\|visualdebug\|tolerance\|watermark\|verbatim\|var_noc\|version\|weights\|vdebug\|vspace\|widget\|topic\|value\|vfill\|video\|todo\|tool\|unit\|verb\|week\|wide\|toc\|tol\|use\|val\|var\|ul\|up\|u\)\>"
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
