package client

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

type KeyRequestFulfilment struct {
	RequestID uint64
	PublicKey []byte
}

func (r KeyRequestFulfilment) Msg(creator string) sdk.Msg {
	return &types.MsgFulfilKeyRequest{
		Creator:   creator,
		RequestId: r.RequestID,
		Status:    types.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED,
		Result:    types.NewMsgFulfilKeyRequestKey(r.PublicKey),
	}
}

type KeyRequestRejection struct {
	RequestID uint64
	Reason    string
}

func (r KeyRequestRejection) Msg(creator string) sdk.Msg {
	return &types.MsgFulfilKeyRequest{
		Creator:   creator,
		RequestId: r.RequestID,
		Status:    types.KeyRequestStatus_KEY_REQUEST_STATUS_REJECTED,
		Result:    types.NewMsgFulfilKeyRequestReject(r.Reason),
	}
}

type SignRequestFulfilment struct {
	RequestID uint64
	Signature []byte
}

func (r SignRequestFulfilment) Msg(creator string) sdk.Msg {
	return &types.MsgFulfilSignRequest{
		Creator:   creator,
		RequestId: r.RequestID,
		Status:    types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED,
		Result: &types.MsgFulfilSignRequest_Payload{
			Payload: &types.MsgSignedData{
				SignedData: r.Signature,
			},
		},
	}
}

type SignRequestRejection struct {
	RequestID uint64
	Reason    string
}

func (r SignRequestRejection) Msg(creator string) sdk.Msg {
	return &types.MsgFulfilSignRequest{
		Creator:   creator,
		RequestId: r.RequestID,
		Status:    types.SignRequestStatus_SIGN_REQUEST_STATUS_REJECTED,
		Result: &types.MsgFulfilSignRequest_RejectReason{
			RejectReason: r.Reason,
		},
	}
}
