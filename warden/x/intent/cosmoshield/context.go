package cosmoshield

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

type Context struct {
	context.Context

	actionMsg sdk.Msg
}

func NewContext(baseContext context.Context, actionMsg sdk.Msg) Context {
	return Context{
		Context:   baseContext,
		actionMsg: actionMsg,
	}
}

func (c Context) Msg() sdk.Msg {
	return c.actionMsg
}

func UnwrapContext(ctx context.Context) Context {
	if ctx, ok := ctx.(Context); ok {
		return ctx
	}

	return Context{
		Context: ctx,
	}
}
