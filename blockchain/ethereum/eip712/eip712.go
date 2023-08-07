// Copyright 2023 Evmos Foundation
// This file is part of Evmos' Ethermint library.
//
// The Ethermint library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// The Ethermint library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Ethermint library. If not, see https://github.com/evmos/ethermint/blob/main/LICENSE
package eip712

import (
	"github.com/ethereum/go-ethereum/signer/core/apitypes"
)

// WrapTxToTypedData wraps an Amino-encoded Cosmos Tx JSON SignDoc
// bytestream into an EIP712-compatible TypedData request.
func WrapTxToTypedData(
	chainID uint64,
	data []byte,
) (apitypes.TypedData, error) {
	messagePayload, err := createEIP712MessagePayload(data)
	message := messagePayload.message
	if err != nil {
		return apitypes.TypedData{}, err
	}

	types, err := createEIP712Types(messagePayload)
	if err != nil {
		return apitypes.TypedData{}, err
	}

	domain := createEIP712Domain(chainID)

	typedData := apitypes.TypedData{
		Types:       types,
		PrimaryType: txField,
		Domain:      domain,
		Message:     message,
	}

	return typedData, nil
}
