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
package config

import (
	"testing"

	ethermint "github.com/evmos/ethermint/types"
	"github.com/stretchr/testify/require"

	"github.com/cosmos/cosmos-sdk/crypto/hd"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func TestSetBech32Prefixes(t *testing.T) {
	config := sdk.GetConfig()

	require.Equal(t, sdk.Bech32PrefixAccAddr, config.GetBech32AccountAddrPrefix())
	require.Equal(t, sdk.Bech32PrefixAccPub, config.GetBech32AccountPubPrefix())
	require.Equal(t, sdk.Bech32PrefixValAddr, config.GetBech32ValidatorAddrPrefix())
	require.Equal(t, sdk.Bech32PrefixValPub, config.GetBech32ValidatorPubPrefix())
	require.Equal(t, sdk.Bech32PrefixConsAddr, config.GetBech32ConsensusAddrPrefix())
	require.Equal(t, sdk.Bech32PrefixConsPub, config.GetBech32ConsensusPubPrefix())

	SetBech32Prefixes(config)
	require.Equal(t, Bech32PrefixAccAddr, config.GetBech32AccountAddrPrefix())
	require.Equal(t, Bech32PrefixAccPub, config.GetBech32AccountPubPrefix())
	require.Equal(t, Bech32PrefixValAddr, config.GetBech32ValidatorAddrPrefix())
	require.Equal(t, Bech32PrefixValPub, config.GetBech32ValidatorPubPrefix())
	require.Equal(t, Bech32PrefixConsAddr, config.GetBech32ConsensusAddrPrefix())
	require.Equal(t, Bech32PrefixConsPub, config.GetBech32ConsensusPubPrefix())

	require.Equal(t, sdk.GetConfig().GetBech32AccountAddrPrefix(), config.GetBech32AccountAddrPrefix())
	require.Equal(t, sdk.GetConfig().GetBech32AccountPubPrefix(), config.GetBech32AccountPubPrefix())
	require.Equal(t, sdk.GetConfig().GetBech32ValidatorAddrPrefix(), config.GetBech32ValidatorAddrPrefix())
	require.Equal(t, sdk.GetConfig().GetBech32ValidatorPubPrefix(), config.GetBech32ValidatorPubPrefix())
	require.Equal(t, sdk.GetConfig().GetBech32ConsensusAddrPrefix(), config.GetBech32ConsensusAddrPrefix())
	require.Equal(t, sdk.GetConfig().GetBech32ConsensusPubPrefix(), config.GetBech32ConsensusPubPrefix())
}

func TestSetCoinType(t *testing.T) {
	config := sdk.GetConfig()
	require.Equal(t, sdk.CoinType, int(config.GetCoinType()))
	require.Equal(t, sdk.FullFundraiserPath, config.GetFullBIP44Path())

	SetBip44CoinType(config)
	require.Equal(t, int(ethermint.Bip44CoinType), int(config.GetCoinType()))
	require.Equal(t, sdk.GetConfig().GetCoinType(), config.GetCoinType())
	require.Equal(t, sdk.GetConfig().GetFullBIP44Path(), config.GetFullBIP44Path())
}

func TestHDPath(t *testing.T) {
	params := *hd.NewFundraiserParams(0, ethermint.Bip44CoinType, 0)
	hdPath := params.String()
	require.Equal(t, "m/44'/60'/0'/0/0", hdPath)
	require.Equal(t, hdPath, ethermint.BIP44HDPath)
}
