package cli

import (
	"encoding/hex"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/qredo/fusionchain/x/wasm/ioutils"
	"github.com/qredo/fusionchain/x/wasm/types"
)

func TestParseVerificationFlags(t *testing.T) {
	mySender := sdk.MustAccAddressFromBech32("cosmos1wyqh3n50ecatjg4vww5crmtd0nmyzusnwckw4at4gluc0m5m477q4arfek")

	specs := map[string]struct {
		srcPath     string
		args        []string
		expErr      bool
		expSource   string
		expBuilder  string
		expCodeHash string
	}{
		"gov store zipped": {
			srcPath: "../../keeper/testdata/hackatom.wasm.gzip",
			args: []string{
				"--instantiate-everybody=true", "--code-hash=5ca46abb8e9b1b754a5c906f9c0f4eec9121ee09e3cee55ea0faba54763706e2",
				"--code-source-url=https://example.com", "--builder=cosmwasm/workspace-optimizer:0.12.11",
			},
			expBuilder:  "cosmwasm/workspace-optimizer:0.12.11",
			expSource:   "https://example.com",
			expCodeHash: "5ca46abb8e9b1b754a5c906f9c0f4eec9121ee09e3cee55ea0faba54763706e2",
		},
		"gov store raw": {
			srcPath: "../../keeper/testdata/hackatom.wasm",
			args: []string{
				"--instantiate-everybody=true", "--code-hash=5ca46abb8e9b1b754a5c906f9c0f4eec9121ee09e3cee55ea0faba54763706e2",
				"--code-source-url=https://example.com", "--builder=cosmwasm/workspace-optimizer:0.12.11",
			},
			expBuilder:  "cosmwasm/workspace-optimizer:0.12.11",
			expSource:   "https://example.com",
			expCodeHash: "5ca46abb8e9b1b754a5c906f9c0f4eec9121ee09e3cee55ea0faba54763706e2",
		},
		"gov store checksum mismatch": {
			srcPath: "../../keeper/testdata/hackatom.wasm",
			args: []string{
				"--instantiate-everybody=true", "--code-hash=0000de5e9b93b52e514c74ce87ccddb594b9bcd33b7f1af1bb6da63fc883917b",
				"--code-source-url=https://example.com", "--builder=cosmwasm/workspace-optimizer:0.12.11",
			},
			expErr: true,
		},
	}
	for name, spec := range specs {
		t.Run(name, func(t *testing.T) {
			flagSet := ProposalStoreAndInstantiateContractCmd().Flags()
			require.NoError(t, flagSet.Parse(spec.args))

			gotMsg, err := parseStoreCodeArgs(spec.srcPath, mySender.String(), flagSet)
			require.NoError(t, err)
			require.True(t, ioutils.IsGzip(gotMsg.WASMByteCode))

			gotSource, gotBuilder, gotCodeHash, gotErr := parseVerificationFlags(gotMsg.WASMByteCode, flagSet)
			if spec.expErr {
				require.Error(t, gotErr)
				return
			}
			require.NoError(t, gotErr)
			assert.Equal(t, spec.expSource, gotSource)
			assert.Equal(t, spec.expBuilder, gotBuilder)
			assert.Equal(t, spec.expCodeHash, hex.EncodeToString(gotCodeHash))
		})
	}
}

func TestParseAccessConfigFlags(t *testing.T) {
	specs := map[string]struct {
		args   []string
		expCfg *types.AccessConfig
		expErr bool
	}{
		"nobody": {
			args:   []string{"--instantiate-nobody=true"},
			expCfg: &types.AccessConfig{Permission: types.AccessTypeNobody},
		},
		"everybody": {
			args:   []string{"--instantiate-everybody=true"},
			expCfg: &types.AccessConfig{Permission: types.AccessTypeEverybody},
		},
		"only address": {
			args:   []string{"--instantiate-only-address=cosmos1vx8knpllrj7n963p9ttd80w47kpacrhuts497x"},
			expErr: true,
		},
		"only address - invalid": {
			args:   []string{"--instantiate-only-address=foo"},
			expErr: true,
		},
		"any of address": {
			args:   []string{"--instantiate-anyof-addresses=cosmos1vx8knpllrj7n963p9ttd80w47kpacrhuts497x,cosmos14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s4hmalr"},
			expCfg: &types.AccessConfig{Permission: types.AccessTypeAnyOfAddresses, Addresses: []string{"cosmos1vx8knpllrj7n963p9ttd80w47kpacrhuts497x", "cosmos14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s4hmalr"}},
		},
		"any of address - invalid": {
			args:   []string{"--instantiate-anyof-addresses=cosmos1vx8knpllrj7n963p9ttd80w47kpacrhuts497x,foo"},
			expErr: true,
		},
		"not set": {
			args: []string{},
		},
	}
	for name, spec := range specs {
		t.Run(name, func(t *testing.T) {
			flags := StoreCodeCmd().Flags()
			require.NoError(t, flags.Parse(spec.args))
			gotCfg, gotErr := parseAccessConfigFlags(flags)
			if spec.expErr {
				require.Error(t, gotErr)
				return
			}
			require.NoError(t, gotErr)
			assert.Equal(t, spec.expCfg, gotCfg)
		})
	}
}
