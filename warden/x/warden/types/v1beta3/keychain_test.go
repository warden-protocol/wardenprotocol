package v1beta3_test

import (
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

func TestCosmosAddressEthCollision(t *testing.T) {
	t.Run("cosmos_addresses_eth_address_collision", func(t *testing.T) {
		k := types.Keychain{Id: 1}
		addr1 := k.AccAddress()
		addr2, err := sdk.AccAddressFromBech32("warden1qqqqq6m9093ksctfdcksqqqqqqqqqqqp73dme3")
		require.NoError(t, err)
		require.NotEqual(t, sdk.AccAddress(addr1).String(), addr2.String())
		require.Equal(t, common.BytesToAddress(addr1), common.BytesToAddress(addr2))
	})
}
