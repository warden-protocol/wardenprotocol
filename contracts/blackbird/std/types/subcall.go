package types

// TODO: look at using this strong type from wasmvm:subcall.go
// for now, it adda a bunch of custom json parsing and need to be careful.
type replyOn int

const (
	ReplyAlways  = "always"
	ReplySuccess = "success"
	ReplyError   = "error"
	ReplyNever   = "never"
)

// SubMsg wraps a CosmosMsg with some metadata for handling replies (ID) and optionally
// limiting the gas usage (GasLimit)
type SubMsg struct {
	ID       uint64    `json:"id"`
	Msg      CosmosMsg `json:"msg"`
	GasLimit *uint64   `json:"gas_limit,omitempty"`
	ReplyOn  string    `json:"reply_on"`
}

type Reply struct {
	ID     uint64        `json:"id"`
	Result SubcallResult `json:"result"`
}

// SubcallResult is the raw response we return from the sdk -> reply after executing a SubMsg.
// This is mirrors Rust's ContractResult<SubcallResponse>.
type SubcallResult struct {
	Ok  *SubcallResponse `json:"ok,omitempty"`
	Err string           `json:"error,omitempty"`
}

type SubcallResponse struct {
	Events []Event `json:"events,emptyslice"`
	Data   []byte  `json:"data,omitempty"`
}

type Event struct {
	Type       string           `json:"type"`
	Attributes []EventAttribute `json:"attributes,emptyslice"`
}

func NewSubMsg(msg ToMsg) SubMsg {
	return SubMsg{
		ID:      0,
		Msg:     msg.ToMsg(),
		ReplyOn: ReplyNever,
	}
}

func ReplyOnError(msg ToMsg, id uint64) SubMsg {
	return SubMsg{
		ID:      id,
		Msg:     msg.ToMsg(),
		ReplyOn: ReplyError,
	}
}

func ReplyOnSuccess(msg ToMsg, id uint64) SubMsg {
	return SubMsg{
		ID:      id,
		Msg:     msg.ToMsg(),
		ReplyOn: ReplySuccess,
	}
}

func AlwaysReply(msg ToMsg, id uint64) SubMsg {
	return SubMsg{
		ID:      id,
		Msg:     msg.ToMsg(),
		ReplyOn: ReplyAlways,
	}
}
