package config

// Config contains the application side http configurations that must
// be set in the app.toml file.

type Config struct {
	Enabled bool     `mapstructure:"enabled" toml:"enabled"`
	URLs    []string `mapstructure:"urls" toml:"urls"`
}

// DefaultConfig returns a default configuration for http.
func DefaultConfig() *Config {
	return &Config{
		Enabled: true,
		URLs:    []string{"https://api.coingecko.com"},
	}
}

const DefaultEVMConfigTemplate = `
###############################################################################
###                      HTTP configuration                     ###
###############################################################################
[http]

# Is HTTP handler enabled
enabled = "{{ .Http.Enabled }}"

# URLs used for HTTP handler
urls = ["{{ .Http.URLs | join "," }}"]
`
