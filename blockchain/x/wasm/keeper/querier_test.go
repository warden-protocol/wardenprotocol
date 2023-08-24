package keeper

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"testing"
	"time"

	wasmvm "github.com/CosmWasm/wasmvm"
	wasmvmtypes "github.com/CosmWasm/wasmvm/types"
	"github.com/cometbft/cometbft/libs/log"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	errorsmod "cosmossdk.io/errors"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkErrors "cosmossdk.io/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
	govv1beta1 "github.com/cosmos/cosmos-sdk/x/gov/types/v1beta1"

	"github.com/qredo/fusionchain/x/wasm/keeper/wasmtesting"
	"github.com/qredo/fusionchain/x/wasm/types"
)

func TestQueryAllContractState(t *testing.T) {
	ctx, keepers := CreateTestInput(t, false, AvailableCapabilities)
	keeper := keepers.WasmKeeper

	exampleContract := InstantiateHackatomExampleContract(t, ctx, keepers)
	contractAddr := exampleContract.Contract
	contractModel := []types.Model{
		{Key: []byte{0x0, 0x1}, Value: []byte(`{"count":8}`)},
		{Key: []byte("foo"), Value: []byte(`"bar"`)},
	}
	require.NoError(t, keeper.importContractState(ctx, contractAddr, contractModel))

	randomAddr := RandomBech32AccountAddress(t)

	q := Querier(keeper)
	specs := map[string]struct {
		srcQuery            *types.QueryAllContractStateRequest
		expModelContains    []types.Model
		expModelContainsNot []types.Model
		expErr              error
	}{
		"query all": {
			srcQuery:         &types.QueryAllContractStateRequest{Address: contractAddr.String()},
			expModelContains: contractModel,
		},
		"query all with unknown address": {
			srcQuery: &types.QueryAllContractStateRequest{Address: randomAddr},
			expErr:   types.ErrNoSuchContractFn(randomAddr).Wrapf("address %s", randomAddr),
		},
		"with pagination offset": {
			srcQuery: &types.QueryAllContractStateRequest{
				Address: contractAddr.String(),
				Pagination: &query.PageRequest{
					Offset: 1,
				},
			},
			expModelContains: []types.Model{
				{Key: []byte("foo"), Value: []byte(`"bar"`)},
			},
			expModelContainsNot: []types.Model{
				{Key: []byte{0x0, 0x1}, Value: []byte(`{"count":8}`)},
			},
		},
		"with pagination limit": {
			srcQuery: &types.QueryAllContractStateRequest{
				Address: contractAddr.String(),
				Pagination: &query.PageRequest{
					Limit: 1,
				},
			},
			expModelContains: []types.Model{
				{Key: []byte{0x0, 0x1}, Value: []byte(`{"count":8}`)},
			},
			expModelContainsNot: []types.Model{
				{Key: []byte("foo"), Value: []byte(`"bar"`)},
			},
		},
		"with pagination next key": {
			srcQuery: &types.QueryAllContractStateRequest{
				Address: contractAddr.String(),
				Pagination: &query.PageRequest{
					Key: fromBase64("Y29uZmln"),
				},
			},
			expModelContains: []types.Model{
				{Key: []byte("foo"), Value: []byte(`"bar"`)},
			},
			expModelContainsNot: []types.Model{
				{Key: []byte{0x0, 0x1}, Value: []byte(`{"count":8}`)},
			},
		},
	}
	for msg, spec := range specs {
		t.Run(msg, func(t *testing.T) {
			got, err := q.AllContractState(sdk.WrapSDKContext(ctx), spec.srcQuery)

			if spec.expErr != nil {
				require.Equal(t, spec.expErr.Error(), err.Error())
				return
			}
			for _, exp := range spec.expModelContains {
				assert.Contains(t, got.Models, exp)
			}
			for _, exp := range spec.expModelContainsNot {
				assert.NotContains(t, got.Models, exp)
			}
		})
	}
}

