package main

import (
	"fmt"

	"github.com/spf13/cobra"

	"github.com/evmos/ethermint/version"
)

const (
	flagLong = "long"
)

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
