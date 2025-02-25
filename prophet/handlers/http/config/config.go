package config

// Config contains the application side http configurations that must
// be set in the app.toml file.

type Config struct {
	Enabled bool     `mapstructure:"enabled" toml:"enabled"`
	URLs    []string `mapstructure:"urls" toml:"urls"`
	Timeout int      `mapstructure:"timeout" toml:"timeout"`
}

// DefaultConfig returns a default configuration for http.
func DefaultConfig() *Config {
	return &Config{
		Enabled: true,
		URLs:    []string{"https://api.coingecko.com"},
		Timeout: 5,
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
urls = ["{{ range $i, $url := .Http.URLs }}{{if $i}},{{end}}{{$url}}{{end}}"]

# Timeout in seconds for the HTTP client
timeout = {{ .Http.Timeout }}
`
