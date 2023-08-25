package types

// nolint:stylecheck,ST1003
// revive:disable-next-line var-naming
func (sr *SignRequest) SetId(id uint64) { sr.Id = id }

// nolint:stylecheck,ST1003
// revive:disable-next-line var-naming
func (str *SignTransactionRequest) SetId(id uint64) { str.Id = id }

func NewMsgFulfilSignatureRequestPayload(signedData []byte) isMsgFulfilSignatureRequest_Result {
	return &MsgFulfilSignatureRequest_Payload{
		Payload: &MsgSignedData{
			SignedData: signedData,
		},
	}
}

func NewMsgFulfilSignatureRequestReject(msg string) isMsgFulfilSignatureRequest_Result {
	return &MsgFulfilSignatureRequest_RejectReason{
		RejectReason: msg,
	}
}
