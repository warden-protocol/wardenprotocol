package v1beta1

import (
	"context"

	"cosmossdk.io/errors"

	"github.com/warden-protocol/wardenprotocol/shield"
	"github.com/warden-protocol/wardenprotocol/shield/ast"
	"github.com/warden-protocol/wardenprotocol/shield/object"
)

type ActExpression ast.Expression

func (r *ActExpression) EvalExpression(ctx context.Context, env shield.Environment) (bool, error) {
	obj := shield.Eval((*ast.Expression)(r), env)

	if obj.Type() == object.ERROR_OBJ {
		return false, errors.Wrapf(ErrTemplateEvaluationFailed, "result: %s", obj.Inspect())
	}

	if obj.Type() != object.BOOLEAN_OBJ {
		return false, errors.Wrapf(ErrTemplateNotBoolean, "expected boolean, got %s (%s)", obj.Type(), obj.Inspect())
	}

	return obj.(*object.Boolean).Value, nil
}
