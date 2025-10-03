package client

import (
	"context"
	"fmt"
	"strings"
	"time"

	"cosmossdk.io/math"
	"github.com/cosmos/cosmos-sdk/client/tx"
	sdk "github.com/cosmos/cosmos-sdk/types"
	txtypes "github.com/cosmos/cosmos-sdk/types/tx"
	"github.com/cosmos/cosmos-sdk/types/tx/signing"
	xauthsigning "github.com/cosmos/cosmos-sdk/x/auth/signing"
	"google.golang.org/grpc"

	"github.com/warden-protocol/wardenprotocol/warden/app"
)

var (
	DefaultGasLimit = uint64(300000000000000000)
	DefaultFees     = sdk.NewCoins(sdk.NewCoin("award", math.NewInt(1000000000000000)))

	queryTimeout = 250 * time.Millisecond
	txConfig     = app.NewTxConfig()
)

type AccountFetcher interface {
	Account(ctx context.Context, addr string) (sdk.AccountI, error)
}

var _ AccountFetcher = (*QueryClient)(nil)

// RawTxClient is the client used for sending new transactions to the chain.
type RawTxClient struct {
	Identity Identity

	chainID        string
	client         txtypes.ServiceClient
	accountFetcher AccountFetcher
}

func NewRawTxClient(id Identity, chainID string, c *grpc.ClientConn, accountFetcher AccountFetcher) *RawTxClient {
	return &RawTxClient{
		Identity:       id,
		chainID:        chainID,
		client:         txtypes.NewServiceClient(c),
		accountFetcher: accountFetcher,
	}
}

// SendWaitTx sends a transaction and waits for it to be included in a block.
func (c *RawTxClient) SendWaitTx(ctx context.Context, txBytes []byte) (string, error) {
	hash, err := c.SendTx(ctx, txBytes)
	if err != nil {
		return "", err
	}

	if err = c.WaitForTx(ctx, hash); err != nil {
		return "", err
	}

	return hash, nil
}

type Msger interface {
	Msg(creator string) sdk.Msg
}

// BuildTx builds a transaction with the given messages and sign it.
// Sequence and account numbers will be fetched automatically from the chain.
func (c *RawTxClient) BuildTx(ctx context.Context, gasLimit uint64, fees sdk.Coins, msgers ...Msger) ([]byte, error) {
	account, err := c.accountFetcher.Account(ctx, c.Identity.Address.String())
	if err != nil {
		return nil, fmt.Errorf("fetch account: %w", err)
	}

	accSeq := account.GetSequence()
	accNum := account.GetAccountNumber()

	txBuilder := txConfig.NewTxBuilder()
	signMode := txConfig.SignModeHandler().DefaultMode()

	// build unsigned tx
	txBuilder.SetGasLimit(gasLimit)
	txBuilder.SetFeeAmount(fees)

	msgs := make([]sdk.Msg, len(msgers))
	for i, m := range msgers {
		msgs[i] = m.Msg(c.Identity.Address.String())
	}

	if err = txBuilder.SetMsgs(msgs...); err != nil {
		return nil, fmt.Errorf("set msgs: %w", err)
	}

	// First round: we gather all the signer infos. We use the "set empty
	// signature" hack to do that.
	sigV2 := signing.SignatureV2{
		PubKey: c.Identity.PrivKey.PubKey(),
		Data: &signing.SingleSignatureData{
			SignMode:  signing.SignMode(signMode),
			Signature: nil,
		},
		Sequence: accSeq,
	}

	err = txBuilder.SetSignatures(sigV2)
	if err != nil {
		return nil, fmt.Errorf("set empty signature: %w", err)
	}

	// Second round: all signer infos are set, so each signer can sign.
	signerData := xauthsigning.SignerData{
		ChainID:       c.chainID,
		AccountNumber: accNum,
		Sequence:      accSeq,
		PubKey:        c.Identity.PrivKey.PubKey(),
	}

	sigV2, err = tx.SignWithPrivKey(
		ctx,
		signing.SignMode(signMode),
		signerData,
		txBuilder,
		c.Identity.PrivKey,
		txConfig,
		accSeq,
	)
	if err != nil {
		return nil, fmt.Errorf("sign with priv key: %w", err)
	}

	err = txBuilder.SetSignatures(sigV2)
	if err != nil {
		return nil, fmt.Errorf("set signature: %w", err)
	}

	txBytes, err := txConfig.TxEncoder()(txBuilder.GetTx())
	if err != nil {
		return nil, fmt.Errorf("encode tx: %w", err)
	}

	return txBytes, nil
}

// SendTx broadcasts a signed transaction and returns its hash.
// This method does not wait until the transaction is actually added to the,
// blockchain. Use SendWaitForTx for that.
func (c *RawTxClient) SendTx(ctx context.Context, txBytes []byte) (string, error) {
	grpcRes, err := c.client.BroadcastTx(
		ctx,
		&txtypes.BroadcastTxRequest{
			Mode:    txtypes.BroadcastMode_BROADCAST_MODE_SYNC,
			TxBytes: txBytes,
		},
	)
	if err != nil {
		return "", err
	}

	if grpcRes.TxResponse.Code != 0 {
		return "", fmt.Errorf("tx failed: %s", grpcRes.TxResponse.RawLog)
	}

	return grpcRes.TxResponse.TxHash, nil
}

// WaitForTx requests the tx from hash, if not found, waits for some time and
// tries again. Returns an error if ctx is canceled.
func (c *RawTxClient) WaitForTx(ctx context.Context, hash string) error {
	tick := time.NewTicker(queryTimeout)
	defer tick.Stop()

	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-tick.C:
			_, err := c.client.GetTx(ctx, &txtypes.GetTxRequest{Hash: hash})
			if err == nil {
				return nil
			}

			if !strings.Contains(err.Error(), "not found") {
				return err
			}
		}
	}
}
