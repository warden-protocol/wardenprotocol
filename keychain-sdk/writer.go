package keychain

import "context"

// Writer is the interface for writing responses to key or signature requests.
type Writer interface {
	// Fulfil writes the response data (a public key, or a signature) for a
	// request.
	Fulfil(ctx context.Context, data []byte) error

	// Reject writes a rejection reason to a request.
	Reject(ctx context.Context, reason string) error
}
