package iowriter

import (
	"io"
	"strings"
)

var _ io.Writer = &IOWriter{}

type IOWriter struct {
	b strings.Builder
}

func (w *IOWriter) Write(p []byte) (n int, err error) {
	if w == nil {
		return 0, nil
	}
	return w.b.Write(p)
}

func (w *IOWriter) String() string {
	if w == nil {
		return "[not recorded]"
	}
	return w.b.String()
}
