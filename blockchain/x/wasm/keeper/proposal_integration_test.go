package keeper

import (
	"bytes"
	"encoding/hex"
	"encoding/json"
	"errors"
	"os"
	"testing"

	wasmvm "github.com/CosmWasm/wasmvm"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	sdk "github.com/cosmos/cosmos-sdk/types"
	govkeeper "github.com/cosmos/cosmos-sdk/x/gov/keeper"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	v1 "github.com/cosmos/cosmos-sdk/x/gov/types/v1"
	"github.com/cosmos/cosmos-sdk/x/gov/types/v1beta1"

	"github.com/CosmWasm/wasmd/x/wasm/keeper/wasmtesting"
	"github.com/CosmWasm/wasmd/x/wasm/types"
)

const myTestLabel = "testing"

func TestStoreCodeProposal(t *testing.T) {
	parentCtx, keepers := CreateTestInput(t, false, "staking")
	wasmKeeper := keepers.WasmKeeper
	err := wasmKeeper.SetParams(parentCtx, types.Params{
		CodeUploadAccess:             types.AllowNobody,
		InstantiateDefaultPermission: types.AccessTypeNobody,
	})
	require.NoError(t, err)
	rawWasmCode, err := os.ReadFile("./testdata/hackatom.wasm")
	require.NoError(t, err)
	gzippedWasmCode, err := os.ReadFile("./testdata/hackatom.wasm.gzip")
	require.NoError(t, err)
	checksum, err := hex.DecodeString("5ca46abb8e9b1b754a5c906f9c0f4eec9121ee09e3cee55ea0faba54763706e2")
	require.NoError(t, err)

	specs := map[string]struct {
		codeID    int64
		code      []byte
		unpinCode bool
	}{
		"upload with pinning (default)": {
			unpinCode: false,
			code:      rawWasmCode,
		},
		"upload with code unpin": {
			unpinCode: true,
			code:      rawWasmCode,
		},
		"upload with raw wasm code": {
			code: rawWasmCode,
		},
		"upload with zipped wasm code": {
			code: gzippedWasmCode,
		},
	}

	for msg, spec := range specs {
		t.Run(msg, func(t *testing.T) {
			ctx, _ := parentCtx.CacheContext()
			myActorAddress := RandomBech32AccountAddress(t)

			src := types.StoreCodeProposalFixture(func(p *types.StoreCodeProposal) { //nolint:staticcheck // testing deprecated function
				p.RunAs = myActorAddress
				p.WASMByteCode = spec.code
				p.UnpinCode = spec.unpinCode
				p.CodeHash = checksum
			})

			// when
			mustSubmitAndExecuteLegacyProposal(t, ctx, src, myActorAddress, keepers)

			// then
			cInfo := wasmKeeper.GetCodeInfo(ctx, 1)
			require.NotNil(t, cInfo)
			assert.Equal(t, myActorAddress, cInfo.Creator)
			assert.Equal(t, !spec.unpinCode, wasmKeeper.IsPinnedCode(ctx, 1))

			storedCode, err := wasmKeeper.GetByteCode(ctx, 1)
			require.NoError(t, err)
			assert.Equal(t, rawWasmCode, storedCode)
		})
	}
}

func mustSubmitAndExecuteLegacyProposal(t *testing.T, ctx sdk.Context, content v1beta1.Content, myActorAddress string, keepers TestKeepers) {
	t.Helper()
	govAuthority := keepers.AccountKeeper.GetModuleAddress(govtypes.ModuleName).String()
	msgServer := govkeeper.NewMsgServerImpl(keepers.GovKeeper)
	// ignore all submit events
	contentMsg, err := submitLegacyProposal(t, ctx.WithEventManager(sdk.NewEventManager()), content, myActorAddress, govAuthority, msgServer)
	require.NoError(t, err)

	_, err = msgServer.ExecLegacyContent(sdk.WrapSDKContext(ctx), v1.NewMsgExecLegacyContent(contentMsg.Content, govAuthority))
	require.NoError(t, err)
}

// does not fail on submit proposal
func submitLegacyProposal(t *testing.T, ctx sdk.Context, content v1beta1.Content, myActorAddress, govAuthority string, msgServer v1.MsgServer) (*v1.MsgExecLegacyContent, error) {
	t.Helper()
	contentMsg, err := v1.NewLegacyContent(content, govAuthority)
	require.NoError(t, err)

	proposal, err := v1.NewMsgSubmitProposal(
		[]sdk.Msg{contentMsg},
		sdk.Coins{},
		myActorAddress,
		"",
		"my title",
		"my description",
	)
	require.NoError(t, err)

	// when stored
	_, err = msgServer.SubmitProposal(sdk.WrapSDKContext(ctx), proposal)
	return contentMsg, err
}

