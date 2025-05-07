// Code generated - DO NOT EDIT.
// This file is a generated binding and any manual changes will be lost.

package warden

import (
	"errors"
	"math/big"
	"strings"

	ethereum "github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/event"
)

// Reference imports to suppress errors if they are not otherwise used.
var (
	_ = errors.New
	_ = big.NewInt
	_ = strings.NewReader
	_ = ethereum.NotFound
	_ = bind.Bind
	_ = common.Big1
	_ = types.BloomLookup
	_ = event.NewSubscription
	_ = abi.ConvertType
)

// AddressesResponse is an auto generated low-level Go binding around an user-defined struct.
type AddressesResponse struct {
	AddressValue string
	AddressType  uint8
}

// Key is an auto generated low-level Go binding around an user-defined struct.
type Key struct {
	Id                uint64
	SpaceId           uint64
	KeychainId        uint64
	KeyType           uint8
	PublicKey         []byte
	ApproveTemplateId uint64
	RejectTemplateId  uint64
}

// KeyRequest is an auto generated low-level Go binding around an user-defined struct.
type KeyRequest struct {
	Id                   uint64
	Creator              common.Address
	SpaceId              uint64
	KeychainId           uint64
	KeyType              uint8
	Status               uint8
	RejectReason         string
	ApproveTemplateId    uint64
	RejectTemplateId     uint64
	DeductedKeychainFees []TypesCoin
}

// KeyResponse is an auto generated low-level Go binding around an user-defined struct.
type KeyResponse struct {
	Key       Key
	Addresses []AddressesResponse
}

// Keychain is an auto generated low-level Go binding around an user-defined struct.
type Keychain struct {
	Id          uint64
	Creator     common.Address
	Name        string
	Admins      []common.Address
	Writers     []common.Address
	Fees        KeychainFees
	Description string
	Url         string
	KeybaseId   string
}

// KeychainFees is an auto generated low-level Go binding around an user-defined struct.
type KeychainFees struct {
	KeyReq []TypesCoin
	SigReq []TypesCoin
}

// SignRequest is an auto generated low-level Go binding around an user-defined struct.
type SignRequest struct {
	Id                   uint64
	Creator              common.Address
	KeyId                uint64
	DataForSigning       []byte
	Status               uint8
	Result               []byte
	EncryptionKey        []byte
	DeductedKeychainFees []TypesCoin
	BroadcastType        uint8
}

// Space is an auto generated low-level Go binding around an user-defined struct.
type Space struct {
	Id                     uint64
	Creator                common.Address
	Owners                 []common.Address
	Nonce                  uint64
	ApproveAdminTemplateId uint64
	RejectAdminTemplateId  uint64
	ApproveSignTemplateId  uint64
	RejectSignTemplateId   uint64
}

// TypesCoin is an auto generated low-level Go binding around an user-defined struct.
type TypesCoin struct {
	Denom  string
	Amount *big.Int
}

// TypesPageRequest is an auto generated low-level Go binding around an user-defined struct.
type TypesPageRequest struct {
	Key        []byte
	Offset     uint64
	Limit      uint64
	CountTotal bool
	Reverse    bool
}

// TypesPageResponse is an auto generated low-level Go binding around an user-defined struct.
type TypesPageResponse struct {
	NextKey []byte
	Total   uint64
}

// IWardenMetaData contains all meta data concerning the IWarden contract.
var IWardenMetaData = &bind.MetaData{
	ABI: "[{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"newAdmin\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"adminsCount\",\"type\":\"uint64\"}],\"name\":\"AddKeychainAdmin\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"newWriter\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"writersCount\",\"type\":\"uint64\"}],\"name\":\"AddKeychainWriter\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint64\",\"name\":\"spaceId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"AddSpaceOwner\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"}],\"name\":\"FulfilSignRequest\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"enumKeyType\",\"name\":\"keyType\",\"type\":\"uint8\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"spaceId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"keychainId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"approveTemplateId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"rejectTemplateId\",\"type\":\"uint64\"}],\"name\":\"NewKey\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"spaceId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"keychainId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"approveTemplateId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"rejectTemplateId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"enumKeyType\",\"name\":\"keyType\",\"type\":\"uint8\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"}],\"name\":\"NewKeyRequest\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"}],\"name\":\"NewKeychain\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"keyId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"enumBroadcastType\",\"name\":\"broadcastType\",\"type\":\"uint8\"}],\"name\":\"NewSignRequest\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"ownersCount\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"approveAdminTemplateId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"rejectAdminTemplateId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"approveSignTemplateId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"rejectSignTemplateId\",\"type\":\"uint64\"}],\"name\":\"NewSpace\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"}],\"name\":\"RejectKeyRequest\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"}],\"name\":\"RejectSignRequest\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint64\",\"name\":\"keychainId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"admin\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"adminsCount\",\"type\":\"uint64\"}],\"name\":\"RemoveKeychainAdmin\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint64\",\"name\":\"spaceId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"removedOwner\",\"type\":\"address\"}],\"name\":\"RemoveSpaceOwner\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"approveTemplateId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"rejectTemplateId\",\"type\":\"uint64\"}],\"name\":\"UpdateKey\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"components\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"keyReq\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"sigReq\",\"type\":\"tuple[]\"}],\"indexed\":false,\"internalType\":\"structKeychainFees\",\"name\":\"keychainFees\",\"type\":\"tuple\"}],\"name\":\"UpdateKeychain\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint64\",\"name\":\"spaceId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"approveAdminTemplateId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"rejectAdminTemplateId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"approveSignTemplateId\",\"type\":\"uint64\"},{\"indexed\":false,\"internalType\":\"uint64\",\"name\":\"rejectSignTemplateId\",\"type\":\"uint64\"}],\"name\":\"UpdateSpace\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"keychainId\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"newAdmin\",\"type\":\"address\"}],\"name\":\"addKeychainAdmin\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"keychainId\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"newWriter\",\"type\":\"address\"}],\"name\":\"addKeychainWriter\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"spaceId\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"nonce\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"actionTimeoutHeight\",\"type\":\"uint64\"},{\"internalType\":\"string\",\"name\":\"expectedApproveExpression\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"expectedRejectExpression\",\"type\":\"string\"}],\"name\":\"addSpaceOwner\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"key\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"offset\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"limit\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"countTotal\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"reverse\",\"type\":\"bool\"}],\"internalType\":\"structTypes.PageRequest\",\"name\":\"pageRequest\",\"type\":\"tuple\"},{\"internalType\":\"int32[]\",\"name\":\"deriveAddresses\",\"type\":\"int32[]\"}],\"name\":\"allKeys\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"spaceId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"keychainId\",\"type\":\"uint64\"},{\"internalType\":\"enumKeyType\",\"name\":\"keyType\",\"type\":\"uint8\"},{\"internalType\":\"bytes\",\"name\":\"publicKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"approveTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"rejectTemplateId\",\"type\":\"uint64\"}],\"internalType\":\"structKey\",\"name\":\"key\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"addressValue\",\"type\":\"string\"},{\"internalType\":\"enumAddressType\",\"name\":\"addressType\",\"type\":\"uint8\"}],\"internalType\":\"structAddressesResponse[]\",\"name\":\"addresses\",\"type\":\"tuple[]\"}],\"internalType\":\"structKeyResponse[]\",\"name\":\"keys\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"bytes\",\"name\":\"nextKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"total\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.PageResponse\",\"name\":\"pageResponse\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"requestId\",\"type\":\"uint64\"},{\"internalType\":\"bytes\",\"name\":\"pubKey\",\"type\":\"bytes\"}],\"name\":\"fulfilKeyRequest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"requestId\",\"type\":\"uint64\"},{\"internalType\":\"bytes\",\"name\":\"signedData\",\"type\":\"bytes\"}],\"name\":\"fulfilSignRequest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"int32[]\",\"name\":\"deriveAddresses\",\"type\":\"int32[]\"}],\"name\":\"keyById\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"spaceId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"keychainId\",\"type\":\"uint64\"},{\"internalType\":\"enumKeyType\",\"name\":\"keyType\",\"type\":\"uint8\"},{\"internalType\":\"bytes\",\"name\":\"publicKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"approveTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"rejectTemplateId\",\"type\":\"uint64\"}],\"internalType\":\"structKey\",\"name\":\"key\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"addressValue\",\"type\":\"string\"},{\"internalType\":\"enumAddressType\",\"name\":\"addressType\",\"type\":\"uint8\"}],\"internalType\":\"structAddressesResponse[]\",\"name\":\"addresses\",\"type\":\"tuple[]\"}],\"internalType\":\"structKeyResponse\",\"name\":\"key\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"}],\"name\":\"keyRequestById\",\"outputs\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"spaceId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"keychainId\",\"type\":\"uint64\"},{\"internalType\":\"enumKeyType\",\"name\":\"keyType\",\"type\":\"uint8\"},{\"internalType\":\"enumKeyRequestStatus\",\"name\":\"status\",\"type\":\"uint8\"},{\"internalType\":\"string\",\"name\":\"rejectReason\",\"type\":\"string\"},{\"internalType\":\"uint64\",\"name\":\"approveTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"rejectTemplateId\",\"type\":\"uint64\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"deductedKeychainFees\",\"type\":\"tuple[]\"}],\"internalType\":\"structKeyRequest\",\"name\":\"keyRequest\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"key\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"offset\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"limit\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"countTotal\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"reverse\",\"type\":\"bool\"}],\"internalType\":\"structTypes.PageRequest\",\"name\":\"pageRequest\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"keychainId\",\"type\":\"uint64\"},{\"internalType\":\"enumKeyRequestStatus\",\"name\":\"status\",\"type\":\"uint8\"},{\"internalType\":\"uint64\",\"name\":\"spaceId\",\"type\":\"uint64\"}],\"name\":\"keyRequests\",\"outputs\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"spaceId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"keychainId\",\"type\":\"uint64\"},{\"internalType\":\"enumKeyType\",\"name\":\"keyType\",\"type\":\"uint8\"},{\"internalType\":\"enumKeyRequestStatus\",\"name\":\"status\",\"type\":\"uint8\"},{\"internalType\":\"string\",\"name\":\"rejectReason\",\"type\":\"string\"},{\"internalType\":\"uint64\",\"name\":\"approveTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"rejectTemplateId\",\"type\":\"uint64\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"deductedKeychainFees\",\"type\":\"tuple[]\"}],\"internalType\":\"structKeyRequest[]\",\"name\":\"keyRequests\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"bytes\",\"name\":\"nextKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"total\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.PageResponse\",\"name\":\"pageResponse\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"}],\"name\":\"keychainById\",\"outputs\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"address[]\",\"name\":\"admins\",\"type\":\"address[]\"},{\"internalType\":\"address[]\",\"name\":\"writers\",\"type\":\"address[]\"},{\"components\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"keyReq\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"sigReq\",\"type\":\"tuple[]\"}],\"internalType\":\"structKeychainFees\",\"name\":\"fees\",\"type\":\"tuple\"},{\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"url\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"keybaseId\",\"type\":\"string\"}],\"internalType\":\"structKeychain\",\"name\":\"keychain\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"key\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"offset\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"limit\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"countTotal\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"reverse\",\"type\":\"bool\"}],\"internalType\":\"structTypes.PageRequest\",\"name\":\"pageRequest\",\"type\":\"tuple\"}],\"name\":\"keychains\",\"outputs\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"address[]\",\"name\":\"admins\",\"type\":\"address[]\"},{\"internalType\":\"address[]\",\"name\":\"writers\",\"type\":\"address[]\"},{\"components\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"keyReq\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"sigReq\",\"type\":\"tuple[]\"}],\"internalType\":\"structKeychainFees\",\"name\":\"fees\",\"type\":\"tuple\"},{\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"url\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"keybaseId\",\"type\":\"string\"}],\"internalType\":\"structKeychain[]\",\"name\":\"keychains\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"bytes\",\"name\":\"nextKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"total\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.PageResponse\",\"name\":\"pageResponse\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"key\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"offset\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"limit\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"countTotal\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"reverse\",\"type\":\"bool\"}],\"internalType\":\"structTypes.PageRequest\",\"name\":\"pageRequest\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"spaceId\",\"type\":\"uint64\"},{\"internalType\":\"int32[]\",\"name\":\"deriveAddresses\",\"type\":\"int32[]\"}],\"name\":\"keysBySpaceId\",\"outputs\":[{\"components\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"spaceId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"keychainId\",\"type\":\"uint64\"},{\"internalType\":\"enumKeyType\",\"name\":\"keyType\",\"type\":\"uint8\"},{\"internalType\":\"bytes\",\"name\":\"publicKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"approveTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"rejectTemplateId\",\"type\":\"uint64\"}],\"internalType\":\"structKey\",\"name\":\"key\",\"type\":\"tuple\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"addressValue\",\"type\":\"string\"},{\"internalType\":\"enumAddressType\",\"name\":\"addressType\",\"type\":\"uint8\"}],\"internalType\":\"structAddressesResponse[]\",\"name\":\"addresses\",\"type\":\"tuple[]\"}],\"internalType\":\"structKeyResponse[]\",\"name\":\"keys\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"bytes\",\"name\":\"nextKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"total\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.PageResponse\",\"name\":\"pageResponse\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"spaceId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"keychainId\",\"type\":\"uint64\"},{\"internalType\":\"enumKeyType\",\"name\":\"keyType\",\"type\":\"uint8\"},{\"internalType\":\"uint64\",\"name\":\"approveTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"rejectTemplateId\",\"type\":\"uint64\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"maxKeychainFees\",\"type\":\"tuple[]\"},{\"internalType\":\"uint64\",\"name\":\"nonce\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"actionTimeoutHeight\",\"type\":\"uint64\"},{\"internalType\":\"string\",\"name\":\"expectedApproveExpression\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"expectedRejectExpression\",\"type\":\"string\"}],\"name\":\"newKeyRequest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"components\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"keyReq\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"sigReq\",\"type\":\"tuple[]\"}],\"internalType\":\"structKeychainFees\",\"name\":\"keychainFees\",\"type\":\"tuple\"},{\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"url\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"keybaseId\",\"type\":\"string\"}],\"name\":\"newKeychain\",\"outputs\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"keyId\",\"type\":\"uint64\"},{\"internalType\":\"bytes\",\"name\":\"input\",\"type\":\"bytes\"},{\"internalType\":\"bytes[]\",\"name\":\"analyzers\",\"type\":\"bytes[]\"},{\"internalType\":\"bytes\",\"name\":\"encryptionKey\",\"type\":\"bytes\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"maxKeychainFees\",\"type\":\"tuple[]\"},{\"internalType\":\"uint64\",\"name\":\"nonce\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"actionTimeoutHeight\",\"type\":\"uint64\"},{\"internalType\":\"string\",\"name\":\"expectedApproveExpression\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"expectedRejectExpression\",\"type\":\"string\"},{\"internalType\":\"enumBroadcastType\",\"name\":\"broadcastType\",\"type\":\"uint8\"}],\"name\":\"newSignRequest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"approveAdminTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"rejectAdminTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"approveSignTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"rejectSignTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"address[]\",\"name\":\"additionalOwners\",\"type\":\"address[]\"}],\"name\":\"newSpace\",\"outputs\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"requestId\",\"type\":\"uint64\"},{\"internalType\":\"string\",\"name\":\"rejectReason\",\"type\":\"string\"}],\"name\":\"rejectKeyRequest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"requestId\",\"type\":\"uint64\"},{\"internalType\":\"string\",\"name\":\"rejectReason\",\"type\":\"string\"}],\"name\":\"rejectSignRequest\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"keychainId\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"admin\",\"type\":\"address\"}],\"name\":\"removeKeychainAdmin\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"spaceId\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"nonce\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"actionTimeoutHeight\",\"type\":\"uint64\"},{\"internalType\":\"string\",\"name\":\"expectedApproveExpression\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"expectedRejectExpression\",\"type\":\"string\"}],\"name\":\"removeSpaceOwner\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"}],\"name\":\"signRequestById\",\"outputs\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"keyId\",\"type\":\"uint64\"},{\"internalType\":\"bytes\",\"name\":\"dataForSigning\",\"type\":\"bytes\"},{\"internalType\":\"enumSignRequestStatus\",\"name\":\"status\",\"type\":\"uint8\"},{\"internalType\":\"bytes\",\"name\":\"result\",\"type\":\"bytes\"},{\"internalType\":\"bytes\",\"name\":\"encryptionKey\",\"type\":\"bytes\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"deductedKeychainFees\",\"type\":\"tuple[]\"},{\"internalType\":\"enumBroadcastType\",\"name\":\"broadcastType\",\"type\":\"uint8\"}],\"internalType\":\"structSignRequest\",\"name\":\"signRequest\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"key\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"offset\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"limit\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"countTotal\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"reverse\",\"type\":\"bool\"}],\"internalType\":\"structTypes.PageRequest\",\"name\":\"pageRequest\",\"type\":\"tuple\"},{\"internalType\":\"uint64\",\"name\":\"keychainId\",\"type\":\"uint64\"},{\"internalType\":\"enumSignRequestStatus\",\"name\":\"status\",\"type\":\"uint8\"},{\"internalType\":\"enumOptionalBroadcastType\",\"name\":\"optionalBroadcastType\",\"type\":\"uint8\"}],\"name\":\"signRequests\",\"outputs\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"uint64\",\"name\":\"keyId\",\"type\":\"uint64\"},{\"internalType\":\"bytes\",\"name\":\"dataForSigning\",\"type\":\"bytes\"},{\"internalType\":\"enumSignRequestStatus\",\"name\":\"status\",\"type\":\"uint8\"},{\"internalType\":\"bytes\",\"name\":\"result\",\"type\":\"bytes\"},{\"internalType\":\"bytes\",\"name\":\"encryptionKey\",\"type\":\"bytes\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"deductedKeychainFees\",\"type\":\"tuple[]\"},{\"internalType\":\"enumBroadcastType\",\"name\":\"broadcastType\",\"type\":\"uint8\"}],\"internalType\":\"structSignRequest[]\",\"name\":\"signRequests\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"bytes\",\"name\":\"nextKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"total\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.PageResponse\",\"name\":\"pageResponse\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"}],\"name\":\"spaceById\",\"outputs\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"address[]\",\"name\":\"owners\",\"type\":\"address[]\"},{\"internalType\":\"uint64\",\"name\":\"nonce\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"approveAdminTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"rejectAdminTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"approveSignTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"rejectSignTemplateId\",\"type\":\"uint64\"}],\"internalType\":\"structSpace\",\"name\":\"space\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"key\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"offset\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"limit\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"countTotal\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"reverse\",\"type\":\"bool\"}],\"internalType\":\"structTypes.PageRequest\",\"name\":\"pageRequest\",\"type\":\"tuple\"}],\"name\":\"spaces\",\"outputs\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"address[]\",\"name\":\"owners\",\"type\":\"address[]\"},{\"internalType\":\"uint64\",\"name\":\"nonce\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"approveAdminTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"rejectAdminTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"approveSignTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"rejectSignTemplateId\",\"type\":\"uint64\"}],\"internalType\":\"structSpace[]\",\"name\":\"spaces\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"bytes\",\"name\":\"nextKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"total\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.PageResponse\",\"name\":\"pageResponse\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"components\":[{\"internalType\":\"bytes\",\"name\":\"key\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"offset\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"limit\",\"type\":\"uint64\"},{\"internalType\":\"bool\",\"name\":\"countTotal\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"reverse\",\"type\":\"bool\"}],\"internalType\":\"structTypes.PageRequest\",\"name\":\"pageRequest\",\"type\":\"tuple\"},{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"spacesByOwner\",\"outputs\":[{\"components\":[{\"internalType\":\"uint64\",\"name\":\"id\",\"type\":\"uint64\"},{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"address[]\",\"name\":\"owners\",\"type\":\"address[]\"},{\"internalType\":\"uint64\",\"name\":\"nonce\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"approveAdminTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"rejectAdminTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"approveSignTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"rejectSignTemplateId\",\"type\":\"uint64\"}],\"internalType\":\"structSpace[]\",\"name\":\"spaces\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"bytes\",\"name\":\"nextKey\",\"type\":\"bytes\"},{\"internalType\":\"uint64\",\"name\":\"total\",\"type\":\"uint64\"}],\"internalType\":\"structTypes.PageResponse\",\"name\":\"pageResponse\",\"type\":\"tuple\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"keyId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"approveTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"rejectTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"actionTimeoutHeight\",\"type\":\"uint64\"},{\"internalType\":\"string\",\"name\":\"expectedApproveExpression\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"expectedRejectExpression\",\"type\":\"string\"}],\"name\":\"updateKey\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"keychainId\",\"type\":\"uint64\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"components\":[{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"keyReq\",\"type\":\"tuple[]\"},{\"components\":[{\"internalType\":\"string\",\"name\":\"denom\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"internalType\":\"structTypes.Coin[]\",\"name\":\"sigReq\",\"type\":\"tuple[]\"}],\"internalType\":\"structKeychainFees\",\"name\":\"keychainFees\",\"type\":\"tuple\"},{\"internalType\":\"string\",\"name\":\"description\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"url\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"keybaseId\",\"type\":\"string\"}],\"name\":\"updateKeychain\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint64\",\"name\":\"spaceId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"nonce\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"approveAdminTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"rejectAdminTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"approveSignTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"rejectSignTemplateId\",\"type\":\"uint64\"},{\"internalType\":\"uint64\",\"name\":\"actionTimeoutHeight\",\"type\":\"uint64\"},{\"internalType\":\"string\",\"name\":\"expectedApproveExpression\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"expectedRejectExpression\",\"type\":\"string\"}],\"name\":\"updateSpace\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"success\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
}

