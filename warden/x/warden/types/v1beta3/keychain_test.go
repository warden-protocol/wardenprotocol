package v1beta3_test

import (
	"fmt"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/common"
	"github.com/stretchr/testify/require"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func init() {
	config := sdk.GetConfig()
	config.SetBech32PrefixForAccount("warden", "wardenpub")
}

func TestKeychainAddressCanBeConvertedToEthereumAddress(t *testing.T) {
	ids := []uint64{
		0,
		1,
		0xFFFFFFFFFFFFFFFF, // max uint64
	}

	for _, id := range ids {
		t.Run(fmt.Sprintf("id=%d", id), func(t *testing.T) {
			k := types.Keychain{Id: id}
			addr := k.AccAddress()
			got := common.Address(addr)
			require.NotEmpty(t, got)
			require.NotZero(t, got)
		})
	}
}

func TestKeychainAddress(t *testing.T) {
	k := types.Keychain{Id: 1}
	addr1 := k.AccAddress()
	expected := common.HexToAddress("0xd14Bb409Ccf9DCc22a3153996Ee689D75FF1B582")
	require.Equal(t, expected, common.Address(addr1))
}
