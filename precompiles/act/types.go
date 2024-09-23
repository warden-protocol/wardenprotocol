package act

import (
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	precommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
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
	Participant string    `abi:"participant"`
	VotedAt     Timestamp `abi:"votedAt"`
	VoteType    string    `abi:"voteType"`
}

type Action struct {
	Id                uint64       `abi:"id"`
	Status            string       `abi:"status"`
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

type ActionsResponse struct {
	Pagination precommon.PageResponse `abi:"pagination"`
	Actions    []Action               `abi:"actions"`
}

type ActionByIdResponse struct {
	Action Action `abi:"action"`
}

func (r ActionByIdResponse) FromResponse(res *types.QueryActionByIdResponse) ActionByIdResponse {
	mapAny := func(any *cdctypes.Any) AnyType {
		if any == nil {
			return AnyType{}
		}

		return AnyType{
			any.TypeUrl,
			any.Value,
		}
	}

	mapTimestamp := func(value time.Time) Timestamp {
		return Timestamp{
			Seconds: uint64(value.Unix()),
			Nanos:   uint64(value.Nanosecond()),
		}
	}

	mapVote := func(value *types.ActionVote) ActionVote {
		return ActionVote{
			Participant: value.Participant,
			VotedAt:     mapTimestamp(value.VotedAt),
			VoteType:    value.VoteType.String(),
		}
	}

	mapVotes := func(values []*types.ActionVote) []ActionVote {
		result := make([]ActionVote, len(values))
		for _, v := range values {
			if v != nil {
				result = append(result, mapVote(v))
			}
		}
		return result
	}

	if res != nil {
		action := res.Action
		r.Action = Action{
			Id:                action.Id,
			Status:            action.Status.String(),
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

	return r
}

type ActionsByAddressResponse struct {
	pagination precommon.PageResponse `abi:"Pagination"`
	actions    []Action               `abi:"actions"`
}
