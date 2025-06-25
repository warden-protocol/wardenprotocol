package pfp

import (
	"bytes"
	"context"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"

	storage_go "github.com/supabase-community/storage-go"
)

type Plugin struct {
	imageGen      imageGen
	bucketStorage storageClient
}

func New(apiKey string, apiURL string, bucketKey string, bucketID string) Plugin {
	return Plugin{
		imageGen: imageGen{
			c:      &http.Client{},
			apiKey: apiKey,
			apiURL: apiURL,
		},
		bucketStorage: storageClient{
			c:         &http.Client{},
			bucketKey: bucketKey,
			bucketID:  bucketID,
		},
	}
}

// From https://ipfs.io/ipfs/Qma8UrYm29rHAg8bPrZWVxEkpvj3X7PrgzKyBZ6rNduUne/2
type imageMetadata struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Image       string `json:"image"`
}

type inputPayload struct {
	CfgScale    int    `json:"cfg_scale"`
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

	res, err := p.imageGen.generate(ctx, in.CfgScale, in.Model, in.Prompt, in.Steps, in.StylePreset)
	if err != nil {
		return nil, err
	}

	// Get the bytes of the generated image
	imgBytes, err := base64.StdEncoding.DecodeString(res.Images[0])
	if err != nil {
		return nil, err
	}

	// Generate a hash of the bytes to use as file name
	hasher := sha256.New()
	hasher.Write(imgBytes)
	hash := hasher.Sum(nil)
	imgName := fmt.Sprintf("%x", hash)
	imgFilename := imgName + ".jpg"

	// Prepare Supabase client
	baseURL := fmt.Sprintf("https://%s.supabase.co/storage/v1", p.bucketStorage.bucketID)
	storageClient := storage_go.NewClient(baseURL, p.bucketStorage.bucketKey, nil)

	// Store the image in the Supabase bucket
	_, err = storageClient.UploadFile(imgName, imgFilename, bytes.NewReader(imgBytes))
	if err != nil {
		return nil, err
	}

	// Generate the metadata file
	meta, err := json.Marshal(imageMetadata{
		Name:        imgName,
		Description: in.Prompt,
		Image:       baseURL + imgName,
	})
	if err != nil {
		return nil, err
	}
	metaURL := baseURL + imgName

	// Store the metadata file
	_, err = storageClient.UploadFile(imgName, imgName, bytes.NewReader([]byte(meta)))
	if err != nil {
		return nil, err
	}

	// Return the metadata URL
	return []byte(metaURL), nil
}

func (p Plugin) Verify(ctx context.Context, input, output []byte) error {
	return nil
}

type imageGen struct {
	c      *http.Client
	apiKey string
	apiURL string
}

type storageClient struct {
	c         *http.Client
	bucketKey string
	bucketID  string
}

type generatePayload struct {
	CfgScale      int    `json:"cfg_scale"`
	Format        string `json:"format"`
	Height        int    `json:"height"`
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

func (c *imageGen) generate(ctx context.Context, cfgScale int, model string, prompt string, steps int, stylePreset string) (generateResponse, error) {
	body, err := json.Marshal(generatePayload{
		CfgScale:      cfgScale,
		Format:        "jpeg",
		Height:        400,
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

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, c.apiURL, bodyReader)
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
