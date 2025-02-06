package main

import (
	"encoding/base64"
	"fmt"
	"log"

	// Import your stoicquote package with the generated bindings
	"github.com/warden-protocol/wardenprotocol/prophet/handlers/stoicquote"
)

func main() {
	// 1) Grab the ABI for the contract
	abi, err := stoicquote.StoicQuoteTypesMetaData.GetAbi()
	if err != nil {
		log.Fatalf("GetAbi error: %v", err)
	}

	// 2) Get the "useAllTypes" method
	method, ok := abi.Methods["useAllTypes"]
	if !ok {
		log.Fatalf("Method useAllTypes not found in ABI")
	}

	// 3) Create a sample struct in Go
	example := stoicquote.StoicQuoteTypesStoicQuote{
		Data: stoicquote.StoicQuoteTypesData{
			Author: "someauthor",
			Quote:  "somequote",
		},
	}

	// 4) Pack this struct into ABI-encoded bytes
	packed, err := method.Inputs.Pack(example)
	if err != nil {
		log.Fatalf("Pack error: %v", err)
	}

	// 5) Convert those bytes to base64
	b64 := base64.StdEncoding.EncodeToString(packed)
	fmt.Println("Base64-encoded input:", b64)
}
