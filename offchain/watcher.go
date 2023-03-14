package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os/exec"
	"reflect"
	"strconv"
	"time"
)

func main() {
	prevBalances := make(map[string]int64)
	inputMap := map[string]int{
		"0x8b21f921D19a23594ab8554dC711F420E32bE237": 2,
		"0x6Ea8aC1673402989e7B653aE4e83b54173719C30": 2,
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
			diff := make(map[string]int64)
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

		// fmt.Println(balances)
		time.Sleep(10 * time.Second)
	}
}

func getBalances(inputMap map[string]int) (map[string]int64, error) {
	var addresses string

	for address := range inputMap {
		if addresses != "" {
			addresses += ","
		}
		addresses += address
	}

	apiKey := "BKVXZFMCHBIBVA52D4KWT18Q2PIKKXQXBZ"
	url := fmt.Sprintf("https://api-sepolia.etherscan.io/api?module=account&action=balancemulti&address=%s&tag=latest&apikey=%s", addresses, apiKey)
	outputMap := make(map[string]int64)

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	// fmt.Println(string(body))

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
		balance, err := strconv.ParseInt(bMap["balance"].(string), 10, 64)
		if err != nil {
			return nil, fmt.Errorf("Couldn't parse balance map")
		}
		outputMap[account] = balance
	}

	return outputMap, nil
}

func writeBalancesToContract(balances map[string]int64) error {
	encoded, err := json.Marshal(balances)
	if err != nil {
		return err
	}
	contractAddr := "qredo14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9ss9tga8"
	cmd := exec.Command("node", "--experimental-specifier-resolution=node", "--loader=ts-node/esm", "updateWatchlist.ts", contractAddr, string(encoded))
	cmd.Dir = "/Users/sashaduke/fusionchain/contracts"
	output, err := cmd.CombinedOutput()
	// if err != nil {
	// 	return err
	// }
	fmt.Println(cmd, string(output), err)
	return nil
}