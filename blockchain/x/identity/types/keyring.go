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

func (k *Keyring) AddParty(address string) {
	k.Parties = append(k.Parties, address)
}

func (k *Keyring) SetStatus(status bool) {
	k.IsActive = status
}

func (k *Keyring) SetDescription(description string) {
	k.Description = description
}
