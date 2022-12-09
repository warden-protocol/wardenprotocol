package cli

import (
	"strings"
	"testing"

	"github.com/pkg/errors"
	"github.com/stretchr/testify/require"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/ethereum/go-ethereum/common"
)

func cosmosAddressFromArg(addr string) (sdk.AccAddress, error) {
	if strings.HasPrefix(addr, sdk.GetConfig().GetBech32AccountAddrPrefix()) {
		// Check to see if address is Cosmos bech32 formatted
		toAddr, err := sdk.AccAddressFromBech32(addr)
		if err != nil {
			return nil, errors.Wrap(err, "invalid bech32 formatted address")
		}
		return toAddr, nil
	}

	// Strip 0x prefix if exists
	addr = strings.TrimPrefix(addr, "0x")

	return sdk.AccAddressFromHex(addr)
}

func TestAddressFormats(t *testing.T) {
	testCases := []struct {
		name        string
		addrString  string
		expectedHex string
		expectErr   bool
	}{
		{"Cosmos Address", "cosmos18wvvwfmq77a6d8tza4h5sfuy2yj3jj88yqg82a", "0x3B98c72760f7BBa69D62ED6f48278451251948e7", false},
		{"hex without 0x", "3B98C72760F7BBA69D62ED6F48278451251948E7", "0x3B98c72760f7BBa69D62ED6f48278451251948e7", false},
		{"hex with mixed casing", "3b98C72760f7BBA69D62ED6F48278451251948e7", "0x3B98c72760f7BBa69D62ED6f48278451251948e7", false},
		{"hex with 0x", "0x3B98C72760F7BBA69D62ED6F48278451251948E7", "0x3B98c72760f7BBa69D62ED6f48278451251948e7", false},
		{"invalid hex ethereum address", "0x3B98C72760F7BBA69D62ED6F48278451251948E", "", true},
		{"invalid Cosmos address", "cosmos18wvvwfmq77a6d8tza4h5sfuy2yj3jj88", "", true},
		{"empty string", "", "", true},
	}

	for _, tc := range testCases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			hex, err := accountToHex(tc.addrString)
			require.Equal(t, tc.expectErr, err != nil, err)

			if !tc.expectErr {
				require.Equal(t, hex, tc.expectedHex)
			}
		})
	}
}

func TestCosmosToEthereumTypes(t *testing.T) {
	hexString := "0x3B98D72760f7bbA69d62Ed6F48278451251948E7"
	cosmosAddr, err := sdk.AccAddressFromHex(hexString[2:])
	require.NoError(t, err)

	cosmosFormatted := cosmosAddr.String()

	// Test decoding a cosmos formatted address
	decodedHex, err := accountToHex(cosmosFormatted)
	require.NoError(t, err)
	require.Equal(t, hexString, decodedHex)

	// Test converting cosmos address with eth address from hex
	hexEth := common.HexToAddress(hexString)
	convertedEth := common.BytesToAddress(cosmosAddr.Bytes())
	require.Equal(t, hexEth, convertedEth)

	// Test decoding eth hex output against hex string
	ethDecoded, err := accountToHex(hexEth.Hex())
	require.NoError(t, err)
	require.Equal(t, hexString, ethDecoded)
}

func TestAddressToCosmosAddress(t *testing.T) {
	baseAddr, err := sdk.AccAddressFromHex("6A98D72760f7bbA69d62Ed6F48278451251948E7")
	require.NoError(t, err)

	// Test cosmos string back to address
	cosmosFormatted, err := cosmosAddressFromArg(baseAddr.String())
	require.NoError(t, err)
	require.Equal(t, baseAddr, cosmosFormatted)

	// Test account address from Ethereum address
	ethAddr := common.BytesToAddress(baseAddr.Bytes())
	ethFormatted, err := cosmosAddressFromArg(ethAddr.Hex())
	require.NoError(t, err)
	require.Equal(t, baseAddr, ethFormatted)

	// Test encoding without the 0x prefix
	ethFormatted, err = cosmosAddressFromArg(ethAddr.Hex()[2:])
	require.NoError(t, err)
	require.Equal(t, baseAddr, ethFormatted)
}
