package config

// Config contains the application side http configurations that must
// be set in the app.toml file.

type Config struct {
	Enabled    bool     `mapstructure:"enabled" toml:"enabled"`
	URLs       []string `mapstructure:"urls" toml:"urls"`
	TimeoutSec int      `mapstructure:"timeout_sec" toml:"timeout_sec"`
}

// DefaultConfig returns a default configuration for http.
func DefaultConfig() *Config {
	return &Config{
		Enabled:    true,
		URLs:       []string{"https://api.coingecko.com"},
		TimeoutSec: 5,
	}
}

const DefaultEVMConfigTemplate = "\n###############################################################################\n###                      HTTP configuration                     ###\n###############################################################################\n[http]\n\n# Is HTTP handler enabled\n= \"{{ .Http.Enabled }}\"\n\n# URLs used for HTTP handler\nurls = [\"{{ range $i, $url := .Http.URLs }}{{if $i}},{{end}}{{$url}}{{end}}\"]\n\n# Timeout in seconds for the HTTP client\ntimeout_sec = {{ .Http.TimeoutSec"
