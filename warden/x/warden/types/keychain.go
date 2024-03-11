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
	"encoding/binary"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k *Keychain) AccAddress() sdk.AccAddress {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, k.Id)
	addr := append([]byte("keychain-"), bz...)
	return sdk.AccAddress(addr)
}

func (k *Keychain) IsParty(address string) bool {
	for _, party := range k.Parties {
		if party == address {
			return true
		}
	}
	return false
}

func (k *Keychain) IsAdmin(address string) bool {
	for _, admin := range k.Admins {
		if admin == address {
			return true
		}
	}
	return false
}

func (k *Keychain) AddParty(address string) {
	k.Parties = append(k.Parties, address)
}

func (k *Keychain) SetStatus(status bool) {
	k.IsActive = status
}

func (k *Keychain) SetDescription(description string) {
	k.Description = description
}
