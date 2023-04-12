//go:build cosmwasm
// +build cosmwasm

package std

import (
	"unsafe"

	"github.com/CosmWasm/cosmwasm-go/std/types"
)

type (
	// InstantiateFunc defines the function ran by contracts in instantiation.
	InstantiateFunc func(deps *Deps, env types.Env, messageInfo types.MessageInfo, messageBytes []byte) (*types.Response, error)
	// ExecuteFunc defines the function ran by contracts in message execution.
	ExecuteFunc func(deps *Deps, env types.Env, messageInfo types.MessageInfo, messageBytes []byte) (*types.Response, error)
	// MigrateFunc defines the function ran by contracts in migration.
	MigrateFunc func(deps *Deps, env types.Env, messageBytes []byte) (*types.Response, error)
	// SudoFunc defines the function ran by contracts in sudo message execution.
	SudoFunc func(deps *Deps, env types.Env, messageBytes []byte) (*types.Response, error)
	// ReplyFunc defines the function ran by contracts in reply message execution.
	ReplyFunc func(deps *Deps, env types.Env, replyMsg types.Reply) (*types.Response, error)
	// QueryFunc defines the function ran by the contracts in query execution.
	QueryFunc func(deps *Deps, env types.Env, messageBytes []byte) ([]byte, error)
	// IBCChannelOpenFunc defines the function ran by the contracts in IBC channel open.
	IBCChannelOpenFunc func(deps *Deps, env types.Env, messageOpen types.IBCChannelOpenMsg) error
	// IBCChannelConnectFunc defines the function ran by the contracts in IBC channel connect.
	IBCChannelConnectFunc func(deps *Deps, env types.Env, messageConnect types.IBCChannelConnectMsg) (*types.IBCBasicResponse, error)
	// IBCChannelCloseFunc defines the function ran by the contracts in IBC channel close.
	IBCChannelCloseFunc func(deps *Deps, env types.Env, messageClose types.IBCChannelCloseMsg) (*types.IBCBasicResponse, error)
	// IBCPacketReceiveFunc defines the function ran by the contracts in IBC packet receive.
	IBCPacketReceiveFunc func(deps *Deps, env types.Env, messageReceive types.IBCPacketReceiveMsg) (*types.IBCReceiveResponse, error)
	// IBCPacketAckFunc defines the function ran by the contracts in IBC packet ack.
	IBCPacketAckFunc func(deps *Deps, env types.Env, messageAck types.IBCPacketAckMsg) (*types.IBCBasicResponse, error)
	// IBCPacketTimeoutFunc defines the function ran by the contracts in IBC packet timeout.
	IBCPacketTimeoutFunc func(deps *Deps, env types.Env, messageAck types.IBCPacketTimeoutMsg) (*types.IBCBasicResponse, error)
)

func StdErrResult(err error) unsafe.Pointer {
	wrapped := types.ContractResult{Err: err.Error()}
	bz, _ := wrapped.MarshalJSON()

	return Package_message(bz)
}

func IBCErrResult(err error) unsafe.Pointer {
	wrapped := types.IBCBasicResult{Err: err.Error()}
	bz, _ := wrapped.MarshalJSON()

	return Package_message(bz)
}

func make_dependencies() Deps {
	return Deps{
		Storage: ExternalStorage{},
		Api:     ExternalApi{},
		Querier: ExternalQuerier{},
	}
}

func parseInfo(infoPtr uint32) (types.MessageInfo, error) {
	infoData := TranslateToSlice(uintptr(infoPtr))
	var info types.MessageInfo
	err := info.UnmarshalJSON(infoData)

	return info, err
}

func parseReply(replyPtr uint32) (types.Reply, error) {
	replyData := TranslateToSlice(uintptr(replyPtr))
	var reply types.Reply
	err := reply.UnmarshalJSON(replyData)

	return reply, err
}

func parseIBCChannelOpen(openPtr uint32) (types.IBCChannelOpenMsg, error) {
	openData := TranslateToSlice(uintptr(openPtr))
	var openMsg types.IBCChannelOpenMsg
	err := openMsg.UnmarshalJSON(openData)

	return openMsg, err
}

func parseIBCChannelConnect(connectPtr uint32) (types.IBCChannelConnectMsg, error) {
	connectData := TranslateToSlice(uintptr(connectPtr))
	var connectMsg types.IBCChannelConnectMsg
	err := connectMsg.UnmarshalJSON(connectData)

	return connectMsg, err
}

