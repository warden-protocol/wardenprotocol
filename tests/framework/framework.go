package framework

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
	"github.com/warden-protocol/wardenprotocol/tests/framework/iowriter"
)

type F struct {
	t *testing.T

	wardend string
}

func New(t *testing.T) *F {
	return &F{
		t: t,
	}
}

func (f *F) GetWardend() string {
	f.t.Helper()

	if f.wardend != "" {
		return f.wardend
	}

	binDir := f.t.TempDir()

	wardend := binDir + "/wardend"
	cmd := exec.Exec{
		Bin:    "go",
		Args:   []string{"build", "-o", wardend, "./cmd/wardend"},
		Pwd:    goModRoot(f.t),
		Stdout: &iowriter.IOWriter{},
		Stderr: &iowriter.IOWriter{},
	}
	err := cmd.Run(f.t.Context())
	require.NoError(f.t, err)

	f.wardend = wardend

	return f.wardend
}

func (f *F) GetWardenNode() *exec.WardenNode {
	return exec.NewWardenNode(f.t, f.GetWardend())
}

func goModRoot(t *testing.T) string {
	path, err := filepath.Abs(".")
	require.NoError(t, err)

	for path != "/" && path != "" {
		testPath := filepath.Join(path, "go.mod")
		_, err := os.Stat(testPath)
		if err == nil {
			return path
		}
		path = filepath.Dir(path)
	}

	t.Fatal("couldn't find a go.mod file in current or parents directories")

	return ""
}
