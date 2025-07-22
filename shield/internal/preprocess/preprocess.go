package preprocess

import (
	"context"

	"github.com/warden-protocol/wardenprotocol/shield/ast"
)

func Preprocess(ctx context.Context, node *ast.Expression, expander ast.Expander) (*ast.Expression, error) {
	switch n := node.Value.(type) {
	case *ast.Expression_Identifier:
		return expander.Expand(ctx, n.Identifier)
	case *ast.Expression_ArrayLiteral:
		return node, preprocessElements(ctx, n.ArrayLiteral.Elements, expander)
	case *ast.Expression_CallExpression:
		return node, preprocessCallExpression(ctx, n.CallExpression, expander)
	case *ast.Expression_PrefixExpression:
		return node, preprocessPrefixExpression(ctx, n.PrefixExpression, expander)
	case *ast.Expression_InfixExpression:
		return node, preprocessInfixExpression(ctx, n.InfixExpression, expander)
	default:
		return node, nil
	}
}

func preprocessElements(ctx context.Context, elements []*ast.Expression, expander ast.Expander) error {
	for i, elem := range elements {
		var err error

		elements[i], err = Preprocess(ctx, elem, expander)
		if err != nil {
			return err
		}
	}

	return nil
}

func preprocessPrefixExpression(ctx context.Context, prefix *ast.PrefixExpression, expander ast.Expander) error {
	var err error

	prefix.Right, err = Preprocess(ctx, prefix.Right, expander)

	return err
}

func preprocessInfixExpression(ctx context.Context, infix *ast.InfixExpression, expander ast.Expander) error {
	var err error

	infix.Left, err = Preprocess(ctx, infix.Left, expander)
	if err != nil {
		return err
	}

	infix.Right, err = Preprocess(ctx, infix.Right, expander)
	if err != nil {
		return err
	}

	return nil
}

func preprocessCallExpression(ctx context.Context, call *ast.CallExpression, expander ast.Expander) error {
	return preprocessElements(ctx, call.Arguments, expander)
}
