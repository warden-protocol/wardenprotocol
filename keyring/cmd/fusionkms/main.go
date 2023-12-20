// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"os/signal"

	"github.com/qredo/fusionchain/keyring/pkg/common"
	service "github.com/qredo/fusionchain/keyring/pkg/services/bip44kms"
)

const envPrefix = "FUSIONKMS"

var (
	configFilePath string
	configFilePtr  = flag.String("config", "config.yml", "path to config file")
)

// RUN WITH PLAINTEXT CONFIG [RECOMMENDED FOR TESTING ONLY]
// $ go run main.go --config ./config.yml
// $ go run main.go --config {path_to_config_file}
//
// OR RUN WITH ENVIRONMENT VARIABLES
//
// $ go build
// $ export FUSIONKMS_PASSWORD=<your_password>
// $ ./fusionkms
//
//

func init() {
	// Parse flag containing path to config file
	flag.Parse()
	if configFilePtr != nil {
		configFilePath = *configFilePtr
	}
}

func main() {
	var config service.ServiceConfig

	if err := common.ParseYAMLConfig(configFilePath, &config, envPrefix); err != nil {
		log.Fatal(fmt.Errorf("parse config error: %v", err))
	}
	kms, err := service.BuildService(config)
	if err != nil {
		log.Fatal(fmt.Errorf("build service error: %v", err))
	}

	if err := kms.Start(); err != nil {
		log.Fatal(fmt.Errorf("start service error: %v", err))
	}
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, os.Interrupt)
	sig := <-sigChan
	if err := kms.Stop(sig); err != nil {
		log.Fatal(err)
	}
}
