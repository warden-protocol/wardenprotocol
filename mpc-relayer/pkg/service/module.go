package service

// Module represents a simple interface for sub-processes within
// a service.
type Module interface {
	Start() error
	Stop() error
	healthcheck() *HealthResponse
}
