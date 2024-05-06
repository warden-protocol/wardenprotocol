package main

import (
	"context"
	"fmt"
	"reflect"
	"testing"
	"time"

	"github.com/warden-protocol/wardenprotocol/tests/cases"
	"github.com/warden-protocol/wardenprotocol/tests/framework"
)


func TestIntegration(t *testing.T) {
	var casesToRun = cases.List()
	build := framework.Build(t)
	startTime := time.Now()

	for _, c := range casesToRun {
		t.Run(getName(c), func(t *testing.T) {
			ctx, cancel := context.WithCancel(context.Background())
			defer cancel()

			fmt.Println("setup test:", getName(c))
			c.Setup(t, ctx, build)
			fmt.Println("run test:", getName(c))
			c.Run(t, ctx, build)
		})
	}

	fmt.Println("tests duration:", time.Since(startTime))
}

func getName(v any) string {
	if t := reflect.TypeOf(v); t.Kind() == reflect.Ptr {
		return t.Elem().Name()
	} else {
		return t.Name()
	}
}
