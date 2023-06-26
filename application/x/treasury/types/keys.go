package types

const (
	// ModuleName defines the module name
	ModuleName = "treasury"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey defines the module's message routing key
	RouterKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_treasury"

	WalletRequestKey = "wallet_request/value/"

	WalletRequestCountKey = "wallet_request/count"

	WalletKey = "wallet/value/"

	WalletCountKey = "wallet/count"

	SignRequestKey = "sign_request/value/"

	SignRequestCountKey = "sign_request/count"
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
