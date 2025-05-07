package exec

import (
	"context"
	"fmt"
	"strings"
	"testing"
	"time"

	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/tests/framework/iowriter"
)

type Wardend struct {
	BinPath     string
	Name        string
	QueryAppend string
	TxAppend    string

	Node       *WardenNode
	address    string
	privateKey string
}

func NewWardend(node *WardenNode, name string) *Wardend {
	return &Wardend{
		BinPath:     node.BinPath,
		QueryAppend: fmt.Sprintf("--node tcp://127.0.0.1:%d -o json", node.CometPortRPC()),
		TxAppend:    fmt.Sprintf("--from %s --yes --node tcp://127.0.0.1:%d --home %s --chain-id warden_1337-1 --keyring-backend test --keyring-dir %s", name, node.CometPortRPC(), node.Home, node.Home),
		Node:        node,
		Name:        name,
	}
}

func (cli *Wardend) Tx(t *testing.T, command string) sdk.TxResponse {
	ctx, cancel := context.WithTimeout(t.Context(), 5*time.Second)
	defer cancel()

	cmd := &Exec{
		Bin:    "sh",
		Args:   []string{"-c", fmt.Sprintf("%s tx %s %s | %s q wait-tx %s", cli.BinPath, command, cli.TxAppend, cli.BinPath, cli.QueryAppend)},
		Stdout: &iowriter.IOWriter{},
		Stderr: &iowriter.IOWriter{},
	}
	err := cmd.Run(ctx)
	require.NoError(t, err)

	output := cmd.Stdout.String()

	var txResponse sdk.TxResponse
	require.NoError(t, codec.NewProtoCodec(nil).UnmarshalJSON([]byte(output), &txResponse))

	return txResponse
}

func (cli *Wardend) Address(t *testing.T) string {
	if cli.address != "" {
		return cli.address
	}

	ctx, cancel := context.WithTimeout(t.Context(), 1*time.Second)
	defer cancel()

	cmd := &Exec{
		Bin:    "sh",
		Args:   []string{"-c", fmt.Sprintf("%s keys show %s -a --keyring-backend test --keyring-dir %s", cli.BinPath, cli.Name, cli.Node.Home)},
		Stdout: &iowriter.IOWriter{},
		Stderr: &iowriter.IOWriter{},
	}
	err := cmd.Run(ctx)
	require.NoError(t, err)

	output := cmd.Stdout.String()
	cli.address = strings.TrimSpace(output)

	return cli.address
}

func (cli *Wardend) PrivateKey(t *testing.T) string {
	if cli.privateKey != "" {
		return cli.privateKey
	}

	ctx, cancel := context.WithTimeout(t.Context(), 1*time.Second)
	defer cancel()

	cmd := &Exec{
		Bin:    "sh",
		Args:   []string{"-c", fmt.Sprintf("%s keys unsafe-export-eth-key %s --keyring-backend test --keyring-dir %s", cli.BinPath, cli.Name, cli.Node.Home)},
		Stdout: &iowriter.IOWriter{},
		Stderr: &iowriter.IOWriter{},
	}
	err := cmd.Run(ctx)
	require.NoError(t, err)

	output := cmd.Stdout.String()
	cli.privateKey = strings.TrimSpace(output)

	return cli.privateKey
}
