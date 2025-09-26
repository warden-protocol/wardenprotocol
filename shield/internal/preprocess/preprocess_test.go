package preprocess

import (
	"context"
	"math/big"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/shield/ast"
	"github.com/warden-protocol/wardenprotocol/shield/internal/lexer"
	"github.com/warden-protocol/wardenprotocol/shield/internal/parser"
)

type NoopExpander struct{}

func (n NoopExpander) Expand(ctx context.Context, ident *ast.Identifier) (*ast.Expression, error) {
	return ast.NewIdentifier(ident), nil
}

func parseExpression(t *testing.T, input string) *ast.Expression {
	l := lexer.New(input)
	p := parser.New(l)
	expression := p.Parse()

	err := p.Errors()
	if len(err) != 0 {
		require.FailNow(t, "Parser finished with errors", err)
	}

	require.NotNil(t, expression)

	return expression
}

func TestPreprocess(t *testing.T) {
	ctx := t.Context()
	expression := parseExpression(t, "foo1(foo2(), false || true, [false, [10, 11, 12]])")
	expander := NoopExpander{}

	proc, err := Preprocess(ctx, expression, expander)
	if err != nil {
		t.Error(err)
	}

	call1 := proc.GetCallExpression()
	require.Equal(t, call1.Function.Value, "foo1")
	require.Len(t, call1.Arguments, 3)

	call2 := call1.Arguments[0].GetCallExpression()
	require.Equal(t, call2.Function.Value, "foo2")
	require.Len(t, call2.Arguments, 0)

	infix := call1.Arguments[1].GetInfixExpression()
	require.Equal(t, infix.Left.GetBooleanLiteral().Value, false)
	require.Equal(t, infix.Right.GetBooleanLiteral().Value, true)
	require.Equal(t, infix.Operator, "||")

	arr1 := call1.Arguments[2].GetArrayLiteral()
	require.Len(t, arr1.Elements, 2)
	require.Equal(t, arr1.Elements[0].GetBooleanLiteral().Value, false)

	arr2 := arr1.Elements[1].GetArrayLiteral()
	require.Len(t, arr2.Elements, 3)

	for i, arrElem := range arr2.Elements {
		intVal := arrElem.GetIntegerLiteral()
		require.NotNil(t, intVal)
		require.Equal(t, intVal.Value, big.NewInt(int64(10+i)).String())
	}
}

func TestPreprocessElements(t *testing.T) {
	ctx := t.Context()
	expression := parseExpression(t, "[10, 11, 12]")
	expander := NoopExpander{}

	proc, err := Preprocess(ctx, expression, expander)
	if err != nil {
		t.Error(err)
	}

	arr := proc.GetArrayLiteral()
	require.Len(t, arr.Elements, 3)

	for i, arrElem := range arr.Elements {
		intVal := arrElem.GetIntegerLiteral()
		require.Equal(t, intVal.Value, big.NewInt(int64(10+i)).String())
	}
}

func TestPreprocessInfixExpression(t *testing.T) {
	ctx := t.Context()
	expression := parseExpression(t, "false || true && false")
	expander := NoopExpander{}

	proc, err := Preprocess(ctx, expression, expander)
	if err != nil {
		t.Error(err)
	}

	inf1 := proc.GetInfixExpression()
	require.Equal(t, inf1.Operator, "||")

	inf1Left := inf1.Left.GetBooleanLiteral()
	require.Equal(t, inf1Left.Value, false)

	inf2 := inf1.Right.GetInfixExpression()
	require.Equal(t, inf2.Operator, "&&")

	inf2Left := inf2.Left.GetBooleanLiteral()
	require.Equal(t, inf2Left.Value, true)

	inf2Right := inf2.Right.GetBooleanLiteral()
	require.Equal(t, inf2Right.Value, false)
}

func TestPreprocessCallExpression(t *testing.T) {
	ctx := t.Context()
	expression := parseExpression(t, "foo1(123, foo2(235))")
	expander := NoopExpander{}

	proc, err := Preprocess(ctx, expression, expander)
	if err != nil {
		t.Error(err)
	}

	call1 := proc.GetCallExpression()
	require.Equal(t, call1.Function.Value, "foo1")
	require.Equal(t, len(call1.Arguments), 2)
	require.Equal(t, call1.Arguments[0].GetIntegerLiteral().Value, big.NewInt(int64(123)).String())

	call2 := call1.Arguments[1].GetCallExpression()
	require.Equal(t, len(call2.Arguments), 1)
	require.Equal(t, call2.Arguments[0].GetIntegerLiteral().Value, big.NewInt(int64(235)).String())
}
