package debug

import (
	"os"
	"os/user"
	"path/filepath"
	"runtime/pprof"
	"strings"

	"github.com/cosmos/cosmos-sdk/server"
	"github.com/tendermint/tendermint/libs/log"
)

// isCPUProfileConfigurationActivated checks if cpuprofile was configured via flag
func isCPUProfileConfigurationActivated(ctx *server.Context) bool {
	// TODO: use same constants as server/start.go
	// constant declared in start.go cannot be imported (cyclical dependency)
	const flagCPUProfile = "cpu-profile"
	if cpuProfile := ctx.Viper.GetString(flagCPUProfile); cpuProfile != "" {
		return true
	}
	return false
}

// ExpandHome expands home directory in file paths.
// ~someuser/tmp will not be expanded.
func ExpandHome(p string) (string, error) {
	if strings.HasPrefix(p, "~/") || strings.HasPrefix(p, "~\\") {
		usr, err := user.Current()
		if err != nil {
			return p, err
		}
		home := usr.HomeDir
		p = home + p[1:]
	}
	return filepath.Clean(p), nil
}

// writeProfile writes the data to a file
func writeProfile(name, file string, log log.Logger) error {
	p := pprof.Lookup(name)
	log.Info("Writing profile records", "count", p.Count(), "type", name, "dump", file)
	fp, err := ExpandHome(file)
	if err != nil {
		return err
	}
	f, err := os.Create(fp)
	if err != nil {
		return err
	}

	if err := p.WriteTo(f, 0); err != nil {
		if err := f.Close(); err != nil {
			return err
		}
		return err
	}

	return f.Close()
}
