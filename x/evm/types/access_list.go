package types

import (
	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
)

// AccessList is an EIP-2930 access list that represents the slice of
// the protobuf AccessTuples.
type AccessList []AccessTuple

// NewAccessList creates a new protobuf-compatible AccessList from an ethereum
// core AccessList type
func NewAccessList(ethAccessList *ethtypes.AccessList) AccessList {
	if ethAccessList == nil {
		return nil
	}

	al := AccessList{}
	for _, tuple := range *ethAccessList {
		storageKeys := make([]string, len(tuple.StorageKeys))

		for i := range tuple.StorageKeys {
			storageKeys[i] = tuple.StorageKeys[i].String()
		}

		al = append(al, AccessTuple{
			Address:     tuple.Address.String(),
			StorageKeys: storageKeys,
		})
	}

	return al
}

// ToEthAccessList is an utility function to convert the protobuf compatible
// AccessList to eth core AccessList from go-ethereum
func (al AccessList) ToEthAccessList() *ethtypes.AccessList {
	var ethAccessList ethtypes.AccessList

	for _, tuple := range al {
		storageKeys := make([]common.Hash, len(tuple.StorageKeys))

		for i := range tuple.StorageKeys {
			storageKeys[i] = common.HexToHash(tuple.StorageKeys[i])
		}

		ethAccessList = append(ethAccessList, ethtypes.AccessTuple{
			Address:     common.HexToAddress(tuple.Address),
			StorageKeys: storageKeys,
		})
	}

	return &ethAccessList
}
