// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:LGPL-3.0-only

package types

import (
	errorsmod "cosmossdk.io/errors"
)

// errors
var (
	ErrInternalRevenue              = errorsmod.Register(ModuleName, 2, "internal revenue error")
	ErrRevenueDisabled              = errorsmod.Register(ModuleName, 3, "revenue module is disabled by governance")
	ErrRevenueAlreadyRegistered     = errorsmod.Register(ModuleName, 4, "revenue already exists for given contract")
	ErrRevenueNoContractDeployed    = errorsmod.Register(ModuleName, 5, "no contract deployed")
	ErrRevenueContractNotRegistered = errorsmod.Register(ModuleName, 6, "no revenue registered for contract")
	ErrRevenueDeployerIsNotEOA      = errorsmod.Register(ModuleName, 7, "no revenue registered for contract")
)
