---
sidebar_position: 6.5
---

# Implement the Venice Plugin

## Overview

### Venice Plugin

[Warden's `x/async` module](https://docs.wardenprotocol.org/learn/warden-protocol-modules/x-async) runs offchain heavyweight computations asynchronously and stores the results onchain.

Here are it's main components:

- **Task**: A computation unit. When requesting a Task, a user specifies an input and a Plugin.
- **Plugin**: Code determining what kind of Task input to accept and how to handle it in order to retrieve the result (output).
- **Prophet**: A subprocess running on validator nodes, which fetches Task requests and executes Plugins to provide Task results.

Developers can use the existing Plugins or create their own ones.

**The Venice Plugin** enables users to send requests to and receive responses from the [Venice AI](https://venice.ai) using the [Venice AI API](https://venice.ai/venice-api). The following guide explains how to reproduce the steps for implementing the Plugin.

### Architecture

The key architecture elements of the Venice Plugin include the following:

- **The core logic and config**  
  Plugins are stored in the [`prophet` directory](https://github.com/warden-protocol/wardenprotocol/tree/main/prophet). There you can find the `venice` directory with the the core logic and config of the Venice Plugin: [`venice.go`](https://github.com/warden-protocol/wardenprotocol/tree/main/prophet/plugins/venice/venice.go), [`config.go`](https://github.com/warden-protocol/wardenprotocol/blob/main/prophet/plugins/venice/config/config.go).

- **Plugin registration**  
  The main entry point for modules and Plugins is this file: [`app.go`](https://github.com/warden-protocol/wardenprotocol/tree/main/warden/app/app.go). It contains a link to the Venice plugin and the `registerProphetHandlers()` function, which registers Plugins, reads their settings from validator nodes, and references the generic Plugin interface.

- **The Plugin interface**  
  The generic Plugin interface is defined in [`plugins.go`](https://github.com/warden-protocol/wardenprotocol/tree/main/prophet/plugins.go): see `Execute()` and `Verify()` under `type Plugin interface {}`. In [`venice/venice.go`](https://github.com/warden-protocol/wardenprotocol/tree/main/prophet/plugins/venice/venice.go), there are two methods, `Execute()` and `Verify()`, implementing the Venice interface. They accept the input and return the output.

- **Validator configs**  
  Every validator stores a node configuration file, `app.toml`. If you [run a local chain](https://docs.wardenprotocol.org/run-a-local-chain), you can find it in  the Warden's binary directory: `$HOME/.warden/config`. In this file, validators specify which Plugins are enabled on their node and tweak Plugin-specific options. The Venice Plugin requires a Venice AI API key.

### Input and output

The input format varies by Plugin. As for the Venice Plugin, it accepts a **JSON input**.

This is an example request to the Venice AI API:
  
```bash
curl --request POST \
--url https://api.venice.ai/api/v1/chat/completions \
--header 'Authorization: Bearer <my-api-key>' \
--header 'Content-Type: application/json' \
--data '{
    "model": "default",
    "messages": [
        {
            "role": "user",
            "content": "Why is the sky blue?"
        }
    ],
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "n": 1,
    "temperature": 0.8,
    "top_p": 0.9,
    "parallel_tool_calls": true,
    "max_completion_tokens": 100
}'
```

:::tip
Note that not all request parameters need to be exposed to the end user of the Plugin.
:::

The response will be also in **JSON**:

```
{
    "id": "chatcmpl-9ded27075b243deeffffcce66ff831fb",
    "object": "chat.completion",
    "created": 1749210146,
    "model": "llama-3.3-70b",
    "choices": [{
        "index": 0,
        "message": {
            "role": "assistant",
            "reasoning_content": null,
            "content": "The sky appears blue because of a phenomenon called Rayleigh scattering, which is the scattering of light by small particles or molecules in the atmosphere. When sunlight enters Earth's atmosphere, it encounters tiny molecules of gases such as nitrogen and oxygen. These molecules scatter the light in all directions, but they scatter shorter (blue) wavelengths more than longer (red) wavelengths.\n\nThis is because the smaller molecules are more effective at scattering the shorter wavelengths, which have higher energies. As a result, the blue light is",
            "tool_calls": []
        },
        "logprobs": null,
        "finish_reason": "length",
        "stop_reason": null
    }],
    "usage": {
        "prompt_tokens": 340,
        "total_tokens": 440,
        "completion_tokens": 100,
        "prompt_tokens_details": null
    },
    "prompt_logprobs": null,
    "kv_transfer_params": null,
    "venice_parameters": {
        "strip_thinking_response": false,
        "disable_thinking": false,
        "enable_web_search": "off",
        "enable_web_citations": false,
        "include_venice_system_prompt": true,
        "web_search_citations": []
    }
}
```

## Prerequisites

Before you start, complete the following prerequisites:

- [Install Go](https://go.dev/doc/install) 1.24 or later.
- [Get the Venice AI API key](https://docs.venice.ai/overview/guides/generating-api-key).
- [Run a local chain](https://docs.wardenprotocol.org/run-a-local-chain).

## Step 1. Clone the repository

Clone the Warden Protocol repository:
   
```bash
git clone https://github.com/warden-protocol/wardenprotocol
```

## Step 2. Implement the main logic

### 2.1. Create `venice.go`

In the `plugins` directory, create a `venice` directory with a file `venice.go`.

:::note Code
[`prophet/plugins/venice.go`](https://github.com/warden-protocol/wardenprotocol/tree/main/prophet/plugins/venice/venice.go)
:::

This file will contain the new Plugin's logic:

- Imports
- Data structures
- A function for building a request
- Functions implementing the Plugin interface
- A function for initializing the Plugin

```go
package venice

import ("context")

type Plugin struct {
  venice veniceClient
}

func func (p Plugin) Execute(ctx context.Context, input []byte) ([]byte, error) {
  <...>
}

func (p Plugin) Verify(ctx context.Context, input, output []byte) error {
  <...>
}
```

### 2.2. Add imports

Add the required imports:

```go title="prophet/plugins/venice.go"
import (
  "bytes"
  "context"
  "encoding/json"
  "fmt"
  "net/http"
)
```

### 2.3. Add data structures

1. To abstract away the HTTP request and response, add `Plugin` and `veniceClient` structs:
   
   ```go  title="prophet/plugins/venice.go"
   type Plugin struct {
     venice veniceClient
   }
   
   type veniceClient struct {
     c      *http.Client
     apiKey string
   }
   ```

2. Then add a `completionsPayload` struct and a helper `message` struct, representing the payload structure:
   
   ```go  title="prophet/plugins/venice.go"
   type completionsPayload struct {
     Model               string    `json:"model"`
     Messages            []message `json:"messages"`
     FrequencyPenalty    float64   `json:"frequency_penalty"`
     PresencePenalty     float64   `json:"presence_penalty"`
     N                   int       `json:"n"`
     Temperature         float64   `json:"temperature"`
     TopP                float64   `json:"top_p"`
     ParallelToolCalls   bool      `json:"parallel_tool_calls"`
     MaxCompletionTokens int       `json:"max_completion_tokens"`
   }
   
   type message struct {
     Role    string `json:"role"`
     Content string `json:"content"`
   }
   ```
   
3. Add a `completionsResponse` struct and helper structs, representing the response structure:

   ```go  title="prophet/plugins/venice.go"
   type completionsResponse struct {
     ID               string           `json:"id"`
     Object           string           `json:"object"`
     Created          int              `json:"created"`
     Model            string           `json:"model"`
     Choices          []choice         `json:"choices"`
     Usage            usage            `json:"usage"`
     PromptLogprobs   any              `json:"prompt_logprobs"`
     VeniceParameters veniceParameters `json:"venice_parameters"`
   }
   
   type choice struct {
     Index   int `json:"index"`
     Message struct {
       Role             string `json:"role"`
       ReasoningContent any    `json:"reasoning_content"`
       Content          string `json:"content"`
       ToolCalls        []any  `json:"tool_calls"`
     } `json:"message"`
     Logprobs     any    `json:"logprobs"`
     FinishReason string `json:"finish_reason"`
     StopReason   any    `json:"stop_reason"`
   }
   
   type usage struct {
     PromptTokens        int `json:"prompt_tokens"`
     TotalTokens         int `json:"total_tokens"`
     CompletionTokens    int `json:"completion_tokens"`
     PromptTokensDetails any `json:"prompt_tokens_details"`
   }
   
   type veniceParameters struct {
     StripThinkingResponse     bool   `json:"strip_thinking_response"`
     DisableThinking           bool   `json:"disable_thinking"`
     EnableWebSearch           string `json:"enable_web_search"`
     EnableWebCitations        bool   `json:"enable_web_citations"`
     IncludeVeniceSystemPrompt bool   `json:"include_venice_system_prompt"`
     WebSearchCitations        []any  `json:"web_search_citations"`
   }
   ```

   :::tip
   To create these structs, you can use an online tool for automatic conversion of JSON data to Go structs: [transform.tools/json-to-go](https://transform.tools/json-to-go)
   :::

4. Add an `inputPayload` struct. The `Execute()` function will accept the JSON input and check whether it's properly formatted by mapping to this struct.
   
   ```go title="prophet/plugins/venice.go"
   type inputPayload struct {
     Model       string  `json:"model"`
     Temperature float64 `json:"temperature"`
     TopP        float64 `json:"top_p"`
     Message     string  `json:"message"`
   }
   ```

### 2.4. Build a request

Finally, add a `completions()` function for building a request.

This function should do the following:

- Define the request body using the `completionsPayload` struct
- Set the POST method, content type, and authorization
- Decode the response into the `completionsResponse` struct
- Return the response

```go title="prophet/plugins/venice.go"
func (c *veniceClient) completions(ctx context.Context, model string, temperature, topP float64, content string) (completionsResponse, error) {
  body, err := json.Marshal(completionsPayload{
    Model: model,
    Messages: []message{{
      Role:    "user",
      Content: content,
    }},
    FrequencyPenalty:    0,
    PresencePenalty:     0,
    N:                   1,
    Temperature:         temperature,
    TopP:                topP,
    ParallelToolCalls:   true,
    MaxCompletionTokens: 100,
  })
  if err != nil {
    return completionsResponse{}, err
  }

  bodyReader := bytes.NewReader(body)

  req, err := http.NewRequestWithContext(ctx, http.MethodPost, "https://api.venice.ai/api/v1/chat/completions", bodyReader)
  if err != nil {
    return completionsResponse{}, err
  }

  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "Bearer "+c.apiKey)

  httpRes, err := c.c.Do(req)
  if err != nil {
    return completionsResponse{}, err
  }
  defer httpRes.Body.Close()

  if httpRes.StatusCode != http.StatusOK {
    return completionsResponse{}, fmt.Errorf("http status code: %s", httpRes.Status)
  }

  var res completionsResponse
  if err := json.NewDecoder(httpRes.Body).Decode(&res); err != nil {
    return completionsResponse{}, err
  }

  return res, nil
}
```

:::note
`MaxCompletionTokens` limits the size of the response (since it's going to be stored onchain). A completion token in Venice AI is a chunk of text generated by the AI.
:::

For simplicity, you can jsut hardcode a request:

```go title="prophet/plugins/venice.go"
func (c *veniceClient) completions(ctx context.Context, context string) (completionsResponse, error) {
    body, err := json.Marshal(completionsPayload{
      Model: "default",
      Messages: []message{{
        Role: "user",
        Content: "why is the sky blue?",
      }},
      FrequencyPenalty:0,
      PresencePenalty: 0,
      N: 1,
      Temperature: 0.9,
      TopP: 0.9,
      ParallelToolCalls: true,
      MaxCompletionTokens: 100,
    })
    if err != nil {
      return completionsResponse{}, err
    }
  <...>
}
```

### 2.5. Implement the interface

1. Create an `Execute()` function, which should do the following:

   - Parse the JSON input and map it to the `inputPayload` struct
   - Call `completions()` to send a request and retrieve a response
   - Return the response

   You can use this code:

   ```go title="prophet/plugins/venice.go"
   func (p Plugin) Execute(ctx context.Context, input []byte) ([]byte, error) {
     var in inputPayload
     if err := json.Unmarshal(input, &in); err != nil {
       return nil, err
     }
   
     res, err := p.venice.completions(ctx, in.Model, in.Temperature, in.TopP, in.Message)
     if err != nil {
       return nil, err
     }
   
     return []byte(res.Choices[0].Message.Content), nil
   }
   ```
   
   If you hardcoded the payload in the previous step, then call `completions()` like this:
   
   ```go
    res, err := p.venice.completions(ctx, string(input))
   ```

   :::note
   The `Execute()` function returns just the first choice from the response. A choice represents a single response option (completion) returned by the Venice AI in response to a prompt.

   ```
   return []byte(res.Choices[0].Message.Content), nil
   ```
   :::
   
2. Add a `Verify()` function that skips verification:

   ```go title="prophet/plugins/venice.go"
   func (p Plugin) Verify(ctx context.Context, input, output []byte) error {
     return nil
   }
   ```

### 2.6. Initialize the Plugin

Then add a constructor for initializing the Venice Plugin. This code should do the following:

- Read the `apiKey` parameter from the validator configuration file, `app.toml`
- Return a new instance of `Plugin` with a configured HTTP client, `veniceClient` 

```go title="prophet/plugins/venice.go"
func New(apiKey string) Plugin {
  c := &http.Client{}

  return Plugin{
    venice: veniceClient{
      c:      c,
      apiKey: apiKey,
    },
  }
}
```

## Step 3. Register the Plugin

We're planning to implement a node command that will register new Plugins onchain. However, on the moment, Plugins can be registered only when the chain is initialized. To register your Plugin, you need to modify the `app.go` file.

:::note Code
[`warden/app/app.go`](https://github.com/warden-protocol/wardenprotocol/tree/main/warden/app/app.go)
:::

1. Add a link to the Venice Plugin directory:
   
   ```go title="warden/app/app.go"
   "github.com/warden-protocol/wardenprotocol/prophet/plugins/venice"
   ```
   
2. Add Venice to the `registerProphetHandlers()` function.
   
   ```go title="warden/app/app.go"
   func registerProphetHandlers(appOpts servertypes.AppOptions) {
     if cast.ToBool(appOpts.Get("venice.enabled")) {
       prophet.Register("venice", venice.New(cast.ToString(appOpts.Get("venice.api-key"))))
     }
   }
   ```
   
   When registering the Plugin, this functions checks the validator's API key: `appOpts.Get("venice.api-key")`.

3. You can test it locally.

   Initialize a local chain by running this:
   
   ```bash
   just localnet
   ```
   
   Then query the available Plugins on the network:
   
   ```bash
   wardend query async plugins
   ```
   
   The node will return a list of available plugins, but Venice won't be included. To make sure Venice is registered onchain, we need to add its configuration file and make other changes.

   :::note
   When the chain is initialized, Cosmos SDK calls the `InitGenesis()` function of the `x/async` module to loop over the Plugins registered onchain, and then the `just` script adds them to the genesis file. See [`genesis.go`](https://github.com/warden-protocol/wardenprotocol/tree/main/warden/x/async/module/genesis.go).

   UPD: It seems that now it's happening here: [`warden/x/async/keeper/genesis.go`](https://github.com/warden-protocol/wardenprotocol/tree/main/warden/x/async/keeper/keeper.go), see the `registerGenesisPlugins()` function.
   :::

## Step 4. Configure the Plugin

1. In the `plugins` directory, create a new directory `config` with a file `config.go`.
   
   :::note Code
   [`prophet/plugins/config/config.go`](https://github.com/warden-protocol/wardenprotocol/tree/main/prophet/plugins/config/config.go)
   :::
   
   ```go title="prophet/plugins/config/config.go"
   package config
   
   type Config struct {
     Enabled bool   `mapstructure:"enabled" toml:"enabled"`
     ApiKey  string `mapstructure:"api-key" toml:"api-key"`
   }
   
   // DefaultConfig returns a default configuration for venice.
   // highlight-start
   func DefaultConfig() *Config {
     return &Config{
       Enabled: true,
       ApiKey:  "my-venice-api-key",
     }
   }
   // highlight-end

   const DefaultConfigTemplate = `
   ###############################################################################
   ###                      Venice configuration                               ###
   ###############################################################################
   [venice]
   
   # Is Venice plugin enabled
   enabled = "{{ .Venice.Enabled }}"
   
   # API Key used when making Venice API requests
   api-key = "{{ .Venice.ApiKey }}"
   `
   ```

2. In the `DefaultConfig()` function, set `Enabled` to `true` and specify your API key from [Prerequisites](#prerequisites).

## Step 5. Initialize the config

Now initialize the Venice Plugin config in the chain configuration loader, `wardend/cmd/config.go`.

:::note Code
[`cmd/wardend/cmd/config.go`](https://github.com/warden-protocol/wardenprotocol/tree/main/cmd/wardend/cmd/config.go)
:::


1. Import the Venice config (see the last line in the code sample):
   
   ```go title="prophet/plugins/config/config.go"
   import (
     "time"
   
     cmtcfg "github.com/cometbft/cometbft/config"
     serverconfig "github.com/cosmos/cosmos-sdk/server/config"
     evmservercfg "github.com/cosmos/evm/server/config"
     oracleconfig "github.com/skip-mev/slinky/oracle/config"
   
     httpconfig "github.com/warden-protocol/wardenprotocol/prophet/plugins/http/config"
     pricepredconfig "github.com/warden-protocol/wardenprotocol/prophet/plugins/pricepred/config"
     quantkitconfig "github.com/warden-protocol/wardenprotocol/prophet/plugins/quantkit/config"
     // highlight-next-line
     veniceconfig "github.com/warden-protocol/wardenprotocol/prophet/plugins/venice/config"
   )
   ```

2. Add Venice to the `initAppConfig()` function:
   
   ```go title="prophet/plugins/config/config.go"
   func initAppConfig() (string, interface{}) {
     // The following code snippet is just for reference.
     type CustomAppConfig struct {
       serverconfig.Config `mapstructure:",squash"`
   
       <...>
   
       // Prophet plugins
       PricePred pricepredconfig.Config `mapstructure:"pricepred"`
       Http      httpconfig.Config      `mapstructure:"http"`
       Quantkit  quantkitconfig.Config  `mapstructure:"quantkit"`
       // highlight-next-line
       Venice    veniceconfig.Config    `mapstructure:"venice"`
     }
   
     <...>
   
     pricePredictionConfig := pricepredconfig.DefaultConfig()
     httpConfig := httpconfig.DefaultConfig()
     quantkitConfig := quantkitconfig.DefaultConfig()
     // highlight-next-line
     veniceConfig := veniceconfig.DefaultConfig()
   
     customAppConfig := CustomAppConfig{
       <...>
       PricePred: *pricePredictionConfig,
       Http:      *httpConfig,
       Quantkit:  *quantkitConfig,
       Venice:    *veniceConfig,
     }
   
     customAppTemplate := serverconfig.DefaultConfigTemplate +
       <...>
       pricepredconfig.DefaultConfigTemplate +
       httpconfig.DefaultConfigTemplate +
       quantkitconfig.DefaultConfigTemplate +
       // highlight-next-line
       veniceconfig.DefaultConfigTemplate
   
     return customAppTemplate, customAppConfig
   }
   ```
  
## Step 6. Edit the localnet script

To enable Venice on the localnet, you should also add it to the `localnet.just` file.

:::note Code
[`localnet.just`](https://github.com/warden-protocol/wardenprotocol/localnet.just)
:::

```bash
async-plugins := '["echo", "http", "pricepred", quantkit", "venice"]'
```

## Step 7. Verify the registration

1. Restart the node and query Plugins again:

   ```bash
   wardend query async plugins
   ```
   
   The Venice Plugin will be returned:
   
   ```bash
   - creator: warden1949xxdxj72ah8swpqmx27k67s0z6g7470a0ktk
     fee:
       fee: []
       plugin_creator_reward_in_percent: "0.000000000000000000"
     id: venice
   ```

2. You can query the validators running the Plugin:
   
   ```bash
   wardend query async plugin-validators --name venice
   ```
   
3. You can also check the `app.toml` file in `$HOME/.warden/config`. If the Plugin is disabled, enable it and restart the chain.
   
   ```bash
   ###############################################################################
   ###                      Venice configuration                               ###
   ###############################################################################
   [venice]
   
   # Is Venice plugin enabled
   enabled = "true"
   
   # API Key used when making Venice API requests
   api-key = "my-api-key"
   ```
   
## Step 8. Test the Plugin

Now create a request.

1. First, encode the input:
   
   ```bash
   echo -n 'what color is the sky?' | base64
   ```
   
   This will output the following:
   
   ```bash
   d2hhdCBjb2xvciBpcyB0aGUgc2t5Pw==
   ```
   
   Alternatively, you can use a more advanced request:
  
   ```bash
   echo -n '{"model":"default", "temperature": 0.0, "top_p": 0.9, "message":"why is the sky black? limit your response to 100 tokens"}' | base64
   ```
  
2. Now create a new Task for the Venice Plugin using the encoded input:
   
   ```bash
   wardend tx async add-task --from shulgin --input "d2hhdCBjb2xvciBpcyB0aGUgc2t5Pw==" --plugin "venice" -y
   ```
   
   This will return the following:
   
   ```bash
   code: 0
   codespace: ""
   data: ""
   events: []
   gas_used: "0"
   gas_wanted: "0"
   height: "0"
   info: ""
   logs: []
   raw_log: ""
   timestamp: ""
   tx: null
   txhash: 0F1246CD6ECE07B766E1311654F2BF39C01C1B1E6288FF032FEE32B6F6712743
   ```

3. Use the returned `txhash` to check whether the transactions was successful:
   
   ```bash
   wardend query wait-tx 0F1246CD6ECE07B766E1311654F2BF39C01C1B1E6288FF032FEE32B6F6712743
   ```
   
4. Now query tasks:
   
   ```bash
   wardend query async tasks
   ```

5. Copy the output from the `output` field and decode it:
   
   ```bash
   echo 'VGhlIGNvbG9yIG9mIHRoZSBza3kgaXMgYmx1ZS4=' | base64 -d
   ```
   
   ```bash
   The color of the sky is blue.
   ```
   
   This response will be stored onchain.