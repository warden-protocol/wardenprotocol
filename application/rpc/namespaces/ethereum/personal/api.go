package personal

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/evmos/ethermint/rpc/backend"

	"github.com/evmos/ethermint/crypto/hd"
	ethermint "github.com/evmos/ethermint/types"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/ethereum/go-ethereum/accounts"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/crypto"

	evmtypes "github.com/evmos/ethermint/x/evm/types"
)

// PrivateAccountAPI is the personal_ prefixed set of APIs in the Web3 JSON-RPC spec.
type PrivateAccountAPI struct {
	backend    backend.EVMBackend
	logger     log.Logger
	hdPathIter ethermint.HDPathIterator
}

// NewAPI creates an instance of the public Personal Eth API.
func NewAPI(
	logger log.Logger,
	backend backend.EVMBackend,
) *PrivateAccountAPI {
	cfg := sdk.GetConfig()
	basePath := cfg.GetFullBIP44Path()

	iterator, err := ethermint.NewHDPathIterator(basePath, true)
	if err != nil {
		panic(err)
	}

	return &PrivateAccountAPI{
		logger:     logger.With("api", "personal"),
		hdPathIter: iterator,
		backend:    backend,
	}
}

// ImportRawKey armors and encrypts a given raw hex encoded ECDSA key and stores it into the key directory.
// The name of the key will have the format "personal_<length-keys>", where <length-keys> is the total number of
// keys stored on the keyring.
//
// NOTE: The key will be both armored and encrypted using the same passphrase.
func (api *PrivateAccountAPI) ImportRawKey(privkey, password string) (common.Address, error) {
	api.logger.Debug("personal_importRawKey")
	return api.backend.ImportRawKey(privkey, password)
}

// ListAccounts will return a list of addresses for accounts this node manages.
func (api *PrivateAccountAPI) ListAccounts() ([]common.Address, error) {
	api.logger.Debug("personal_listAccounts")
	return api.backend.ListAccounts()
}

// LockAccount will lock the account associated with the given address when it's unlocked.
// It removes the key corresponding to the given address from the API's local keys.
func (api *PrivateAccountAPI) LockAccount(address common.Address) bool {
	api.logger.Debug("personal_lockAccount", "address", address.String())
	api.logger.Info("personal_lockAccount not supported")
	// TODO: Not supported. See underlying issue  https://github.com/99designs/keyring/issues/85
	return false
}

// NewAccount will create a new account and returns the address for the new account.
func (api *PrivateAccountAPI) NewAccount(password string) (common.Address, error) {
	api.logger.Debug("personal_newAccount")

	name := "key_" + time.Now().UTC().Format(time.RFC3339)

	// create the mnemonic and save the account
	hdPath := api.hdPathIter()

	info, err := api.backend.NewMnemonic(name, keyring.English, hdPath.String(), password, hd.EthSecp256k1)
	if err != nil {
		return common.Address{}, err
	}

	addr := common.BytesToAddress(info.GetPubKey().Address().Bytes())
	api.logger.Info("Your new key was generated", "address", addr.String())
	api.logger.Info("Please backup your key file!", "path", os.Getenv("HOME")+"/.ethermint/"+name) // TODO: pass the correct binary
	api.logger.Info("Please remember your password!")
	return addr, nil
}

// UnlockAccount will unlock the account associated with the given address with
// the given password for duration seconds. If duration is nil it will use a
// default of 300 seconds. It returns an indication if the account was unlocked.
func (api *PrivateAccountAPI) UnlockAccount(_ context.Context, addr common.Address, _ string, _ *uint64) (bool, error) {
	api.logger.Debug("personal_unlockAccount", "address", addr.String())
	// TODO: Not supported. See underlying issue  https://github.com/99designs/keyring/issues/85
	return false, nil
}

// SendTransaction will create a transaction from the given arguments and
// tries to sign it with the key associated with args.To. If the given password isn't
// able to decrypt the key it fails.
func (api *PrivateAccountAPI) SendTransaction(_ context.Context, args evmtypes.TransactionArgs, _ string) (common.Hash, error) {
	api.logger.Debug("personal_sendTransaction", "address", args.To.String())
	return api.backend.SendTransaction(args)
}

