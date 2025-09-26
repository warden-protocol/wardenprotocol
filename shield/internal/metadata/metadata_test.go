package metadata

import (
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/shield/ast"
	"github.com/warden-protocol/wardenprotocol/shield/internal/lexer"
	"github.com/warden-protocol/wardenprotocol/shield/internal/parser"
)

func TestExtractMetadata(t *testing.T) {
	tests := []struct {
		code        string
		identifiers []string
		functions   []string
	}{
		{
			code:        "foo",
			identifiers: []string{"foo"},
			functions:   nil,
		},
		{
			code:        "foo()",
			identifiers: []string{},
			functions:   []string{"foo"},
		},
		{
			code:        "foo(bar)",
			identifiers: []string{"bar"},
			functions:   []string{"foo"},
		},
		{
			code:        "foo(bar, baz)",
			identifiers: []string{"bar", "baz"},
			functions:   []string{"foo"},
		},
		{
			code:        "foo(bar, baz, qux)",
			identifiers: []string{"bar", "baz", "qux"},
			functions:   []string{"foo"},
		},
		{
			code:        "foo(bar, baz, qux) && quux",
			identifiers: []string{"bar", "baz", "qux", "quux"},
			functions:   []string{"foo"},
		},
		{
			code:        "foo(bar, baz, qux) && quux()",
			identifiers: []string{"bar", "baz", "qux"},
			functions:   []string{"foo", "quux"},
		},
		{
			code:        "foo(bar, baz, qux) && quux() && corge",
			identifiers: []string{"bar", "baz", "qux", "corge"},
			functions:   []string{"foo", "quux"},
		},
		{
			code:        "foo(bar, baz, qux) && quux() && corge()",
			identifiers: []string{"bar", "baz", "qux"},
			functions:   []string{"foo", "quux", "corge"},
		},
		{
			code:        "[foo, bar, baz]",
			identifiers: []string{"foo", "bar", "baz"},
			functions:   nil,
		},
		{
			code:        "[foo(), bar(), baz()]",
			identifiers: []string{},
			functions:   []string{"foo", "bar", "baz"},
		},
		{
			code:        "[1, 2, 3, foo]",
			identifiers: []string{"foo"},
			functions:   nil,
		},
		{
			code:        "[1, 2, 3, -foo]",
			identifiers: []string{"foo"},
			functions:   nil,
		},
	}

	for _, tt := range tests {
		expr, metadata := testExtractMetadata(t, tt.code)
		require.ElementsMatchf(t, tt.identifiers, metadata.Identifiers, "Wrong Identifiers list.\nCode:\n%s\nParsed expression:\n%+v", tt.code, expr)
		require.ElementsMatchf(t, tt.functions, metadata.FunctionIdentifiers, "Wrong FunctionIdentifiers list. Code: %s", tt.code)
	}
}

func testExtractMetadata(t *testing.T, code string) (*ast.Expression, Metadata) {
	t.Helper()

	l := lexer.New(code)

	p := parser.New(l)
	if p.Errors() != nil {
		t.Fatalf("parser errors: %v", p.Errors())
	}

	expr := p.Parse()

	return expr, ExtractMetadata(expr)
}
