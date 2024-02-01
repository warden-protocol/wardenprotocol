// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
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
