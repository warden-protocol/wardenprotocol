package v1beta0

const (
	// ModuleName defines the module name
	ModuleName = "intent"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_intent"

	ActionCountKey = "action/count"
	ActionKey      = "action/value/"

	IntentCountKey = "intent/count"
	IntentKey      = "intent/value/"
)

var (
	ParamsKey = []byte("p_intent")
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
