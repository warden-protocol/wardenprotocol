package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"os"
	"os/signal"
	"strings"

	"sync"
	"syscall"
	"time"

	"math/big"

	"github.com/ethereum/go-ethereum"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/warden-protocol/wardenprotocol/cmd/paymaster/abigen"
)

func main() {
	configPath := flag.String("config", "config.json", "path to configuration file")
	flag.Parse()

	// Load configuration
	config, err := loadConfig(*configPath)
	if err != nil {
		log.Fatalf("failed to load config: %v", err)
	}

	// Create context that will be canceled on SIGINT/SIGTERM
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Handle graceful shutdown
	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)
	go func() {
		<-sigCh
		log.Println("received shutdown signal")
		cancel()
	}()

	// Create channel for parsed events
	eventsCh := make(chan *abigen.MessageDispatcherMessageDispatched, 100)

	// Create error channel to receive errors from listeners and sender
	errCh := make(chan error, len(config.SourceChains)+1)

	var wg sync.WaitGroup
	// Start event processor
	go func() {
		defer wg.Done()
		wg.Add(1)
		if err := processMessagesDispatched(ctx, eventsCh, config); err != nil {
			errCh <- fmt.Errorf("chain %s: %w", config.WardenChain.Name, err)
		}
	}()

	// Start event listeners for each source chain
	for _, chain := range config.SourceChains {
		wg.Add(1)
		go func(chain SourceChainConfig) {
			defer wg.Done()
			if err := listenToEvents(ctx, chain, config, eventsCh); err != nil {
				fmt.Println("listenToEvents cancel")
				errCh <- fmt.Errorf("chain %s: %w", chain.Name, err)
			}
		}(chain)
	}

	// Create a channel to signal when all listeners are done
	doneCh := make(chan struct{})
	go func() {
		wg.Wait()
		close(doneCh)
	}()

	// Wait for either an error, context cancellation, or all listeners done
	select {
	case err := <-errCh:
		cancel() // Cancel context to stop other listeners / processor first
		// Wait for all listeners to finish before exiting
		<-doneCh
		log.Fatalf("event listener or processor failed: %v", err)
	case <-ctx.Done():
		// Wait for all listeners to finish before exiting
		<-doneCh
		log.Println("shutting down...")
	}
}

func listenToEvents(ctx context.Context, chain SourceChainConfig, config *Config, eventsCh chan *abigen.MessageDispatcherMessageDispatched) error {
	var client *ethclient.Client
	var err error
	retryCount := 0

	for {
		select {
		case <-ctx.Done():
			return nil
		default:
			if client == nil {
				client, err = ethclient.Dial(chain.RPCURL)
				if err != nil {
					log.Printf("failed to connect to chain %s: %v", chain.Name, err)
					retryCount++
					if retryCount >= config.MaxRetries {
						return fmt.Errorf("max retries exceeded for chain %s", chain.Name)
					}
					time.Sleep(config.ReconnectInterval)
					continue
				}
				retryCount = 0
			}

			if err := subscribeAndListen(ctx, client, chain, config.EventSignature, eventsCh); err != nil {
				log.Printf("error in subscription for chain %s: %v", chain.Name, err)
				client.Close()
				client = nil
				retryCount++
				if retryCount >= config.MaxRetries {
					return fmt.Errorf("max retries exceeded for chain %s", chain.Name)
				}
				time.Sleep(config.ReconnectInterval)
				continue
			}
		}
	}
}

func subscribeAndListen(ctx context.Context, client *ethclient.Client, chain SourceChainConfig, eventSignature string, eventsCh chan *abigen.MessageDispatcherMessageDispatched) error {
	contractAddress := common.HexToAddress(chain.ContractAddress)
	eventHash := crypto.Keccak256Hash([]byte(eventSignature))

	query := ethereum.FilterQuery{
		// todo: index fromBlock batched by 100 blocks
		FromBlock: big.NewInt(int64(chain.FromBlock)),
		Addresses: []common.Address{contractAddress},
		Topics:    [][]common.Hash{{eventHash}},
	}

	logs := make(chan types.Log)
	sub, err := client.SubscribeFilterLogs(ctx, query, logs)
	if err != nil {
		return fmt.Errorf("failed to subscribe to logs: %w", err)
	}
	defer sub.Unsubscribe()

	dispatcherClient, err := abigen.NewMessageDispatcher(contractAddress, client)
	if err != nil {
		return fmt.Errorf("failed to create dispatcher client: %w", err)
	}

	log.Printf("started listening to events on chain %s", chain.Name)

	for {
		select {
		case err := <-sub.Err():
			return fmt.Errorf("subscription error: %w", err)
		case vLog := <-logs:
			parsedMsgDispatched, err := dispatcherClient.ParseMessageDispatched(vLog)
			if err != nil {
				return fmt.Errorf("failed to parse event: %v: %w", vLog, err)
			}

			// check that value corresponds to transfered? - should be on contract side
			log.Printf("received event on chain %s: %+v", chain.Name, vLog)
			eventsCh <- parsedMsgDispatched
		case <-ctx.Done():
			return nil
		}
	}
}

