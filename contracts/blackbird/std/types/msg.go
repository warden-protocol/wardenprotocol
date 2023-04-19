package types

//------- Results / Msgs -------------

// ContractResult is the raw response from the instantiate/execute/migrate calls.
// This is mirrors Rust's ContractResult<Response>.
type ContractResult struct {
	Ok  *Response `json:"ok,omitempty"`
	Err string    `json:"error,omitempty"`
}

// Response defines the return value on a successful instantiate/execute/migrate.
// This is the counterpart of [Response](https://github.com/CosmWasm/cosmwasm/blob/v0.14.0-beta1/packages/std/src/results/response.rs#L73-L88)
type Response struct {
	// Messages comes directly from the contract and is its request for action.
	// If the ReplyOn value matches the result, the runtime will invoke this
	// contract's `reply` entry point after execution. Otherwise, this is all
	// "fire and forget".
	Messages []SubMsg `json:"messages,emptyslice"`
	// base64-encoded bytes to return as ABCI.Data field
	Data []byte `json:"data,omitempty"`
	// attributes for a log event to return over abci interface
	Attributes []EventAttribute `json:"attributes,emptyslice"`
	// custom events (separate from the main one that contains the attributes
	// above)
	Events []Event `json:"events,emptyslice"`
}

// EventAttribute
type EventAttribute struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

// CosmosMsg is an rust enum and only (exactly) one of the fields should be set
// Should we do a cleaner approach in Go? (type/data?)
type CosmosMsg struct {
	Bank         *BankMsg         `json:"bank,omitempty"`
	Custom       RawMessage       `json:"custom,omitempty"`
	Distribution *DistributionMsg `json:"distribution,omitempty"`
	Gov          *GovMsg          `json:"gov,omitempty"`
	IBC          *IBCMsg          `json:"ibc,omitempty"`
	Staking      *StakingMsg      `json:"staking,omitempty"`
	Stargate     *StargateMsg     `json:"stargate,omitempty"`
	Wasm         *WasmMsg         `json:"wasm,omitempty"`
}

// Return self to allow this also to be passed as args that expect a variant
func (m CosmosMsg) ToMsg() CosmosMsg {
	return m
}

// ToMsg can be implemented by any variant of CosmosMsg to easily be wrapped.
// We can then use this interface in various function arguments
type ToMsg interface {
	ToMsg() CosmosMsg
}

var (
	_ ToMsg = BankMsg{}
	_ ToMsg = SendMsg{}
	_ ToMsg = BurnMsg{}
)

type BankMsg struct {
	Send *SendMsg `json:"send,omitempty"`
	Burn *BurnMsg `json:"burn,omitempty"`
}

func (m BankMsg) ToMsg() CosmosMsg {
	return CosmosMsg{Bank: &m}
}

// SendMsg contains instructions for a Cosmos-SDK/SendMsg
// It has a fixed interface here and should be converted into the proper SDK format before dispatching
type SendMsg struct {
	ToAddress string `json:"to_address"`
	Amount    []Coin `json:"amount,emptyslice"`
}

func (m SendMsg) ToMsg() CosmosMsg {
	return CosmosMsg{Bank: &BankMsg{Send: &m}}
}

// BurnMsg will burn the given coins from the contract's account.
// There is no Cosmos SDK message that performs this, but it can be done by calling the bank keeper.
// Important if a contract controls significant token supply that must be retired.
type BurnMsg struct {
	Amount []Coin `json:"amount,emptyslice"`
}

func (m BurnMsg) ToMsg() CosmosMsg {
	return CosmosMsg{Bank: &BankMsg{Burn: &m}}
}

var (
	_ ToMsg = GovMsg{}
	_ ToMsg = VoteMsg{}
)

type GovMsg struct {
	// This maps directly to [MsgVote](https://github.com/cosmos/cosmos-sdk/blob/v0.42.5/proto/cosmos/gov/v1beta1/tx.proto#L46-L56) in the Cosmos SDK with voter set to the contract address.
	Vote *VoteMsg `json:"vote,omitempty"`
}

func (m GovMsg) ToMsg() CosmosMsg {
	return CosmosMsg{Gov: &m}
}

type VoteMsg struct {
	ProposalId uint64 `json:"proposal_id"`
	Vote       string `json:"vote"`
}

func (m VoteMsg) ToMsg() CosmosMsg {
	return CosmosMsg{Gov: &GovMsg{Vote: &m}}
}

