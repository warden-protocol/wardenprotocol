package cmd

import (
	"fmt"
	"path"

	"github.com/qredo/fusionchain/cmd/scaffolder/casing"
	"github.com/qredo/fusionchain/cmd/scaffolder/editor"
	"github.com/spf13/cobra"
)

type MsgCmdParams struct {
	ModuleName string
	MsgName    string
}

func msgCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "msg [module] [name]",
		Short: "Scaffold a new msg",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			params := MsgCmdParams{
				ModuleName: args[0],
				MsgName:    args[1],
			}

			if err := txProto(params); err != nil {
				return err
			}

			if err := cliTx(params); err != nil {
				return err
			}

			if err := moduleSimulation(params); err != nil {
				return err
			}

			if err := codec(params); err != nil {
				return err
			}

			if err := tx(params); err != nil {
				return err
			}

			if err := msgServer(params); err != nil {
				return err
			}

			if err := simulation(params); err != nil {
				return err
			}

			if err := typesMessage(params); err != nil {
				return err
			}

			if err := typesMessageTest(params); err != nil {
				return err
			}

			return nil
		},
	}
}

func txProto(params MsgCmdParams) error {
	msg := fmt.Sprintf(`// TODO: document %[1]s
rpc %[1]s (Msg%[1]s) returns (Msg%[1]sResponse);
`, params.MsgName)

	addMsgToService := editor.Replacer{
		Substitute: msg,
	}

	msgs := fmt.Sprintf(`
message Msg%[1]s {
  string creator = 1;
}

message Msg%[1]sResponse {}`, params.MsgName)
	appendNewMessages := editor.Appender{
		What: msgs,
	}

	return editor.Pipeline(
		path.Join("./proto/fusionchain", params.ModuleName, "tx.proto"),
		[]editor.Modifier{
			addMsgToService,
			appendNewMessages,
		},
	)
}

func cliTx(params MsgCmdParams) error {
	msg := fmt.Sprintf(`cmd.AddCommand(Cmd%[1]s())`, params.MsgName)
	addNewCmd := editor.Replacer{
		Substitute: msg,
	}
	return editor.Pipeline(
		path.Join("x/", params.ModuleName, "/client/cli/tx.go"),
		[]editor.Modifier{
			addNewCmd,
		},
	)
}

func moduleSimulation(params MsgCmdParams) error {
	constants := fmt.Sprintf(`opWeightMsg%[1]s = "op_weight_msg_%[2]s"
// TODO: Determine the simulation weight value
defaultWeightMsg%[1]s int = 100`, params.MsgName, casing.ToSnakeCase(params.MsgName))
	addConstants := editor.Replacer{
		Matcher:    "simapp/module/const",
		Substitute: constants,
	}

	operations := fmt.Sprintf(`var weightMsg%[1]s int
simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsg%[1]s, &weightMsg%[1]s, nil,
	func(_ *rand.Rand) {
		weightMsg%[1]s = defaultWeightMsg%[1]s
	},
)
operations = append(operations, simulation.NewWeightedOperation(
	weightMsg%[1]s,
	%[2]ssimulation.SimulateMsg%[1]s(am.accountKeeper, am.bankKeeper, am.keeper),
))
`, params.MsgName, params.ModuleName)
	addOperations := editor.Replacer{
		Matcher:    "simapp/module/operation",
		Substitute: operations,
	}

	return editor.Pipeline(
		path.Join("x/", params.ModuleName, "/module_simulation.go"),
		[]editor.Modifier{
			addConstants,
			addOperations,
		},
	)
}

func codec(params MsgCmdParams) error {
	msg := fmt.Sprintf(`cdc.RegisterConcrete(&Msg%[1]s{}, "%[2]s/Msg%[1]s", nil)`, params.MsgName, params.ModuleName)
	addMsgToCodec := editor.Replacer{
		Matcher:    "2",
		Substitute: msg,
	}

	impl := fmt.Sprintf(`registry.RegisterImplementations((*sdk.Msg)(nil),
	&Msg%[1]s{},
)`, params.MsgName)
	addImplToCodec := editor.Replacer{
		Matcher:    "3",
		Substitute: impl,
	}

	return editor.Pipeline(
		path.Join("x/", params.ModuleName, "types/codec.go"),
		[]editor.Modifier{
			addMsgToCodec,
			addImplToCodec,
		},
	)
}

