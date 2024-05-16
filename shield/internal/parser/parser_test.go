package parser

import (
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/warden-protocol/wardenprotocol/shield/ast"
	"github.com/warden-protocol/wardenprotocol/shield/internal/lexer"
)

func equalValues(t *testing.T, expected any, actual *ast.Expression) {
	switch actual := actual.Value.(type) {
	case *ast.Expression_IntegerLiteral:
		require.EqualValues(t, expected, actual.IntegerLiteral.Value)
	case *ast.Expression_BooleanLiteral:
		require.Equal(t, expected, actual.BooleanLiteral.Value)
	default:
		require.Fail(t, "type not handled")
	}
}

func TestIdentifierExpression(t *testing.T) {
	input := `warden1234;`
	l := lexer.New(input)
	p := New(l)

	expression := p.Parse()
	require.NotNil(t, expression)

	ident, ok := ast.UnwrapIdentifier(expression)
	require.True(t, ok, "expression is not *ast.Identifier. got=%T", expression)

	require.Equal(t, "warden1234", ident.Value)
}

func TestIntegerExpression(t *testing.T) {
	input := `5;`
	l := lexer.New(input)
	p := New(l)

	expression := p.Parse()
	require.NotNil(t, expression)

	v, ok := ast.UnwrapIntegerLiteral(expression)
	require.True(t, ok, "expression is not *ast.IntegerLiteral. got=%T", expression)

	require.EqualValues(t, 5, v.Value)
}

func TestArrayLiteralExpression(t *testing.T) {
	input := `[1,2,true,34, false];`
	l := lexer.New(input)
	p := New(l)

	expression := p.Parse()
	require.NotNil(t, expression)

	v, ok := ast.UnwrapArrayLiteral(expression)
	require.True(t, ok, "expression is not *ast.ArrayLiteral. got=%T", expression)

	require.Len(t, v.Elements, 5)
	equalValues(t, 1, v.Elements[0])
	equalValues(t, 2, v.Elements[1])
	equalValues(t, true, v.Elements[2])
	equalValues(t, 34, v.Elements[3])
	equalValues(t, false, v.Elements[4])
}

func TestCallExpression(t *testing.T) {
	input := `any(1, 2);`
	l := lexer.New(input)
	p := New(l)

	expression := p.Parse()
	require.NotNil(t, expression)

	call, ok := ast.UnwrapCallExpression(expression)
	require.True(t, ok, "expression is not *ast.CallExpression. got=%T", expression)

	require.Equal(t, "any", call.Function.Value)
}

func TestBooleanOperations(t *testing.T) {
	input := `true || true && false;`
	l := lexer.New(input)
	p := New(l)

	expression := p.Parse()
	require.NotNil(t, expression)

	or, ok := ast.UnwrapInfixExpression(expression)
	require.True(t, ok, "expression is not *ast.InfixExpression. got=%T", expression)
	require.Equal(t, "||", or.Operator)

	and, ok := ast.UnwrapInfixExpression(or.Right)
	require.True(t, ok, "expression is not *ast.InfixExpression. got=%T", and.Left)
	require.Equal(t, "&&", and.Operator)
}

func TestParser(t *testing.T) {
	tests := []struct {
		input    string
		expected string
	}{
		{
			`5`,
			"5",
		},
		{
			`true`,
			"true",
		},
		{
			`false`,
			"false",
		},
		{
			`warden1234`,
			"warden1234",
		},
		{
			`true || true && false`,
			"(true || (true && false))",
		},
		{
			`true && true || false`,
			"((true && true) || false)",
		},
		{
			`(true && false)`,
			"(true && false)",
		},
		{
			`true || (true && false)`,
			"(true || (true && false))",
		},
		{
			`((true || (address) || ((any(2, true) || false) && true)))`,
			"((true || address) || ((any(2, true) || false) && true))",
		},
		{
			`1 > 1`,
			"(1 > 1)",
		},
		{
			`x >= 42`,
			"(x >= 42)",
		},
		{
			`x == 42`,
			"(x == 42)",
		},
		{
			`1 > 1 == true`,
			"((1 > 1) == true)",
		},
	}

	for _, tt := range tests {
		t.Run(tt.input, func(t *testing.T) {
			l := lexer.New(tt.input)
			p := New(l)
			expression := p.Parse()
			require.NotNil(t, expression)
			require.Equal(t, tt.expected, ast.Stringify(expression))
		})
	}
}
