package types

/*** taken from wasmvm:types/msg.go (so this compiles with easyjson) ***/

var (
	_ ToMsg = IBCMsg{}
	_ ToMsg = TransferMsg{}
	_ ToMsg = SendPacketMsg{}
	_ ToMsg = CloseChannelMsg{}
)

type IBCMsg struct {
	Transfer     *TransferMsg     `json:"transfer,omitempty"`
	SendPacket   *SendPacketMsg   `json:"send_packet,omitempty"`
	CloseChannel *CloseChannelMsg `json:"close_channel,omitempty"`
}

func (m IBCMsg) ToMsg() CosmosMsg {
	return CosmosMsg{IBC: &m}
}

type TransferMsg struct {
	ChannelID string     `json:"channel_id"`
	ToAddress string     `json:"to_address"`
	Amount    Coin       `json:"amount"`
	Timeout   IBCTimeout `json:"timeout"`
}

func (m TransferMsg) ToMsg() CosmosMsg {
	return CosmosMsg{IBC: &IBCMsg{Transfer: &m}}
}

type SendPacketMsg struct {
	ChannelID string     `json:"channel_id"`
	Data      []byte     `json:"data"`
	Timeout   IBCTimeout `json:"timeout"`
}

func (m SendPacketMsg) ToMsg() CosmosMsg {
	return CosmosMsg{IBC: &IBCMsg{SendPacket: &m}}
}

type CloseChannelMsg struct {
	ChannelID string `json:"channel_id"`
}

func (m CloseChannelMsg) ToMsg() CosmosMsg {
	return CosmosMsg{IBC: &IBCMsg{CloseChannel: &m}}
}

/*** taken from wasmvm:types/queries.go (so this compiles with easyjson) ***/

var (
	_ ToQuery = IBCQuery{}
	_ ToQuery = PortIDQuery{}
	_ ToQuery = ListChannelsQuery{}
	_ ToQuery = ChannelQuery{}
)

// IBCQuery defines a query request from the contract into the chain.
// This is the counterpart of [IbcQuery](https://github.com/CosmWasm/cosmwasm/blob/v0.14.0-beta1/packages/std/src/ibc.rs#L61-L83).
type IBCQuery struct {
	PortID       *PortIDQuery       `json:"port_id,omitempty"`
	ListChannels *ListChannelsQuery `json:"list_channels,omitempty"`
	Channel      *ChannelQuery      `json:"channel,omitempty"`
}

func (m IBCQuery) ToQuery() QueryRequest {
	return QueryRequest{IBC: &m}
}

type PortIDQuery struct{}

func (m PortIDQuery) ToQuery() QueryRequest {
	return QueryRequest{IBC: &IBCQuery{PortID: &m}}
}

type PortIDResponse struct {
	PortID string `json:"port_id"`
}

// ListChannelsQuery is an IBCQuery that lists all channels that are bound to a given port.
// If `PortID` is unset, this list all channels bound to the contract's port.
// Returns a `ListChannelsResponse`.
// This is the counterpart of [IbcQuery::ListChannels](https://github.com/CosmWasm/cosmwasm/blob/v0.14.0-beta1/packages/std/src/ibc.rs#L70-L73).
type ListChannelsQuery struct {
	// optional argument
	PortID string `json:"port_id,omitempty"`
}

func (m ListChannelsQuery) ToQuery() QueryRequest {
	return QueryRequest{IBC: &IBCQuery{ListChannels: &m}}
}

type ListChannelsResponse struct {
	Channels []IBCChannel `json:"channels,emptyslice"`
}

type ChannelQuery struct {
	// optional argument
	PortID    string `json:"port_id,omitempty"`
	ChannelID string `json:"channel_id"`
}

func (m ChannelQuery) ToQuery() QueryRequest {
	return QueryRequest{IBC: &IBCQuery{Channel: &m}}
}

type ChannelResponse struct {
	// may be empty if there is no matching channel
	Channel *IBCChannel `json:"channel,omitempty"`
}

/**** Below from wasmvm:types/ibc.go *****/

type IBCEndpoint struct {
	PortID    string `json:"port_id"`
	ChannelID string `json:"channel_id"`
}

type IBCChannel struct {
	Endpoint             IBCEndpoint `json:"endpoint"`
	CounterpartyEndpoint IBCEndpoint `json:"counterparty_endpoint"`
	Order                IBCOrder    `json:"order"`
	Version              string      `json:"version"`
	ConnectionID         string      `json:"connection_id"`
}

