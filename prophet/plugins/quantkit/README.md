# Quantkit Plugin

This plugin integrates with the Quantkit API to provide order recommendations.

## Usage

To use this plugin, you need to:

1.  Obtain an API key from Quantkit.
2.  Configure the plugin with your API key and the Quantkit API URL.
3.  Provide the plugin with a payload containing the current state, begin and end dates, horizon, and strategy name.

## Configuration

The plugin is configured using the `New` function:

```go
import "github.com/warden-protocol/wardenprotocol/prophet/plugins/quantkit"
plugin := quantkit.New("YOUR_API_KEY", "WARDEN_QUANTKIT_ENDPOINT")
```

The actual config values are stored in `~/.warden/config/app.toml`, which looks like this:

```toml
###############################################################################
###                      Quantkit configuration                             ###
###############################################################################
[quantkit]

# Is QuantKit plugin enabled
enabled = "true"

# API Key used when making Quantkit API requests
api-key = "my-api-key"

# API URL used when making Quantkit API requests
api-url = "my-api-url"
```

## Payload

The plugin expects a base64-encoded JSON payload with the following format:

```json
{
  "state": {
    "assets": [
      {
        "amount": 1.0,
        "coin_id": "bitcoin"
      }
    ]
  },
  "begin": "2025-01-01T00:00:00Z",
  "end": "2025-01-20T00:00:00Z",
  "horizon": "2025-01-25T00:00:00Z",
  "strategy_name": "selected_strategy"
}
```

Here is the current list of strategies:
```json
[
  "quant_kit.ppo",
  "quant_kit.skfolio2",
  "quant_kit.holdhard",
  "quant_kit.skfolio",
  "quant_kit.optimal",
  "quant_kit.dummy"
]
```

* `state` represents the current portfolio state.
  * `assets` contains an array of assets in the portfolio.
    * `amount` is the amount of the asset held.
    * `coin_id` is the ID of the asset (e.g., "BTC", "ETH").
* `begin` is the start date for the recommendation period (YYYY-MM-DD).
* `end` is the end date for the recommendation period (YYYY-MM-DD).
* `horizon` is the time horizon for the recommendations (e.g., "7d", "30d").
* `strategy_name` is the name of the strategy to use for generating recommendations.

## Output

The plugin returns a base64-encoded JSON payload with the following format:

```json
{
  "orders": [
    {},
    {
      "src": "bitcoin",
      "dst": "tether",
      "amount": 0.123
    }
  ]
}
```


* `orders` contains an array of order recommendations.
* `src`: is the source asset to sell.
* `dst`: is the destination asset to buy.
* `amount`: is the amount of the source asset to sell.
