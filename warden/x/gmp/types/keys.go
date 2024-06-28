package types

const (
	// ModuleName defines the module name
	ModuleName = "gmp"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey is the message route
	RouterKey = ModuleName

	// QuerierRoute is the query router key for the gmp module
	QuerierRoute = ModuleName
)

// KVStore key prefixes
var (
	ParamsKey = []byte("p_gmp")
)
