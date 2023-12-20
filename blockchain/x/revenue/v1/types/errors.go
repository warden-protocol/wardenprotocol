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
