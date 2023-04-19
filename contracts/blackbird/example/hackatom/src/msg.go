package src

type InitMsg struct {
	Verifier    string `json:"verifier"`
	Beneficiary string `json:"beneficiary"`
}

type MigrateMsg struct {
	Verifier string `json:"verifier"`
}

type HandleMsg struct {
	Release              *struct{} `json:"release,omitempty"`
	CpuLoop              *struct{} `json:"cpu_loop,omitempty"`
	StorageLoop          *struct{} `json:"storage_loop,omitempty"`
	MemoryLoop           *struct{} `json:"memory_loop,omitempty"`
	AllocateLargeMemory  *struct{} `json:"allocate_large_memory,omitempty"`
	Panic                *struct{} `json:"panic,omitempty"`
	UserErrorsInApiCalls *struct{} `json:"user_errors_in_api_calls,omitempty"`
}

type QueryMsg struct {
	Verifier     *struct{}     `json:"verifier,omitempty"`
	OtherBalance *OtherBalance `json:"other_balance,omitempty"`
	Recurse      *Recurse      `json:"recurse,omitempty"`
	// TODO: remove this when we have queue... this was for a quick and dirty test
	TestRange *struct{} `json:"test_range,omitempty"`
}

type OtherBalance struct {
	Address string `json:"address,omitempty"`
}

type Recurse struct {
	Depth uint32 `json:"depth,omitempty"`
	Work  uint32 `json:"work,omitempty"`
}

type VerifierResponse struct {
	Verifier string `json:"verifier"`
}

type RecurseResponse struct {
	// this should be base64 binary - we just encode it manually outside of ezjson
	Hashed string `json:"hashed"`
}
