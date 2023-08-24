// Command scaffolder helps in generating code needed to add new messages and
// queries to existing Cosmos SDK modules.
//
// We are developing this to be a simpler version of Ignite compatibile with
// Ethermint chains and focused on our needs.
package main

import (
	"github.com/qredo/fusionchain/cmd/scaffolder/cmd"
)

func main() {
	cmd.Execute()
}
