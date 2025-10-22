package snapshots

import (
	"bytes"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/CosmWasm/wasmvm/v3/types"
	"github.com/Jeffail/gabs/v2"
	"github.com/stretchr/testify/require"

	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
	"github.com/warden-protocol/wardenprotocol/tests/framework/iowriter"
)

type BuildOptions struct {
	Name           string
	ChainID        string
	Denom          string
	KeyringBackend string
	Accounts       []AccountOptions
	Spaces         []SpaceOptions
	Keychains      []KeychainOptions
	Plugins        []string
	Precompiles    []string
	EditSnapshot   func(Builder)
	EditGenesis    func(*GenesisBuilder)
}

type AccountOptions struct {
	// Name is a unique name for this account.
	// It will be used to generate a new key.
	Name string
	// Amount is the full amount held by this account.
	// E.g. "10000000adenom"
	Amount string
	// StakedAmount is the amount used in the gentx.
	// Must be less than or equal to Amount.
	// If empty, this account won't have a gentx and won't be a validator.
	// E.g. "10000000adenom"
	StakedAmount string
}

type SpaceOptions struct {
	Owner string
}

type KeychainOptions struct {
	Creator string
	Name    string
	Fees    string
}

// Build regenerates a snapshot using a set of common configurations.
// For more control, see [Builder].
//
// The common configurations applied are:
// - single validator
// - fast block time (~5ms)
// - enable vote extensions
// .
func Build(t *testing.T, wardendPath, savePath string, opts BuildOptions) {
	w := wardend{bin: wardendPath}

	b := NewBuilder(t, w, "testing-node", opts.ChainID, opts.Denom, opts.KeyringBackend)

	for _, account := range opts.Accounts {
		b.AddKeys(account.Name)
		b.AddGenesisAccount(account.Name, account.Amount)

		if account.StakedAmount != "" {
			b.GenTx(account.Name, account.StakedAmount)
		}
	}

	b.CollectGenTxs()

	for _, s := range opts.Spaces {
		b.AddGenesisSpace(s.Owner)
	}

	for _, k := range opts.Keychains {
		b.AddGenesisKeychain(k.Creator, k.Name, k.Fees)
	}

	for _, p := range opts.Plugins {
		b.AddGenesisPlugin(p)
	}

	genesis := b.Genesis()
	denomMetadata := types.DenomMetadata{
		Base: b.denom,
		DenomUnits: []types.DenomUnit{
			{Denom: b.denom},
			{Denom: b.denom[1:], Exponent: 18},
		},
		Display: b.denom[1:],
		Name:    b.denom[1:],
		Symbol:  b.denom[1:],
	}
	genesis.Set("app_state.bank.denom_metadata", []any{denomMetadata})
	genesis.Set("app_state.evm.params.evm_denom", b.denom)
	genesis.Set("app_state.evm.params.active_static_precompiles", opts.Precompiles)
	genesis.Set("app_state.feemarket.params.no_base_fee", true)
	genesis.Set("app_state.feemarket.params.base_fee", "0")
	genesis.Set("consensus.params.abci.vote_extensions_enable_height", "2")

	if opts.EditGenesis != nil {
		opts.EditGenesis(genesis)
	}

	genesis.Save()

	b.SetConfig("app", "minimum-gas-prices", "0"+b.denom)
	b.SetConfig("config", "consensus.timeout_propose", "10ms")
	b.SetConfig("config", "consensus.timeout_propose_delta", "5ms")
	b.SetConfig("config", "consensus.timeout_prevote", "10ms")
	b.SetConfig("config", "consensus.timeout_prevote_delta", "5ms")
	b.SetConfig("config", "consensus.timeout_precommit", "10ms")
	b.SetConfig("config", "consensus.timeout_precommit_delta", "5ms")
	b.SetConfig("config", "consensus.timeout_commit", "10ms")

	if opts.EditSnapshot != nil {
		opts.EditSnapshot(b)
	}

	b.Replace("config/client.toml", "tcp://localhost:26657", "tcp://localhost:{{ .CometPortRPC }}")

	b.Replace("config/app.toml", "tcp://localhost:1317", "tcp://localhost:{{ .APIPort }}")
	b.Replace("config/app.toml", "localhost:9090", "localhost:{{ .GRPCPort }}")
	b.Replace("config/app.toml", "127.0.0.1:8545", "127.0.0.1:{{ .JSONRPCPort }}")
	b.Replace("config/app.toml", "127.0.0.1:8546", "127.0.0.1:{{ .JSONRPCWSPort }}")

	b.Replace("config/config.toml", "tcp://0.0.0.0:26656", "tcp://127.0.0.1:{{ .CometP2PRPC }}")
	b.Replace("config/config.toml", "tcp://127.0.0.1:26657", "tcp://127.0.0.1:{{ .CometPortRPC }}")

	b.Rename("config/app.toml", "config/app.toml.tmpl")
	b.Rename("config/client.toml", "config/client.toml.tmpl")
	b.Rename("config/config.toml", "config/config.toml.tmpl")

	b.Save(savePath)
}

