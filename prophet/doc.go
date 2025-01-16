// Package prophet implements an asynchronous task-runner for the Warden
// Protocol.
//
// The tasks are called "Futures".
//
// A [Future] consist of a []byte input, and a handler identified by a string.
//
// The handler implements the [FutureHandler] interface and is responsible for
// executing a future, or verifying the correctness of a future output (e.g. by
// re-executing it, or by implementing more sophisticated verification).
//
// The handlers are registered in a global registry, and are looked up by their
// unique string identifier.
// See [Register] for registering a new handler.
//
// The entry point for the prophet package is the [P] struct, which implements
// the asynchronous process. See the methods of [P] for more information on
// starting it, and scheduling new futures.
package prophet
