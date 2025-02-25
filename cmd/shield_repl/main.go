package main

import (
	"bufio"
	"fmt"
	"io"
	"os"

	"github.com/warden-protocol/wardenprotocol/shield"
	"github.com/warden-protocol/wardenprotocol/shield/object"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	env := object.NewEnvironment()

	for {
		fmt.Print("> ")
		sn := scanner.Scan()
		if !sn {
			return
		}

		line := scanner.Text()
		if len(line) == 0 {
			continue
		}

		exp, err := shield.Parse(line)

		if err != nil {
			io.WriteString(os.Stderr, err.Error()) //nolint:all
			continue
		}

		evaluated := shield.Eval(exp, env)
		if evaluated != nil {
			io.WriteString(os.Stdout, evaluated.Inspect()) //nolint:all
			io.WriteString(os.Stdout, "\n")                //nolint:all
		}
	}
}
