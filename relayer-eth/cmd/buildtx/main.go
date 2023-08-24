// Command buildtx is a little tool for generating an unsigned Ethereum transaction.
// Run with -help to see available options.
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