func tx(params MsgCmdParams) error {
	tmpl := `package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
	"github.com/qredo/fusionchain/x/{{ .ModuleName }}/types"
)

var _ = strconv.Itoa(0)

func Cmd{{ .MsgName }}() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "{{ .MsgName | ToKebabCase }}",
		Short: "Broadcast message {{ .MsgName | ToKebabCase }}",
		Args:  cobra.ExactArgs(0),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsg{{ .MsgName }}(
				clientCtx.GetFromAddress().String(),
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
`
	return editor.NewFile(
		path.Join("x", params.ModuleName, "client/cli", fmt.Sprintf("tx_%s.go", casing.ToSnakeCase(params.MsgName))),
		tmpl,
		params,
	)
}

func msgServer(params MsgCmdParams) error {
	tmpl := `package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/{{ .ModuleName }}/types"
)

func (k msgServer) {{ .MsgName }}(goCtx context.Context, msg *types.Msg{{ .MsgName }}) (*types.Msg{{ .MsgName }}Response, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Handling the message
	_ = ctx

	return &types.Msg{{ .MsgName }}Response{}, nil
}
`
	return editor.NewFile(
		path.Join("x", params.ModuleName, "keeper", fmt.Sprintf("msg_server_%s.go", casing.ToSnakeCase(params.MsgName))),
		tmpl,
		params,
	)
}

func simulation(params MsgCmdParams) error {
	tmpl := `package simulation

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/qredo/fusionchain/x/{{ .ModuleName }}/keeper"
	"github.com/qredo/fusionchain/x/{{ .ModuleName }}/types"
)

func SimulateMsg{{ .MsgName }}(
	_ types.AccountKeeper,
	_ types.BankKeeper,
	_ keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		msg := &types.Msg{{ .MsgName }}{
			Creator: simAccount.Address.String(),
		}

		// TODO: Handling the {{ .MsgName }} simulation

		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "{{ .MsgName }} simulation not implemented"), nil, nil
	}
}
`
	return editor.NewFile(
		path.Join("x", params.ModuleName, "simulation", fmt.Sprintf("%s.go", casing.ToSnakeCase(params.MsgName))),
		tmpl,
		params,
	)
}

func typesMessage(params MsgCmdParams) error {
	tmpl := `package types

import (
	errorsmod "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsg{{ .MsgName }} = "{{ .MsgName | ToSnakeCase }}"

var _ sdk.Msg = &Msg{{ .MsgName }}{}

func NewMsg{{ .MsgName }}(creator string) *Msg{{ .MsgName }} {
	return &Msg{{ .MsgName }}{
		Creator: creator,
	}
}

func (msg *Msg{{ .MsgName }}) Route() string {
	return RouterKey
}

func (msg *Msg{{ .MsgName }}) Type() string {
	return TypeMsg{{ .MsgName }}
}

func (msg *Msg{{ .MsgName }}) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *Msg{{ .MsgName }}) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *Msg{{ .MsgName }}) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return errorsmod.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
`
	return editor.NewFile(
		path.Join("x", params.ModuleName, "types", fmt.Sprintf("message_%s.go", casing.ToSnakeCase(params.MsgName))),
		tmpl,
		params,
	)
}

func typesMessageTest(params MsgCmdParams) error {
	tmpl := `package types

import (
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/stretchr/testify/require"
	"github.com/qredo/fusionchain/testutil/sample"
)

func TestMsg{{ .MsgName }}_ValidateBasic(t *testing.T) {
	tests := []struct {
		name string
		msg  Msg{{ .MsgName }}
		err  error
	}{
		{
			name: "invalid address",
			msg: Msg{{ .MsgName }}{
				Creator: "invalid_address",
			},
			err: sdkerrors.ErrInvalidAddress,
		}, {
			name: "valid address",
			msg: Msg{{ .MsgName }}{
				Creator: sample.AccAddress(),
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := tt.msg.ValidateBasic()
			if tt.err != nil {
				require.ErrorIs(t, err, tt.err)
				return
			}
			require.NoError(t, err)
		})
	}
}
`
	return editor.NewFile(
		path.Join("x", params.ModuleName, "types", fmt.Sprintf("message_%s_test.go", casing.ToSnakeCase(params.MsgName))),
		tmpl,
		params,
	)
}
