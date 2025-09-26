package exec

import (
	"context"
	"fmt"
	"os/exec"
	"strings"

	"github.com/warden-protocol/wardenprotocol/tests/framework/iowriter"
)

type Exec struct {
	Bin    string
	Args   []string
	Pwd    string
	Stdin  string
	Stdout *iowriter.IOWriter
	Stderr *iowriter.IOWriter
}

func (e *Exec) Run(ctx context.Context) error {
	cmd := exec.CommandContext(ctx, e.Bin, e.Args...)

	cmd.Dir = e.Pwd
	if e.Stdin != "" {
		cmd.Stdin = strings.NewReader(e.Stdin)
	}

	cmd.Stdout = e.Stdout
	cmd.Stderr = e.Stderr

	err := cmd.Run()
	if err != nil {
		return fmt.Errorf("exec: %s %s\nerr: %w\nstdout: %s\nstderr: %s", e.Bin, strings.Join(e.Args, " "), err, e.Stdout.String(), e.Stderr.String())
	}

	return nil
}
