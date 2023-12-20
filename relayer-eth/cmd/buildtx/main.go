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
	"flag"
	"fmt"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
)

var (
	nonce    = flag.Uint64("nonce", 0, "nonce")
	to       = flag.String("to", "", "to")
	amount   = flag.Int64("amount", 0, "amount")
	gasLimit = flag.Uint64("gasLimit", 21000, "gasLimit")
	gasPrice = flag.Int64("gasPrice", 20000000000, "gasPrice")
	data     = flag.String("data", "", "data")
	yes      = flag.Bool("yes", false, "yes")
)

func init() {
	flag.Parse()
}

// Command buildtx is a little tool for generating an unsigned Ethereum transaction.
// Run with -help to see available options.
func main() {
	if len(*to) != 42 {
		panic("invalid 'to' address")
	}
	toAddr := common.HexToAddress(*to)

	var dataBz []byte
	if len(*data) > 0 {
		dataBz = common.FromHex(*data)
	}

	if !*yes {
		fmt.Println("nonce:", *nonce)
		fmt.Println("to:", *to)
		fmt.Printf("amount: %d WEI\n", *amount)
		fmt.Println("gasLimit:", *gasLimit)
		fmt.Println("gasPrice:", *gasPrice)
		fmt.Println("data:", *data)
		fmt.Println("Are you sure to build this transaction? (y/n)")

		var yes string
		if _, err := fmt.Scanln(&yes); err != nil {
			panic(err)
		}
		if yes != "y" {
			return
		}
	}

	tx := types.NewTransaction(*nonce, toAddr, big.NewInt(*amount), *gasLimit, big.NewInt(*gasPrice), dataBz)

	txBz, err := tx.MarshalBinary()
	if err != nil {
		panic(err)
	}

	fmt.Printf("unsigned tx: %x\n", txBz)
}
