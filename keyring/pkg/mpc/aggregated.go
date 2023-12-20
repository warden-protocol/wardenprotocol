// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
package mpc

type aggregatedClient struct {
	clients chan Client
}

func (a aggregatedClient) PublicKey(keyID []byte, keyType CryptoSystem) ([]byte, string, error) {
	client := <-a.clients
	defer func() {
		a.clients <- client
	}()
	return client.PublicKey(keyID, keyType)
}

func (a aggregatedClient) PubkeySignature(pubKey, keyID []byte, keyType CryptoSystem) ([]byte, string, error) {
	client := <-a.clients
	defer func() {
		a.clients <- client
	}()
	return client.PubkeySignature(pubKey, keyID, keyType)
}

func (a aggregatedClient) Signature(sigRequestData *SigRequestData, keyType CryptoSystem) (*SigResponse, string, error) {
	client := <-a.clients
	defer func() {
		a.clients <- client
	}()
	return client.Signature(sigRequestData, keyType)
}

func (a aggregatedClient) Ping() (string, error) {
	client := <-a.clients
	defer func() {
		a.clients <- client
	}()
	return client.Ping()
}
