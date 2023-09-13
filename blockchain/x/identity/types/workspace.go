package types

import (
	"github.com/qredo/fusionchain/policy"
)

func (w *Workspace) SetAddress(addr string) { w.Address = addr }

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

func (w *Workspace) AddChild(child *Workspace) {
	w.ChildWorkspaces = append(w.ChildWorkspaces, child.Address)
}

func (w *Workspace) PolicyAddOwner() policy.Policy {
	return w.AnyOwnerPolicy()
}

func (w *Workspace) PolicyRemoveOwner() policy.Policy {
	return w.AnyOwnerPolicy()
}

func (w *Workspace) PolicyAppendChild() policy.Policy {
	return w.AnyOwnerPolicy()
}

func (w *Workspace) PolicyNewKeyRequest() policy.Policy {
	return w.AnyOwnerPolicy()
}

func (w *Workspace) PolicyNewSignatureRequest() policy.Policy {
	return w.AnyOwnerPolicy()
}

func (w *Workspace) PolicyNewSignTransactionRequest() policy.Policy {
	return w.AnyOwnerPolicy()
}

// AnyOwnerPolicy returns a policy that is satisfied when at least one of the owners of the workspace approves.
func (w *Workspace) AnyOwnerPolicy() policy.Policy {
	return policy.NewAnyInGroupPolicy(w.Owners)
}
