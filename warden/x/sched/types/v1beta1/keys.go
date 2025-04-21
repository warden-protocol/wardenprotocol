package v1beta1

const (
	// ModuleName defines the module name.
	ModuleName = "sched"

	// StoreKey defines the primary module store key.
	StoreKey = ModuleName

	// MemStoreKey defines the in-memory store key.
	MemStoreKey = "mem_sched"
)

var ParamsKey = []byte("p_sched")

func KeyPrefix(p string) []byte {
	return []byte(p)
}
