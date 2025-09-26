package prophet

// Task is a unit of computation.
type Task struct {
	// ID is a globally unique identifier for this Task.
	ID uint64
	// Plugin identifies what plugin will execute the computation.
	Plugin string
	// Input is the input data for the plugin.
	Input []byte
}

// getID implements [getIDer].
func (r Task) getID() uint64 { return r.ID }

// TaskReader is a source of tasks.
type TaskReader interface {
	Read() <-chan Task
}

// TaskResult is the result of the computation of a task.
type TaskResult struct {
	Task

	Output []byte
	Error  error
}

// getID implements [getIDer].
func (r TaskResult) getID() uint64 { return r.ID }

// TaskResultReader is a source of task results.
type TaskResultReader interface {
	Read() <-chan TaskResult
}

// Vote is a vote on a task result, indicating if it could be verified or
// not.
type Vote struct {
	// ID is the ID of the task.
	ID uint64
	// Err is the error that occurred during the verification. If it is nil,
	// the task result was verified.
	Err error
}

// getID implements [getIDer].
func (v Vote) getID() uint64 { return v.ID }
