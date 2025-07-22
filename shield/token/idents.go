package token

var keywords = map[string]Type{
	"true":  Type_TRUE,
	"false": Type_FALSE,
}

func LookupIdent(ident string) Type {
	if tok, ok := keywords[ident]; ok {
		return tok
	}

	return Type_IDENT
}
