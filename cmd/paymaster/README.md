# Paymaster

This program listens to events on multiple Ethereum-based chains and interacts with a contract on the Warden chain.

## Configuration

The program uses a JSON configuration file or envs to specify the chains and contracts to monitor. Create a `config.json` file with the following structure:

```json
{
    "event_signature" : "MessageDispatched(bytes32,address,uint256,address,bytes)",
    "reconnect_interval" : "5",
    "max_retries" : "3",
    "source_chains": [
        {
            "name": "chain-name",
            "rpc_url": "chain-rpc-url",
            "contract_address": "contract-address"
        }
    ],
    "warden_chain": {
        "name": "warden",
        "rpc_url": "warden-rpc-url",
        "contract_address": "warden-contract-address"
    }
}
```

Or look at `.env.example`.

### Configuration Fields

- `event_signature`: Which event to listen on source chains
- `reconnect_interval`: Duration to wait before attempting to reconnect to a chain after a connection failure (e.g. "5s", "1m")
- `max_retries`: Maximum number of retry attempts for failed operations before giving up
- `source_chains`: Array of chains to monitor
  - `name`: Human-readable name of the chain
  - `rpc_url`: RPC endpoint URL for the chain
  - `contract_address`: Address of the contract to monitor
- `warden_chain`: Configuration for the Warden chain
  - Same fields as source chains

## Building

```bash
go build -o paymaster
```

## Running

```bash
./paymaster -config config.json
```
