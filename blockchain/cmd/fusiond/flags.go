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
	"fmt"

	"github.com/spf13/cobra"

	"github.com/qredo/fusionchain/version"
)

const flagLong = "long"

func init() {
	infoCmd.Flags().Bool(flagLong, false, "Print full information")
}

var infoCmd = &cobra.Command{
	Use:   "info",
	Short: "Print version info",
	Run: func(_ *cobra.Command, _ []string) {
		fmt.Println(version.Version())
	},
}
