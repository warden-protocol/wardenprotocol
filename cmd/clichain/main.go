package main

import (
	"encoding/base64"
	"encoding/hex"
	"fmt"
	"io"
	"log"
	"os"

	"github.com/ethereum/go-ethereum/crypto"
	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "clichain",
	Short: "clichain is a CLI tool for ECDSA secp256k1 key generation and signing",
}

var generateCmd = &cobra.Command{
	Use:   "generate",
	Short: "Generate a new private key",
	Long:  `Generates a new private key and saves it to a specified output file.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		output, err := cmd.Flags().GetString("output")
		if err != nil {
			return fmt.Errorf("reading output file: %w", err)
		}

		key, err := crypto.GenerateKey()
		if err != nil {
			return fmt.Errorf("generating key: %w", err)
		}

		keybin := crypto.FromECDSA(key)

		w := os.Stdout
		if output != "" {
			f, err := os.OpenFile(output, os.O_CREATE|os.O_WRONLY, 0o600)
			if err != nil {
				return fmt.Errorf("opening output file: %w", err)
			}
			defer f.Close()
			w = f
		}

		if _, err := w.WriteString(hex.EncodeToString(keybin)); err != nil {
			return fmt.Errorf("writing key to file: %w", err)
		}

		return nil
	},
}

var publicKeyCmd = &cobra.Command{
	Use:   "public-key",
	Short: "Derive the public key from a private key",
	RunE: func(cmd *cobra.Command, args []string) error {
		keyFile, err := cmd.Flags().GetString("key")
		if err != nil {
			return fmt.Errorf("reading flag: %w", err)
		}

		in := os.Stdin
		if keyFile != "" {
			f, err := os.Open(keyFile)
			if err != nil {
				return fmt.Errorf("opening key file: %w", err)
			}
			in = f
		}

		keyHex, err := io.ReadAll(in)
		if err != nil {
			return fmt.Errorf("reading key: %w", err)
		}

		key, err := crypto.HexToECDSA(string(keyHex))
		if err != nil {
			return fmt.Errorf("parsing key: %w", err)
		}

		pubKey := crypto.CompressPubkey(&key.PublicKey)

		output, err := cmd.Flags().GetString("output")
		if err != nil {
			return fmt.Errorf("reading output format: %w", err)
		}

		switch output {
		case "binary":
			os.Stdout.Write(pubKey)
		case "hex":
			os.Stdout.Write([]byte(hex.EncodeToString(pubKey)))
		case "base64":
			os.Stdout.Write([]byte(base64.StdEncoding.EncodeToString(pubKey)))
		default:
			return fmt.Errorf("unknown output format: %s", output)
		}

		return nil
	},
}

var signCmd = &cobra.Command{
	Use:   "sign",
	Short: "Sign a message using a private key",
	Long:  `Signs a message using the specified private key.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		keyFile, err := cmd.Flags().GetString("key")
		if err != nil {
			return fmt.Errorf("reading flag: %w", err)
		}

		messageFile, err := cmd.Flags().GetString("message")
		if err != nil {
			return fmt.Errorf("reading flag: %w", err)
		}

		f, err := os.Open(keyFile)
		if err != nil {
			return fmt.Errorf("opening key file: %w", err)
		}
		defer f.Close()

		keyHex, err := os.ReadFile(keyFile)
		if err != nil {
			return fmt.Errorf("reading key file: %w", err)
		}

		key, err := crypto.HexToECDSA(string(keyHex))
		if err != nil {
			return fmt.Errorf("parsing key: %w", err)
		}

		in := os.Stdin
		if messageFile != "" {
			f, err := os.Open(messageFile)
			if err != nil {
				return fmt.Errorf("opening message file: %w", err)
			}
			in = f
		}

		message, err := io.ReadAll(in)
		if err != nil {
			return fmt.Errorf("reading message: %w", err)
		}

		sig, err := crypto.Sign(message, key)
		if err != nil {
			return fmt.Errorf("signing message: %w", err)
		}

		output, err := cmd.Flags().GetString("output")
		if err != nil {
			return fmt.Errorf("reading output format: %w", err)
		}

		switch output {
		case "binary":
			os.Stdout.Write(sig)
		case "hex":
			os.Stdout.Write([]byte(hex.EncodeToString(sig)))
		case "base64":
			os.Stdout.Write([]byte(base64.StdEncoding.EncodeToString(sig)))
		default:
			return fmt.Errorf("unknown output format: %s", output)
		}

		return nil
	},
}

func init() {
	rootCmd.AddCommand(generateCmd)
	rootCmd.AddCommand(publicKeyCmd)
	rootCmd.AddCommand(signCmd)

	// Here we define the flags for the generate command
	generateCmd.Flags().StringP("output", "o", "", "Output file for the private key")

	// Here we define the flags for the publicKey command
	publicKeyCmd.Flags().StringP("key", "k", "private.key", "Private key file to use for signing")
	publicKeyCmd.Flags().StringP("output", "o", "binary", "Output format for the public key (binary | hex | base64)")

	// Here we define the flags for the sign command
	signCmd.Flags().StringP("key", "k", "private.key", "Private key file to use for signing")
	signCmd.Flags().StringP("message", "m", "", "Message file containing the digest to be signed")
	signCmd.Flags().StringP("output", "o", "binary", "Output format for the signature (binary | hex | base64)")
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		log.Fatal(err)
	}
}