func TestQuerySmartContractState(t *testing.T) {
	ctx, keepers := CreateTestInput(t, false, AvailableCapabilities)
	keeper := keepers.WasmKeeper

	exampleContract := InstantiateHackatomExampleContract(t, ctx, keepers)
	contractAddr := exampleContract.Contract.String()

	randomAddr := RandomBech32AccountAddress(t)

	q := Querier(keeper)
	specs := map[string]struct {
		srcAddr  sdk.AccAddress
		srcQuery *types.QuerySmartContractStateRequest
		expResp  string
		expErr   error
	}{
		"query smart": {
			srcQuery: &types.QuerySmartContractStateRequest{Address: contractAddr, QueryData: []byte(`{"verifier":{}}`)},
			expResp:  fmt.Sprintf(`{"verifier":"%s"}`, exampleContract.VerifierAddr.String()),
		},
		"query smart invalid request": {
			srcQuery: &types.QuerySmartContractStateRequest{Address: contractAddr, QueryData: []byte(`{"raw":{"key":"config"}}`)},
			expErr:   types.ErrQueryFailed,
		},
		"query smart with invalid json": {
			srcQuery: &types.QuerySmartContractStateRequest{Address: contractAddr, QueryData: []byte(`not a json string`)},
			expErr:   status.Error(codes.InvalidArgument, "invalid query data"),
		},
		"query smart with unknown address": {
			srcQuery: &types.QuerySmartContractStateRequest{Address: randomAddr, QueryData: []byte(`{"verifier":{}}`)},
			expErr:   types.ErrNoSuchContractFn(randomAddr),
		},
	}
	for msg, spec := range specs {
		t.Run(msg, func(t *testing.T) {
			got, err := q.SmartContractState(sdk.WrapSDKContext(ctx), spec.srcQuery)
			require.True(t, errors.Is(err, spec.expErr), "but got %+v", err)
			if spec.expErr != nil {
				return
			}
			assert.JSONEq(t, string(got.Data), spec.expResp)
		})
	}
}

func TestQuerySmartContractPanics(t *testing.T) {
	ctx, keepers := CreateTestInput(t, false, AvailableCapabilities)
	contractAddr := BuildContractAddressClassic(1, 1)
	keepers.WasmKeeper.storeCodeInfo(ctx, 1, types.CodeInfo{})
	keepers.WasmKeeper.storeContractInfo(ctx, contractAddr, &types.ContractInfo{
		CodeID:  1,
		Created: types.NewAbsoluteTxPosition(ctx),
	})
	ctx = ctx.WithGasMeter(sdk.NewGasMeter(DefaultInstanceCost)).WithLogger(log.TestingLogger())

	specs := map[string]struct {
		doInContract func()
		expErr       *errorsmod.Error
	}{
		"out of gas": {
			doInContract: func() {
				ctx.GasMeter().ConsumeGas(ctx.GasMeter().Limit()+1, "test - consume more than limit")
			},
			expErr: sdkErrors.ErrOutOfGas,
		},
		"other panic": {
			doInContract: func() {
				panic("my panic")
			},
			expErr: sdkErrors.ErrPanic,
		},
	}
	for msg, spec := range specs {
		t.Run(msg, func(t *testing.T) {
			keepers.WasmKeeper.wasmVM = &wasmtesting.MockWasmer{QueryFn: func(checksum wasmvm.Checksum, env wasmvmtypes.Env, queryMsg []byte, store wasmvm.KVStore, goapi wasmvm.GoAPI, querier wasmvm.Querier, gasMeter wasmvm.GasMeter, gasLimit uint64, deserCost wasmvmtypes.UFraction) ([]byte, uint64, error) {
				spec.doInContract()
				return nil, 0, nil
			}}
			// when
			q := Querier(keepers.WasmKeeper)
			got, err := q.SmartContractState(sdk.WrapSDKContext(ctx), &types.QuerySmartContractStateRequest{
				Address:   contractAddr.String(),
				QueryData: types.RawContractMessage("{}"),
			})
			require.True(t, spec.expErr.Is(err), "got error: %+v", err)
			assert.Nil(t, got)
		})
	}
}