const (
	VoteYes        = "yes"
	VoteNo         = "no"
	VoteAbstain    = "abstain"
	VoteNoWithVeto = "no_with_veto"
)

var (
	_ ToMsg = StakingMsg{}
	_ ToMsg = DelegateMsg{}
	_ ToMsg = UndelegateMsg{}
	_ ToMsg = RedelegateMsg{}
)

type StakingMsg struct {
	Delegate   *DelegateMsg   `json:"delegate,omitempty"`
	Undelegate *UndelegateMsg `json:"undelegate,omitempty"`
	Redelegate *RedelegateMsg `json:"redelegate,omitempty"`
}

func (m StakingMsg) ToMsg() CosmosMsg {
	return CosmosMsg{Staking: &m}
}

type DelegateMsg struct {
	Validator string `json:"validator"`
	Amount    Coin   `json:"amount"`
}

func (m DelegateMsg) ToMsg() CosmosMsg {
	return CosmosMsg{Staking: &StakingMsg{Delegate: &m}}
}

type UndelegateMsg struct {
	Validator string `json:"validator"`
	Amount    Coin   `json:"amount"`
}

func (m UndelegateMsg) ToMsg() CosmosMsg {
	return CosmosMsg{Staking: &StakingMsg{Undelegate: &m}}
}

type RedelegateMsg struct {
	SrcValidator string `json:"src_validator"`
	DstValidator string `json:"dst_validator"`
	Amount       Coin   `json:"amount"`
}

func (m RedelegateMsg) ToMsg() CosmosMsg {
	return CosmosMsg{Staking: &StakingMsg{Redelegate: &m}}
}

var (
	_ ToMsg = DistributionMsg{}
	_ ToMsg = SetWithdrawAddressMsg{}
	_ ToMsg = WithdrawDelegatorRewardMsg{}
)

type DistributionMsg struct {
	SetWithdrawAddress      *SetWithdrawAddressMsg      `json:"set_withdraw_address,omitempty"`
	WithdrawDelegatorReward *WithdrawDelegatorRewardMsg `json:"withdraw_delegator_reward,omitempty"`
}

func (m DistributionMsg) ToMsg() CosmosMsg {
	return CosmosMsg{Distribution: &m}
}

// SetWithdrawAddressMsg is translated to a [MsgSetWithdrawAddress](https://github.com/cosmos/cosmos-sdk/blob/v0.42.4/proto/cosmos/distribution/v1beta1/tx.proto#L29-L37).
// `delegator_address` is automatically filled with the current contract's address.
type SetWithdrawAddressMsg struct {
	// Address contains the `delegator_address` of a MsgSetWithdrawAddress
	Address string `json:"address"`
}

func (m SetWithdrawAddressMsg) ToMsg() CosmosMsg {
	return CosmosMsg{Distribution: &DistributionMsg{SetWithdrawAddress: &m}}
}

// WithdrawDelegatorRewardMsg is translated to a [MsgWithdrawDelegatorReward](https://github.com/cosmos/cosmos-sdk/blob/v0.42.4/proto/cosmos/distribution/v1beta1/tx.proto#L42-L50).
// `delegator_address` is automatically filled with the current contract's address.
type WithdrawDelegatorRewardMsg struct {
	// Validator contains `validator_address` of a MsgWithdrawDelegatorReward
	Validator string `json:"validator"`
}

func (m WithdrawDelegatorRewardMsg) ToMsg() CosmosMsg {
	return CosmosMsg{Distribution: &DistributionMsg{WithdrawDelegatorReward: &m}}
}

var (
	_ ToMsg = StargateMsg{}
	_ ToMsg = WasmMsg{}
	_ ToMsg = ExecuteMsg{}
	_ ToMsg = InstantiateMsg{}
	_ ToMsg = MigrateMsg{}
	_ ToMsg = UpdateAdminMsg{}
	_ ToMsg = ClearAdminMsg{}
)

// StargateMsg is encoded the same way as a protobof [Any](https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/any.proto).
// This is the same structure as messages in `TxBody` from [ADR-020](https://github.com/cosmos/cosmos-sdk/blob/master/docs/architecture/adr-020-protobuf-transaction-encoding.md)
type StargateMsg struct {
	TypeURL string `json:"type_url"`
	Value   []byte `json:"value"`
}

func (m StargateMsg) ToMsg() CosmosMsg {
	return CosmosMsg{Stargate: &m}
}

