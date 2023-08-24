package cli

import (
	"fmt"
	"time"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	// "github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/qredo/fusionchain/x/identity/types"
)

var (
	DefaultRelativePacketTimeoutTimestamp = uint64((time.Duration(10) * time.Minute).Nanoseconds())
)

// GetTxCmd returns the transaction commands for this module
func GetTxCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("%s transactions subcommands", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	cmd.AddCommand(CmdNewWorkspace())
	cmd.AddCommand(CmdAddWorkspaceOwner())
	cmd.AddCommand(CmdRemoveWorkspaceOwner())
	cmd.AddCommand(CmdApproveAction())
	cmd.AddCommand(CmdNewKeyring())
	cmd.AddCommand(CmdAddKeyringParty())
	cmd.AddCommand(CmdAppendChildWorkspace())
	cmd.AddCommand(CmdNewChildWorkspace())
	// this line is used by starport scaffolding # 1

	return cmd
}
