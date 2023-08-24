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