func TestInstantiateProposal(t *testing.T) {
	ctx, keepers := CreateTestInput(t, false, "staking")
	wasmKeeper := keepers.WasmKeeper
	err := wasmKeeper.SetParams(ctx, types.Params{
		CodeUploadAccess:             types.AllowNobody,
		InstantiateDefaultPermission: types.AccessTypeNobody,
	})
	require.NoError(t, err)

	wasmCode, err := os.ReadFile("./testdata/hackatom.wasm")
	require.NoError(t, err)

	require.NoError(t, wasmKeeper.importCode(ctx, 1,
		types.CodeInfoFixture(types.WithSHA256CodeHash(wasmCode)),
		wasmCode),
	)

	var (
		oneAddress   sdk.AccAddress = bytes.Repeat([]byte{0x1}, types.ContractAddrLen)
		otherAddress sdk.AccAddress = bytes.Repeat([]byte{0x2}, types.ContractAddrLen)
	)
	src := types.InstantiateContractProposalFixture(func(p *types.InstantiateContractProposal) { //nolint:staticcheck // testing deprecated function
		p.CodeID = firstCodeID
		p.RunAs = oneAddress.String()
		p.Admin = otherAddress.String()
		p.Label = myTestLabel
	})
	em := sdk.NewEventManager()

	// when
	mustSubmitAndExecuteLegacyProposal(t, ctx.WithEventManager(em), src, oneAddress.String(), keepers)

	// then
	contractAddr, err := sdk.AccAddressFromBech32("cosmos14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s4hmalr")
	require.NoError(t, err)

	cInfo := wasmKeeper.GetContractInfo(ctx, contractAddr)
	require.NotNil(t, cInfo)
	assert.Equal(t, uint64(1), cInfo.CodeID)
	assert.Equal(t, oneAddress.String(), cInfo.Creator)
	assert.Equal(t, otherAddress.String(), cInfo.Admin)
	assert.Equal(t, myTestLabel, cInfo.Label)
	expHistory := []types.ContractCodeHistoryEntry{{
		Operation: types.ContractCodeHistoryOperationTypeInit,
		CodeID:    src.CodeID,
		Updated:   types.NewAbsoluteTxPosition(ctx),
		Msg:       src.Msg,
	}}
	assert.Equal(t, expHistory, wasmKeeper.GetContractHistory(ctx, contractAddr))
	// and event
	require.Len(t, em.Events(), 3, "%#v", em.Events())
	require.Equal(t, types.EventTypeInstantiate, em.Events()[0].Type)
	require.Equal(t, types.WasmModuleEventType, em.Events()[1].Type)
	require.Equal(t, types.EventTypeGovContractResult, em.Events()[2].Type)
	require.Len(t, em.Events()[2].Attributes, 1)
	require.NotEmpty(t, em.Events()[2].Attributes[0])
}

func TestInstantiate2Proposal(t *testing.T) {
	ctx, keepers := CreateTestInput(t, false, "staking")
	wasmKeeper := keepers.WasmKeeper
	err := wasmKeeper.SetParams(ctx, types.Params{
		CodeUploadAccess:             types.AllowNobody,
		InstantiateDefaultPermission: types.AccessTypeNobody,
	})
	require.NoError(t, err)

	wasmCode, err := os.ReadFile("./testdata/hackatom.wasm")
	require.NoError(t, err)

	codeInfo := types.CodeInfoFixture(types.WithSHA256CodeHash(wasmCode))
	err = wasmKeeper.importCode(ctx, 1, codeInfo, wasmCode)
	require.NoError(t, err)

	var (
		oneAddress   sdk.AccAddress = bytes.Repeat([]byte{0x1}, types.ContractAddrLen)
		otherAddress sdk.AccAddress = bytes.Repeat([]byte{0x2}, types.ContractAddrLen)
		label                       = "label"
		salt                        = []byte("mySalt")
	)
	src := types.InstantiateContract2ProposalFixture(func(p *types.InstantiateContract2Proposal) { //nolint:staticcheck // testing deprecated function
		p.CodeID = firstCodeID
		p.RunAs = oneAddress.String()
		p.Admin = otherAddress.String()
		p.Label = label
		p.Salt = salt
	})
	contractAddress := BuildContractAddressPredictable(codeInfo.CodeHash, oneAddress, salt, []byte{})

	em := sdk.NewEventManager()

	// when
	mustSubmitAndExecuteLegacyProposal(t, ctx.WithEventManager(em), src, oneAddress.String(), keepers)

	cInfo := wasmKeeper.GetContractInfo(ctx, contractAddress)
	require.NotNil(t, cInfo)

	assert.Equal(t, uint64(1), cInfo.CodeID)
	assert.Equal(t, oneAddress.String(), cInfo.Creator)
	assert.Equal(t, otherAddress.String(), cInfo.Admin)
	assert.Equal(t, "label", cInfo.Label)
	expHistory := []types.ContractCodeHistoryEntry{{
		Operation: types.ContractCodeHistoryOperationTypeInit,
		CodeID:    src.CodeID,
		Updated:   types.NewAbsoluteTxPosition(ctx),
		Msg:       src.Msg,
	}}
	assert.Equal(t, expHistory, wasmKeeper.GetContractHistory(ctx, contractAddress))
	// and event
	require.Len(t, em.Events(), 3, prettyEvents(t, em.Events()))
	require.Equal(t, types.EventTypeInstantiate, em.Events()[0].Type)
	require.Equal(t, types.WasmModuleEventType, em.Events()[1].Type)
	require.Equal(t, types.EventTypeGovContractResult, em.Events()[2].Type)
	require.Len(t, em.Events()[2].Attributes, 1)
	require.NotEmpty(t, em.Events()[2].Attributes[0])
}

