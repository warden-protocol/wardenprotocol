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
		URL:     "https://tpc.devnet.wardenprotocol.org/api/task/inference/solve",
	}
}

const DefaultEVMConfigTemplate = `
###############################################################################
###                      Price preditcion configuration                     ###
###############################################################################
[pricepredict]

# Is price prediction enabled
enabled = "{{ .PricePredict.Enabled }}"

# URL used for price prediction handler
url = "{{ .PricePredict.URL }}"
`
