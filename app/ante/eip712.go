package ante

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	cryptotypes "github.com/cosmos/cosmos-sdk/crypto/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/tx/signing"
	authante "github.com/cosmos/cosmos-sdk/x/auth/ante"
	"github.com/cosmos/cosmos-sdk/x/auth/legacy/legacytx"
	authsigning "github.com/cosmos/cosmos-sdk/x/auth/signing"

	ethcrypto "github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/crypto/secp256k1"
	"github.com/evmos/ethermint/crypto/ethsecp256k1"
	"github.com/evmos/ethermint/ethereum/eip712"
	ethermint "github.com/evmos/ethermint/types"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
)

var ethermintCodec codec.ProtoCodecMarshaler

func init() {
	registry := codectypes.NewInterfaceRegistry()
	ethermint.RegisterInterfaces(registry)
	ethermintCodec = codec.NewProtoCodec(registry)
}

// Eip712SigVerificationDecorator Verify all signatures for a tx and return an error if any are invalid. Note,
// the Eip712SigVerificationDecorator decorator will not get executed on ReCheck.
//
// CONTRACT: Pubkeys are set in context for all signers before this decorator runs
// CONTRACT: Tx must implement SigVerifiableTx interface
type Eip712SigVerificationDecorator struct {
	ak              evmtypes.AccountKeeper
	signModeHandler authsigning.SignModeHandler
}

// NewEip712SigVerificationDecorator creates a new Eip712SigVerificationDecorator
func NewEip712SigVerificationDecorator(ak evmtypes.AccountKeeper, signModeHandler authsigning.SignModeHandler) Eip712SigVerificationDecorator {
	return Eip712SigVerificationDecorator{
		ak:              ak,
		signModeHandler: signModeHandler,
	}
}

// AnteHandle handles validation of EIP712 signed cosmos txs.
// it is not run on RecheckTx
func (svd Eip712SigVerificationDecorator) AnteHandle(ctx sdk.Context, tx sdk.Tx, simulate bool, next sdk.AnteHandler) (newCtx sdk.Context, err error) {
	// no need to verify signatures on recheck tx
	if ctx.IsReCheckTx() {
		return next(ctx, tx, simulate)
	}

	sigTx, ok := tx.(authsigning.SigVerifiableTx)
	if !ok {
		return ctx, sdkerrors.Wrapf(sdkerrors.ErrInvalidType, "tx %T doesn't implement authsigning.SigVerifiableTx", tx)
	}

	authSignTx, ok := tx.(authsigning.Tx)
	if !ok {
		return ctx, sdkerrors.Wrapf(sdkerrors.ErrInvalidType, "tx %T doesn't implement the authsigning.Tx interface", tx)
	}

	// stdSigs contains the sequence number, account number, and signatures.
	// When simulating, this would just be a 0-length slice.
	sigs, err := sigTx.GetSignaturesV2()
	if err != nil {
		return ctx, err
	}

	signerAddrs := sigTx.GetSigners()

	// EIP712 allows just one signature
	if len(sigs) != 1 {
		return ctx, sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "invalid number of signers (%d);  EIP712 signatures allows just one signature", len(sigs))
	}

	// check that signer length and signature length are the same
	if len(sigs) != len(signerAddrs) {
		return ctx, sdkerrors.Wrapf(sdkerrors.ErrUnauthorized, "invalid number of signer;  expected: %d, got %d", len(signerAddrs), len(sigs))
	}

	// EIP712 has just one signature, avoid looping here and only read index 0
	i := 0
	sig := sigs[i]

	acc, err := authante.GetSignerAcc(ctx, svd.ak, signerAddrs[i])
	if err != nil {
		return ctx, err
	}

	// retrieve pubkey
	pubKey := acc.GetPubKey()
	if !simulate && pubKey == nil {
		return ctx, sdkerrors.Wrap(sdkerrors.ErrInvalidPubKey, "pubkey on account is not set")
	}

	// Check account sequence number.
	if sig.Sequence != acc.GetSequence() {
		return ctx, sdkerrors.Wrapf(
			sdkerrors.ErrWrongSequence,
			"account sequence mismatch, expected %d, got %d", acc.GetSequence(), sig.Sequence,
		)
	}

	// retrieve signer data
	genesis := ctx.BlockHeight() == 0
	chainID := ctx.ChainID()

	var accNum uint64
	if !genesis {
		accNum = acc.GetAccountNumber()
	}

	signerData := authsigning.SignerData{
		ChainID:       chainID,
		AccountNumber: accNum,
		Sequence:      acc.GetSequence(),
	}

	if simulate {
		return next(ctx, tx, simulate)
	}

	if err := VerifySignature(pubKey, signerData, sig.Data, svd.signModeHandler, authSignTx); err != nil {
		errMsg := fmt.Errorf("signature verification failed; please verify account number (%d) and chain-id (%s): %w", accNum, chainID, err)
		return ctx, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, errMsg.Error())
	}

	return next(ctx, tx, simulate)
}

