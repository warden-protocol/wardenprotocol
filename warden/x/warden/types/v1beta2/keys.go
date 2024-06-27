package v1beta2

const (
	// ModuleName defines the module name
	ModuleName = "warden"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_warden"
)

var (
	ParamsKey = []byte("p_warden")
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
