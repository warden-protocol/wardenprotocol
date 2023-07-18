package types

import (
	"gitlab.qredo.com/qrdochain/fusionchain/policy"
)

func (w *Workspace) SetId(id uint64) { w.Id = id }

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

func (w *Workspace) PolicyAddOwner() policy.Policy {
	// TODO: allow users to set a custom w.PolicyAddOwner?
	return w.AnyOwnerPolicy()
}

func (w *Workspace) PolicyRemoveOwner() policy.Policy {
	// TODO: allow users to set a custom w.PolicyRemoveOwner?
	return w.AnyOwnerPolicy()
}

// AnyOwnerPolicy returns a policy that is satisfied when at least one of the owners of the workspace approves.
func (w *Workspace) AnyOwnerPolicy() policy.Policy {
	return policy.NewAnyInGroupPolicy(w.Owners)
}
