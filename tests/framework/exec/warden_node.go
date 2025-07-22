package exec

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"testing"
	"time"

	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc"
	insecurecreds "google.golang.org/grpc/credentials/insecure"

	"github.com/warden-protocol/wardenprotocol/tests/framework/files"
	"github.com/warden-protocol/wardenprotocol/tests/framework/iowriter"
	"github.com/warden-protocol/wardenprotocol/tests/framework/ports"
	acttypes "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	wardentypes "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

type WardenNode struct {
	BinPath string
	Home    string
	Stdout  *iowriter.IOWriter
	Stderr  *iowriter.IOWriter

	apiPort       int
	grpcPort      int
	cometPortRPC  int
	cometP2PRPC   int
	jsonRPCPort   int
	jsonRPCWSPort int
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

func (w *WardenNode) Start(t *testing.T, snapshot string) {
	p := ports.ReservePorts(t, 6)

	w.apiPort = p.Port(t, 0)
	w.grpcPort = p.Port(t, 1)
	w.cometPortRPC = p.Port(t, 2)
	w.cometP2PRPC = p.Port(t, 3)
	w.jsonRPCPort = p.Port(t, 4)
	w.jsonRPCWSPort = p.Port(t, 5)

	err := files.CloneDir(w.Home, snapshot, struct {
		APIPort       int
		GRPCPort      int
		CometPortRPC  int
		CometP2PRPC   int
		JSONRPCPort   int
		JSONRPCWSPort int
	}{
		APIPort:       w.apiPort,
		GRPCPort:      w.grpcPort,
		CometPortRPC:  w.cometPortRPC,
		CometP2PRPC:   w.cometP2PRPC,
		JSONRPCPort:   w.jsonRPCPort,
		JSONRPCWSPort: w.jsonRPCWSPort,
	})
	require.NoError(t, err)

	p.Free(t)

	err = w.run(t.Context(), "--log_no_color", "start", "--home", w.Home)
	if errors.Is(t.Context().Err(), context.Canceled) {
		return
	}

	require.NoError(t, err)
}

func (w *WardenNode) CometPortRPC() int {
	return w.cometPortRPC
}

func (w *WardenNode) WaitRunning(t *testing.T) {
	require.Eventually(t, func() bool {
		return strings.Contains(w.Stdout.String(), "height=2")
	}, 5*time.Second, 5*time.Millisecond, "warden node never became running")
}

func (w *WardenNode) PrintLogsAtTheEnd(t *testing.T, filters []string) {
	t.Cleanup(func() {
		if len(filters) == 0 {
			t.Logf("Node logs: \n %s", w.Stdout.String())
			return
		}

		// Split the logs into individual lines
		logs := strings.Split(w.Stdout.String(), "\n")
		// Filter out lines that contain filter
		var filteredLogs []string

		for _, line := range logs {
			for _, filter := range filters {
				if strings.Contains(line, filter) {
					filteredLogs = append(filteredLogs, line)
					break
				}
			}
		}
		// Join the filtered lines back and print them
		t.Logf("Node logs: \n %s", strings.Join(filteredLogs, "\n"))
	})
}

type GRPCClient struct {
	Warden wardentypes.QueryClient
	Act    acttypes.QueryClient
	Bank   banktypes.QueryClient
	Auth   authtypes.QueryClient
}

func (w *WardenNode) GRPCClient(t *testing.T) *GRPCClient {
	opts := []grpc.DialOption{
		grpc.WithTransportCredentials(insecurecreds.NewCredentials()),
	}

	grpcConn, err := grpc.NewClient(w.grpcAddr(), opts...)
	require.NoError(t, err)

	return &GRPCClient{
		Warden: wardentypes.NewQueryClient(grpcConn),
		Act:    acttypes.NewQueryClient(grpcConn),
		Bank:   banktypes.NewQueryClient(grpcConn),
		Auth:   authtypes.NewQueryClient(grpcConn),
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

func (w *WardenNode) grpcAddr() string {
	return fmt.Sprintf("127.0.0.1:%d", w.grpcPort)
}

func (w *WardenNode) jsonRpcAddr() string {
	return fmt.Sprintf("http://127.0.0.1:%d", w.jsonRPCPort)
}
