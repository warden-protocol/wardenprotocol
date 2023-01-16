* Compile the Verifier smart contract: `RUSTFLAGS='-C link-arg=-s' cargo wasm`

* Deploy the blockchain node: `./application/init.sh`

* Run the contract deployment script: `cd contracts && node --experimental-specifier-resolution=node --loader ts-node/esm deployWasmContract.ts`