func TestInstantiateProposal_NoAdmin(t *testing.T) {
	ctx, keepers := CreateTestInput(t, false, "staking")
	wasmKeeper := keepers.WasmKeeper
	err := wasmKeeper.SetParams(ctx, types.Params{
		CodeUploadAccess:             types.AllowNobody,
		InstantiateDefaultPermission: types.AccessTypeNobody,
	})
	require.NoError(t, err)

	wasmCode, err := os.ReadFile("./testdata/hackatom.wasm")
	require.NoError(t, err)

	require.NoError(t, wasmKeeper.importCode(ctx, 1,
		types.CodeInfoFixture(types.WithSHA256CodeHash(wasmCode)),
		wasmCode),
	)

	var oneAddress sdk.AccAddress = bytes.Repeat([]byte{0x1}, types.ContractAddrLen)

	specs := map[string]struct {
		srcAdmin string
		expErr   bool
	}{
		"empty admin": {
			srcAdmin: "",
		},
		"invalid admin": {
			srcAdmin: "invalid",
			expErr:   true,
		},
	}
	for name, spec := range specs {
		t.Run(name, func(t *testing.T) {
			src := types.InstantiateContractProposalFixture(func(p *types.InstantiateContractProposal) { //nolint:staticcheck // testing deprecated function
				p.CodeID = firstCodeID
				p.RunAs = oneAddress.String()
				p.Admin = spec.srcAdmin
				p.Label = myTestLabel
			})
			govAuthority := keepers.AccountKeeper.GetModuleAddress(govtypes.ModuleName).String()
			msgServer := govkeeper.NewMsgServerImpl(keepers.GovKeeper)
			// when
			contentMsg, gotErr := submitLegacyProposal(t, ctx, src, oneAddress.String(), govAuthority, msgServer)
			// then
			if spec.expErr {
				require.Error(t, gotErr)
				return
			}
			require.NoError(t, gotErr)
			// and when
			em := sdk.NewEventManager()
			_, err = msgServer.ExecLegacyContent(sdk.WrapSDKContext(ctx.WithEventManager(em)), v1.NewMsgExecLegacyContent(contentMsg.Content, govAuthority))
			// then
			require.NoError(t, err)
			contractAddr, err := sdk.AccAddressFromBech32("cosmos14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s4hmalr")
			require.NoError(t, err)

			cInfo := wasmKeeper.GetContractInfo(ctx, contractAddr)
			require.NotNil(t, cInfo)
			assert.Equal(t, uint64(1), cInfo.CodeID)
			assert.Equal(t, oneAddress.String(), cInfo.Creator)
			assert.Equal(t, "", cInfo.Admin)
			assert.Equal(t, myTestLabel, cInfo.Label)
			expHistory := []types.ContractCodeHistoryEntry{{
				Operation: types.ContractCodeHistoryOperationTypeInit,
				CodeID:    src.CodeID,
				Updated:   types.NewAbsoluteTxPosition(ctx),
				Msg:       src.Msg,
			}}
			assert.Equal(t, expHistory, wasmKeeper.GetContractHistory(ctx, contractAddr))
			// and event
			require.Len(t, em.Events(), 3, "%#v", em.Events())
			require.Equal(t, types.EventTypeInstantiate, em.Events()[0].Type)
			require.Equal(t, types.WasmModuleEventType, em.Events()[1].Type)
			require.Equal(t, types.EventTypeGovContractResult, em.Events()[2].Type)
			require.Len(t, em.Events()[2].Attributes, 1)
			require.NotEmpty(t, em.Events()[2].Attributes[0])
		})
	}
}

