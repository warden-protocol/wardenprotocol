package config

type Config struct {
	Enabled         bool   `mapstructure:"enabled" toml:"enabled"`
	ApiKey          string `mapstructure:"api-key" toml:"api-key"`
	ApiURL          string `mapstructure:"api-url" toml:"api-url"`
	BucketKey       string `mapstructure:"bucket-key" toml:"bucket-key"`
	BucketSecretKey string `mapstructure:"bucket-secret-key" toml:"bucket-secret-key"`
	BucketID        string `mapstructure:"bucket-id" toml:"bucket-id"`
}

// DefaultConfig returns a default configuration for Quantkit plugin.
func DefaultConfig() *Config {
	return &Config{
		Enabled:         false,
		ApiKey:          "",
		ApiURL:          "",
		BucketKey:       "",
		BucketSecretKey: "",
		BucketID:        "",
	}
}

const DefaultConfigTemplate = `
###############################################################################
###                      PFP configuration                                  ###
###############################################################################
[pfp]

# Is PFP plugin enabled
enabled = {{ .PFP.Enabled }}

# API Key used when making PFP API requests
api-key = "{{ .PFP.ApiKey }}"

# API URL used when making PFP API requests
api-url = "{{ .PFP.ApiURL }}"

# API Key used when storing PFP data
bucket-key = "{{ .PFP.BucketKey }}"

# API Service Key used whenstoring PFP data
bucket-secret-key = "{{ .PFP.BucketSecretKey }}"

# API URL used when storing PFP data
bucket-id = "{{ .PFP.BucketID }}"


`
