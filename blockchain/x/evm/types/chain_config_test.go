package types

import (
	"testing"

	sdkmath "cosmossdk.io/math"
	"github.com/stretchr/testify/require"

	"github.com/ethereum/go-ethereum/common"
)

var defaultEIP150Hash = common.Hash{}.String()

func newIntPtr(i int64) *sdkmath.Int {
	v := sdkmath.NewInt(i)
	return &v
}

func TestChainConfigValidate(t *testing.T) {
	testCases := []struct {
		name     string
		config   ChainConfig
		expError bool
	}{
		{"default", DefaultChainConfig(), false},
		{
			"valid",
			ChainConfig{
				HomesteadBlock:      newIntPtr(0),
				DAOForkBlock:        newIntPtr(0),
				EIP150Block:         newIntPtr(0),
				EIP150Hash:          defaultEIP150Hash,
				EIP155Block:         newIntPtr(0),
				EIP158Block:         newIntPtr(0),
				ByzantiumBlock:      newIntPtr(0),
				ConstantinopleBlock: newIntPtr(0),
				PetersburgBlock:     newIntPtr(0),
				IstanbulBlock:       newIntPtr(0),
				MuirGlacierBlock:    newIntPtr(0),
				BerlinBlock:         newIntPtr(0),
				LondonBlock:         newIntPtr(0),
				CancunBlock:         newIntPtr(0),
				ShanghaiBlock:       newIntPtr(0),
			},
			false,
		},
		{
			"valid with nil values",
			ChainConfig{
				HomesteadBlock:      nil,
				DAOForkBlock:        nil,
				EIP150Block:         nil,
				EIP150Hash:          defaultEIP150Hash,
				EIP155Block:         nil,
				EIP158Block:         nil,
				ByzantiumBlock:      nil,
				ConstantinopleBlock: nil,
				PetersburgBlock:     nil,
				IstanbulBlock:       nil,
				MuirGlacierBlock:    nil,
				BerlinBlock:         nil,
				LondonBlock:         nil,
				CancunBlock:         nil,
				ShanghaiBlock:       nil,
			},
			false,
		},
		{
			"empty",
			ChainConfig{},
			false,
		},
		{
			"invalid HomesteadBlock",
			ChainConfig{
				HomesteadBlock: newIntPtr(-1),
			},
			true,
		},
		{
			"invalid DAOForkBlock",
			ChainConfig{
				HomesteadBlock: newIntPtr(0),
				DAOForkBlock:   newIntPtr(-1),
			},
			true,
		},
		{
			"invalid EIP150Block",
			ChainConfig{
				HomesteadBlock: newIntPtr(0),
				DAOForkBlock:   newIntPtr(0),
				EIP150Block:    newIntPtr(-1),
			},
			true,
		},
		{
			"invalid EIP150Hash",
			ChainConfig{
				HomesteadBlock: newIntPtr(0),
				DAOForkBlock:   newIntPtr(0),
				EIP150Block:    newIntPtr(0),
				EIP150Hash:     "  ",
			},
			true,
		},
		{
			"invalid EIP155Block",
			ChainConfig{
				HomesteadBlock: newIntPtr(0),
				DAOForkBlock:   newIntPtr(0),
				EIP150Block:    newIntPtr(0),
				EIP150Hash:     defaultEIP150Hash,
				EIP155Block:    newIntPtr(-1),
			},
			true,
		},
		{
			"invalid EIP158Block",
			ChainConfig{
				HomesteadBlock: newIntPtr(0),
				DAOForkBlock:   newIntPtr(0),
				EIP150Block:    newIntPtr(0),
				EIP150Hash:     defaultEIP150Hash,
				EIP155Block:    newIntPtr(0),
				EIP158Block:    newIntPtr(-1),
			},
			true,
		},
		{
			"invalid ByzantiumBlock",
			ChainConfig{
				HomesteadBlock: newIntPtr(0),
				DAOForkBlock:   newIntPtr(0),
				EIP150Block:    newIntPtr(0),
				EIP150Hash:     defaultEIP150Hash,
				EIP155Block:    newIntPtr(0),
				EIP158Block:    newIntPtr(0),
				ByzantiumBlock: newIntPtr(-1),
			},
			true,
		},
		{
			"invalid ConstantinopleBlock",
			ChainConfig{
				HomesteadBlock:      newIntPtr(0),
				DAOForkBlock:        newIntPtr(0),
				EIP150Block:         newIntPtr(0),
				EIP150Hash:          defaultEIP150Hash,
				EIP155Block:         newIntPtr(0),
				EIP158Block:         newIntPtr(0),
				ByzantiumBlock:      newIntPtr(0),
				ConstantinopleBlock: newIntPtr(-1),
			},
			true,
		},
		{
			"invalid PetersburgBlock",
			ChainConfig{
				HomesteadBlock:      newIntPtr(0),
				DAOForkBlock:        newIntPtr(0),
				EIP150Block:         newIntPtr(0),
				EIP150Hash:          defaultEIP150Hash,
				EIP155Block:         newIntPtr(0),
				EIP158Block:         newIntPtr(0),
				ByzantiumBlock:      newIntPtr(0),
				ConstantinopleBlock: newIntPtr(0),
				PetersburgBlock:     newIntPtr(-1),
			},
			true,
		},
		{
			"invalid IstanbulBlock",
			ChainConfig{
				HomesteadBlock:      newIntPtr(0),
				DAOForkBlock:        newIntPtr(0),
				EIP150Block:         newIntPtr(0),
				EIP150Hash:          defaultEIP150Hash,
				EIP155Block:         newIntPtr(0),
				EIP158Block:         newIntPtr(0),
				ByzantiumBlock:      newIntPtr(0),
				ConstantinopleBlock: newIntPtr(0),
				PetersburgBlock:     newIntPtr(0),
				IstanbulBlock:       newIntPtr(-1),
			},
			true,
		},
		{
			"invalid MuirGlacierBlock",
			ChainConfig{
				HomesteadBlock:      newIntPtr(0),
				DAOForkBlock:        newIntPtr(0),
				EIP150Block:         newIntPtr(0),
				EIP150Hash:          defaultEIP150Hash,
				EIP155Block:         newIntPtr(0),
				EIP158Block:         newIntPtr(0),
				ByzantiumBlock:      newIntPtr(0),
				ConstantinopleBlock: newIntPtr(0),
				PetersburgBlock:     newIntPtr(0),
				IstanbulBlock:       newIntPtr(0),
				MuirGlacierBlock:    newIntPtr(-1),
			},
			true,
		},
		{
			"invalid BerlinBlock",
			ChainConfig{
				HomesteadBlock:      newIntPtr(0),
				DAOForkBlock:        newIntPtr(0),
				EIP150Block:         newIntPtr(0),
				EIP150Hash:          defaultEIP150Hash,
				EIP155Block:         newIntPtr(0),
				EIP158Block:         newIntPtr(0),
				ByzantiumBlock:      newIntPtr(0),
				ConstantinopleBlock: newIntPtr(0),
				PetersburgBlock:     newIntPtr(0),
				IstanbulBlock:       newIntPtr(0),
				MuirGlacierBlock:    newIntPtr(0),
				BerlinBlock:         newIntPtr(-1),
			},
			true,
		},
		{
			"invalid LondonBlock",
			ChainConfig{
				HomesteadBlock:      newIntPtr(0),
				DAOForkBlock:        newIntPtr(0),
				EIP150Block:         newIntPtr(0),
				EIP150Hash:          defaultEIP150Hash,
				EIP155Block:         newIntPtr(0),
				EIP158Block:         newIntPtr(0),
				ByzantiumBlock:      newIntPtr(0),
				ConstantinopleBlock: newIntPtr(0),
				PetersburgBlock:     newIntPtr(0),
				IstanbulBlock:       newIntPtr(0),
				MuirGlacierBlock:    newIntPtr(0),
				BerlinBlock:         newIntPtr(0),
				LondonBlock:         newIntPtr(-1),
			},
			true,
		},
		{
			"invalid ArrowGlacierBlock",
			ChainConfig{
				HomesteadBlock:      newIntPtr(0),
				DAOForkBlock:        newIntPtr(0),
				EIP150Block:         newIntPtr(0),
				EIP150Hash:          defaultEIP150Hash,
				EIP155Block:         newIntPtr(0),
				EIP158Block:         newIntPtr(0),
				ByzantiumBlock:      newIntPtr(0),
				ConstantinopleBlock: newIntPtr(0),
				PetersburgBlock:     newIntPtr(0),
				IstanbulBlock:       newIntPtr(0),
				MuirGlacierBlock:    newIntPtr(0),
				BerlinBlock:         newIntPtr(0),
				LondonBlock:         newIntPtr(0),
				ArrowGlacierBlock:   newIntPtr(-1),
			},
			true,
		},
		{
			"invalid GrayGlacierBlock",
			ChainConfig{
				HomesteadBlock:      newIntPtr(0),
				DAOForkBlock:        newIntPtr(0),
				EIP150Block:         newIntPtr(0),
				EIP150Hash:          defaultEIP150Hash,
				EIP155Block:         newIntPtr(0),
				EIP158Block:         newIntPtr(0),
				ByzantiumBlock:      newIntPtr(0),
				ConstantinopleBlock: newIntPtr(0),
				PetersburgBlock:     newIntPtr(0),
				IstanbulBlock:       newIntPtr(0),
				MuirGlacierBlock:    newIntPtr(0),
				BerlinBlock:         newIntPtr(0),
				LondonBlock:         newIntPtr(0),
				ArrowGlacierBlock:   newIntPtr(0),
				GrayGlacierBlock:    newIntPtr(-1),
			},
			true,
		},
		{
			"invalid MergeNetsplitBlock",
			ChainConfig{
				HomesteadBlock:      newIntPtr(0),
				DAOForkBlock:        newIntPtr(0),
				EIP150Block:         newIntPtr(0),
				EIP150Hash:          defaultEIP150Hash,
				EIP155Block:         newIntPtr(0),
				EIP158Block:         newIntPtr(0),
				ByzantiumBlock:      newIntPtr(0),
				ConstantinopleBlock: newIntPtr(0),
				PetersburgBlock:     newIntPtr(0),
				IstanbulBlock:       newIntPtr(0),
				MuirGlacierBlock:    newIntPtr(0),
				BerlinBlock:         newIntPtr(0),
				LondonBlock:         newIntPtr(0),
				ArrowGlacierBlock:   newIntPtr(0),
				GrayGlacierBlock:    newIntPtr(0),
				MergeNetsplitBlock:  newIntPtr(-1),
			},
			true,
		},
		{
			"invalid fork order - skip HomesteadBlock",
			ChainConfig{
				DAOForkBlock:        newIntPtr(0),
				EIP150Block:         newIntPtr(0),
				EIP150Hash:          defaultEIP150Hash,
				EIP155Block:         newIntPtr(0),
				EIP158Block:         newIntPtr(0),
				ByzantiumBlock:      newIntPtr(0),
				ConstantinopleBlock: newIntPtr(0),
				PetersburgBlock:     newIntPtr(0),
				IstanbulBlock:       newIntPtr(0),
				MuirGlacierBlock:    newIntPtr(0),
				BerlinBlock:         newIntPtr(0),
				LondonBlock:         newIntPtr(0),
			},
			true,
		},
		{
			"invalid ShanghaiBlock",
			ChainConfig{
				HomesteadBlock:      newIntPtr(0),
				DAOForkBlock:        newIntPtr(0),
				EIP150Block:         newIntPtr(0),
				EIP150Hash:          defaultEIP150Hash,
				EIP155Block:         newIntPtr(0),
				EIP158Block:         newIntPtr(0),
				ByzantiumBlock:      newIntPtr(0),
				ConstantinopleBlock: newIntPtr(0),
				PetersburgBlock:     newIntPtr(0),
				IstanbulBlock:       newIntPtr(0),
				MuirGlacierBlock:    newIntPtr(0),
				BerlinBlock:         newIntPtr(0),
				LondonBlock:         newIntPtr(0),
				ArrowGlacierBlock:   newIntPtr(0),
				GrayGlacierBlock:    newIntPtr(0),
				MergeNetsplitBlock:  newIntPtr(0),
				ShanghaiBlock:       newIntPtr(-1),
			},
			true,
		},
		{
			"invalid CancunBlock",
			ChainConfig{
				HomesteadBlock:      newIntPtr(0),
				DAOForkBlock:        newIntPtr(0),
				EIP150Block:         newIntPtr(0),
				EIP150Hash:          defaultEIP150Hash,
				EIP155Block:         newIntPtr(0),
				EIP158Block:         newIntPtr(0),
				ByzantiumBlock:      newIntPtr(0),
				ConstantinopleBlock: newIntPtr(0),
				PetersburgBlock:     newIntPtr(0),
				IstanbulBlock:       newIntPtr(0),
				MuirGlacierBlock:    newIntPtr(0),
				BerlinBlock:         newIntPtr(0),
				LondonBlock:         newIntPtr(0),
				ArrowGlacierBlock:   newIntPtr(0),
				GrayGlacierBlock:    newIntPtr(0),
				MergeNetsplitBlock:  newIntPtr(0),
				ShanghaiBlock:       newIntPtr(0),
				CancunBlock:         newIntPtr(-1),
			},
			true,
		},
	}

	for _, tc := range testCases {
		err := tc.config.Validate()

		if tc.expError {
			require.Error(t, err, tc.name)
		} else {
			require.NoError(t, err, tc.name)
		}
	}
}
