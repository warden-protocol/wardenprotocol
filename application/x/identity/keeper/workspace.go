package keeper

import (
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
)

func (k Keeper) GetWorkspaceCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.WorkspaceCountKey)
	bz := store.Get(byteKey)
	if bz == nil {
		return 0
	}
	return sdk.BigEndianToUint64(bz)
}

func (k Keeper) SetWorkspaceCount(ctx sdk.Context, c uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.WorkspaceCountKey)
	bz := sdk.Uint64ToBigEndian(c)
	store.Set(byteKey, bz)
}

func (k Keeper) GetWorkspace(ctx sdk.Context, id uint64) (types.Workspace, bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WorkspaceKey))
	byteKey := types.KeyPrefix(types.WorkspaceKey)
	bz := store.Get(byteKey)
	if bz == nil {
		return types.Workspace{}, false
	}
	var workspace types.Workspace
	k.cdc.MustUnmarshal(bz, &workspace)
	return workspace, true
}
func (k Keeper) AppendWorkspace(ctx sdk.Context, workspace types.Workspace) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WorkspaceKey))

	count := k.GetWorkspaceCount(ctx)
	workspace.Id = count
	appendedValue := k.cdc.MustMarshal(&workspace)
	store.Set(GetIDBytes(workspace.Id), appendedValue)

	k.SetWorkspaceCount(ctx, count+1)
	return count
}

func GetIDBytes(id uint64) []byte {
	return sdk.Uint64ToBigEndian(id)
}
