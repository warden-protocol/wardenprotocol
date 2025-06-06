package config

import (
	"path/filepath"

	"github.com/spf13/viper"

	"github.com/cosmos/cosmos-sdk/client/config"
)

// GetChainIDFromHome returns the chain ID from the client configuration
// in the given home directory.
func GetChainIDFromHome(home string) (string, error) {
	v := viper.New()
	v.AddConfigPath(filepath.Join(home, "config"))
	v.SetConfigName("client")
	v.SetConfigType("toml")

	if err := v.ReadInConfig(); err != nil {
		return "", err
	}
	conf := new(config.ClientConfig)

	if err := v.Unmarshal(conf); err != nil {
		return "", err
	}

	return conf.ChainID, nil
}
