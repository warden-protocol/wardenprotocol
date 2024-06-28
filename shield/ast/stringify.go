package ast

import (
	"fmt"
	"strconv"
	"strings"
)

func Stringify(exp *Expression) string {
	if exp == nil {
		return "{ERR:nil expression}"
	}

	switch n := exp.Value.(type) {
	case *Expression_Identifier:
		return n.Identifier.Value
	case *Expression_IntegerLiteral:
		return n.IntegerLiteral.Value
	case *Expression_BooleanLiteral:
		return strconv.FormatBool(n.BooleanLiteral.Value)
	case *Expression_StringLiteral:
		return fmt.Sprintf("\"%s\"", n.StringLiteral.Value)
	case *Expression_ArrayLiteral:
		return fmt.Sprintf("[%s]", stringifyExpressions(n.ArrayLiteral.Elements))
	case *Expression_CallExpression:
		return fmt.Sprintf("%s(%s)", n.CallExpression.Function.Value, stringifyExpressions(n.CallExpression.Arguments))
	case *Expression_PrefixExpression:
		return fmt.Sprintf("(%s%s)", n.PrefixExpression.Operator, Stringify(n.PrefixExpression.Right))
	case *Expression_InfixExpression:
		return fmt.Sprintf("(%s %s %s)", Stringify(n.InfixExpression.Left), n.InfixExpression.Operator, Stringify(n.InfixExpression.Right))
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