// Sign calculates an Ethereum ECDSA signature for:
// keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))
//
// Note, the produced signature conforms to the secp256k1 curve R, S and V values,
// where the V value will be 27 or 28 for legacy reasons.
//
// The key used to calculate the signature is decrypted with the given password.
//
// https://github.com/ethereum/go-ethereum/wiki/Management-APIs#personal_sign
func (api *PrivateAccountAPI) Sign(_ context.Context, data hexutil.Bytes, addr common.Address, _ string) (hexutil.Bytes, error) {
	api.logger.Debug("personal_sign", "data", data, "address", addr.String())
	return api.backend.Sign(addr, data)
}

// EcRecover returns the address for the account that was used to create the signature.
// Note, this function is compatible with eth_sign and personal_sign. As such it recovers
// the address of:
// hash = keccak256("\x19Ethereum Signed Message:\n"${message length}${message})
// addr = ecrecover(hash, signature)
//
// Note, the signature must conform to the secp256k1 curve R, S and V values, where
// the V value must be 27 or 28 for legacy reasons.
//
// https://github.com/ethereum/go-ethereum/wiki/Management-APIs#personal_ecRecove
func (api *PrivateAccountAPI) EcRecover(_ context.Context, data, sig hexutil.Bytes) (common.Address, error) {
	api.logger.Debug("personal_ecRecover", "data", data, "sig", sig)

	if len(sig) != crypto.SignatureLength {
		return common.Address{}, fmt.Errorf("signature must be %d bytes long", crypto.SignatureLength)
	}

	if sig[crypto.RecoveryIDOffset] != 27 && sig[crypto.RecoveryIDOffset] != 28 {
		return common.Address{}, fmt.Errorf("invalid Ethereum signature (V is not 27 or 28)")
	}

	sig[crypto.RecoveryIDOffset] -= 27 // Transform yellow paper V from 27/28 to 0/1

	pubkey, err := crypto.SigToPub(accounts.TextHash(data), sig)
	if err != nil {
		return common.Address{}, err
	}

	return crypto.PubkeyToAddress(*pubkey), nil
}

// Unpair deletes a pairing between wallet and ethermint.
func (api *PrivateAccountAPI) Unpair(_ context.Context, url, pin string) error {
	api.logger.Debug("personal_unpair", "url", url, "pin", pin)
	api.logger.Info("personal_unpair for smartcard wallet not supported")
	// TODO: Smartcard wallet not supported yet, refer to: https://github.com/ethereum/go-ethereum/blob/master/accounts/scwallet/README.md
	return fmt.Errorf("smartcard wallet not supported yet")
}

// InitializeWallet initializes a new wallet at the provided URL, by generating and returning a new private key.
func (api *PrivateAccountAPI) InitializeWallet(_ context.Context, url string) (string, error) {
	api.logger.Debug("personal_initializeWallet", "url", url)
	api.logger.Info("personal_initializeWallet for smartcard wallet not supported")
	// TODO: Smartcard wallet not supported yet, refer to: https://github.com/ethereum/go-ethereum/blob/master/accounts/scwallet/README.md
	return "", fmt.Errorf("smartcard wallet not supported yet")
}

// RawWallet is a JSON representation of an accounts.Wallet interface, with its
// data contents extracted into plain fields.
type RawWallet struct {
	URL      string             `json:"url"`
	Status   string             `json:"status"`
	Failure  string             `json:"failure,omitempty"`
	Accounts []accounts.Account `json:"accounts,omitempty"`
}

// ListWallets will return a list of wallets this node manages.
func (api *PrivateAccountAPI) ListWallets() []RawWallet {
	api.logger.Debug("personal_ListWallets")
	api.logger.Info("currently wallet level that manages accounts is not supported")
	return ([]RawWallet)(nil)
}
