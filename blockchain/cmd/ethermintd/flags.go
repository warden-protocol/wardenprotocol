// Copyright 2021 Evmos Foundation
// This file is part of Evmos' Ethermint library.
//
// The Ethermint library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// The Ethermint library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Ethermint library. If not, see https://github.com/evmos/ethermint/blob/main/LICENSE
package main

import (
	"fmt"

	"github.com/spf13/cobra"

	"github.com/evmos/ethermint/version"
)

const flagLong = "long"

func init() {
	infoCmd.Flags().Bool(flagLong, false, "Print full information")
}

var infoCmd = &cobra.Command{
	Use:   "info",
	Short: "Print version info",
	RunE: func(_ *cobra.Command, _ []string) error {
		fmt.Println(version.Version())
		return nil
	},
}
