package types

func (w *Workspace) IsOwner(address string) bool {
	for _, owner := range w.Owners {
		if owner == address {
			return true
		}
	}
	return false
}

func (w *Workspace) AddOwner(address string) {
	w.Owners = append(w.Owners, address)
}

func (w *Workspace) RemoveOwner(address string) {
	for i, owner := range w.Owners {
		if owner == address {
			w.Owners = append(w.Owners[:i], w.Owners[i+1:]...)
			return
		}
	}
}
