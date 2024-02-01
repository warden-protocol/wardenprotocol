package kms

type CryptoSystem string

const (
	ECDSA CryptoSystem = "ecdsa"
	EDDSA CryptoSystem = "eddsa"
)

// SigRequestData information required to build a signature request
type SigRequestData struct {
	KeyID   []byte
	ID      []byte
	SigHash []byte
}
