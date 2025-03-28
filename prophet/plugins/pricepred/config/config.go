package config

// Config contains the application side pricepred configurations that must
// be set in the app.toml file.

type Config struct {
	Enabled bool   `mapstructure:"enabled" toml:"enabled"`
	URL     string `mapstructure:"url" toml:"url"`
}

// DefaultConfig returns a default configuration for pricepred.
func DefaultConfig() *Config {
	return &Config{
		Enabled: true,
		URL:     "https://tpc.devnet.wardenprotocol.org",
	}
}

const DefaultConfigTemplate = `
###############################################################################
###                      Price prediction configuration                     ###
###############################################################################
[pricepred]

# Is price prediction enabled
enabled = "{{ .PricePred.Enabled }}"

# URL used for price prediction plugin
url = "{{ .PricePred.URL }}"
`
