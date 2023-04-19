package systest

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"path/filepath"
	"testing"

	mocks "github.com/CosmWasm/wasmvm/api"
	"github.com/CosmWasm/wasmvm/types"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/CosmWasm/cosmwasm-go/example/hackatom/src"
	"github.com/CosmWasm/cosmwasm-go/systest"
)

var CONTRACT = filepath.Join("..", "hackatom.wasm")

const VERIFIER = "verifies"
const BENEFICIARY = "benefits"
const FUNDER = "creator"

// this can be used for a quick setup if you don't have nay other requirements
func defaultInit(t *testing.T, funds []types.Coin) *systest.Instance {
	// wasm gas is huge now, like 150000 gas for one wasm op, rather than 1 before.
	// all numbers here must be measured in wasm gas. (note that one Terragas = 1_000_000_000_000
	// is benchmarked at roughly 1ms of execution time), so we offer 15ms execution time here as huge!
	// https://github.com/CosmWasm/cosmwasm/blob/main/docs/GAS.md
	instance := systest.NewInstance(t, CONTRACT, 15_000_000_000_000, funds)

	env := mocks.MockEnv()
	info := mocks.MockInfo(FUNDER, funds)
	initMsg := src.InitMsg{
		Verifier:    VERIFIER,
		Beneficiary: BENEFICIARY,
	}
	res, gas, err := instance.Instantiate(env, info, initMsg)
	require.NoError(t, err)
	require.NotNil(t, res)
	fmt.Printf("Instantiate gas: %d\n", gas)
	return &instance
}

func TestInitAndQuery(t *testing.T) {
	instance := systest.NewInstance(t, CONTRACT, 15_000_000_000_000, nil)

	env := mocks.MockEnv()
	info := mocks.MockInfo(FUNDER, nil)
	initMsg := src.InitMsg{
		Verifier:    VERIFIER,
		Beneficiary: BENEFICIARY,
	}
	res, _, err := instance.Instantiate(env, info, initMsg)
	require.NoError(t, err)
	require.NotNil(t, res)
	assert.Equal(t, 0, len(res.Messages))
	require.Equal(t, 1, len(res.Attributes))
	attr := res.Attributes[0]
	assert.Equal(t, "Let the", attr.Key)
	assert.Equal(t, "hacking begin", attr.Value)

	data, gas, err := instance.Query(env, &src.QueryMsg{Verifier: &struct{}{}})
	require.NoError(t, err)
	fmt.Printf("Query gas: %d\n", gas)

	var qres src.VerifierResponse
	err = json.Unmarshal(data, &qres)
	require.NoError(t, err)
	assert.Equal(t, VERIFIER, qres.Verifier)
}

func TestPanic(t *testing.T) {
	deps := defaultInit(t, nil)
	env := mocks.MockEnv()
	info := mocks.MockInfo(FUNDER, nil)
	_, _, err := deps.Execute(env, info, &src.HandleMsg{Panic: &struct{}{}})
	require.Error(t, err)
}

func TestRelease(t *testing.T) {
	cases := map[string]struct {
		signer string
		funds  []types.Coin
		valid  bool
	}{
		"verifier releases": {VERIFIER, systest.NewCoins(765432, "wei"), true},
		"random fails":      {BENEFICIARY, systest.NewCoins(123456, "wei"), false},
	}

	for name, tc := range cases {
		t.Run(name, func(t *testing.T) {
			deps := defaultInit(t, tc.funds)
			env := mocks.MockEnv()
			info := mocks.MockInfo(tc.signer, nil)
			res, gas, err := deps.Execute(env, info, &src.HandleMsg{Release: &struct{}{}})
			fmt.Printf("Execute gas: %d\n", gas)

			if !tc.valid {
				require.Error(t, err)
				require.Equal(t, "Unauthorized", err.Error())
			} else {
				require.NoError(t, err)
				require.NotNil(t, res)

				require.Equal(t, 1, len(res.Messages))
				msg := res.Messages[0].Msg
				expected := types.CosmosMsg{Bank: &types.BankMsg{Send: &types.SendMsg{
					ToAddress: BENEFICIARY,
					Amount:    tc.funds,
				}}}
				assert.Equal(t, expected, msg)
				assert.Equal(t, 2, len(res.Attributes))
				assert.Equal(t, []types.EventAttribute{{"action", "release"}, {"destination", BENEFICIARY}}, res.Attributes)
			}
		})
	}
}

