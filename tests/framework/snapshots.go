package framework

import (
	"slices"

	evmtypes "github.com/cosmos/evm/x/vm/types"

	"github.com/warden-protocol/wardenprotocol/precompiles"
	snapshots "github.com/warden-protocol/wardenprotocol/tests/framework/snapshot"
)

var (
	SnapshotBase = snapshots.BuildOptions{
		Name:           "snapshot-base",
		ChainID:        "warden_1337-1",
		Denom:          "award",
		KeyringBackend: "test",
		Accounts: []snapshots.AccountOptions{
			{
				Name:         "alice",
				Amount:       "10000000000000000000000000000000000000award",
				StakedAmount: "1000000000000000000000award",
			},
		},
	}

	SnapshotKeychain = snapshots.BuildOptions{
		Name:           "snapshot-keychain",
		ChainID:        "warden_1337-1",
		Denom:          "award",
		KeyringBackend: "test",
		Accounts: []snapshots.AccountOptions{
			{
				Name:         "val",
				Amount:       "10000000000000000000000000000000000000award",
				StakedAmount: "1000000000000000000000award",
			},
			{
				Name:   "writer",
				Amount: "10000000000000000000000000000000000000award",
			},
			{
				Name:   "bob",
				Amount: "10000000000000000000000000000000000000award",
			},
		},
		Spaces: []snapshots.SpaceOptions{
			{Owner: "bob"},
		},
		Keychains: []snapshots.KeychainOptions{
			{Creator: "writer", Name: "Test Keychain", Fees: "{\"key_req\":[{\"denom\":\"award\",\"amount\":\"2\"}],\"sig_req\":[{\"denom\":\"award\",\"amount\": \"2\"}]}"},
		},
	}

	SnapshotManyUsers = snapshots.BuildOptions{
		Name:           "snapshot-many-users",
		ChainID:        "warden_1337-1",
		Denom:          "award",
		KeyringBackend: "test",
		Accounts: []snapshots.AccountOptions{
			{
				Name:         "alice",
				Amount:       "10000000000000000000000000000000000000award",
				StakedAmount: "1000000000000000000000award",
			},
			{
				Name:   "bob",
				Amount: "10000000000000000000000000000000000000award",
			},
			{
				Name:   "charlie",
				Amount: "10000000000000000000000000000000000000award",
			},
			{Name: "dave"},
			{Name: "erin"},
			{Name: "frank"},
		},
		Spaces: []snapshots.SpaceOptions{
			{Owner: "alice"},
		},
	}

	SnapshotPrecompiles = snapshots.BuildOptions{
		Name:           "snapshot-precompiles",
		ChainID:        "warden_1337-1",
		Denom:          "award",
		KeyringBackend: "test",
		Accounts: []snapshots.AccountOptions{
			{
				Name:         "alice",
				Amount:       "10000000000000000000000000000000000000award",
				StakedAmount: "1000000000000000000000award",
			},
			{
				Name:   "bob",
				Amount: "10000000000000000000000000000000000000award",
			},
			{Name: "dave"},
		},
		Spaces: []snapshots.SpaceOptions{
			{Owner: "alice"},
		},
		Precompiles: slices.Concat(
			evmtypes.AvailableStaticPrecompiles,
			precompiles.WardenPrecompilesAddresses(),
		),
		Plugins: []string{"echo"},
	}
)
