package parser

import (
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/warden-protocol/wardenprotocol/shield/ast"
	"github.com/warden-protocol/wardenprotocol/shield/internal/lexer"
)

func TestIdentifierExpression(t *testing.T) {
	input := `warden1234;`
	l := lexer.New(input)
	p := New(l)

	expression := p.Parse()
	require.NotNil(t, expression)

	ident, ok := expression.(*ast.Identifier)
	require.True(t, ok, "expression is not *ast.Identifier. got=%T", expression)

	require.Equal(t, "warden1234", ident.Value)
}

func TestIntegerExpression(t *testing.T) {
	input := `5;`
	l := lexer.New(input)
	p := New(l)

	expression := p.Parse()
	require.NotNil(t, expression)

	v, ok := expression.(*ast.IntegerLiteral)
	require.True(t, ok, "expression is not *ast.IntegerLiteral. got=%T", expression)

	require.EqualValues(t, 5, v.Value)
}

func TestArrayLiteralExpression(t *testing.T) {
	input := `[1,2,true,34, false];`
	l := lexer.New(input)
	p := New(l)

	expression := p.Parse()
	require.NotNil(t, expression)

	v, ok := expression.(*ast.ArrayLiteral)
	require.True(t, ok, "expression is not *ast.ArrayLiteral. got=%T", expression)

	require.Len(t, v.Elements, 5)
	require.EqualValues(t, 1, v.Elements[0].(*ast.IntegerLiteral).Value)
	require.EqualValues(t, 2, v.Elements[1].(*ast.IntegerLiteral).Value)
	require.EqualValues(t, true, v.Elements[2].(*ast.BooleanLiteral).Value)
	require.EqualValues(t, 34, v.Elements[3].(*ast.IntegerLiteral).Value)
	require.EqualValues(t, false, v.Elements[4].(*ast.BooleanLiteral).Value)
}

func TestCallExpression(t *testing.T) {
	input := `any(1, 2);`
	l := lexer.New(input)
	p := New(l)

	expression := p.Parse()
	require.NotNil(t, expression)

	call, ok := expression.(*ast.CallExpression)
	require.True(t, ok, "expression is not *ast.CallExpression. got=%T", expression)

	require.Equal(t, "any", call.Function.Value)
}

func TestBooleanOperations(t *testing.T) {
	input := `true || true && false;`
	l := lexer.New(input)
	p := New(l)

	expression := p.Parse()
	require.NotNil(t, expression)

	or, ok := expression.(*ast.InfixExpression)
	require.True(t, ok, "expression is not *ast.InfixExpression. got=%T", expression)
	require.Equal(t, "||", or.Operator)

	and, ok := or.Right.(*ast.InfixExpression)
	require.True(t, ok, "expression is not *ast.InfixExpression. got=%T", and.Left)
	require.Equal(t, "&&", and.Operator)
}
