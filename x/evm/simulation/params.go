package simulation

// DONTCOVER

import (
	"fmt"
	"math/rand"

	amino "github.com/cosmos/cosmos-sdk/codec"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
	"github.com/evmos/ethermint/x/evm/types"
)

// ParamChanges defines the parameters that can be modified by param change proposals
// on the simulation.
func ParamChanges(r *rand.Rand) []simtypes.ParamChange {
	return []simtypes.ParamChange{
		simulation.NewSimParamChange(types.ModuleName, string(types.ParamStoreKeyExtraEIPs),
			func(r *rand.Rand) string {
				extraEIPs := GenExtraEIPs(r)
				amino := amino.NewLegacyAmino()
				bz, err := amino.MarshalJSON(extraEIPs)
				if err != nil {
					panic(err)
				}
				return string(bz)
			},
		),
		simulation.NewSimParamChange(types.ModuleName, string(types.ParamStoreKeyEnableCreate),
			func(r *rand.Rand) string {
				return fmt.Sprintf("%v", GenEnableCreate(r))
			},
		),
		simulation.NewSimParamChange(types.ModuleName, string(types.ParamStoreKeyEnableCall),
			func(r *rand.Rand) string {
				return fmt.Sprintf("%v", GenEnableCall(r))
			},
		),
	}
}
