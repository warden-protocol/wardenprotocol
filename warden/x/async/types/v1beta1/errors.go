// Copyright (c) 2025 Warden Labs. All Rights Reserved.
//
// ** RESTRICTED LICENSE **
//
// This file is part of the 'async' module. It is NOT licensed
// under the Apache 2.0 license governing the rest of the project.
// Refer to the LICENSE file in this module's directory for full terms.
// Use, modification, and distribution are strictly limited.
// Do NOT use this file unless you agree to the terms stated in that license.
//
// SPDX-FileCopyrightText: 2025 Warden Labs
// SPDX-License-Identifier: LicenseRef-Proprietary-RestrictedModule

package v1beta1

// DONTCOVER

import (
	sdkerrors "cosmossdk.io/errors"
)

// x/async module sentinel errors.
var (
	ErrInvalidSigner        = sdkerrors.Register(ModuleName, 1100, "expected gov account as only signer for proposal message")
	ErrInvalidPlugin        = sdkerrors.Register(ModuleName, 1102, "invalid plugin name")
	ErrInvalidTaskInput     = sdkerrors.Register(ModuleName, 1103, "invalid task input")
	ErrTaskAlreadyHasResult = sdkerrors.Register(ModuleName, 1104, "task already has result")
	ErrInvalidCallback      = sdkerrors.Register(ModuleName, 1105, "invalid callback")
	ErrInsufficientFees     = sdkerrors.Register(ModuleName, 1106, "insufficient fees for plugin")
	ErrNoSolvers            = sdkerrors.Register(ModuleName, 1107, "no solvers")
)
