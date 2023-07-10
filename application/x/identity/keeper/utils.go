package keeper

import sdk "github.com/cosmos/cosmos-sdk/types"

func GetIDBytes(id uint64) []byte {
	return sdk.Uint64ToBigEndian(id)
}