func TestStoreAndInstantiateContractProposal(t *testing.T) {
	ctx, keepers := CreateTestInput(t, false, "staking")
	wasmKeeper := keepers.WasmKeeper
	err := wasmKeeper.SetParams(ctx, types.Params{
		CodeUploadAccess:             types.AllowNobody,
		InstantiateDefaultPermission: types.AccessTypeNobody,
	})
	require.NoError(t, err)

	wasmCode, err := os.ReadFile("./testdata/hackatom.wasm")
	require.NoError(t, err)

	checksum, err := hex.DecodeString("5ca46abb8e9b1b754a5c906f9c0f4eec9121ee09e3cee55ea0faba54763706e2")
	require.NoError(t, err)

	var (
		oneAddress   sdk.AccAddress = bytes.Repeat([]byte{0x1}, types.ContractAddrLen)
		otherAddress sdk.AccAddress = bytes.Repeat([]byte{0x2}, types.ContractAddrLen)
	)

	src := types.StoreAndInstantiateContractProposalFixture(func(p *types.StoreAndInstantiateContractProposal) { //nolint:staticcheck // testing deprecated function
		p.WASMByteCode = wasmCode
		p.RunAs = oneAddress.String()
		p.Admin = otherAddress.String()
		p.Label = myTestLabel
		p.CodeHash = checksum
	})
	em := sdk.NewEventManager()

	// when
	mustSubmitAndExecuteLegacyProposal(t, ctx.WithEventManager(em), src, oneAddress.String(), keepers)

	// then
	contractAddr, err := sdk.AccAddressFromBech32("cosmos14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s4hmalr")
	require.NoError(t, err)

	cInfo := wasmKeeper.GetContractInfo(ctx, contractAddr)
	require.NotNil(t, cInfo)
	assert.Equal(t, oneAddress.String(), cInfo.Creator)
	assert.Equal(t, otherAddress.String(), cInfo.Admin)
	assert.Equal(t, myTestLabel, cInfo.Label)
	expHistory := []types.ContractCodeHistoryEntry{{
		Operation: types.ContractCodeHistoryOperationTypeInit,
		CodeID:    cInfo.CodeID,
		Updated:   types.NewAbsoluteTxPosition(ctx),
		Msg:       src.Msg,
	}}
	assert.Equal(t, expHistory, wasmKeeper.GetContractHistory(ctx, contractAddr))
	// and event
	require.Len(t, em.Events(), 5, "%#v", em.Events())
	require.Equal(t, types.EventTypeStoreCode, em.Events()[0].Type)
	require.Equal(t, types.EventTypePinCode, em.Events()[1].Type)
	require.Equal(t, types.EventTypeInstantiate, em.Events()[2].Type)
	require.Equal(t, types.WasmModuleEventType, em.Events()[3].Type)
	require.Equal(t, types.EventTypeGovContractResult, em.Events()[4].Type)
	require.Len(t, em.Events()[4].Attributes, 1)
	require.NotEmpty(t, em.Events()[4].Attributes[0])
}

func TestMigrateProposal(t *testing.T) {
	ctx, keepers := CreateTestInput(t, false, "staking")
	wasmKeeper := keepers.WasmKeeper
	err := wasmKeeper.SetParams(ctx, types.Params{
		CodeUploadAccess:             types.AllowNobody,
		InstantiateDefaultPermission: types.AccessTypeNobody,
	})
	require.NoError(t, err)

	wasmCode, err := os.ReadFile("./testdata/hackatom.wasm")
	require.NoError(t, err)

	codeInfoFixture := types.CodeInfoFixture(types.WithSHA256CodeHash(wasmCode))
	require.NoError(t, wasmKeeper.importCode(ctx, 1, codeInfoFixture, wasmCode))
	require.NoError(t, wasmKeeper.importCode(ctx, 2, codeInfoFixture, wasmCode))

	var (
		anyAddress   = DeterministicAccountAddress(t, 1)
		otherAddress = DeterministicAccountAddress(t, 2)
		contractAddr = BuildContractAddressClassic(1, 1)
	)

	contractInfo := types.ContractInfoFixture(func(c *types.ContractInfo) {
		c.Label = myTestLabel
		c.Admin = anyAddress.String()
		c.Created = types.NewAbsoluteTxPosition(ctx)
	})
	entries := []types.ContractCodeHistoryEntry{
		{Operation: types.ContractCodeHistoryOperationTypeInit, CodeID: 1, Updated: contractInfo.Created},
	}
	key, err := hex.DecodeString("636F6E666967")
	require.NoError(t, err)
	m := types.Model{Key: key, Value: []byte(`{"verifier":"AAAAAAAAAAAAAAAAAAAAAAAAAAA=","beneficiary":"AAAAAAAAAAAAAAAAAAAAAAAAAAA=","funder":"AQEBAQEBAQEBAQEBAQEBAQEBAQE="}`)}
	require.NoError(t, wasmKeeper.importContract(ctx, contractAddr, &contractInfo, []types.Model{m}, entries))

	migMsg := struct {
		Verifier sdk.AccAddress `json:"verifier"`
	}{Verifier: otherAddress}
	migMsgBz, err := json.Marshal(migMsg)
	require.NoError(t, err)

	src := &types.MigrateContractProposal{ //nolint:staticcheck // testing deprecated function
		Title:       "Foo",
		Description: "Bar",
		CodeID:      2,
		Contract:    contractAddr.String(),
		Msg:         migMsgBz,
	}

	em := sdk.NewEventManager()

	// when
	mustSubmitAndExecuteLegacyProposal(t, ctx.WithEventManager(em), src, anyAddress.String(), keepers)

	// then
	require.NoError(t, err)
	cInfo := wasmKeeper.GetContractInfo(ctx, contractAddr)
	require.NotNil(t, cInfo)
	assert.Equal(t, uint64(2), cInfo.CodeID)
	assert.Equal(t, anyAddress.String(), cInfo.Admin)
	assert.Equal(t, myTestLabel, cInfo.Label)
	expHistory := []types.ContractCodeHistoryEntry{{
		Operation: types.ContractCodeHistoryOperationTypeInit,
		CodeID:    firstCodeID,
		Updated:   types.NewAbsoluteTxPosition(ctx),
	}, {
		Operation: types.ContractCodeHistoryOperationTypeMigrate,
		CodeID:    src.CodeID,
		Updated:   types.NewAbsoluteTxPosition(ctx),
		Msg:       src.Msg,
	}}
	assert.Equal(t, expHistory, wasmKeeper.GetContractHistory(ctx, contractAddr))
	// and events emitted
	require.Len(t, em.Events(), 2)
	assert.Equal(t, types.EventTypeMigrate, em.Events()[0].Type)
	require.Equal(t, types.EventTypeGovContractResult, em.Events()[1].Type)
	require.Len(t, em.Events()[1].Attributes, 1)
	assert.Equal(t, types.AttributeKeyResultDataHex, em.Events()[1].Attributes[0].Key)
}

