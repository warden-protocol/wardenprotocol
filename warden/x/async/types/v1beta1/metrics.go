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
	"time"

	"cosmossdk.io/math"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func NewPluginMetrics(pluginId string) PluginMetrics {
	return PluginMetrics{
		PluginId:             pluginId,
		TasksCount:           0,
		ResultsCount:         0,
		TotalInputSizeBytes:  math.ZeroInt(),
		TotalOutputSizeBytes: math.ZeroInt(),
		TotalResultTimeMsec:  math.ZeroInt(),
		TotalFees:            sdk.NewCoins(),
	}
}

func IsValidScore(score uint32) bool {
	// Check if the score is within the valid range
	return score >= 1 && score <= 5
}

func (m *PluginMetrics) UpdateUsageMetrics(inputSize int) {
	m.TasksCount += 1
	m.TotalInputSizeBytes = m.TotalInputSizeBytes.Add(math.NewInt(int64(inputSize)))
}

func (m *PluginMetrics) UpdateResultMetrics(outputSize int, responseTime time.Duration, fees sdk.Coins) {
	m.ResultsCount += 1
	m.TotalOutputSizeBytes = m.TotalOutputSizeBytes.Add(math.NewInt(int64(outputSize)))
	m.TotalResultTimeMsec = m.TotalResultTimeMsec.Add(math.NewInt(responseTime.Milliseconds()))
	m.TotalFees = m.TotalFees.Add(fees...)
}