// VerifySignature verifies a transaction signature contained in SignatureData abstracting over different signing modes
// and single vs multi-signatures.
func VerifySignature(
	pubKey cryptotypes.PubKey,
	signerData authsigning.SignerData,
	sigData signing.SignatureData,
	_ authsigning.SignModeHandler,
	tx authsigning.Tx,
) error {
	switch data := sigData.(type) {
	case *signing.SingleSignatureData:
		if data.SignMode != signing.SignMode_SIGN_MODE_LEGACY_AMINO_JSON {
			return sdkerrors.Wrapf(sdkerrors.ErrNotSupported, "unexpected SignatureData %T: wrong SignMode", sigData)
		}

		// Note: this prevents the user from sending thrash data in the signature field
		if len(data.Signature) != 0 {
			return sdkerrors.Wrap(sdkerrors.ErrTooManySignatures, "invalid signature value; EIP712 must have the cosmos transaction signature empty")
		}

		// @contract: this code is reached only when Msg has Web3Tx extension (so this custom Ante handler flow),
		// and the signature is SIGN_MODE_LEGACY_AMINO_JSON which is supported for EIP712 for now

		msgs := tx.GetMsgs()
		if len(msgs) == 0 {
			return sdkerrors.Wrap(sdkerrors.ErrNoSignatures, "tx doesn't contain any msgs to verify signature")
		}

		txBytes := legacytx.StdSignBytes(
			signerData.ChainID,
			signerData.AccountNumber,
			signerData.Sequence,
			tx.GetTimeoutHeight(),
			legacytx.StdFee{
				Amount: tx.GetFee(),
				Gas:    tx.GetGas(),
			},
			msgs, tx.GetMemo(),
		)

		signerChainID, err := ethermint.ParseChainID(signerData.ChainID)
		if err != nil {
			return sdkerrors.Wrapf(err, "failed to parse chainID: %s", signerData.ChainID)
		}

		txWithExtensions, ok := tx.(authante.HasExtensionOptionsTx)
		if !ok {
			return sdkerrors.Wrap(sdkerrors.ErrUnknownExtensionOptions, "tx doesnt contain any extensions")
		}
		opts := txWithExtensions.GetExtensionOptions()
		if len(opts) != 1 {
			return sdkerrors.Wrap(sdkerrors.ErrUnknownExtensionOptions, "tx doesnt contain expected amount of extension options")
		}

		var optIface ethermint.ExtensionOptionsWeb3TxI

		if err := ethermintCodec.UnpackAny(opts[0], &optIface); err != nil {
			return sdkerrors.Wrap(err, "failed to proto-unpack ExtensionOptionsWeb3Tx")
		}

		extOpt, ok := optIface.(*ethermint.ExtensionOptionsWeb3Tx)
		if !ok {
			return sdkerrors.Wrap(sdkerrors.ErrInvalidChainID, "unknown extension option")
		}

		if extOpt.TypedDataChainID != signerChainID.Uint64() {
			return sdkerrors.Wrap(sdkerrors.ErrInvalidChainID, "invalid chainID")
		}

		if len(extOpt.FeePayer) == 0 {
			return sdkerrors.Wrap(sdkerrors.ErrUnknownExtensionOptions, "no feePayer on ExtensionOptionsWeb3Tx")
		}
		feePayer, err := sdk.AccAddressFromBech32(extOpt.FeePayer)
		if err != nil {
			return sdkerrors.Wrap(err, "failed to parse feePayer from ExtensionOptionsWeb3Tx")
		}

		feeDelegation := &eip712.FeeDelegationOptions{
			FeePayer: feePayer,
		}

		typedData, err := eip712.WrapTxToTypedData(ethermintCodec, extOpt.TypedDataChainID, msgs[0], txBytes, feeDelegation)
		if err != nil {
			return sdkerrors.Wrap(err, "failed to pack tx data in EIP712 object")
		}

		sigHash, err := eip712.ComputeTypedDataHash(typedData)
		if err != nil {
			return err
		}

		feePayerSig := extOpt.FeePayerSig
		if len(feePayerSig) != ethcrypto.SignatureLength {
			return sdkerrors.Wrap(sdkerrors.ErrorInvalidSigner, "signature length doesn't match typical [R||S||V] signature 65 bytes")
		}

		// Remove the recovery offset if needed (ie. Metamask eip712 signature)
		if feePayerSig[ethcrypto.RecoveryIDOffset] == 27 || feePayerSig[ethcrypto.RecoveryIDOffset] == 28 {
			feePayerSig[ethcrypto.RecoveryIDOffset] -= 27
		}

		feePayerPubkey, err := secp256k1.RecoverPubkey(sigHash, feePayerSig)
		if err != nil {
			return sdkerrors.Wrap(err, "failed to recover delegated fee payer from sig")
		}

		ecPubKey, err := ethcrypto.UnmarshalPubkey(feePayerPubkey)
		if err != nil {
			return sdkerrors.Wrap(err, "failed to unmarshal recovered fee payer pubkey")
		}

		pk := &ethsecp256k1.PubKey{
			Key: ethcrypto.CompressPubkey(ecPubKey),
		}

		if !pubKey.Equals(pk) {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidPubKey, "feePayer pubkey %s is different from transaction pubkey %s", pubKey, pk)
		}

		recoveredFeePayerAcc := sdk.AccAddress(pk.Address().Bytes())

		if !recoveredFeePayerAcc.Equals(feePayer) {
			return sdkerrors.Wrapf(sdkerrors.ErrorInvalidSigner, "failed to verify delegated fee payer %s signature", recoveredFeePayerAcc)
		}

		// VerifySignature of ethsecp256k1 accepts 64 byte signature [R||S]
		// WARNING! Under NO CIRCUMSTANCES try to use pubKey.VerifySignature there
		if !secp256k1.VerifySignature(pubKey.Bytes(), sigHash, feePayerSig[:len(feePayerSig)-1]) {
			return sdkerrors.Wrap(sdkerrors.ErrorInvalidSigner, "unable to verify signer signature of EIP712 typed data")
		}

		return nil
	default:
		return sdkerrors.Wrapf(sdkerrors.ErrTooManySignatures, "unexpected SignatureData %T", sigData)
	}
}
