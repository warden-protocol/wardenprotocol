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

	WalletRequestCountKey = "wallet_request/count"

	WalletRequestKey = "wallet_request/value/"

	WalletCountKey = "wallet/count"

	WalletKey = "wallet/value/"
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
