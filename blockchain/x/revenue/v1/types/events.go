// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:LGPL-3.0-only
package types

// revenue events
const (
	EventTypeRegisterRevenue      = "register_revenue"
	EventTypeCancelRevenue        = "cancel_revenue"
	EventTypeUpdateRevenue        = "update_revenue"
	EventTypeDistributeDevRevenue = "distribute_dev_revenue"

	AttributeKeyContract          = "contract"
	AttributeKeyWithdrawerAddress = "withdrawer_address"
)