// IWardenABI is the input ABI used to generate the binding from.
// Deprecated: Use IWardenMetaData.ABI instead.
var IWardenABI = IWardenMetaData.ABI

// IWarden is an auto generated Go binding around an Ethereum contract.
type IWarden struct {
	IWardenCaller     // Read-only binding to the contract
	IWardenTransactor // Write-only binding to the contract
	IWardenFilterer   // Log filterer for contract events
}

// IWardenCaller is an auto generated read-only Go binding around an Ethereum contract.
type IWardenCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IWardenTransactor is an auto generated write-only Go binding around an Ethereum contract.
type IWardenTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IWardenFilterer is an auto generated log filtering Go binding around an Ethereum contract events.
type IWardenFilterer struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// IWardenSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type IWardenSession struct {
	Contract     *IWarden          // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// IWardenCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type IWardenCallerSession struct {
	Contract *IWardenCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts  // Call options to use throughout this session
}

// IWardenTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type IWardenTransactorSession struct {
	Contract     *IWardenTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts  // Transaction auth options to use throughout this session
}

// IWardenRaw is an auto generated low-level Go binding around an Ethereum contract.
type IWardenRaw struct {
	Contract *IWarden // Generic contract binding to access the raw methods on
}

// IWardenCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type IWardenCallerRaw struct {
	Contract *IWardenCaller // Generic read-only contract binding to access the raw methods on
}

// IWardenTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type IWardenTransactorRaw struct {
	Contract *IWardenTransactor // Generic write-only contract binding to access the raw methods on
}

// NewIWarden creates a new instance of IWarden, bound to a specific deployed contract.
func NewIWarden(address common.Address, backend bind.ContractBackend) (*IWarden, error) {
	contract, err := bindIWarden(address, backend, backend, backend)
	if err != nil {
		return nil, err
	}
	return &IWarden{IWardenCaller: IWardenCaller{contract: contract}, IWardenTransactor: IWardenTransactor{contract: contract}, IWardenFilterer: IWardenFilterer{contract: contract}}, nil
}

// NewIWardenCaller creates a new read-only instance of IWarden, bound to a specific deployed contract.
func NewIWardenCaller(address common.Address, caller bind.ContractCaller) (*IWardenCaller, error) {
	contract, err := bindIWarden(address, caller, nil, nil)
	if err != nil {
		return nil, err
	}
	return &IWardenCaller{contract: contract}, nil
}

// NewIWardenTransactor creates a new write-only instance of IWarden, bound to a specific deployed contract.
func NewIWardenTransactor(address common.Address, transactor bind.ContractTransactor) (*IWardenTransactor, error) {
	contract, err := bindIWarden(address, nil, transactor, nil)
	if err != nil {
		return nil, err
	}
	return &IWardenTransactor{contract: contract}, nil
}

// NewIWardenFilterer creates a new log filterer instance of IWarden, bound to a specific deployed contract.
func NewIWardenFilterer(address common.Address, filterer bind.ContractFilterer) (*IWardenFilterer, error) {
	contract, err := bindIWarden(address, nil, nil, filterer)
	if err != nil {
		return nil, err
	}
	return &IWardenFilterer{contract: contract}, nil
}

// bindIWarden binds a generic wrapper to an already deployed contract.
func bindIWarden(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor, filterer bind.ContractFilterer) (*bind.BoundContract, error) {
	parsed, err := IWardenMetaData.GetAbi()
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, *parsed, caller, transactor, filterer), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_IWarden *IWardenRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _IWarden.Contract.IWardenCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_IWarden *IWardenRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _IWarden.Contract.IWardenTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_IWarden *IWardenRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _IWarden.Contract.IWardenTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_IWarden *IWardenCallerRaw) Call(opts *bind.CallOpts, result *[]interface{}, method string, params ...interface{}) error {
	return _IWarden.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_IWarden *IWardenTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _IWarden.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_IWarden *IWardenTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _IWarden.Contract.contract.Transact(opts, method, params...)
}