func TestQueryRawContractState(t *testing.T) {
	ctx, keepers := CreateTestInput(t, false, AvailableCapabilities)
	keeper := keepers.WasmKeeper

	exampleContract := InstantiateHackatomExampleContract(t, ctx, keepers)
	contractAddr := exampleContract.Contract.String()
	contractModel := []types.Model{
		{Key: []byte("foo"), Value: []byte(`"bar"`)},
		{Key: []byte{0x0, 0x1}, Value: []byte(`{"count":8}`)},
	}
	require.NoError(t, keeper.importContractState(ctx, exampleContract.Contract, contractModel))

	randomAddr := RandomBech32AccountAddress(t)

	q := Querier(keeper)
	specs := map[string]struct {
		srcQuery *types.QueryRawContractStateRequest
		expData  []byte
		expErr   error
	}{
		"query raw key": {
			srcQuery: &types.QueryRawContractStateRequest{Address: contractAddr, QueryData: []byte("foo")},
			expData:  []byte(`"bar"`),
		},
		"query raw contract binary key": {
			srcQuery: &types.QueryRawContractStateRequest{Address: contractAddr, QueryData: []byte{0x0, 0x1}},
			expData:  []byte(`{"count":8}`),
		},
		"query non-existent raw key": {
			srcQuery: &types.QueryRawContractStateRequest{Address: contractAddr, QueryData: []byte("not existing key")},
			expData:  nil,
		},
		"query empty raw key": {
			srcQuery: &types.QueryRawContractStateRequest{Address: contractAddr, QueryData: []byte("")},
			expData:  nil,
		},
		"query nil raw key": {
			srcQuery: &types.QueryRawContractStateRequest{Address: contractAddr},
			expData:  nil,
		},
		"query raw with unknown address": {
			srcQuery: &types.QueryRawContractStateRequest{Address: randomAddr, QueryData: []byte("foo")},
			expErr:   types.ErrNoSuchContractFn(randomAddr).Wrapf("address %s", randomAddr),
		},
	}
	for msg, spec := range specs {
		t.Run(msg, func(t *testing.T) {
			got, err := q.RawContractState(sdk.WrapSDKContext(ctx), spec.srcQuery)
			if spec.expErr != nil {
				assert.Equal(t, spec.expErr.Error(), err.Error())
				return
			}
			assert.Equal(t, spec.expData, got.Data)
		})
	}
}

func TestQueryContractListByCodeOrdering(t *testing.T) {
	ctx, keepers := CreateTestInput(t, false, AvailableCapabilities)
	keeper := keepers.WasmKeeper

	deposit := sdk.NewCoins(sdk.NewInt64Coin("denom", 1000000))
	topUp := sdk.NewCoins(sdk.NewInt64Coin("denom", 500))
	creator := keepers.Faucet.NewFundedRandomAccount(ctx, deposit...)
	anyAddr := keepers.Faucet.NewFundedRandomAccount(ctx, topUp...)

	wasmCode, err := os.ReadFile("./testdata/hackatom.wasm")
	require.NoError(t, err)

	codeID, _, err := keepers.ContractKeeper.Create(ctx, creator, wasmCode, nil)
	require.NoError(t, err)

	_, bob := keyPubAddr()
	initMsg := HackatomExampleInitMsg{
		Verifier:    anyAddr,
		Beneficiary: bob,
	}
	initMsgBz, err := json.Marshal(initMsg)
	require.NoError(t, err)

	// manage some realistic block settings
	var h int64 = 10
	setBlock := func(ctx sdk.Context, height int64) sdk.Context {
		ctx = ctx.WithBlockHeight(height)
		meter := sdk.NewGasMeter(1000000)
		ctx = ctx.WithGasMeter(meter)
		ctx = ctx.WithBlockGasMeter(meter)
		return ctx
	}

	// create 10 contracts with real block/gas setup
	for i := 0; i < 10; i++ {
		// 3 tx per block, so we ensure both comparisons work
		if i%3 == 0 {
			ctx = setBlock(ctx, h)
			h++
		}
		_, _, err = keepers.ContractKeeper.Instantiate(ctx, codeID, creator, nil, initMsgBz, fmt.Sprintf("contract %d", i), topUp)
		require.NoError(t, err)
	}

	// query and check the results are properly sorted
	q := Querier(keeper)
	res, err := q.ContractsByCode(sdk.WrapSDKContext(ctx), &types.QueryContractsByCodeRequest{CodeId: codeID})
	require.NoError(t, err)

	require.Equal(t, 10, len(res.Contracts))

	for _, contractAddr := range res.Contracts {
		assert.NotEmpty(t, contractAddr)
	}
}

