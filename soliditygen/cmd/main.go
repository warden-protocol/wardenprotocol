package main

import (
	"flag"
	"fmt"
	"log"
	"os"

	"github.com/warden-protocol/wardenprotocol/soliditygen"
)

// Usage Example:
//
//	go run cmd.go --url=<JSON URL> --contractName=<Name> --contractDir=<OutputDirectory>
func main() {
	urlFlag := flag.String("url", "", "URL to fetch JSON from")
	contractFlag := flag.String("contractName", "", "Base contract name")
	contractDirFlag := flag.String("contractDir", ".", "Directory where the .sol file will be written")

	flag.Parse()

	if *urlFlag == "" || *contractFlag == "" {
		fmt.Fprintln(os.Stderr, "Usage: go run cmd.go --url=<JSON_URL> --contractName=<ContractName> [--contractDir=<OutputDirectory>]")
		os.Exit(1)
	}

	solFile, err := soliditygen.WriteSolidityFromURL(*urlFlag, *contractFlag, *contractDirFlag)
	if err != nil {
		log.Fatalf("Failed to generate Solidity file: %v", err)
	}

	log.Printf("Successfully generated: %s\n", solFile)
}
