import { GetLatestValidatorSetResponse } from "./types/cosmos/base/tendermint/v1beta1/query";
import { GetBlockByHeightRequest } from "./types/cosmos/base/tendermint/v1beta1/query";
import { GetNodeInfoRequest } from "./types/cosmos/base/tendermint/v1beta1/query";
import { GetNodeInfoResponse } from "./types/cosmos/base/tendermint/v1beta1/query";
import { Header } from "./types/cosmos/base/tendermint/v1beta1/types";
import { GetLatestBlockResponse } from "./types/cosmos/base/tendermint/v1beta1/query";
import { ABCIQueryResponse } from "./types/cosmos/base/tendermint/v1beta1/query";
import { ProofOp } from "./types/cosmos/base/tendermint/v1beta1/query";
import { ProofOps } from "./types/cosmos/base/tendermint/v1beta1/query";
import { VersionInfo } from "./types/cosmos/base/tendermint/v1beta1/query";
import { Block } from "./types/cosmos/base/tendermint/v1beta1/types";
import { GetBlockByHeightResponse } from "./types/cosmos/base/tendermint/v1beta1/query";
import { GetLatestBlockRequest } from "./types/cosmos/base/tendermint/v1beta1/query";
import { GetSyncingResponse } from "./types/cosmos/base/tendermint/v1beta1/query";
import { ABCIQueryRequest } from "./types/cosmos/base/tendermint/v1beta1/query";
import { GetValidatorSetByHeightResponse } from "./types/cosmos/base/tendermint/v1beta1/query";
import { Validator } from "./types/cosmos/base/tendermint/v1beta1/query";
import { Module } from "./types/cosmos/base/tendermint/v1beta1/query";
import { GetValidatorSetByHeightRequest } from "./types/cosmos/base/tendermint/v1beta1/query";
import { GetLatestValidatorSetRequest } from "./types/cosmos/base/tendermint/v1beta1/query";
import { GetSyncingRequest } from "./types/cosmos/base/tendermint/v1beta1/query";
const msgTypes = [
    ["/cosmos.base.tendermint.v1beta1.GetLatestValidatorSetResponse", GetLatestValidatorSetResponse],
    ["/cosmos.base.tendermint.v1beta1.GetBlockByHeightRequest", GetBlockByHeightRequest],
    ["/cosmos.base.tendermint.v1beta1.GetNodeInfoRequest", GetNodeInfoRequest],
    ["/cosmos.base.tendermint.v1beta1.GetNodeInfoResponse", GetNodeInfoResponse],
    ["/cosmos.base.tendermint.v1beta1.Header", Header],
    ["/cosmos.base.tendermint.v1beta1.GetLatestBlockResponse", GetLatestBlockResponse],
    ["/cosmos.base.tendermint.v1beta1.ABCIQueryResponse", ABCIQueryResponse],
    ["/cosmos.base.tendermint.v1beta1.ProofOp", ProofOp],
    ["/cosmos.base.tendermint.v1beta1.ProofOps", ProofOps],
    ["/cosmos.base.tendermint.v1beta1.VersionInfo", VersionInfo],
    ["/cosmos.base.tendermint.v1beta1.Block", Block],
    ["/cosmos.base.tendermint.v1beta1.GetBlockByHeightResponse", GetBlockByHeightResponse],
    ["/cosmos.base.tendermint.v1beta1.GetLatestBlockRequest", GetLatestBlockRequest],
    ["/cosmos.base.tendermint.v1beta1.GetSyncingResponse", GetSyncingResponse],
    ["/cosmos.base.tendermint.v1beta1.ABCIQueryRequest", ABCIQueryRequest],
    ["/cosmos.base.tendermint.v1beta1.GetValidatorSetByHeightResponse", GetValidatorSetByHeightResponse],
    ["/cosmos.base.tendermint.v1beta1.Validator", Validator],
    ["/cosmos.base.tendermint.v1beta1.Module", Module],
    ["/cosmos.base.tendermint.v1beta1.GetValidatorSetByHeightRequest", GetValidatorSetByHeightRequest],
    ["/cosmos.base.tendermint.v1beta1.GetLatestValidatorSetRequest", GetLatestValidatorSetRequest],
    ["/cosmos.base.tendermint.v1beta1.GetSyncingRequest", GetSyncingRequest],
];
export { msgTypes };
