package act

import (
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/ethereum/go-ethereum/common"
	precommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
	types "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
	"math/big"
	"time"
)

// ActionsInput needed to unmarshal Pagination field and pass it to types.QueryActionsRequest
type ActionsInput struct {
	Pagination query.PageRequest `abi:"pagination"`
}

func (r ActionsResponse) FromResponse(res *types.QueryActionsResponse) ActionsResponse {
	if res != nil {
		actions := make([]Action, 0)
		for _, action := range res.Actions {
			actions = append(actions, mapAction(action))
		}

		r.Actions = actions
		r.Pagination = mapPageResponse(res.Pagination)
	}

	return r
}

func (r ActionByIdResponse) FromResponse(res *types.QueryActionByIdResponse) ActionByIdResponse {
	if res != nil && res.Action != nil {
		r.Action = mapAction(*res.Action)
	}

	return r
}

// ActionsByAddressInput needed to unmarshal Pagination field and pass it to types.QueryActionsByAddressRequest
type ActionsByAddressInput struct {
	Pagination query.PageRequest `abi:"pagination"`
	Address    common.Address    `abi:"addr"`
	Status     int32
}

func (r ActionsByAddressResponse) FromResponse(res *types.QueryActionsByAddressResponse) ActionsByAddressResponse {
	if res != nil {
		actions := make([]Action, 0)
		for _, action := range res.Actions {
			actions = append(actions, mapAction(action))
		}

		r.Actions = actions
		r.Pagination = mapPageResponse(res.Pagination)
	}

	return r
}

// TemplatesInput needed to unmarshal Pagination field and pass it to types.QueryTemplatesRequest
type TemplatesInput struct {
	Pagination query.PageRequest
	Creator    string `json:"creator"`
}

func (r TemplatesResponse) FromResponse(res *types.QueryTemplatesResponse) TemplatesResponse {
	if res != nil {
		templates := make([]Template, 0)
		for _, action := range res.Templates {
			templates = append(templates, mapTemplate(action))
		}

		r.Templates = templates
		r.Pagination = mapPageResponse(res.Pagination)
	}

	return r
}

func (r TemplateByIdResponse) FromResponse(res *types.QueryTemplateByIdResponse) TemplateByIdResponse {
	if res != nil && res.Template != nil {
		r.Template = mapTemplate(*res.Template)
	}

	return r
}

func mapAction(action types.Action) Action {
	mentions := make([]common.Address, 0)
	for _, mention := range action.Mentions {
		mentions = append(mentions, precommon.MustAddressFromBech32Str(mention))
	}

	return Action{
		Id:                action.Id,
		Status:            big.NewInt(int64(action.Status)),
		StatusText:        action.Status.String(),
		Msg:               mapAny(action.Msg),
		Result:            mapAny(action.Result),
		Creator:           precommon.MustAddressFromBech32Str(action.Creator),
		TimeoutHeight:     action.TimeoutHeight,
		CreatedAt:         mapTimestamp(action.CreatedAt),
		UpdatedAt:         mapTimestamp(action.UpdatedAt),
		ApproveExpression: action.ApproveExpression.String(),
		RejectExpression:  action.RejectExpression.String(),
		Mentions:          mentions,
		Votes:             mapVotes(action.Votes),
	}
}

func mapVotes(values []*types.ActionVote) []ActionVote {
	result := make([]ActionVote, 0)
	for _, v := range values {
		if v != nil {
			result = append(result, mapVote(*v))
		}
	}
	return result
}

func mapVote(value types.ActionVote) ActionVote {
	return ActionVote{
		Participant:  precommon.MustAddressFromBech32Str(value.Participant),
		VotedAt:      mapTimestamp(value.VotedAt),
		VoteType:     int32(value.VoteType),
		VoteTypeText: value.VoteType.String(),
	}
}

func mapTemplate(value types.Template) Template {
	return Template{
		Id:         value.Id,
		Creator:    precommon.MustAddressFromBech32Str(value.Creator),
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
		Secs:  uint64(value.Unix()),
		Nanos: uint64(value.Nanosecond()),
	}
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
