package lexer

import (
	"testing"

	"github.com/warden-protocol/wardenprotocol/shield/internal/token"
)

func TestNextToken(t *testing.T) {
	input := `any(2, [warden123, wardenXXX]) true false && ||;`

	tests := []struct {
		expectedType    token.TokenType
		expectedLiteral string
	}{
		{token.IDENT, "any"},
		{token.LPAREN, "("},
		{token.INT, "2"},
		{token.COMMA, ","},
		{token.LBRACKET, "["},
		{token.IDENT, "warden123"},
		{token.COMMA, ","},
		{token.IDENT, "wardenXXX"},
		{token.RBRACKET, "]"},
		{token.RPAREN, ")"},
		{token.TRUE, "true"},
		{token.FALSE, "false"},
		{token.AND, "&&"},
		{token.OR, "||"},
		{token.SEMICOLON, ";"},
		{token.EOF, ""},
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
