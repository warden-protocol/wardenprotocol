package ibctesting

import (
	"bytes"
	"compress/gzip"
	"encoding/json"
	"fmt"
	"os"
	"strings"

	abci "github.com/cometbft/cometbft/abci/types"
	"github.com/cometbft/cometbft/libs/rand"
	"github.com/cosmos/gogoproto/proto"
	ibctesting "github.com/cosmos/ibc-go/v7/testing"
	"github.com/stretchr/testify/require"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"gitlab.qredo.com/qrdochain/fusionchain/x/wasm/types"
)

var wasmIdent = []byte("\x00\x61\x73\x6D")

// SeedNewContractInstance stores some wasm code and instantiates a new contract on this chain.
// This method can be called to prepare the store with some valid CodeInfo and ContractInfo. The returned
// Address is the contract address for this instance. Test should make use of this data and/or use NewIBCContractMockWasmer
// for using a contract mock in Go.
func (chain *TestChain) SeedNewContractInstance() sdk.AccAddress {
	pInstResp := chain.StoreCode(append(wasmIdent, rand.Bytes(10)...))
	codeID := pInstResp.CodeID

	anyAddressStr := chain.SenderAccount.GetAddress().String()
	initMsg := []byte(fmt.Sprintf(`{"verifier": %q, "beneficiary": %q}`, anyAddressStr, anyAddressStr))
	return chain.InstantiateContract(codeID, initMsg)
}

func (chain *TestChain) StoreCodeFile(filename string) types.MsgStoreCodeResponse {
	wasmCode, err := os.ReadFile(filename)
	require.NoError(chain.t, err)
	if strings.HasSuffix(filename, "wasm") { // compress for gas limit
		var buf bytes.Buffer
		gz := gzip.NewWriter(&buf)
		_, err := gz.Write(wasmCode)
		require.NoError(chain.t, err)
		err = gz.Close()
		require.NoError(chain.t, err)
		wasmCode = buf.Bytes()
	}
	return chain.StoreCode(wasmCode)
}

func (chain *TestChain) StoreCode(byteCode []byte) types.MsgStoreCodeResponse {
	storeMsg := &types.MsgStoreCode{
		Sender:       chain.SenderAccount.GetAddress().String(),
		WASMByteCode: byteCode,
	}
	r, err := chain.SendMsgs(storeMsg)
	require.NoError(chain.t, err)
	// unmarshal protobuf response from data
	require.Len(chain.t, r.MsgResponses, 1)
	require.NotEmpty(chain.t, r.MsgResponses[0].GetCachedValue())
	pInstResp := r.MsgResponses[0].GetCachedValue().(*types.MsgStoreCodeResponse)
	require.NotEmpty(chain.t, pInstResp.CodeID)
	require.NotEmpty(chain.t, pInstResp.Checksum)
	return *pInstResp
}

func (chain *TestChain) InstantiateContract(codeID uint64, initMsg []byte) sdk.AccAddress {
	instantiateMsg := &types.MsgInstantiateContract{
		Sender: chain.SenderAccount.GetAddress().String(),
		Admin:  chain.SenderAccount.GetAddress().String(),
		CodeID: codeID,
		Label:  "ibc-test",
		Msg:    initMsg,
		Funds:  sdk.Coins{ibctesting.TestCoin},
	}

	r, err := chain.SendMsgs(instantiateMsg)
	require.NoError(chain.t, err)
	require.Len(chain.t, r.MsgResponses, 1)
	require.NotEmpty(chain.t, r.MsgResponses[0].GetCachedValue())
	pExecResp := r.MsgResponses[0].GetCachedValue().(*types.MsgInstantiateContractResponse)
	a, err := sdk.AccAddressFromBech32(pExecResp.Address)
	require.NoError(chain.t, err)
	return a
}

func (chain *TestChain) RawQuery(contractAddr string, queryData []byte) ([]byte, error) {
	req := types.QueryRawContractStateRequest{
		Address:   contractAddr,
		QueryData: queryData,
	}
	reqBin, err := proto.Marshal(&req)
	if err != nil {
		return nil, err
	}

	res := chain.App.Query(abci.RequestQuery{
		Path: "/cosmwasm.wasm.v1.Query/RawContractState",
		Data: reqBin,
	})

	if res.Code != 0 {
		return nil, fmt.Errorf("raw query failed: (%d) %s", res.Code, res.Log)
	}

	// unpack protobuf
	var resp types.QueryRawContractStateResponse
	err = proto.Unmarshal(res.Value, &resp)
	if err != nil {
		return nil, err
	}

	return resp.Data, nil
}

// SmartQuery This will serialize the query message and submit it to the contract.
// The response is parsed into the provided interface.
// Usage: SmartQuery(addr, QueryMsg{Foo: 1}, &response)
func (chain *TestChain) SmartQuery(contractAddr string, queryMsg, response interface{}) error {
	msg, err := json.Marshal(queryMsg)
	if err != nil {
		return err
	}

	req := types.QuerySmartContractStateRequest{
		Address:   contractAddr,
		QueryData: msg,
	}
	reqBin, err := proto.Marshal(&req)
	if err != nil {
		return err
	}

	// TODO: what is the query?
	res := chain.App.Query(abci.RequestQuery{
		Path: "/cosmwasm.wasm.v1.Query/SmartContractState",
		Data: reqBin,
	})

	if res.Code != 0 {
		return fmt.Errorf("smart query failed: (%d) %s", res.Code, res.Log)
	}

	// unpack protobuf
	var resp types.QuerySmartContractStateResponse
	err = proto.Unmarshal(res.Value, &resp)
	if err != nil {
		return err
	}
	// unpack json content
	return json.Unmarshal(resp.Data, response)
}

// ContractInfo is a helper function to returns the ContractInfo for the given contract address
func (chain *TestChain) ContractInfo(contractAddr sdk.AccAddress) *types.ContractInfo {
	return chain.App.GetWasmKeeper().GetContractInfo(chain.GetContext(), contractAddr)
}
