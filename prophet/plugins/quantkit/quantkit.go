package quantkit

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// Plugin is a struct that holds the quantkit client.
type Plugin struct {
	quantkit quantkitClient
}

// New creates a new Plugin with the given API key and URL.
func New(apiKey string, apiURL string) Plugin {
	c := &http.Client{
		Timeout: 30 * time.Second,
	}

	return Plugin{
		quantkit: quantkitClient{
			c:      c,
			apiKey: apiKey,
			apiURL: apiURL,
		},
	}
}

// Execute executes the plugin with the given input.
func (p Plugin) Execute(ctx context.Context, input []byte) ([]byte, error) {
	var inPayload recommendOrdersPayload
	if err := json.Unmarshal(input, &inPayload); err != nil {
		return nil, err
	}

	res, err := p.quantkit.recommendOrders(ctx, inPayload)
	if err != nil {
		return nil, err
	}

	return json.Marshal(res)
}

// Verify verifies the output.
func (p Plugin) Verify(ctx context.Context, input, output []byte) error {
	return nil
}

// quantkitClient is a struct that holds the API params for the http client.
type quantkitClient struct {
	c      *http.Client
	apiKey string
	apiURL string
}

// recommendOrdersPayload is the payload for the recommend-orders endpoint.
type recommendOrdersPayload struct {
	State        state  `json:"state"`
	Begin        string `json:"begin"`
	End          string `json:"end"`
	Horizon      string `json:"horizon"`
	StrategyName string `json:"strategy_name"`
}

// state is a struct that holds the assets.
type state struct {
	Assets []asset `json:"assets"`
}

// asset is a struct that holds the amount and coin ID.
type asset struct {
	Amount float64 `json:"amount"`
	CoinID string  `json:"coin_id"`
}

// quantkitRecommendOrderResponse is the response from the recommend-orders endpoint.
type quantkitRecommendOrderResponse struct {
	Orders []order `json:"orders"`
}

// order is a struct that holds the source, destination, and amount.
type order struct {
	Source string  `json:"src"`
	Dest   string  `json:"dst"`
	Amount float64 `json:"amount"`
}

// recommendOrders calls the quantkit API to get order recommendations.
func (c *quantkitClient) recommendOrders(ctx context.Context, inPayload recommendOrdersPayload) (quantkitRecommendOrderResponse, error) {

	body, err := json.Marshal(inPayload)
	if err != nil {
		return quantkitRecommendOrderResponse{}, err
	}

	bodyReader := bytes.NewReader(body)

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, c.apiURL, bodyReader)
	if err != nil {
		return quantkitRecommendOrderResponse{}, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+c.apiKey)

	httpRes, err := c.c.Do(req)
	if err != nil {
		return quantkitRecommendOrderResponse{}, err
	}
	defer httpRes.Body.Close()

	if httpRes.StatusCode != http.StatusOK {
		return quantkitRecommendOrderResponse{}, fmt.Errorf("http status code: %s", httpRes.Status)
	}

	var res quantkitRecommendOrderResponse
	if err := json.NewDecoder(httpRes.Body).Decode(&res); err != nil {
		return quantkitRecommendOrderResponse{}, err
	}

	return res, nil
}
