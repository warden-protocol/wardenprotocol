package config

type Config struct {
	Enabled         bool   `mapstructure:"enabled" toml:"enabled"`
	ApiKey          string `mapstructure:"api-key" toml:"api-key"`
	ApiURL          string `mapstructure:"api-url" toml:"api-url"`
	BucketKey       string `mapstructure:"bucket-key" toml:"bucket-key"`
	BucketSecretKey string `mapstructure:"bucket-secret-key" toml:"bucket-secret-key"`
	BucketName      string `mapstructure:"bucket-name" toml:"bucket-name"`
	BucketRegion    string `mapstructure:"bucket-region" toml:"bucket-region"`
}

// DefaultConfig returns a default configuration for Quantkit plugin.
func DefaultConfig() *Config {
	return &Config{
		Enabled:         false,
		ApiKey:          "",
		ApiURL:          "",
		BucketKey:       "",
		BucketSecretKey: "",
		BucketName:      "",
		BucketRegion:    "",
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

# Bucket Key used when storing PFP data on S3
bucket-key = "{{ .PFP.BucketKey }}"

# Bucket Secret Key used when storing PFP data on S3
bucket-secret-key = "{{ .PFP.BucketSecretKey }}"

# Bucket name used when storing PFP data on S3
bucket-name = "{{ .PFP.BucketName }}"

# Bucket region for S3
bucket-region = "{{ .PFP.BucketRegion }}"

`
