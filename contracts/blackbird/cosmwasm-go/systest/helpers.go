package systest

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"testing"

	unitmocks "github.com/CosmWasm/cosmwasm-go/std/mock"

	wasmvm "github.com/CosmWasm/wasmvm"
	mocks "github.com/CosmWasm/wasmvm/api"
	types "github.com/CosmWasm/wasmvm/types"

	"github.com/stretchr/testify/require"
)

const (
	FEATURES = "staking"
)

var (
	deserCost = types.UFraction{
		Numerator:   1,
		Denominator: 10,
	}
)

// TODO: move this into wasmvm at some point
func NewCoins(amount uint64, denom string) []types.Coin {
	return []types.Coin{types.NewCoin(amount, denom)}
}

func NewInstance(t *testing.T, contractPath string, gasLimit uint64, funds []types.Coin) Instance {
	wasmer, codeID := setupWasmer(t, contractPath)
	gasMeter := mocks.NewMockGasMeter(gasLimit)

	// we use callbacks that use the same logic as our unit tests
	mockApi := mocks.NewMockAPI()
	mockApi.HumanAddress = func(canon []byte) (string, uint64, error) {
		human, err := unitmocks.API().HumanAddress(canon)
		return human, 5000, err
	}
	mockApi.CanonicalAddress = func(human string) ([]byte, uint64, error) {
		canon, err := unitmocks.API().CanonicalAddress(human)
		return canon, 4000, err
	}

	return Instance{
		Wasmer:   wasmer,
		CodeID:   codeID,
		GasLimit: gasLimit,
		GasMeter: gasMeter,
		Store:    mocks.NewLookup(gasMeter),
		Api:      mockApi,
		Querier:  mocks.DefaultQuerier(mocks.MOCK_CONTRACT_ADDR, funds),
	}
}

type Instance struct {
	Wasmer   *wasmvm.VM
	CodeID   []byte
	GasLimit uint64
	GasMeter wasmvm.GasMeter
	Store    *mocks.Lookup
	Api      *mocks.GoAPI
	Querier  mocks.Querier
}

func (i *Instance) SetQuerierBalance(addr string, balance []types.Coin) {
	mq := i.Querier.(mocks.MockQuerier)
	mq.Bank.Balances[addr] = balance
}

func (i *Instance) Instantiate(env types.Env, info types.MessageInfo, initMsg json.Marshaler) (*types.Response, uint64, error) {
	bytes, err := initMsg.MarshalJSON()
	if err != nil {
		return nil, 0, err
	}

	return i.Wasmer.Instantiate(
		i.CodeID,
		env,
		info,
		bytes,
		i.Store,
		*i.Api,
		i.Querier,
		i.GasMeter,
		i.GasLimit,
		deserCost,
	)
}

func (i *Instance) Execute(env types.Env, info types.MessageInfo, handleMsg json.Marshaler) (*types.Response, uint64, error) {
	bytes, err := handleMsg.MarshalJSON()
	if err != nil {
		return nil, 0, err
	}

	return i.Wasmer.Execute(
		i.CodeID,
		env,
		info,
		bytes,
		i.Store,
		*i.Api,
		i.Querier,
		i.GasMeter,
		i.GasLimit,
		deserCost,
	)
}

func (i *Instance) Query(env types.Env, queryMsg json.Marshaler) ([]byte, uint64, error) {
	bytes, err := queryMsg.MarshalJSON()
	if err != nil {
		return nil, 0, err
	}

	return i.Wasmer.Query(
		i.CodeID,
		env,
		bytes,
		i.Store,
		*i.Api,
		i.Querier,
		i.GasMeter,
		i.GasLimit,
		deserCost,
	)
}

func (i *Instance) Migrate(env types.Env, migrateMsg json.Marshaler) (*types.Response, uint64, error) {
	bytes, err := migrateMsg.MarshalJSON()
	if err != nil {
		return nil, 0, err
	}

	return i.Wasmer.Migrate(
		i.CodeID,
		env,
		bytes,
		i.Store,
		*i.Api,
		i.Querier,
		i.GasMeter,
		i.GasLimit,
		deserCost,
	)
}

