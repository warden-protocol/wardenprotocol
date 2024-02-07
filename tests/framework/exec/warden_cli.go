package exec

import (
	"context"
	"fmt"
	"testing"
	"time"

	"github.com/stretchr/testify/require"
	"github.com/warden-protocol/wardenprotocol/tests/framework/iowriter"
)

type Wardend struct {
	BinPath string
	Append  string
}

func NewWardend(node *WardenNode, name string) *Wardend {
	return &Wardend{
		BinPath: node.BinPath,
		Append:  fmt.Sprintf("--node tcp://127.0.0.1:%d --chain-id warden --from alice --yes", node.CometPortRPC()),
	}
}

func (cli *Wardend) Run(t *testing.T, command string) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cmd := &Exec{
		Bin:    "sh",
		Args:   []string{"-c", fmt.Sprintf("%s %s %s", cli.BinPath, command, cli.Append)},
		Stdout: &iowriter.IOWriter{},
		Stderr: &iowriter.IOWriter{},
	}
	err := cmd.Run(ctx)
	require.NoError(t, err)
}
