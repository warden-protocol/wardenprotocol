package act

import (
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	"time"
)

type AnyType struct {
	TypeUrl string `abi:"typeUrl"`
	Value   []byte `abi:"value"`
}

type Timestamp struct {
	Seconds uint64 `abi:"secs"`
	Nanos   uint64 `abi:"nanos"`
}

type ActionVote struct {
	Participant  string    `abi:"participant"`
	VotedAt      Timestamp `abi:"votedAt"`
	VoteType     int32     `abi:"voteType"`
	VoteTypeText string    `abi:"voteTypeText"`
}

type Action struct {
	Id                uint64       `abi:"id"`
	Status            int32        `abi:"status"`
	StatusText        string       `abi:"statusText"`
	Msg               AnyType      `abi:"msg"`
	Result            AnyType      `abi:"result"`
	Creator           string       `abi:"creator"`
	TimeoutHeight     uint64       `abi:"timeoutHeight"`
	CreatedAt         Timestamp    `abi:"createdAt"`
	UpdatedAt         Timestamp    `abi:"updatedAt"`
	ApproveExpression string       `abi:"approveExpression"`
	RejectExpression  string       `abi:"rejectExpression"`
	Mentions          []string     `abi:"mentions"`
	Votes             []ActionVote `abi:"votes"`
}

type Template struct {
	Id         uint64 `abi:"id"`
	Creator    string `abi:"creator"`
	Name       string `abi:"name"`
	Expression string `abi:"expression"`
}

// ActionsInput needed to unmarshal Pagination field and pass it to types.QueryActionsRequest
type ActionsInput struct {
	Pagination query.PageRequest `json:"pagination"`
}

type ActionsResponse struct {
	Pagination query.PageResponse `abi:"pagination"`
	Actions    []Action           `abi:"actions"`
}

func (r ActionsResponse) FromResponse(res *types.QueryActionsResponse) ActionsResponse {
	if res != nil {
		actions := make([]Action, len(res.Actions))
		for i, action := range res.Actions {
			actions[i] = mapAction(action)
		}

		r.Actions = actions
		if res.Pagination != nil {
			r.Pagination = *res.Pagination
		}
	}

	return r
}

type ActionByIdResponse struct {
	Action Action `abi:"action"`
}

func (r ActionByIdResponse) FromResponse(res *types.QueryActionByIdResponse) ActionByIdResponse {
	if res != nil && res.Action != nil {
		r.Action = mapAction(*res.Action)
	}

	return r
}

// ActionsByAddressInput needed to unmarshal Pagination field and pass it to types.QueryActionsByAddressRequest
type ActionsByAddressInput struct {
	Pagination query.PageRequest
	Address    string `json:"addr"`
	Status     int32
}

type ActionsByAddressResponse struct {
	Pagination query.PageResponse `abi:"pagination"`
	Actions    []Action           `abi:"actions"`
}

func (r ActionsByAddressResponse) FromResponse(res *types.QueryActionsByAddressResponse) ActionsByAddressResponse {
	if res != nil {
		actions := make([]Action, len(res.Actions))
		for i, action := range res.Actions {
			actions[i] = mapAction(action)
		}

		r.Actions = actions
		if res.Pagination != nil {
			r.Pagination = *res.Pagination
		}
	}

	return r
}

// TemplatesInput needed to unmarshal Pagination field and pass it to types.QueryTemplatesRequest
type TemplatesInput struct {
	Pagination query.PageRequest
	Creator    string `json:"creator"`
}

type TemplatesResponse struct {
	Pagination query.PageResponse `abi:"pagination"`
	Templates  []Template         `abi:"templates"`
}

func (r TemplatesResponse) FromResponse(res *types.QueryTemplatesResponse) TemplatesResponse {
	if res != nil {
		templates := make([]Template, len(res.Templates))
		for i, action := range res.Templates {
			templates[i] = mapTemplate(action)
		}

		r.Templates = templates
		if res.Pagination != nil {
			r.Pagination = *res.Pagination
		}
	}

	return r
}

type TemplateByIdResponse struct {
	Template Template `abi:"template"`
}

func (r TemplateByIdResponse) FromResponse(res *types.QueryTemplateByIdResponse) TemplateByIdResponse {
	if res != nil && res.Template != nil {
		r.Template = mapTemplate(*res.Template)
	}

	return r
}

func mapAction(action types.Action) Action {
	return Action{
		Id:                action.Id,
		Status:            int32(action.Status),
		StatusText:        action.Status.String(),
		Msg:               mapAny(action.Msg),
		Result:            mapAny(action.Result),
		Creator:           action.Creator,
		TimeoutHeight:     action.TimeoutHeight,
		CreatedAt:         mapTimestamp(action.CreatedAt),
		UpdatedAt:         mapTimestamp(action.UpdatedAt),
		ApproveExpression: action.ApproveExpression.String(),
		RejectExpression:  action.RejectExpression.String(),
		Mentions:          action.Mentions,
		Votes:             mapVotes(action.Votes),
	}
}

func mapVotes(values []*types.ActionVote) []ActionVote {
	result := make([]ActionVote, len(values))
	for _, v := range values {
		if v != nil {
			result = append(result, mapVote(*v))
		}
	}
	return result
}

func mapVote(value types.ActionVote) ActionVote {
	return ActionVote{
		Participant:  value.Participant,
		VotedAt:      mapTimestamp(value.VotedAt),
		VoteType:     int32(value.VoteType),
		VoteTypeText: value.VoteType.String(),
	}
}

func mapTemplate(value types.Template) Template {
	return Template{
		Id:         value.Id,
		Creator:    value.Creator,
		Name:       value.Name,
		Expression: value.Expression.String(),
	}
}

func mapAny(any *cdctypes.Any) AnyType {
	if any == nil {
		return AnyType{}
	}

	return AnyType{
		any.TypeUrl,
		any.Value,
	}
}

func mapTimestamp(value time.Time) Timestamp {
	return Timestamp{
		Seconds: uint64(value.Unix()),
		Nanos:   uint64(value.Nanosecond()),
	}
}
