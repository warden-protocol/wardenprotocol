package lexer

import (
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/shield/token"
)

func TestNextToken(t *testing.T) {
	input := `any(2, [warden123, wardenXXX]) true false && || 1 > 1 < 1 >= 1 <= 1 == 1 != 1 "some string""" + - * /;`

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
		{token.Type_INT, "1"},
		{token.Type_GT, ">"},
		{token.Type_INT, "1"},
		{token.Type_LT, "<"},
		{token.Type_INT, "1"},
		{token.Type_GTE, ">="},
		{token.Type_INT, "1"},
		{token.Type_LTE, "<="},
		{token.Type_INT, "1"},
		{token.Type_EQ, "=="},
		{token.Type_INT, "1"},
		{token.Type_NEQ, "!="},
		{token.Type_INT, "1"},
		{token.Type_STRING, "some string"},
		{token.Type_STRING, ""},
		{token.Type_ADD, "+"},
		{token.Type_SUB, "-"},
		{token.Type_MUL, "*"},
		{token.Type_DIV, "/"},
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

func TestUnterminatedString(t *testing.T) {
	input := `"some unterminated string`
	l := New(input)
	tok := l.NextToken()
	require.Equal(t, token.Token{Type: token.Type_ILLEGAL, Literal: `"`}, tok)
}
