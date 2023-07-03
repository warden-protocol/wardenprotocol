package types

func NewMsgUpdateKeyRequestKey(publicKey []byte) isMsgUpdateKeyRequest_Result {
	return &MsgUpdateKeyRequest_Key{
		Key: &MsgNewKey{
			PublicKey: publicKey,
		},
	}
}

func NewMsgUpdateKeyRequestReject(reason string) isMsgUpdateKeyRequest_Result {
	return &MsgUpdateKeyRequest_RejectReason{
		RejectReason: reason,
	}
}
