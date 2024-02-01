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

const (
	// ModuleName defines the module name
	ModuleName = "treasury"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey defines the module's message routing key
	RouterKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_treasury"

	KeyRequestKey = "key_request/value/"

	KeyRequestCountKey = "key_request/count"

	KeyKey = "key/value/"

	KeyCountKey = "key/count"

	SignRequestKey = "sign_request/value/"

	SignRequestCountKey = "sign_request/count"

	WalletKey = "wallet/value/"

	WalletCountKey = "wallet/count"

	SignTransactionRequestKey = "sign_transaction_request/value/"

	SignTransactionRequestCountKey = "sign_transaction_request/count"
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
