package snapshots

import (
	"bytes"
	"context"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/warden-protocol/wardenprotocol/tests/framework"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
)

func strs(s ...string) []string { return s }

type wardend struct {
	bin string
	pwd string

	chainID        string
	keyringBackend string
	denom          string
}

func (w *wardend) exec(t *testing.T, args ...string) {
	e := exec.Exec{
		Bin:    w.bin,
		Args:   args,
		Pwd:    w.pwd,
		Stdout: nil,
		Stderr: nil,
	}
	require.NoError(t, e.Run(t.Context()))
}

func (w *wardend) init(t *testing.T, moniker, chainID, denom, keyringBackend string) {
	w.chainID = chainID
	w.keyringBackend = keyringBackend
	w.denom = denom
	w.exec(t, "init", moniker,
		"--chain-id", chainID,
		"--default-denom", denom,
		"--home", w.pwd)
	w.setConfig(t, "client", "chain-id", chainID)
	w.setConfig(t, "client", "keyring-backend", keyringBackend)
}

func (w *wardend) setConfig(t *testing.T, section, key, value string) {
	w.exec(t, "config", "set", section,
		key, value,
		"--home", w.pwd,
	)
}

func (w *wardend) addKeys(t *testing.T, name string) {
	w.exec(t, "keys", "add", name,
		"--keyring-backend", w.keyringBackend,
		"--home", w.pwd)
}

func (w *wardend) addGenesisAccount(t *testing.T, name, denom string) {
	w.exec(t, "genesis",
		"add-genesis-account", name, denom,
		"--keyring-backend", w.keyringBackend,
		"--home", w.pwd)
}

func (w *wardend) replace(t *testing.T, path, old, new string) {
	content, err := os.ReadFile(filepath.Join(w.pwd, path))
	require.NoError(t, err)
	content = bytes.ReplaceAll(content, []byte(old), []byte(new))
	err = os.WriteFile(path, content, os.ModePerm)
	require.NoError(t, err)
}

var (
	KeyringBackendTest = "test"
)

func Test_SnapshotBase(t *testing.T) {
	// build wardend binary
	build := framework.Build(t)

	// setup the snapshot "homedir"
	tmpDir, err := os.MkdirTemp("", "wardend-snapshot")
	require.NoError(t, err)

	w := wardend{
		bin: build.Wardend,
		pwd: tmpDir,
	}

	w.init(t, "snapshot", "warden_1337-1", "award", KeyringBackendTest)
	w.addKeys(t, "alice")
	w.addGenesisAccount(t, "alice", "10000000000000000000000000000000000000award")
	w.replace(t, "config/genesis.json", "aevmos", w.denom)
	w.replace(t, "config/app.toml", "aevmos", w.denom)

	// delete old snapshot, if existing
	// TODO

	t.Log(tmpDir)
}
