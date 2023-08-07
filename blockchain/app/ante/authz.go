// Copyright 2021 Evmos Foundation
// This file is part of Evmos' Ethermint library.
//
// The Ethermint library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// The Ethermint library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Ethermint library. If not, see https://github.com/evmos/ethermint/blob/main/LICENSE
package ante

import (
	"fmt"

	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	errortypes "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/x/authz"
)

// maxNestedMsgs defines a cap for the number of nested messages on a MsgExec message
const maxNestedMsgs = 6

// AuthzLimiterDecorator blocks certain msg types from being granted or executed
// within the authorization module.
type AuthzLimiterDecorator struct {
	// disabledMsgs is a set that contains type urls of unauthorized msgs.
	disabledMsgs map[string]struct{}
}

// NewAuthzLimiterDecorator creates a decorator to block certain msg types
// from being granted or executed within authz.
func NewAuthzLimiterDecorator(disabledMsgTypes []string) AuthzLimiterDecorator {
	disabledMsgs := make(map[string]struct{})
	for _, url := range disabledMsgTypes {
		disabledMsgs[url] = struct{}{}
	}

	return AuthzLimiterDecorator{
		disabledMsgs: disabledMsgs,
	}
}

func (ald AuthzLimiterDecorator) AnteHandle(ctx sdk.Context, tx sdk.Tx, simulate bool, next sdk.AnteHandler) (newCtx sdk.Context, err error) {
	if err := ald.checkDisabledMsgs(tx.GetMsgs(), false, 0); err != nil {
		return ctx, errorsmod.Wrapf(errortypes.ErrUnauthorized, err.Error())
	}
	return next(ctx, tx, simulate)
}

// checkDisabledMsgs iterates through the msgs and returns an error if it finds any unauthorized msgs.
//
// This method is recursive as MsgExec's can wrap other MsgExecs. nestedMsgs sets a reasonable limit on
// the total messages, regardless of how they are nested.
func (ald AuthzLimiterDecorator) checkDisabledMsgs(msgs []sdk.Msg, isAuthzInnerMsg bool, nestedMsgs int) error {
	if nestedMsgs >= maxNestedMsgs {
		return fmt.Errorf("found more nested msgs than permitted. Limit is : %d", maxNestedMsgs)
	}
	for _, msg := range msgs {
		switch msg := msg.(type) {
		case *authz.MsgExec:
			innerMsgs, err := msg.GetMessages()
			if err != nil {
				return err
			}
			nestedMsgs++
			if err := ald.checkDisabledMsgs(innerMsgs, true, nestedMsgs); err != nil {
				return err
			}
		case *authz.MsgGrant:
			authorization, err := msg.GetAuthorization()
			if err != nil {
				return err
			}

			url := authorization.MsgTypeURL()
			if ald.isDisabledMsg(url) {
				return fmt.Errorf("found disabled msg type: %s", url)
			}
		default:
			url := sdk.MsgTypeURL(msg)
			if isAuthzInnerMsg && ald.isDisabledMsg(url) {
				return fmt.Errorf("found disabled msg type: %s", url)
			}
		}
	}
	return nil
}

// isDisabledMsg returns true if the given message is in the set of restricted
// messages from the AnteHandler.
func (ald AuthzLimiterDecorator) isDisabledMsg(msgTypeURL string) bool {
	_, ok := ald.disabledMsgs[msgTypeURL]
	return ok
}
