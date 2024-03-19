package types

import (
	"fmt"

	"github.com/warden-protocol/wardenprotocol/shield"
	"github.com/warden-protocol/wardenprotocol/shield/object"
)

func (i *Intent) Eval(env shield.Environment) (bool, error) {
	obj, err := shield.Run(i.Definition, env)
	if err != nil {
		return false, err
	}

	if obj.Type() == object.ERROR_OBJ {
		return false, fmt.Errorf("executing intent: %s", obj.Inspect())
	}

	if obj.Type() != object.BOOLEAN_OBJ {
		return false, fmt.Errorf("executing intent: expected boolean, got %s (%s)", obj.Type(), obj.Inspect())
	}

	return obj.(*object.Boolean).Value, nil
}
