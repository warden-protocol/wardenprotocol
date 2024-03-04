package evaluator

import "github.com/warden-protocol/wardenprotocol/shield/object"

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
					threshold--
				}

				if threshold == 0 {
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
}
