package keeper

import (
	"fmt"

	"github.com/CosmWasm/wasmd/x/wasm/keeper"
	"github.com/CosmWasm/wasmd/x/wasm/types"
	wasmvmtypes "github.com/CosmWasm/wasmvm/types"
	"github.com/cometbft/cometbft/libs/log"
	"github.com/cosmos/cosmos-sdk/codec"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	capabilitytypes "github.com/cosmos/cosmos-sdk/x/capability/types"
	ibcexported "github.com/cosmos/ibc-go/v7/modules/core/exported"

	policy "github.com/qredo/fusionchain/x/policy/keeper"
	qassets "github.com/qredo/fusionchain/x/qassets/keeper"
)

// Keeper will have a reference to Wasm Engine with it's own data directory.
type Keeper struct {
	Keeper        keeper.Keeper
	policyKeeper  policy.Keeper
	qassetsKeeper qassets.Keeper
}

func (k Keeper) StoreKey() storetypes.StoreKey {
	return k.Keeper.StoreKey()
}

func (k Keeper) CDC() codec.Codec {
	return k.Keeper.CDC()
}

func (k Keeper) StoreCodeInfo(ctx sdk.Context, codeID uint64, codeInfo types.CodeInfo) {
	k.Keeper.StoreCodeInfo(ctx, codeID, codeInfo)
}

func (k Keeper) AddToContractCreatorSecondaryIndex(ctx sdk.Context, creatorAddress sdk.AccAddress, position *types.AbsoluteTxPosition, contractAddress sdk.AccAddress) {
	k.Keeper.AddToContractCreatorSecondaryIndex(ctx, creatorAddress, position, contractAddress)
}

func (k Keeper) ClassicAddressGenerator() keeper.AddressGenerator {
	return k.Keeper.ClassicAddressGenerator()
}

func (k Keeper) Instantiate(ctx sdk.Context, codeID uint64, creator, admin sdk.AccAddress, initMsg []byte, label string, deposit sdk.Coins, addressGenerator keeper.AddressGenerator, authPolicy types.AuthorizationPolicy) (sdk.AccAddress, []byte, error) {
	return k.Keeper.Instantiate(ctx, codeID, creator, admin, initMsg, label, deposit, addressGenerator, authPolicy)
}

func (k Keeper) Execute(ctx sdk.Context, contractAddress, caller sdk.AccAddress, msg []byte, coins sdk.Coins) ([]byte, error) {
	return k.Keeper.Execute(ctx, contractAddress, caller, msg, coins)
}

func (k Keeper) Migrate(ctx sdk.Context, contractAddress, caller sdk.AccAddress, newCodeID uint64, msg []byte, authZ types.AuthorizationPolicy) ([]byte, error) {
	return k.Keeper.Migrate(ctx, contractAddress, caller, newCodeID, msg, authZ)
}

func (k Keeper) SetContractAdmin(ctx sdk.Context, contractAddress, caller, newAdmin sdk.AccAddress, authZ types.AuthorizationPolicy) error {
	return k.Keeper.SetContractAdmin(ctx, contractAddress, caller, newAdmin, authZ)
}

func (k Keeper) SetAccessConfig(ctx sdk.Context, codeID uint64, caller sdk.AccAddress, newConfig types.AccessConfig, authz types.AuthorizationPolicy) error {
	return k.Keeper.SetAccessConfig(ctx, codeID, caller, newConfig, authz)
}

func (k Keeper) PinCode(ctx sdk.Context, codeID uint64) error {
	return k.Keeper.PinCode(ctx, codeID)
}

func (k Keeper) UnpinCode(ctx sdk.Context, codeID uint64) error {
	return k.Keeper.UnpinCode(ctx, codeID)
}

func (k Keeper) Create(ctx sdk.Context, creator sdk.AccAddress, wasmCode []byte, instantiateAccess *types.AccessConfig, authZ types.AuthorizationPolicy) (codeID uint64, checksum []byte, err error) {
	return k.Keeper.Create(ctx, creator, wasmCode, instantiateAccess, authZ)
}

func (k Keeper) SetContractInfoExtension(ctx sdk.Context, contract sdk.AccAddress, extra types.ContractInfoExtension) error {
	return k.Keeper.SetContractInfoExtension(ctx, contract, extra)
}

