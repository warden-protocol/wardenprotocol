package prophet

import "sync"

// registry is a global registry of tasks plugins.
var registry = r{
	tasks: make(map[string]Plugin),
}

type r struct {
	rw    sync.RWMutex
	tasks map[string]Plugin
}

// Register registers a new task plugin with the given unique name.
func Register(name string, task Plugin) {
	registry.rw.Lock()
	defer registry.rw.Unlock()

	if _, found := registry.tasks[name]; found {
		panic("task already registered")
	}

	registry.tasks[name] = task
}

func getPlugin(name string) Plugin {
	registry.rw.RLock()
	defer registry.rw.RUnlock()

	return registry.tasks[name]
}

func RegisteredPlugins() []string {
	registry.rw.RLock()
	defer registry.rw.RUnlock()

	plugins := make([]string, 0, len(registry.tasks))
	for name := range registry.tasks {
		plugins = append(plugins, name)
	}

	return plugins
}
