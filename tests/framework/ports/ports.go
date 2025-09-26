package ports

import (
	"net"
	"testing"

	"github.com/stretchr/testify/require"
)

type FreePort struct {
	ports []int
	lsns  []net.Listener
}

func ReservePorts(t *testing.T, count int) *FreePort {
	t.Helper()

	var (
		ports []int
		lsns  []net.Listener
	)

	for range count {
		ln, err := new(net.ListenConfig).Listen(t.Context(), "tcp", "127.0.0.1:0")
		require.NoError(t, err)

		ports = append(ports, ln.Addr().(*net.TCPAddr).Port)
		lsns = append(lsns, ln)
	}

	return &FreePort{
		ports: ports,
		lsns:  lsns,
	}
}

func (f *FreePort) Port(t *testing.T, n int) int {
	t.Helper()

	if n >= len(f.ports) {
		t.Fatalf("port index out of range: %d", n)
	}

	return f.ports[n]
}

func (f *FreePort) Free(t *testing.T) {
	t.Helper()

	for _, l := range f.lsns {
		require.NoError(t, l.Close())
	}
}