func TestQueryContractHistory(t *testing.T) {
	ctx, keepers := CreateTestInput(t, false, AvailableCapabilities)
	keeper := keepers.WasmKeeper

	var (
		myContractBech32Addr = RandomBech32AccountAddress(t)
		otherBech32Addr      = RandomBech32AccountAddress(t)
	)

	specs := map[string]struct {
		srcHistory []types.ContractCodeHistoryEntry
		req        types.QueryContractHistoryRequest
		expContent []types.ContractCodeHistoryEntry
	}{
		"response with internal fields cleared": {
			srcHistory: []types.ContractCodeHistoryEntry{{
				Operation: types.ContractCodeHistoryOperationTypeGenesis,
				CodeID:    firstCodeID,
				Updated:   &types.AbsoluteTxPosition{BlockHeight: 1, TxIndex: 2},
				Msg:       []byte(`"init message"`),
			}},
			req: types.QueryContractHistoryRequest{Address: myContractBech32Addr},
			expContent: []types.ContractCodeHistoryEntry{{
				Operation: types.ContractCodeHistoryOperationTypeGenesis,
				CodeID:    firstCodeID,
				Msg:       []byte(`"init message"`),
				Updated:   &types.AbsoluteTxPosition{BlockHeight: 1, TxIndex: 2},
			}},
		},
		"response with multiple entries": {
			srcHistory: []types.ContractCodeHistoryEntry{{
				Operation: types.ContractCodeHistoryOperationTypeInit,
				CodeID:    firstCodeID,
				Updated:   &types.AbsoluteTxPosition{BlockHeight: 1, TxIndex: 2},
				Msg:       []byte(`"init message"`),
			}, {
				Operation: types.ContractCodeHistoryOperationTypeMigrate,
				CodeID:    2,
				Updated:   &types.AbsoluteTxPosition{BlockHeight: 3, TxIndex: 4},
				Msg:       []byte(`"migrate message 1"`),
			}, {
				Operation: types.ContractCodeHistoryOperationTypeMigrate,
				CodeID:    3,
				Updated:   &types.AbsoluteTxPosition{BlockHeight: 5, TxIndex: 6},
				Msg:       []byte(`"migrate message 2"`),
			}},
			req: types.QueryContractHistoryRequest{Address: myContractBech32Addr},
			expContent: []types.ContractCodeHistoryEntry{{
				Operation: types.ContractCodeHistoryOperationTypeInit,
				CodeID:    firstCodeID,
				Msg:       []byte(`"init message"`),
				Updated:   &types.AbsoluteTxPosition{BlockHeight: 1, TxIndex: 2},
			}, {
				Operation: types.ContractCodeHistoryOperationTypeMigrate,
				CodeID:    2,
				Msg:       []byte(`"migrate message 1"`),
				Updated:   &types.AbsoluteTxPosition{BlockHeight: 3, TxIndex: 4},
			}, {
				Operation: types.ContractCodeHistoryOperationTypeMigrate,
				CodeID:    3,
				Msg:       []byte(`"migrate message 2"`),
				Updated:   &types.AbsoluteTxPosition{BlockHeight: 5, TxIndex: 6},
			}},
		},
		"with pagination offset": {
			srcHistory: []types.ContractCodeHistoryEntry{{
				Operation: types.ContractCodeHistoryOperationTypeInit,
				CodeID:    firstCodeID,
				Updated:   &types.AbsoluteTxPosition{BlockHeight: 1, TxIndex: 2},
				Msg:       []byte(`"init message"`),
			}, {
				Operation: types.ContractCodeHistoryOperationTypeMigrate,
				CodeID:    2,
				Updated:   &types.AbsoluteTxPosition{BlockHeight: 3, TxIndex: 4},
				Msg:       []byte(`"migrate message 1"`),
			}},
			req: types.QueryContractHistoryRequest{
				Address: myContractBech32Addr,
				Pagination: &query.PageRequest{
					Offset: 1,
				},
			},
			expContent: []types.ContractCodeHistoryEntry{{
				Operation: types.ContractCodeHistoryOperationTypeMigrate,
				CodeID:    2,
				Msg:       []byte(`"migrate message 1"`),
				Updated:   &types.AbsoluteTxPosition{BlockHeight: 3, TxIndex: 4},
			}},
		},
		"with pagination limit": {
			srcHistory: []types.ContractCodeHistoryEntry{{
				Operation: types.ContractCodeHistoryOperationTypeInit,
				CodeID:    firstCodeID,
				Updated:   &types.AbsoluteTxPosition{BlockHeight: 1, TxIndex: 2},
				Msg:       []byte(`"init message"`),
			}, {
				Operation: types.ContractCodeHistoryOperationTypeMigrate,
				CodeID:    2,
				Updated:   &types.AbsoluteTxPosition{BlockHeight: 3, TxIndex: 4},
				Msg:       []byte(`"migrate message 1"`),
			}},
			req: types.QueryContractHistoryRequest{
				Address: myContractBech32Addr,
				Pagination: &query.PageRequest{
					Limit: 1,
				},
			},
			expContent: []types.ContractCodeHistoryEntry{{
				Operation: types.ContractCodeHistoryOperationTypeInit,
				CodeID:    firstCodeID,
				Msg:       []byte(`"init message"`),
				Updated:   &types.AbsoluteTxPosition{BlockHeight: 1, TxIndex: 2},
			}},
		},
		"unknown contract address": {
			req: types.QueryContractHistoryRequest{Address: otherBech32Addr},
			srcHistory: []types.ContractCodeHistoryEntry{{
				Operation: types.ContractCodeHistoryOperationTypeGenesis,
				CodeID:    firstCodeID,
				Updated:   types.NewAbsoluteTxPosition(ctx),
				Msg:       []byte(`"init message"`),
			}},
			expContent: nil,
		},
	}
	for msg, spec := range specs {
		t.Run(msg, func(t *testing.T) {
			xCtx, _ := ctx.CacheContext()

			cAddr, _ := sdk.AccAddressFromBech32(myContractBech32Addr)
			keeper.appendToContractHistory(xCtx, cAddr, spec.srcHistory...)

			// when
			q := Querier(keeper)
			got, err := q.ContractHistory(sdk.WrapSDKContext(xCtx), &spec.req)

			// then
			if spec.expContent == nil {
				require.Error(t, types.ErrEmpty)
				return
			}
			require.NoError(t, err)
			assert.Equal(t, spec.expContent, got.Entries)
		})
	}
}

