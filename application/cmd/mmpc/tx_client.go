package main

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/cosmos/cosmos-sdk/types"
	txtypes "github.com/cosmos/cosmos-sdk/types/tx"
	"github.com/cosmos/cosmos-sdk/types/tx/signing"
	xauthsigning "github.com/cosmos/cosmos-sdk/x/auth/signing"
	"gitlab.qredo.com/qrdochain/fusionchain/app"
	"gitlab.qredo.com/qrdochain/fusionchain/encoding"
	"google.golang.org/grpc"
)

// TxClient is the client used for sending new transactions to the chain.
// The provided TxIdentity will be used for retrieving sequence number and for signing transactions.
type TxClient struct {
	id         *TxIdentity
	client     txtypes.ServiceClient
	authClient *AuthClient
}

func NewTxClient(id *TxIdentity, c *grpc.ClientConn, authClient *AuthClient) *TxClient {
	return &TxClient{
		id:         id,
		client:     txtypes.NewServiceClient(c),
		authClient: authClient,
	}
}

func (c *TxClient) BuildTx(msgs ...types.Msg) ([]byte, error) {
	account, err := c.authClient.Account(context.Background(), c.id.Address.String())
	if err != nil {
		return nil, err
	}
	accSeq := account.GetSequence()
	accNum := account.GetAccountNumber()

	encCfg := encoding.MakeConfig(app.ModuleBasics)
	txBuilder := encCfg.TxConfig.NewTxBuilder()

	// build unsigned tx
	txBuilder.SetGasLimit(300000)
	txBuilder.SetFeeAmount(types.NewCoins(types.NewCoin("qrdo", types.NewInt(20000000))))
	err = txBuilder.SetMsgs(msgs...)
	if err != nil {
		return nil, err
	}

	// First round: we gather all the signer infos. We use the "set empty
	// signature" hack to do that.
	sigV2 := signing.SignatureV2{
		PubKey: c.id.PrivKey.PubKey(),
		Data: &signing.SingleSignatureData{
			SignMode:  encCfg.TxConfig.SignModeHandler().DefaultMode(),
			Signature: nil,
		},
		Sequence: accSeq,
	}
	err = txBuilder.SetSignatures(sigV2)
	if err != nil {
		return nil, err
	}

	// Second round: all signer infos are set, so each signer can sign.
	signerData := xauthsigning.SignerData{
		ChainID:       chainID,
		AccountNumber: accNum,
		Sequence:      accSeq,
	}

	sigV2, err = tx.SignWithPrivKey(
		encCfg.TxConfig.SignModeHandler().DefaultMode(), signerData,
		txBuilder, c.id.PrivKey, encCfg.TxConfig, accSeq)
	if err != nil {
		return nil, err
	}

	err = txBuilder.SetSignatures(sigV2)
	if err != nil {
		return nil, err
	}

	txBytes, err := encCfg.TxConfig.TxEncoder()(txBuilder.GetTx())
	if err != nil {
		return nil, err
	}

	return txBytes, nil
}

// SendTxBlocking broadcasts a signed transaction and waits until the
// transaction is actually added to the blockchain.
func (c *TxClient) SendTxBlocking(ctx context.Context, txBytes []byte) error {
	grpcRes, err := c.client.BroadcastTx(
		ctx,
		&txtypes.BroadcastTxRequest{
			Mode:    txtypes.BroadcastMode_BROADCAST_MODE_BLOCK,
			TxBytes: txBytes,
		},
	)
	if err != nil {
		return err
	}

	if grpcRes.TxResponse.Code != 0 {
		return fmt.Errorf("tx failed: %s", grpcRes.TxResponse.RawLog)
	}

	return nil
}
