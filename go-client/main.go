package main

import (
	"fmt"

	"gitlab.qredo.com/qrdochain/fusionchain/client"
)

func main() {
	fmt.Println("Hello, World!")
	client.InitConfig(nil)
}
