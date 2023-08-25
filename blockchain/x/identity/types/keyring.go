package types

// nolint:stylecheck,ST1003
// revive:disable-next-line var-naming
func (k *Keyring) SetId(id uint64) { k.Id = id }

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
