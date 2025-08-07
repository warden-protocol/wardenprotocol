package config

type Config struct {
	Enabled    bool   `mapstructure:"enabled" toml:"enabled"`
	VeniceKey  string `mapstructure:"venice-key" toml:"venice-key"`
	StorageKey string `mapstructure:"storage-key" toml:"storage-key"`
}

// DefaultConfig returns a default configuration for veniceimg.
func DefaultConfig() *Config {
	return &Config{
		Enabled:    false,
		VeniceKey:  "",
		StorageKey: "",
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
venice-key = "{{ .Veniceimg.VeniceKey }}"

# API Key used when saving the image to Filebase
storage-key = "{{ .Veniceimg.StorageKey }}"
`
