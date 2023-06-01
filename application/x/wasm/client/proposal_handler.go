package client

import (
	govclient "github.com/cosmos/cosmos-sdk/x/gov/client"

	"gitlab.qredo.com/qrdochain/fusionchain/x/wasm/client/cli"
	"gitlab.qredo.com/qrdochain/fusionchain/x/wasm/client/rest"
)

// ProposalHandlers define the wasm cli proposal types and rest handler.
var ProposalHandlers = []govclient.ProposalHandler{
	govclient.NewProposalHandler(cli.ProposalStoreCodeCmd, rest.StoreCodeProposalHandler),
	govclient.NewProposalHandler(cli.ProposalInstantiateContractCmd, rest.InstantiateProposalHandler),
	govclient.NewProposalHandler(cli.ProposalMigrateContractCmd, rest.MigrateProposalHandler),
	govclient.NewProposalHandler(cli.ProposalExecuteContractCmd, rest.ExecuteProposalHandler),
	govclient.NewProposalHandler(cli.ProposalSudoContractCmd, rest.SudoProposalHandler),
	govclient.NewProposalHandler(cli.ProposalUpdateContractAdminCmd, rest.UpdateContractAdminProposalHandler),
	govclient.NewProposalHandler(cli.ProposalClearContractAdminCmd, rest.ClearContractAdminProposalHandler),
	govclient.NewProposalHandler(cli.ProposalPinCodesCmd, rest.PinCodeProposalHandler),
	govclient.NewProposalHandler(cli.ProposalUnpinCodesCmd, rest.UnpinCodeProposalHandler),
	govclient.NewProposalHandler(cli.ProposalUpdateInstantiateConfigCmd, rest.UpdateInstantiateConfigProposalHandler),
}