type IBCChannelOpenMsg struct {
	OpenInit *IBCOpenInit `json:"open_init,omitempty"`
	OpenTry  *IBCOpenTry  `json:"open_try,omitempty"`
}

// GetChannel returns the IBCChannel in this message.
func (msg IBCChannelOpenMsg) GetChannel() IBCChannel {
	if msg.OpenInit != nil {
		return msg.OpenInit.Channel
	}
	return msg.OpenTry.Channel
}

// GetCounterVersion checks if the message has a counterparty version and
// returns it if so.
func (msg IBCChannelOpenMsg) GetCounterVersion() (ver string, ok bool) {
	if msg.OpenTry != nil {
		return msg.OpenTry.CounterpartyVersion, true
	}
	return "", false
}

type IBCOpenInit struct {
	Channel IBCChannel `json:"channel"`
}

func (m *IBCOpenInit) ToMsg() IBCChannelOpenMsg {
	return IBCChannelOpenMsg{
		OpenInit: m,
	}
}

type IBCOpenTry struct {
	Channel             IBCChannel `json:"channel"`
	CounterpartyVersion string     `json:"counterparty_version"`
}

func (m *IBCOpenTry) ToMsg() IBCChannelOpenMsg {
	return IBCChannelOpenMsg{
		OpenTry: m,
	}
}

type IBCChannelConnectMsg struct {
	OpenAck     *IBCOpenAck     `json:"open_ack,omitempty"`
	OpenConfirm *IBCOpenConfirm `json:"open_confirm,omitempty"`
}

// GetChannel returns the IBCChannel in this message.
func (msg IBCChannelConnectMsg) GetChannel() IBCChannel {
	if msg.OpenAck != nil {
		return msg.OpenAck.Channel
	}
	return msg.OpenConfirm.Channel
}

// GetCounterVersion checks if the message has a counterparty version and
// returns it if so.
func (msg IBCChannelConnectMsg) GetCounterVersion() (ver string, ok bool) {
	if msg.OpenAck != nil {
		return msg.OpenAck.CounterpartyVersion, true
	}
	return "", false
}

type IBCOpenAck struct {
	Channel             IBCChannel `json:"channel"`
	CounterpartyVersion string     `json:"counterparty_version"`
}

func (m *IBCOpenAck) ToMsg() IBCChannelConnectMsg {
	return IBCChannelConnectMsg{
		OpenAck: m,
	}
}

type IBCOpenConfirm struct {
	Channel IBCChannel `json:"channel"`
}

func (m *IBCOpenConfirm) ToMsg() IBCChannelConnectMsg {
	return IBCChannelConnectMsg{
		OpenConfirm: m,
	}
}

type IBCChannelCloseMsg struct {
	CloseInit    *IBCCloseInit    `json:"close_init,omitempty"`
	CloseConfirm *IBCCloseConfirm `json:"close_confirm,omitempty"`
}

// GetChannel returns the IBCChannel in this message.
func (msg IBCChannelCloseMsg) GetChannel() IBCChannel {
	if msg.CloseInit != nil {
		return msg.CloseInit.Channel
	}
	return msg.CloseConfirm.Channel
}

type IBCCloseInit struct {
	Channel IBCChannel `json:"channel"`
}

func (m *IBCCloseInit) ToMsg() IBCChannelCloseMsg {
	return IBCChannelCloseMsg{
		CloseInit: m,
	}
}

type IBCCloseConfirm struct {
	Channel IBCChannel `json:"channel"`
}

func (m *IBCCloseConfirm) ToMsg() IBCChannelCloseMsg {
	return IBCChannelCloseMsg{
		CloseConfirm: m,
	}
}

type IBCPacketReceiveMsg struct {
	Packet IBCPacket `json:"packet"`
}

type IBCPacketAckMsg struct {
	Acknowledgement IBCAcknowledgement `json:"acknowledgement"`
	OriginalPacket  IBCPacket          `json:"original_packet"`
}

type IBCPacketTimeoutMsg struct {
	Packet IBCPacket `json:"packet"`
}

// TODO: test what the sdk Order.String() represents and how to parse back
// Proto files: https://github.com/cosmos/cosmos-sdk/blob/v0.40.0/proto/ibc/core/channel/v1/channel.proto#L69-L80
// Auto-gen code: https://github.com/cosmos/cosmos-sdk/blob/v0.40.0/x/ibc/core/04-channel/types/channel.pb.go#L70-L101
type IBCOrder = string