func TestQueryCodeList(t *testing.T) {
	wasmCode, err := os.ReadFile("./testdata/hackatom.wasm")
	require.NoError(t, err)

	ctx, keepers := CreateTestInput(t, false, AvailableCapabilities)
	keeper := keepers.WasmKeeper

	specs := map[string]struct {
		storedCodeIDs []uint64
		req           types.QueryCodesRequest
		expCodeIDs    []uint64
	}{
		"none": {},
		"no gaps": {
			storedCodeIDs: []uint64{1, 2, 3},
			expCodeIDs:    []uint64{1, 2, 3},
		},
		"with gaps": {
			storedCodeIDs: []uint64{2, 4, 6},
			expCodeIDs:    []uint64{2, 4, 6},
		},
		"with pagination offset": {
			storedCodeIDs: []uint64{1, 2, 3},
			req: types.QueryCodesRequest{
				Pagination: &query.PageRequest{
					Offset: 1,
				},
			},
			expCodeIDs: []uint64{2, 3},
		},
		"with pagination limit": {
			storedCodeIDs: []uint64{1, 2, 3},
			req: types.QueryCodesRequest{
				Pagination: &query.PageRequest{
					Limit: 2,
				},
			},
			expCodeIDs: []uint64{1, 2},
		},
		"with pagination next key": {
			storedCodeIDs: []uint64{1, 2, 3},
			req: types.QueryCodesRequest{
				Pagination: &query.PageRequest{
					Key: fromBase64("AAAAAAAAAAI="),
				},
			},
			expCodeIDs: []uint64{2, 3},
		},
	}

	for msg, spec := range specs {
		t.Run(msg, func(t *testing.T) {
			xCtx, _ := ctx.CacheContext()

			for _, codeID := range spec.storedCodeIDs {
				require.NoError(t, keeper.importCode(xCtx, codeID,
					types.CodeInfoFixture(types.WithSHA256CodeHash(wasmCode)),
					wasmCode),
				)
			}
			// when
			q := Querier(keeper)
			got, err := q.Codes(sdk.WrapSDKContext(xCtx), &spec.req)

			// then
			require.NoError(t, err)
			require.NotNil(t, got.CodeInfos)
			require.Len(t, got.CodeInfos, len(spec.expCodeIDs))
			for i, exp := range spec.expCodeIDs {
				assert.EqualValues(t, exp, got.CodeInfos[i].CodeID)
			}
		})
	}
}

