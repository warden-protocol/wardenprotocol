package pfp

import (
	"bytes"
	"context"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type Plugin struct {
	imageGen      imageGen
	bucketStorage storageClient
}

func New(apiKey, apiURL, bucketKey, bucketSecretKey, bucketName, bucketRegion string) Plugin {
	return Plugin{
		imageGen: imageGen{
			c:      &http.Client{},
			apiKey: apiKey,
			apiURL: apiURL,
		},
		bucketStorage: storageClient{
			c:               &http.Client{},
			bucketKey:       bucketKey,
			bucketSecretKey: bucketSecretKey,
			bucketName:      bucketName,
			bucketRegion:    bucketRegion,
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
	Name        string  `json:"name"`
	CfgScale    float32 `json:"cfg_scale"`
	Model       string  `json:"model"`
	Prompt      string  `json:"prompt"`
	Steps       int     `json:"steps"`
	StylePreset string  `json:"style_preset"`
}

type imageGen struct {
	c      *http.Client
	apiKey string
	apiURL string
}

type storageClient struct {
	c               *http.Client
	bucketKey       string
	bucketSecretKey string
	bucketName      string
	bucketRegion    string
}

type generatePayload struct {
	CfgScale      float32 `json:"cfg_scale"`
	Format        string  `json:"format"`
	HideWatermark bool    `json:"hide_watermark"`
	Model         string  `json:"model"`
	Prompt        string  `json:"prompt"`
	Steps         int     `json:"steps"`
	StylePreset   string  `json:"style_preset"`
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

func (p Plugin) Execute(ctx context.Context, input []byte) ([]byte, error) {
	var in inputPayload
	if err := json.Unmarshal(input, &in); err != nil {
		return nil, err
	}

	if len(in.Name) == 0 {
		in.Name = "Venice generated PFP"
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

	metaURL, err := p.UploadToBucket(imgBytes, &in)
	if err != nil {
		return nil, err
	}

	// Return the metadata URL
	return []byte(metaURL), nil
}

func (p Plugin) Verify(ctx context.Context, input, output []byte) error {
	return nil
}

func (c *imageGen) generate(ctx context.Context, cfgScale float32, model string, prompt string, steps int, stylePreset string) (generateResponse, error) {
	body, err := json.Marshal(generatePayload{
		CfgScale:      cfgScale,
		Format:        "jpeg",
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

func (p *Plugin) UploadToBucket(image []byte, input *inputPayload) (string, error) {
	// Generate a hash of the bytes to use as file name
	hasher := sha256.New()
	hasher.Write(image)
	hash := hasher.Sum(nil)
	imgName := fmt.Sprintf("%x", hash)
	imgFilename := imgName + ".jpg"

	err := p.UploadFile("image/jpg", imgFilename, image)
	if err != nil {
		return "", err
	}

	// Get public URL for the image
	imageURL := p.getPublicURL(imgFilename)

	metaData, err := json.Marshal(imageMetadata{
		Name:        input.Name,
		Description: input.Prompt,
		Image:       imageURL,
	})
	if err != nil {
		return "", err
	}
	metaFilename := imgName + ".json"

	// Upload the meta file
	err = p.UploadFile("application/json", metaFilename, metaData)
	if err != nil {
		return "", err
	}
	return p.getPublicURL(metaFilename), nil
}

func (p *Plugin) UploadFile(mimeType, filePath string, fileData []byte) error {
	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithRegion(p.bucketStorage.bucketRegion),
		config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(
			p.bucketStorage.bucketKey,
			p.bucketStorage.bucketSecretKey,
			"", // optional
		)),
	)
	if err != nil {
		return errors.New("Failed to load AWS config: " + err.Error())
	}

	// Create S3 client
	client := s3.NewFromConfig(cfg)

	// Upload object
	input := &s3.PutObjectInput{
		Bucket:      aws.String(p.bucketStorage.bucketName),
		Key:         aws.String(filePath),
		Body:        bytes.NewReader(fileData),
		ContentType: aws.String(mimeType),
	}

	_, err = client.PutObject(context.TODO(), input)
	if err != nil {
		return err
	}

	return nil
}

// getPublicURL returns the public URL for an object
func (p *Plugin) getPublicURL(filePath string) string {
	return fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s", p.bucketStorage.bucketName, p.bucketStorage.bucketRegion, filePath)
}
