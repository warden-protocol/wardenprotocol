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

type TestCase interface {
	Setup(t *testing.T, ctx context.Context, build framework.BuildResult)
	Run(t *testing.T, ctx context.Context, build framework.BuildResult)
}

func TestIntegration(t *testing.T) {
	build := framework.Build(t)
	startTime := time.Now()

	var casesToRun = []TestCase{
		&cases.Test_CreateSpace{},
	}

	for _, c := range casesToRun {
		t.Run(getName(c), func(t *testing.T) {
			ctx, cancel := context.WithCancel(context.Background())
			defer cancel()

			c := cases.Test_CreateSpace{}
			c.Setup(t, ctx, build)
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
