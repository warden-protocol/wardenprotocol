package ethsecp256k1

import (
	"bytes"
	"crypto/ecdsa"
	"crypto/subtle"
	"fmt"

	"github.com/cosmos/cosmos-sdk/codec"
	cryptotypes "github.com/cosmos/cosmos-sdk/crypto/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/ethereum/go-ethereum/crypto"

	tmcrypto "github.com/tendermint/tendermint/crypto"
)

const (
	// PrivKeySize defines the size of the PrivKey bytes
	PrivKeySize = 32
	// PubKeySize defines the size of the PubKey bytes
	PubKeySize = 33
	// KeyType is the string constant for the Secp256k1 algorithm
	KeyType = "eth_secp256k1"
)

// Amino encoding names
const (
	// PrivKeyName defines the amino encoding name for the EthSecp256k1 private key
	PrivKeyName = "ethermint/PrivKeyEthSecp256k1"
	// PubKeyName defines the amino encoding name for the EthSecp256k1 public key
	PubKeyName = "ethermint/PubKeyEthSecp256k1"
)

// ----------------------------------------------------------------------------
// secp256k1 Private Key

var (
	_ cryptotypes.PrivKey  = &PrivKey{}
	_ codec.AminoMarshaler = &PrivKey{}
)

// GenerateKey generates a new random private key. It returns an error upon
// failure.
func GenerateKey() (*PrivKey, error) {
	priv, err := crypto.GenerateKey()
	if err != nil {
		return nil, err
	}

	return &PrivKey{
		Key: crypto.FromECDSA(priv),
	}, nil
}

// Bytes returns the byte representation of the ECDSA Private Key.
func (privKey PrivKey) Bytes() []byte {
	bz := make([]byte, len(privKey.Key))
	copy(bz, privKey.Key)

	return bz
}

// PubKey returns the ECDSA private key's public key. If the privkey is not valid
// it returns a nil value.
func (privKey PrivKey) PubKey() cryptotypes.PubKey {
	ecdsaPrivKey, err := privKey.ToECDSA()
	if err != nil {
		return nil
	}

	return &PubKey{
		Key: crypto.CompressPubkey(&ecdsaPrivKey.PublicKey),
	}
}

// Equals returns true if two ECDSA private keys are equal and false otherwise.
func (privKey PrivKey) Equals(other cryptotypes.LedgerPrivKey) bool {
	return privKey.Type() == other.Type() && subtle.ConstantTimeCompare(privKey.Bytes(), other.Bytes()) == 1
}

// Type returns eth_secp256k1
func (privKey PrivKey) Type() string {
	return KeyType
}

// MarshalAmino overrides Amino binary marshaling.
func (privKey PrivKey) MarshalAmino() ([]byte, error) {
	return privKey.Key, nil
}

// UnmarshalAmino overrides Amino binary marshaling.
func (privKey *PrivKey) UnmarshalAmino(bz []byte) error {
	if len(bz) != PrivKeySize {
		return fmt.Errorf("invalid privkey size, expected %d got %d", PrivKeySize, len(bz))
	}
	privKey.Key = bz

	return nil
}

// MarshalAminoJSON overrides Amino JSON marshaling.
func (privKey PrivKey) MarshalAminoJSON() ([]byte, error) {
	// When we marshal to Amino JSON, we don't marshal the "key" field itself,
	// just its contents (i.e. the key bytes).
	return privKey.MarshalAmino()
}

// UnmarshalAminoJSON overrides Amino JSON marshaling.
func (privKey *PrivKey) UnmarshalAminoJSON(bz []byte) error {
	return privKey.UnmarshalAmino(bz)
}

// Sign creates a recoverable ECDSA signature on the secp256k1 curve over the
// provided hash of the message. The produced signature is 65 bytes
// where the last byte contains the recovery ID.
func (privKey PrivKey) Sign(digestBz []byte) ([]byte, error) {
	// TODO: remove
	if len(digestBz) != crypto.DigestLength {
		digestBz = crypto.Keccak256Hash(digestBz).Bytes()
	}

	key, err := privKey.ToECDSA()
	if err != nil {
		return nil, err
	}

	return crypto.Sign(digestBz, key)
}

// ToECDSA returns the ECDSA private key as a reference to ecdsa.PrivateKey type.
func (privKey PrivKey) ToECDSA() (*ecdsa.PrivateKey, error) {
	return crypto.ToECDSA(privKey.Bytes())
}

// ----------------------------------------------------------------------------
// secp256k1 Public Key

var (
	_ cryptotypes.PubKey   = &PubKey{}
	_ codec.AminoMarshaler = &PubKey{}
)

// Address returns the address of the ECDSA public key.
// The function will return an empty address if the public key is invalid.
func (pubKey PubKey) Address() tmcrypto.Address {
	pubk, err := crypto.DecompressPubkey(pubKey.Key)
	if err != nil {
		return nil
	}

	return tmcrypto.Address(crypto.PubkeyToAddress(*pubk).Bytes())
}

// Bytes returns the raw bytes of the ECDSA public key.
func (pubKey PubKey) Bytes() []byte {
	bz := make([]byte, len(pubKey.Key))
	copy(bz, pubKey.Key)

	return bz
}

// String implements the fmt.Stringer interface.
func (pubKey PubKey) String() string {
	return fmt.Sprintf("EthPubKeySecp256k1{%X}", pubKey.Key)
}

// Type returns eth_secp256k1
func (pubKey PubKey) Type() string {
	return KeyType
}

// Equals returns true if the pubkey type is the same and their bytes are deeply equal.
func (pubKey PubKey) Equals(other cryptotypes.PubKey) bool {
	return pubKey.Type() == other.Type() && bytes.Equal(pubKey.Bytes(), other.Bytes())
}

// MarshalAmino overrides Amino binary marshaling.
func (pubKey PubKey) MarshalAmino() ([]byte, error) {
	return pubKey.Key, nil
}

// UnmarshalAmino overrides Amino binary marshaling.
func (pubKey *PubKey) UnmarshalAmino(bz []byte) error {
	if len(bz) != PubKeySize {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidPubKey, "invalid pubkey size, expected %d, got %d", PubKeySize, len(bz))
	}
	pubKey.Key = bz

	return nil
}

// MarshalAminoJSON overrides Amino JSON marshaling.
func (pubKey PubKey) MarshalAminoJSON() ([]byte, error) {
	// When we marshal to Amino JSON, we don't marshal the "key" field itself,
	// just its contents (i.e. the key bytes).
	return pubKey.MarshalAmino()
}

// UnmarshalAminoJSON overrides Amino JSON marshaling.
func (pubKey *PubKey) UnmarshalAminoJSON(bz []byte) error {
	return pubKey.UnmarshalAmino(bz)
}

// VerifySignature verifies that the ECDSA public key created a given signature over
// the provided message. It will calculate the Keccak256 hash of the message
// prior to verification.
//
// CONTRACT: The signature should be in [R || S] format.
func (pubKey PubKey) VerifySignature(msg, sig []byte) bool {
	if len(sig) == crypto.SignatureLength {
		// remove recovery ID (V) if contained in the signature
		sig = sig[:len(sig)-1]
	}

	// the signature needs to be in [R || S] format when provided to VerifySignature
	return crypto.VerifySignature(pubKey.Key, crypto.Keccak256Hash(msg).Bytes(), sig)
}