func (k Keeper) PropagateGovAuthorization() map[types.AuthorizationPolicyAction]struct{} {
	return k.Keeper.PropagateGovAuthorization()
}

func (k Keeper) ImportCode(ctx sdk.Context, codeID uint64, codeInfo types.CodeInfo, wasmCode []byte) error {
	return k.Keeper.ImportCode(ctx, codeID, codeInfo, wasmCode)
}

func (k Keeper) ImportContract(ctx sdk.Context, contractAddr sdk.AccAddress, c *types.ContractInfo, state []types.Model, entries []types.ContractCodeHistoryEntry) error {
	return k.Keeper.ImportContract(ctx, contractAddr, c, state, entries)
}

func (k Keeper) ImportAutoIncrementID(ctx sdk.Context, sequenceKey []byte, val uint64) error {
	return k.Keeper.ImportAutoIncrementID(ctx, sequenceKey, val)
}

// GetParams returns the total set of wasm parameters.
func (k Keeper) GetParams(ctx sdk.Context) types.Params {
	return k.Keeper.GetParams(ctx)
}

// SetParams sets all wasm parameters.
func (k Keeper) SetParams(ctx sdk.Context, ps types.Params) error {
	return k.Keeper.SetParams(ctx, ps)
}

// GetAuthority returns the x/wasm module's authority.
func (k Keeper) GetAuthority() string {
	return k.Keeper.GetAuthority()
}

// GetGasRegister returns the x/wasm module's gas register.
func (k Keeper) GetGasRegister() types.GasRegister {
	return k.Keeper.GetGasRegister()
}

// Sudo allows privileged access to a contract. This can never be called by an external tx, but only by
// another native Go module directly, or on-chain governance (if sudo proposals are enabled). Thus, the Keeper doesn't
// place any access controls on it, that is the responsibility or the app developer (who passes the wasm.Keeper in app.go)
//
// Sub-messages returned from the sudo call to the contract are executed with the default authorization policy. This can be
// customized though by passing a new policy with the context. See types.WithSubMsgAuthzPolicy.
// The policy will be read in msgServer.selectAuthorizationPolicy and used for sub-message executions.
// This is an extension point for some very advanced scenarios only. Use with care!
func (k Keeper) Sudo(ctx sdk.Context, contractAddress sdk.AccAddress, msg []byte) ([]byte, error) {
	return k.Keeper.Sudo(ctx, contractAddress, msg)
}

// IterateContractsByCreator iterates over all contracts with given creator address in order of creation time asc.
func (k Keeper) IterateContractsByCreator(ctx sdk.Context, creator sdk.AccAddress, cb func(address sdk.AccAddress) bool) {
	k.Keeper.IterateContractsByCreator(ctx, creator, cb)
}

// IterateContractsByCode iterates over all contracts with given codeID ASC on code update time.
func (k Keeper) IterateContractsByCode(ctx sdk.Context, codeID uint64, cb func(address sdk.AccAddress) bool) {
	k.Keeper.IterateContractsByCode(ctx, codeID, cb)
}

func (k Keeper) GetContractHistory(ctx sdk.Context, contractAddr sdk.AccAddress) []types.ContractCodeHistoryEntry {
	return k.Keeper.GetContractHistory(ctx, contractAddr)
}

// QuerySmart queries the smart contract itself.
func (k Keeper) QuerySmart(ctx sdk.Context, contractAddr sdk.AccAddress, req []byte) ([]byte, error) {
	return k.Keeper.QuerySmart(ctx, contractAddr, req)
}

// QueryRaw returns the contract's state for give key. Returns `nil` when key is `nil`.
func (k Keeper) QueryRaw(ctx sdk.Context, contractAddress sdk.AccAddress, key []byte) []byte {
	return k.Keeper.QueryRaw(ctx, contractAddress, key)
}

func (k Keeper) GetContractInfo(ctx sdk.Context, contractAddress sdk.AccAddress) *types.ContractInfo {
	return k.Keeper.GetContractInfo(ctx, contractAddress)
}

func (k Keeper) HasContractInfo(ctx sdk.Context, contractAddress sdk.AccAddress) bool {
	return k.Keeper.HasContractInfo(ctx, contractAddress)
}