func parseIBCChannelClose(connectPtr uint32) (types.IBCChannelCloseMsg, error) {
	closeData := TranslateToSlice(uintptr(connectPtr))
	var closeMsg types.IBCChannelCloseMsg
	err := closeMsg.UnmarshalJSON(closeData)

	return closeMsg, err
}

func parseIBCPacketReceive(receivePtr uint32) (types.IBCPacketReceiveMsg, error) {
	receiveData := TranslateToSlice(uintptr(receivePtr))
	var receiveMsg types.IBCPacketReceiveMsg
	err := receiveMsg.UnmarshalJSON(receiveData)

	return receiveMsg, err
}

func parseIBCPacketAck(ackPtr uint32) (types.IBCPacketAckMsg, error) {
	ackData := TranslateToSlice(uintptr(ackPtr))
	var ackMsg types.IBCPacketAckMsg
	err := ackMsg.UnmarshalJSON(ackData)

	return ackMsg, err
}

func parseIBCPacketTimeout(timeoutPtr uint32) (types.IBCPacketTimeoutMsg, error) {
	timeoutData := TranslateToSlice(uintptr(timeoutPtr))
	var timeoutMsg types.IBCPacketTimeoutMsg
	err := timeoutMsg.UnmarshalJSON(timeoutData)

	return timeoutMsg, err
}

// DoInstantiate converts the environment, info and message pointers to concrete golang objects
// and executes the contract's instantiation function, returning a reference of the result.
func DoInstantiate(instantiateFunc InstantiateFunc, envPtr, infoPtr, msgPtr uint32) unsafe.Pointer {
	env := types.Env{}
	envData := TranslateToSlice(uintptr(envPtr))
	err := env.UnmarshalJSON(envData)
	if err != nil {
		return StdErrResult(err)
	}

	info, err := parseInfo(infoPtr)
	if err != nil {
		return StdErrResult(err)
	}

	deps := make_dependencies()
	msgData := Translate_range_custom(uintptr(msgPtr))
	resp, err := instantiateFunc(&deps, env, info, msgData)
	if err != nil {
		return StdErrResult(err)
	}
	// TODO: should we raise an error on (resp == nil)? result.MarshalJSON() will not panic, but that behaviour seems invalid

	result := &types.ContractResult{
		Ok: resp,
	}
	data, err := result.MarshalJSON()
	if err != nil {
		return StdErrResult(err)
	}

	return Package_message(data)
}

// DoExecute converts the environment, info and message pointers to concrete golang objects
// and executes the contract's message execution logic.
func DoExecute(executeFunc ExecuteFunc, envPtr, infoPtr, msgPtr uint32) unsafe.Pointer {
	env := types.Env{}
	envData := TranslateToSlice(uintptr(envPtr))
	err := env.UnmarshalJSON(envData)
	if err != nil {
		return StdErrResult(err)
	}

	info, err := parseInfo(infoPtr)
	if err != nil {
		return StdErrResult(err)
	}

	deps := make_dependencies()
	msgData := Translate_range_custom(uintptr(msgPtr))
	resp, err := executeFunc(&deps, env, info, msgData)
	if err != nil {
		return StdErrResult(err)
	}

	result := &types.ContractResult{Ok: resp}

	data, err := result.MarshalJSON()
	if err != nil {
		return StdErrResult(err)
	}

	return Package_message(data)
}

// DoMigrate converts the environment and message pointers to concrete golang objects
// and execute the contract migration logic.
func DoMigrate(migrateFunc MigrateFunc, envPtr, msgPtr uint32) unsafe.Pointer {
	env := types.Env{}
	envData := TranslateToSlice(uintptr(envPtr))
	err := env.UnmarshalJSON(envData)
	if err != nil {
		return StdErrResult(err)
	}

	deps := make_dependencies()
	msgData := Translate_range_custom(uintptr(msgPtr))
	resp, err := migrateFunc(&deps, env, msgData)
	if err != nil {
		return StdErrResult(err)
	}

	result := &types.ContractResult{
		Ok: resp,
	}
	data, err := result.MarshalJSON()
	if err != nil {
		return StdErrResult(err)
	}

	return Package_message(data)
}

