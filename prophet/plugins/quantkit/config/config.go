package config

type Config struct {
	Enabled bool   `mapstructure:"enabled" toml:"enabled"`
	ApiKey  string `mapstructure:"api-key" toml:"api-key"`
	ApiURL  string `mapstructure:"api-url" toml:"api-url"`
}

// DefaultConfig returns a default configuration for Quantkit plugin.
func DefaultConfig() *Config {
	return &Config{
		Enabled: false,
		ApiKey:  "",
		ApiURL:  "",
	}
}

const DefaultConfigTemplate = `
###############################################################################
###                      Quantkit configuration                               ###
###############################################################################
[quantkit]

# Is QuantKit plugin enabled
enabled = {{ .Quantkit.Enabled }}

# API Key used when making Quantkit API requests
api-key = "{{ .Quantkit.ApiKey }}"

# API URL used when making Quantkit API requests
api-url = "{{ .Quantkit.ApiURL }}"
`