func (k Keeper) IterateContractInfo(ctx sdk.Context, cb func(sdk.AccAddress, types.ContractInfo) bool) {
	k.Keeper.IterateContractInfo(ctx, cb)
}

// IterateContractState iterates through all elements of the key value store for the given contract address and passes
// them to the provided callback function. The callback method can return true to abort early.
func (k Keeper) IterateContractState(ctx sdk.Context, contractAddress sdk.AccAddress, cb func(key, value []byte) bool) {
	k.Keeper.IterateContractState(ctx, contractAddress, cb)
}

func (k Keeper) GetCodeInfo(ctx sdk.Context, codeID uint64) *types.CodeInfo {
	return k.Keeper.GetCodeInfo(ctx, codeID)
}

func (k Keeper) IterateCodeInfos(ctx sdk.Context, cb func(uint64, types.CodeInfo) bool) {
	k.Keeper.IterateCodeInfos(ctx, cb)
}

func (k Keeper) GetByteCode(ctx sdk.Context, codeID uint64) ([]byte, error) {
	return k.Keeper.GetByteCode(ctx, codeID)
}

// IsPinnedCode returns true when codeID is pinned in wasmvm cache
func (k Keeper) IsPinnedCode(ctx sdk.Context, codeID uint64) bool {
	return k.Keeper.IsPinnedCode(ctx, codeID)
}

// InitializePinnedCodes updates wasmvm to pin to cache all contracts marked as pinned
func (k Keeper) InitializePinnedCodes(ctx sdk.Context) error {
	return k.Keeper.InitializePinnedCodes(ctx)
}

// PeekAutoIncrementID reads the current value without incrementing it.
func (k Keeper) PeekAutoIncrementID(ctx sdk.Context, sequenceKey []byte) uint64 {
	return k.Keeper.PeekAutoIncrementID(ctx, sequenceKey)
}

// Logger returns a module-specific logger.
func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return k.Keeper.Logger(ctx)
}

func moduleLogger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

// QueryGasLimit returns the gas limit for smart queries.
func (k Keeper) QueryGasLimit() sdk.Gas {
	return k.Keeper.QueryGasLimit()
}

func (k Keeper) OnOpenChannel(ctx sdk.Context, contractAddr sdk.AccAddress, msg wasmvmtypes.IBCChannelOpenMsg) (string, error) {
	return k.Keeper.OnOpenChannel(ctx, contractAddr, msg)
}

func (k Keeper) OnConnectChannel(ctx sdk.Context, contractAddr sdk.AccAddress, msg wasmvmtypes.IBCChannelConnectMsg) error {
	return k.Keeper.OnConnectChannel(ctx, contractAddr, msg)
}

func (k Keeper) OnCloseChannel(ctx sdk.Context, contractAddr sdk.AccAddress, msg wasmvmtypes.IBCChannelCloseMsg) error {
	return k.Keeper.OnCloseChannel(ctx, contractAddr, msg)
}

func (k Keeper) OnRecvPacket(ctx sdk.Context, contractAddr sdk.AccAddress, msg wasmvmtypes.IBCPacketReceiveMsg) (ibcexported.Acknowledgement, error) {
	return k.Keeper.OnRecvPacket(ctx, contractAddr, msg)
}

func (k Keeper) OnAckPacket(ctx sdk.Context, contractAddr sdk.AccAddress, acknowledgement wasmvmtypes.IBCPacketAckMsg) error {
	return k.Keeper.OnAckPacket(ctx, contractAddr, acknowledgement)
}

func (k Keeper) OnTimeoutPacket(ctx sdk.Context, contractAddr sdk.AccAddress, msg wasmvmtypes.IBCPacketTimeoutMsg) error {
	return k.Keeper.OnTimeoutPacket(ctx, contractAddr, msg)
}

func (k Keeper) ClaimCapability(ctx sdk.Context, cap *capabilitytypes.Capability, name string) error {
	return k.Keeper.ClaimCapability(ctx, cap, name)
}

func (k Keeper) AuthenticateCapability(ctx sdk.Context, cap *capabilitytypes.Capability, name string) bool {
	return k.Keeper.AuthenticateCapability(ctx, cap, name)
}
