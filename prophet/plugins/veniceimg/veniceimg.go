package veniceimg

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
)

type Plugin struct {
	venice veniceClient
}

func New(apiKey string) Plugin {
	c := &http.Client{}

	return Plugin{
		venice: veniceClient{
			c:      c,
			apiKey: apiKey,
		},
	}
}

type inputPayload struct {
	Model       string  `json:"model"`
	Temperature float64 `json:"temperature"`
	TopP        float64 `json:"top_p"`
	Message     string  `json:"message"`
}

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

func (p Plugin) Verify(ctx context.Context, input, output []byte) error {
	return nil
}

type veniceClient struct {
	c      *http.Client
	apiKey string
}

type message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

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
