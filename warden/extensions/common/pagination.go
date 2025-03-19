package common

import (
	"bytes"

	"github.com/cosmos/cosmos-sdk/types/query"
)

func ClearPaginationKey(pagination *query.PageRequest) *query.PageRequest {
	if pagination == nil {
		return nil
	}

	if bytes.Equal(pagination.Key, []byte{0}) {
		pagination.Key = nil
	}

	return pagination
}
