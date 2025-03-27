package async

import (
	"fmt"

	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/ethereum/go-ethereum/common"

	precommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

// TasksInput needed to unmarshal Pagination field and pass it to types.QueryTasksRequest.
type TasksInput struct {
	Pagination query.PageRequest `abi:"pagination"`
	Creator    common.Address    `abi:"creator"`
}

// FromResponse needed to map QueryTasksResponse to TasksResponse.
func (r *TasksResponse) FromResponse(res *types.QueryTasksResponse) (TasksResponse, error) {
	if res != nil {
		tasks := make([]TaskResponse, 0, len(res.Tasks))

		for _, task := range res.Tasks {
			mappedTask, err := mapTaskResponse(task)
			if err != nil {
				return TasksResponse{}, err
			}

			tasks = append(tasks, mappedTask)
		}

		r.Tasks = tasks
		r.Pagination = mapPageResponse(res.Pagination)
	}

	return *r, nil
}

// FromResponse needed to map QueryPendingTasksResponse to PendingTasksResponse.
func (r *PendingTasksResponse) FromResponse(res *types.QueryPendingTasksResponse) (PendingTasksResponse, error) {
	if res != nil {
		tasks := make([]Task, 0, len(res.Tasks))

		for _, task := range res.Tasks {
			mappedTask, err := mapTask(task)
			if err != nil {
				return PendingTasksResponse{}, err
			}

			tasks = append(tasks, mappedTask)
		}

		r.Tasks = tasks
		r.Pagination = mapPageResponse(res.Pagination)
	}

	return *r, nil
}

// FromResponse needed to map QueryTaskByIdResponse to TaskByIdResponse.
func (r *TaskByIdResponse) FromResponse(res *types.QueryTaskByIdResponse) (TaskByIdResponse, error) {
	if res != nil {
		mappedTaskResponse, err := mapTaskResponse(res.TaskResponse)
		if err != nil {
			return TaskByIdResponse{}, err
		}

		r.TaskResponse = mappedTaskResponse
	}

	return *r, nil
}

func mapTask(task types.Task) (Task, error) {
	creator, err := precommon.AddressFromBech32Str(task.Creator)
	if err != nil {
		return Task{}, fmt.Errorf("invalid creator: %w", err)
	}

	return Task{
		Id:      task.Id,
		Creator: creator,
		Plugin:  task.Plugin,
		Input:   task.Input,
	}, nil
}

func mapTaskResponse(taskResponse types.TaskResponse) (TaskResponse, error) {
	task, err := mapTask(taskResponse.Task)
	if err != nil {
		return TaskResponse{}, err
	}

	votes, err := mapVotes(taskResponse.Votes)
	if err != nil {
		return TaskResponse{}, err
	}

	taskResult, err := mapTaskResult(taskResponse.Result)
	if err != nil {
		return TaskResponse{}, err
	}

	return TaskResponse{
		Task:   task,
		Votes:  votes,
		Result: taskResult,
	}, nil
}

func mapVotes(values []types.TaskVote) ([]TaskVote, error) {
	result := make([]TaskVote, 0, len(values))

	for _, v := range values {
		mappedTemplate, err := mapVote(v)
		if err != nil {
			return nil, err
		}

		result = append(result, mappedTemplate)
	}

	return result, nil
}

func mapVote(value types.TaskVote) (TaskVote, error) {
	return TaskVote{
		Voter:  value.Voter,
		TaskId: value.TaskId,
		Vote:   uint8(value.Vote),
	}, nil
}

func mapTaskResult(value *types.TaskResult) (TaskResult, error) {
	if value == nil {
		return TaskResult{}, nil
	}

	return TaskResult{
		Id:        value.Id,
		Output:    value.Output,
		Submitter: value.Submitter,
	}, nil
}

func mapPageResponse(value *query.PageResponse) TypesPageResponse {
	if value == nil {
		return TypesPageResponse{}
	}

	return TypesPageResponse{
		NextKey: value.NextKey,
		Total:   value.Total,
	}
}
