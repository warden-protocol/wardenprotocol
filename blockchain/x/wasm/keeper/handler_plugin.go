// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
package keeper

import (
	"encoding/json"

	"github.com/CosmWasm/wasmd/x/wasm/keeper"
	"github.com/CosmWasm/wasmd/x/wasm/types"
	wasmvmtypes "github.com/CosmWasm/wasmvm/types"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	qassets "github.com/qredo/fusionchain/x/qassets/keeper"
	treasurytypes "github.com/qredo/fusionchain/x/treasury/types"
)

// NewDefaultMessageHandler constructor
func NewDefaultMessageHandler(
	router keeper.MessageRouter,
	ics4Wrapper types.ICS4Wrapper,
	channelKeeper types.ChannelKeeper,
	capabilityKeeper types.CapabilityKeeper,
	bankKeeper types.Burner,
	qassetsKeeper qassets.Keeper,
	unpacker codectypes.AnyUnpacker,
	portSource types.ICS20TransferPortSource,
	customEncoders ...*keeper.MessageEncoders,
) keeper.Messenger {
	encoders := keeper.DefaultEncoders(unpacker, portSource)
	for _, e := range customEncoders {
		encoders = encoders.Merge(e)
	}
	return keeper.NewMessageHandlerChain(
		keeper.NewSDKMessageHandler(router, encoders),
		keeper.NewIBCRawPacketHandler(ics4Wrapper, channelKeeper, capabilityKeeper),
		keeper.NewBurnCoinMessageHandler(bankKeeper),
		NewQAssetMintMessageHandler(qassetsKeeper),
		NewQAssetBurnMessageHandler(qassetsKeeper),
	)
}

type MsgMint struct {
	Creator           string                   `json:"creator"`
	WorkspaceAddr     string                   `json:"workspace_addr"`
	WalletType        treasurytypes.WalletType `json:"wallet_type"`
	IsToken           bool                     `json:"is_token"`
	TokenName         string                   `json:"token_name"`
	TokenContractAddr string                   `json:"token_contract_addr"`
	Amount            uint64                   `json:"amount"`
}
type MsgBurn struct {
	Creator           string                   `json:"creator"`
	WorkspaceAddr     string                   `json:"workspace_addr"`
	WalletType        treasurytypes.WalletType `json:"wallet_type"`
	IsToken           bool                     `json:"is_token"`
	TokenName         string                   `json:"token_name"`
	TokenContractAddr string                   `json:"token_contract_addr"`
	Amount            uint64                   `json:"amount"`
}

func NewQAssetMintMessageHandler(k qassets.Keeper) keeper.MessageHandlerFunc {
	return func(ctx sdk.Context, contractAddr sdk.AccAddress, _ string, m wasmvmtypes.CosmosMsg) (events []sdk.Event, data [][]byte, err error) {
		var msg MsgMint
		if err := json.Unmarshal(m.Custom, &msg); err != nil {
			return nil, nil, InvalidRequest{Kind: "could not deserialise QAssetMsg"}
		}
		k.Mint(ctx, msg.Creator, msg.WorkspaceAddr, msg.WalletType, msg.IsToken, msg.TokenName, msg.TokenContractAddr, msg.Amount)
		return nil, nil, nil
	}
}

func NewQAssetBurnMessageHandler(k qassets.Keeper) keeper.MessageHandlerFunc {
	return func(ctx sdk.Context, contractAddr sdk.AccAddress, _ string, m wasmvmtypes.CosmosMsg) (events []sdk.Event, data [][]byte, err error) {
		var msg MsgBurn
		if err := json.Unmarshal(m.Custom, &msg); err != nil {
			return nil, nil, InvalidRequest{Kind: "could not deserialise QAssetMsg"}
		}
		k.Burn(ctx, msg.Creator, msg.WorkspaceAddr, msg.WalletType, msg.IsToken, msg.TokenName, msg.TokenContractAddr, msg.Amount)
		return nil, nil, nil
	}
}
