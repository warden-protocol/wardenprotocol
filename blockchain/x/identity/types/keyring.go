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

// nolint:stylecheck,st1003
// revive:disable-next-line var-naming

func (k *Keyring) IsParty(address string) bool {
	for _, party := range k.Parties {
		if party == address {
			return true
		}
	}
	return false
}

func (k *Keyring) IsAdmin(address string) bool {
	for _, admin := range k.Admins {
		if admin == address {
			return true
		}
	}
	return false
}

func (k *Keyring) AddParty(address string) {
	k.Parties = append(k.Parties, address)
}

func (k *Keyring) SetStatus(status bool) {
	k.IsActive = status
}

func (k *Keyring) SetDescription(description string) {
	k.Description = description
}
