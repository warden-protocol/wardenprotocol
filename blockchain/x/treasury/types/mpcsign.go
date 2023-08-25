package types

// revive:disable-next-line var-naming // nolint:stylecheck,ST1003
func (sr *SignRequest) SetId(id uint64) { sr.Id = id }

// revive:disable-next-line var-naming // nolint:stylecheck,ST1003
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
