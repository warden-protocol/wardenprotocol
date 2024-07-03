package v3

import (
	"fmt"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/shield/ast"
	token "github.com/warden-protocol/wardenprotocol/shield/token"
	"github.com/warden-protocol/wardenprotocol/warden/repo"
	"github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta0"
	"github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func MigrateStore(ctx sdk.Context, storeService store.KVStoreService, cdc codec.BinaryCodec) error {
	if err := migrateParams(ctx, storeService); err != nil {
		return err
	}

	os, err := oldStore(storeService, cdc)
	if err != nil {
		return err
	}

	ns, err := newStore(storeService, cdc)
	if err != nil {
		return err
	}

	return migrate(ctx, ns, os)
}

func migrateParams(ctx sdk.Context, storeService store.KVStoreService) error {
	s := storeService.OpenKVStore(ctx)
	p, err := s.Get(v1beta0.ParamsKey)
	if err != nil {
		return err
	}

	if err := s.Delete(v1beta0.ParamsKey); err != nil {
		return err
	}

	return s.Set(v1beta1.ParamsKey, p)
}

func migrate(ctx sdk.Context, ns NewStore, os OldStore) error {
	acts, err := os.Actions.Iterate(ctx, nil)
	if err != nil {
		return err
	}
	defer acts.Close()

	ctx.Logger().Info("migrating actions")
	for ; acts.Valid(); acts.Next() {
		act, err := acts.Value()
		if err != nil {
			return fmt.Errorf("failed to get action: %w", err)
		}

		ctx.Logger().Info("migrating action", "id", act.Id)
		newAct := migrateAction(act)
		if err := ns.Actions.Set(ctx, newAct.Id, newAct); err != nil {
			return fmt.Errorf("failed to set action: %w", err)
		}

		for _, mention := range act.Mentions {
			addr := sdk.MustAccAddressFromBech32(mention)
			if err := ns.ActionByAddress.Set(ctx, collections.Join(addr, act.Id), act.Id); err != nil {
				return fmt.Errorf("failed to set action by address: %w", err)
			}
		}
	}
	ctx.Logger().Info("done migrating actions")

	ctx.Logger().Info("migrating intents")
	intents, err := os.Intents.Iterate(ctx, nil)
	if err != nil {
		return err
	}
	for ; intents.Valid(); intents.Next() {
		intent, err := intents.Value()
		if err != nil {
			return fmt.Errorf("failed to get intent: %w", err)
		}
		newRule := migrateIntentToRule(intent)
		if err := ns.Rules.Set(ctx, newRule.Id, newRule); err != nil {
			return fmt.Errorf("failed to set intent: %w", err)
		}
	}
	ctx.Logger().Info("done migrating intents")

	return nil
}

func migrateAction(a v1beta0.Action) v1beta1.Action {
	approvers := make([]*v1beta1.Approver, len(a.Approvers))
	for i, approver := range a.Approvers {
		approvers[i] = &v1beta1.Approver{
			Address:    approver.Address,
			ApprovedAt: approver.ApprovedAt,
		}
	}

	status := v1beta1.ActionStatus(a.Status)

	return v1beta1.Action{
		Id:            a.Id,
		Approvers:     approvers,
		Status:        status,
		Msg:           a.Msg,
		Result:        a.Result,
		Creator:       a.Creator,
		TimeoutHeight: a.Btl,
		CreatedAt:     a.CreatedAt,
		UpdatedAt:     a.UpdatedAt,
		Rule:          migrateIntentToRule(a.Intent),
		Mentions:      a.Mentions,
	}
}

func migrateIntentToRule(i v1beta0.Intent) v1beta1.Rule {
	return v1beta1.Rule{
		Id:         i.Id,
		Creator:    i.Creator,
		Name:       i.Name,
		Expression: migrateExpression(i.Expression),
	}
}

func migrateExpression(e *v1beta0.Expression) *ast.Expression {
	if e == nil {
		return nil
	}
	expr := &ast.Expression{}

	switch v := e.Value.(type) {
	case *v1beta0.Expression_Identifier:
		expr.Value = &ast.Expression_Identifier{
			Identifier: migrateIdentifier(v.Identifier),
		}
	case *v1beta0.Expression_IntegerLiteral:
		expr.Value = &ast.Expression_IntegerLiteral{
			IntegerLiteral: &ast.IntegerLiteral{
				Token: migrateToken(v.IntegerLiteral.Token),
				Value: fmt.Sprint(v.IntegerLiteral.Value),
			},
		}
	case *v1beta0.Expression_BooleanLiteral:
		expr.Value = &ast.Expression_BooleanLiteral{
			BooleanLiteral: &ast.BooleanLiteral{
				Token: migrateToken(v.BooleanLiteral.Token),
				Value: v.BooleanLiteral.Value,
			},
		}
	case *v1beta0.Expression_ArrayLiteral:
		expr.Value = &ast.Expression_ArrayLiteral{
			ArrayLiteral: &ast.ArrayLiteral{
				Token:    migrateToken(v.ArrayLiteral.Token),
				Elements: migrateExpressions(v.ArrayLiteral.Elements),
			},
		}
	case *v1beta0.Expression_CallExpression:
		expr.Value = &ast.Expression_CallExpression{
			CallExpression: &ast.CallExpression{
				Token:     migrateToken(v.CallExpression.Token),
				Function:  migrateIdentifier(v.CallExpression.Function),
				Arguments: migrateExpressions(v.CallExpression.Arguments),
			},
		}
	case *v1beta0.Expression_InfixExpression:
		expr.Value = &ast.Expression_InfixExpression{
			InfixExpression: &ast.InfixExpression{
				Token:    migrateToken(v.InfixExpression.Token),
				Left:     migrateExpression(v.InfixExpression.Left),
				Operator: v.InfixExpression.Operator,
				Right:    migrateExpression(v.InfixExpression.Right),
			},
		}
	}

	return expr
}

