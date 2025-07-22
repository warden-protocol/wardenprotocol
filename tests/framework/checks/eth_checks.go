package checks

import (
	"errors"

	"github.com/ethereum/go-ethereum/core/types"
)

func GetParsedEventsOnly[T any](txReceipt *types.Receipt, eventParser func(types.Log) (T, error)) ([]T, error) {
	if txReceipt == nil {
		return nil, errors.New("no transaction receipt")
	}

	result := make([]T, 0)

	for _, log := range txReceipt.Logs {
		if log == nil {
			continue
		}

		event, err := eventParser(*log)
		if err != nil {
			continue
		}

		result = append(result, event)
	}

	if len(result) == 0 {
		return nil, errors.New("no parsed events")
	}

	return result, nil
}