// DoSudo converts the environment and message pointers to concrete golang objects
// and executes the contract's sudo message execution logic.
func DoSudo(sudoFunc SudoFunc, envPtr, msgPtr uint32) unsafe.Pointer {
	env := types.Env{}
	envData := TranslateToSlice(uintptr(envPtr))
	err := env.UnmarshalJSON(envData)
	if err != nil {
		return StdErrResult(err)
	}

	deps := make_dependencies()
	msgData := Translate_range_custom(uintptr(msgPtr))
	resp, err := sudoFunc(&deps, env, msgData)
	if err != nil {
		return StdErrResult(err)
	}

	result := &types.ContractResult{
		Ok: resp,
	}
	data, err := result.MarshalJSON()
	if err != nil {
		return StdErrResult(err)
	}

	return Package_message(data)
}

// DoReply converts the environment and reply message pointers to concrete golang objects
// and executes the contract's reply message execution logic.
func DoReply(replyFunc ReplyFunc, envPtr, replyPtr uint32) unsafe.Pointer {
	env := types.Env{}
	envData := TranslateToSlice(uintptr(envPtr))
	err := env.UnmarshalJSON(envData)
	if err != nil {
		return StdErrResult(err)
	}

	reply, err := parseReply(replyPtr)
	if err != nil {
		return StdErrResult(err)
	}

	deps := make_dependencies()
	resp, err := replyFunc(&deps, env, reply)
	if err != nil {
		return StdErrResult(err)
	}

	result := &types.ContractResult{
		Ok: resp,
	}
	data, err := result.MarshalJSON()
	if err != nil {
		return StdErrResult(err)
	}

	return Package_message(data)
}

// DoQuery converts the environment and info pointers to concrete golang objects
// and executes the contract's query logic.
func DoQuery(queryFunc QueryFunc, envPtr, msgPtr uint32) unsafe.Pointer {
	msgData := Translate_range_custom(uintptr(msgPtr))
	env := types.Env{}
	envData := TranslateToSlice(uintptr(envPtr))
	err := env.UnmarshalJSON(envData)
	if err != nil {
		return StdErrResult(err)
	}

	deps := make_dependencies()
	respBytes, err := queryFunc(&deps, env, msgData)
	if err != nil {
		return StdErrResult(err)
	}

	result := &types.QueryResponse{
		Ok: respBytes,
	}
	data, err := result.MarshalJSON()
	if err != nil {
		return StdErrResult(err)
	}

	return Package_message(data)
}

// DoIBCChannelOpen converts the environment and IBC channel open message pointers to concrete golang objects
// and executes the contract's IBC channel open logic.
// Function uses types.IBCBasicResult to return an error instead of a proper types.IBCChannelOpenResult since
// both of them are equal in terms of JSON serialization.
// Successful result is empty as it is not used by the VM.
func DoIBCChannelOpen(ibcFunc IBCChannelOpenFunc, envPtr, msgPtr uint32) unsafe.Pointer {
	env := types.Env{}
	envData := TranslateToSlice(uintptr(envPtr))
	err := env.UnmarshalJSON(envData)
	if err != nil {
		return IBCErrResult(err)
	}

	openMsg, err := parseIBCChannelOpen(msgPtr)
	if err != nil {
		return IBCErrResult(err)
	}

	deps := make_dependencies()
	if err := ibcFunc(&deps, env, openMsg); err != nil {
		return IBCErrResult(err)
	}

	result := &types.IBCChannelOpenResult{
		Ok: &struct{}{},
	}
	data, err := result.MarshalJSON()
	if err != nil {
		return IBCErrResult(err)
	}

	return Package_message(data)
}

// DoIBCChannelConnect converts the environment and IBC channel connect message pointers to concrete golang objects
// and executes the contract's IBC channel connect logic.
func DoIBCChannelConnect(ibcFunc IBCChannelConnectFunc, envPtr, msgPtr uint32) unsafe.Pointer {
	env := types.Env{}
	envData := TranslateToSlice(uintptr(envPtr))
	err := env.UnmarshalJSON(envData)
	if err != nil {
		return IBCErrResult(err)
	}

	connectMsg, err := parseIBCChannelConnect(msgPtr)
	if err != nil {
		return IBCErrResult(err)
	}

	deps := make_dependencies()
	respBytes, err := ibcFunc(&deps, env, connectMsg)
	if err != nil {
		return IBCErrResult(err)
	}

	result := &types.IBCBasicResult{
		Ok: respBytes,
	}
	data, err := result.MarshalJSON()
	if err != nil {
		return IBCErrResult(err)
	}

	return Package_message(data)
}

