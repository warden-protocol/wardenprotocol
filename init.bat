
rem ethermint compile on windows
rem install golang , gcc, sed for windows
rem 1. install msys2 : https://www.msys2.org/
rem 2. pacman -S mingw-w64-x86_64-toolchain
rem    pacman -S sed
rem    pacman -S mingw-w64-x86_64-jq
rem 3. add path C:\msys64\mingw64\bin  
rem             C:\msys64\usr\bin

set KEY="shulgin"
set CHAINID="fusion_420-1"
set MONIKER="qredofusionchain"
set KEYRING="test"
rem set KEYALGO="eth_secp256k1"
set LOGLEVEL="info"
rem EVM Trace, leave blank to disable
set TRACE="---trace"
set HOME=%USERPROFILE%\.ethermintd
echo %HOME%
set ETHCONFIG=%HOME%\config\config.toml
set GENESIS=%HOME%\config\genesis.json
set TMPGENESIS=%HOME%\config\tmp_genesis.json

@echo build binary
go build .\cmd\ethermintd


@echo clear home folder
del /s /q %HOME%

ethermintd config keyring-backend %KEYRING%
ethermintd config chain-id %CHAINID%

rem ethermintd keys add %KEY% --keyring-backend %KEYRING% --algo %KEYALGO%
@echo "exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge" | ethermintd keys add %KEY% --recover

rem Set moniker and chain-id for Ethermint (Moniker can be anything, chain-id must be an integer)
ethermintd init %MONIKER% --chain-id %CHAINID% 

rem Change parameter token denominations to qrdo
cat %GENESIS% | jq ".app_state[\"staking\"][\"params\"][\"bond_denom\"]=\"qrdo\""   >   %TMPGENESIS% && move %TMPGENESIS% %GENESIS%
cat %GENESIS% | jq ".app_state[\"crisis\"][\"constant_fee\"][\"denom\"]=\"qrdo\"" > %TMPGENESIS% && move %TMPGENESIS% %GENESIS%
cat %GENESIS% | jq ".app_state[\"gov\"][\"deposit_params\"][\"min_deposit\"][0][\"denom\"]=\"qrdo\"" > %TMPGENESIS% && move %TMPGENESIS% %GENESIS%
cat %GENESIS% | jq ".app_state[\"mint\"][\"params\"][\"mint_denom\"]=\"qrdo\"" > %TMPGENESIS% && move %TMPGENESIS% %GENESIS%

rem increase block time (?)
cat %GENESIS% | jq ".consensus_params[\"block\"][\"time_iota_ms\"]=\"30000\"" > %TMPGENESIS% && move %TMPGENESIS% %GENESIS%

rem gas limit in genesis
cat %GENESIS% | jq ".consensus_params[\"block\"][\"max_gas\"]=\"10000000\"" > %TMPGENESIS% && move %TMPGENESIS% %GENESIS%

rem setup
sed -i "s/create_empty_blocks = true/create_empty_blocks = false/g" %ETHCONFIG%

rem Allocate genesis accounts (cosmos formatted addresses)
ethermintd add-genesis-account %KEY% 100000000000000000000000000qrdo --keyring-backend %KEYRING%

rem Sign genesis transaction
ethermintd gentx %KEY% 1000000000000000000000qrdo --keyring-backend %KEYRING% --chain-id %CHAINID%

rem Collect genesis tx
ethermintd collect-gentxs

rem Run this to ensure everything worked and that the genesis file is setup correctly
ethermintd validate-genesis



rem Start the node (remove the --pruning=nothing flag if historical queries are not needed)
ethermintd start --pruning=nothing --evm.tracer=json %TRACE% --log_level %LOGLEVEL% --minimum-gas-prices=0.0001qrdo --json-rpc.api eth,txpool,personal,net,debug,web3,miner --api.enable
