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
