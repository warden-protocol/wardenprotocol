package config

// Config contains the application side pricepred configurations that must
// be set in the app.toml file.

type Config struct {
	Enabled   bool   `mapstructure:"enabled" toml:"enabled"`
	SolveURL  string `mapstructure:"solve_url" toml:"solve_url"`
	VerifyURL string `mapstructure:"verify_url" toml:"verify_url"`
}

// DefaultConfig returns a default configuration for pricepred.
func DefaultConfig() *Config {
	return &Config{
		Enabled:   true,
		SolveURL:  "https://tpc.devnet.wardenprotocol.org/api/task/inference/solve",
		VerifyURL: "https://tpc.devnet.wardenprotocol.org/api/task/inference/verify",
	}
}

const DefaultEVMConfigTemplate = `
###############################################################################
###                      Price prediction configuration                     ###
###############################################################################
[pricepred]

# Is price prediction enabled
enabled = "{{ .PricePred.Enabled }}"

# URL used for price prediction handler
solve_url = "{{ .PricePred.SolveURL }}"
verify_url = "{{ .PricePred.VerifyURL }}"
`
