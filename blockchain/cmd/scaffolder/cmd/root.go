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
package cmd

import (
	"fmt"
	"os"

	"github.com/go-git/go-git/v5"
	"github.com/spf13/cobra"
)

func Execute() {
	var rootCmd = &cobra.Command{
		Use:   "scaffolder",
		Short: "Scaffolder generates common files",
		Long:  `Similar to Ignite, Scaffolder generates messages and queries for the Fusion Chain.`,
		PersistentPreRunE: func(cmd *cobra.Command, args []string) error {
			// check if git status is not empty
			r, err := git.PlainOpenWithOptions(".git", &git.PlainOpenOptions{
				DetectDotGit: true,
			})
			if err != nil {
				return err
			}

			w, err := r.Worktree()
			if err != nil {
				return err
			}

			s, err := w.Status()
			if err != nil {
				return err
			}

			if !s.IsClean() {
				return fmt.Errorf("your git repo is not clean - add and commit your files before using scaffolder so that you can easily revert changes if something goes wrong")
			}

			return nil
		},
	}

	rootCmd.AddCommand(queryCmd())
	rootCmd.AddCommand(msgCmd())

	if err := rootCmd.Execute(); err != nil {
		_, _ = fmt.Fprintln(os.Stderr, err)
		// revive:disable-next-line:deep-exit
		os.Exit(1)
	}
}
