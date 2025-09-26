package evaluator

import (
	"math/big"

	"github.com/warden-protocol/wardenprotocol/shield/object"
)

var builtins = map[string]*object.Builtin{
	"any": {
		Fn: func(args ...object.Object) object.Object {
			if len(args) != 2 {
				return newError("wrong number of arguments. got=%d, want=2", len(args))
			}

			threshold := args[0].(*object.Integer).Value
			elements := args[1].(*object.Array).Elements

			for _, el := range elements {
				if el.Type() != object.BOOLEAN_OBJ {
					return newError("argument to `any` not supported, got %s (%s)", el.Type(), el.Inspect())
				}

				if el.(*object.Boolean).Value {
					threshold.Sub(threshold, big.NewInt(1))
				}

				if threshold.Cmp(big.NewInt(0)) == 0 {
					return object.TRUE
				}
			}

			return object.FALSE
		},
	},

	"all": {
		Fn: func(args ...object.Object) object.Object {
			if len(args) != 1 {
				return newError("wrong number of arguments. got=%d, want=1", len(args))
			}

			elements := args[0].(*object.Array).Elements

			for _, el := range elements {
				if el.Type() != object.BOOLEAN_OBJ {
					return newError("argument to `all` not supported, got %s (%s)", el.Type(), el.Inspect())
				}

				if !el.(*object.Boolean).Value {
					return object.FALSE
				}
			}

			return object.TRUE
		},
	},

	"contains": {
		Fn: func(args ...object.Object) object.Object {
			if len(args) != 2 {
				return newError("wrong number of arguments. got=%d, want=2", len(args))
			}

			item := args[0]
			array := args[1]

			if item.Type() != object.INTEGER_OBJ && item.Type() != object.BOOLEAN_OBJ && item.Type() != object.STRING_OBJ {
				return newError("invalid first argument type, got=%s. The only supported types are integers, booleans, and strings.", item.Type())
			}

			if array.Type() != object.ARRAY_OBJ {
				return newError("invalid second argument type. got=%s, want=%s", item.Type(), object.ARRAY_OBJ)
			}

			elements := array.(*object.Array).Elements

			for _, el := range elements {
				if compare(item, el) {
					return object.TRUE
				}
			}

			return object.FALSE
		},
	},
}

func compare(a, b object.Object) bool {
	if a.Type() != b.Type() {
		return false
	}

	switch a.Type() {
	case object.INTEGER_OBJ:
		return a.(*object.Integer).Value.Cmp(b.(*object.Integer).Value) == 0
	case object.BOOLEAN_OBJ:
		return a.(*object.Boolean).Value == b.(*object.Boolean).Value
	case object.STRING_OBJ:
		return a.(*object.String).Value == b.(*object.String).Value
	}

	return false
}