// These are the only two valid values for IbcOrder
const Unordered = "ORDER_UNORDERED"
const Ordered = "ORDER_ORDERED"

// IBCTimeoutBlock Height is a monotonically increasing data type
// that can be compared against another Height for the purposes of updating and
// freezing clients.
// Ordering is (revision_number, timeout_height)
type IBCTimeoutBlock struct {
	// the version that the client is currently on
	// (eg. after reseting the chain this could increment 1 as height drops to 0)
	Revision uint64 `json:"revision"`
	// block height after which the packet times out.
	// the height within the given revision
	Height uint64 `json:"height"`
}

func (t IBCTimeoutBlock) IsZero() bool {
	return t.Revision == 0 && t.Height == 0
}

// IBCTimeout is the timeout for an IBC packet. At least one of block and timestamp is required.
type IBCTimeout struct {
	Block *IBCTimeoutBlock `json:"block"`
	// Nanoseconds since UNIX epoch
	Timestamp uint64 `json:"timestamp,string,omitempty"`
}

type IBCAcknowledgement struct {
	Data []byte `json:"data"`
}

type IBCPacket struct {
	Data     []byte      `json:"data"`
	Src      IBCEndpoint `json:"src"`
	Dest     IBCEndpoint `json:"dest"`
	Sequence uint64      `json:"sequence"`
	Timeout  IBCTimeout  `json:"timeout"`
}

// IBCChannelOpenResult is the raw response from the ibc_channel_open call.
// This is mirrors Rust's ContractResult<()>.
// We just check if Err == "" to see if this is success (no other data on success)
type IBCChannelOpenResult struct {
	Ok  *struct{} `json:"ok,omitempty"`
	Err string    `json:"error,omitempty"`
}

// This is the return value for the majority of the ibc handlers.
// That are able to dispatch messages / events on their own,
// but have no meaningful return value to the calling code.
//
// Callbacks that have return values (like ibc_receive_packet)
// or that cannot redispatch messages (like ibc_channel_open)
// will use other Response types
type IBCBasicResult struct {
	Ok  *IBCBasicResponse `json:"ok,omitempty"`
	Err string            `json:"error,omitempty"`
}

// IBCBasicResponse defines the return value on a successful processing.
// This is the counterpart of [IbcBasicResponse](https://github.com/CosmWasm/cosmwasm/blob/v0.14.0-beta1/packages/std/src/ibc.rs#L194-L216).
type IBCBasicResponse struct {
	// Messages comes directly from the contract and is its request for action.
	// If the ReplyOn value matches the result, the runtime will invoke this
	// contract's `reply` entry point after execution. Otherwise, this is all
	// "fire and forget".
	Messages []SubMsg `json:"messages"`
	// attributes for a log event to return over abci interface
	Attributes []EventAttribute `json:"attributes"`
	// custom events (separate from the main one that contains the attributes
	// above)
	Events []Event `json:"events"`
}

// This is the return value for the majority of the ibc handlers.
// That are able to dispatch messages / events on their own,
// but have no meaningful return value to the calling code.
//
// Callbacks that have return values (like receive_packet)
// or that cannot redispatch messages (like the handshake callbacks)
// will use other Response types
type IBCReceiveResult struct {
	Ok  *IBCReceiveResponse `json:"ok,omitempty"`
	Err string              `json:"error,omitempty"`
}

// IBCReceiveResponse defines the return value on packet response processing.
// This "success" case should be returned even in application-level errors,
// Where the Acknowledgement bytes contain an encoded error message to be returned to
// the calling chain. (Returning IBCReceiveResult::Err will abort processing of this packet
// and not inform the calling chain).
// This is the counterpart of (IbcReceiveResponse)(https://github.com/CosmWasm/cosmwasm/blob/v0.15.0/packages/std/src/ibc.rs#L247-L267).
type IBCReceiveResponse struct {
	// binary encoded data to be returned to calling chain as the acknowledgement
	Acknowledgement []byte `json:"acknowledgement"`
	// Messages comes directly from the contract and is it's request for action.
	// If the ReplyOn value matches the result, the runtime will invoke this
	// contract's `reply` entry point after execution. Otherwise, this is all
	// "fire and forget".
	Messages   []SubMsg         `json:"messages"`
	Attributes []EventAttribute `json:"attributes"`
	// custom events (separate from the main one that contains the attributes
	// above)
	Events []Event `json:"events"`
}
