package server

import (
	"fmt"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/server"
	"github.com/evmos/ethermint/indexer"
	tmnode "github.com/tendermint/tendermint/node"
	sm "github.com/tendermint/tendermint/state"
	tmstore "github.com/tendermint/tendermint/store"
)

func NewIndexTxCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "index-eth-tx [forward|backward]",
		Short: "Index historical eth txs",
		Long: `Index historical eth txs, it only support two traverse direction to avoid creating gaps in the indexer db if using arbitrary block ranges:
		- backward: index the blocks from the first indexed block to the earliest block in the chain.
		- forward: index the blocks from the latest indexed block to latest block in the chain.
		`,
		Args: cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			serverCtx := server.GetServerContextFromCmd(cmd)
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			direction := args[0]
			if direction != "backward" && direction != "forward" {
				return fmt.Errorf("unknown index direction, expect: backward|forward, got: %s", direction)
			}

			cfg := serverCtx.Config
			home := cfg.RootDir
			logger := serverCtx.Logger
			idxDB, err := OpenIndexerDB(home)
			if err != nil {
				logger.Error("failed to open evm indexer DB", "error", err.Error())
				return err
			}
			idxer := indexer.NewKVIndexer(idxDB, logger.With("module", "evmindex"), clientCtx)

			// open local tendermint db, because the local rpc won't be available.
			tmdb, err := tmnode.DefaultDBProvider(&tmnode.DBContext{ID: "blockstore", Config: cfg})
			if err != nil {
				return err
			}
			blockStore := tmstore.NewBlockStore(tmdb)

			stateDB, err := tmnode.DefaultDBProvider(&tmnode.DBContext{ID: "state", Config: cfg})
			if err != nil {
				return err
			}

			stateStore := sm.NewStore(stateDB, sm.StoreOptions{
				DiscardABCIResponses: false,
			})

			indexBlock := func(height int64) error {
				blk := blockStore.LoadBlock(height)
				if blk == nil {
					return fmt.Errorf("block not found %d", height)
				}
				resBlk, err := stateStore.LoadABCIResponses(height)
				if err != nil {
					return err
				}
				if err := idxer.IndexBlock(blk, resBlk.DeliverTxs); err != nil {
					return err
				}
				fmt.Println(height)
				return nil
			}

			switch args[0] {
			case "backward":
				first, err := idxer.FirstIndexedBlock()
				if err != nil {
					return err
				}
				if first == -1 {
					return fmt.Errorf("indexer db is empty")
				}
				for i := first - 1; i > 0; i-- {
					if err := indexBlock(i); err != nil {
						return err
					}
				}
			case "forward":
				latest, err := idxer.LastIndexedBlock()
				if err != nil {
					return err
				}
				if latest == -1 {
					// start from genesis if empty
					latest = 0
				}
				for i := latest + 1; i <= blockStore.Height(); i++ {
					if err := indexBlock(i); err != nil {
						return err
					}
				}
			default:
				return fmt.Errorf("unknown direction %s", args[0])
			}

			return nil
		},
	}
	return cmd
}