func TestQueryContractInfo(t *testing.T) {
	var (
		contractAddr = RandomAccountAddress(t)
		anyDate      = time.Now().UTC()
	)
	ctx, keepers := CreateTestInput(t, false, AvailableCapabilities)
	// register an example extension. must be protobuf
	keepers.EncodingConfig.InterfaceRegistry.RegisterImplementations(
		(*types.ContractInfoExtension)(nil),
		&govv1beta1.Proposal{},
	)
	govv1beta1.RegisterInterfaces(keepers.EncodingConfig.InterfaceRegistry)

	k := keepers.WasmKeeper
	querier := NewGrpcQuerier(k.cdc, k.storeKey, k, k.queryGasLimit)
	myExtension := func(info *types.ContractInfo) {
		// abuse gov proposal as a random protobuf extension with an Any type
		myExt, err := govv1beta1.NewProposal(&govv1beta1.TextProposal{Title: "foo", Description: "bar"}, 1, anyDate, anyDate)
		require.NoError(t, err)
		myExt.TotalDeposit = nil
		err = info.SetExtension(&myExt)
		require.NoError(t, err)
	}
	specs := map[string]struct {
		src    *types.QueryContractInfoRequest
		stored types.ContractInfo
		expRsp *types.QueryContractInfoResponse
		expErr bool
	}{
		"found": {
			src:    &types.QueryContractInfoRequest{Address: contractAddr.String()},
			stored: types.ContractInfoFixture(),
			expRsp: &types.QueryContractInfoResponse{
				Address:      contractAddr.String(),
				ContractInfo: types.ContractInfoFixture(),
			},
		},
		"with extension": {
			src:    &types.QueryContractInfoRequest{Address: contractAddr.String()},
			stored: types.ContractInfoFixture(myExtension),
			expRsp: &types.QueryContractInfoResponse{
				Address:      contractAddr.String(),
				ContractInfo: types.ContractInfoFixture(myExtension),
			},
		},
		"not found": {
			src:    &types.QueryContractInfoRequest{Address: RandomBech32AccountAddress(t)},
			stored: types.ContractInfoFixture(),
			expErr: true,
		},
	}
	for name, spec := range specs {
		t.Run(name, func(t *testing.T) {
			xCtx, _ := ctx.CacheContext()
			k.storeContractInfo(xCtx, contractAddr, &spec.stored)
			// when
			gotRsp, gotErr := querier.ContractInfo(sdk.WrapSDKContext(xCtx), spec.src)
			if spec.expErr {
				require.Error(t, gotErr)
				return
			}
			require.NoError(t, gotErr)
			assert.Equal(t, spec.expRsp, gotRsp)
		})
	}
}

func TestQueryPinnedCodes(t *testing.T) {
	ctx, keepers := CreateTestInput(t, false, AvailableCapabilities)
	keeper := keepers.WasmKeeper

	exampleContract1 := InstantiateHackatomExampleContract(t, ctx, keepers)
	exampleContract2 := InstantiateIBCReflectContract(t, ctx, keepers)
	require.NoError(t, keeper.pinCode(ctx, exampleContract1.CodeID))
	require.NoError(t, keeper.pinCode(ctx, exampleContract2.CodeID))

	q := Querier(keeper)
	specs := map[string]struct {
		srcQuery   *types.QueryPinnedCodesRequest
		expCodeIDs []uint64
		expErr     *errorsmod.Error
	}{
		"query all": {
			srcQuery:   &types.QueryPinnedCodesRequest{},
			expCodeIDs: []uint64{exampleContract1.CodeID, exampleContract2.CodeID},
		},
		"with pagination offset": {
			srcQuery: &types.QueryPinnedCodesRequest{
				Pagination: &query.PageRequest{
					Offset: 1,
				},
			},
			expCodeIDs: []uint64{exampleContract2.CodeID},
		},
		"with pagination limit": {
			srcQuery: &types.QueryPinnedCodesRequest{
				Pagination: &query.PageRequest{
					Limit: 1,
				},
			},
			expCodeIDs: []uint64{exampleContract1.CodeID},
		},
		"with pagination next key": {
			srcQuery: &types.QueryPinnedCodesRequest{
				Pagination: &query.PageRequest{
					Key: fromBase64("AAAAAAAAAAM="),
				},
			},
			expCodeIDs: []uint64{exampleContract2.CodeID},
		},
	}
	for msg, spec := range specs {
		t.Run(msg, func(t *testing.T) {
			got, err := q.PinnedCodes(sdk.WrapSDKContext(ctx), spec.srcQuery)
			require.True(t, spec.expErr.Is(err), err)
			if spec.expErr != nil {
				return
			}
			require.NotNil(t, got)
			assert.Equal(t, spec.expCodeIDs, got.CodeIDs)
		})
	}
}

