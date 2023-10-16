package common

import "crypto/rand"

// RandomBytes - generate random bytes of length n
// This is used instead of Crypto RandomBytes to generate a known deterministic set of random numbers which can be seeded with a known value and used to perform tests.
// It should not be used for any production randomness.
func RandomBytes(n int) ([]byte, error) {
	bytes := make([]byte, n)
	if _, err := rand.Read(bytes); err != nil {
		return nil, err
	}
	return bytes, nil
}
