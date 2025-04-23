package sched

import (
	"errors"
	"fmt"

	"github.com/cosmos/cosmos-sdk/types/query"

	precommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
	types "github.com/warden-protocol/wardenprotocol/warden/x/sched/types/v1beta1"
)

// FromResponse needed to map QueryCallbackByIdResponse to CallbackByIdResponse.
func (r *CallbackByIdResponse) FromResponse(res *types.QueryCallbackByIdResponse) (CallbackByIdResponse, error) {
	if res != nil {
		mappedCallbackResponse, err := mapCallbackResponse(res.CallbackResponse)
		if err != nil {
			return CallbackByIdResponse{}, err
		}

		r.CallbackResponse = mappedCallbackResponse
	}

	return *r, nil
}

func (r *CallbacksResponse) FromResponse(res *types.QueryCallbacksResponse) (CallbacksResponse, error) {
	if res != nil {
		callbacks := make([]CallbackResponse, 0, len(res.Callbacks))

		for _, c := range res.Callbacks {
			mappedCallback, err := mapCallbackResponse(c)
			if err != nil {
				return CallbacksResponse{}, err
			}

			callbacks = append(callbacks, mappedCallback)
		}

		r.Callbacks = callbacks
		r.Pagination = mapPageResponse(res.Pagination)
	}

	return *r, nil
}

func mapCallbackResponse(callbackResponse types.CallbackResponse) (CallbackResponse, error) {
	callback, err := mapCallback(callbackResponse.Callback)
	if err != nil {
		return CallbackResponse{}, err
	}

	result, err := mapCallbackResult(callbackResponse.Result)
	if err != nil {
		return CallbackResponse{}, err
	}

	return CallbackResponse{
		Callback: callback,
		Result:   *result,
	}, nil
}

func mapCallback(callback types.Callback) (Callback, error) {
	address, err := precommon.AddressFromBech32Str(callback.Address)
	if err != nil {
		return Callback{}, fmt.Errorf("invalid callback address: %w", err)
	}

	return Callback{
		Id:           callback.Id,
		AddressValue: address,
		GasLimit:     callback.GasLimit,
	}, nil
}

func mapCallbackResult(result *types.CallbackResult) (*CallbackResult, error) {
	if result == nil || result.Status == types.CallbackStatus_CALLBACK_RESULT_UNSPECIFIED {
		return &CallbackResult{
			Status: uint8(types.CallbackStatus_CALLBACK_RESULT_UNSPECIFIED),
		}, nil
	}

	cbR := CallbackResult{
		Status: uint8(result.Status),
	}

	r := result.Result
	switch result.Status {
	case types.CallbackStatus_CALLBACK_RESULT_SUCCEED:
		if c, ok := r.(*types.CallbackResult_Output); ok {
			cbR.Result = c.Output
		} else {
			return nil, errors.New("unexpected result type for succeeded callback")
		}
	case types.CallbackStatus_CALLBACK_RESULT_FAILED:
		if c, ok := r.(*types.CallbackResult_FailReason); ok {
			cbR.Result = []byte(c.FailReason)
		} else {
			return nil, errors.New("unexpected result type for failed callback")
		}
	}

	return &cbR, nil
}

func mapPageResponse(value *query.PageResponse) TypesPageResponse {
	if value == nil {
		return TypesPageResponse{}
	}

	return TypesPageResponse{
		NextKey: value.NextKey,
		Total:   value.Total,
	}
}