func TestQueryParams(t *testing.T) {
	ctx, keepers := CreateTestInput(t, false, AvailableCapabilities)
	keeper := keepers.WasmKeeper

	q := Querier(keeper)

	paramsResponse, err := q.Params(sdk.WrapSDKContext(ctx), &types.QueryParamsRequest{})
	require.NoError(t, err)
	require.NotNil(t, paramsResponse)

	defaultParams := types.DefaultParams()

	require.Equal(t, paramsResponse.Params.CodeUploadAccess, defaultParams.CodeUploadAccess)
	require.Equal(t, paramsResponse.Params.InstantiateDefaultPermission, defaultParams.InstantiateDefaultPermission)

	err = keeper.SetParams(ctx, types.Params{
		CodeUploadAccess:             types.AllowNobody,
		InstantiateDefaultPermission: types.AccessTypeNobody,
	})
	require.NoError(t, err)

	paramsResponse, err = q.Params(sdk.WrapSDKContext(ctx), &types.QueryParamsRequest{})
	require.NoError(t, err)
	require.NotNil(t, paramsResponse)

	require.Equal(t, paramsResponse.Params.CodeUploadAccess, types.AllowNobody)
	require.Equal(t, paramsResponse.Params.InstantiateDefaultPermission, types.AccessTypeNobody)
}

func TestQueryCodeInfo(t *testing.T) {
	wasmCode, err := os.ReadFile("./testdata/hackatom.wasm")
	require.NoError(t, err)

	ctx, keepers := CreateTestInput(t, false, AvailableCapabilities)
	keeper := keepers.WasmKeeper

	anyAddress, err := sdk.AccAddressFromBech32("cosmos100dejzacpanrldpjjwksjm62shqhyss44jf5xz")
	require.NoError(t, err)
	specs := map[string]struct {
		codeID       uint64
		accessConfig types.AccessConfig
	}{
		"everybody": {
			codeID:       1,
			accessConfig: types.AllowEverybody,
		},
		"nobody": {
			codeID:       10,
			accessConfig: types.AllowNobody,
		},
		"with_address": {
			codeID:       20,
			accessConfig: types.AccessTypeAnyOfAddresses.With(anyAddress),
		},
	}
	for msg, spec := range specs {
		t.Run(msg, func(t *testing.T) {
			codeInfo := types.CodeInfoFixture(types.WithSHA256CodeHash(wasmCode))
			codeInfo.InstantiateConfig = spec.accessConfig
			require.NoError(t, keeper.importCode(ctx, spec.codeID,
				codeInfo,
				wasmCode),
			)

			q := Querier(keeper)
			got, err := q.Code(sdk.WrapSDKContext(ctx), &types.QueryCodeRequest{
				CodeId: spec.codeID,
			})
			require.NoError(t, err)
			expectedResponse := &types.QueryCodeResponse{
				CodeInfoResponse: &types.CodeInfoResponse{
					CodeID:                spec.codeID,
					Creator:               codeInfo.Creator,
					DataHash:              codeInfo.CodeHash,
					InstantiatePermission: spec.accessConfig,
				},
				Data: wasmCode,
			}
			require.NotNil(t, got.CodeInfoResponse)
			require.EqualValues(t, expectedResponse, got)
		})
	}
}

func TestQueryCodeInfoList(t *testing.T) {
	wasmCode, err := os.ReadFile("./testdata/hackatom.wasm")
	require.NoError(t, err)

	ctx, keepers := CreateTestInput(t, false, AvailableCapabilities)
	keeper := keepers.WasmKeeper

	anyAddress, err := sdk.AccAddressFromBech32("cosmos100dejzacpanrldpjjwksjm62shqhyss44jf5xz")
	require.NoError(t, err)
	codeInfoWithConfig := func(accessConfig types.AccessConfig) types.CodeInfo {
		codeInfo := types.CodeInfoFixture(types.WithSHA256CodeHash(wasmCode))
		codeInfo.InstantiateConfig = accessConfig
		return codeInfo
	}

	codes := []struct {
		name     string
		codeID   uint64
		codeInfo types.CodeInfo
	}{
		{
			name:     "everybody",
			codeID:   1,
			codeInfo: codeInfoWithConfig(types.AllowEverybody),
		},
		{
			codeID:   10,
			name:     "nobody",
			codeInfo: codeInfoWithConfig(types.AllowNobody),
		},
		{
			name:     "with_address",
			codeID:   20,
			codeInfo: codeInfoWithConfig(types.AccessTypeAnyOfAddresses.With(anyAddress)),
		},
	}

	allCodesResponse := make([]types.CodeInfoResponse, 0)
	for _, code := range codes {
		t.Run(fmt.Sprintf("import_%s", code.name), func(t *testing.T) {
			require.NoError(t, keeper.importCode(ctx, code.codeID,
				code.codeInfo,
				wasmCode),
			)
		})

		allCodesResponse = append(allCodesResponse, types.CodeInfoResponse{
			CodeID:                code.codeID,
			Creator:               code.codeInfo.Creator,
			DataHash:              code.codeInfo.CodeHash,
			InstantiatePermission: code.codeInfo.InstantiateConfig,
		})
	}
	q := Querier(keeper)
	got, err := q.Codes(sdk.WrapSDKContext(ctx), &types.QueryCodesRequest{
		Pagination: &query.PageRequest{
			Limit: 3,
		},
	})
	require.NoError(t, err)
	require.Len(t, got.CodeInfos, 3)
	require.EqualValues(t, allCodesResponse, got.CodeInfos)
}

