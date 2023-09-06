package types

const (
	// ModuleName defines the module name
	ModuleName = "blackbird"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey defines the module's message routing key
	RouterKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_blackbird"

	ActionCountKey = "action/count"
	ActionKey      = "action/value/"

	PolicyCountKey = "policy/count"
	PolicyKey      = "policy/value/"
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