func TestQueryOther(t *testing.T) {
	contractFunds := []types.Coin{
		types.NewCoin(1000, "wei"),
		types.NewCoin(555, "uatom"),
	}
	deps := defaultInit(t, contractFunds)
	env := mocks.MockEnv()

	// TODO: set some balances
	richFunds := []types.Coin{
		types.NewCoin(123456789, "uatom"),
		types.NewCoin(9876542, "satoshi"),
		types.NewCoin(557755, "utgd"),
	}
	deps.SetQuerierBalance("rich", richFunds)

	cases := map[string]struct {
		account string
		balance []types.Coin
	}{
		"contract self": {mocks.MOCK_CONTRACT_ADDR, contractFunds},
		"random":        {"random", nil},
		"rich":          {"rich", richFunds},
	}

	for name, tc := range cases {
		t.Run(name, func(t *testing.T) {

			raw, gas, err := deps.Query(env, &src.QueryMsg{OtherBalance: &src.OtherBalance{Address: tc.account}})
			fmt.Printf("Query gas: %d\n", gas)

			require.NoError(t, err)
			var res types.AllBalancesResponse
			err = json.Unmarshal(raw, &res)
			require.NoError(t, err)
			require.Equal(t, types.Coins(tc.balance), res.Amount)
		})
	}
}

func TestQueryRecurse(t *testing.T) {
	contractFunds := []types.Coin{
		types.NewCoin(1000, "wei"),
		types.NewCoin(555, "uatom"),
	}
	deps := defaultInit(t, contractFunds)
	env := mocks.MockEnv()

	msg := src.QueryMsg{
		Recurse: &src.Recurse{
			Depth: 0,
			Work:  2000,
		},
	}

	res, gas, err := deps.Query(env, msg)
	require.NoError(t, err)
	t.Logf("gas used: %d", gas)

	resp := new(src.RecurseResponse)
	require.NoError(t, resp.UnmarshalJSON(res))

	expectedHash := sha256.Sum256([]byte(env.Contract.Address))

	require.Equal(t, hex.EncodeToString(expectedHash[:]), resp.Hashed)
}

func TestUserErrorsInAPICalls(t *testing.T) {
	instance := defaultInit(t, nil)
	_, gas, err := instance.Execute(mocks.MockEnv(), mocks.MockInfo(FUNDER, nil), &src.HandleMsg{
		UserErrorsInApiCalls: &struct{}{},
	})

	t.Logf("consumed gas: %d", gas)
	require.NoError(t, err)
}

// Let's test what gets returned when address validation fails
func TestApiErrorInInit(t *testing.T) {
	instance := systest.NewInstance(t, CONTRACT, 15_000_000_000_000, nil)

	env := mocks.MockEnv()
	info := mocks.MockInfo(FUNDER, nil)
	initMsg := src.InitMsg{
		Verifier:    "This string is way way way way way too long and must produce an error",
		Beneficiary: BENEFICIARY,
	}
	_, _, err := instance.Instantiate(env, info, initMsg)
	require.Error(t, err)
	assert.Equal(t, "Generic error: addr_canonicalize errored: human encoding too long", err.Error())
}

func TestRangeQuery(t *testing.T) {
	deps := defaultInit(t, nil)
	env := mocks.MockEnv()

	data, gas, err := deps.Query(env, &src.QueryMsg{TestRange: &struct{}{}})
	require.NoError(t, err)
	t.Logf("gas used: %d", gas)

	var state src.State
	err = json.Unmarshal(data, &state)
	require.NoError(t, err)
	assert.Equal(t, VERIFIER, state.Verifier)
	assert.Equal(t, FUNDER, state.Funder)
	assert.Equal(t, BENEFICIARY, state.Beneficiary)
}

func TestMigrate(t *testing.T) {
	const expectedVerifier = "gucci"
	i := defaultInit(t, nil)
	res, gas, err := i.Migrate(mocks.MockEnv(), &src.MigrateMsg{Verifier: expectedVerifier})
	require.NoError(t, err)
	require.Equal(t, res.Data, []byte("migrated"))
	t.Logf("migrate gas: %d", gas)

	respBytes, _, err := i.Query(mocks.MockEnv(), &src.QueryMsg{Verifier: &struct{}{}})
	require.NoError(t, err)

	newVerifier := new(src.VerifierResponse)
	require.NoError(t, newVerifier.UnmarshalJSON(respBytes))

	require.Equal(t, expectedVerifier, newVerifier.Verifier)
}
