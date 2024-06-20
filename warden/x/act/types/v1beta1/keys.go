package v1beta1

const (
	// ModuleName defines the module name
	ModuleName = "act"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_act"

	ActionCountKey = "action/count"
	ActionKey      = "action/value/"

	RuleCountKey = "rule/count"
	RuleKey      = "rule/value/"
)

var (
	ParamsKey = []byte("p_act")
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