// DoIBCChannelClose converts the environment and IBC channel close message pointers to concrete golang objects
// and executes the contract's IBC channel close logic.
func DoIBCChannelClose(ibcFunc IBCChannelCloseFunc, envPtr, msgPtr uint32) unsafe.Pointer {
	env := types.Env{}
	envData := TranslateToSlice(uintptr(envPtr))
	err := env.UnmarshalJSON(envData)
	if err != nil {
		return IBCErrResult(err)
	}

	closeMsg, err := parseIBCChannelClose(msgPtr)
	if err != nil {
		return IBCErrResult(err)
	}

	deps := make_dependencies()
	respBytes, err := ibcFunc(&deps, env, closeMsg)
	if err != nil {
		return IBCErrResult(err)
	}

	result := &types.IBCBasicResult{
		Ok: respBytes,
	}
	data, err := result.MarshalJSON()
	if err != nil {
		return IBCErrResult(err)
	}

	return Package_message(data)
}

// DoIBCPacketReceive converts the environment and IBC receive message pointers to concrete golang objects
// and executes the contract's IBC packet receive logic.
// Function uses types.IBCBasicResult to return an error instead of a proper types.IBCReceiveResult since
// both of them are equal in terms of JSON serialization.
func DoIBCPacketReceive(ibcFunc IBCPacketReceiveFunc, envPtr, msgPtr uint32) unsafe.Pointer {
	env := types.Env{}
	envData := TranslateToSlice(uintptr(envPtr))
	err := env.UnmarshalJSON(envData)
	if err != nil {
		return IBCErrResult(err)
	}

	receiveMsg, err := parseIBCPacketReceive(msgPtr)
	if err != nil {
		return IBCErrResult(err)
	}

	deps := make_dependencies()
	respBytes, err := ibcFunc(&deps, env, receiveMsg)
	if err != nil {
		return IBCErrResult(err)
	}

	result := &types.IBCReceiveResult{
		Ok: respBytes,
	}
	data, err := result.MarshalJSON()
	if err != nil {
		return IBCErrResult(err)
	}

	return Package_message(data)
}

// DoIBCPacketAck converts the environment and IBC packet ack message pointers to concrete golang objects
// and executes the contract's IBC packet ack logic.
func DoIBCPacketAck(ibcFunc IBCPacketAckFunc, envPtr, msgPtr uint32) unsafe.Pointer {
	env := types.Env{}
	envData := TranslateToSlice(uintptr(envPtr))
	err := env.UnmarshalJSON(envData)
	if err != nil {
		return IBCErrResult(err)
	}

	receiveMsg, err := parseIBCPacketAck(msgPtr)
	if err != nil {
		return IBCErrResult(err)
	}

	deps := make_dependencies()
	respBytes, err := ibcFunc(&deps, env, receiveMsg)
	if err != nil {
		return IBCErrResult(err)
	}

	result := &types.IBCBasicResult{
		Ok: respBytes,
	}
	data, err := result.MarshalJSON()
	if err != nil {
		return IBCErrResult(err)
	}

	return Package_message(data)
}

// DoIBCPacketTimeout converts the environment and IBC packet timeout message pointers to concrete golang objects
// and executes the contract's IBC packet timeout logic.
func DoIBCPacketTimeout(ibcFunc IBCPacketTimeoutFunc, envPtr, msgPtr uint32) unsafe.Pointer {
	env := types.Env{}
	envData := TranslateToSlice(uintptr(envPtr))
	err := env.UnmarshalJSON(envData)
	if err != nil {
		return IBCErrResult(err)
	}

	timeoutMsg, err := parseIBCPacketTimeout(msgPtr)
	if err != nil {
		return IBCErrResult(err)
	}

	deps := make_dependencies()
	respBytes, err := ibcFunc(&deps, env, timeoutMsg)
	if err != nil {
		return IBCErrResult(err)
	}

	result := &types.IBCBasicResult{
		Ok: respBytes,
	}
	data, err := result.MarshalJSON()
	if err != nil {
		return IBCErrResult(err)
	}

	return Package_message(data)
}

//export allocate
func allocate(size uint32) unsafe.Pointer {
	ptr, _ := Build_region(size, 0)
	return ptr
}

//export deallocate
func deallocate(pointer unsafe.Pointer) {
	Deallocate(pointer)
}

//export interface_version_8
func interface_version_8() {}
