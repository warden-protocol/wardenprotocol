package v1beta2

import (
	"fmt"

	"github.com/warden-protocol/wardenprotocol/shield"
	intenttypes "github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

func (w *Space) IsOwner(address string) bool {
	for _, owner := range w.Owners {
		if owner == address {
			return true
		}
	}
	return false
}

func (w *Space) AddOwner(address string) error {
	if w.IsOwner(address) {
		return fmt.Errorf("owner already exists")
	}
	w.Owners = append(w.Owners, address)
	return nil
}

func (w *Space) RemoveOwner(address string) {
	for i, owner := range w.Owners {
		if owner == address {
			w.Owners = append(w.Owners[:i], w.Owners[i+1:]...)
			return
		}
	}
}

func (w *Space) IntentAddOwner() intenttypes.Intent {
	return w.AnyOwnerIntent()
}

func (w *Space) IntentRemoveOwner() intenttypes.Intent {
	return w.AnyOwnerIntent()
}

func (w *Space) IntentAppendChild() intenttypes.Intent {
	return w.AnyOwnerIntent()
}

func (w *Space) IntentNewKeyRequest() intenttypes.Intent {
	return w.AnyOwnerIntent()
}

func (w *Space) IntentUpdateKey() intenttypes.Intent {
	return w.AnyOwnerIntent()
}

func (w *Space) IntentNewSignatureRequest() intenttypes.Intent {
	return w.AnyOwnerIntent()
}

func (w *Space) IntentNewSignTransactionRequest() intenttypes.Intent {
	return w.AnyOwnerIntent()
}

func (w *Space) IntentUpdateSpace() intenttypes.Intent {
	return w.AnyOwnerIntent()
}

// AnyOwnerIntent returns a intent that is satisfied when at least one of the owners of the space approves.
func (w *Space) AnyOwnerIntent() intenttypes.Intent {
	expr, err := shield.Parse("any(1, warden.space.owners)")
	if err != nil {
		panic(err)
	}

	return intenttypes.Intent{
		Name:       "AnyOwner",
		Expression: expr,
	}
}
