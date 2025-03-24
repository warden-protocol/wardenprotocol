package common

import "fmt"

type WrongArgsNumber struct {
	Expected int
	Got      int
}

func (e WrongArgsNumber) Error() string {
	return fmt.Sprintf("invalid number of arguments; expected %d; got: %d", e.Expected, e.Got)
}
