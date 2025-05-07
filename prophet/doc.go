// Package prophet implements an asynchronous task-runner for the Warden
// Protocol.
//
// The tasks are called "Tasks".
//
// A [Task] consist of a []byte input, and a plugin identified by a string.
//
// The plugin implements the [Plugin] interface and is responsible for
// executing a task, or verifying the correctness of a task output (e.g. by
// re-executing it, or by implementing more sophisticated verification).
//
// The plugins are registered in a global registry, and are looked up by their
// unique string identifier.
// See [Register] for registering a new plugin.
//
// The entry point for the prophet package is the [P] struct, which implements
// the asynchronous process. See the methods of [P] for more information on
// starting it, and scheduling new tasks.
package prophet