type wardend struct {
	bin string
}

func (s *wardend) exec(t *testing.T, args ...string) {
	e := exec.Exec{
		Bin:    s.bin,
		Args:   args,
		Stdout: nil,
		Stderr: nil,
	}
	require.NoError(t, e.Run(t.Context()))
}

func (s *wardend) execStdout(t *testing.T, args ...string) string {
	stdout := &iowriter.IOWriter{}
	e := exec.Exec{
		Bin:    s.bin,
		Args:   args,
		Stdout: stdout,
		Stderr: nil,
	}
	require.NoError(t, e.Run(t.Context()))

	return strings.TrimSpace(stdout.String())
}

type Builder struct {
	t              *testing.T
	w              wardend
	chainID        string
	keyringBackend string
	denom          string
	home           string
}

func NewBuilder(t *testing.T, w wardend, moniker, chainID, denom, keyringBackend string) Builder {
	home := t.TempDir()

	w.exec(t, "init", moniker,
		"--chain-id", chainID,
		"--default-denom", denom,
		"--home", home)

	b := Builder{
		t:              t,
		w:              w,
		chainID:        chainID,
		keyringBackend: keyringBackend,
		denom:          denom,
		home:           home,
	}
	b.SetConfig("client", "chain-id", chainID)
	b.SetConfig("client", "keyring-backend", keyringBackend)

	return b
}

func (b *Builder) Save(path string) {
	require.NoError(b.t, os.RemoveAll(path))
	require.NoError(b.t, os.Rename(b.home, path))
}

func (b *Builder) SetConfig(section, key, value string) {
	b.w.exec(b.t, "config", "set", "-s", section,
		key, value,
		"--home", b.home,
	)
}

func (b *Builder) AddKeys(name string) {
	b.w.exec(b.t, "keys", "add", name,
		"--keyring-backend", b.keyringBackend,
		"--home", b.home)
}

func (b *Builder) ShowKey(name string) string {
	return b.w.execStdout(b.t, "keys", "show", "-a", name,
		"--keyring-backend", b.keyringBackend,
		"--home", b.home)
}

func (b *Builder) AddGenesisAccount(name, amount string) {
	b.w.exec(b.t, "genesis",
		"add-genesis-account", name, amount,
		"--keyring-backend", b.keyringBackend,
		"--home", b.home)
}

func (b *Builder) AddGenesisSpace(name string) {
	addr := b.ShowKey(name)
	b.w.exec(b.t, "genesis",
		"add-genesis-space", addr,
		"--keyring-backend", b.keyringBackend,
		"--home", b.home)
}

func (b *Builder) AddGenesisKeychain(accountName, keychainName, fees string) {
	addr := b.ShowKey(accountName)
	b.w.exec(b.t, "genesis",
		"add-genesis-keychain", addr, keychainName, fees,
		"--keyring-backend", b.keyringBackend,
		"--home", b.home)
}

func (b *Builder) GenTx(name, amount string) {
	b.w.exec(b.t, "genesis",
		"gentx", name, amount,
		"--chain-id", b.chainID,
		"--keyring-backend", b.keyringBackend,
		"--home", b.home)
}

func (b *Builder) CollectGenTxs() {
	b.w.exec(b.t, "genesis",
		"collect-gentxs",
		"--home", b.home)
}

func (b *Builder) AddGenesisPlugin(name string) {
	b.w.exec(b.t, "genesis",
		"add-genesis-plugin", name,
		"--home", b.home)
}

func (b *Builder) Replace(path, old, new string) {
	fullPath := filepath.Join(b.home, path)
	content, err := os.ReadFile(fullPath)
	require.NoError(b.t, err)

	content = bytes.ReplaceAll(content, []byte(old), []byte(new))
	require.NoError(b.t, os.WriteFile(fullPath, content, 0o644))
}

func (b *Builder) Rename(old, new string) {
	old = filepath.Join(b.home, old)
	new = filepath.Join(b.home, new)
	require.NoError(b.t, os.Rename(old, new))
}

func (b *Builder) Genesis() *GenesisBuilder {
	genesisPath := filepath.Join(b.home, "config/genesis.json")
	c, err := gabs.ParseJSONFile(genesisPath)
	require.NoError(b.t, err)

	return &GenesisBuilder{
		t:    b.t,
		path: genesisPath,
		c:    c,
	}
}

type GenesisBuilder struct {
	t    *testing.T
	path string
	c    *gabs.Container
}

func (g *GenesisBuilder) Set(path string, val any) {
	_, err := g.c.SetP(val, path)
	require.NoError(g.t, err)
}

func (g *GenesisBuilder) Append(path string, vals ...any) {
	err := g.c.ArrayConcatP(vals, path)
	require.NoError(g.t, err)
}

func (g *GenesisBuilder) Save() {
	data := g.c.EncodeJSON(gabs.EncodeOptIndent("", "  "))
	require.NoError(g.t, os.WriteFile(g.path, data, 0o644))
}
