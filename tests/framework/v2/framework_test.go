package framework

import (
	"context"
	"io"
	"os"
	"path"
	"testing"
	"time"

	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/mount"
	"github.com/stretchr/testify/require"
	"github.com/testcontainers/testcontainers-go"
)

func buildWardend(t *testing.T) string {
	t.Helper()

	ctx := context.Background()
	pwd, err := os.Getwd()
	require.NoError(t, err)
	repoPath := path.Join(pwd, "../../../")
	req := testcontainers.ContainerRequest{
		Name:  "wardend-builder",
		Image: "golang:1.22-bookworm",
		HostConfigModifier: func(hc *container.HostConfig) {
			// mount entire repo as readonly bind
			hc.Mounts = append(hc.Mounts, mount.Mount{
				Type:   mount.TypeBind,
				Source: repoPath,
				Target: "/wardenprotocol",
			})
		},
		WorkingDir: "/wardenprotocol",
		Cmd:        []string{"go", "build", "-o", "/wardend", "./cmd/wardend"},
	}
	wardendBuilderC, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
		ContainerRequest: req,
		Started:          true,
	})
	testcontainers.CleanupContainer(t, wardendBuilderC)
	require.NoError(t, err)

	for {
		state, err := wardendBuilderC.State(ctx)
		require.NoError(t, err)
		if state.Status != "running" {
			break
		}
		t.Log("Waiting for wardend builder to complete")
		time.Sleep(time.Second)
	}

	wardendBin, err := wardendBuilderC.CopyFileFromContainer(ctx, "/wardend")
	require.NoError(t, err)
	tmp := t.TempDir()
	wardendBinPath := path.Join(tmp, "wardend")
	wardendBinFile, err := os.Create(wardendBinPath)
	require.NoError(t, err)
	_, err = io.Copy(wardendBinFile, wardendBin)
	require.NoError(t, err)

	return wardendBinPath
}

func TestWithRedis(t *testing.T) {
	ctx := context.Background()

	wardend := buildWardend(t)

	req := testcontainers.ContainerRequest{
		Name:  "wardend",
		Image: "golang:1.22-bookworm",
		Files: []testcontainers.ContainerFile{
			{
				HostFilePath:      wardend,
				ContainerFilePath: "/wardend",
				FileMode:          0755,
			},
		},
		Cmd: []string{"/wardend", "version", "--long"},
	}

	wardendC, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
		ContainerRequest: req,
		Started:          true,
	})
	testcontainers.CleanupContainer(t, wardendC)
	require.NoError(t, err)

	reader, err := wardendC.Logs(ctx)
	require.NoError(t, err)

	stdout, err := io.ReadAll(reader)
	require.NoError(t, err)

	require.Contains(t, string(stdout), "XXXX")
}
