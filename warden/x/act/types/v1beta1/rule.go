package v1beta1

import (
	"context"

	"cosmossdk.io/errors"
	"github.com/warden-protocol/wardenprotocol/shield"
	"github.com/warden-protocol/wardenprotocol/shield/object"
)

func (r *Rule) Eval(ctx context.Context, env shield.Environment) (bool, error) {
	obj := shield.Eval(r.Expression, env)

	if obj.Type() == object.ERROR_OBJ {
		return false, errors.Wrapf(ErrRuleEvaluationFailed, "result: %s", obj.Inspect())
	}

	if obj.Type() != object.BOOLEAN_OBJ {
		return false, errors.Wrapf(ErrRuleNotBoolean, "expected boolean, got %s (%s)", obj.Type(), obj.Inspect())
	}

	return obj.(*object.Boolean).Value, nil
}

func (r *Rule) Validate() error {
	if len(r.Creator) == 0 {
		return errors.Wrapf(ErrInvalidRule, "creator is required")
	}

	if len(r.Name) == 0 {
		return errors.Wrapf(ErrInvalidRule, "name is required")
	}

	return nil
}
