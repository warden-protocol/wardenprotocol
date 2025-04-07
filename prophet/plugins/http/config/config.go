package config

// Config contains the application side http configurations that must
// be set in the app.toml file.

type Config struct {
	Enabled    bool     `mapstructure:"enabled"     toml:"enabled"`
	URLs       []string `mapstructure:"urls"        toml:"urls"`
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

const DefaultConfigTemplate = `
###############################################################################
###                      HTTP configuration                                 ###
###############################################################################
[http]

# Is HTTP plugin enabled
enabled = "{{ .Http.Enabled }}"

# URLs used for HTTP plugin
urls = ["{{ range $i, $url := .Http.URLs }}{{if $i}},{{end}}{{$url}}{{end}}"]

# Timeout in seconds for the HTTP client
timeout_sec = {{ .Http.TimeoutSec }}
`
