package parser

import (
	"math/big"
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
	case *ast.Expression_StringLiteral:
		require.Equal(t, expected, actual.StringLiteral.Value)
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

	require.EqualValues(t, big.NewInt(5).String(), v.Value)
}

func TestBigIntegerExpression(t *testing.T) {
	input := `20349013429029713115;`
	l := lexer.New(input)
	p := New(l)

	expression := p.Parse()
	require.NotNil(t, expression)

	v, ok := ast.UnwrapIntegerLiteral(expression)
	require.True(t, ok, "expression is not *ast.IntegerLiteral. got=%T", expression)

	expected, _ := new(big.Int).SetString("20349013429029713115", 10)
	require.EqualValues(t, expected.String(), v.Value)
}

func TestArrayLiteralExpression(t *testing.T) {
	input := `[1,2,true,34, false, "foo"];`
	l := lexer.New(input)
	p := New(l)

	expression := p.Parse()
	require.NotNil(t, expression)

	v, ok := ast.UnwrapArrayLiteral(expression)
	require.True(t, ok, "expression is not *ast.ArrayLiteral. got=%T", expression)

	require.Len(t, v.Elements, 6)
	equalValues(t, big.NewInt(1).String(), v.Elements[0])
	equalValues(t, big.NewInt(2).String(), v.Elements[1])
	equalValues(t, true, v.Elements[2])
	equalValues(t, big.NewInt(34).String(), v.Elements[3])
	equalValues(t, false, v.Elements[4])
	equalValues(t, "foo", v.Elements[5])
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

func TestNegativeInteger(t *testing.T) {
	input := `-4;`
	l := lexer.New(input)
	p := New(l)

	expression := p.Parse()
	require.NotNil(t, expression)

	negative, ok := ast.UnwrapPrefixExpression(expression)
	require.True(t, ok, "expression is not *ast.PrefixExpression. got=%T", expression)
	require.Equal(t, "-", negative.Operator)
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
		{
			`foo > "foo"`,
			"(foo > \"foo\")",
		},
		{
			`2 + 2 * 2`,
			"(2 + (2 * 2))",
		},
		{
			`2 - 2 * 2`,
			"(2 - (2 * 2))",
		},
		{
			`2 + 2 / 2`,
			"(2 + (2 / 2))",
		},
		{
			`2 - 2 / 2`,
			"(2 - (2 / 2))",
		},
		{
			`2 + 2 <= 2 * 2`,
			"((2 + 2) <= (2 * 2))",
		},
		{
			`6 / 3 != 7 - 4`,
			"((6 / 3) != (7 - 4))",
		},
		{
			"--2",
			"(-(-2))",
		},
		{
			"-3 * -2 + 2",
			"(((-3) * (-2)) + 2)",
		},
		{
			"-3 + -3 + -3",
			"(((-3) + (-3)) + (-3))",
		},
		{
			"-1 * (3 + 3) == -6",
			"(((-1) * (3 + 3)) == (-6))",
		},
		{
			"-sum(2, 2) + 3",
			"((-sum(2, 2)) + 3)",
		},
		{
			"-(3 + 3) == -6",
			"((-(3 + 3)) == (-6))",
		},
		{
			"-2 < 0 == true",
			"(((-2) < 0) == true)",
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