func processMessagesDispatched(ctx context.Context, eventsCh <-chan *abigen.MessageDispatcherMessageDispatched, config *Config) error {
	client, err := ethclient.Dial(config.WardenChain.RPCURL)
	if err != nil {
		return fmt.Errorf("failed to connect to Warden chain: %w", err)

	}
	defer client.Close()

	privateKey, err := crypto.HexToECDSA(config.WardenChain.PrivateKey)
	if err != nil {
		return fmt.Errorf("failed to parse private key: %w", err)

	}
	chainId, err := client.ChainID(ctx)
	if err != nil {
		return fmt.Errorf("failed to get chain id: %w", err)
	}
	txOps, err := bind.NewKeyedTransactorWithChainID(privateKey, chainId)
	if err != nil {
		return fmt.Errorf("failed to create signer: %w", err)
	}

	executorTransactor, err := abigen.NewMessageExecutorTransactor(common.HexToAddress(config.WardenChain.IsmAddress), client)
	if err != nil {
		return fmt.Errorf("error creating ism client: %w", err)

	}

	parsedABI, err := abi.JSON(strings.NewReader(abigen.AbstractMessageIdAuthorizedIsmMetaData.ABI))
	if err != nil {
		return fmt.Errorf("error parsing ABI: %w", err)

	}

	for {
		select {
		case event := <-eventsCh:
			if err := processMessageDispatched(ctx, client, executorTransactor, parsedABI, event, txOps); err != nil {
				log.Printf("error processing event: %v", err)
				return fmt.Errorf("failed to process event: %w", err)

			}
		case <-ctx.Done():
			return nil
		}
	}
}

func processMessageDispatched(ctx context.Context, client *ethclient.Client, messageExecutorTransactor *abigen.MessageExecutorTransactor, parsedIsmABI abi.ABI, parsedMsgDispatched *abigen.MessageDispatcherMessageDispatched, txOps *bind.TransactOpts) error {
	// methodID := parsedMsgDispatched.Data[:4]
	args := parsedMsgDispatched.Data[4:]
	functionName := "preVerifyMessage" // we check that payload was encoded as ism call accorging to hyperlance ERC5164 implementation

	unpackedArgs, err := UnpackMethodInputIntoInterface(parsedIsmABI, functionName, args)
	if err != nil {
		return fmt.Errorf("error unpacking arguments: %w", err)
	}
	fmt.Println("\nunpackedArgs", unpackedArgs)
	msgId := unpackedArgs[0].([32]byte)
	msgValue := unpackedArgs[1].(*big.Int)
	fmt.Printf("msgId:    %x\n", msgId)
	fmt.Printf("msgValue: %v\n", msgValue)

	txOps.Value = msgValue
	tx, err := messageExecutorTransactor.Execute(txOps, msgId, msgValue)

	if err != nil {
		fmt.Println(err)
		return fmt.Errorf("failed to send tx: %w", err)
	}

	receipt, err := bind.WaitMined(ctx, client, tx)
	if err != nil {
		return fmt.Errorf("error waiting tx mining: %w", err)
	}

	log.Printf("tx.hash: %x", receipt.TxHash)

	if receipt.Status != 1 {
		return fmt.Errorf("tx failed: %+v", receipt)
	}

	return nil
}

func UnpackMethodInputIntoInterface(abi abi.ABI, name string, data []byte) ([]interface{}, error) {
	method := abi.Methods[name]
	args := method.Inputs

	unpacked, err := args.Unpack(data)
	if err != nil {
		return nil, err
	}
	return unpacked, nil
}
