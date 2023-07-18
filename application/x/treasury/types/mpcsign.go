package types

func (sr *SignRequest) SetId(id uint64) { sr.Id = id }

func NewMsgFulfillSignatureRequestPayload(signedData []byte) isMsgFulfillSignatureRequest_Result {
	return &MsgFulfillSignatureRequest_Payload{
		Payload: &MsgSignedData{
			SignedData: signedData,
		},
	}
}

func NewMsgFulfillSignatureRequestReject(msg string) isMsgFulfillSignatureRequest_Result {
	return &MsgFulfillSignatureRequest_RejectReason{
		RejectReason: msg,
	}
}
