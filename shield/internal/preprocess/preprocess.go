package preprocess

import (
	"context"

	"github.com/warden-protocol/wardenprotocol/shield/ast"
)

func Preprocess(ctx context.Context, node ast.Expression, expander ast.Expander) (ast.Expression, error) {
	switch n := node.(type) {
	case *ast.Identifier:
		return expander.Expand(ctx, n)
	case *ast.ArrayLiteral:
		return n, preprocessElements(ctx, n.Elements, expander)
	case *ast.CallExpression:
		return n, preprocessCallExpression(ctx, n, expander)
	case *ast.InfixExpression:
		var err error
		n.Left, err = Preprocess(ctx, n.Left, expander)
		if err != nil {
			return nil, err
		}

		n.Right, err = Preprocess(ctx, n.Right, expander)
		if err != nil {
			return nil, err
		}

		return n, nil
	default:
		return n, nil
	}
}

func preprocessElements(ctx context.Context, elements []ast.Expression, expander ast.Expander) error {
	for i, elem := range elements {
		var err error
		elements[i], err = Preprocess(ctx, elem, expander)
		if err != nil {
			return err
		}
	}
	return nil
}

func preprocessCallExpression(ctx context.Context, call *ast.CallExpression, expander ast.Expander) error {
	return preprocessElements(ctx, call.Arguments, expander)
}