func migrateIdentifier(i *v1beta0.Identifier) *ast.Identifier {
	if i == nil {
		return nil
	}

	return &ast.Identifier{
		Token: migrateToken(i.Token),
		Value: i.Value,
	}
}

func migrateExpressions(es []*v1beta0.Expression) []*ast.Expression {
	if es == nil {
		return nil
	}

	res := make([]*ast.Expression, len(es))
	for i, e := range es {
		res[i] = migrateExpression(e)
	}

	return res
}

func migrateToken(t v1beta0.Token) token.Token {
	typeName := t.Type.String()
	typ, found := token.Type_value[typeName]
	if !found {
		panic(fmt.Sprintf("unknown token type: %s", typeName))
	}

	return token.Token{
		Type:    token.Type(typ),
		Literal: t.Literal,
	}
}

type NewStore struct {
	Actions         repo.SeqCollection[v1beta1.Action]
	Rules           repo.SeqCollection[v1beta1.Rule]
	ActionByAddress collections.Map[collections.Pair[sdk.AccAddress, uint64], uint64]
}

func newStore(storeService store.KVStoreService, cdc codec.BinaryCodec) (NewStore, error) {
	var (
		ActionPrefix          = collections.NewPrefix(0)
		RulePrefix            = collections.NewPrefix(1)
		ActionByAddressPrefix = collections.NewPrefix(2)
	)

	sb := collections.NewSchemaBuilder(storeService)

	actionsStore := collections.NewMap(sb, ActionPrefix, "actions", collections.Uint64Key, codec.CollValue[v1beta1.Action](cdc))
	actionsCount := collections.NewSequence(sb, v1beta1.KeyPrefix(v1beta1.ActionCountKey), "actions_count")
	actions := repo.NewSeqCollection(actionsCount, actionsStore, func(i *v1beta1.Action, u uint64) { i.Id = u })

	rulesStore := collections.NewMap(sb, RulePrefix, "rules", collections.Uint64Key, codec.CollValue[v1beta1.Rule](cdc))
	rulesCount := collections.NewSequence(sb, v1beta1.KeyPrefix(v1beta1.RuleCountKey), "rules_count")
	rules := repo.NewSeqCollection(rulesCount, rulesStore, func(i *v1beta1.Rule, u uint64) { i.Id = u })

	actionByAddress := collections.NewMap(
		sb, ActionByAddressPrefix, "action_by_address",
		collections.PairKeyCodec(sdk.AccAddressKey, collections.Uint64Key),
		collections.Uint64Value,
	)

	return NewStore{
		Actions:         actions,
		Rules:           rules,
		ActionByAddress: actionByAddress,
	}, nil
}

type OldStore struct {
	Actions         repo.SeqCollection[v1beta0.Action]
	Intents         repo.SeqCollection[v1beta0.Intent]
	ActionByAddress collections.Map[collections.Pair[sdk.AccAddress, uint64], uint64]
}

func oldStore(storeService store.KVStoreService, cdc codec.BinaryCodec) (OldStore, error) {
	var (
		ActionPrefix          = collections.NewPrefix(0)
		IntentPrefix          = collections.NewPrefix(1)
		ActionByAddressPrefix = collections.NewPrefix(2)
	)

	sb := collections.NewSchemaBuilder(storeService)

	intentsStore := collections.NewMap(sb, IntentPrefix, "intent", collections.Uint64Key, codec.CollValue[v1beta0.Intent](cdc))
	intentsCount := collections.NewSequence(sb, v1beta0.KeyPrefix(v1beta0.IntentCountKey), "intents_count")
	intents := repo.NewSeqCollection(intentsCount, intentsStore, func(i *v1beta0.Intent, u uint64) { i.Id = u })

	actionsStore := collections.NewMap(sb, ActionPrefix, "action", collections.Uint64Key, codec.CollValue[v1beta0.Action](cdc))
	actionsCount := collections.NewSequence(sb, v1beta0.KeyPrefix(v1beta0.ActionCountKey), "actions_count")
	actions := repo.NewSeqCollection(actionsCount, actionsStore, func(a *v1beta0.Action, u uint64) { a.Id = u })

	actionByAddress := collections.NewMap(
		sb, ActionByAddressPrefix, "action_by_address",
		collections.PairKeyCodec(sdk.AccAddressKey, collections.Uint64Key),
		collections.Uint64Value,
	)

	_, err := sb.Build()
	if err != nil {
		return OldStore{}, err
	}

	return OldStore{
		Actions:         actions,
		Intents:         intents,
		ActionByAddress: actionByAddress,
	}, nil
}
