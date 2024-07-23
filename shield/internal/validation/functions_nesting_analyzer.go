package validation

import (
	"context"
	"github.com/warden-protocol/wardenprotocol/shield/ast"
)

const MAX_DEPTH = 100 // TODO AT: Move to params or configuration?

func AnalyzeFunctionsNesting(ctx context.Context, node *ast.Expression, depth int) (int, error) {
	switch n := node.Value.(type) {
	case *ast.Expression_Identifier:
		return depth, nil
	case *ast.Expression_ArrayLiteral:
		newDepth, err := analyzeElements(ctx, n.ArrayLiteral.Elements, depth)
		return newDepth, err
	case *ast.Expression_CallExpression:
		newDepth, err := analyzeCallExpression(ctx, n.CallExpression, depth)
		return newDepth, err
	case *ast.Expression_PrefixExpression:
		newDepth, err := analyzePrefixExpression(ctx, n.PrefixExpression, depth)
		return newDepth, err
	case *ast.Expression_InfixExpression:
		newDepth, err := analyzeInfixExpression(ctx, n.InfixExpression, depth)
		return newDepth, err
	default:
		return depth, nil
	}
}

func analyzeElements(ctx context.Context, elements []*ast.Expression, depth int) (int, error) {
	var currentMaxDepth = depth
	var possibleMaxDepth = depth
	for _, elem := range elements {
		var err error
		possibleMaxDepth, err = AnalyzeFunctionsNesting(ctx, elem, depth)
		if err != nil {
			return depth, err
		}

		currentMaxDepth = max(currentMaxDepth, possibleMaxDepth)
	}
	return currentMaxDepth, nil
}

func analyzePrefixExpression(ctx context.Context, prefix *ast.PrefixExpression, depth int) (int, error) {
	var err error
	var newMaxDepth int
	newMaxDepth, err = AnalyzeFunctionsNesting(ctx, prefix.Right, depth)
	return newMaxDepth, err
}

func analyzeInfixExpression(ctx context.Context, infix *ast.InfixExpression, depth int) (int, error) {
	var err error
	var maxDepthLeft int
	maxDepthLeft, err = AnalyzeFunctionsNesting(ctx, infix.Left, depth)
	if err != nil {
		return depth, err
	}

	var maxDepthRight int
	maxDepthRight, err = AnalyzeFunctionsNesting(ctx, infix.Right, depth)
	if err != nil {
		return depth, err
	}

	return max(maxDepthLeft, maxDepthRight), nil
}

func analyzeCallExpression(ctx context.Context, call *ast.CallExpression, depth int) (int, error) {
	return analyzeElements(ctx, call.Arguments, depth+1)
}
