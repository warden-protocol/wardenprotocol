package framework

import (
	"flag"
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
	"github.com/warden-protocol/wardenprotocol/tests/framework/iowriter"
	snapshots "github.com/warden-protocol/wardenprotocol/tests/framework/snapshot"
)

type F struct {
	t *testing.T

	wardend              string
	regeneratedSnapshots map[string]struct{}
}

func New(t *testing.T) *F {
	return &F{
		t:                    t,
		regeneratedSnapshots: make(map[string]struct{}),
	}
}

func (f *F) GetWardend() string {
	f.t.Helper()

	if f.wardend != "" {
		return f.wardend
	}

	pwd := goModRoot(f.t)
	wardend := filepath.Join(pwd, "./build/wardend")

	cmd := exec.Exec{
		Bin:    "go",
		Args:   []string{"build", "-o", wardend, "./cmd/wardend"},
		Pwd:    pwd,
		Stdout: &iowriter.IOWriter{},
		Stderr: &iowriter.IOWriter{},
	}
	start := time.Now()
	err := cmd.Run(f.t.Context())
	require.NoError(f.t, err)
	f.t.Log("building wardend took", time.Since(start))

	f.wardend = wardend

	return f.wardend
}

func (f *F) GetWardenNode() *exec.WardenNode {
	return exec.NewWardenNode(f.t, f.GetWardend())
}

func (f *F) StartNodeFromSnapshot(t *testing.T, opts snapshots.BuildOptions) *exec.WardenNode {
	node := f.GetWardenNode()
	snap := f.GetSnapshot(opts)
	go node.Start(t, snap) // use t instead of f.t here so we stop the node when the caller is done
	node.WaitRunning(t)
	return node
}

var regenSnapshots = flag.Bool("regen-snapshots", false, "Regenerate snapshots")

func (f *F) GetSnapshot(opts snapshots.BuildOptions) string {
	outPath, err := filepath.Abs(filepath.Join("./testdata", opts.Name))
	require.NoError(f.t, err)

	if !*regenSnapshots {
		return outPath
	}

	if _, found := f.regeneratedSnapshots[opts.Name]; found {
		// already regenerated in this run
		return outPath
	}

	f.t.Log("regenerating snapshot", opts.Name)
	snapshots.Build(f.t, f.GetWardend(), outPath, opts)
	f.regeneratedSnapshots[opts.Name] = struct{}{}

	return outPath
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
