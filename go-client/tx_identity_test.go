package client

import (
	"encoding/base64"
	"fmt"
	"testing"
)

func TestNewIdentityFromSeed(t *testing.T) {
	seed := "exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge"

	id, err := NewIdentityFromSeed(seed)
	if err != nil {
		t.Fatal(err)
	}

	fmt.Printf("address: %s\n", id.Address.String())
	fmt.Printf("private key: %s\n", base64.StdEncoding.EncodeToString(id.PrivKey.Bytes()))

	if id.Address.String() != "warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5" {
		t.Fatalf("unexpected address: %s", id.Address.String())
	}
}
