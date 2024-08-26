package v1beta3

import (
	"fmt"
	"github.com/warden-protocol/wardenprotocol/shield"
	acttypes "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func (w *Space) IsOwner(address string) bool {
	for _, owner := range w.Owners {
		if owner == address {
			return true
		}
	}
	return false
}

func (w *Space) AddOwner(address string, nonce uint64) error {
	if err := w.EnsureNonce(nonce); err != nil {
		return err
	}

	if w.IsOwner(address) {
		return ErrDuplicateSpaceOwner
	}
	w.Owners = append(w.Owners, address)
	return nil
}

func (w *Space) RemoveOwner(address string, nonce uint64) error {
	if err := w.EnsureNonce(nonce); err != nil {
		return err
	}

	for i, owner := range w.Owners {
		if owner == address {
			w.Owners = append(w.Owners[:i], w.Owners[i+1:]...)
			return nil
		}
	}

	return nil
}

func (w *Space) EnsureNonce(nonce uint64) error {
	if w.Nonce != nonce {
		return fmt.Errorf("space nonce does not match expected nonce: %d", w.Nonce)
	}

	return nil
}

func (w *Space) IncrementNonce(nonce uint64) (uint64, error) {
	if err := w.EnsureNonce(nonce); err != nil {
		return 0, err
	}

	w.Nonce += 1

	return w.Nonce, nil
}

func (w *Space) RuleAddOwner() acttypes.Rule {
	return w.AnyOwnerRule()
}

func (w *Space) RuleRemoveOwner() acttypes.Rule {
	return w.AnyOwnerRule()
}

func (w *Space) RuleAppendChild() acttypes.Rule {
	return w.AnyOwnerRule()
}

func (w *Space) RuleNewKeyRequest() acttypes.Rule {
	return w.AnyOwnerRule()
}

func (w *Space) RuleUpdateKey() acttypes.Rule {
	return w.AnyOwnerRule()
}

func (w *Space) RuleNewSignRequest() acttypes.Rule {
	return w.AnyOwnerRule()
}

func (w *Space) RuleUpdateSpace() acttypes.Rule {
	return w.AnyOwnerRule()
}

// AnyOwnerRule returns a rule that is satisfied when at least one of the owners of the space approves.
func (w *Space) AnyOwnerRule() acttypes.Rule {
	expr, err := shield.Parse("any(1, warden.space.owners)")
	if err != nil {
		panic(err)
	}

	return acttypes.Rule{
		Name:       "AnyOwner",
		Expression: expr,
	}
}
