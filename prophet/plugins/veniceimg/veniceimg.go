package veniceimg

import (
	"bytes"
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
)

type Plugin struct {
	veniceimg veniceimgClient
	storage   storageClient
}

func New(veniceKey, storageKey string) Plugin {
	c := &http.Client{}

	return Plugin{
		veniceimg: veniceimgClient{
			c:         c,
			veniceKey: veniceKey,
		},
		storage: storageClient{
			c:          c,
			storageKey: storageKey,
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

	cid, err := p.storage.uploadToFilebase(ctx, "image.webp", imgBytes)
	if err != nil {
		return nil, err
	}

	urls := map[string]string{
		"filebase": "https://ipfs.filebase.io/ipfs/" + cid,
		"ipfs":     "https://ipfs.io/ipfs/" + cid,
		"pinata":   "https://gateway.pinata.cloud/ipfs/" + cid,
	}

	return json.Marshal(urls)
}

func (p Plugin) Verify(ctx context.Context, input, output []byte) error {
	return nil
}

type veniceimgClient struct {
	c         *http.Client
	veniceKey string
}

type storageClient struct {
	c          *http.Client
	storageKey string
}

type generatePayload struct {
	Format        string `json:"format"`
	HideWatermark bool   `json:"hide_watermark"`
	Model         string `json:"model"`
	Prompt        string `json:"prompt"`
	Steps         int    `json:"steps"`
	StylePreset   string `json:"style_preset"`
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
	req.Header.Set("Authorization", "Bearer "+c.veniceKey)

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

type filebaseAddResponse struct {
	Name string `json:"Name"`
	Hash string `json:"Hash"`
	Size string `json:"Size"`
}

func (c *storageClient) uploadToFilebase(ctx context.Context, filename string, fileBytes []byte) (string, error) {
	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)

	part, err := writer.CreateFormFile("file", filename)
	if err != nil {
		return "", err
	}

	if _, err := io.Copy(part, bytes.NewReader(fileBytes)); err != nil {
		return "", err
	}

	if err := writer.Close(); err != nil {
		return "", err
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, "https://rpc.filebase.io/api/v0/add", body)
	if err != nil {
		return "", err
	}

	req.Header.Set("Content-Type", writer.FormDataContentType())
	req.Header.Set("Authorization", "Bearer "+c.storageKey)

	client := http.DefaultClient

	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("filebase upload failed: %s", resp.Status)
	}

	var res filebaseAddResponse
	if err := json.NewDecoder(resp.Body).Decode(&res); err != nil {
		return "", err
	}

	return res.Hash, nil
}
