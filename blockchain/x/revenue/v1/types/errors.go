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
