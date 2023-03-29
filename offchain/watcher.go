package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"os/exec"
	"reflect"
	"time"
)

func main() {
	prevBalances := make(map[string]string)
	inputMap := map[string]int{
		"0x8b21f921D19a23594ab8554dC711F420E32bE237": 1,
		"0x6Ea8aC1673402989e7B653aE4e83b54173719C30": 1,
	}
	for {
		balances, err := getBalances(inputMap)
		if err != nil {
			fmt.Println(err)
		}
		if prevBalances == nil {
			prevBalances = balances
			time.Sleep(10 * time.Second)
			continue
		}
		if !reflect.DeepEqual(balances, prevBalances) {
			diff := make(map[string]string)
			for key, value := range balances {
				if prevBalances[key] != value {
					diff[key] = value
				}
			}
			prevBalances = balances
			if err = writeBalancesToContract(diff); err != nil {
				fmt.Println(err)
			}
		}
		time.Sleep(10 * time.Second)
	}
}

func getBalances(inputMap map[string]int) (map[string]string, error) {
	var addresses string

	for address := range inputMap {
		if addresses != "" {
			addresses += ","
		}
		addresses += address
	}

	apiKey := "BKVXZFMCHBIBVA52D4KWT18Q2PIKKXQXBZ"
	url := fmt.Sprintf("https://api-sepolia.etherscan.io/api?module=account&action=balancemulti&address=%s&tag=latest&apikey=%s", addresses, apiKey)
	outputMap := make(map[string]string)

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var result map[string]interface{}
	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, err
	}

	balanceMaps, ok := result["result"].([]interface{})
	if !ok {
		return nil, fmt.Errorf("Couldn't parse API response")
	}

	for _, bMap := range balanceMaps {
		bMap := bMap.(map[string]interface{})
		account := bMap["account"].(string)
		balance := bMap["balance"].(string)
		outputMap[account] = balance
	}
	return outputMap, nil
}

func writeBalancesToContract(balances map[string]string) error {
	if len(os.Args) < 2 {
		return fmt.Errorf("Keyfile required in command-line argument")
	}
	encoded, err := json.Marshal(balances)
	if err != nil {
		return err
	}
	contractAddr := "qredo14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9ss9tga8"
	// contractAddr := "qredo1wug8sewp6cedgkmrmvhl3lf3tulagm9hnvy8p0rppz9yjw0g4wtqg5ehtd"
	cmd := exec.Command("node", "--experimental-specifier-resolution=node", "--loader=ts-node/esm", "contracts.ts", "update_watchlist", os.Args[1], contractAddr, string(encoded))
	cmd.Dir = "/Users/sashaduke/fusionchain/contracts"

	output, err := cmd.CombinedOutput()
	fmt.Println(cmd, string(output), err)
	if err != nil {
		return err
	}
	return nil
}