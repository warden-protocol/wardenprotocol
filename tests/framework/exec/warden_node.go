package exec

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"testing"
	"time"

	"google.golang.org/grpc"
	insecurecreds "google.golang.org/grpc/credentials/insecure"

	"github.com/stretchr/testify/require"
	"github.com/warden-protocol/wardenprotocol/tests/framework/files"
	"github.com/warden-protocol/wardenprotocol/tests/framework/iowriter"
	"github.com/warden-protocol/wardenprotocol/tests/framework/ports"
	acttypes "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	wardentypes "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

type WardenNode struct {
	BinPath string
	Home    string
	Stdout  *iowriter.IOWriter
	Stderr  *iowriter.IOWriter

	apiPort      int
	grpcPort     int
	cometPortRPC int
	cometP2PRPC  int
}

func NewWardenNode(t *testing.T, binPath string) *WardenNode {
	home := t.TempDir()
	return &WardenNode{
		BinPath: binPath,
		Home:    home,
		Stdout:  new(iowriter.IOWriter),
		Stderr:  new(iowriter.IOWriter),
	}
}

func (w *WardenNode) run(ctx context.Context, args ...string) error {
	cmd := &Exec{
		Bin:    w.BinPath,
		Args:   args,
		Stdout: w.Stdout,
		Stderr: w.Stderr,
	}
	return cmd.Run(ctx)
}

func (w *WardenNode) Start(t *testing.T, ctx context.Context, snapshot string) {
	p := ports.ReservePorts(t, 4)

	w.apiPort = p.Port(t, 0)
	w.grpcPort = p.Port(t, 1)
	w.cometPortRPC = p.Port(t, 2)
	w.cometP2PRPC = p.Port(t, 3)

	err := files.CloneDir(w.Home, snapshot, struct {
		APIPort      int
		GRPCPort     int
		CometPortRPC int
		CometP2PRPC  int
	}{

		APIPort:      w.apiPort,
		GRPCPort:     w.grpcPort,
		CometPortRPC: w.cometPortRPC,
		CometP2PRPC:  w.cometP2PRPC,
	})
	require.NoError(t, err)

	p.Free(t)

	err = w.run(ctx, "--log_no_color", "start", "--home", w.Home, "--x-crisis-skip-assert-invariants")
	if errors.Is(ctx.Err(), context.Canceled) {
		return
	}

	require.NoError(t, err)
}

func (w *WardenNode) CometPortRPC() int {
	return w.cometPortRPC
}

func (w *WardenNode) WaitRunnning(t *testing.T) {
	require.Eventually(t, func() bool {
		return strings.Contains(w.Stdout.String(), "height=2")
	}, 5*time.Second, 5*time.Millisecond, "warden node never became running")
}

func (w *WardenNode) grpcAddr() string {
	return fmt.Sprintf("127.0.0.1:%d", w.grpcPort)
}

type GRPCClient struct {
	Warden wardentypes.QueryClient
	Act    acttypes.QueryClient
}

func (w *WardenNode) GRPCClient(t *testing.T) *GRPCClient {
	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(insecurecreds.NewCredentials()),
	}

	grpcConn, err := grpc.Dial(w.grpcAddr(), opts...)
	require.NoError(t, err)

	return &GRPCClient{
		Warden: wardentypes.NewQueryClient(grpcConn),
		Act:    acttypes.NewQueryClient(grpcConn),
	}
}
