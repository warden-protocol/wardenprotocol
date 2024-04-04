package v1beta1

const (
	// ModuleName defines the module name
	ModuleName = "feeds"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_feeds"
)

var (
	ParamsKey = []byte("p_feeds")
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}
