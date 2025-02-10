package prophet

import "sync"

// registry is a global registry of futures handlers.
var registry = r{
	futures: make(map[string]FutureHandler),
}

type r struct {
	rw      sync.RWMutex
	futures map[string]FutureHandler
}

// Register registers a new future handler with the given unique name.
func Register(name string, future FutureHandler) {
	registry.rw.Lock()
	defer registry.rw.Unlock()
	if _, found := registry.futures[name]; found {
		panic("future already registered")
	}
	registry.futures[name] = future
}

func getHandler(name string) FutureHandler {
	registry.rw.RLock()
	defer registry.rw.RUnlock()
	return registry.futures[name]
}

func RegisteredHandlers() []string {
	registry.rw.RLock()
	defer registry.rw.RUnlock()
	handlers := make([]string, 0, len(registry.futures))
	for name := range registry.futures {
		handlers = append(handlers, name)
	}
	return handlers
}
