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

const DefaultEVMConfigTemplate = "\n###############################################################################\n###                      Price prediction configuration                     ###\n###############################################################################\n[pricepred]\n\n# Is price prediction enabled\n= \"{{ .PricePred.Enabled }}\"\n\n# URL used for price prediction handler\nurl = \"{{ .PricePred.URL"
