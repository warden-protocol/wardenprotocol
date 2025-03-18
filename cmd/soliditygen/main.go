package main

import (
	"flag"
	"fmt"
	"io"
	"log"
	"os"
)

func main() {
	var (
		// Input is optional
		inputFile = flag.String("inputFile", "", "Optional JSON file for input struct (or '-' for stdin)")
		inputName = flag.String("inputName", "", "Optional Solidity struct name for input data")

		// Output is required
		outputFile = flag.String("outputFile", "", "REQUIRED: JSON file for output struct (or '-' for stdin)")
		outputName = flag.String("outputName", "", "REQUIRED: Solidity struct name for output data")

		// Overall contract name & output path
		contractName  = flag.String("contractName", "", "REQUIRED: Solidity contract name")
		solOutputPath = flag.String("output", "", "REQUIRED: Full path of the Solidity file to write")
	)

	flag.Parse()

	// Required checks
	if *contractName == "" || *solOutputPath == "" {
		usageAndExit("You must provide --contractName and --output")
	}
	if *outputFile == "" || *outputName == "" {
		usageAndExit("You must provide --outputFile and --outputName (output is required)")
	}

	// If inputFile is provided, ensure inputName is also provided (and vice versa)
	if *inputFile != "" && *inputName == "" {
		usageAndExit("If you pass --inputFile, you must pass --inputName")
	}
	if *inputName != "" && *inputFile == "" {
		usageAndExit("If you pass --inputName, you must pass --inputFile")
	}

	// 1) Read optional input JSON (if provided)
	var inJSON []byte
	var err error
	if *inputFile != "" {
		inJSON, err = readAllOrStdin(*inputFile)
		if err != nil {
			log.Fatalf("Failed reading input JSON: %v", err)
		}
	}

	// 2) Read required output JSON
	outJSON, err := readAllOrStdin(*outputFile)
	if err != nil {
		log.Fatalf("Failed reading output JSON: %v", err)
	}

	// 3) Generate contract
	contract, err := GenerateContract(
		*contractName,
		*inputName, inJSON,
		*outputName, outJSON,
	)
	if err != nil {
		log.Fatalf("Failed to generate Solidity contract: %v", err)
	}

	// 4) Write the contract to the user-specified path
	if err := os.WriteFile(*solOutputPath, []byte(contract), 0o644); err != nil {
		if os.IsPermission(err) {
			log.Fatalf("Permission denied: Cannot write to %s", *solOutputPath)
		}
		log.Fatalf("Failed writing Solidity file: %v", err)
	}

	fmt.Printf("Solidity contract generated at: %s\n", *solOutputPath)
}

func usageAndExit(msg string) {
	fmt.Fprintf(os.Stderr, "%s\n\nUsage examples:\n", msg)

	fmt.Fprintf(os.Stderr, `  # Only generate an "Output" struct (GET request scenario):
  curl "https://example.com/api" | \
    go run ./cmd/cmd.go \
      --contractName="MyContract" \
      --outputFile="-" \
      --outputName="MyResponse" \
      --output="MyContract.sol"

  # Generate both "Input" + "Output" structs (request + response):
  cat input.json | \
    go run ./cmd/cmd.go \
      --contractName="MyContract" \
      --inputFile="-" \
      --inputName="MyRequest" \
      --outputFile="response.json" \
      --outputName="MyResponse" \
      --output="MyContract.sol"
`)
	os.Exit(1)
}

func readAllOrStdin(filePath string) ([]byte, error) {
	if filePath == "-" {
		return io.ReadAll(os.Stdin)
	}
	return os.ReadFile(filePath)
}