func TestExecuteProposal(t *testing.T) {
	ctx, keepers := CreateTestInput(t, false, "staking")
	bankKeeper := keepers.BankKeeper

	exampleContract := InstantiateHackatomExampleContract(t, ctx, keepers)
	contractAddr := exampleContract.Contract

	// check balance
	bal := bankKeeper.GetBalance(ctx, contractAddr, "denom")
	require.Equal(t, bal.Amount, sdk.NewInt(100))

	releaseMsg := struct {
		Release struct{} `json:"release"`
	}{}
	releaseMsgBz, err := json.Marshal(releaseMsg)
	require.NoError(t, err)

	// try with runAs that doesn't have pemission
	badSrc := &types.ExecuteContractProposal{ //nolint:staticcheck // testing deprecated function
		Title:       "First",
		Description: "Beneficiary has no permission to run",
		Contract:    contractAddr.String(),
		Msg:         releaseMsgBz,
		RunAs:       exampleContract.BeneficiaryAddr.String(),
	}

	// fails on store - this doesn't have permission
	govAuthority := keepers.AccountKeeper.GetModuleAddress(govtypes.ModuleName).String()
	msgServer := govkeeper.NewMsgServerImpl(keepers.GovKeeper)
	_, err = submitLegacyProposal(t, ctx, badSrc, exampleContract.BeneficiaryAddr.String(), govAuthority, msgServer)
	require.Error(t, err)

	// balance should not change
	bal = bankKeeper.GetBalance(ctx, contractAddr, "denom")
	require.Equal(t, bal.Amount, sdk.NewInt(100))

	// try again with the proper run-as
	src := &types.ExecuteContractProposal{ //nolint:staticcheck // testing deprecated function
		Title:       "Second",
		Description: "Verifier can execute",
		Contract:    contractAddr.String(),
		Msg:         releaseMsgBz,
		RunAs:       exampleContract.VerifierAddr.String(),
	}

	em := sdk.NewEventManager()

	// when
	mustSubmitAndExecuteLegacyProposal(t, ctx.WithEventManager(em), src, exampleContract.BeneficiaryAddr.String(), keepers)

	// balance should be empty (proper release)
	bal = bankKeeper.GetBalance(ctx, contractAddr, "denom")
	require.Equal(t, bal.Amount, sdk.NewInt(0))
}

func TestSudoProposal(t *testing.T) {
	ctx, keepers := CreateTestInput(t, false, "staking")
	bankKeeper := keepers.BankKeeper

	exampleContract := InstantiateHackatomExampleContract(t, ctx, keepers)
	contractAddr := exampleContract.Contract
	_, anyAddr := keyPubAddr()

	// check balance
	bal := bankKeeper.GetBalance(ctx, contractAddr, "denom")
	require.Equal(t, bal.Amount, sdk.NewInt(100))
	bal = bankKeeper.GetBalance(ctx, anyAddr, "denom")
	require.Equal(t, bal.Amount, sdk.NewInt(0))

	type StealMsg struct {
		Recipient string     `json:"recipient"`
		Amount    []sdk.Coin `json:"amount"`
	}
	stealMsg := struct {
		Steal StealMsg `json:"steal_funds"`
	}{Steal: StealMsg{
		Recipient: anyAddr.String(),
		Amount:    []sdk.Coin{sdk.NewInt64Coin("denom", 75)},
	}}
	stealMsgBz, err := json.Marshal(stealMsg)
	require.NoError(t, err)

	// sudo can do anything
	src := &types.SudoContractProposal{ //nolint:staticcheck // testing deprecated function
		Title:       "Sudo",
		Description: "Steal funds for the verifier",
		Contract:    contractAddr.String(),
		Msg:         stealMsgBz,
	}

	em := sdk.NewEventManager()

	// when
	mustSubmitAndExecuteLegacyProposal(t, ctx.WithEventManager(em), src, exampleContract.BeneficiaryAddr.String(), keepers)

	// balance should be empty (and verifier richer)
	bal = bankKeeper.GetBalance(ctx, contractAddr, "denom")
	require.Equal(t, bal.Amount, sdk.NewInt(25))
	bal = bankKeeper.GetBalance(ctx, anyAddr, "denom")
	require.Equal(t, bal.Amount, sdk.NewInt(75))
}

