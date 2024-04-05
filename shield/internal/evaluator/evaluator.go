package evaluator

import (
	"fmt"

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
