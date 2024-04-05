package lexer

import (
	"testing"

	"github.com/warden-protocol/wardenprotocol/shield/token"
)

func TestNextToken(t *testing.T) {
	input := `any(2, [warden123, wardenXXX]) true false && ||;`

	tests := []struct {
		expectedType    token.Type
		expectedLiteral string
	}{
		{token.Type_IDENT, "any"},
		{token.Type_LPAREN, "("},
		{token.Type_INT, "2"},
		{token.Type_COMMA, ","},
		{token.Type_LBRACKET, "["},
		{token.Type_IDENT, "warden123"},
		{token.Type_COMMA, ","},
		{token.Type_IDENT, "wardenXXX"},
		{token.Type_RBRACKET, "]"},
		{token.Type_RPAREN, ")"},
		{token.Type_TRUE, "true"},
		{token.Type_FALSE, "false"},
		{token.Type_AND, "&&"},
		{token.Type_OR, "||"},
		{token.Type_SEMICOLON, ";"},
		{token.Type_EOF, ""},
	}

	l := New(input)
	for i, tt := range tests {
		tok := l.NextToken()

		if tok.Type != tt.expectedType {
			t.Fatalf("tests[%d] - tokentype wrong. expected=%q, got=%q",
				i, tt.expectedType, tok.Type)
		}

		if tok.Literal != tt.expectedLiteral {
			t.Fatalf("tests[%d] - literal wrong. expected=%q, got=%q",
				i, tt.expectedLiteral, tok.Literal)
		}
	}
}