func TestAdminProposals(t *testing.T) {
	var (
		otherAddress sdk.AccAddress = bytes.Repeat([]byte{0x2}, types.ContractAddrLen)
		contractAddr                = BuildContractAddressClassic(1, 1)
	)
	wasmCode, err := os.ReadFile("./testdata/hackatom.wasm")
	require.NoError(t, err)

	specs := map[string]struct {
		state       types.ContractInfo
		srcProposal v1beta1.Content
		expAdmin    sdk.AccAddress
	}{
		"update with different admin": {
			state: types.ContractInfoFixture(),
			srcProposal: &types.UpdateAdminProposal{ //nolint:staticcheck // testing deprecated function
				Title:       "Foo",
				Description: "Bar",
				Contract:    contractAddr.String(),
				NewAdmin:    otherAddress.String(),
			},
			expAdmin: otherAddress,
		},
		"update with old admin empty": {
			state: types.ContractInfoFixture(func(info *types.ContractInfo) {
				info.Admin = ""
			}),
			srcProposal: &types.UpdateAdminProposal{ //nolint:staticcheck // testing deprecated function
				Title:       "Foo",
				Description: "Bar",
				Contract:    contractAddr.String(),
				NewAdmin:    otherAddress.String(),
			},
			expAdmin: otherAddress,
		},
		"clear admin": {
			state: types.ContractInfoFixture(),
			srcProposal: &types.ClearAdminProposal{ //nolint:staticcheck // testing deprecated function
				Title:       "Foo",
				Description: "Bar",
				Contract:    contractAddr.String(),
			},
			expAdmin: nil,
		},
		"clear with old admin empty": {
			state: types.ContractInfoFixture(func(info *types.ContractInfo) {
				info.Admin = ""
			}),
			srcProposal: &types.ClearAdminProposal{ //nolint:staticcheck // testing deprecated function
				Title:       "Foo",
				Description: "Bar",
				Contract:    contractAddr.String(),
			},
			expAdmin: nil,
		},
	}
	for msg, spec := range specs {
		t.Run(msg, func(t *testing.T) {
			ctx, keepers := CreateTestInput(t, false, "staking")
			wasmKeeper := keepers.WasmKeeper
			err := wasmKeeper.SetParams(ctx, types.Params{
				CodeUploadAccess:             types.AllowNobody,
				InstantiateDefaultPermission: types.AccessTypeNobody,
			})
			require.NoError(t, err)

			codeInfo := types.CodeInfoFixture(types.WithSHA256CodeHash(wasmCode))
			require.NoError(t, wasmKeeper.importCode(ctx, 1, codeInfo, wasmCode))

			entries := []types.ContractCodeHistoryEntry{
				{
					Operation: types.ContractCodeHistoryOperationTypeInit,
					CodeID:    1,
					Updated:   spec.state.Created,
				},
			}

			require.NoError(t, wasmKeeper.importContract(ctx, contractAddr, &spec.state, []types.Model{}, entries))

			// when
			mustSubmitAndExecuteLegacyProposal(t, ctx, spec.srcProposal, otherAddress.String(), keepers)

			// then
			cInfo := wasmKeeper.GetContractInfo(ctx, contractAddr)
			require.NotNil(t, cInfo)
			assert.Equal(t, spec.expAdmin.String(), cInfo.Admin)
		})
	}
}

