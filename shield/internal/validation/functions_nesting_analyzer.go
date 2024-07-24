package validation

import (
	"github.com/warden-protocol/wardenprotocol/shield/ast"
)

func AnalyzeFunctionsNesting(node *ast.Expression, depth int) int {
	switch n := node.Value.(type) {
	case *ast.Expression_Identifier:
		return depth
	case *ast.Expression_ArrayLiteral:
		return analyzeElements(n.ArrayLiteral.Elements, depth)
	case *ast.Expression_CallExpression:
		return analyzeCallExpression(n.CallExpression, depth)
	case *ast.Expression_PrefixExpression:
		return analyzePrefixExpression(n.PrefixExpression, depth)
	case *ast.Expression_InfixExpression:
		return analyzeInfixExpression(n.InfixExpression, depth)
	default:
		return depth
	}
}

func analyzeElements(elements []*ast.Expression, depth int) int {
	var currentMaxDepth = depth
	for _, elem := range elements {
		possibleMaxDepth := AnalyzeFunctionsNesting(elem, depth)
		currentMaxDepth = max(currentMaxDepth, possibleMaxDepth)
	}
	return currentMaxDepth
}

func analyzePrefixExpression(prefix *ast.PrefixExpression, depth int) int {
	newMaxDepth := AnalyzeFunctionsNesting(prefix.Right, depth)
	return newMaxDepth
}

func analyzeInfixExpression(infix *ast.InfixExpression, depth int) int {
	maxDepthLeft := AnalyzeFunctionsNesting(infix.Left, depth)
	maxDepthRight := AnalyzeFunctionsNesting(infix.Right, depth)

	return max(maxDepthLeft, maxDepthRight)
}

func analyzeCallExpression(call *ast.CallExpression, depth int) int {
	return analyzeElements(call.Arguments, depth+1)
}
