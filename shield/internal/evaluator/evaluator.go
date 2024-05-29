package evaluator

import (
	"fmt"
	"math/big"

	"github.com/warden-protocol/wardenprotocol/shield/ast"
	"github.com/warden-protocol/wardenprotocol/shield/env"
	"github.com/warden-protocol/wardenprotocol/shield/object"
)

func Eval(exp *ast.Expression, env env.Environment) object.Object {
	switch exp := exp.Value.(type) {
	case *ast.Expression_IntegerLiteral:
		return &object.Integer{Value: exp.IntegerLiteral.Value}
	case *ast.Expression_BooleanLiteral:
		if exp.BooleanLiteral.Value {
			return object.TRUE
		}
		return object.FALSE
	case *ast.Expression_StringLiteral:
		return &object.String{Value: exp.StringLiteral.Value}
	case *ast.Expression_ArrayLiteral:
		elements := make([]object.Object, 0, len(exp.ArrayLiteral.Elements))
		for _, el := range exp.ArrayLiteral.Elements {
			elements = append(elements, Eval(el, env))
		}
		return &object.Array{Elements: elements}
	case *ast.Expression_Identifier:
		if v, ok := builtins[exp.Identifier.Value]; ok {
			return v
		}

		if v, ok := env.Get(exp.Identifier.Value); ok {
			return v
		}

		return newError("identifier not found: " + exp.Identifier.Value)
	case *ast.Expression_InfixExpression:
		return evalInfixExpression(exp.InfixExpression, env)
	case *ast.Expression_CallExpression:
		fn := Eval(ast.NewIdentifier(exp.CallExpression.Function), env)
		args := evalExpressions(exp.CallExpression.Arguments, env)
		return applyFunction(fn, args)
	}
	return newError("unknown expression: %s (type %T)", exp, exp)
}

func evalExpressions(exps []*ast.Expression, env env.Environment) []object.Object {
	result := make([]object.Object, 0, len(exps))
	for _, e := range exps {
		evaluated := Eval(e, env)
		result = append(result, evaluated)
	}
	return result
}

func applyFunction(fn object.Object, args []object.Object) object.Object {
	switch fn := fn.(type) {
	case *object.Builtin:
		return fn.Fn(args...)
	}

	return newError("not a function: %s", fn.Type())
}

func newError(format string, a ...interface{}) *object.Error {
	return &object.Error{Message: fmt.Sprintf(format, a...)}
}

