package config

type Config struct {
	Enabled bool   `mapstructure:"enabled" toml:"enabled"`
	ApiKey  string `mapstructure:"api-key" toml:"api-key"`
}

// DefaultConfig returns a default configuration for veniceimg.
func DefaultConfig() *Config {
	return &Config{
		Enabled: true,
		ApiKey:  "",
	}
}

const DefaultConfigTemplate = `
###############################################################################
###                       VeniceImg  configuration                          ###
###############################################################################
[veniceimg]

# Is VeniceImg plugin enabled
enabled = "{{ .Veniceimg.Enabled }}"

# API Key used when making VeniceImg API requests
api-key = "{{ .Veniceimg.ApiKey }}"
`