func TestPinCodesProposal(t *testing.T) {
	ctx, keepers := CreateTestInput(t, false, "staking")
	wasmKeeper := keepers.WasmKeeper

	mock := wasmtesting.MockWasmer{
		StoreCodeFn:   wasmtesting.NoOpStoreCodeFn,
		AnalyzeCodeFn: wasmtesting.WithoutIBCAnalyzeFn,
	}
	var (
		hackatom           = StoreHackatomExampleContract(t, ctx, keepers)
		hackatomDuplicate  = StoreHackatomExampleContract(t, ctx, keepers)
		otherContract      = StoreRandomContract(t, ctx, keepers, &mock)
		gotPinnedChecksums []wasmvm.Checksum
	)
	checksumCollector := func(checksum wasmvm.Checksum) error {
		gotPinnedChecksums = append(gotPinnedChecksums, checksum)
		return nil
	}
	specs := map[string]struct {
		srcCodeIDs []uint64
		mockFn     func(checksum wasmvm.Checksum) error
		expPinned  []wasmvm.Checksum
		expErr     bool
	}{
		"pin one": {
			srcCodeIDs: []uint64{hackatom.CodeID},
			mockFn:     checksumCollector,
		},
		"pin multiple": {
			srcCodeIDs: []uint64{hackatom.CodeID, otherContract.CodeID},
			mockFn:     checksumCollector,
		},
		"pin same code id": {
			srcCodeIDs: []uint64{hackatom.CodeID, hackatomDuplicate.CodeID},
			mockFn:     checksumCollector,
		},
		"pin non existing code id": {
			srcCodeIDs: []uint64{999},
			mockFn:     checksumCollector,
			expErr:     true,
		},
		"pin empty code id list": {
			srcCodeIDs: []uint64{},
			mockFn:     checksumCollector,
			expErr:     true,
		},
		"wasmvm failed with error": {
			srcCodeIDs: []uint64{hackatom.CodeID},
			mockFn: func(_ wasmvm.Checksum) error {
				return errors.New("test, ignore")
			},
			expErr: true,
		},
	}
	parentCtx := ctx
	for msg, spec := range specs {
		t.Run(msg, func(t *testing.T) {
			myActorAddress := RandomBech32AccountAddress(t)
			gotPinnedChecksums = nil
			ctx, _ := parentCtx.CacheContext()
			mock.PinFn = spec.mockFn
			proposal := &types.PinCodesProposal{ //nolint:staticcheck // testing deprecated function
				Title:       "Foo",
				Description: "Bar",
				CodeIDs:     spec.srcCodeIDs,
			}

			govAuthority := keepers.AccountKeeper.GetModuleAddress(govtypes.ModuleName).String()
			msgServer := govkeeper.NewMsgServerImpl(keepers.GovKeeper)

			// when
			contentMsg, gotErr := submitLegacyProposal(t, ctx, proposal, myActorAddress, govAuthority, msgServer)
			if spec.expErr {
				require.Error(t, gotErr)
				return
			}
			require.NoError(t, gotErr)

			// and proposal execute
			_, err := msgServer.ExecLegacyContent(sdk.WrapSDKContext(ctx), v1.NewMsgExecLegacyContent(contentMsg.Content, govAuthority))
			require.NoError(t, err)

			// then
			for i := range spec.srcCodeIDs {
				c := wasmKeeper.GetCodeInfo(ctx, spec.srcCodeIDs[i])
				require.Equal(t, wasmvm.Checksum(c.CodeHash), gotPinnedChecksums[i])
			}
		})
	}
}

func TestUnpinCodesProposal(t *testing.T) {
	ctx, keepers := CreateTestInput(t, false, "staking")
	wasmKeeper := keepers.WasmKeeper

	mock := wasmtesting.MockWasmer{
		StoreCodeFn:   wasmtesting.NoOpStoreCodeFn,
		AnalyzeCodeFn: wasmtesting.WithoutIBCAnalyzeFn,
	}
	var (
		hackatom             = StoreHackatomExampleContract(t, ctx, keepers)
		hackatomDuplicate    = StoreHackatomExampleContract(t, ctx, keepers)
		otherContract        = StoreRandomContract(t, ctx, keepers, &mock)
		gotUnpinnedChecksums []wasmvm.Checksum
	)
	checksumCollector := func(checksum wasmvm.Checksum) error {
		gotUnpinnedChecksums = append(gotUnpinnedChecksums, checksum)
		return nil
	}
	specs := map[string]struct {
		srcCodeIDs  []uint64
		mockFn      func(checksum wasmvm.Checksum) error
		expUnpinned []wasmvm.Checksum
		expErr      bool
	}{
		"unpin one": {
			srcCodeIDs: []uint64{hackatom.CodeID},
			mockFn:     checksumCollector,
		},
		"unpin multiple": {
			srcCodeIDs: []uint64{hackatom.CodeID, otherContract.CodeID},
			mockFn:     checksumCollector,
		},
		"unpin same code id": {
			srcCodeIDs: []uint64{hackatom.CodeID, hackatomDuplicate.CodeID},
			mockFn:     checksumCollector,
		},
		"unpin non existing code id": {
			srcCodeIDs: []uint64{999},
			mockFn:     checksumCollector,
			expErr:     true,
		},
		"unpin empty code id list": {
			srcCodeIDs: []uint64{},
			mockFn:     checksumCollector,
			expErr:     true,
		},
		"wasmvm failed with error": {
			srcCodeIDs: []uint64{hackatom.CodeID},
			mockFn: func(_ wasmvm.Checksum) error {
				return errors.New("test, ignore")
			},
			expErr: true,
		},
	}
	parentCtx := ctx
	for msg, spec := range specs {
		t.Run(msg, func(t *testing.T) {
			gotUnpinnedChecksums = nil
			ctx, _ := parentCtx.CacheContext()
			mock.UnpinFn = spec.mockFn
			proposal := &types.UnpinCodesProposal{ //nolint:staticcheck // testing deprecated function
				Title:       "Foo",
				Description: "Bar",
				CodeIDs:     spec.srcCodeIDs,
			}

			govAuthority := keepers.AccountKeeper.GetModuleAddress(govtypes.ModuleName).String()
			msgServer := govkeeper.NewMsgServerImpl(keepers.GovKeeper)

			// when
			contentMsg, gotErr := submitLegacyProposal(t, ctx, proposal, RandomBech32AccountAddress(t), govAuthority, msgServer)
			if spec.expErr {
				require.Error(t, gotErr)
				return
			}
			require.NoError(t, gotErr)

			// and proposal execute
			_, err := msgServer.ExecLegacyContent(sdk.WrapSDKContext(ctx), v1.NewMsgExecLegacyContent(contentMsg.Content, govAuthority))
			require.NoError(t, err)

			// then
			for i := range spec.srcCodeIDs {
				c := wasmKeeper.GetCodeInfo(ctx, spec.srcCodeIDs[i])
				require.Equal(t, wasmvm.Checksum(c.CodeHash), gotUnpinnedChecksums[i])
			}
		})
	}
}

