package validation

import (
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/warden-protocol/wardenprotocol/shield/ast"
	"github.com/warden-protocol/wardenprotocol/shield/internal/lexer"
	"github.com/warden-protocol/wardenprotocol/shield/internal/parser"
)

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

func TestDepthAnalyzer(t *testing.T) {
	testCases := []struct {
		expression    string
		expectedDepth int
	}{
		{"foo1(foo2([foo2(), 11, 12]), false || true, [false, [10, 11, 12]])", 3},
		{"foo2() && foo1(foo2(), false || true, [false, [10, 11, 12]])", 2},
		{"foo2() ", 1},
		{"true", 0},
	}

	for _, tc := range testCases {
		expression := parseExpression(t, tc.expression)
		maxDepth := AnalyzeFunctionsNesting(expression, 0)

		require.Equal(t, tc.expectedDepth, maxDepth)
	}
}

func TestValidatorShouldFail(t *testing.T) {
	testCases := []struct {
		expression    string
		expectedDepth int
	}{
		{"foo1(foo2([foo2(), 11, 12]), false || true, [false, [10, 11, 12]])", 2},
		{"foo2() && foo1(foo2(), false || true, [false, [10, 11, 12]])", 1},
		{"foo2() ", 0},
	}

	for _, tc := range testCases {
		expression := parseExpression(t, tc.expression)
		err := Validate(expression, tc.expectedDepth)

		require.Error(t, err)
	}
}

func TestValidatorShouldSuccess(t *testing.T) {
	testCases := []struct {
		expression    string
		expectedDepth int
	}{
		{"foo1(foo2([foo2(), 11, 12]))", 3},
		{"foo1(foo2([foo2(), 11, 12]))", 4},
		{"foo2() ", 1},
		{"foo2() ", 2},
		{"true", 0},
	}

	for _, tc := range testCases {
		expression := parseExpression(t, tc.expression)
		err := Validate(expression, tc.expectedDepth)

		require.NoError(t, err)
	}
}
