package types

func NewMsgUpdateWalletRequestWallet(publicKey []byte) isMsgUpdateWalletRequest_Result {
	return &MsgUpdateWalletRequest_Wallet{
		Wallet: &MsgNewWallet{
			PublicKey: publicKey,
		},
	}
}

func NewMsgUpdateWalletRequestReject(reason string) isMsgUpdateWalletRequest_Result {
	return &MsgUpdateWalletRequest_RejectReason{
		RejectReason: reason,
	}
}
