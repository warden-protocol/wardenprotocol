package veniceimg

import (
	"bytes"
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
)

type Plugin struct {
	veniceimg veniceimgClient
}

func New(apiKey string) Plugin {
	c := &http.Client{}

	return Plugin{
		veniceimg: veniceimgClient{
			c:      c,
			apiKey: apiKey,
		},
	}
}

type inputPayload struct {
	Model       string `json:"model"`
	Prompt      string `json:"prompt"`
	Steps       int    `json:"steps"`
	StylePreset string `json:"style_preset"`
}

func (p Plugin) Execute(ctx context.Context, input []byte) ([]byte, error) {
	var in inputPayload
	if err := json.Unmarshal(input, &in); err != nil {
		return nil, err
	}

	res, err := p.veniceimg.generate(ctx, in.Model, in.Prompt, in.Steps, in.StylePreset)
	if err != nil {
		return nil, err
	}

	imgBytes, err := base64.StdEncoding.DecodeString(res.Images[0])
	if err != nil {
		return nil, err
	}

	return imgBytes, nil
}

func (p Plugin) Verify(ctx context.Context, input, output []byte) error {
	return nil
}

type veniceimgClient struct {
	c      *http.Client
	apiKey string
}

type generatePayload struct {
	Format        string `json:"format"`
	HideWatermark bool   `json:"hide_watermark"`
	Model         string `json:"model"`
	Prompt        string `json:"prompt"`
	Steps         int    `json:"steps"`
	StylePreset   string `json:"style_preset"`
	Height        int    `json:"height"`
	Width         int    `json:"width"`
}

type timing struct {
	InferenceDuration          int `json:"inferenceDuration"`
	InferencePreprocessingTime int `json:"inferencePreprocessingTime"`
	InferenceQueueTime         int `json:"inferenceQueueTime"`
	Total                      int `json:"total"`
}

type generateResponse struct {
	ID      string          `json:"id"`
	Images  []string        `json:"images"`
	Request json.RawMessage `json:"request"`
	Timing  timing          `json:"timing"`
}

func (c *veniceimgClient) generate(ctx context.Context, model string, prompt string, steps int, stylePreset string) (generateResponse, error) {
	body, err := json.Marshal(generatePayload{
		Format:        "webp",
		HideWatermark: true,
		Model:         model,
		Prompt:        prompt,
		Steps:         steps,
		StylePreset:   stylePreset,
		Height:        256,
		Width:         256,
	})
	if err != nil {
		return generateResponse{}, err
	}

	bodyReader := bytes.NewReader(body)

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, "https://api.venice.ai/api/v1/image/generate", bodyReader)
	if err != nil {
		return generateResponse{}, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+c.apiKey)

	httpRes, err := c.c.Do(req)
	if err != nil {
		return generateResponse{}, err
	}
	defer httpRes.Body.Close()

	if httpRes.StatusCode != http.StatusOK {
		return generateResponse{}, fmt.Errorf("http status code: %s", httpRes.Status)
	}

	var res generateResponse
	if err := json.NewDecoder(httpRes.Body).Decode(&res); err != nil {
		return generateResponse{}, err
	}

	return res, nil
}
