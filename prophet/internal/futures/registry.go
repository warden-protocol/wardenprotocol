package futures

// Registry is a global registry of futures handlers.
var Registry = r{
	futures: make(map[string]FutureHandler),
}

type r struct {
	futures map[string]FutureHandler
}

func Register(name string, future FutureHandler) {
	if _, found := Registry.futures[name]; found {
		panic("future already registered")
	}
	Registry.futures[name] = future
}

func Get(name string) FutureHandler {
	return Registry.futures[name]
}
