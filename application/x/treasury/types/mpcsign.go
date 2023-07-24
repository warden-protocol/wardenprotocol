package types

func (sr *SignRequest) SetId(id uint64) { sr.Id = id }

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