// AllKeys is a free data retrieval call binding the contract method 0xed65c53c.
//
// Solidity: function allKeys((bytes,uint64,uint64,bool,bool) pageRequest, int32[] deriveAddresses) view returns(((uint64,uint64,uint64,uint8,bytes,uint64,uint64),(string,uint8)[])[] keys, (bytes,uint64) pageResponse)
func (_IWarden *IWardenCaller) AllKeys(opts *bind.CallOpts, pageRequest TypesPageRequest, deriveAddresses []int32) (struct {
	Keys         []KeyResponse
	PageResponse TypesPageResponse
}, error) {
	var out []interface{}
	err := _IWarden.contract.Call(opts, &out, "allKeys", pageRequest, deriveAddresses)

	outstruct := new(struct {
		Keys         []KeyResponse
		PageResponse TypesPageResponse
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.Keys = *abi.ConvertType(out[0], new([]KeyResponse)).(*[]KeyResponse)
	outstruct.PageResponse = *abi.ConvertType(out[1], new(TypesPageResponse)).(*TypesPageResponse)

	return *outstruct, err

}

// AllKeys is a free data retrieval call binding the contract method 0xed65c53c.
//
// Solidity: function allKeys((bytes,uint64,uint64,bool,bool) pageRequest, int32[] deriveAddresses) view returns(((uint64,uint64,uint64,uint8,bytes,uint64,uint64),(string,uint8)[])[] keys, (bytes,uint64) pageResponse)
func (_IWarden *IWardenSession) AllKeys(pageRequest TypesPageRequest, deriveAddresses []int32) (struct {
	Keys         []KeyResponse
	PageResponse TypesPageResponse
}, error) {
	return _IWarden.Contract.AllKeys(&_IWarden.CallOpts, pageRequest, deriveAddresses)
}

// AllKeys is a free data retrieval call binding the contract method 0xed65c53c.
//
// Solidity: function allKeys((bytes,uint64,uint64,bool,bool) pageRequest, int32[] deriveAddresses) view returns(((uint64,uint64,uint64,uint8,bytes,uint64,uint64),(string,uint8)[])[] keys, (bytes,uint64) pageResponse)
func (_IWarden *IWardenCallerSession) AllKeys(pageRequest TypesPageRequest, deriveAddresses []int32) (struct {
	Keys         []KeyResponse
	PageResponse TypesPageResponse
}, error) {
	return _IWarden.Contract.AllKeys(&_IWarden.CallOpts, pageRequest, deriveAddresses)
}

// KeyById is a free data retrieval call binding the contract method 0x338c1f51.
//
// Solidity: function keyById(uint64 id, int32[] deriveAddresses) view returns(((uint64,uint64,uint64,uint8,bytes,uint64,uint64),(string,uint8)[]) key)
func (_IWarden *IWardenCaller) KeyById(opts *bind.CallOpts, id uint64, deriveAddresses []int32) (KeyResponse, error) {
	var out []interface{}
	err := _IWarden.contract.Call(opts, &out, "keyById", id, deriveAddresses)

	if err != nil {
		return *new(KeyResponse), err
	}

	out0 := *abi.ConvertType(out[0], new(KeyResponse)).(*KeyResponse)

	return out0, err

}

// KeyById is a free data retrieval call binding the contract method 0x338c1f51.
//
// Solidity: function keyById(uint64 id, int32[] deriveAddresses) view returns(((uint64,uint64,uint64,uint8,bytes,uint64,uint64),(string,uint8)[]) key)
func (_IWarden *IWardenSession) KeyById(id uint64, deriveAddresses []int32) (KeyResponse, error) {
	return _IWarden.Contract.KeyById(&_IWarden.CallOpts, id, deriveAddresses)
}

// KeyById is a free data retrieval call binding the contract method 0x338c1f51.
//
// Solidity: function keyById(uint64 id, int32[] deriveAddresses) view returns(((uint64,uint64,uint64,uint8,bytes,uint64,uint64),(string,uint8)[]) key)
func (_IWarden *IWardenCallerSession) KeyById(id uint64, deriveAddresses []int32) (KeyResponse, error) {
	return _IWarden.Contract.KeyById(&_IWarden.CallOpts, id, deriveAddresses)
}

// KeyRequestById is a free data retrieval call binding the contract method 0x69964bd6.
//
// Solidity: function keyRequestById(uint64 id) view returns((uint64,address,uint64,uint64,uint8,uint8,string,uint64,uint64,(string,uint256)[]) keyRequest)
func (_IWarden *IWardenCaller) KeyRequestById(opts *bind.CallOpts, id uint64) (KeyRequest, error) {
	var out []interface{}
	err := _IWarden.contract.Call(opts, &out, "keyRequestById", id)

	if err != nil {
		return *new(KeyRequest), err
	}

	out0 := *abi.ConvertType(out[0], new(KeyRequest)).(*KeyRequest)

	return out0, err

}

// KeyRequestById is a free data retrieval call binding the contract method 0x69964bd6.
//
// Solidity: function keyRequestById(uint64 id) view returns((uint64,address,uint64,uint64,uint8,uint8,string,uint64,uint64,(string,uint256)[]) keyRequest)
func (_IWarden *IWardenSession) KeyRequestById(id uint64) (KeyRequest, error) {
	return _IWarden.Contract.KeyRequestById(&_IWarden.CallOpts, id)
}

// KeyRequestById is a free data retrieval call binding the contract method 0x69964bd6.
//
// Solidity: function keyRequestById(uint64 id) view returns((uint64,address,uint64,uint64,uint8,uint8,string,uint64,uint64,(string,uint256)[]) keyRequest)
func (_IWarden *IWardenCallerSession) KeyRequestById(id uint64) (KeyRequest, error) {
	return _IWarden.Contract.KeyRequestById(&_IWarden.CallOpts, id)
}

// KeyRequests is a free data retrieval call binding the contract method 0x2d10a4d6.
//
// Solidity: function keyRequests((bytes,uint64,uint64,bool,bool) pageRequest, uint64 keychainId, uint8 status, uint64 spaceId) view returns((uint64,address,uint64,uint64,uint8,uint8,string,uint64,uint64,(string,uint256)[])[] keyRequests, (bytes,uint64) pageResponse)
func (_IWarden *IWardenCaller) KeyRequests(opts *bind.CallOpts, pageRequest TypesPageRequest, keychainId uint64, status uint8, spaceId uint64) (struct {
	KeyRequests  []KeyRequest
	PageResponse TypesPageResponse
}, error) {
	var out []interface{}
	err := _IWarden.contract.Call(opts, &out, "keyRequests", pageRequest, keychainId, status, spaceId)

	outstruct := new(struct {
		KeyRequests  []KeyRequest
		PageResponse TypesPageResponse
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.KeyRequests = *abi.ConvertType(out[0], new([]KeyRequest)).(*[]KeyRequest)
	outstruct.PageResponse = *abi.ConvertType(out[1], new(TypesPageResponse)).(*TypesPageResponse)

	return *outstruct, err

}

// KeyRequests is a free data retrieval call binding the contract method 0x2d10a4d6.
//
// Solidity: function keyRequests((bytes,uint64,uint64,bool,bool) pageRequest, uint64 keychainId, uint8 status, uint64 spaceId) view returns((uint64,address,uint64,uint64,uint8,uint8,string,uint64,uint64,(string,uint256)[])[] keyRequests, (bytes,uint64) pageResponse)
func (_IWarden *IWardenSession) KeyRequests(pageRequest TypesPageRequest, keychainId uint64, status uint8, spaceId uint64) (struct {
	KeyRequests  []KeyRequest
	PageResponse TypesPageResponse
}, error) {
	return _IWarden.Contract.KeyRequests(&_IWarden.CallOpts, pageRequest, keychainId, status, spaceId)
}

// KeyRequests is a free data retrieval call binding the contract method 0x2d10a4d6.
//
// Solidity: function keyRequests((bytes,uint64,uint64,bool,bool) pageRequest, uint64 keychainId, uint8 status, uint64 spaceId) view returns((uint64,address,uint64,uint64,uint8,uint8,string,uint64,uint64,(string,uint256)[])[] keyRequests, (bytes,uint64) pageResponse)
func (_IWarden *IWardenCallerSession) KeyRequests(pageRequest TypesPageRequest, keychainId uint64, status uint8, spaceId uint64) (struct {
	KeyRequests  []KeyRequest
	PageResponse TypesPageResponse
}, error) {
	return _IWarden.Contract.KeyRequests(&_IWarden.CallOpts, pageRequest, keychainId, status, spaceId)
}

// KeychainById is a free data retrieval call binding the contract method 0xba664dc2.
//
// Solidity: function keychainById(uint64 id) view returns((uint64,address,string,address[],address[],((string,uint256)[],(string,uint256)[]),string,string,string) keychain)
func (_IWarden *IWardenCaller) KeychainById(opts *bind.CallOpts, id uint64) (Keychain, error) {
	var out []interface{}
	err := _IWarden.contract.Call(opts, &out, "keychainById", id)

	if err != nil {
		return *new(Keychain), err
	}

	out0 := *abi.ConvertType(out[0], new(Keychain)).(*Keychain)

	return out0, err

}

// KeychainById is a free data retrieval call binding the contract method 0xba664dc2.
//
// Solidity: function keychainById(uint64 id) view returns((uint64,address,string,address[],address[],((string,uint256)[],(string,uint256)[]),string,string,string) keychain)
func (_IWarden *IWardenSession) KeychainById(id uint64) (Keychain, error) {
	return _IWarden.Contract.KeychainById(&_IWarden.CallOpts, id)
}

// KeychainById is a free data retrieval call binding the contract method 0xba664dc2.
//
// Solidity: function keychainById(uint64 id) view returns((uint64,address,string,address[],address[],((string,uint256)[],(string,uint256)[]),string,string,string) keychain)
func (_IWarden *IWardenCallerSession) KeychainById(id uint64) (Keychain, error) {
	return _IWarden.Contract.KeychainById(&_IWarden.CallOpts, id)
}

// Keychains is a free data retrieval call binding the contract method 0x7e5a6446.
//
// Solidity: function keychains((bytes,uint64,uint64,bool,bool) pageRequest) view returns((uint64,address,string,address[],address[],((string,uint256)[],(string,uint256)[]),string,string,string)[] keychains, (bytes,uint64) pageResponse)
func (_IWarden *IWardenCaller) Keychains(opts *bind.CallOpts, pageRequest TypesPageRequest) (struct {
	Keychains    []Keychain
	PageResponse TypesPageResponse
}, error) {
	var out []interface{}
	err := _IWarden.contract.Call(opts, &out, "keychains", pageRequest)

	outstruct := new(struct {
		Keychains    []Keychain
		PageResponse TypesPageResponse
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.Keychains = *abi.ConvertType(out[0], new([]Keychain)).(*[]Keychain)
	outstruct.PageResponse = *abi.ConvertType(out[1], new(TypesPageResponse)).(*TypesPageResponse)

	return *outstruct, err

}

// Keychains is a free data retrieval call binding the contract method 0x7e5a6446.
//
// Solidity: function keychains((bytes,uint64,uint64,bool,bool) pageRequest) view returns((uint64,address,string,address[],address[],((string,uint256)[],(string,uint256)[]),string,string,string)[] keychains, (bytes,uint64) pageResponse)
func (_IWarden *IWardenSession) Keychains(pageRequest TypesPageRequest) (struct {
	Keychains    []Keychain
	PageResponse TypesPageResponse
}, error) {
	return _IWarden.Contract.Keychains(&_IWarden.CallOpts, pageRequest)
}

// Keychains is a free data retrieval call binding the contract method 0x7e5a6446.
//
// Solidity: function keychains((bytes,uint64,uint64,bool,bool) pageRequest) view returns((uint64,address,string,address[],address[],((string,uint256)[],(string,uint256)[]),string,string,string)[] keychains, (bytes,uint64) pageResponse)
func (_IWarden *IWardenCallerSession) Keychains(pageRequest TypesPageRequest) (struct {
	Keychains    []Keychain
	PageResponse TypesPageResponse
}, error) {
	return _IWarden.Contract.Keychains(&_IWarden.CallOpts, pageRequest)
}

// KeysBySpaceId is a free data retrieval call binding the contract method 0x8f6c0508.
//
// Solidity: function keysBySpaceId((bytes,uint64,uint64,bool,bool) pageRequest, uint64 spaceId, int32[] deriveAddresses) view returns(((uint64,uint64,uint64,uint8,bytes,uint64,uint64),(string,uint8)[])[] keys, (bytes,uint64) pageResponse)
func (_IWarden *IWardenCaller) KeysBySpaceId(opts *bind.CallOpts, pageRequest TypesPageRequest, spaceId uint64, deriveAddresses []int32) (struct {
	Keys         []KeyResponse
	PageResponse TypesPageResponse
}, error) {
	var out []interface{}
	err := _IWarden.contract.Call(opts, &out, "keysBySpaceId", pageRequest, spaceId, deriveAddresses)

	outstruct := new(struct {
		Keys         []KeyResponse
		PageResponse TypesPageResponse
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.Keys = *abi.ConvertType(out[0], new([]KeyResponse)).(*[]KeyResponse)
	outstruct.PageResponse = *abi.ConvertType(out[1], new(TypesPageResponse)).(*TypesPageResponse)

	return *outstruct, err

}

// KeysBySpaceId is a free data retrieval call binding the contract method 0x8f6c0508.
//
// Solidity: function keysBySpaceId((bytes,uint64,uint64,bool,bool) pageRequest, uint64 spaceId, int32[] deriveAddresses) view returns(((uint64,uint64,uint64,uint8,bytes,uint64,uint64),(string,uint8)[])[] keys, (bytes,uint64) pageResponse)
func (_IWarden *IWardenSession) KeysBySpaceId(pageRequest TypesPageRequest, spaceId uint64, deriveAddresses []int32) (struct {
	Keys         []KeyResponse
	PageResponse TypesPageResponse
}, error) {
	return _IWarden.Contract.KeysBySpaceId(&_IWarden.CallOpts, pageRequest, spaceId, deriveAddresses)
}

// KeysBySpaceId is a free data retrieval call binding the contract method 0x8f6c0508.
//
// Solidity: function keysBySpaceId((bytes,uint64,uint64,bool,bool) pageRequest, uint64 spaceId, int32[] deriveAddresses) view returns(((uint64,uint64,uint64,uint8,bytes,uint64,uint64),(string,uint8)[])[] keys, (bytes,uint64) pageResponse)
func (_IWarden *IWardenCallerSession) KeysBySpaceId(pageRequest TypesPageRequest, spaceId uint64, deriveAddresses []int32) (struct {
	Keys         []KeyResponse
	PageResponse TypesPageResponse
}, error) {
	return _IWarden.Contract.KeysBySpaceId(&_IWarden.CallOpts, pageRequest, spaceId, deriveAddresses)
}

// SignRequestById is a free data retrieval call binding the contract method 0xa657df94.
//
// Solidity: function signRequestById(uint64 id) view returns((uint64,address,uint64,bytes,uint8,bytes,bytes,(string,uint256)[],uint8) signRequest)
func (_IWarden *IWardenCaller) SignRequestById(opts *bind.CallOpts, id uint64) (SignRequest, error) {
	var out []interface{}
	err := _IWarden.contract.Call(opts, &out, "signRequestById", id)

	if err != nil {
		return *new(SignRequest), err
	}

	out0 := *abi.ConvertType(out[0], new(SignRequest)).(*SignRequest)

	return out0, err

}

// SignRequestById is a free data retrieval call binding the contract method 0xa657df94.
//
// Solidity: function signRequestById(uint64 id) view returns((uint64,address,uint64,bytes,uint8,bytes,bytes,(string,uint256)[],uint8) signRequest)
func (_IWarden *IWardenSession) SignRequestById(id uint64) (SignRequest, error) {
	return _IWarden.Contract.SignRequestById(&_IWarden.CallOpts, id)
}

// SignRequestById is a free data retrieval call binding the contract method 0xa657df94.
//
// Solidity: function signRequestById(uint64 id) view returns((uint64,address,uint64,bytes,uint8,bytes,bytes,(string,uint256)[],uint8) signRequest)
func (_IWarden *IWardenCallerSession) SignRequestById(id uint64) (SignRequest, error) {
	return _IWarden.Contract.SignRequestById(&_IWarden.CallOpts, id)
}

// SignRequests is a free data retrieval call binding the contract method 0xf919b270.
//
// Solidity: function signRequests((bytes,uint64,uint64,bool,bool) pageRequest, uint64 keychainId, uint8 status, uint8 optionalBroadcastType) view returns((uint64,address,uint64,bytes,uint8,bytes,bytes,(string,uint256)[],uint8)[] signRequests, (bytes,uint64) pageResponse)
func (_IWarden *IWardenCaller) SignRequests(opts *bind.CallOpts, pageRequest TypesPageRequest, keychainId uint64, status uint8, optionalBroadcastType uint8) (struct {
	SignRequests []SignRequest
	PageResponse TypesPageResponse
}, error) {
	var out []interface{}
	err := _IWarden.contract.Call(opts, &out, "signRequests", pageRequest, keychainId, status, optionalBroadcastType)

	outstruct := new(struct {
		SignRequests []SignRequest
		PageResponse TypesPageResponse
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.SignRequests = *abi.ConvertType(out[0], new([]SignRequest)).(*[]SignRequest)
	outstruct.PageResponse = *abi.ConvertType(out[1], new(TypesPageResponse)).(*TypesPageResponse)

	return *outstruct, err

}

// SignRequests is a free data retrieval call binding the contract method 0xf919b270.
//
// Solidity: function signRequests((bytes,uint64,uint64,bool,bool) pageRequest, uint64 keychainId, uint8 status, uint8 optionalBroadcastType) view returns((uint64,address,uint64,bytes,uint8,bytes,bytes,(string,uint256)[],uint8)[] signRequests, (bytes,uint64) pageResponse)
func (_IWarden *IWardenSession) SignRequests(pageRequest TypesPageRequest, keychainId uint64, status uint8, optionalBroadcastType uint8) (struct {
	SignRequests []SignRequest
	PageResponse TypesPageResponse
}, error) {
	return _IWarden.Contract.SignRequests(&_IWarden.CallOpts, pageRequest, keychainId, status, optionalBroadcastType)
}

// SignRequests is a free data retrieval call binding the contract method 0xf919b270.
//
// Solidity: function signRequests((bytes,uint64,uint64,bool,bool) pageRequest, uint64 keychainId, uint8 status, uint8 optionalBroadcastType) view returns((uint64,address,uint64,bytes,uint8,bytes,bytes,(string,uint256)[],uint8)[] signRequests, (bytes,uint64) pageResponse)
func (_IWarden *IWardenCallerSession) SignRequests(pageRequest TypesPageRequest, keychainId uint64, status uint8, optionalBroadcastType uint8) (struct {
	SignRequests []SignRequest
	PageResponse TypesPageResponse
}, error) {
	return _IWarden.Contract.SignRequests(&_IWarden.CallOpts, pageRequest, keychainId, status, optionalBroadcastType)
}

// SpaceById is a free data retrieval call binding the contract method 0xe4c1fc79.
//
// Solidity: function spaceById(uint64 id) view returns((uint64,address,address[],uint64,uint64,uint64,uint64,uint64) space)
func (_IWarden *IWardenCaller) SpaceById(opts *bind.CallOpts, id uint64) (Space, error) {
	var out []interface{}
	err := _IWarden.contract.Call(opts, &out, "spaceById", id)

	if err != nil {
		return *new(Space), err
	}

	out0 := *abi.ConvertType(out[0], new(Space)).(*Space)

	return out0, err

}

// SpaceById is a free data retrieval call binding the contract method 0xe4c1fc79.
//
// Solidity: function spaceById(uint64 id) view returns((uint64,address,address[],uint64,uint64,uint64,uint64,uint64) space)
func (_IWarden *IWardenSession) SpaceById(id uint64) (Space, error) {
	return _IWarden.Contract.SpaceById(&_IWarden.CallOpts, id)
}

// SpaceById is a free data retrieval call binding the contract method 0xe4c1fc79.
//
// Solidity: function spaceById(uint64 id) view returns((uint64,address,address[],uint64,uint64,uint64,uint64,uint64) space)
func (_IWarden *IWardenCallerSession) SpaceById(id uint64) (Space, error) {
	return _IWarden.Contract.SpaceById(&_IWarden.CallOpts, id)
}

// Spaces is a free data retrieval call binding the contract method 0x5f73892e.
//
// Solidity: function spaces((bytes,uint64,uint64,bool,bool) pageRequest) view returns((uint64,address,address[],uint64,uint64,uint64,uint64,uint64)[] spaces, (bytes,uint64) pageResponse)
func (_IWarden *IWardenCaller) Spaces(opts *bind.CallOpts, pageRequest TypesPageRequest) (struct {
	Spaces       []Space
	PageResponse TypesPageResponse
}, error) {
	var out []interface{}
	err := _IWarden.contract.Call(opts, &out, "spaces", pageRequest)

	outstruct := new(struct {
		Spaces       []Space
		PageResponse TypesPageResponse
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.Spaces = *abi.ConvertType(out[0], new([]Space)).(*[]Space)
	outstruct.PageResponse = *abi.ConvertType(out[1], new(TypesPageResponse)).(*TypesPageResponse)

	return *outstruct, err

}

// Spaces is a free data retrieval call binding the contract method 0x5f73892e.
//
// Solidity: function spaces((bytes,uint64,uint64,bool,bool) pageRequest) view returns((uint64,address,address[],uint64,uint64,uint64,uint64,uint64)[] spaces, (bytes,uint64) pageResponse)
func (_IWarden *IWardenSession) Spaces(pageRequest TypesPageRequest) (struct {
	Spaces       []Space
	PageResponse TypesPageResponse
}, error) {
	return _IWarden.Contract.Spaces(&_IWarden.CallOpts, pageRequest)
}

// Spaces is a free data retrieval call binding the contract method 0x5f73892e.
//
// Solidity: function spaces((bytes,uint64,uint64,bool,bool) pageRequest) view returns((uint64,address,address[],uint64,uint64,uint64,uint64,uint64)[] spaces, (bytes,uint64) pageResponse)
func (_IWarden *IWardenCallerSession) Spaces(pageRequest TypesPageRequest) (struct {
	Spaces       []Space
	PageResponse TypesPageResponse
}, error) {
	return _IWarden.Contract.Spaces(&_IWarden.CallOpts, pageRequest)
}

// SpacesByOwner is a free data retrieval call binding the contract method 0x88cd3f61.
//
// Solidity: function spacesByOwner((bytes,uint64,uint64,bool,bool) pageRequest, address owner) view returns((uint64,address,address[],uint64,uint64,uint64,uint64,uint64)[] spaces, (bytes,uint64) pageResponse)
func (_IWarden *IWardenCaller) SpacesByOwner(opts *bind.CallOpts, pageRequest TypesPageRequest, owner common.Address) (struct {
	Spaces       []Space
	PageResponse TypesPageResponse
}, error) {
	var out []interface{}
	err := _IWarden.contract.Call(opts, &out, "spacesByOwner", pageRequest, owner)

	outstruct := new(struct {
		Spaces       []Space
		PageResponse TypesPageResponse
	})
	if err != nil {
		return *outstruct, err
	}

	outstruct.Spaces = *abi.ConvertType(out[0], new([]Space)).(*[]Space)
	outstruct.PageResponse = *abi.ConvertType(out[1], new(TypesPageResponse)).(*TypesPageResponse)

	return *outstruct, err

}

// SpacesByOwner is a free data retrieval call binding the contract method 0x88cd3f61.
//
// Solidity: function spacesByOwner((bytes,uint64,uint64,bool,bool) pageRequest, address owner) view returns((uint64,address,address[],uint64,uint64,uint64,uint64,uint64)[] spaces, (bytes,uint64) pageResponse)
func (_IWarden *IWardenSession) SpacesByOwner(pageRequest TypesPageRequest, owner common.Address) (struct {
	Spaces       []Space
	PageResponse TypesPageResponse
}, error) {
	return _IWarden.Contract.SpacesByOwner(&_IWarden.CallOpts, pageRequest, owner)
}

// SpacesByOwner is a free data retrieval call binding the contract method 0x88cd3f61.
//
// Solidity: function spacesByOwner((bytes,uint64,uint64,bool,bool) pageRequest, address owner) view returns((uint64,address,address[],uint64,uint64,uint64,uint64,uint64)[] spaces, (bytes,uint64) pageResponse)
func (_IWarden *IWardenCallerSession) SpacesByOwner(pageRequest TypesPageRequest, owner common.Address) (struct {
	Spaces       []Space
	PageResponse TypesPageResponse
}, error) {
	return _IWarden.Contract.SpacesByOwner(&_IWarden.CallOpts, pageRequest, owner)
}

// AddKeychainAdmin is a paid mutator transaction binding the contract method 0xdf9c1808.
//
// Solidity: function addKeychainAdmin(uint64 keychainId, address newAdmin) returns(bool success)
func (_IWarden *IWardenTransactor) AddKeychainAdmin(opts *bind.TransactOpts, keychainId uint64, newAdmin common.Address) (*types.Transaction, error) {
	return _IWarden.contract.Transact(opts, "addKeychainAdmin", keychainId, newAdmin)
}

// AddKeychainAdmin is a paid mutator transaction binding the contract method 0xdf9c1808.
//
// Solidity: function addKeychainAdmin(uint64 keychainId, address newAdmin) returns(bool success)
func (_IWarden *IWardenSession) AddKeychainAdmin(keychainId uint64, newAdmin common.Address) (*types.Transaction, error) {
	return _IWarden.Contract.AddKeychainAdmin(&_IWarden.TransactOpts, keychainId, newAdmin)
}

// AddKeychainAdmin is a paid mutator transaction binding the contract method 0xdf9c1808.
//
// Solidity: function addKeychainAdmin(uint64 keychainId, address newAdmin) returns(bool success)
func (_IWarden *IWardenTransactorSession) AddKeychainAdmin(keychainId uint64, newAdmin common.Address) (*types.Transaction, error) {
	return _IWarden.Contract.AddKeychainAdmin(&_IWarden.TransactOpts, keychainId, newAdmin)
}

// AddKeychainWriter is a paid mutator transaction binding the contract method 0x49fb21b3.
//
// Solidity: function addKeychainWriter(uint64 keychainId, address newWriter) returns(bool success)
func (_IWarden *IWardenTransactor) AddKeychainWriter(opts *bind.TransactOpts, keychainId uint64, newWriter common.Address) (*types.Transaction, error) {
	return _IWarden.contract.Transact(opts, "addKeychainWriter", keychainId, newWriter)
}

// AddKeychainWriter is a paid mutator transaction binding the contract method 0x49fb21b3.
//
// Solidity: function addKeychainWriter(uint64 keychainId, address newWriter) returns(bool success)
func (_IWarden *IWardenSession) AddKeychainWriter(keychainId uint64, newWriter common.Address) (*types.Transaction, error) {
	return _IWarden.Contract.AddKeychainWriter(&_IWarden.TransactOpts, keychainId, newWriter)
}

// AddKeychainWriter is a paid mutator transaction binding the contract method 0x49fb21b3.
//
// Solidity: function addKeychainWriter(uint64 keychainId, address newWriter) returns(bool success)
func (_IWarden *IWardenTransactorSession) AddKeychainWriter(keychainId uint64, newWriter common.Address) (*types.Transaction, error) {
	return _IWarden.Contract.AddKeychainWriter(&_IWarden.TransactOpts, keychainId, newWriter)
}

// AddSpaceOwner is a paid mutator transaction binding the contract method 0x2bf40208.
//
// Solidity: function addSpaceOwner(uint64 spaceId, address newOwner, uint64 nonce, uint64 actionTimeoutHeight, string expectedApproveExpression, string expectedRejectExpression) returns(bool success)
func (_IWarden *IWardenTransactor) AddSpaceOwner(opts *bind.TransactOpts, spaceId uint64, newOwner common.Address, nonce uint64, actionTimeoutHeight uint64, expectedApproveExpression string, expectedRejectExpression string) (*types.Transaction, error) {
	return _IWarden.contract.Transact(opts, "addSpaceOwner", spaceId, newOwner, nonce, actionTimeoutHeight, expectedApproveExpression, expectedRejectExpression)
}

// AddSpaceOwner is a paid mutator transaction binding the contract method 0x2bf40208.
//
// Solidity: function addSpaceOwner(uint64 spaceId, address newOwner, uint64 nonce, uint64 actionTimeoutHeight, string expectedApproveExpression, string expectedRejectExpression) returns(bool success)
func (_IWarden *IWardenSession) AddSpaceOwner(spaceId uint64, newOwner common.Address, nonce uint64, actionTimeoutHeight uint64, expectedApproveExpression string, expectedRejectExpression string) (*types.Transaction, error) {
	return _IWarden.Contract.AddSpaceOwner(&_IWarden.TransactOpts, spaceId, newOwner, nonce, actionTimeoutHeight, expectedApproveExpression, expectedRejectExpression)
}

// AddSpaceOwner is a paid mutator transaction binding the contract method 0x2bf40208.
//
// Solidity: function addSpaceOwner(uint64 spaceId, address newOwner, uint64 nonce, uint64 actionTimeoutHeight, string expectedApproveExpression, string expectedRejectExpression) returns(bool success)
func (_IWarden *IWardenTransactorSession) AddSpaceOwner(spaceId uint64, newOwner common.Address, nonce uint64, actionTimeoutHeight uint64, expectedApproveExpression string, expectedRejectExpression string) (*types.Transaction, error) {
	return _IWarden.Contract.AddSpaceOwner(&_IWarden.TransactOpts, spaceId, newOwner, nonce, actionTimeoutHeight, expectedApproveExpression, expectedRejectExpression)
}

// FulfilKeyRequest is a paid mutator transaction binding the contract method 0x1cf2c987.
//
// Solidity: function fulfilKeyRequest(uint64 requestId, bytes pubKey) returns(bool success)
func (_IWarden *IWardenTransactor) FulfilKeyRequest(opts *bind.TransactOpts, requestId uint64, pubKey []byte) (*types.Transaction, error) {
	return _IWarden.contract.Transact(opts, "fulfilKeyRequest", requestId, pubKey)
}

// FulfilKeyRequest is a paid mutator transaction binding the contract method 0x1cf2c987.
//
// Solidity: function fulfilKeyRequest(uint64 requestId, bytes pubKey) returns(bool success)
func (_IWarden *IWardenSession) FulfilKeyRequest(requestId uint64, pubKey []byte) (*types.Transaction, error) {
	return _IWarden.Contract.FulfilKeyRequest(&_IWarden.TransactOpts, requestId, pubKey)
}

// FulfilKeyRequest is a paid mutator transaction binding the contract method 0x1cf2c987.
//
// Solidity: function fulfilKeyRequest(uint64 requestId, bytes pubKey) returns(bool success)
func (_IWarden *IWardenTransactorSession) FulfilKeyRequest(requestId uint64, pubKey []byte) (*types.Transaction, error) {
	return _IWarden.Contract.FulfilKeyRequest(&_IWarden.TransactOpts, requestId, pubKey)
}

// FulfilSignRequest is a paid mutator transaction binding the contract method 0x84f61386.
//
// Solidity: function fulfilSignRequest(uint64 requestId, bytes signedData) returns(bool success)
func (_IWarden *IWardenTransactor) FulfilSignRequest(opts *bind.TransactOpts, requestId uint64, signedData []byte) (*types.Transaction, error) {
	return _IWarden.contract.Transact(opts, "fulfilSignRequest", requestId, signedData)
}

// FulfilSignRequest is a paid mutator transaction binding the contract method 0x84f61386.
//
// Solidity: function fulfilSignRequest(uint64 requestId, bytes signedData) returns(bool success)
func (_IWarden *IWardenSession) FulfilSignRequest(requestId uint64, signedData []byte) (*types.Transaction, error) {
	return _IWarden.Contract.FulfilSignRequest(&_IWarden.TransactOpts, requestId, signedData)
}

// FulfilSignRequest is a paid mutator transaction binding the contract method 0x84f61386.
//
// Solidity: function fulfilSignRequest(uint64 requestId, bytes signedData) returns(bool success)
func (_IWarden *IWardenTransactorSession) FulfilSignRequest(requestId uint64, signedData []byte) (*types.Transaction, error) {
	return _IWarden.Contract.FulfilSignRequest(&_IWarden.TransactOpts, requestId, signedData)
}

// NewKeyRequest is a paid mutator transaction binding the contract method 0x90bfe071.
//
// Solidity: function newKeyRequest(uint64 spaceId, uint64 keychainId, uint8 keyType, uint64 approveTemplateId, uint64 rejectTemplateId, (string,uint256)[] maxKeychainFees, uint64 nonce, uint64 actionTimeoutHeight, string expectedApproveExpression, string expectedRejectExpression) returns(bool success)
func (_IWarden *IWardenTransactor) NewKeyRequest(opts *bind.TransactOpts, spaceId uint64, keychainId uint64, keyType uint8, approveTemplateId uint64, rejectTemplateId uint64, maxKeychainFees []TypesCoin, nonce uint64, actionTimeoutHeight uint64, expectedApproveExpression string, expectedRejectExpression string) (*types.Transaction, error) {
	return _IWarden.contract.Transact(opts, "newKeyRequest", spaceId, keychainId, keyType, approveTemplateId, rejectTemplateId, maxKeychainFees, nonce, actionTimeoutHeight, expectedApproveExpression, expectedRejectExpression)
}

// NewKeyRequest is a paid mutator transaction binding the contract method 0x90bfe071.
//
// Solidity: function newKeyRequest(uint64 spaceId, uint64 keychainId, uint8 keyType, uint64 approveTemplateId, uint64 rejectTemplateId, (string,uint256)[] maxKeychainFees, uint64 nonce, uint64 actionTimeoutHeight, string expectedApproveExpression, string expectedRejectExpression) returns(bool success)
func (_IWarden *IWardenSession) NewKeyRequest(spaceId uint64, keychainId uint64, keyType uint8, approveTemplateId uint64, rejectTemplateId uint64, maxKeychainFees []TypesCoin, nonce uint64, actionTimeoutHeight uint64, expectedApproveExpression string, expectedRejectExpression string) (*types.Transaction, error) {
	return _IWarden.Contract.NewKeyRequest(&_IWarden.TransactOpts, spaceId, keychainId, keyType, approveTemplateId, rejectTemplateId, maxKeychainFees, nonce, actionTimeoutHeight, expectedApproveExpression, expectedRejectExpression)
}

// NewKeyRequest is a paid mutator transaction binding the contract method 0x90bfe071.
//
// Solidity: function newKeyRequest(uint64 spaceId, uint64 keychainId, uint8 keyType, uint64 approveTemplateId, uint64 rejectTemplateId, (string,uint256)[] maxKeychainFees, uint64 nonce, uint64 actionTimeoutHeight, string expectedApproveExpression, string expectedRejectExpression) returns(bool success)
func (_IWarden *IWardenTransactorSession) NewKeyRequest(spaceId uint64, keychainId uint64, keyType uint8, approveTemplateId uint64, rejectTemplateId uint64, maxKeychainFees []TypesCoin, nonce uint64, actionTimeoutHeight uint64, expectedApproveExpression string, expectedRejectExpression string) (*types.Transaction, error) {
	return _IWarden.Contract.NewKeyRequest(&_IWarden.TransactOpts, spaceId, keychainId, keyType, approveTemplateId, rejectTemplateId, maxKeychainFees, nonce, actionTimeoutHeight, expectedApproveExpression, expectedRejectExpression)
}

// NewKeychain is a paid mutator transaction binding the contract method 0x7d4c42ad.
//
// Solidity: function newKeychain(string name, ((string,uint256)[],(string,uint256)[]) keychainFees, string description, string url, string keybaseId) returns(uint64 id)
func (_IWarden *IWardenTransactor) NewKeychain(opts *bind.TransactOpts, name string, keychainFees KeychainFees, description string, url string, keybaseId string) (*types.Transaction, error) {
	return _IWarden.contract.Transact(opts, "newKeychain", name, keychainFees, description, url, keybaseId)
}

// NewKeychain is a paid mutator transaction binding the contract method 0x7d4c42ad.
//
// Solidity: function newKeychain(string name, ((string,uint256)[],(string,uint256)[]) keychainFees, string description, string url, string keybaseId) returns(uint64 id)
func (_IWarden *IWardenSession) NewKeychain(name string, keychainFees KeychainFees, description string, url string, keybaseId string) (*types.Transaction, error) {
	return _IWarden.Contract.NewKeychain(&_IWarden.TransactOpts, name, keychainFees, description, url, keybaseId)
}

// NewKeychain is a paid mutator transaction binding the contract method 0x7d4c42ad.
//
// Solidity: function newKeychain(string name, ((string,uint256)[],(string,uint256)[]) keychainFees, string description, string url, string keybaseId) returns(uint64 id)
func (_IWarden *IWardenTransactorSession) NewKeychain(name string, keychainFees KeychainFees, description string, url string, keybaseId string) (*types.Transaction, error) {
	return _IWarden.Contract.NewKeychain(&_IWarden.TransactOpts, name, keychainFees, description, url, keybaseId)
}

// NewSignRequest is a paid mutator transaction binding the contract method 0x07d145e9.
//
// Solidity: function newSignRequest(uint64 keyId, bytes input, bytes[] analyzers, bytes encryptionKey, (string,uint256)[] maxKeychainFees, uint64 nonce, uint64 actionTimeoutHeight, string expectedApproveExpression, string expectedRejectExpression, uint8 broadcastType) returns(bool success)
func (_IWarden *IWardenTransactor) NewSignRequest(opts *bind.TransactOpts, keyId uint64, input []byte, analyzers [][]byte, encryptionKey []byte, maxKeychainFees []TypesCoin, nonce uint64, actionTimeoutHeight uint64, expectedApproveExpression string, expectedRejectExpression string, broadcastType uint8) (*types.Transaction, error) {
	return _IWarden.contract.Transact(opts, "newSignRequest", keyId, input, analyzers, encryptionKey, maxKeychainFees, nonce, actionTimeoutHeight, expectedApproveExpression, expectedRejectExpression, broadcastType)
}

// NewSignRequest is a paid mutator transaction binding the contract method 0x07d145e9.
//
// Solidity: function newSignRequest(uint64 keyId, bytes input, bytes[] analyzers, bytes encryptionKey, (string,uint256)[] maxKeychainFees, uint64 nonce, uint64 actionTimeoutHeight, string expectedApproveExpression, string expectedRejectExpression, uint8 broadcastType) returns(bool success)
func (_IWarden *IWardenSession) NewSignRequest(keyId uint64, input []byte, analyzers [][]byte, encryptionKey []byte, maxKeychainFees []TypesCoin, nonce uint64, actionTimeoutHeight uint64, expectedApproveExpression string, expectedRejectExpression string, broadcastType uint8) (*types.Transaction, error) {
	return _IWarden.Contract.NewSignRequest(&_IWarden.TransactOpts, keyId, input, analyzers, encryptionKey, maxKeychainFees, nonce, actionTimeoutHeight, expectedApproveExpression, expectedRejectExpression, broadcastType)
}

// NewSignRequest is a paid mutator transaction binding the contract method 0x07d145e9.
//
// Solidity: function newSignRequest(uint64 keyId, bytes input, bytes[] analyzers, bytes encryptionKey, (string,uint256)[] maxKeychainFees, uint64 nonce, uint64 actionTimeoutHeight, string expectedApproveExpression, string expectedRejectExpression, uint8 broadcastType) returns(bool success)
func (_IWarden *IWardenTransactorSession) NewSignRequest(keyId uint64, input []byte, analyzers [][]byte, encryptionKey []byte, maxKeychainFees []TypesCoin, nonce uint64, actionTimeoutHeight uint64, expectedApproveExpression string, expectedRejectExpression string, broadcastType uint8) (*types.Transaction, error) {
	return _IWarden.Contract.NewSignRequest(&_IWarden.TransactOpts, keyId, input, analyzers, encryptionKey, maxKeychainFees, nonce, actionTimeoutHeight, expectedApproveExpression, expectedRejectExpression, broadcastType)
}

// NewSpace is a paid mutator transaction binding the contract method 0xc78f7667.
//
// Solidity: function newSpace(uint64 approveAdminTemplateId, uint64 rejectAdminTemplateId, uint64 approveSignTemplateId, uint64 rejectSignTemplateId, address[] additionalOwners) returns(uint64 id)
func (_IWarden *IWardenTransactor) NewSpace(opts *bind.TransactOpts, approveAdminTemplateId uint64, rejectAdminTemplateId uint64, approveSignTemplateId uint64, rejectSignTemplateId uint64, additionalOwners []common.Address) (*types.Transaction, error) {
	return _IWarden.contract.Transact(opts, "newSpace", approveAdminTemplateId, rejectAdminTemplateId, approveSignTemplateId, rejectSignTemplateId, additionalOwners)
}

// NewSpace is a paid mutator transaction binding the contract method 0xc78f7667.
//
// Solidity: function newSpace(uint64 approveAdminTemplateId, uint64 rejectAdminTemplateId, uint64 approveSignTemplateId, uint64 rejectSignTemplateId, address[] additionalOwners) returns(uint64 id)
func (_IWarden *IWardenSession) NewSpace(approveAdminTemplateId uint64, rejectAdminTemplateId uint64, approveSignTemplateId uint64, rejectSignTemplateId uint64, additionalOwners []common.Address) (*types.Transaction, error) {
	return _IWarden.Contract.NewSpace(&_IWarden.TransactOpts, approveAdminTemplateId, rejectAdminTemplateId, approveSignTemplateId, rejectSignTemplateId, additionalOwners)
}

// NewSpace is a paid mutator transaction binding the contract method 0xc78f7667.
//
// Solidity: function newSpace(uint64 approveAdminTemplateId, uint64 rejectAdminTemplateId, uint64 approveSignTemplateId, uint64 rejectSignTemplateId, address[] additionalOwners) returns(uint64 id)
func (_IWarden *IWardenTransactorSession) NewSpace(approveAdminTemplateId uint64, rejectAdminTemplateId uint64, approveSignTemplateId uint64, rejectSignTemplateId uint64, additionalOwners []common.Address) (*types.Transaction, error) {
	return _IWarden.Contract.NewSpace(&_IWarden.TransactOpts, approveAdminTemplateId, rejectAdminTemplateId, approveSignTemplateId, rejectSignTemplateId, additionalOwners)
}

// RejectKeyRequest is a paid mutator transaction binding the contract method 0xd9ac97be.
//
// Solidity: function rejectKeyRequest(uint64 requestId, string rejectReason) returns(bool success)
func (_IWarden *IWardenTransactor) RejectKeyRequest(opts *bind.TransactOpts, requestId uint64, rejectReason string) (*types.Transaction, error) {
	return _IWarden.contract.Transact(opts, "rejectKeyRequest", requestId, rejectReason)
}

// RejectKeyRequest is a paid mutator transaction binding the contract method 0xd9ac97be.
//
// Solidity: function rejectKeyRequest(uint64 requestId, string rejectReason) returns(bool success)
func (_IWarden *IWardenSession) RejectKeyRequest(requestId uint64, rejectReason string) (*types.Transaction, error) {
	return _IWarden.Contract.RejectKeyRequest(&_IWarden.TransactOpts, requestId, rejectReason)
}

// RejectKeyRequest is a paid mutator transaction binding the contract method 0xd9ac97be.
//
// Solidity: function rejectKeyRequest(uint64 requestId, string rejectReason) returns(bool success)
func (_IWarden *IWardenTransactorSession) RejectKeyRequest(requestId uint64, rejectReason string) (*types.Transaction, error) {
	return _IWarden.Contract.RejectKeyRequest(&_IWarden.TransactOpts, requestId, rejectReason)
}

// RejectSignRequest is a paid mutator transaction binding the contract method 0xb7cf0661.
//
// Solidity: function rejectSignRequest(uint64 requestId, string rejectReason) returns(bool success)
func (_IWarden *IWardenTransactor) RejectSignRequest(opts *bind.TransactOpts, requestId uint64, rejectReason string) (*types.Transaction, error) {
	return _IWarden.contract.Transact(opts, "rejectSignRequest", requestId, rejectReason)
}

// RejectSignRequest is a paid mutator transaction binding the contract method 0xb7cf0661.
//
// Solidity: function rejectSignRequest(uint64 requestId, string rejectReason) returns(bool success)
func (_IWarden *IWardenSession) RejectSignRequest(requestId uint64, rejectReason string) (*types.Transaction, error) {
	return _IWarden.Contract.RejectSignRequest(&_IWarden.TransactOpts, requestId, rejectReason)
}

// RejectSignRequest is a paid mutator transaction binding the contract method 0xb7cf0661.
//
// Solidity: function rejectSignRequest(uint64 requestId, string rejectReason) returns(bool success)
func (_IWarden *IWardenTransactorSession) RejectSignRequest(requestId uint64, rejectReason string) (*types.Transaction, error) {
	return _IWarden.Contract.RejectSignRequest(&_IWarden.TransactOpts, requestId, rejectReason)
}

// RemoveKeychainAdmin is a paid mutator transaction binding the contract method 0x7225e3fa.
//
// Solidity: function removeKeychainAdmin(uint64 keychainId, address admin) returns(bool success)
func (_IWarden *IWardenTransactor) RemoveKeychainAdmin(opts *bind.TransactOpts, keychainId uint64, admin common.Address) (*types.Transaction, error) {
	return _IWarden.contract.Transact(opts, "removeKeychainAdmin", keychainId, admin)
}

// RemoveKeychainAdmin is a paid mutator transaction binding the contract method 0x7225e3fa.
//
// Solidity: function removeKeychainAdmin(uint64 keychainId, address admin) returns(bool success)
func (_IWarden *IWardenSession) RemoveKeychainAdmin(keychainId uint64, admin common.Address) (*types.Transaction, error) {
	return _IWarden.Contract.RemoveKeychainAdmin(&_IWarden.TransactOpts, keychainId, admin)
}

// RemoveKeychainAdmin is a paid mutator transaction binding the contract method 0x7225e3fa.
//
// Solidity: function removeKeychainAdmin(uint64 keychainId, address admin) returns(bool success)
func (_IWarden *IWardenTransactorSession) RemoveKeychainAdmin(keychainId uint64, admin common.Address) (*types.Transaction, error) {
	return _IWarden.Contract.RemoveKeychainAdmin(&_IWarden.TransactOpts, keychainId, admin)
}

// RemoveSpaceOwner is a paid mutator transaction binding the contract method 0x60c88db5.
//
// Solidity: function removeSpaceOwner(uint64 spaceId, address owner, uint64 nonce, uint64 actionTimeoutHeight, string expectedApproveExpression, string expectedRejectExpression) returns(bool success)
func (_IWarden *IWardenTransactor) RemoveSpaceOwner(opts *bind.TransactOpts, spaceId uint64, owner common.Address, nonce uint64, actionTimeoutHeight uint64, expectedApproveExpression string, expectedRejectExpression string) (*types.Transaction, error) {
	return _IWarden.contract.Transact(opts, "removeSpaceOwner", spaceId, owner, nonce, actionTimeoutHeight, expectedApproveExpression, expectedRejectExpression)
}

// RemoveSpaceOwner is a paid mutator transaction binding the contract method 0x60c88db5.
//
// Solidity: function removeSpaceOwner(uint64 spaceId, address owner, uint64 nonce, uint64 actionTimeoutHeight, string expectedApproveExpression, string expectedRejectExpression) returns(bool success)
func (_IWarden *IWardenSession) RemoveSpaceOwner(spaceId uint64, owner common.Address, nonce uint64, actionTimeoutHeight uint64, expectedApproveExpression string, expectedRejectExpression string) (*types.Transaction, error) {
	return _IWarden.Contract.RemoveSpaceOwner(&_IWarden.TransactOpts, spaceId, owner, nonce, actionTimeoutHeight, expectedApproveExpression, expectedRejectExpression)
}

// RemoveSpaceOwner is a paid mutator transaction binding the contract method 0x60c88db5.
//
// Solidity: function removeSpaceOwner(uint64 spaceId, address owner, uint64 nonce, uint64 actionTimeoutHeight, string expectedApproveExpression, string expectedRejectExpression) returns(bool success)
func (_IWarden *IWardenTransactorSession) RemoveSpaceOwner(spaceId uint64, owner common.Address, nonce uint64, actionTimeoutHeight uint64, expectedApproveExpression string, expectedRejectExpression string) (*types.Transaction, error) {
	return _IWarden.Contract.RemoveSpaceOwner(&_IWarden.TransactOpts, spaceId, owner, nonce, actionTimeoutHeight, expectedApproveExpression, expectedRejectExpression)
}

// UpdateKey is a paid mutator transaction binding the contract method 0xfecc57ec.
//
// Solidity: function updateKey(uint64 keyId, uint64 approveTemplateId, uint64 rejectTemplateId, uint64 actionTimeoutHeight, string expectedApproveExpression, string expectedRejectExpression) returns(bool success)
func (_IWarden *IWardenTransactor) UpdateKey(opts *bind.TransactOpts, keyId uint64, approveTemplateId uint64, rejectTemplateId uint64, actionTimeoutHeight uint64, expectedApproveExpression string, expectedRejectExpression string) (*types.Transaction, error) {
	return _IWarden.contract.Transact(opts, "updateKey", keyId, approveTemplateId, rejectTemplateId, actionTimeoutHeight, expectedApproveExpression, expectedRejectExpression)
}

// UpdateKey is a paid mutator transaction binding the contract method 0xfecc57ec.
//
// Solidity: function updateKey(uint64 keyId, uint64 approveTemplateId, uint64 rejectTemplateId, uint64 actionTimeoutHeight, string expectedApproveExpression, string expectedRejectExpression) returns(bool success)
func (_IWarden *IWardenSession) UpdateKey(keyId uint64, approveTemplateId uint64, rejectTemplateId uint64, actionTimeoutHeight uint64, expectedApproveExpression string, expectedRejectExpression string) (*types.Transaction, error) {
	return _IWarden.Contract.UpdateKey(&_IWarden.TransactOpts, keyId, approveTemplateId, rejectTemplateId, actionTimeoutHeight, expectedApproveExpression, expectedRejectExpression)
}

// UpdateKey is a paid mutator transaction binding the contract method 0xfecc57ec.
//
// Solidity: function updateKey(uint64 keyId, uint64 approveTemplateId, uint64 rejectTemplateId, uint64 actionTimeoutHeight, string expectedApproveExpression, string expectedRejectExpression) returns(bool success)
func (_IWarden *IWardenTransactorSession) UpdateKey(keyId uint64, approveTemplateId uint64, rejectTemplateId uint64, actionTimeoutHeight uint64, expectedApproveExpression string, expectedRejectExpression string) (*types.Transaction, error) {
	return _IWarden.Contract.UpdateKey(&_IWarden.TransactOpts, keyId, approveTemplateId, rejectTemplateId, actionTimeoutHeight, expectedApproveExpression, expectedRejectExpression)
}

// UpdateKeychain is a paid mutator transaction binding the contract method 0x4c683562.
//
// Solidity: function updateKeychain(uint64 keychainId, string name, ((string,uint256)[],(string,uint256)[]) keychainFees, string description, string url, string keybaseId) returns(bool success)
func (_IWarden *IWardenTransactor) UpdateKeychain(opts *bind.TransactOpts, keychainId uint64, name string, keychainFees KeychainFees, description string, url string, keybaseId string) (*types.Transaction, error) {
	return _IWarden.contract.Transact(opts, "updateKeychain", keychainId, name, keychainFees, description, url, keybaseId)
}

// UpdateKeychain is a paid mutator transaction binding the contract method 0x4c683562.
//
// Solidity: function updateKeychain(uint64 keychainId, string name, ((string,uint256)[],(string,uint256)[]) keychainFees, string description, string url, string keybaseId) returns(bool success)
func (_IWarden *IWardenSession) UpdateKeychain(keychainId uint64, name string, keychainFees KeychainFees, description string, url string, keybaseId string) (*types.Transaction, error) {
	return _IWarden.Contract.UpdateKeychain(&_IWarden.TransactOpts, keychainId, name, keychainFees, description, url, keybaseId)
}

// UpdateKeychain is a paid mutator transaction binding the contract method 0x4c683562.
//
// Solidity: function updateKeychain(uint64 keychainId, string name, ((string,uint256)[],(string,uint256)[]) keychainFees, string description, string url, string keybaseId) returns(bool success)
func (_IWarden *IWardenTransactorSession) UpdateKeychain(keychainId uint64, name string, keychainFees KeychainFees, description string, url string, keybaseId string) (*types.Transaction, error) {
	return _IWarden.Contract.UpdateKeychain(&_IWarden.TransactOpts, keychainId, name, keychainFees, description, url, keybaseId)
}

// UpdateSpace is a paid mutator transaction binding the contract method 0x7f903050.
//
// Solidity: function updateSpace(uint64 spaceId, uint64 nonce, uint64 approveAdminTemplateId, uint64 rejectAdminTemplateId, uint64 approveSignTemplateId, uint64 rejectSignTemplateId, uint64 actionTimeoutHeight, string expectedApproveExpression, string expectedRejectExpression) returns(bool success)
func (_IWarden *IWardenTransactor) UpdateSpace(opts *bind.TransactOpts, spaceId uint64, nonce uint64, approveAdminTemplateId uint64, rejectAdminTemplateId uint64, approveSignTemplateId uint64, rejectSignTemplateId uint64, actionTimeoutHeight uint64, expectedApproveExpression string, expectedRejectExpression string) (*types.Transaction, error) {
	return _IWarden.contract.Transact(opts, "updateSpace", spaceId, nonce, approveAdminTemplateId, rejectAdminTemplateId, approveSignTemplateId, rejectSignTemplateId, actionTimeoutHeight, expectedApproveExpression, expectedRejectExpression)
}

// UpdateSpace is a paid mutator transaction binding the contract method 0x7f903050.
//
// Solidity: function updateSpace(uint64 spaceId, uint64 nonce, uint64 approveAdminTemplateId, uint64 rejectAdminTemplateId, uint64 approveSignTemplateId, uint64 rejectSignTemplateId, uint64 actionTimeoutHeight, string expectedApproveExpression, string expectedRejectExpression) returns(bool success)
func (_IWarden *IWardenSession) UpdateSpace(spaceId uint64, nonce uint64, approveAdminTemplateId uint64, rejectAdminTemplateId uint64, approveSignTemplateId uint64, rejectSignTemplateId uint64, actionTimeoutHeight uint64, expectedApproveExpression string, expectedRejectExpression string) (*types.Transaction, error) {
	return _IWarden.Contract.UpdateSpace(&_IWarden.TransactOpts, spaceId, nonce, approveAdminTemplateId, rejectAdminTemplateId, approveSignTemplateId, rejectSignTemplateId, actionTimeoutHeight, expectedApproveExpression, expectedRejectExpression)
}

// UpdateSpace is a paid mutator transaction binding the contract method 0x7f903050.
//
// Solidity: function updateSpace(uint64 spaceId, uint64 nonce, uint64 approveAdminTemplateId, uint64 rejectAdminTemplateId, uint64 approveSignTemplateId, uint64 rejectSignTemplateId, uint64 actionTimeoutHeight, string expectedApproveExpression, string expectedRejectExpression) returns(bool success)
func (_IWarden *IWardenTransactorSession) UpdateSpace(spaceId uint64, nonce uint64, approveAdminTemplateId uint64, rejectAdminTemplateId uint64, approveSignTemplateId uint64, rejectSignTemplateId uint64, actionTimeoutHeight uint64, expectedApproveExpression string, expectedRejectExpression string) (*types.Transaction, error) {
	return _IWarden.Contract.UpdateSpace(&_IWarden.TransactOpts, spaceId, nonce, approveAdminTemplateId, rejectAdminTemplateId, approveSignTemplateId, rejectSignTemplateId, actionTimeoutHeight, expectedApproveExpression, expectedRejectExpression)
}

// IWardenAddKeychainAdminIterator is returned from FilterAddKeychainAdmin and is used to iterate over the raw logs and unpacked data for AddKeychainAdmin events raised by the IWarden contract.
type IWardenAddKeychainAdminIterator struct {
	Event *IWardenAddKeychainAdmin // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *IWardenAddKeychainAdminIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IWardenAddKeychainAdmin)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(IWardenAddKeychainAdmin)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *IWardenAddKeychainAdminIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IWardenAddKeychainAdminIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IWardenAddKeychainAdmin represents a AddKeychainAdmin event raised by the IWarden contract.
type IWardenAddKeychainAdmin struct {
	NewAdmin    common.Address
	Id          uint64
	AdminsCount uint64
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterAddKeychainAdmin is a free log retrieval operation binding the contract event 0x363238dc5ee3ed860e5599b2698d2f74510cedfe6ed9a27eacef2fe5cc46763e.
//
// Solidity: event AddKeychainAdmin(address newAdmin, uint64 indexed id, uint64 adminsCount)
func (_IWarden *IWardenFilterer) FilterAddKeychainAdmin(opts *bind.FilterOpts, id []uint64) (*IWardenAddKeychainAdminIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.FilterLogs(opts, "AddKeychainAdmin", idRule)
	if err != nil {
		return nil, err
	}
	return &IWardenAddKeychainAdminIterator{contract: _IWarden.contract, event: "AddKeychainAdmin", logs: logs, sub: sub}, nil
}

// WatchAddKeychainAdmin is a free log subscription operation binding the contract event 0x363238dc5ee3ed860e5599b2698d2f74510cedfe6ed9a27eacef2fe5cc46763e.
//
// Solidity: event AddKeychainAdmin(address newAdmin, uint64 indexed id, uint64 adminsCount)
func (_IWarden *IWardenFilterer) WatchAddKeychainAdmin(opts *bind.WatchOpts, sink chan<- *IWardenAddKeychainAdmin, id []uint64) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.WatchLogs(opts, "AddKeychainAdmin", idRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IWardenAddKeychainAdmin)
				if err := _IWarden.contract.UnpackLog(event, "AddKeychainAdmin", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseAddKeychainAdmin is a log parse operation binding the contract event 0x363238dc5ee3ed860e5599b2698d2f74510cedfe6ed9a27eacef2fe5cc46763e.
//
// Solidity: event AddKeychainAdmin(address newAdmin, uint64 indexed id, uint64 adminsCount)
func (_IWarden *IWardenFilterer) ParseAddKeychainAdmin(log types.Log) (*IWardenAddKeychainAdmin, error) {
	event := new(IWardenAddKeychainAdmin)
	if err := _IWarden.contract.UnpackLog(event, "AddKeychainAdmin", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IWardenAddKeychainWriterIterator is returned from FilterAddKeychainWriter and is used to iterate over the raw logs and unpacked data for AddKeychainWriter events raised by the IWarden contract.
type IWardenAddKeychainWriterIterator struct {
	Event *IWardenAddKeychainWriter // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *IWardenAddKeychainWriterIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IWardenAddKeychainWriter)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(IWardenAddKeychainWriter)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *IWardenAddKeychainWriterIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IWardenAddKeychainWriterIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IWardenAddKeychainWriter represents a AddKeychainWriter event raised by the IWarden contract.
type IWardenAddKeychainWriter struct {
	NewWriter    common.Address
	Id           uint64
	WritersCount uint64
	Raw          types.Log // Blockchain specific contextual infos
}

// FilterAddKeychainWriter is a free log retrieval operation binding the contract event 0x95209db0173d4ee88ed6a251e6c008e9ef15b765625418c7731c2dad6ba8d008.
//
// Solidity: event AddKeychainWriter(address newWriter, uint64 indexed id, uint64 writersCount)
func (_IWarden *IWardenFilterer) FilterAddKeychainWriter(opts *bind.FilterOpts, id []uint64) (*IWardenAddKeychainWriterIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.FilterLogs(opts, "AddKeychainWriter", idRule)
	if err != nil {
		return nil, err
	}
	return &IWardenAddKeychainWriterIterator{contract: _IWarden.contract, event: "AddKeychainWriter", logs: logs, sub: sub}, nil
}

// WatchAddKeychainWriter is a free log subscription operation binding the contract event 0x95209db0173d4ee88ed6a251e6c008e9ef15b765625418c7731c2dad6ba8d008.
//
// Solidity: event AddKeychainWriter(address newWriter, uint64 indexed id, uint64 writersCount)
func (_IWarden *IWardenFilterer) WatchAddKeychainWriter(opts *bind.WatchOpts, sink chan<- *IWardenAddKeychainWriter, id []uint64) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.WatchLogs(opts, "AddKeychainWriter", idRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IWardenAddKeychainWriter)
				if err := _IWarden.contract.UnpackLog(event, "AddKeychainWriter", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseAddKeychainWriter is a log parse operation binding the contract event 0x95209db0173d4ee88ed6a251e6c008e9ef15b765625418c7731c2dad6ba8d008.
//
// Solidity: event AddKeychainWriter(address newWriter, uint64 indexed id, uint64 writersCount)
func (_IWarden *IWardenFilterer) ParseAddKeychainWriter(log types.Log) (*IWardenAddKeychainWriter, error) {
	event := new(IWardenAddKeychainWriter)
	if err := _IWarden.contract.UnpackLog(event, "AddKeychainWriter", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IWardenAddSpaceOwnerIterator is returned from FilterAddSpaceOwner and is used to iterate over the raw logs and unpacked data for AddSpaceOwner events raised by the IWarden contract.
type IWardenAddSpaceOwnerIterator struct {
	Event *IWardenAddSpaceOwner // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *IWardenAddSpaceOwnerIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IWardenAddSpaceOwner)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(IWardenAddSpaceOwner)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *IWardenAddSpaceOwnerIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IWardenAddSpaceOwnerIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IWardenAddSpaceOwner represents a AddSpaceOwner event raised by the IWarden contract.
type IWardenAddSpaceOwner struct {
	SpaceId  uint64
	NewOwner common.Address
	Raw      types.Log // Blockchain specific contextual infos
}

// FilterAddSpaceOwner is a free log retrieval operation binding the contract event 0xd5c3b534a5d56cb3bbc8563d5195f83014ec36c258ee04f7add5f4c7518da28b.
//
// Solidity: event AddSpaceOwner(uint64 indexed spaceId, address newOwner)
func (_IWarden *IWardenFilterer) FilterAddSpaceOwner(opts *bind.FilterOpts, spaceId []uint64) (*IWardenAddSpaceOwnerIterator, error) {

	var spaceIdRule []interface{}
	for _, spaceIdItem := range spaceId {
		spaceIdRule = append(spaceIdRule, spaceIdItem)
	}

	logs, sub, err := _IWarden.contract.FilterLogs(opts, "AddSpaceOwner", spaceIdRule)
	if err != nil {
		return nil, err
	}
	return &IWardenAddSpaceOwnerIterator{contract: _IWarden.contract, event: "AddSpaceOwner", logs: logs, sub: sub}, nil
}

// WatchAddSpaceOwner is a free log subscription operation binding the contract event 0xd5c3b534a5d56cb3bbc8563d5195f83014ec36c258ee04f7add5f4c7518da28b.
//
// Solidity: event AddSpaceOwner(uint64 indexed spaceId, address newOwner)
func (_IWarden *IWardenFilterer) WatchAddSpaceOwner(opts *bind.WatchOpts, sink chan<- *IWardenAddSpaceOwner, spaceId []uint64) (event.Subscription, error) {

	var spaceIdRule []interface{}
	for _, spaceIdItem := range spaceId {
		spaceIdRule = append(spaceIdRule, spaceIdItem)
	}

	logs, sub, err := _IWarden.contract.WatchLogs(opts, "AddSpaceOwner", spaceIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IWardenAddSpaceOwner)
				if err := _IWarden.contract.UnpackLog(event, "AddSpaceOwner", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseAddSpaceOwner is a log parse operation binding the contract event 0xd5c3b534a5d56cb3bbc8563d5195f83014ec36c258ee04f7add5f4c7518da28b.
//
// Solidity: event AddSpaceOwner(uint64 indexed spaceId, address newOwner)
func (_IWarden *IWardenFilterer) ParseAddSpaceOwner(log types.Log) (*IWardenAddSpaceOwner, error) {
	event := new(IWardenAddSpaceOwner)
	if err := _IWarden.contract.UnpackLog(event, "AddSpaceOwner", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IWardenFulfilSignRequestIterator is returned from FilterFulfilSignRequest and is used to iterate over the raw logs and unpacked data for FulfilSignRequest events raised by the IWarden contract.
type IWardenFulfilSignRequestIterator struct {
	Event *IWardenFulfilSignRequest // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *IWardenFulfilSignRequestIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IWardenFulfilSignRequest)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(IWardenFulfilSignRequest)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *IWardenFulfilSignRequestIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IWardenFulfilSignRequestIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IWardenFulfilSignRequest represents a FulfilSignRequest event raised by the IWarden contract.
type IWardenFulfilSignRequest struct {
	Id  uint64
	Raw types.Log // Blockchain specific contextual infos
}

// FilterFulfilSignRequest is a free log retrieval operation binding the contract event 0x4d8a43263e214628c121391980488d29777a4d0160d73b07accb564be2a8db44.
//
// Solidity: event FulfilSignRequest(uint64 indexed id)
func (_IWarden *IWardenFilterer) FilterFulfilSignRequest(opts *bind.FilterOpts, id []uint64) (*IWardenFulfilSignRequestIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.FilterLogs(opts, "FulfilSignRequest", idRule)
	if err != nil {
		return nil, err
	}
	return &IWardenFulfilSignRequestIterator{contract: _IWarden.contract, event: "FulfilSignRequest", logs: logs, sub: sub}, nil
}

// WatchFulfilSignRequest is a free log subscription operation binding the contract event 0x4d8a43263e214628c121391980488d29777a4d0160d73b07accb564be2a8db44.
//
// Solidity: event FulfilSignRequest(uint64 indexed id)
func (_IWarden *IWardenFilterer) WatchFulfilSignRequest(opts *bind.WatchOpts, sink chan<- *IWardenFulfilSignRequest, id []uint64) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.WatchLogs(opts, "FulfilSignRequest", idRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IWardenFulfilSignRequest)
				if err := _IWarden.contract.UnpackLog(event, "FulfilSignRequest", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseFulfilSignRequest is a log parse operation binding the contract event 0x4d8a43263e214628c121391980488d29777a4d0160d73b07accb564be2a8db44.
//
// Solidity: event FulfilSignRequest(uint64 indexed id)
func (_IWarden *IWardenFilterer) ParseFulfilSignRequest(log types.Log) (*IWardenFulfilSignRequest, error) {
	event := new(IWardenFulfilSignRequest)
	if err := _IWarden.contract.UnpackLog(event, "FulfilSignRequest", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IWardenNewKeyIterator is returned from FilterNewKey and is used to iterate over the raw logs and unpacked data for NewKey events raised by the IWarden contract.
type IWardenNewKeyIterator struct {
	Event *IWardenNewKey // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *IWardenNewKeyIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IWardenNewKey)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(IWardenNewKey)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *IWardenNewKeyIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IWardenNewKeyIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IWardenNewKey represents a NewKey event raised by the IWarden contract.
type IWardenNewKey struct {
	Id                uint64
	KeyType           uint8
	SpaceId           uint64
	KeychainId        uint64
	ApproveTemplateId uint64
	RejectTemplateId  uint64
	Raw               types.Log // Blockchain specific contextual infos
}

// FilterNewKey is a free log retrieval operation binding the contract event 0x49d9097e1d60d8d284c2449adb78b4b296b693d824d18097a2998a8da970aa10.
//
// Solidity: event NewKey(uint64 indexed id, uint8 keyType, uint64 spaceId, uint64 keychainId, uint64 approveTemplateId, uint64 rejectTemplateId)
func (_IWarden *IWardenFilterer) FilterNewKey(opts *bind.FilterOpts, id []uint64) (*IWardenNewKeyIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.FilterLogs(opts, "NewKey", idRule)
	if err != nil {
		return nil, err
	}
	return &IWardenNewKeyIterator{contract: _IWarden.contract, event: "NewKey", logs: logs, sub: sub}, nil
}

// WatchNewKey is a free log subscription operation binding the contract event 0x49d9097e1d60d8d284c2449adb78b4b296b693d824d18097a2998a8da970aa10.
//
// Solidity: event NewKey(uint64 indexed id, uint8 keyType, uint64 spaceId, uint64 keychainId, uint64 approveTemplateId, uint64 rejectTemplateId)
func (_IWarden *IWardenFilterer) WatchNewKey(opts *bind.WatchOpts, sink chan<- *IWardenNewKey, id []uint64) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.WatchLogs(opts, "NewKey", idRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IWardenNewKey)
				if err := _IWarden.contract.UnpackLog(event, "NewKey", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseNewKey is a log parse operation binding the contract event 0x49d9097e1d60d8d284c2449adb78b4b296b693d824d18097a2998a8da970aa10.
//
// Solidity: event NewKey(uint64 indexed id, uint8 keyType, uint64 spaceId, uint64 keychainId, uint64 approveTemplateId, uint64 rejectTemplateId)
func (_IWarden *IWardenFilterer) ParseNewKey(log types.Log) (*IWardenNewKey, error) {
	event := new(IWardenNewKey)
	if err := _IWarden.contract.UnpackLog(event, "NewKey", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IWardenNewKeyRequestIterator is returned from FilterNewKeyRequest and is used to iterate over the raw logs and unpacked data for NewKeyRequest events raised by the IWarden contract.
type IWardenNewKeyRequestIterator struct {
	Event *IWardenNewKeyRequest // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *IWardenNewKeyRequestIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IWardenNewKeyRequest)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(IWardenNewKeyRequest)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *IWardenNewKeyRequestIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IWardenNewKeyRequestIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IWardenNewKeyRequest represents a NewKeyRequest event raised by the IWarden contract.
type IWardenNewKeyRequest struct {
	Id                uint64
	SpaceId           uint64
	KeychainId        uint64
	ApproveTemplateId uint64
	RejectTemplateId  uint64
	KeyType           uint8
	Creator           common.Address
	Raw               types.Log // Blockchain specific contextual infos
}

// FilterNewKeyRequest is a free log retrieval operation binding the contract event 0xac8bd313e734c94dfb2ebe4e42d211d311c4106025a2c6002955c3f8dd593733.
//
// Solidity: event NewKeyRequest(uint64 indexed id, uint64 spaceId, uint64 keychainId, uint64 approveTemplateId, uint64 rejectTemplateId, uint8 keyType, address creator)
func (_IWarden *IWardenFilterer) FilterNewKeyRequest(opts *bind.FilterOpts, id []uint64) (*IWardenNewKeyRequestIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.FilterLogs(opts, "NewKeyRequest", idRule)
	if err != nil {
		return nil, err
	}
	return &IWardenNewKeyRequestIterator{contract: _IWarden.contract, event: "NewKeyRequest", logs: logs, sub: sub}, nil
}

// WatchNewKeyRequest is a free log subscription operation binding the contract event 0xac8bd313e734c94dfb2ebe4e42d211d311c4106025a2c6002955c3f8dd593733.
//
// Solidity: event NewKeyRequest(uint64 indexed id, uint64 spaceId, uint64 keychainId, uint64 approveTemplateId, uint64 rejectTemplateId, uint8 keyType, address creator)
func (_IWarden *IWardenFilterer) WatchNewKeyRequest(opts *bind.WatchOpts, sink chan<- *IWardenNewKeyRequest, id []uint64) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.WatchLogs(opts, "NewKeyRequest", idRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IWardenNewKeyRequest)
				if err := _IWarden.contract.UnpackLog(event, "NewKeyRequest", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseNewKeyRequest is a log parse operation binding the contract event 0xac8bd313e734c94dfb2ebe4e42d211d311c4106025a2c6002955c3f8dd593733.
//
// Solidity: event NewKeyRequest(uint64 indexed id, uint64 spaceId, uint64 keychainId, uint64 approveTemplateId, uint64 rejectTemplateId, uint8 keyType, address creator)
func (_IWarden *IWardenFilterer) ParseNewKeyRequest(log types.Log) (*IWardenNewKeyRequest, error) {
	event := new(IWardenNewKeyRequest)
	if err := _IWarden.contract.UnpackLog(event, "NewKeyRequest", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IWardenNewKeychainIterator is returned from FilterNewKeychain and is used to iterate over the raw logs and unpacked data for NewKeychain events raised by the IWarden contract.
type IWardenNewKeychainIterator struct {
	Event *IWardenNewKeychain // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *IWardenNewKeychainIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IWardenNewKeychain)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(IWardenNewKeychain)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *IWardenNewKeychainIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IWardenNewKeychainIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IWardenNewKeychain represents a NewKeychain event raised by the IWarden contract.
type IWardenNewKeychain struct {
	Id      uint64
	Creator common.Address
	Raw     types.Log // Blockchain specific contextual infos
}

// FilterNewKeychain is a free log retrieval operation binding the contract event 0xbf4749d4199931cc72db43a71a673c8a5d90a98fedbea9c172788448b61a8f8d.
//
// Solidity: event NewKeychain(uint64 indexed id, address creator)
func (_IWarden *IWardenFilterer) FilterNewKeychain(opts *bind.FilterOpts, id []uint64) (*IWardenNewKeychainIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.FilterLogs(opts, "NewKeychain", idRule)
	if err != nil {
		return nil, err
	}
	return &IWardenNewKeychainIterator{contract: _IWarden.contract, event: "NewKeychain", logs: logs, sub: sub}, nil
}

// WatchNewKeychain is a free log subscription operation binding the contract event 0xbf4749d4199931cc72db43a71a673c8a5d90a98fedbea9c172788448b61a8f8d.
//
// Solidity: event NewKeychain(uint64 indexed id, address creator)
func (_IWarden *IWardenFilterer) WatchNewKeychain(opts *bind.WatchOpts, sink chan<- *IWardenNewKeychain, id []uint64) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.WatchLogs(opts, "NewKeychain", idRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IWardenNewKeychain)
				if err := _IWarden.contract.UnpackLog(event, "NewKeychain", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseNewKeychain is a log parse operation binding the contract event 0xbf4749d4199931cc72db43a71a673c8a5d90a98fedbea9c172788448b61a8f8d.
//
// Solidity: event NewKeychain(uint64 indexed id, address creator)
func (_IWarden *IWardenFilterer) ParseNewKeychain(log types.Log) (*IWardenNewKeychain, error) {
	event := new(IWardenNewKeychain)
	if err := _IWarden.contract.UnpackLog(event, "NewKeychain", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IWardenNewSignRequestIterator is returned from FilterNewSignRequest and is used to iterate over the raw logs and unpacked data for NewSignRequest events raised by the IWarden contract.
type IWardenNewSignRequestIterator struct {
	Event *IWardenNewSignRequest // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *IWardenNewSignRequestIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IWardenNewSignRequest)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(IWardenNewSignRequest)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *IWardenNewSignRequestIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IWardenNewSignRequestIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IWardenNewSignRequest represents a NewSignRequest event raised by the IWarden contract.
type IWardenNewSignRequest struct {
	Id            uint64
	KeyId         uint64
	Creator       common.Address
	BroadcastType uint8
	Raw           types.Log // Blockchain specific contextual infos
}

// FilterNewSignRequest is a free log retrieval operation binding the contract event 0x3187426ba54d86726fad12c0e947eaca12d8d04cb8e5a97f1a48e4277d63005f.
//
// Solidity: event NewSignRequest(uint64 indexed id, uint64 keyId, address creator, uint8 broadcastType)
func (_IWarden *IWardenFilterer) FilterNewSignRequest(opts *bind.FilterOpts, id []uint64) (*IWardenNewSignRequestIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.FilterLogs(opts, "NewSignRequest", idRule)
	if err != nil {
		return nil, err
	}
	return &IWardenNewSignRequestIterator{contract: _IWarden.contract, event: "NewSignRequest", logs: logs, sub: sub}, nil
}

// WatchNewSignRequest is a free log subscription operation binding the contract event 0x3187426ba54d86726fad12c0e947eaca12d8d04cb8e5a97f1a48e4277d63005f.
//
// Solidity: event NewSignRequest(uint64 indexed id, uint64 keyId, address creator, uint8 broadcastType)
func (_IWarden *IWardenFilterer) WatchNewSignRequest(opts *bind.WatchOpts, sink chan<- *IWardenNewSignRequest, id []uint64) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.WatchLogs(opts, "NewSignRequest", idRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IWardenNewSignRequest)
				if err := _IWarden.contract.UnpackLog(event, "NewSignRequest", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseNewSignRequest is a log parse operation binding the contract event 0x3187426ba54d86726fad12c0e947eaca12d8d04cb8e5a97f1a48e4277d63005f.
//
// Solidity: event NewSignRequest(uint64 indexed id, uint64 keyId, address creator, uint8 broadcastType)
func (_IWarden *IWardenFilterer) ParseNewSignRequest(log types.Log) (*IWardenNewSignRequest, error) {
	event := new(IWardenNewSignRequest)
	if err := _IWarden.contract.UnpackLog(event, "NewSignRequest", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IWardenNewSpaceIterator is returned from FilterNewSpace and is used to iterate over the raw logs and unpacked data for NewSpace events raised by the IWarden contract.
type IWardenNewSpaceIterator struct {
	Event *IWardenNewSpace // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *IWardenNewSpaceIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IWardenNewSpace)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(IWardenNewSpace)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *IWardenNewSpaceIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IWardenNewSpaceIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IWardenNewSpace represents a NewSpace event raised by the IWarden contract.
type IWardenNewSpace struct {
	Id                     uint64
	Creator                common.Address
	OwnersCount            uint64
	ApproveAdminTemplateId uint64
	RejectAdminTemplateId  uint64
	ApproveSignTemplateId  uint64
	RejectSignTemplateId   uint64
	Raw                    types.Log // Blockchain specific contextual infos
}

// FilterNewSpace is a free log retrieval operation binding the contract event 0x1d673e16d9a82fd9a44a946aea320be2cdc951dc51ecb22fbde2396d9c49b4a7.
//
// Solidity: event NewSpace(uint64 indexed id, address creator, uint64 ownersCount, uint64 approveAdminTemplateId, uint64 rejectAdminTemplateId, uint64 approveSignTemplateId, uint64 rejectSignTemplateId)
func (_IWarden *IWardenFilterer) FilterNewSpace(opts *bind.FilterOpts, id []uint64) (*IWardenNewSpaceIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.FilterLogs(opts, "NewSpace", idRule)
	if err != nil {
		return nil, err
	}
	return &IWardenNewSpaceIterator{contract: _IWarden.contract, event: "NewSpace", logs: logs, sub: sub}, nil
}

// WatchNewSpace is a free log subscription operation binding the contract event 0x1d673e16d9a82fd9a44a946aea320be2cdc951dc51ecb22fbde2396d9c49b4a7.
//
// Solidity: event NewSpace(uint64 indexed id, address creator, uint64 ownersCount, uint64 approveAdminTemplateId, uint64 rejectAdminTemplateId, uint64 approveSignTemplateId, uint64 rejectSignTemplateId)
func (_IWarden *IWardenFilterer) WatchNewSpace(opts *bind.WatchOpts, sink chan<- *IWardenNewSpace, id []uint64) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.WatchLogs(opts, "NewSpace", idRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IWardenNewSpace)
				if err := _IWarden.contract.UnpackLog(event, "NewSpace", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseNewSpace is a log parse operation binding the contract event 0x1d673e16d9a82fd9a44a946aea320be2cdc951dc51ecb22fbde2396d9c49b4a7.
//
// Solidity: event NewSpace(uint64 indexed id, address creator, uint64 ownersCount, uint64 approveAdminTemplateId, uint64 rejectAdminTemplateId, uint64 approveSignTemplateId, uint64 rejectSignTemplateId)
func (_IWarden *IWardenFilterer) ParseNewSpace(log types.Log) (*IWardenNewSpace, error) {
	event := new(IWardenNewSpace)
	if err := _IWarden.contract.UnpackLog(event, "NewSpace", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IWardenRejectKeyRequestIterator is returned from FilterRejectKeyRequest and is used to iterate over the raw logs and unpacked data for RejectKeyRequest events raised by the IWarden contract.
type IWardenRejectKeyRequestIterator struct {
	Event *IWardenRejectKeyRequest // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *IWardenRejectKeyRequestIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IWardenRejectKeyRequest)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(IWardenRejectKeyRequest)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *IWardenRejectKeyRequestIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IWardenRejectKeyRequestIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IWardenRejectKeyRequest represents a RejectKeyRequest event raised by the IWarden contract.
type IWardenRejectKeyRequest struct {
	Id  uint64
	Raw types.Log // Blockchain specific contextual infos
}

// FilterRejectKeyRequest is a free log retrieval operation binding the contract event 0xeb94cbafda4c7f6a07cd1d92397097ac757e494d72e3e3cabb3c618ca559a720.
//
// Solidity: event RejectKeyRequest(uint64 indexed id)
func (_IWarden *IWardenFilterer) FilterRejectKeyRequest(opts *bind.FilterOpts, id []uint64) (*IWardenRejectKeyRequestIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.FilterLogs(opts, "RejectKeyRequest", idRule)
	if err != nil {
		return nil, err
	}
	return &IWardenRejectKeyRequestIterator{contract: _IWarden.contract, event: "RejectKeyRequest", logs: logs, sub: sub}, nil
}

// WatchRejectKeyRequest is a free log subscription operation binding the contract event 0xeb94cbafda4c7f6a07cd1d92397097ac757e494d72e3e3cabb3c618ca559a720.
//
// Solidity: event RejectKeyRequest(uint64 indexed id)
func (_IWarden *IWardenFilterer) WatchRejectKeyRequest(opts *bind.WatchOpts, sink chan<- *IWardenRejectKeyRequest, id []uint64) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.WatchLogs(opts, "RejectKeyRequest", idRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IWardenRejectKeyRequest)
				if err := _IWarden.contract.UnpackLog(event, "RejectKeyRequest", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseRejectKeyRequest is a log parse operation binding the contract event 0xeb94cbafda4c7f6a07cd1d92397097ac757e494d72e3e3cabb3c618ca559a720.
//
// Solidity: event RejectKeyRequest(uint64 indexed id)
func (_IWarden *IWardenFilterer) ParseRejectKeyRequest(log types.Log) (*IWardenRejectKeyRequest, error) {
	event := new(IWardenRejectKeyRequest)
	if err := _IWarden.contract.UnpackLog(event, "RejectKeyRequest", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IWardenRejectSignRequestIterator is returned from FilterRejectSignRequest and is used to iterate over the raw logs and unpacked data for RejectSignRequest events raised by the IWarden contract.
type IWardenRejectSignRequestIterator struct {
	Event *IWardenRejectSignRequest // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *IWardenRejectSignRequestIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IWardenRejectSignRequest)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(IWardenRejectSignRequest)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *IWardenRejectSignRequestIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IWardenRejectSignRequestIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IWardenRejectSignRequest represents a RejectSignRequest event raised by the IWarden contract.
type IWardenRejectSignRequest struct {
	Id  uint64
	Raw types.Log // Blockchain specific contextual infos
}

// FilterRejectSignRequest is a free log retrieval operation binding the contract event 0x9876fe372fa159e1ec936e70ab5196b67d4f8ea9b99022ea49f9e3770237e205.
//
// Solidity: event RejectSignRequest(uint64 indexed id)
func (_IWarden *IWardenFilterer) FilterRejectSignRequest(opts *bind.FilterOpts, id []uint64) (*IWardenRejectSignRequestIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.FilterLogs(opts, "RejectSignRequest", idRule)
	if err != nil {
		return nil, err
	}
	return &IWardenRejectSignRequestIterator{contract: _IWarden.contract, event: "RejectSignRequest", logs: logs, sub: sub}, nil
}

// WatchRejectSignRequest is a free log subscription operation binding the contract event 0x9876fe372fa159e1ec936e70ab5196b67d4f8ea9b99022ea49f9e3770237e205.
//
// Solidity: event RejectSignRequest(uint64 indexed id)
func (_IWarden *IWardenFilterer) WatchRejectSignRequest(opts *bind.WatchOpts, sink chan<- *IWardenRejectSignRequest, id []uint64) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.WatchLogs(opts, "RejectSignRequest", idRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IWardenRejectSignRequest)
				if err := _IWarden.contract.UnpackLog(event, "RejectSignRequest", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseRejectSignRequest is a log parse operation binding the contract event 0x9876fe372fa159e1ec936e70ab5196b67d4f8ea9b99022ea49f9e3770237e205.
//
// Solidity: event RejectSignRequest(uint64 indexed id)
func (_IWarden *IWardenFilterer) ParseRejectSignRequest(log types.Log) (*IWardenRejectSignRequest, error) {
	event := new(IWardenRejectSignRequest)
	if err := _IWarden.contract.UnpackLog(event, "RejectSignRequest", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IWardenRemoveKeychainAdminIterator is returned from FilterRemoveKeychainAdmin and is used to iterate over the raw logs and unpacked data for RemoveKeychainAdmin events raised by the IWarden contract.
type IWardenRemoveKeychainAdminIterator struct {
	Event *IWardenRemoveKeychainAdmin // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *IWardenRemoveKeychainAdminIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IWardenRemoveKeychainAdmin)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(IWardenRemoveKeychainAdmin)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *IWardenRemoveKeychainAdminIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IWardenRemoveKeychainAdminIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IWardenRemoveKeychainAdmin represents a RemoveKeychainAdmin event raised by the IWarden contract.
type IWardenRemoveKeychainAdmin struct {
	KeychainId  uint64
	Admin       common.Address
	AdminsCount uint64
	Raw         types.Log // Blockchain specific contextual infos
}

// FilterRemoveKeychainAdmin is a free log retrieval operation binding the contract event 0x8e8e92a5097448dcaea8690cf868dc7bdab4f7d72cff973706bb57a6d15ba681.
//
// Solidity: event RemoveKeychainAdmin(uint64 indexed keychainId, address admin, uint64 adminsCount)
func (_IWarden *IWardenFilterer) FilterRemoveKeychainAdmin(opts *bind.FilterOpts, keychainId []uint64) (*IWardenRemoveKeychainAdminIterator, error) {

	var keychainIdRule []interface{}
	for _, keychainIdItem := range keychainId {
		keychainIdRule = append(keychainIdRule, keychainIdItem)
	}

	logs, sub, err := _IWarden.contract.FilterLogs(opts, "RemoveKeychainAdmin", keychainIdRule)
	if err != nil {
		return nil, err
	}
	return &IWardenRemoveKeychainAdminIterator{contract: _IWarden.contract, event: "RemoveKeychainAdmin", logs: logs, sub: sub}, nil
}

// WatchRemoveKeychainAdmin is a free log subscription operation binding the contract event 0x8e8e92a5097448dcaea8690cf868dc7bdab4f7d72cff973706bb57a6d15ba681.
//
// Solidity: event RemoveKeychainAdmin(uint64 indexed keychainId, address admin, uint64 adminsCount)
func (_IWarden *IWardenFilterer) WatchRemoveKeychainAdmin(opts *bind.WatchOpts, sink chan<- *IWardenRemoveKeychainAdmin, keychainId []uint64) (event.Subscription, error) {

	var keychainIdRule []interface{}
	for _, keychainIdItem := range keychainId {
		keychainIdRule = append(keychainIdRule, keychainIdItem)
	}

	logs, sub, err := _IWarden.contract.WatchLogs(opts, "RemoveKeychainAdmin", keychainIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IWardenRemoveKeychainAdmin)
				if err := _IWarden.contract.UnpackLog(event, "RemoveKeychainAdmin", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseRemoveKeychainAdmin is a log parse operation binding the contract event 0x8e8e92a5097448dcaea8690cf868dc7bdab4f7d72cff973706bb57a6d15ba681.
//
// Solidity: event RemoveKeychainAdmin(uint64 indexed keychainId, address admin, uint64 adminsCount)
func (_IWarden *IWardenFilterer) ParseRemoveKeychainAdmin(log types.Log) (*IWardenRemoveKeychainAdmin, error) {
	event := new(IWardenRemoveKeychainAdmin)
	if err := _IWarden.contract.UnpackLog(event, "RemoveKeychainAdmin", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IWardenRemoveSpaceOwnerIterator is returned from FilterRemoveSpaceOwner and is used to iterate over the raw logs and unpacked data for RemoveSpaceOwner events raised by the IWarden contract.
type IWardenRemoveSpaceOwnerIterator struct {
	Event *IWardenRemoveSpaceOwner // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *IWardenRemoveSpaceOwnerIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IWardenRemoveSpaceOwner)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(IWardenRemoveSpaceOwner)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *IWardenRemoveSpaceOwnerIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IWardenRemoveSpaceOwnerIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IWardenRemoveSpaceOwner represents a RemoveSpaceOwner event raised by the IWarden contract.
type IWardenRemoveSpaceOwner struct {
	SpaceId      uint64
	RemovedOwner common.Address
	Raw          types.Log // Blockchain specific contextual infos
}

// FilterRemoveSpaceOwner is a free log retrieval operation binding the contract event 0xfe361f4258d2e824c88b5eff2a6158a8195a8e287d5ed09535d5c682af00de56.
//
// Solidity: event RemoveSpaceOwner(uint64 indexed spaceId, address removedOwner)
func (_IWarden *IWardenFilterer) FilterRemoveSpaceOwner(opts *bind.FilterOpts, spaceId []uint64) (*IWardenRemoveSpaceOwnerIterator, error) {

	var spaceIdRule []interface{}
	for _, spaceIdItem := range spaceId {
		spaceIdRule = append(spaceIdRule, spaceIdItem)
	}

	logs, sub, err := _IWarden.contract.FilterLogs(opts, "RemoveSpaceOwner", spaceIdRule)
	if err != nil {
		return nil, err
	}
	return &IWardenRemoveSpaceOwnerIterator{contract: _IWarden.contract, event: "RemoveSpaceOwner", logs: logs, sub: sub}, nil
}

// WatchRemoveSpaceOwner is a free log subscription operation binding the contract event 0xfe361f4258d2e824c88b5eff2a6158a8195a8e287d5ed09535d5c682af00de56.
//
// Solidity: event RemoveSpaceOwner(uint64 indexed spaceId, address removedOwner)
func (_IWarden *IWardenFilterer) WatchRemoveSpaceOwner(opts *bind.WatchOpts, sink chan<- *IWardenRemoveSpaceOwner, spaceId []uint64) (event.Subscription, error) {

	var spaceIdRule []interface{}
	for _, spaceIdItem := range spaceId {
		spaceIdRule = append(spaceIdRule, spaceIdItem)
	}

	logs, sub, err := _IWarden.contract.WatchLogs(opts, "RemoveSpaceOwner", spaceIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IWardenRemoveSpaceOwner)
				if err := _IWarden.contract.UnpackLog(event, "RemoveSpaceOwner", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseRemoveSpaceOwner is a log parse operation binding the contract event 0xfe361f4258d2e824c88b5eff2a6158a8195a8e287d5ed09535d5c682af00de56.
//
// Solidity: event RemoveSpaceOwner(uint64 indexed spaceId, address removedOwner)
func (_IWarden *IWardenFilterer) ParseRemoveSpaceOwner(log types.Log) (*IWardenRemoveSpaceOwner, error) {
	event := new(IWardenRemoveSpaceOwner)
	if err := _IWarden.contract.UnpackLog(event, "RemoveSpaceOwner", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IWardenUpdateKeyIterator is returned from FilterUpdateKey and is used to iterate over the raw logs and unpacked data for UpdateKey events raised by the IWarden contract.
type IWardenUpdateKeyIterator struct {
	Event *IWardenUpdateKey // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *IWardenUpdateKeyIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IWardenUpdateKey)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(IWardenUpdateKey)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *IWardenUpdateKeyIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IWardenUpdateKeyIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IWardenUpdateKey represents a UpdateKey event raised by the IWarden contract.
type IWardenUpdateKey struct {
	Id                uint64
	ApproveTemplateId uint64
	RejectTemplateId  uint64
	Raw               types.Log // Blockchain specific contextual infos
}

// FilterUpdateKey is a free log retrieval operation binding the contract event 0x9a8c43b6ec36deb25cf6dab899dda357fa9d946a014ff68363773222e83467f2.
//
// Solidity: event UpdateKey(uint64 indexed id, uint64 approveTemplateId, uint64 rejectTemplateId)
func (_IWarden *IWardenFilterer) FilterUpdateKey(opts *bind.FilterOpts, id []uint64) (*IWardenUpdateKeyIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.FilterLogs(opts, "UpdateKey", idRule)
	if err != nil {
		return nil, err
	}
	return &IWardenUpdateKeyIterator{contract: _IWarden.contract, event: "UpdateKey", logs: logs, sub: sub}, nil
}

// WatchUpdateKey is a free log subscription operation binding the contract event 0x9a8c43b6ec36deb25cf6dab899dda357fa9d946a014ff68363773222e83467f2.
//
// Solidity: event UpdateKey(uint64 indexed id, uint64 approveTemplateId, uint64 rejectTemplateId)
func (_IWarden *IWardenFilterer) WatchUpdateKey(opts *bind.WatchOpts, sink chan<- *IWardenUpdateKey, id []uint64) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.WatchLogs(opts, "UpdateKey", idRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IWardenUpdateKey)
				if err := _IWarden.contract.UnpackLog(event, "UpdateKey", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseUpdateKey is a log parse operation binding the contract event 0x9a8c43b6ec36deb25cf6dab899dda357fa9d946a014ff68363773222e83467f2.
//
// Solidity: event UpdateKey(uint64 indexed id, uint64 approveTemplateId, uint64 rejectTemplateId)
func (_IWarden *IWardenFilterer) ParseUpdateKey(log types.Log) (*IWardenUpdateKey, error) {
	event := new(IWardenUpdateKey)
	if err := _IWarden.contract.UnpackLog(event, "UpdateKey", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IWardenUpdateKeychainIterator is returned from FilterUpdateKeychain and is used to iterate over the raw logs and unpacked data for UpdateKeychain events raised by the IWarden contract.
type IWardenUpdateKeychainIterator struct {
	Event *IWardenUpdateKeychain // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *IWardenUpdateKeychainIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IWardenUpdateKeychain)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(IWardenUpdateKeychain)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *IWardenUpdateKeychainIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IWardenUpdateKeychainIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IWardenUpdateKeychain represents a UpdateKeychain event raised by the IWarden contract.
type IWardenUpdateKeychain struct {
	Id           uint64
	KeychainFees KeychainFees
	Raw          types.Log // Blockchain specific contextual infos
}

// FilterUpdateKeychain is a free log retrieval operation binding the contract event 0x66076723d87c639e1336db5ad634dc4108ca17079e7352fe66e06067c453b8b0.
//
// Solidity: event UpdateKeychain(uint64 indexed id, ((string,uint256)[],(string,uint256)[]) keychainFees)
func (_IWarden *IWardenFilterer) FilterUpdateKeychain(opts *bind.FilterOpts, id []uint64) (*IWardenUpdateKeychainIterator, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.FilterLogs(opts, "UpdateKeychain", idRule)
	if err != nil {
		return nil, err
	}
	return &IWardenUpdateKeychainIterator{contract: _IWarden.contract, event: "UpdateKeychain", logs: logs, sub: sub}, nil
}

// WatchUpdateKeychain is a free log subscription operation binding the contract event 0x66076723d87c639e1336db5ad634dc4108ca17079e7352fe66e06067c453b8b0.
//
// Solidity: event UpdateKeychain(uint64 indexed id, ((string,uint256)[],(string,uint256)[]) keychainFees)
func (_IWarden *IWardenFilterer) WatchUpdateKeychain(opts *bind.WatchOpts, sink chan<- *IWardenUpdateKeychain, id []uint64) (event.Subscription, error) {

	var idRule []interface{}
	for _, idItem := range id {
		idRule = append(idRule, idItem)
	}

	logs, sub, err := _IWarden.contract.WatchLogs(opts, "UpdateKeychain", idRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IWardenUpdateKeychain)
				if err := _IWarden.contract.UnpackLog(event, "UpdateKeychain", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseUpdateKeychain is a log parse operation binding the contract event 0x66076723d87c639e1336db5ad634dc4108ca17079e7352fe66e06067c453b8b0.
//
// Solidity: event UpdateKeychain(uint64 indexed id, ((string,uint256)[],(string,uint256)[]) keychainFees)
func (_IWarden *IWardenFilterer) ParseUpdateKeychain(log types.Log) (*IWardenUpdateKeychain, error) {
	event := new(IWardenUpdateKeychain)
	if err := _IWarden.contract.UnpackLog(event, "UpdateKeychain", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}

// IWardenUpdateSpaceIterator is returned from FilterUpdateSpace and is used to iterate over the raw logs and unpacked data for UpdateSpace events raised by the IWarden contract.
type IWardenUpdateSpaceIterator struct {
	Event *IWardenUpdateSpace // Event containing the contract specifics and raw log

	contract *bind.BoundContract // Generic contract to use for unpacking event data
	event    string              // Event name to use for unpacking event data

	logs chan types.Log        // Log channel receiving the found contract events
	sub  ethereum.Subscription // Subscription for errors, completion and termination
	done bool                  // Whether the subscription completed delivering logs
	fail error                 // Occurred error to stop iteration
}

// Next advances the iterator to the subsequent event, returning whether there
// are any more events found. In case of a retrieval or parsing error, false is
// returned and Error() can be queried for the exact failure.
func (it *IWardenUpdateSpaceIterator) Next() bool {
	// If the iterator failed, stop iterating
	if it.fail != nil {
		return false
	}
	// If the iterator completed, deliver directly whatever's available
	if it.done {
		select {
		case log := <-it.logs:
			it.Event = new(IWardenUpdateSpace)
			if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
				it.fail = err
				return false
			}
			it.Event.Raw = log
			return true

		default:
			return false
		}
	}
	// Iterator still in progress, wait for either a data or an error event
	select {
	case log := <-it.logs:
		it.Event = new(IWardenUpdateSpace)
		if err := it.contract.UnpackLog(it.Event, it.event, log); err != nil {
			it.fail = err
			return false
		}
		it.Event.Raw = log
		return true

	case err := <-it.sub.Err():
		it.done = true
		it.fail = err
		return it.Next()
	}
}

// Error returns any retrieval or parsing error occurred during filtering.
func (it *IWardenUpdateSpaceIterator) Error() error {
	return it.fail
}

// Close terminates the iteration process, releasing any pending underlying
// resources.
func (it *IWardenUpdateSpaceIterator) Close() error {
	it.sub.Unsubscribe()
	return nil
}

// IWardenUpdateSpace represents a UpdateSpace event raised by the IWarden contract.
type IWardenUpdateSpace struct {
	SpaceId                uint64
	ApproveAdminTemplateId uint64
	RejectAdminTemplateId  uint64
	ApproveSignTemplateId  uint64
	RejectSignTemplateId   uint64
	Raw                    types.Log // Blockchain specific contextual infos
}

// FilterUpdateSpace is a free log retrieval operation binding the contract event 0xacab71b9a81541b5ce6900189882a3a6ee548e353e6644143c3b919924c0ac69.
//
// Solidity: event UpdateSpace(uint64 indexed spaceId, uint64 approveAdminTemplateId, uint64 rejectAdminTemplateId, uint64 approveSignTemplateId, uint64 rejectSignTemplateId)
func (_IWarden *IWardenFilterer) FilterUpdateSpace(opts *bind.FilterOpts, spaceId []uint64) (*IWardenUpdateSpaceIterator, error) {

	var spaceIdRule []interface{}
	for _, spaceIdItem := range spaceId {
		spaceIdRule = append(spaceIdRule, spaceIdItem)
	}

	logs, sub, err := _IWarden.contract.FilterLogs(opts, "UpdateSpace", spaceIdRule)
	if err != nil {
		return nil, err
	}
	return &IWardenUpdateSpaceIterator{contract: _IWarden.contract, event: "UpdateSpace", logs: logs, sub: sub}, nil
}

// WatchUpdateSpace is a free log subscription operation binding the contract event 0xacab71b9a81541b5ce6900189882a3a6ee548e353e6644143c3b919924c0ac69.
//
// Solidity: event UpdateSpace(uint64 indexed spaceId, uint64 approveAdminTemplateId, uint64 rejectAdminTemplateId, uint64 approveSignTemplateId, uint64 rejectSignTemplateId)
func (_IWarden *IWardenFilterer) WatchUpdateSpace(opts *bind.WatchOpts, sink chan<- *IWardenUpdateSpace, spaceId []uint64) (event.Subscription, error) {

	var spaceIdRule []interface{}
	for _, spaceIdItem := range spaceId {
		spaceIdRule = append(spaceIdRule, spaceIdItem)
	}

	logs, sub, err := _IWarden.contract.WatchLogs(opts, "UpdateSpace", spaceIdRule)
	if err != nil {
		return nil, err
	}
	return event.NewSubscription(func(quit <-chan struct{}) error {
		defer sub.Unsubscribe()
		for {
			select {
			case log := <-logs:
				// New log arrived, parse the event and forward to the user
				event := new(IWardenUpdateSpace)
				if err := _IWarden.contract.UnpackLog(event, "UpdateSpace", log); err != nil {
					return err
				}
				event.Raw = log

				select {
				case sink <- event:
				case err := <-sub.Err():
					return err
				case <-quit:
					return nil
				}
			case err := <-sub.Err():
				return err
			case <-quit:
				return nil
			}
		}
	}), nil
}

// ParseUpdateSpace is a log parse operation binding the contract event 0xacab71b9a81541b5ce6900189882a3a6ee548e353e6644143c3b919924c0ac69.
//
// Solidity: event UpdateSpace(uint64 indexed spaceId, uint64 approveAdminTemplateId, uint64 rejectAdminTemplateId, uint64 approveSignTemplateId, uint64 rejectSignTemplateId)
func (_IWarden *IWardenFilterer) ParseUpdateSpace(log types.Log) (*IWardenUpdateSpace, error) {
	event := new(IWardenUpdateSpace)
	if err := _IWarden.contract.UnpackLog(event, "UpdateSpace", log); err != nil {
		return nil, err
	}
	event.Raw = log
	return event, nil
}
