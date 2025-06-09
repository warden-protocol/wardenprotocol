---
sidebar_position: 6.5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Implement the Venice Plugin

## Overview

### The Venice Plugin

[Warden's `x/async` module](https://docs.wardenprotocol.org/learn/warden-protocol-modules/x-async) runs offchain heavyweight computations asynchronously and stores the results onchain.

Here are it's main components:

- **Task**: A computation unit. When requesting a Task, a user specifies an input and a Plugin.
- **Plugin**: Code determining what kind of Task input to accept and how to handle it in order to retrieve the result (output).
- **Prophet**: A subprocess running on validator nodes, which fetches Task requests and executes Plugins to provide Task results.

Developers can use the existing Plugins or create their own ones.

**The Venice Plugin** enables users to send requests to and receive responses from the [Venice AI](https://venice.ai) using the [Venice AI API](https://venice.ai/venice-api). The following guide explains how to reproduce the steps for implementing the Plugin and test it using [node commands](https://docs.wardenprotocol.org/operate-a-node/node-commands).

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
- [Install Just](https://github.com/casey/just) 1.34.0 or later.
- [Install jq](https://jqlang.org/download/).
- [Get a Venice AI API key](https://docs.venice.ai/overview/guides/generating-api-key).

Then clone the Warden Protocol repository:

```bash
git clone https://github.com/warden-protocol/wardenprotocol
```
:::note
The Venice Plugin is already included in the repository. This guide uses it as a reference example to walk you through the implementation process.
:::

## Step 1. Implement the Plugin logic

### 1.1. Set up the structure

In the `wardenprotocol/plugins` directory, create a `venice` directory with a `venice.go` file.

:::note Code
[`prophet/plugins/venice.go`](https://github.com/warden-protocol/wardenprotocol/tree/main/prophet/plugins/venice/venice.go)
:::

This file will contain the new Plugin's logic:

```go title="prophet/plugins/venice/venice.go"
package venice

// The required imports
import ("context")

// Data structures
type Plugin struct { venice veniceClient }

// A function for preparing a request
func (c *veniceClient) completions(...) (completionsResponse, error) {...}

// Functions implementing the Plugin interface
func (p Plugin) Execute(ctx context.Context, input []byte) ([]byte, error) {...}
func (p Plugin) Verify(ctx context.Context, input, output []byte) error {...}

// A function for initializing the Plugin
func New(apiKey string) Plugin {...}

```

### 1.2. Add the required imports

In the same file, add the required imports:

```go title="prophet/plugins/venice/venice.go"
import (
  "bytes"
  "context"
  "encoding/json"
  "fmt"
  "net/http"
)
```

### 1.3. Define data structures

Follow the steps below to create data structures for the Venice Plugin.

:::tip
The Venice AI API accepts and returns [JSON input and output](#input-and-output). To generate structs representing them, use an online converter—for example, [JSON to Go Struct](https://transform.tools/json-to-go).
:::

1. To abstract away the HTTP request and response, add `Plugin` and `veniceClient` structs:
   
   ```go  title="prophet/plugins/venice/venice.go"
   type Plugin struct {
     venice veniceClient
   }
   
   type veniceClient struct {
     c      *http.Client
     apiKey string
   }
   ```

2. Then add a `completionsPayload` struct and a helper `message` struct, representing the payload structure:
   
   ```go  title="prophet/plugins/venice/venice.go"
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

   ```go  title="prophet/plugins/venice/venice.go"
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

4. Add an `inputPayload` struct. The [`Execute()` function](#15-implement-the-interface) will accept the JSON input and map it to this struct to check if the format is correct.
   
   ```go title="prophet/plugins/venice/venice.go"
   type inputPayload struct {
     Model       string  `json:"model"`
     Temperature float64 `json:"temperature"`
     TopP        float64 `json:"top_p"`
     Message     string  `json:"message"`
   }
   ```

### 1.4. Prepare a request

Add a `completions()` function for preparing a request.

This function should do the following:

- Define the request body using the `completionsPayload` struct
- Set the POST method, content type, and authorization
- Decode the response into the `completionsResponse` struct
- Return the response

```go title="prophet/plugins/venice/venice.go"
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

This code implements a dynamic request, allowing users to specify multiple parameters in the input. Alternatively, for simplicity, you can just hardcode a request where the only user-defined parameter will be the content:

```go title="prophet/plugins/venice/venice.go"
func (c *veniceClient) completions(ctx context.Context, content string) (completionsResponse, error) {
    body, err := json.Marshal(completionsPayload{
      Model: "default",
      Messages: []message{{
        Role: "user",
        Content: content,
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

### 1.5. Implement the interface

1. Create an `Execute()` function that does the following:

   - Parses the JSON input and map it to the `inputPayload` struct
   - Calls `completions()` to send a request and retrieve a response
   - Returns the response

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

   :::note
   The `Execute()` function returns just the first choice from the response. A choice represents a single response option (completion) returned by the Venice AI in response to a prompt.

   ```go
   return []byte(res.Choices[0].Message.Content), nil
   ```
   :::
   
   If you hardcoded the payload in the previous step, use this:
   
   ```go
   func (p Plugin) Execute(ctx context.Context, input []byte) ([]byte, error) {
   res, err := p.venice2.completions(ctx, string(input))
   if err != nil {
     return nil, err
   }

   return []byte(res.Choices[0].Message.Content), nil
   }
   ```

2. Add a `Verify()` function that skips verification:

   ```go title="prophet/plugins/venice.go"
   func (p Plugin) Verify(ctx context.Context, input, output []byte) error {
     return nil
   }
   ```

### 1.6. Initialize the Plugin

Add a constructor for initializing the Venice Plugin. This code should do the following:

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

## Step 2. Integrate the Plugin

### 2.1. Register the Plugin

We plan to implement a node command for dynamically registering new Plugins onchain. However, currently you can register Plugins only during chain initialization, which requires modifying the `app.go` file.

:::note Code
[`warden/app/app.go`](https://github.com/warden-protocol/wardenprotocol/tree/main/warden/app/app.go)
:::

1. Add a link to the Venice Plugin directory:
   
   ```go title="warden/app/app.go"
   "github.com/warden-protocol/wardenprotocol/prophet/plugins/venice"
   ```
   
2. Add Venice to the `registerProphetHandlers()` function. It must check the validator's API key when registering the Plugin.
   
   ```go title="warden/app/app.go"
   func registerProphetHandlers(appOpts servertypes.AppOptions) {
     if cast.ToBool(appOpts.Get("venice.enabled")) {
       prophet.Register("venice", venice.New(cast.ToString(appOpts.Get("venice.api-key"))))
     }
   }
   ```
 
:::note 
If you test your code now, the registration won't succeed. To see this in action, initialize a local chain:
   
```bash
just localnet
```
   
Wait until blocks start producing and then query the available Plugins:
   
```bash
wardend query async plugins
```

The node will return a list of Plugins, but Venice won't be included yet. To complete the integration, you need to implement additional changes, which are covered in the steps below. 
:::

### 2.2. Create a config file

Now you need to create a configuration file defining the default settings of the Venice Plugin.

:::note Code
[`prophet/plugins/venice/config/config.go`](https://github.com/warden-protocol/wardenprotocol/tree/main/prophet/plugins/venice/config/config.go)
:::

1. Under `venice`, create a `config` directory and add a `config.go` file with the following code:

   ```go title="prophet/plugins/venice/config/config.go"
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

   :::tip
   This code defines the default Venice settings, which are applied to the validator configuration file, `app.toml`, during chain initialization. You can modify the validator config at any time without reinitializing the chain. For example, in `config.go`, you can leave the `ApiKey` parameter blank and specify it later in `app.toml`.
   ::: 

### 2.3. Initialize the config

Plugin configs are initilized in the chain configuration loader. See the steps below.

:::note Code
[`cmd/wardend/cmd/config.go`](https://github.com/warden-protocol/wardenprotocol/tree/main/cmd/wardend/cmd/config.go)
:::

1. Import the Venice config (see the last line in the code sample):
   
   ```go title="wardend/cmd/config.go"
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
   
   ```go title="wardend/cmd/config.go"
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
       // highlight-next-line
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
  
### 2.4. Edit the localnet script

To enable Venice on the localnet, you add it to the `localnet.just` file.

:::note Code
[`localnet.just`](https://github.com/warden-protocol/wardenprotocol/localnet.just)
:::

```bash
async-plugins := '["echo", "http", "pricepred", quantkit", "venice"]'
```

:::note
When you initialize a local chain, the `just` script adds a list of active Plugins to the genesis file, and the Cosmos SDK calls the [`registerGenesisPlugins()` function](https://github.com/warden-protocol/wardenprotocol/tree/main/warden/x/async/keeper/keeper.go) of `x/async` to loop over those Plugins from the genesis state and register them onchain.
:::

## Step 3. Test the Plugin

### 3.1. Run a local chain

To test Venice locally, navigate to `wardenprotocol` and initialize a local chain from scratch:

```bash
just localnet
```

:::tip
If the node is already running, first stop it using **CTRL + C**. The script will override the existing node home directory (`.wardend`).
:::

### 3.2. Verify registration

Wait until blocks start producing and verify the Plugin registration, as shown below.

1. Query Plugins by running this node command in a separate terminal window:

   ```bash
   wardend query async plugins
   ```
   
   The response will include the Venice Plugin:
   
   ```bash
   - creator: warden1949xxdxj72ah8swpqmx27k67s0z6g7470a0ktk
     fee:
       fee: []
       plugin_creator_reward_in_percent: "0.000000000000000000"
     id: venice
   ```

2. Query validators running the Plugin:
   
   ```bash
   wardend query async plugin-validators --name venice
   ```
  
   The node will return output similiar to this:
 
   ```bash
   - priority: "-1125"
   validator: r/uyM9AcPLCWFt9xbkiDxp7qQWU=
   queue_total_weight: "1000"
   queue_weights:
   - validator: r/uyM9AcPLCWFt9xbkiDxp7qQWU=
     weight: "1000"
   ```
   
   :::tip
   The following output means that Venice is either disabled or not registered properly:

   ```bash
   rpc error: code = NotFound desc = rpc error: code = NotFound desc = queue not found: key not found
   ```
   :::
   
3. You can also check the validator configuration file. See `app.toml` in `$HOME/.warden/config`:
   
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
   :::tip
   If Venice is disabled or the API key is missing, you can fix this without initializing the chain from scratch. Simply stop the node, edit `app.toml`, and run `wardend start` to restart the node.
   :::
   
### 3.3. Send a request

To send a request to the Venice Plugin, follow the instructions below.

If you used the simplified version of the code in [Step 1.4](#14-prepare-a-request), apply the example commands labeled **Hardcoded request**. Otherwise, use the examples under **Dynamic request**.

1. First, Base64 encode the input:

   <Tabs>
   <TabItem value="dynamic" label="Dynamic request">
   ```bash
   echo -n '{"model":"default", "temperature": 0.0, "top_p": 0.9, "message":"why is the sky black? limit your response to 100 tokens"}' | base64
   ```
   </TabItem>
   <TabItem value="hardcoded" label="Hardcoded request">
   ```bash
   echo -n 'what color is the sky?' | base64
   ``` 
   </TabItem>
   </Tabs>   
  
2. Then create a new Task for the Venice Plugin using the encoded input and other parameters:

   <Tabs>
   <TabItem value="dynamic" label="Dynamic request">
   ```bash
   wardend tx async add-task --from shulgin --input "eyJtb2RlbCI6ImRlZmF1bHQiLCAidGVtcGVyYXR1cmUiOiAwLjAsICJ0b3BfcCI6IDAuOSwgIm1l
   c3NhZ2UiOiJ3aHkgaXMgdGhlIHNreSBibGFjaz8gbGltaXQgeW91ciByZXNwb25zZSB0byAxMDAg
   dG9rZW5zIn0=" --plugin "venice" -y
   ```
   </TabItem>
   <TabItem value="hardcoded" label="Hardcoded request">
   ```bash
   wardend tx async add-task --from shulgin --input "d2hhdCBjb2xvciBpcyB0aGUgc2t5Pw==" --plugin "venice" -y
   ``` 
   </TabItem>
   </Tabs>   
   
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
   # highlight-next-line
   txhash: 0F1246CD6ECE07B766E1311654F2BF39C01C1B1E6288FF032FEE32B6F6712743
   ```

3. To check whether the transaction was successful, query it by the returned `txhash`:
   
   ```bash
   wardend query wait-tx 0F1246CD6ECE07B766E1311654F2BF39C01C1B1E6288FF032FEE32B6F6712743
   ```
   
   The output will include references to the [`MsgAddTask()` method](https://docs.wardenprotocol.org/learn/warden-protocol-modules/x-async#msgaddtask) and the `EventCreateTask` event, indicating that a new Task was created and registered onchain.

4. Now query Tasks:
   
   ```bash
   wardend query async tasks
   ```

   This command will return your Task data, including its result (output):

   <Tabs>
   <TabItem value="dynamic" label="Dynamic request">
   ```bash
   tasks:
   - result:
       created_at: "2025-06-09T14:37:43.45016319Z"
       id: "1"
       # highlight-next-line
       output: "VGhlIHNreSBpcyBub3QgYWx3YXlzIGJsYWNrLiBEdXJpbmcgdGhlIGRheSwgaXQgYXBwZWFycyBibHVlIGR1ZSB0byBhIHBoZW5vbWVub24gY2FsbGVkIFJheWxlaWdoIHNjYXR0ZXJpbmcsIHdoZXJlIHN1bmxpZ2h0IGludGVyYWN0cyB3aXRoIHRoZSBFYXJ0aCdzIGF0bW9zcGhlcmUuIEF0IG5pZ2h0LCB0aGUgc2t5IGNhbiBhcHBlYXIgYmxhY2sgYmVjYXVzZSB0aGUgc3VuIGlzIG5vIGxvbmdlciB2aXNpYmxlIGFuZCB0aGVyZSBpcyBubyBzY2F0dGVyZWQgbGlnaHQu"
     task:
       creator: warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5
       fee:
         executor_reward: []
         plugin_creator_reward: []
       id: "1"
       input: eyJtb2RlbCI6ImRlZmF1bHQiLCAidGVtcGVyYXR1cmUiOiAwLjAsICJ0b3BfcCI6IDAuOSwgIm1lc3NhZ2UiOiJ3aHkgaXMgdGhlIHNreSBibGFjaz8gbGltaXQgeW91ciByZXNwb25zZSB0byAxMDAgdG9rZW5zIn0=
       plugin: venice
       solver: T4ZRwThzLzAZbWM5pYOgynl3CjY=
     votes:
     - task_id: "1"
       vote: VOTE_TYPE_VERIFIED
       voter: T4ZRwThzLzAZbWM5pYOgynl3CjY=
   ```
   </TabItem>
   <TabItem value="hardcoded" label="Hardcoded request">
   ```bash
   tasks:
   - result:
       created_at: "2025-06-09T14:37:43.45016319Z"
       id: "1"
       # highlight-next-line
       output: "VGhlIGNvbG9yIG9mIHRoZSBza3kgaXMgYmx1ZS4="
     task:
       creator: warden1d652c9nngq5cneak2whyaqa4g9ehr8pstxj0r5
       fee:
         executor_reward: []
         plugin_creator_reward: []
       id: "1"
       input: eyJtb2RlbCI6ImRlZmF1bHQiLCAidGVtcGVyYXR1cmUiOiAwLjAsICJ0b3BfcCI6IDAuOSwgIm1lc3NhZ2UiOiJ3aHkgaXMgdGhlIHNreSBibGFjaz8gbGltaXQgeW91ciByZXNwb25zZSB0byAxMDAgdG9rZW5zIn0=
       plugin: venice
       solver: T4ZRwThzLzAZbWM5pYOgynl3CjY=
     votes:
     - task_id: "1"
       vote: VOTE_TYPE_VERIFIED
       voter: T4ZRwThzLzAZbWM5pYOgynl3CjY=
   ```
   </TabItem>
   </Tabs> 

   :::tip
   If the `output field` is missing, wait a few seconds for the Task to complete and run the query again. The Task data may also include an error if the input was invalid.
   :::

5. Copy the result from the `output` field and decode it:

   <Tabs>
   <TabItem value="dynamic" label="Dynamic request">
   ```bash
   echo 'VGhlIHNreSBpcyBub3QgYWx3YXlzIGJsYWNrLiBEdXJpbmcgdGhlIGRheSwgaXQgYXBwZWFycyBibHVlIGR1ZSB0byBhIHBoZW5vbWVub24gY2FsbGVkIFJheWxlaWdoIHNjYXR0ZXJpbmcsIHdoZXJlIHN1bmxpZ2h0IGludGVyYWN0cyB3aXRoIHRoZSBFYXJ0aCdzIGF0bW9zcGhlcmUuIEF0IG5pZ2h0LCB0aGUgc2t5IGNhbiBhcHBlYXIgYmxhY2sgYmVjYXVzZSB0aGUgc3VuIGlzIG5vIGxvbmdlciB2aXNpYmxlIGFuZCB0aGVyZSBpcyBubyBzY2F0dGVyZWQgbGlnaHQu' | base64 -d
   ```
   ```bash
   The sky is not always black. During the day, it appears blue due to a phenomenon called Rayleigh scattering, where sunlight interacts with the Earth's atmosphere. At night, the sky can appear black because the sun is no longer visible and there is no scattered light.
   ```
   </TabItem>
   <TabItem value="hardcoded" label="Hardcoded request">
   ```bash
   echo 'VGhlIGNvbG9yIG9mIHRoZSBza3kgaXMgYmx1ZS4=' | base64 -d
   ```   
   ```bash
   The color of the sky is blue.
   ```
   </TabItem>
   </Tabs>
