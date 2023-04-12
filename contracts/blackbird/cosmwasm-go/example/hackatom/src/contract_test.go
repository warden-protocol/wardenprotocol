package src

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"testing"

	"github.com/CosmWasm/cosmwasm-go/std/math"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/CosmWasm/cosmwasm-go/std"
	"github.com/CosmWasm/cosmwasm-go/std/mock"
	"github.com/CosmWasm/cosmwasm-go/std/types"
)

func mustEncode(t *testing.T, msg interface{}) []byte {
	bz, err := json.Marshal(msg)
	require.NoError(t, err)
	return bz
}

const VERIFIER = "verifies"
const BENEFICIARY = "benefits"
const FUNDER = "creator"

// this can be used for a quick setup if you don't have nay other requirements
func defaultInit(t *testing.T, funds []types.Coin) *std.Deps {
	deps := mock.Deps(funds)
	env := mock.Env()
	info := mock.Info(FUNDER, funds)
	initMsg := InitMsg{
		Verifier:    VERIFIER,
		Beneficiary: BENEFICIARY,
	}
	res, err := Instantiate(deps, env, info, mustEncode(t, initMsg))
	require.NoError(t, err)
	require.NotNil(t, res)
	return deps
}

func TestInitAndQuery(t *testing.T) {
	deps := mock.Deps(nil)
	env := mock.Env()
	info := mock.Info(FUNDER, nil)
	initMsg := InitMsg{
		Verifier:    VERIFIER,
		Beneficiary: BENEFICIARY,
	}
	res, err := Instantiate(deps, env, info, mustEncode(t, initMsg))
	require.NoError(t, err)
	require.NotNil(t, res)
	assert.Equal(t, 0, len(res.Messages))
	require.Equal(t, 1, len(res.Attributes))
	attr := res.Attributes[0]
	assert.Equal(t, "Let the", attr.Key)
	assert.Equal(t, "hacking begin", attr.Value)

	// test verifier
	qmsg := []byte(`{"verifier":{}}`)
	data, err := Query(deps, env, qmsg)
	require.NoError(t, err)
	var qres VerifierResponse
	err = json.Unmarshal(data, &qres)
	require.NoError(t, err)
	assert.Equal(t, VERIFIER, qres.Verifier)

	// test recurse
	recurse := QueryMsg{Recurse: &Recurse{
		Depth: 0,
		Work:  1,
	}}

	qmsg, err = recurse.MarshalJSON()
	require.NoError(t, err)

	data, err = Query(deps, env, qmsg)
	require.NoError(t, err)

	recurseResp := new(RecurseResponse)
	err = recurseResp.UnmarshalJSON(data)
	require.NoError(t, err)

	expected := sha256.Sum256([]byte(env.Contract.Address))
	require.Equal(t, recurseResp.Hashed, hex.EncodeToString(expected[:]))
}

func TestPanic(t *testing.T) {
	deps := defaultInit(t, nil)
	env := mock.Env()
	info := mock.Info(FUNDER, nil)
	handleMsg := []byte(`{"panic":{}}`)
	require.Panics(t, func() {
		_, _ = Execute(deps, env, info, handleMsg)
	})
}

func TestRelease(t *testing.T) {
	cases := map[string]struct {
		signer string
		funds  []types.Coin
		valid  bool
	}{
		"verifier releases": {
			signer: VERIFIER,
			funds:  []types.Coin{types.NewCoin(math.NewUint128FromUint64(765432), "wei")},
			valid:  true,
		},
		"random fails": {
			signer: BENEFICIARY,
			funds:  []types.Coin{types.NewCoin(math.NewUint128FromUint64(765432), "wei")},
			valid:  false,
		},
	}

	for name, tc := range cases {
		t.Run(name, func(t *testing.T) {
			// TODO: figure out how to set query value and then query from the contract
			deps := defaultInit(t, tc.funds)
			env := mock.Env()
			info := mock.Info(tc.signer, nil)
			handleMsg := []byte(`{"release":{}}`)
			res, err := Execute(deps, env, info, handleMsg)
			if !tc.valid {
				require.Error(t, err)
				require.Equal(t, "Unauthorized", err.Error())
			} else {
				require.NoError(t, err)
				require.NotNil(t, res)

				require.Equal(t, 1, len(res.Messages))
				msg := res.Messages[0]
				expected := types.SendMsg{
					ToAddress: BENEFICIARY,
					Amount:    tc.funds,
				}.ToMsg()
				assert.Equal(t, expected, msg.Msg)
				assert.Equal(t, 2, len(res.Attributes))
				assert.Equal(t, []types.EventAttribute{{"action", "release"}, {"destination", BENEFICIARY}}, res.Attributes)
			}
		})
	}
}

func TestUserErrorsInAPICalls(t *testing.T) {
	_, err := executeUserErrorsInApiCall(mock.Deps(nil))
	require.NoError(t, err)
}

func TestRangeQuery(t *testing.T) {
	deps := defaultInit(t, nil)
	env := mock.Env()

	queryMsg := []byte(`{"test_range":{}}`)
	data, err := Query(deps, env, queryMsg)
	require.NoError(t, err)

	var state State
	err = json.Unmarshal(data, &state)
	require.NoError(t, err)
	assert.Equal(t, VERIFIER, state.Verifier)
	assert.Equal(t, FUNDER, state.Funder)
	assert.Equal(t, BENEFICIARY, state.Beneficiary)
}