func TestQueryContractsByCreatorList(t *testing.T) {
	ctx, keepers := CreateTestInput(t, false, AvailableCapabilities)

	deposit := sdk.NewCoins(sdk.NewInt64Coin("denom", 1000000))
	topUp := sdk.NewCoins(sdk.NewInt64Coin("denom", 500))
	creator := keepers.Faucet.NewFundedRandomAccount(ctx, deposit...)
	anyAddr := keepers.Faucet.NewFundedRandomAccount(ctx, topUp...)

	wasmCode, err := os.ReadFile("./testdata/hackatom.wasm")
	require.NoError(t, err)

	codeID, _, err := keepers.ContractKeeper.Create(ctx, creator, wasmCode, nil)
	require.NoError(t, err)

	_, bob := keyPubAddr()
	initMsg := HackatomExampleInitMsg{
		Verifier:    anyAddr,
		Beneficiary: bob,
	}
	initMsgBz, err := json.Marshal(initMsg)
	require.NoError(t, err)

	// manage some realistic block settings
	var h int64 = 10
	setBlock := func(ctx sdk.Context, height int64) sdk.Context {
		ctx = ctx.WithBlockHeight(height)
		meter := sdk.NewGasMeter(1000000)
		ctx = ctx.WithGasMeter(meter)
		ctx = ctx.WithBlockGasMeter(meter)
		return ctx
	}

	var allExpecedContracts []string
	// create 10 contracts with real block/gas setup
	for i := 0; i < 10; i++ {
		ctx = setBlock(ctx, h)
		h++
		contract, _, err := keepers.ContractKeeper.Instantiate(ctx, codeID, creator, nil, initMsgBz, fmt.Sprintf("contract %d", i), topUp)
		allExpecedContracts = append(allExpecedContracts, contract.String())
		require.NoError(t, err)
	}

	specs := map[string]struct {
		srcQuery        *types.QueryContractsByCreatorRequest
		expContractAddr []string
		expErr          error
	}{
		"query all": {
			srcQuery: &types.QueryContractsByCreatorRequest{
				CreatorAddress: creator.String(),
			},
			expContractAddr: allExpecedContracts,
			expErr:          nil,
		},
		"with pagination offset": {
			srcQuery: &types.QueryContractsByCreatorRequest{
				CreatorAddress: creator.String(),
				Pagination: &query.PageRequest{
					Offset: 1,
				},
			},
			expContractAddr: allExpecedContracts[1:],
			expErr:          nil,
		},
		"with pagination limit": {
			srcQuery: &types.QueryContractsByCreatorRequest{
				CreatorAddress: creator.String(),
				Pagination: &query.PageRequest{
					Limit: 1,
				},
			},
			expContractAddr: allExpecedContracts[0:1],
			expErr:          nil,
		},
		"nil creator": {
			srcQuery: &types.QueryContractsByCreatorRequest{
				Pagination: &query.PageRequest{},
			},
			expContractAddr: allExpecedContracts,
			expErr:          errors.New("empty address string is not allowed"),
		},
		"nil req": {
			srcQuery:        nil,
			expContractAddr: allExpecedContracts,
			expErr:          status.Error(codes.InvalidArgument, "empty request"),
		},
	}

	q := Querier(keepers.WasmKeeper)
	for msg, spec := range specs {
		t.Run(msg, func(t *testing.T) {
			got, err := q.ContractsByCreator(sdk.WrapSDKContext(ctx), spec.srcQuery)

			if spec.expErr != nil {
				require.Equal(t, spec.expErr, err)
				return
			}
			require.NoError(t, err)
			require.NotNil(t, got)
			assert.Equal(t, spec.expContractAddr, got.ContractAddresses)
		})
	}
}

func fromBase64(s string) []byte {
	r, err := base64.StdEncoding.DecodeString(s)
	if err != nil {
		panic(err)
	}
	return r
}