func (i *Instance) Sudo(env types.Env, sudoMsg json.Marshaler) (*types.Response, uint64, error) {
	bytes, err := sudoMsg.MarshalJSON()
	if err != nil {
		return nil, 0, err
	}

	return i.Wasmer.Sudo(
		i.CodeID,
		env,
		bytes,
		i.Store,
		*i.Api,
		i.Querier,
		i.GasMeter,
		i.GasLimit,
		deserCost,
	)
}

func (i *Instance) Reply(env types.Env, replyMsg types.Reply) (*types.Response, uint64, error) {
	return i.Wasmer.Reply(
		i.CodeID,
		env,
		replyMsg,
		i.Store,
		*i.Api,
		i.Querier,
		i.GasMeter,
		i.GasLimit,
		deserCost,
	)
}

func (i *Instance) IBCChannelOpen(env types.Env, openMsg types.IBCChannelOpenMsg) (uint64, error) {
	return i.Wasmer.IBCChannelOpen(
		i.CodeID,
		env,
		openMsg,
		i.Store,
		*i.Api,
		i.Querier,
		i.GasMeter,
		i.GasLimit,
		deserCost,
	)
}

func (i *Instance) IBCChannelConnect(env types.Env, connectMsg types.IBCChannelConnectMsg) (*types.IBCBasicResponse, uint64, error) {
	return i.Wasmer.IBCChannelConnect(
		i.CodeID,
		env,
		connectMsg,
		i.Store,
		*i.Api,
		i.Querier,
		i.GasMeter,
		i.GasLimit,
		deserCost,
	)
}

func (i *Instance) IBCChannelClose(env types.Env, closeMsg types.IBCChannelCloseMsg) (*types.IBCBasicResponse, uint64, error) {
	return i.Wasmer.IBCChannelClose(
		i.CodeID,
		env,
		closeMsg,
		i.Store,
		*i.Api,
		i.Querier,
		i.GasMeter,
		i.GasLimit,
		deserCost,
	)
}

func (i *Instance) IBCPacketReceive(env types.Env, receiveMsg types.IBCPacketReceiveMsg) (*types.IBCReceiveResult, uint64, error) {
	return i.Wasmer.IBCPacketReceive(
		i.CodeID,
		env,
		receiveMsg,
		i.Store,
		*i.Api,
		i.Querier,
		i.GasMeter,
		i.GasLimit,
		deserCost,
	)
}

func (i *Instance) IBCPacketAck(env types.Env, ackMsg types.IBCPacketAckMsg) (*types.IBCBasicResponse, uint64, error) {
	return i.Wasmer.IBCPacketAck(
		i.CodeID,
		env,
		ackMsg,
		i.Store,
		*i.Api,
		i.Querier,
		i.GasMeter,
		i.GasLimit,
		deserCost,
	)
}

func (i *Instance) IBCPacketTimeout(env types.Env, timeoutMsg types.IBCPacketTimeoutMsg) (*types.IBCBasicResponse, uint64, error) {
	return i.Wasmer.IBCPacketTimeout(
		i.CodeID,
		env,
		timeoutMsg,
		i.Store,
		*i.Api,
		i.Querier,
		i.GasMeter,
		i.GasLimit,
		deserCost,
	)
}

// setupWasmer instantiates a new wasmvm.VM with a contract given its path.
func setupWasmer(t *testing.T, contractPath string) (*wasmvm.VM, []byte) {
	// setup wasmer instance
	tmpdir, err := ioutil.TempDir("", "wasmer")
	require.NoError(t, err)
	t.Cleanup(func() { os.RemoveAll(tmpdir) })

	wasmer, err := wasmvm.NewVM(tmpdir, FEATURES, 256, true, 0)
	require.NoError(t, err)
	codeID := storeCode(t, wasmer, contractPath)

	return wasmer, codeID
}

// storeCode stores the wasm contract given its path and returns the contract code ID.
func storeCode(t *testing.T, wasmer *wasmvm.VM, contractPath string) []byte {
	// upload code and get some sha256 hash
	bz, err := ioutil.ReadFile(contractPath)
	require.NoError(t, err)
	codeID, err := wasmer.Create(bz)
	require.NoError(t, err)
	require.Equal(t, 32, len(codeID))
	return codeID
}
