package config

type Config struct {
	Enabled bool   `mapstructure:"enabled" toml:"enabled"`
	ApiKey  string `mapstructure:"api-key" toml:"api-key"`
}

// DefaultConfig returns a default configuration for venice.
func DefaultConfig() *Config {
	return &Config{
		Enabled: false,
		ApiKey:  "",
	}
}

const DefaultConfigTemplate = `
###############################################################################
###                      Venice configuration                               ###
###############################################################################
[venice]

# Is Venice plugin enabled
enabled = "{{ .Venice.Enabled }}"

# API Key used when making Venice API requests
api-key = "{{ .Venice.ApiKey }}"
`
