// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
package types

import (
	"testing"

	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/stretchr/testify/require"
)

// Test that every WalletType defined in protobuf is covered by NewWalletI.
func Test_NewWalletI_Exhaustive(t *testing.T) {
	for walletType, name := range WalletType_name {
		if walletType == int32(WalletType_WALLET_TYPE_UNSPECIFIED) {
			continue
		}

		t.Run(name, func(t *testing.T) {
			_, err := NewWallet(
				&Key{
					Id:        0,
					SpaceAddr: "wardenspace14a2hpadpsy9h5sm54xj",
					Type:      0,
					PublicKey: hexutil.MustDecode("0x025cd45a6614df5348692ea4d0f7c16255b75a6b6f67bea5013621fe84af8031f0"),
				},
				WalletType(walletType),
			)
			require.NotErrorIs(t, err, ErrUnknownWalletType)
		})
	}
}
