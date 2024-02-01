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
package keeper_test

// import (
// 	"testing"

// 	"github.com/ethereum/go-ethereum/common"
// 	. "github.com/onsi/ginkgo/v2"
// 	. "github.com/onsi/gomega"

// 	"github.com/cosmos/cosmos-sdk/crypto/keyring"
// 	sdk "github.com/cosmos/cosmos-sdk/types"
// 	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
// 	ethtypes "github.com/ethereum/go-ethereum/core/types"

// 	"github.com/warden-protocol/wardenprotocol/app"
// 	utiltx "github.com/warden-protocol/wardenprotocol/testutil/tx"
// 	"github.com/warden-protocol/wardenprotocol/utils"
// 	evm "github.com/evmos/ethermint/x/evm/types"
// 	feemarkettypes "github.com/evmos/ethermint/x/feemarket/types"
// 	"github.com/warden-protocol/wardenprotocol/x/revenue/v1/types"

// 	"github.com/stretchr/testify/suite"
// )

// type KeeperTestSuite struct {
// 	suite.Suite

// 	ctx sdk.Context

// 	app            *app.Evmos
// 	queryClient    types.QueryClient
// 	queryClientEvm evm.QueryClient
// 	address        common.Address
// 	signer         keychain.Signer
// 	ethSigner      ethtypes.Signer
// 	consAddress    sdk.ConsAddress
// 	validator      stakingtypes.Validator
// 	denom          string
// }

// var s *KeeperTestSuite

// var (
// 	contract = utiltx.GenerateAddress()
// 	deployer = sdk.AccAddress(utiltx.GenerateAddress().Bytes())
// 	withdraw = sdk.AccAddress(utiltx.GenerateAddress().Bytes())
// )

// func TestKeeperTestSuite(t *testing.T) {
// 	s = new(KeeperTestSuite)
// 	suite.Run(t, s)

// 	// Run Ginkgo integration tests
// 	RegisterFailHandler(Fail)
// 	RunSpecs(t, "Keeper Suite")
// }

// func (suite *KeeperTestSuite) SetupTest() {
// 	chainID := utils.TestnetChainID + "-1"
// 	suite.app = app.Setup(false, feemarkettypes.DefaultGenesisState(), chainID)
// 	suite.SetupApp(chainID)
// }
