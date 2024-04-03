package preprocess

import (
	"context"

	"github.com/warden-protocol/wardenprotocol/shield/ast"
)

func Preprocess(ctx context.Context, node ast.Expression, expander ast.Expander) ast.Expression {
	switch n := node.(type) {
	case *ast.Identifier:
		return expander.Expand(ctx, n)
	case *ast.ArrayLiteral:
		preprocessElements(ctx, n.Elements, expander)
		return n
	case *ast.CallExpression:
		preprocessCallExpression(ctx, n, expander)
		return n
	case *ast.InfixExpression:
		n.Left = Preprocess(ctx, n.Left, expander)
		n.Right = Preprocess(ctx, n.Right, expander)
		return n
	default:
		return n
	}
}

func preprocessElements(ctx context.Context, elements []ast.Expression, expander ast.Expander) {
	for i, elem := range elements {
		elements[i] = Preprocess(ctx, elem, expander)
	}
}

func preprocessCallExpression(ctx context.Context, call *ast.CallExpression, expander ast.Expander) {
	preprocessElements(ctx, call.Arguments, expander)
}
