package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"reflect"
	"strings"
	"time"
)

func queryProxy(privKey string, dir string) (string, error) {
	proxyAddr := "qredo1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrqusw2lp"
	cmd := exec.Command("node", "--experimental-specifier-resolution=node", "--loader=ts-node/esm", "contracts.ts", "query_proxy", privKey, proxyAddr)
	cmd.Dir = dir
	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", fmt.Errorf(string(output))
	}
	return strings.Split(string(output), "'")[1], nil
}

type Watchlist struct {
	HashMap map[string]int `json:"watchlist"`
}

func main() {
	if len(os.Args) < 3 {
		panic("privkey file & contracts dir required in command-line arguments")
	}
	privKey := os.Args[1]
	dir := os.Args[2]
	var wl Watchlist
	prevBalances := make(map[string]string)
	for {
		watchlistAddr, err := queryProxy(privKey, dir)
		if err != nil {
			fmt.Println(err)
			return
		}
		cmd := exec.Command("node", "--experimental-specifier-resolution=node", "--loader=ts-node/esm", "contracts.ts", "query_watchlist", privKey, watchlistAddr)
		cmd.Dir = dir
		output, err := cmd.CombinedOutput()
		if err != nil {
			fmt.Println(err)
			return
		}
		parsed := strings.Replace("{'watchlist':"+strings.Split(strings.Split(string(output), "watchlist:")[1], "}")[0]+"}}", "'", "\"", -1)
		fmt.Println("Received watchlist from contract:", parsed)
		err = json.Unmarshal([]byte(parsed), &wl)
		if err != nil {
			fmt.Println(err)
			return
		}
		balances, err := getBalances(wl)
		if err != nil {
			fmt.Println(err)
			return
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
			if err = writeBalancesToContract(diff, privKey, dir); err != nil {
				fmt.Println(err)
			}
		}
		time.Sleep(10 * time.Second)
	}
}

func getBalances(wl Watchlist) (map[string]string, error) {
	var addresses string
	for addr := range wl.HashMap {
		if addresses != "" {
			addresses += ","
		}
		addresses += addr
	}
	apiKey := "BKVXZFMCHBIBVA52D4KWT18Q2PIKKXQXBZ"
	url := fmt.Sprintf("https://api-sepolia.etherscan.io/api?module=account&action=balancemulti&address=%s&tag=latest&apikey=%s", addresses, apiKey)
	outputMap := make(map[string]string)

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	var result map[string]any
	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, err
	}

	balanceMaps, ok := result["result"].([]any)
	if !ok {
		return nil, fmt.Errorf("couldn't parse API response")
	}
	for _, bMap := range balanceMaps {
		bMap := bMap.(map[string]any)
		account := bMap["account"].(string)
		balance := bMap["balance"].(string)
		outputMap[account] = balance
	}
	return outputMap, nil
}

func writeBalancesToContract(balances map[string]string, privKey string, dir string) error {
	watchlistAddr, err := queryProxy(privKey, dir)
	if err != nil {
		return err
	}
	encoded, err := json.Marshal(balances)
	if err != nil {
		return err
	}
	cmd := exec.Command("node", "--experimental-specifier-resolution=node", "--loader=ts-node/esm", "contracts.ts", "update_watchlist", privKey, watchlistAddr, string(encoded))
	cmd.Dir = dir
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf(string(output))
	}
	fmt.Println(cmd, string(output))
	return nil
}
