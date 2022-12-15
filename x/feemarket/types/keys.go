package types

const (
	// ModuleName string name of module
	ModuleName = "feemarket"

	// StoreKey key for base fee and block gas used.
	// The Fee Market module should use a prefix store.
	StoreKey = ModuleName

	// RouterKey uses module name for routing
	RouterKey = ModuleName

	// TransientKey is the key to access the FeeMarket transient store, that is reset
	// during the Commit phase.
	TransientKey = "transient_" + ModuleName
)

// prefix bytes for the feemarket persistent store
const (
	prefixBlockGasWanted    = iota + 1
	deprecatedPrefixBaseFee //nolint
)

const (
	prefixTransientBlockGasUsed = iota + 1
)

// KVStore key prefixes
var (
	KeyPrefixBlockGasWanted = []byte{prefixBlockGasWanted}
)

// Transient Store key prefixes
var (
	KeyPrefixTransientBlockGasWanted = []byte{prefixTransientBlockGasUsed}
)
