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

import (
	fmt "fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (p *Plugin) CreatorAccAddress() (sdk.AccAddress, error) {
	addr, err := sdk.AccAddressFromBech32(p.Creator)
	if err != nil {
		return nil, fmt.Errorf("failed to convert creator address: %w", err)
	}

	return addr, nil
}
