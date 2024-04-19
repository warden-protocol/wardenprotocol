package types

// GmpMessage defines the GMP message that we encode in the
// IBC memo field and send to Axelar.
//
// Ref: https://github.com/axelarnetwork/evm-cosmos-gmp-sample
type GmpMessage struct {
	// DestinationChain is the destination chain of the message
	DestinationChain string `json:"destination_chain"`
	// DestinationAddress is the destination address of the message
	DestinationAddress string `json:"destination_address"`
	// Payload is the encoded payload of the message (exchange rates)
	Payload []byte `json:"payload"`
	// Type is an enum that specifies the type of message
	Type int64 `json:"type"`
	// Fee is the fee paid to a relayer on the Axelar network
	Fee *GmpFee `json:"fee"`
}

// GMPFee defines the fee field message inside of GMPMessage.
type GmpFee struct {
	// Fee amount
	Amount string `json:"amount"`
	// Recipient of fee; should be fee_recipient.
	Recipient string `json:"recipient"`
}