func evalInfixExpression(exp *ast.InfixExpression, env env.Environment) object.Object {
	left := Eval(exp.Left, env)
	if isError(left) {
		return left
	}

	right := Eval(exp.Right, env)
	if isError(right) {
		return right
	}

	switch {
	// boolean operators
	case left.Type() == object.BOOLEAN_OBJ && right.Type() == object.BOOLEAN_OBJ && exp.Operator == "||":
		return nativeBoolToBooleanObject(
			left.(*object.Boolean).Value || right.(*object.Boolean).Value,
		)
	case left.Type() == object.BOOLEAN_OBJ && right.Type() == object.BOOLEAN_OBJ && exp.Operator == "&&":
		return nativeBoolToBooleanObject(
			left.(*object.Boolean).Value && right.(*object.Boolean).Value,
		)

	// boolean comparison operators
	case left.Type() == object.BOOLEAN_OBJ && right.Type() == object.BOOLEAN_OBJ && exp.Operator == "==":
		return nativeBoolToBooleanObject(
			left.(*object.Boolean).Value == right.(*object.Boolean).Value,
		)
	case left.Type() == object.BOOLEAN_OBJ && right.Type() == object.BOOLEAN_OBJ && exp.Operator == "!=":
		return nativeBoolToBooleanObject(
			left.(*object.Boolean).Value != right.(*object.Boolean).Value,
		)

	// integer comparison operators
	case left.Type() == object.INTEGER_OBJ && right.Type() == object.INTEGER_OBJ && exp.Operator == "==":
		return nativeBoolToBooleanObject(
			left.(*object.Integer).Value == right.(*object.Integer).Value,
		)
	case left.Type() == object.INTEGER_OBJ && right.Type() == object.INTEGER_OBJ && exp.Operator == "!=":
		return nativeBoolToBooleanObject(
			left.(*object.Integer).Value != right.(*object.Integer).Value,
		)
	case left.Type() == object.INTEGER_OBJ && right.Type() == object.INTEGER_OBJ && exp.Operator == ">":
		return nativeBoolToBooleanObject(
			left.(*object.Integer).Value > right.(*object.Integer).Value,
		)
	case left.Type() == object.INTEGER_OBJ && right.Type() == object.INTEGER_OBJ && exp.Operator == "<":
		return nativeBoolToBooleanObject(
			left.(*object.Integer).Value < right.(*object.Integer).Value,
		)
	case left.Type() == object.INTEGER_OBJ && right.Type() == object.INTEGER_OBJ && exp.Operator == ">=":
		return nativeBoolToBooleanObject(
			left.(*object.Integer).Value >= right.(*object.Integer).Value,
		)
	case left.Type() == object.INTEGER_OBJ && right.Type() == object.INTEGER_OBJ && exp.Operator == "<=":
		return nativeBoolToBooleanObject(
			left.(*object.Integer).Value <= right.(*object.Integer).Value,
		)

	// string comparisons operators
	case left.Type() == object.STRING_OBJ && right.Type() == object.STRING_OBJ && exp.Operator == "==":
		return nativeBoolToBooleanObject(
			left.(*object.String).Value == right.(*object.String).Value,
		)
	case left.Type() == object.STRING_OBJ && right.Type() == object.STRING_OBJ && exp.Operator == "!=":
		return nativeBoolToBooleanObject(
			left.(*object.String).Value != right.(*object.String).Value,
		)
	case left.Type() == object.STRING_OBJ && right.Type() == object.STRING_OBJ && exp.Operator == ">":
		sign, err := cmpBigInt(left, right)
		if err != nil {
			return err
		}
		return nativeBoolToBooleanObject(sign > 0)
	case left.Type() == object.STRING_OBJ && right.Type() == object.STRING_OBJ && exp.Operator == "<":
		sign, err := cmpBigInt(left, right)
		if err != nil {
			return err
		}
		return nativeBoolToBooleanObject(sign < 0)
	case left.Type() == object.STRING_OBJ && right.Type() == object.STRING_OBJ && exp.Operator == ">=":
		sign, err := cmpBigInt(left, right)
		if err != nil {
			return err
		}
		return nativeBoolToBooleanObject(sign >= 0)
	case left.Type() == object.STRING_OBJ && right.Type() == object.STRING_OBJ && exp.Operator == "<=":
		sign, err := cmpBigInt(left, right)
		if err != nil {
			return err
		}
		return nativeBoolToBooleanObject(sign <= 0)

	// arithmetic operators
	case left.Type() == object.INTEGER_OBJ && right.Type() == object.INTEGER_OBJ && exp.Operator == "+":
		return &object.Integer{Value: left.(*object.Integer).Value + right.(*object.Integer).Value}
	case left.Type() == object.INTEGER_OBJ && right.Type() == object.INTEGER_OBJ && exp.Operator == "-":
		return &object.Integer{Value: left.(*object.Integer).Value - right.(*object.Integer).Value}
	case left.Type() == object.INTEGER_OBJ && right.Type() == object.INTEGER_OBJ && exp.Operator == "*":
		return &object.Integer{Value: left.(*object.Integer).Value * right.(*object.Integer).Value}
	case left.Type() == object.INTEGER_OBJ && right.Type() == object.INTEGER_OBJ && exp.Operator == "/":
		return &object.Integer{Value: left.(*object.Integer).Value / right.(*object.Integer).Value}
	}

	return newError("unknown operator: %s %s %s", left.Type(), exp.Operator, right.Type())
}

func isError(obj object.Object) bool {
	return obj != nil && obj.Type() == object.ERROR_OBJ
}

func nativeBoolToBooleanObject(input bool) *object.Boolean {
	if input {
		return object.TRUE
	}
	return object.FALSE
}

func parseBigInt(s string) (*big.Int, *object.Error) {
	bigInt := new(big.Int)
	bigInt, ok := bigInt.SetString(s, 10)
	if !ok {
		return nil, newError("invalid string number: %s", s)
	}
	return bigInt, nil
}

func cmpBigInt(left, right object.Object) (int, *object.Error) {
	l, errL := parseBigInt(left.(*object.String).Value)
	if errL != nil {
		return 0, errL
	}

	r, errR := parseBigInt(right.(*object.String).Value)
	if errR != nil {
		return 0, errR
	}

	z := new(big.Int)
	return z.Sub(l, r).Sign(), nil
}
