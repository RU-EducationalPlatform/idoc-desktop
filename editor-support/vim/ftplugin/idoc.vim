" IDoc filetype settings.
if exists("b:did_ftplugin")
  finish
endif
let b:did_ftplugin = 1

" `@ ` (at + space) comments to end of line; `@* ... *@` is a block comment.
setlocal commentstring=@\ %s
setlocal comments=b:@,s:@*,e:*@
setlocal formatoptions-=t formatoptions+=croql
setlocal wrap linebreak
setlocal suffixesadd=.idoc,.style

let b:undo_ftplugin = "setlocal commentstring< comments< formatoptions< wrap< linebreak< suffixesadd<"
