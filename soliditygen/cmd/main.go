package main

import (
	"flag"
	"fmt"
	"log"
	"os"

	"github.com/warden-protocol/wardenprotocol/soliditygen"
)

// go run soliditygen/cmd.go --url=<JSON URL> --contractName=<Name>
func main() {
	urlFlag := flag.String("url", "", "URL to fetch JSON from")
	contractFlag := flag.String("contractName", "", "Base contract name")

	flag.Parse()

	if *urlFlag == "" || *contractFlag == "" {
		fmt.Fprintln(os.Stderr, "Usage: go run cmd.go --url=<JSON_URL> --contractName=<ContractName>")
		os.Exit(1)
	}

	solFile, err := soliditygen.WriteSolidityFromURL(*urlFlag, *contractFlag)
	if err != nil {
		log.Fatalf("Failed to generate Solidity file: %v", err)
	}

	log.Printf("Successfully generated: %s\n", solFile)
}
