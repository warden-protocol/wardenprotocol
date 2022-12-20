package rpc

import (
	"encoding/json"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestNet_Version(t *testing.T) {
	rpcRes := Call(t, "net_version", []string{})

	var res string
	err := json.Unmarshal(rpcRes.Result, &res)
	require.NoError(t, err)
	require.Equal(t, "9000", res)
}

func TestNet_Listening(t *testing.T) {
	rpcRes := Call(t, "net_listening", []string{})

	var res bool
	err := json.Unmarshal(rpcRes.Result, &res)
	require.NoError(t, err)
	require.True(t, res)
}

func TestNet_PeerCount(t *testing.T) {
	rpcRes := Call(t, "net_peerCount", []string{})

	var res int
	err := json.Unmarshal(rpcRes.Result, &res)
	require.NoError(t, err)
	require.Equal(t, 0, res)
}
