package cases

import (
	"context"
	"testing"

	"github.com/warden-protocol/wardenprotocol/tests/framework"
)

type TestCase interface {
	Setup(t *testing.T, ctx context.Context, build framework.BuildResult)
	Run(t *testing.T, ctx context.Context, build framework.BuildResult)
}

var list []TestCase

func Register(item TestCase) {
	list = append(list, item)
}

func List() []TestCase { return list }
