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
package main

import (
	"crypto/ecdsa"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestInMemoryKeyDB(t *testing.T) {
	db := NewMemoryDB()

	// Set a couple keys
	err := db.Set(0, &ecdsa.PrivateKey{})
	require.NoError(t, err)

	err = db.Set(1, &ecdsa.PrivateKey{})
	require.NoError(t, err)

	// Get them
	key, err := db.Get(0)
	require.NoError(t, err)
	require.NotNil(t, key)

	key, err = db.Get(1)
	require.NoError(t, err)
	require.NotNil(t, key)

	key, err = db.Get(2)
	require.ErrorIs(t, err, ErrKeyNotFound)
	require.Nil(t, key)
}
