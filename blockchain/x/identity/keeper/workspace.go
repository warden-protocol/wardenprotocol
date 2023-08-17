package keeper

import (
	"crypto/sha256"
	"encoding/binary"

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

func (k Keeper) GetWorkspace(ctx sdk.Context, addr string) *types.Workspace {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WorkspaceKey))
	bz := store.Get([]byte(addr))
	if bz == nil {
		return nil
	}
	var workspace types.Workspace
	k.cdc.MustUnmarshal(bz, &workspace)
	return &workspace
}

func (k Keeper) CreateWorkspace(ctx sdk.Context, workspace *types.Workspace) string {
	count := k.GetWorkspaceCount(ctx)
	buf := make([]byte, 8)
	binary.LittleEndian.PutUint64(buf, count)
	addrHash := sha256.Sum256(buf)
	workspace.Address = sdk.MustBech32ifyAddressBytes("qredoworkspace", sdk.AccAddress(addrHash[:8]))
	k.SetWorkspace(ctx, workspace)
	k.SetWorkspaceCount(ctx, count+1)
	return workspace.Address
}

func (k Keeper) SetWorkspace(ctx sdk.Context, workspace *types.Workspace) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.WorkspaceKey))
	newValue := k.cdc.MustMarshal(workspace)
	store.Set([]byte(workspace.Address), newValue)
}
