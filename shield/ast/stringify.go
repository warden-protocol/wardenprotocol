package ast

import (
	"fmt"
	"strings"
)

func Stringify(node Node) string {
	switch n := node.(type) {
	case *Identifier:
		return n.String()
	case *IntegerLiteral:
		return n.String()
	case *BooleanLiteral:
		return n.String()
	case *ArrayLiteral:
		return fmt.Sprintf("[%s]", stringifyExpressions(n.Elements))
	case *CallExpression:
		return fmt.Sprintf("%s(%s)", n.Function, stringifyExpressions(n.Arguments))
	default:
		return ""
	}
}

func stringifyExpressions(exps []Expression) string {
	if len(exps) == 0 {
		return ""
	}

	var sb strings.Builder

	for _, e := range exps[:len(exps)-1] {
		sb.WriteString(Stringify(e))
		sb.WriteString(", ")
	}

	sb.WriteString(Stringify(exps[len(exps)-1]))

	return sb.String()
}
