package shield

import (
	"context"
	"errors"
	"fmt"

	"github.com/warden-protocol/wardenprotocol/shield/ast"
	"github.com/warden-protocol/wardenprotocol/shield/env"
	"github.com/warden-protocol/wardenprotocol/shield/internal/evaluator"
	"github.com/warden-protocol/wardenprotocol/shield/internal/lexer"
	"github.com/warden-protocol/wardenprotocol/shield/internal/metadata"
	"github.com/warden-protocol/wardenprotocol/shield/internal/parser"
	"github.com/warden-protocol/wardenprotocol/shield/internal/preprocess"
	"github.com/warden-protocol/wardenprotocol/shield/object"
)

type Environment = env.Environment

// Parse parses the input string and returns the root node of the AST.
// In case of syntax errors, it returns an error.
func Parse(input string) (*ast.Expression, error) {
	l := lexer.New(input)
	p := parser.New(l)

	root := p.Parse()
	if len(p.Errors()) > 0 {
		return nil, fmt.Errorf("parser errors: %v", p.Errors())
	}

	return root, nil
}

// Preprocess preprocesses the AST using the expander and returns the root node of the new AST.
func Preprocess(ctx context.Context, root *ast.Expression, expander ast.Expander) (*ast.Expression, error) {
	return preprocess.Preprocess(ctx, root, expander)
}

// Eval evaluates the AST and returns the result of the evaluation.
// In case of a runtime error, the resulting object will be an error object.
func Eval(root *ast.Expression, env Environment) object.Object {
	return evaluator.Eval(root, env)
}

type Metadata = metadata.Metadata

// ExtractMetadata extracts metadata from the given expression.
func ExtractMetadata(root *ast.Expression) (Metadata, error) {
	if root == nil {
		return Metadata{}, errors.New("empty input")
	}

	return metadata.ExtractMetadata(root), nil
}
