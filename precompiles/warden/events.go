package warden

import (
	"bytes"
	"math/big"
	"reflect"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/core/vm"
	cmn "github.com/evmos/evmos/v20/precompiles/common"
)

const (
	// EventTypeAddKeychainAdmin defines the event type for the x/warden AddKeychainAdmin transaction.
	EventTypeAddKeychainAdmin = "AddKeychainAdmin"
)

func (p Precompile) EmitAddKeychainAdminEvent(ctx sdk.Context, stateDB vm.StateDB, keychainId uint64, adminAddress common.Address, adminsCount uint64) error {
	// Prepare the event topics
	event := p.ABI.Events[EventTypeAddKeychainAdmin]

	topics := make([]common.Hash, 2)
	// The first topic is always the signature of the event.
	topics[0] = event.ID

	var err error
	topics[1], err = cmn.MakeTopic(adminAddress)
	if err != nil {
		return err
	}

	var b bytes.Buffer
	b.Write(cmn.PackNum(reflect.ValueOf(new(big.Int).SetUint64(keychainId))))
	b.Write(cmn.PackNum(reflect.ValueOf(new(big.Int).SetUint64(adminsCount))))

	stateDB.AddLog(&ethtypes.Log{
		Address:     p.Address(),
		Topics:      topics,
		Data:        b.Bytes(),
		BlockNumber: uint64(ctx.BlockHeight()),
	})

	return nil
}
