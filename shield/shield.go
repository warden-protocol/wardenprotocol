package shield

import (
	"context"
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

// Run executes the code passed a string and returns the result of the evaluation.
// In case of a parsing error, it returns an error.
// In case of a runtime error, the resulting object will be an error object.
func Run(ctx context.Context, input string, expander ast.Expander, env Environment) (object.Object, error) {
	root, err := Parse(ctx, input, expander)
	if err != nil {
		return nil, err
	}

	res := evaluator.Eval(root, env)
	return res, nil
}

// Parse parses the input string and returns the root node of the AST.
// In case of syntax errors, it returns an error.
// If not nil, the expander is used to process the AST.
func Parse(ctx context.Context, input string, expander ast.Expander) (*ast.Expression, error) {
	l := lexer.New(input)
	p := parser.New(l)
	root := p.Parse()
	if len(p.Errors()) > 0 {
		return nil, fmt.Errorf("parser errors: %v", p.Errors())
	}

	if expander != nil {
		newRoot, err := preprocess.Preprocess(ctx, root, expander)
		if err != nil {
			return nil, fmt.Errorf("preprocessor error: %w", err)
		}
		root = newRoot
	}

	return root, nil
}

type Metadata = metadata.Metadata

// ExtractMetadata extracts metadata from the given expression.
func ExtractMetadata(root *ast.Expression) (Metadata, error) {
	if root == nil {
		return Metadata{}, fmt.Errorf("empty input")
	}

	return metadata.ExtractMetadata(root), nil
}
