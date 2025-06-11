1. Export funded wallet for deploying contracts (shulgin) `export HYP_KEY=0xBA4CE04E9390B2011960BF2AC71977861145FF9BB90137A3F3C56BC722E972F5`
2. start anvil `anvil --port 8547 --chain-id 31337 --block-time 1`
3. start wardend
4. add chains to hyperlane registry `hyperlane registry init`
warden
```
    chainId: 1337
    displayName: Warden
    domainId: 1337
    isTestnet: true
    name: warden
    nativeToken:
      decimals: 18
      name: WARD
      symbol: WARD
    protocol: ethereum
    rpcUrls:
      - http: http://localhost:8545
    technicalStack: other
```

anvil
```
    chainId: 31337
    displayName: Anvilnode2
    domainId: 31337
    isTestnet: true
    name: anvilnode2
    nativeToken:
      decimals: 18
      name: Ether
      symbol: ETH
    protocol: ethereum
    rpcUrls:
      - http: http://localhost:8546
    technicalStack: other
```
5. fund deployer on anvil `curl http://localhost:8546 -X POST -H "Content-Type: application/json" --data '{"method":"anvil_setBalance","params":["0x6EA8AC1673402989E7B653AE4E83B54173719C30", "0x22385A827E815500000"],"id":1,"jsonrpc":"2.0"}'`
6. `hyperlane core init` creates core-config yaml (for each chain)
7. `hyperlane core deploy` deploys core contracts to networks. saves configs to ~/.hyperlane
8. `hyperlane registry agent-config --chains anvilnode2,warden` && change rpcs to http://host.docker.internal:port
9. `export CONFIG_FILES=/Users/maks/Work/warden/hyperlane-local-test/configs/agent-config.json`
10. create tmp directory for validator signatures - it's not used but required when running with validator(s)
```
mkdir tmp
export VALIDATOR_SIGNATURES_DIR=tmp/hyperlane-validator-signatures-anvilnode2
mkdir -p $VALIDATOR_SIGNATURES_DIR
```
11. `mkdir -p hyperlane_db_relayer`
12. `docker pull --platform linux/amd64 gcr.io/abacus-labs-dev/hyperlane-agent:agents-v1.4.0 
agents-v1.4.0: Pulling from abacus-labs-dev/hyperlane-agent`
13. Run relayer
```
docker run \
  -itd \
  -e CONFIG_FILES=/config/agent-config.json \
  --mount type=bind,source=$CONFIG_FILES,target=/config/agent-config.json,readonly \
  --mount type=bind,source="$(pwd)"/hyperlane_db_relayer,target=/hyperlane_db \
  --mount type=bind,source="$(pwd)"/$VALIDATOR_SIGNATURES_DIR,target=/tmp/validator-signatures,readonly \
  gcr.io/abacus-labs-dev/hyperlane-agent:agents-v1.4.0 \
  ./relayer \
  --db /hyperlane_db \
  --relayChains anvilnode2,warden \
  --allowLocalCheckpointSyncers true \
  --defaultSigner.key 0xBA4CE04E9390B2011960BF2AC71977861145FF9BB90137A3F3C56BC722E972F5
```
14. Deploy message executor on Warden.
15. Deploy ERC5164ISM on Warden.
16. Initialize executor. (for 14-16 use `forge script scripts/DeployIsm.s.sol --evm-version paris --private-key <key> --rpc-url localhost:8545 --broadcast --slow`)
== Logs ==
  Deployed messageExecutor:
  0x2a2293508Bd57be939255A438e22C3820F617e20
  Deployed ERC5164Ism:
  0x1425BA92B40c05BB32626908EFA6d159C9A1DaF4
17. Deploy custom hook on Anvil. (`forge script scripts/DeployHook.s.sol --evm-version paris --private-key <key> --rpc-url localhost:8546 --broadcast --slow`)
== Logs ==
  Deployed ERC5164PayableHook hook:
  0x9427A5fA018Ddd0027200249DBb2E1b2bfdc564E
  Deployed aggregation hook:
  0xa5012c86E891e21384FCE20e828B7f9eB58f20d8
18. Read dispatcher address (TODO: try read from script)
`cast call --rpc-url localhost:8546 <ERC5164PayableHook_address> "dispatcher()"`
0xaA6C2a1Da765ae10E630f1c7dc86De1013FAb6D8
19. Deploy sender contract (Origin) `0xd8Ac2849f01C819a6f8185A35cE31DBeeF0cd674`
```
forge create --private-key 0xF8B19B3BF55451B76E838E1BAE544EFF50FA552048DAD981BE83401B4CC57BF4 --rpc-url localhost:8546 --broadcast ./s
rc/HyperlaneCallback.sol:Origin --constructor-args "0xfaE46352d9E576F49787b3e3163090AC3507dF62"
[⠊] Compiling...
No files changed, compilation skipped
Deployer: 0xF7bFA2bc2C4c18eB68CAeDad58e5cAAB2A77c7F7
Deployed to: 0xd8Ac2849f01C819a6f8185A35cE31DBeeF0cd674
Transaction hash: 0xf20897c4a0f000eb2d8da792d7af9a2b91c9296f480b09de351d0f56005e902c
```
20. Deploy receiver contract (Destination) `0x7121EBbA132C4038996b335937a8b5845271d638`
```
forge create --private-key 0xF8B19B3BF55451B76E838E1BAE544EFF50FA552048DAD981BE83401B4CC57BF4 --rpc-url localhost:8545 --broadcast ./src/HyperlaneCallback.sol:Destination --constructor-args "0xfaE46352d9E576F49787b3e3163090AC3507dF62" "0x1425BA92B40c05BB32626908EFA6d159C9A1DaF4"
[⠊] Compiling...
No files changed, compilation skipped
Deployer: 0xF7bFA2bc2C4c18eB68CAeDad58e5cAAB2A77c7F7
Deployed to: 0x7121EBbA132C4038996b335937a8b5845271d638
Transaction hash: 0x89ec7c91eb07560c04bd93f9a021259eac5d85e7b1fe4480a6e00f849f2a6321
```
21. Configure paymaster service.
22. Run paymaster.
23. Run script.