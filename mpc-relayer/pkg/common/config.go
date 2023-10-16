package common

import (
	"os"
	"path/filepath"

	"github.com/vrischmann/envconfig"
	"gopkg.in/yaml.v3"
)

// ParseYAMLConfig parse configuration file or environment variables, receiver must be a pointer
func ParseYAMLConfig(configFile string, receiver any, prefix string) error {
	b, err := os.ReadFile(filepath.Clean(configFile))
	if err != nil && !os.IsNotExist(err) {
		return err
	}
	if b != nil {
		if err := yaml.Unmarshal(b, receiver); err != nil {
			return err
		}
	}
	// environment variables supersede config yaml files
	if err := envconfig.InitWithOptions(receiver, envconfig.Options{Prefix: prefix, AllOptional: true}); err != nil {
		return err
	}
	return nil
}
