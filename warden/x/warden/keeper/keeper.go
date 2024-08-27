package keeper

import (
	"encoding/json"
	"fmt"

	"cosmossdk.io/collections"
	"cosmossdk.io/core/store"
	errorsmod "cosmossdk.io/errors"
	"cosmossdk.io/log"
	wasmkeeper "github.com/CosmWasm/wasmd/x/wasm/keeper"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/warden/repo"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
	v1beta3 "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

type (
	Keeper struct {
		cdc          codec.BinaryCodec
		storeService store.KVStoreService
		logger       log.Logger

		// the address capable of executing a MsgUpdateParams message. Typically, this
		// should be the x/gov module account.
		authority string

		// the address capable of executing many messages for this module. It
		// should be the x/act module account.
		actAuthority string

		keychains repo.SeqCollection[v1beta3.Keychain]

		keyRequests  repo.SeqCollection[v1beta3.KeyRequest]
		signRequests repo.SeqCollection[v1beta3.SignRequest]

		inferenceRequests repo.SeqCollection[v1beta3.InferenceRequest]

		SpacesKeeper SpacesKeeper
		KeysKeeper   KeysKeeper

		bankKeeper    types.BankKeeper
		actKeeper     types.ActKeeper
		getWasmKeeper func() wasmkeeper.Keeper
	}
)

var (
	SpaceSeqPrefix            = collections.NewPrefix(0)
	SpacesPrefix              = collections.NewPrefix(1)
	KeychainSeqPrefix         = collections.NewPrefix(2)
	KeychainsPrefix           = collections.NewPrefix(3)
	KeyPrefix                 = collections.NewPrefix(5)
	KeyRequestSeqPrefix       = collections.NewPrefix(6)
	KeyRequestsPrefix         = collections.NewPrefix(7)
	SignRequestSeqPrefix      = collections.NewPrefix(8)
	SignRequestsPrefix        = collections.NewPrefix(9)
	KeysSpaceIndexPrefix      = collections.NewPrefix(12)
	SpacesByOwnerPrefix       = collections.NewPrefix(13)
	InferenceRequestSeqPrefix = collections.NewPrefix(14)
	InferenceRequestsPrefix   = collections.NewPrefix(15)
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeService store.KVStoreService,
	logger log.Logger,
	authority string,
	actAuthority string,

	bankKeeper types.BankKeeper,
	actKeeper types.ActKeeper,
	getWasmKeeper func() wasmkeeper.Keeper,
) Keeper {
	if _, err := sdk.AccAddressFromBech32(authority); err != nil {
		panic(fmt.Sprintf("invalid authority address: %s", authority))
	}

	sb := collections.NewSchemaBuilder(storeService)

	spacesKeeper := NewSpacesKeeper(sb, cdc)

	keychainSeq := collections.NewSequence(sb, KeychainSeqPrefix, "keychain_sequence")
	keychainColl := collections.NewMap(sb, KeychainsPrefix, "keychains", collections.Uint64Key, codec.CollValue[v1beta3.Keychain](cdc))
	keychains := repo.NewSeqCollection(keychainSeq, keychainColl, func(v *v1beta3.Keychain, u uint64) { v.Id = u })

	keysKeeper := NewKeysKeeper(sb, cdc)

	keyRequestsSeq := collections.NewSequence(sb, KeyRequestSeqPrefix, "key_requests_sequence")
	keyRequestsColl := collections.NewMap(sb, KeyRequestsPrefix, "key_requests", collections.Uint64Key, codec.CollValue[v1beta3.KeyRequest](cdc))
	keyRequests := repo.NewSeqCollection(keyRequestsSeq, keyRequestsColl, func(kr *v1beta3.KeyRequest, u uint64) { kr.Id = u })

	signRequestsSeq := collections.NewSequence(sb, SignRequestSeqPrefix, "signature_requests_sequence")
	signRequestsColl := collections.NewMap(sb, SignRequestsPrefix, "signature_requests", collections.Uint64Key, codec.CollValue[v1beta3.SignRequest](cdc))
	signRequests := repo.NewSeqCollection(signRequestsSeq, signRequestsColl, func(sr *v1beta3.SignRequest, u uint64) { sr.Id = u })

	inferenceRequestsSeq := collections.NewSequence(sb, InferenceRequestSeqPrefix, "inference_requests_sequence")
	inferenceRequestsColl := collections.NewMap(sb, InferenceRequestsPrefix, "inference_requests", collections.Uint64Key, codec.CollValue[v1beta3.InferenceRequest](cdc))
	inferenceRequests := repo.NewSeqCollection(inferenceRequestsSeq, inferenceRequestsColl, func(ir *v1beta3.InferenceRequest, u uint64) { ir.Id = u })

	if _, err := sb.Build(); err != nil {
		panic(err)
	}

	k := Keeper{
		cdc:          cdc,
		storeService: storeService,
		authority:    authority,
		actAuthority: actAuthority,
		logger:       logger,

		keychains: keychains,

		keyRequests:  keyRequests,
		signRequests: signRequests,

		SpacesKeeper: spacesKeeper,
		KeysKeeper:   keysKeeper,

		inferenceRequests: inferenceRequests,

		bankKeeper:    bankKeeper,
		actKeeper:     actKeeper,
		getWasmKeeper: getWasmKeeper,
	}
	k.RegisterRules(actKeeper.RulesRegistry())

	return k
}

// GetAuthority returns the module's authority.
func (k Keeper) GetAuthority() string {
	return k.authority
}

// GetActAuthority returns the act module's authority.
func (k Keeper) GetActAuthority() string {
	return k.actAuthority
}

func (k Keeper) assertActAuthority(addr string) error {
	if k.GetActAuthority() != addr {
		return errorsmod.Wrapf(v1beta3.ErrInvalidActionSigner, "invalid authority; expected %s, got %s", k.GetAuthority(), addr)
	}
	return nil
}

// Logger returns a module-specific logger.
func (k Keeper) Logger() log.Logger {
	return k.logger.With("module", fmt.Sprintf("x/%s", v1beta3.ModuleName))
}

func (k Keeper) GetInferenceRequestById(ctx sdk.Context, id uint64) (v1beta3.InferenceRequest, error) {
	return k.inferenceRequests.Get(ctx, id)
}

func (k Keeper) PendingInferenceRequests(ctx sdk.Context) ([]v1beta3.InferenceRequest, error) {
	it, err := k.inferenceRequests.Iterate(ctx, nil)
	if err != nil {
		return nil, err
	}
	defer it.Close()

	var requests []v1beta3.InferenceRequest
	for ; it.Valid(); it.Next() {
		req, err := it.Value()
		if err != nil {
			return nil, err
		}

		if req.Response != nil || len(req.Error) > 0 {
			// already processed
			continue
		}

		requests = append(requests, req)
		if len(requests) >= 10 {
			break
		}
	}

	return requests, nil
}

func (k Keeper) UpdateInferenceRequest(ctx sdk.Context, result *v1beta3.InferenceResult) error {
	req, err := k.inferenceRequests.Get(ctx, result.Id)
	if err != nil {
		return err
	}

	req.Response = result.Response
	req.Error = result.Error
	req.UpdatedAt = uint64(ctx.BlockHeight())

	if err := k.inferenceRequests.Set(ctx, req.Id, req); err != nil {
		return err
	}

	if req.ContractCallback != "" {
		type Msg struct {
			InferenceRequestCallback v1beta3.InferenceRequest `json:"inference_request_callback"`
		}

		msg, err := json.Marshal(Msg{
			InferenceRequestCallback: req,
		})
		if err != nil {
			return fmt.Errorf("marshalling inference request: %w", err)
		}

		callbackOut, err := k.executeContract(ctx, sdk.MustAccAddressFromBech32(req.ContractCallback), sdk.MustAccAddressFromBech32(req.Creator), msg)
		if err != nil {
			return fmt.Errorf("executing contract callback: %w", err)
		}

		ctx.Logger().Info("executed contract callback", "callback", req.ContractCallback, "creator", req.Creator, "output", string(callbackOut))
	}

	return nil
}
