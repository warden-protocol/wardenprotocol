package v1beta1

import (
	"context"

	"cosmossdk.io/errors"

	"github.com/warden-protocol/wardenprotocol/shield"
	"github.com/warden-protocol/wardenprotocol/shield/object"
)

func (r *Template) Eval(ctx context.Context, env shield.Environment) (bool, error) {
	obj := shield.Eval(r.Expression, env)

	if obj.Type() == object.ERROR_OBJ {
		return false, errors.Wrapf(ErrTemplateEvaluationFailed, "result: %s", obj.Inspect())
	}

	if obj.Type() != object.BOOLEAN_OBJ {
		return false, errors.Wrapf(ErrTemplateNotBoolean, "expected boolean, got %s (%s)", obj.Type(), obj.Inspect())
	}

	return obj.(*object.Boolean).Value, nil
}

func (r *Template) Validate() error {
	if len(r.Creator) == 0 {
		return errors.Wrapf(ErrInvalidTemplate, "creator is required")
	}

	if len(r.Name) == 0 {
		return errors.Wrapf(ErrInvalidTemplate, "name is required")
	}

	return nil
}
