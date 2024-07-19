package cases

import (
	"context"
	"encoding/base64"
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/warden-protocol/wardenprotocol/tests/framework"
	"github.com/warden-protocol/wardenprotocol/tests/framework/checks"
	"github.com/warden-protocol/wardenprotocol/tests/framework/exec"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func init() {
	Register(&Test_KeychainWriters{})
}

type Test_KeychainWriters struct {
	w *exec.WardenNode
}

func (c *Test_KeychainWriters) Setup(t *testing.T, ctx context.Context, build framework.BuildResult) {
	c.w = exec.NewWardenNode(t, build.Wardend)

	go c.w.Start(t, ctx, "./testdata/snapshot-keychain")
	c.w.WaitRunnning(t)
}

func (c *Test_KeychainWriters) Run(t *testing.T, ctx context.Context, build framework.BuildResult) {
	bob := exec.NewWardend(c.w, "bob")
	writer := exec.NewWardend(c.w, "writer")

	t.Run("create key request", func(t *testing.T) {
		// create a KeyRequest
		newReqTx := bob.Tx(t, "warden new-action new-key-request --space-id 1 --keychain-id 1 --key-type 1")
		checks.SuccessTx(t, newReqTx)

		// try to fulfill it from an address that's not one of the Keychain's writers
		bobFulfilTx := bob.Tx(t, "warden fulfill-key-request 1 'A93VNAt/SYLw61VYTAhYO0pMJUqjnKKT2owP7HjGNRoK'")
		checks.FailTx(t, bobFulfilTx)

		// try to fulfill it from one of the Keychain's writers
		writerFulfilTx := writer.Tx(t, "warden fulfill-key-request 1 'A93VNAt/SYLw61VYTAhYO0pMJUqjnKKT2owP7HjGNRoK'")
		checks.SuccessTx(t, writerFulfilTx)

		// check KeyRequest was updated and Key created
		client := c.w.GRPCClient(t)
		res, err := client.Warden.KeyRequestById(ctx, &v1beta3.QueryKeyRequestByIdRequest{Id: 1})
		require.NoError(t, err)
		require.Equal(t, v1beta3.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED, res.KeyRequest.Status)

		// SKIP: a bug in the go-protobuf pkg causes this query to panic - not sure why.
		// keyRes, err := client.Warden.KeyById(ctx, &v1beta3.QueryKeyByIdRequest{Id: res.KeyRequest.Id})
		// require.NoError(t, err)
		// require.Equal(t, "A93VNAt/SYLw61VYTAhYO0pMJUqjnKKT2owP7HjGNRoK", base64.StdEncoding.EncodeToString(keyRes.Key.PublicKey))
	})

	t.Run("create signature request", func(t *testing.T) {
		// create a SignRequest
		newReqTx := bob.Tx(t, "warden new-action new-sign-request --key-id 1 --input 'HoZ4Z+ZU7Zd08kUR5NcbtFZrmGKF18mSBJ29dg0qI44='")
		checks.SuccessTx(t, newReqTx)

		// try to fulfill it from an address that's not one of the Keychain's writers
		bobFulfilTx := bob.Tx(t, "warden fulfill-sign-request 1 'LKu131U23Q5Ke7jJscb57zdSmuZD27a4VeZ+/hwf7ShOLo4ozUc36pvNT14+a1s09k1PbPihrFbK29J00Jh3tgA='")
		checks.FailTx(t, bobFulfilTx)

		// try to fulfill it from one of the Keychain's writers
		writerFulfilTx := writer.Tx(t, "warden fulfill-sign-request 1 'LKu131U23Q5Ke7jJscb57zdSmuZD27a4VeZ+/hwf7ShOLo4ozUc36pvNT14+a1s09k1PbPihrFbK29J00Jh3tgA='")
		checks.SuccessTx(t, writerFulfilTx)

		// check SignRequest was updated and Signature created
		client := c.w.GRPCClient(t)
		res, err := client.Warden.SignRequestById(ctx, &v1beta3.QuerySignRequestByIdRequest{Id: 1})
		require.NoError(t, err)
		require.Equal(t, v1beta3.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED, res.SignRequest.Status)
		require.Equal(t, "LKu131U23Q5Ke7jJscb57zdSmuZD27a4VeZ+/hwf7ShOLo4ozUc36pvNT14+a1s09k1PbPihrFbK29J00Jh3tgA=", base64.StdEncoding.EncodeToString(res.SignRequest.Result.(*v1beta3.SignRequest_SignedData).SignedData))
	})
}
