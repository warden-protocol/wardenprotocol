package types

func (w *Keyring) IsParty(address string) bool {
	for _, party := range w.Parties {
		if party == address {
			return true
		}
	}
	return false
}

func (w *Keyring) AddParty(address string) {
	w.Parties = append(w.Parties, address)
}
