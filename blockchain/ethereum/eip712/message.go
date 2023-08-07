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
	"fmt"

	errorsmod "cosmossdk.io/errors"
	errortypes "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/tidwall/gjson"
	"github.com/tidwall/sjson"
)

type eip712MessagePayload struct {
	payload        gjson.Result
	numPayloadMsgs int
	message        map[string]interface{}
}

const (
	payloadMsgsField = "msgs"
)

// createEIP712MessagePayload generates the EIP-712 message payload
// corresponding to the input data.
func createEIP712MessagePayload(data []byte) (eip712MessagePayload, error) {
	basicPayload, err := unmarshalBytesToJSONObject(data)
	if err != nil {
		return eip712MessagePayload{}, err
	}

	payload, numPayloadMsgs, err := FlattenPayloadMessages(basicPayload)
	if err != nil {
		return eip712MessagePayload{}, errorsmod.Wrap(err, "failed to flatten payload JSON messages")
	}

	message, ok := payload.Value().(map[string]interface{})
	if !ok {
		return eip712MessagePayload{}, errorsmod.Wrap(errortypes.ErrInvalidType, "failed to parse JSON as map")
	}

	messagePayload := eip712MessagePayload{
		payload:        payload,
		numPayloadMsgs: numPayloadMsgs,
		message:        message,
	}

	return messagePayload, nil
}

// unmarshalBytesToJSONObject converts a bytestream into
// a JSON object, then makes sure the JSON is an object.
func unmarshalBytesToJSONObject(data []byte) (gjson.Result, error) {
	if !gjson.ValidBytes(data) {
		return gjson.Result{}, errorsmod.Wrap(errortypes.ErrJSONUnmarshal, "invalid JSON received")
	}

	payload := gjson.ParseBytes(data)

	if !payload.IsObject() {
		return gjson.Result{}, errorsmod.Wrap(errortypes.ErrJSONUnmarshal, "failed to JSON unmarshal data as object")
	}

	return payload, nil
}

// FlattenPayloadMessages flattens the input payload's messages, representing
// them as key-value pairs of "msg{i}": {Msg}, rather than as an array of Msgs.
// We do this to support messages with different schemas.
func FlattenPayloadMessages(payload gjson.Result) (gjson.Result, int, error) {
	flattened := payload
	var err error

	msgs, err := getPayloadMessages(payload)
	if err != nil {
		return gjson.Result{}, 0, err
	}

	for i, msg := range msgs {
		flattened, err = payloadWithNewMessage(flattened, msg, i)
		if err != nil {
			return gjson.Result{}, 0, err
		}
	}

	flattened, err = payloadWithoutMsgsField(flattened)
	if err != nil {
		return gjson.Result{}, 0, err
	}

	return flattened, len(msgs), nil
}

// getPayloadMessages processes and returns the payload messages as a JSON array.
func getPayloadMessages(payload gjson.Result) ([]gjson.Result, error) {
	rawMsgs := payload.Get(payloadMsgsField)

	if !rawMsgs.Exists() {
		return nil, errorsmod.Wrap(errortypes.ErrInvalidRequest, "no messages found in payload, unable to parse")
	}

	if !rawMsgs.IsArray() {
		return nil, errorsmod.Wrap(errortypes.ErrInvalidRequest, "expected type array of messages, cannot parse")
	}

	return rawMsgs.Array(), nil
}

// payloadWithNewMessage returns the updated payload object with the message
// set at the field corresponding to index.
func payloadWithNewMessage(payload gjson.Result, msg gjson.Result, index int) (gjson.Result, error) {
	field := msgFieldForIndex(index)

	if payload.Get(field).Exists() {
		return gjson.Result{}, errorsmod.Wrapf(
			errortypes.ErrInvalidRequest,
			"malformed payload received, did not expect to find key at field %v", field,
		)
	}

	if !msg.IsObject() {
		return gjson.Result{}, errorsmod.Wrapf(errortypes.ErrInvalidRequest, "msg at index %d is not valid JSON: %v", index, msg)
	}

	newRaw, err := sjson.SetRaw(payload.Raw, field, msg.Raw)
	if err != nil {
		return gjson.Result{}, err
	}

	return gjson.Parse(newRaw), nil
}

// msgFieldForIndex returns the payload field for a given message post-flattening.
// e.g. msgs[2] becomes 'msg2'
func msgFieldForIndex(i int) string {
	return fmt.Sprintf("msg%d", i)
}

// payloadWithoutMsgsField returns the updated payload without the "msgs" array
// field, which flattening makes obsolete.
func payloadWithoutMsgsField(payload gjson.Result) (gjson.Result, error) {
	newRaw, err := sjson.Delete(payload.Raw, payloadMsgsField)
	if err != nil {
		return gjson.Result{}, err
	}

	return gjson.Parse(newRaw), nil
}
