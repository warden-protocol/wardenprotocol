package types

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
