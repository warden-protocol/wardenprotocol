package prophet

import (
	"fmt"
	"sync"
)

// registry is a global registry of tasks plugins.
var registry = r{
	plugins: make(map[string]Plugin),
}

type r struct {
	rw      sync.RWMutex
	plugins map[string]Plugin
}

// Register registers a new task plugin with the given unique name.
func Register(name string, task Plugin) {
	registry.rw.Lock()
	defer registry.rw.Unlock()

	if _, found := registry.plugins[name]; found {
		panic(fmt.Errorf("plugin %s registered twice", name))
	}

	registry.plugins[name] = task
}

func getPlugin(name string) Plugin {
	registry.rw.RLock()
	defer registry.rw.RUnlock()

	return registry.plugins[name]
}

func RegisteredPlugins() []string {
	registry.rw.RLock()
	defer registry.rw.RUnlock()

	plugins := make([]string, 0, len(registry.plugins))
	for name := range registry.plugins {
		plugins = append(plugins, name)
	}

	return plugins
}
