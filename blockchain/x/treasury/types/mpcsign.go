package types

func (sr *SignRequest) SetID(id uint64) { sr.Id = id }

func (str *SignTransactionRequest) SetID(id uint64) { str.Id = id }

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