func TestUpdateInstantiateConfigProposal(t *testing.T) {
	ctx, keepers := CreateTestInput(t, false, "staking")
	wasmKeeper := keepers.WasmKeeper

	mock := wasmtesting.MockWasmer{
		StoreCodeFn:   wasmtesting.NoOpStoreCodeFn,
		AnalyzeCodeFn: wasmtesting.WithoutIBCAnalyzeFn,
	}
	anyAddress, err := sdk.AccAddressFromBech32("cosmos100dejzacpanrldpjjwksjm62shqhyss44jf5xz")
	require.NoError(t, err)

	withAddressAccessConfig := types.AccessTypeAnyOfAddresses.With(anyAddress)
	var (
		nobody      = StoreRandomContractWithAccessConfig(t, ctx, keepers, &mock, &types.AllowNobody)
		everybody   = StoreRandomContractWithAccessConfig(t, ctx, keepers, &mock, &types.AllowEverybody)
		withAddress = StoreRandomContractWithAccessConfig(t, ctx, keepers, &mock, &withAddressAccessConfig)
	)

	specs := map[string]struct {
		accessConfigUpdates []types.AccessConfigUpdate
		expErr              bool
	}{
		"update one": {
			accessConfigUpdates: []types.AccessConfigUpdate{
				{CodeID: nobody.CodeID, InstantiatePermission: types.AllowEverybody},
			},
		},
		"update multiple": {
			accessConfigUpdates: []types.AccessConfigUpdate{
				{CodeID: everybody.CodeID, InstantiatePermission: types.AllowNobody},
				{CodeID: nobody.CodeID, InstantiatePermission: withAddressAccessConfig},
				{CodeID: withAddress.CodeID, InstantiatePermission: types.AllowEverybody},
			},
		},
		"update same code id": {
			accessConfigUpdates: []types.AccessConfigUpdate{
				{CodeID: everybody.CodeID, InstantiatePermission: types.AllowNobody},
				{CodeID: everybody.CodeID, InstantiatePermission: types.AllowEverybody},
			},
			expErr: true,
		},
		"update non existing code id": {
			accessConfigUpdates: []types.AccessConfigUpdate{
				{CodeID: 100, InstantiatePermission: types.AllowNobody},
				{CodeID: everybody.CodeID, InstantiatePermission: types.AllowEverybody},
			},
			expErr: true,
		},
		"update empty list": {
			accessConfigUpdates: make([]types.AccessConfigUpdate, 0),
			expErr:              true,
		},
	}
	parentCtx := ctx
	for msg, spec := range specs {
		t.Run(msg, func(t *testing.T) {
			ctx, _ := parentCtx.CacheContext()

			updates := make([]types.AccessConfigUpdate, 0)
			for _, cu := range spec.accessConfigUpdates {
				updates = append(updates, types.AccessConfigUpdate{
					CodeID:                cu.CodeID,
					InstantiatePermission: cu.InstantiatePermission,
				})
			}

			govAuthority := keepers.AccountKeeper.GetModuleAddress(govtypes.ModuleName).String()
			msgServer := govkeeper.NewMsgServerImpl(keepers.GovKeeper)
			proposal := &types.UpdateInstantiateConfigProposal{ //nolint:staticcheck // testing deprecated function
				Title:               "Foo",
				Description:         "Bar",
				AccessConfigUpdates: updates,
			}

			// when
			contentMsg, gotErr := submitLegacyProposal(t, ctx, proposal, RandomBech32AccountAddress(t), govAuthority, msgServer)
			if spec.expErr {
				require.Error(t, gotErr)
				return
			}
			require.NoError(t, gotErr)

			// and proposal execute
			_, err := msgServer.ExecLegacyContent(sdk.WrapSDKContext(ctx), v1.NewMsgExecLegacyContent(contentMsg.Content, govAuthority))
			require.NoError(t, err)

			// then
			for i := range spec.accessConfigUpdates {
				c := wasmKeeper.GetCodeInfo(ctx, spec.accessConfigUpdates[i].CodeID)
				require.Equal(t, spec.accessConfigUpdates[i].InstantiatePermission, c.InstantiateConfig)
			}
		})
	}
}
