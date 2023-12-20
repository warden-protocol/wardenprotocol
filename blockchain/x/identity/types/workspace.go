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

import (
	"fmt"

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

func (w *Workspace) AddOwner(address string) error {
	if w.IsOwner(address) {
		return fmt.Errorf("owner already exists")
	}
	w.Owners = append(w.Owners, address)
	return nil
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

func (w *Workspace) PolicyUpdateWorkspace() policy.Policy {
	return w.AnyOwnerPolicy()
}

// AnyOwnerPolicy returns a policy that is satisfied when at least one of the owners of the workspace approves.
func (w *Workspace) AnyOwnerPolicy() policy.Policy {
	return policy.NewAnyInGroupPolicy(w.Owners)
}
