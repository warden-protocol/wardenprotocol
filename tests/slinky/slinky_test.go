package slinky_test

import (
	"fmt"
	"testing"

	"github.com/cosmos/cosmos-sdk/types/module/testutil"
	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/cosmos/cosmos-sdk/x/bank"
	"github.com/cosmos/cosmos-sdk/x/gov"
	"github.com/strangelove-ventures/interchaintest/v8"
	"github.com/strangelove-ventures/interchaintest/v8/chain/cosmos"
	"github.com/strangelove-ventures/interchaintest/v8/ibc"
	"github.com/stretchr/testify/suite"

	"github.com/skip-mev/slinky/tests/integration"
	marketmapmodule "github.com/skip-mev/slinky/x/marketmap"
	"github.com/skip-mev/slinky/x/oracle"
	oracletypes "github.com/skip-mev/slinky/x/oracle/types"
)

var (
	dockerImage = ibc.DockerImage{
		// NOTE: "Repository" field is the name of the image tag generated in the tests/justfile job "test-slinky".
		Repository: "warden/warden-protocol",
		Version:    "latest",
		UidGid:     "1025:1025",
	}

	numValidators = 4
	numFullNodes  = 0
	noHostMount   = false

	oracleImage = ibc.DockerImage{
		Repository: "ghcr.io/skip-mev/slinky-sidecar",
		Version:    "latest",
		UidGid:     "1000:1000",
	}
	encodingConfig = testutil.MakeTestEncodingConfig(
		bank.AppModuleBasic{},
		oracle.AppModuleBasic{},
		gov.AppModuleBasic{},
		auth.AppModuleBasic{},
		marketmapmodule.AppModuleBasic{},
	)

	defaultGenesisKV = []cosmos.GenesisKV{
		{
			Key:   "consensus.params.abci.vote_extensions_enable_height",
			Value: "2",
		},
		{
			Key:   "consensus.params.block.max_gas",
			Value: "1000000000",
		},
		{
			Key:   "app_state.oracle",
			Value: oracletypes.DefaultGenesisState(),
		},
	}

	denom = "uward"
	spec  = &interchaintest.ChainSpec{
		ChainName:     "slinky",
		Name:          "slinky",
		NumValidators: &numValidators,
		NumFullNodes:  &numFullNodes,
		NoHostMount:   &noHostMount,
		ChainConfig: ibc.ChainConfig{
			EncodingConfig: &encodingConfig,
			Images: []ibc.DockerImage{
				dockerImage,
			},
			Type:                "cosmos",
			Name:                "slinky",
			Denom:               denom,
			ChainID:             "chain-id-0",
			Bin:                 "wardend",
			Bech32Prefix:        "warden",
			CoinType:            "118",
			GasPrices:           fmt.Sprintf("1%s", denom),
			GasAdjustment:       2.0,
			TrustingPeriod:      "112h",
			NoHostMount:         false,
			SkipGenTx:           false,
			PreGenesis:          nil,
			ModifyGenesis:       cosmos.ModifyGenesis(defaultGenesisKV),
			ConfigFileOverrides: nil,
		},
	}
)

func TestSlinkyOracleIntegration(t *testing.T) {
	baseSuite := integration.NewSlinkyIntegrationSuite(
		spec,
		oracleImage,
		integration.WithDenom(denom),
	)

	suite.Run(t, integration.NewSlinkyOracleIntegrationSuite(baseSuite))
}
