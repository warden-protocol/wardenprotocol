package ast

import (
	"github.com/warden-protocol/wardenprotocol/shield/token"
)

func NewExpression(val isExpression_Value) *Expression {
	return &Expression{
		Value: val,
	}
}

func NewIdentifier(identifier *Identifier) *Expression {
	return NewExpression(&Expression_Identifier{
		Identifier: identifier,
	})
}

func NewIntegerLiteral(integer *IntegerLiteral) *Expression {
	return NewExpression(&Expression_IntegerLiteral{
		IntegerLiteral: integer,
	})
}

func NewBooleanLiteral(boolean *BooleanLiteral) *Expression {
	return NewExpression(&Expression_BooleanLiteral{
		BooleanLiteral: boolean,
	})
}

func NewStringLiteral(sl *StringLiteral) *Expression {
	return NewExpression(&Expression_StringLiteral{
		StringLiteral: sl,
	})
}

func NewArrayLiteral(array *ArrayLiteral) *Expression {
	return NewExpression(&Expression_ArrayLiteral{
		ArrayLiteral: array,
	})
}

func NewPrefixExpression(prefix *PrefixExpression) *Expression {
	return NewExpression(&Expression_PrefixExpression{
		PrefixExpression: prefix,
	})
}

func NewInfixExpression(infix *InfixExpression) *Expression {
	return NewExpression(&Expression_InfixExpression{
		InfixExpression: infix,
	})
}

func NewCallExpression(call *CallExpression) *Expression {
	return NewExpression(&Expression_CallExpression{
		CallExpression: call,
	})
}

func UnwrapIdentifier(expr *Expression) (*Identifier, bool) {
	if ident, ok := expr.Value.(*Expression_Identifier); ok {
		return ident.Identifier, true
	}

	return nil, false
}

func UnwrapIntegerLiteral(expr *Expression) (*IntegerLiteral, bool) {
	if ident, ok := expr.Value.(*Expression_IntegerLiteral); ok {
		return ident.IntegerLiteral, true
	}

	return nil, false
}

func UnwrapBooleanLiteral(expr *Expression) (*BooleanLiteral, bool) {
	if ident, ok := expr.Value.(*Expression_BooleanLiteral); ok {
		return ident.BooleanLiteral, true
	}

	return nil, false
}

func UnwrapStringLiteral(expr *Expression) (*StringLiteral, bool) {
	if v, ok := expr.Value.(*Expression_StringLiteral); ok {
		return v.StringLiteral, true
	}

	return nil, false
}

func UnwrapArrayLiteral(expr *Expression) (*ArrayLiteral, bool) {
	if ident, ok := expr.Value.(*Expression_ArrayLiteral); ok {
		return ident.ArrayLiteral, true
	}

	return nil, false
}

func UnwrapPrefixExpression(expr *Expression) (*PrefixExpression, bool) {
	if ident, ok := expr.Value.(*Expression_PrefixExpression); ok {
		return ident.PrefixExpression, true
	}

	return nil, false
}

func UnwrapInfixExpression(expr *Expression) (*InfixExpression, bool) {
	if ident, ok := expr.Value.(*Expression_InfixExpression); ok {
		return ident.InfixExpression, true
	}

	return nil, false
}

func UnwrapCallExpression(expr *Expression) (*CallExpression, bool) {
	if ident, ok := expr.Value.(*Expression_CallExpression); ok {
		return ident.CallExpression, true
	}

	return nil, false
}

func NewIdent(name string) *Identifier {
	return &Identifier{
		Token: token.Token{
			Type:    token.Type_IDENT,
			Literal: name,
		},
		Value: name,
	}
}
