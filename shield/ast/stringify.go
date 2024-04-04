package ast

import (
	"fmt"
	"strconv"
	"strings"
)

func Stringify(exp *Expression) string {
	switch n := exp.Value.(type) {
	case *Expression_Identifier:
		return n.Identifier.Value
	case *Expression_IntegerLiteral:
		return strconv.FormatInt(n.IntegerLiteral.Value, 10)
	case *Expression_BooleanLiteral:
		return strconv.FormatBool(n.BooleanLiteral.Value)
	case *Expression_ArrayLiteral:
		return fmt.Sprintf("[%s]", stringifyExpressions(n.ArrayLiteral.Elements))
	case *Expression_CallExpression:
		return fmt.Sprintf("%s(%s)", n.CallExpression.Function, stringifyExpressions(n.CallExpression.Arguments))
	default:
		return ""
	}
}

func stringifyExpressions(exps []*Expression) string {
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
