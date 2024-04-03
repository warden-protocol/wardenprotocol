package evaluator

import (
	"fmt"

	"github.com/warden-protocol/wardenprotocol/shield/env"
	"github.com/warden-protocol/wardenprotocol/shield/internal/ast"
	"github.com/warden-protocol/wardenprotocol/shield/object"
)

func Eval(exp ast.Expression, env env.Environment) object.Object {
	switch exp := exp.(type) {
	case *ast.IntegerLiteral:
		return &object.Integer{Value: exp.Value}
	case *ast.BooleanLiteral:
		if exp.Value {
			return object.TRUE
		}
		return object.FALSE
	case *ast.ArrayLiteral:
		elements := make([]object.Object, 0, len(exp.Elements))
		for _, el := range exp.Elements {
			elements = append(elements, Eval(el, env))
		}
		return &object.Array{Elements: elements}
	case *ast.Identifier:
		if v, ok := builtins[exp.Value]; ok {
			return v
		}

		if v, ok := env.Get(exp.Value); ok {
			return v
		}

		return newError("identifier not found: " + exp.Value)
	case *ast.InfixExpression:
		return evalInfixExpression(exp, env)
	case *ast.CallExpression:
		fn := Eval(exp.Function, env)
		args := evalExpressions(exp.Arguments, env)
		return applyFunction(fn, args, env)
	}
	return newError("unknown expression: %s (type %T)", exp, exp)
}

func evalExpressions(exps []ast.Expression, env env.Environment) []object.Object {
	result := make([]object.Object, 0, len(exps))
	for _, e := range exps {
		evaluated := Eval(e, env)
		result = append(result, evaluated)
	}
	return result
}

func applyFunction(fn object.Object, args []object.Object, env env.Environment) object.Object {
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
	case left.Type() == object.BOOLEAN_OBJ && right.Type() == object.BOOLEAN_OBJ && exp.Operator == "||":
		return nativeBoolToBooleanObject(
			left.(*object.Boolean).Value || right.(*object.Boolean).Value,
		)
	case left.Type() == object.BOOLEAN_OBJ && right.Type() == object.BOOLEAN_OBJ && exp.Operator == "&&":
		return nativeBoolToBooleanObject(
			left.(*object.Boolean).Value && right.(*object.Boolean).Value,
		)
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
