package rpc

import (
	"bytes"
	"encoding/json"
	"errors"
	"io"

	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/qredo/fusionchain/keyring/pkg/logger"

	"github.com/stretchr/testify/assert"
)

func Test_MakeAPI(t *testing.T) {
	if a := MakeAPI([]EndPoint{EndPoint{}}); a == nil {
		t.Fatal("unexpected nil output")
	}
}

// Test RespondWithJSON function.
func TestRespondWithJSON(t *testing.T) {
	w := httptest.NewRecorder()
	payload := map[string]string{"hello": "world"}
	if err := RespondWithJSON(w, http.StatusOK, payload); err != nil {
		t.Fatal(err)
	}

	// Assert response body.
	expectedBody := `{"hello":"world"}`
	assert.Equal(t, expectedBody, w.Body.String())

	// Assert response headers.
	assert.Equal(t, "application/json", w.Header().Get("Content-Type"))
	assert.Equal(t, http.StatusOK, w.Code)
}

// Test RespondWithError function.
func TestRespondWithError(t *testing.T) {
	w := httptest.NewRecorder()
	RespondWithError(w, http.StatusBadRequest, errors.New("bad request"))

	// Assert response body.
	expectedBody := `{"error":"bad request"}`
	assert.Equal(t, expectedBody, w.Body.String())

	// Assert response headers.
	assert.Equal(t, "application/json", w.Header().Get("Content-Type"))
	assert.Equal(t, http.StatusBadRequest, w.Code)
}

// Test DecodeJSON function.
func TestDecodeJSON(t *testing.T) {
	type TestStruct struct {
		Name string `json:"name"`
		Age  int    `json:"age"`
	}

	tests := []struct {
		name           string
		jsonStr        string
		expectedStruct *TestStruct
		expectedErr    error
	}{
		{"valid", `{"name": "John Doe", "age": 30}`, &TestStruct{Name: "John Doe", Age: 30}, nil},
		{"valid 2", `{"name": "Made up name", "age": 3123456}`, &TestStruct{Name: "Made up name", Age: 3123456}, nil},
		{"invalid 1", `{"name": "John Doe", "age": "invalid"}`, nil, errors.New("json: cannot unmarshal string into Go struct field TestStruct.age of type int")},
		{"invalid 2", `{"name": John Doe, "age": 30}`, nil, errors.New("invalid character 'J' looking for beginning of value")},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			r := strings.NewReader(tt.jsonStr)
			var ts TestStruct
			err := DecodeJSON(r, &ts)
			if tt.expectedErr == nil {
				assert.NoError(t, err)
				assert.Equal(t, tt.expectedStruct.Name, ts.Name)
				assert.Equal(t, tt.expectedStruct.Age, ts.Age)
			} else {
				assert.EqualError(t, err, tt.expectedErr.Error())
			}
		})
	}
}

func TestHandleResponseErr(t *testing.T) {

	tests := []struct {
		name        string
		response    *http.Response
		expectedErr error
	}{
		{
			"SuccessResponse",
			&http.Response{
				StatusCode: http.StatusOK,
				Body:       io.NopCloser(bytes.NewBufferString(`{"message": "success"}`)),
			},
			nil,
		},
		{
			"ErrorResponse",
			&http.Response{
				StatusCode: http.StatusBadRequest,
				Body:       io.NopCloser(bytes.NewBufferString(`{"error": "bad request"}`)),
			},
			errors.New("bad request"),
		},
		{
			"ErrorParsingResponseBody",
			&http.Response{
				StatusCode: http.StatusBadRequest,
				Body:       io.NopCloser(bytes.NewBufferString(`{"error": bad request"}`)), // malformed json input
			},
			errors.New("cannot parse JSON body from error response: invalid character 'b' looking for beginning of value"),
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := HandleResponseErr(tt.response)
			if tt.expectedErr == nil {
				assert.NoError(t, err)
			} else {
				assert.EqualError(t, err, tt.expectedErr.Error())
			}
		})
	}
}

// Test HTTPService.Start and HTTPService.Stop functions.
func TestHTTPService(t *testing.T) {

	tests := []struct {
		name               string
		endpoint           string
		handler            func(w http.ResponseWriter, r *http.Request)
		requestPath        string
		expectedResponse   interface{}
		expectedStatusCode int
		expectedError      error
	}{
		{
			"hello world",
			"/hello",
			func(w http.ResponseWriter, r *http.Request) {
				if err := RespondWithJSON(w, http.StatusOK, map[string]string{"message": "hello world"}); err != nil {
					http.Error(w, "Internal server error", http.StatusInternalServerError)
					return
				}
			},
			"/hello",
			map[string]string{"message": "hello world"},
			http.StatusOK,
			nil,
		},
		{
			"hello world (typo)",
			"/hello",
			func(w http.ResponseWriter, r *http.Request) {
				if err := RespondWithJSON(w, http.StatusOK, map[string]string{"message": "hello world"}); err != nil {
					http.Error(w, "Internal server error", http.StatusInternalServerError)
					return
				}
			},
			"/hellor",
			nil,
			http.StatusNotFound,
			nil,
		},
		{
			"bad request",
			"/bad",
			func(w http.ResponseWriter, r *http.Request) {
				RespondWithError(w, http.StatusBadRequest, "bad request")
			},
			"/bad",
			map[string]string{"error": "bad request"},
			http.StatusBadRequest,
			nil,
		},
	}

	// Create a test HTTP service using the test router and logger
	testLogger, err := logger.NewLogger(logger.Panic, logger.Plain, false, "test")
	if err != nil {
		t.Fatal(err)
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			a := &API{}
			a.AddEndpoint(NewEndpoint(tt.endpoint, http.MethodGet, tt.handler))

			// Create test HTTP service
			testService := NewHTTPService(8080, a, testLogger)

			// Start the test service in a separate goroutine
			testService.Start()
			defer func() {
				if err := testService.Stop(); err != nil {
					t.Error(err)
				}
			}()

			// Wait for the test service to start
			time.Sleep(100 * time.Millisecond)
			// Send a test HTTP request to the test service using the test router
			req, err := http.NewRequest("GET", "http://localhost:8080"+tt.requestPath, nil)
			if err != nil {
				t.Fatal(err)
			}

			// Use the http.DefaultClient.Do function to send the request to the test server.
			resp, err := http.DefaultClient.Do(req)
			if err != nil {
				t.Fatalf("Failed to send request: %v", err)
			}

			// Verify that the response body is what you expect it to be.
			defer func() {
				if err := resp.Body.Close(); err != nil {
					t.Error(err)
				}
			}()

			assert.Equal(t, tt.expectedStatusCode, resp.StatusCode)

			if resp.StatusCode != http.StatusNotFound {
				var actual map[string]string
				err = json.NewDecoder(resp.Body).Decode(&actual)
				if err != nil {
					t.Fatal(err)
				}
				assert.Equal(t, tt.expectedResponse, actual)
			}
		})
	}
}
