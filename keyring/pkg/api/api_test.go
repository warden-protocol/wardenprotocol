package api

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/qredo/fusionchain/keyring/pkg/common"
	"github.com/qredo/fusionchain/keyring/pkg/database"
	"github.com/qredo/fusionchain/keyring/pkg/logger"
	"github.com/sirupsen/logrus"
)

// MockKeyring implements the KeyringService interface for testing purposes
type mockKeyring struct {
	password string
	log      *logrus.Entry
	db       database.Database
	mod      []Module
}

func newMockKeyRing(pwd string, l *logrus.Entry, d database.Database, mods ...Module) *mockKeyring {
	return &mockKeyring{
		password: pwd,
		log:      l,
		db:       d,
		mod:      mods,
	}
}

func (m *mockKeyring) Status(w http.ResponseWriter, r *http.Request) {
	HandleStatusRequest(w, m.log, "test")
}

func (m *mockKeyring) HealthCheck(w http.ResponseWriter, r *http.Request) {
	HandleHealthcheckRequest(w, m.mod, m.log, "test")
}

func (m *mockKeyring) Keyring(w http.ResponseWriter, r *http.Request) {
	HandleKeyringRequest(w, m.log, "", "", "test")
}

func (m *mockKeyring) PubKeys(w http.ResponseWriter, r *http.Request) {
	HandlePubKeyRequest(w, m.log, m.db, "test")
}

func (m *mockKeyring) Mnemonic(w http.ResponseWriter, r *http.Request) {
	HandleMnemonicRequest(w, m.log, m.password, "", "test")
}

type mockModule struct {
	healthErr string
}

func (m *mockModule) Start() error {
	return nil
}

func (m *mockModule) Stop() error {
	return nil
}

func (m *mockModule) Healthcheck() *HealthResponse {
	if m.healthErr != "" {
		return &HealthResponse{Failures: []string{m.healthErr}}
	}
	return &HealthResponse{}
}

func Test_KeyRingAPI(t *testing.T) {
	log, err := logger.NewLogger("fatal", "plain", false, "test")
	if err != nil {
		t.Fatal(err)
	}
	m := newMockKeyRing("", log, database.NewMemory(), &mockModule{})
	apiTests := []struct {
		name             string
		endpoint         string
		method           func(w http.ResponseWriter, req *http.Request)
		expectedResponse any
		expectedCode     int
	}{
		{
			"status",
			StatusEndPnt,
			m.Status,
			&Response{Message: "OK", Version: common.FullVersion, Service: "test"},
			http.StatusOK,
		},
		{
			"healthcheck",
			HealthEndPnt,
			m.HealthCheck,
			&HealthResponse{Version: common.FullVersion, Service: "test", Failures: []string{}},
			http.StatusOK,
		},
		{
			"keyring",
			KeyringEndPnt,
			PasswordProtected(m.password, m.Keyring),
			&Response{Message: "OK", Version: common.FullVersion, Service: "test"},
			http.StatusOK,
		},
		{
			"pubkeys",
			PubKeysEndPnt,
			PasswordProtected(m.password, m.PubKeys),
			&Response{Message: "OK", Version: common.FullVersion, Service: "test"},
			http.StatusOK,
		},
		{
			"mnemonic",
			MnemonicEndPnt,
			PasswordProtected(m.password, m.Mnemonic),
			&Response{Message: "OK", Version: common.FullVersion, Service: "test"},
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
				t.Fatalf("unexpected response, want %s, got %s", w, g)
			}
		})
	}

}

func Test_APIError(t *testing.T) {
	log, err := logger.NewLogger("fatal", "plain", false, "test")
	if err != nil {
		t.Fatal(err)
	}
	db := database.NewMemory()
	// put some malformed data in the DB
	db.Persist(pkPrefix, []byte("some bad data"))
	mod := &mockModule{healthErr: "some error"}
	m := newMockKeyRing("1234", log, db, mod)
	apiTests := []struct {
		name             string
		passwordErr      bool
		endpoint         string
		method           func(w http.ResponseWriter, req *http.Request)
		expectedResponse any
		expectedCode     int
	}{
		{
			"healthcheck failure",
			false,
			HealthEndPnt,
			m.HealthCheck,
			&HealthResponse{Version: common.FullVersion, Service: "test", Failures: []string{mod.healthErr}},
			http.StatusServiceUnavailable,
		},
		{
			"password error (keyring)",
			true,
			KeyringEndPnt,
			PasswordProtected(m.password, m.Keyring),
			map[string]string{"error": errInvalidPswd.Error()},
			http.StatusBadRequest,
		},
		{
			"password error (pubkeys)",
			true,
			PubKeysEndPnt,
			PasswordProtected(m.password, m.PubKeys),
			map[string]string{"error": errInvalidPswd.Error()},
			http.StatusBadRequest,
		},
		{
			"password error (mnemonic)",
			true,
			MnemonicEndPnt,
			PasswordProtected(m.password, m.Mnemonic),
			map[string]string{"error": errInvalidPswd.Error()},
			http.StatusBadRequest,
		},
		{
			"pubkey database error",
			false,
			PubKeysEndPnt,
			PasswordProtected(m.password, m.PubKeys),
			map[string]string{"error": "could not unmarshal data 'some bad data': invalid character 's' looking for beginning of value"},
			http.StatusInternalServerError,
		},
	}
	for _, tt := range apiTests {
		t.Run(tt.name, func(t *testing.T) {
			httpReq := httptest.NewRequest(http.MethodGet, tt.endpoint, nil)
			if !tt.passwordErr {
				httpReq.Header.Add(pwdHeaderKey, "1234")
			}
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
