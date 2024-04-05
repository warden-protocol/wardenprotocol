package types

import (
	"context"
	"fmt"

	"github.com/warden-protocol/wardenprotocol/shield"
	"github.com/warden-protocol/wardenprotocol/shield/object"
)

func (i *Intent) Eval(ctx context.Context, env shield.Environment) (bool, error) {
	obj := shield.Eval(i.Expression, env)

	if obj.Type() == object.ERROR_OBJ {
		return false, fmt.Errorf("executing intent: %s", obj.Inspect())
	}

	if obj.Type() != object.BOOLEAN_OBJ {
		return false, fmt.Errorf("executing intent: expected boolean, got %s (%s)", obj.Type(), obj.Inspect())
	}

	return obj.(*object.Boolean).Value, nil
}
