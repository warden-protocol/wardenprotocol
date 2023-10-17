package service

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/qredo/fusionchain/mpc-relayer/pkg/common"
	"github.com/qredo/fusionchain/mpc-relayer/pkg/logger"
	"github.com/qredo/fusionchain/mpc-relayer/pkg/mpc"
)

var testConfig = ServiceConfig{
	Port:      8080,
	KeyRingID: "1",
	LogLevel:  "fatal",
	LogFormat: "plain",
	LogToFile: false,
	Mnemonic:  "exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge",
	MPC: mpc.Config{
		Mock: true,
	},
}

var (
	tests = []struct {
		name                        string
		config                      ServiceConfig
		modules                     []Module
		buildErr, startErr, stopErr bool
	}{
		{
			"empty config",
			ServiceConfig{},
			nil,
			true,
			true,
			true,
		},
		{
			"no mnemonic",
			ServiceConfig{
				Port:      8080,
				KeyRingID: "1",
				LogLevel:  "fatal",
				LogFormat: "plain",
				LogToFile: false,
			},
			nil,
			true,
			true,
			true,
		},
		{
			"no modules",
			testConfig,
			nil,
			false,
			false,
			false,
		},
		{
			"single module",
			testConfig,
			[]Module{mockModule{}},
			false,
			false,
			false,
		},
		{
			"multiple module",
			testConfig,
			[]Module{mockModule{}, mockModule{}},
			false,
			false,
			false,
		},
		{
			"module with error",
			testConfig,
			[]Module{mockModuleErr{}},
			false,
			true,
			true,
		},
	}
)

type mockModule struct{}

func (m mockModule) Start() error {
	return nil
}

func (m mockModule) Stop() error {
	return nil
}

func (m mockModule) healthcheck() *HealthResponse {
	return &HealthResponse{}
}

type mockModuleErr struct{}

func (m mockModuleErr) Start() error {
	return errors.New("error")
}

func (m mockModuleErr) Stop() error {
	return errors.New("error")
}

func (m mockModuleErr) healthcheck() *HealthResponse {
	return &HealthResponse{Failures: []string{"some failure"}}
}

func Test_ServiceStartStop(t *testing.T) {
	// build service with different 'module' combinations
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			s, err := buildTestService(t, tt.config, tt.modules...)
			if (err != nil) != tt.buildErr {
				t.Fatalf("unexpected build error %v", err)
			}
			if err != nil {
				return
			}
			if err := s.Start(); (err != nil) != tt.startErr {
				t.Fatalf("unexpected start error %v", err)
			}
			if err := s.Stop(os.Interrupt); (err != nil) != tt.stopErr {
				t.Fatalf("unexpected stop error %v", err)
			}
		})
	}

}

func Test_ServiceAPI(t *testing.T) {
	s, err := buildTestService(t, tests[3].config)
	if err != nil {
		t.Fatal(err)
	}

	apiTests := []struct {
		name             string
		endpoint         string
		method           func(w http.ResponseWriter, req *http.Request)
		expectedResponse any
		expectedCode     int
	}{
		{
			"status",
			statusEndPnt,
			s.status,
			&Response{Message: "OK", Version: common.FullVersion, Service: serviceName},
			http.StatusOK,
		},
		{
			"healthcheck",
			healthEndPnt,
			s.healthcheck,
			&HealthResponse{Version: common.FullVersion, Service: serviceName, Failures: []string{}},
			http.StatusOK,
		},
		{
			"pubkeys",
			pubKeysEndPnt,
			s.pubKeys,
			&Response{Message: "OK", Version: common.FullVersion, Service: serviceName},
			http.StatusOK,
		},
	}

	for _, tt := range apiTests {
		t.Run(tt.name, func(t *testing.T) {
			httpReq := httptest.NewRequest(http.MethodGet, tt.endpoint, nil)
			respRecorder := httptest.NewRecorder()
			tt.method(respRecorder, httpReq)
			if g, w := respRecorder.Code, tt.expectedCode; g != w {
				t.Errorf("unexpected response code, want %v got %v", w, g)
			}
			expectedJSON, _ := json.Marshal(tt.expectedResponse)

			if g, w := respRecorder.Body.Bytes(), expectedJSON; !bytes.Equal(g, w) {
				t.Fatalf("unexpected reponse, want %s, got %s", w, g)
			}
		})
	}

}

func buildTestService(t *testing.T, config ServiceConfig, modules ...Module) (*Service, error) {
	config, err := sanitizeConfig(config)
	if err != nil {
		return nil, err
	}
	log, err := logger.NewLogger(logger.Level(config.LogLevel), logger.Format(config.LogFormat), config.LogToFile, "test")
	if err != nil {
		return nil, err
	}
	keyringID, _, _, err := makeKeyringClient(&config, log)
	if err != nil {
		return nil, err
	}
	memoryKeyDB, err := makeKeyDB("", true)
	if err != nil {
		t.Fatal(err)
	}
	return New(keyringID, config.Port, log, memoryKeyDB, modules...), nil
}