type WasmMsg struct {
	Execute     *ExecuteMsg     `json:"execute,omitempty"`
	Instantiate *InstantiateMsg `json:"instantiate,omitempty"`
	Migrate     *MigrateMsg     `json:"migrate,omitempty"`
	UpdateAdmin *UpdateAdminMsg `json:"update_admin,omitempty"`
	ClearAdmin  *ClearAdminMsg  `json:"clear_admin,omitempty"`
}

func (m WasmMsg) ToMsg() CosmosMsg {
	return CosmosMsg{Wasm: &m}
}

// ExecuteMsg is used to call another defined contract on this chain.
// The calling contract requires the callee to be defined beforehand,
// and the address should have been defined in initialization.
// And we assume the developer tested the ABIs and coded them together.
//
// Since a contract is immutable once it is deployed, we don't need to transform this.
// If it was properly coded and worked once, it will continue to work throughout upgrades.
type ExecuteMsg struct {
	// ContractAddr is the sdk.AccAddress of the contract, which uniquely defines
	// the contract ID and instance ID. The sdk module should maintain a reverse lookup table.
	ContractAddr string `json:"contract_addr"`
	// Msg is assumed to be a json-encoded message, which will be passed directly
	// as `userMsg` when calling `Handle` on the above-defined contract
	Msg []byte `json:"msg,omitempty"`
	// Send is an optional amount of coins this contract sends to the called contract
	Funds []Coin `json:"funds,emptyslice"`
}

func (m ExecuteMsg) ToMsg() CosmosMsg {
	return CosmosMsg{Wasm: &WasmMsg{Execute: &m}}
}

// InstantiateMsg will create a new contract instance from a previously uploaded CodeID.
// This allows one contract to spawn "sub-contracts".
type InstantiateMsg struct {
	// CodeID is the reference to the wasm byte code as used by the Cosmos-SDK
	CodeID uint64 `json:"code_id"`
	// Msg is assumed to be a json-encoded message, which will be passed directly
	// as `userMsg` when calling `Init` on a new contract with the above-defined CodeID
	Msg []byte `json:"msg,omitempty"`
	// Send is an optional amount of coins this contract sends to the called contract
	Funds []Coin `json:"funds,emptyslice"`
	// Label is optional metadata to be stored with a contract instance.
	Label string `json:"label"`
	// Admin (optional) may be set here to allow future migrations from this address
	Admin string `json:"admin,omitempty"`
}

func (m InstantiateMsg) ToMsg() CosmosMsg {
	return CosmosMsg{Wasm: &WasmMsg{Instantiate: &m}}
}

// MigrateMsg will migrate an existing contract from it's current wasm code (logic)
// to another previously uploaded wasm code. It requires the calling contract to be
// listed as "admin" of the contract to be migrated.
type MigrateMsg struct {
	// ContractAddr is the sdk.AccAddress of the target contract, to migrate.
	ContractAddr string `json:"contract_addr"`
	// NewCodeID is the reference to the wasm byte code for the new logic to migrate to
	NewCodeID uint64 `json:"new_code_id"`
	// Msg is assumed to be a json-encoded message, which will be passed directly
	// as `userMsg` when calling `Migrate` on the above-defined contract
	Msg []byte `json:"msg,omitempty"`
}

func (m MigrateMsg) ToMsg() CosmosMsg {
	return CosmosMsg{Wasm: &WasmMsg{Migrate: &m}}
}

// UpdateAdminMsg is the Go counterpart of WasmMsg::UpdateAdmin
// (https://github.com/CosmWasm/cosmwasm/blob/v0.14.0-beta5/packages/std/src/results/cosmos_msg.rs#L158-L160).
type UpdateAdminMsg struct {
	// ContractAddr is the sdk.AccAddress of the target contract.
	ContractAddr string `json:"contract_addr"`
	// Admin is the sdk.AccAddress of the new admin.
	Admin string `json:"admin"`
}

func (m UpdateAdminMsg) ToMsg() CosmosMsg {
	return CosmosMsg{Wasm: &WasmMsg{UpdateAdmin: &m}}
}

// ClearAdminMsg is the Go counterpart of WasmMsg::ClearAdmin
// (https://github.com/CosmWasm/cosmwasm/blob/v0.14.0-beta5/packages/std/src/results/cosmos_msg.rs#L158-L160).
type ClearAdminMsg struct {
	// ContractAddr is the sdk.AccAddress of the target contract.
	ContractAddr string `json:"contract_addr"`
}

func (m ClearAdminMsg) ToMsg() CosmosMsg {
	return CosmosMsg{Wasm: &WasmMsg{ClearAdmin: &m}}
}
