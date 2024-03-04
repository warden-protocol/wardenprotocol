import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgUpdateParams } from "./types/cosmos/slashing/v1beta1/tx";
import { ValidatorMissedBlocks } from "./types/cosmos/slashing/v1beta1/genesis";
import { QuerySigningInfosResponse } from "./types/cosmos/slashing/v1beta1/query";
import { Params } from "./types/cosmos/slashing/v1beta1/slashing";
import { GenesisState } from "./types/cosmos/slashing/v1beta1/genesis";
import { QuerySigningInfoResponse } from "./types/cosmos/slashing/v1beta1/query";
import { QuerySigningInfosRequest } from "./types/cosmos/slashing/v1beta1/query";
import { MsgUnjailResponse } from "./types/cosmos/slashing/v1beta1/tx";
import { MissedBlock } from "./types/cosmos/slashing/v1beta1/genesis";
import { QueryParamsRequest } from "./types/cosmos/slashing/v1beta1/query";
import { QueryParamsResponse } from "./types/cosmos/slashing/v1beta1/query";
import { ValidatorSigningInfo } from "./types/cosmos/slashing/v1beta1/slashing";
import { MsgUpdateParamsResponse } from "./types/cosmos/slashing/v1beta1/tx";
import { SigningInfo } from "./types/cosmos/slashing/v1beta1/genesis";
import { QuerySigningInfoRequest } from "./types/cosmos/slashing/v1beta1/query";
import { MsgUnjail } from "./types/cosmos/slashing/v1beta1/tx";
export { MsgUpdateParams, ValidatorMissedBlocks, QuerySigningInfosResponse, Params, GenesisState, QuerySigningInfoResponse, QuerySigningInfosRequest, MsgUnjailResponse, MissedBlock, QueryParamsRequest, QueryParamsResponse, ValidatorSigningInfo, MsgUpdateParamsResponse, SigningInfo, QuerySigningInfoRequest, MsgUnjail };
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendValidatorMissedBlocksParams = {
    value: ValidatorMissedBlocks;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySigningInfosResponseParams = {
    value: QuerySigningInfosResponse;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySigningInfoResponseParams = {
    value: QuerySigningInfoResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySigningInfosRequestParams = {
    value: QuerySigningInfosRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUnjailResponseParams = {
    value: MsgUnjailResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMissedBlockParams = {
    value: MissedBlock;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendValidatorSigningInfoParams = {
    value: ValidatorSigningInfo;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendSigningInfoParams = {
    value: SigningInfo;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySigningInfoRequestParams = {
    value: QuerySigningInfoRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUnjailParams = {
    value: MsgUnjail;
    fee?: StdFee;
    memo?: string;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type validatorMissedBlocksParams = {
    value: ValidatorMissedBlocks;
};
type querySigningInfosResponseParams = {
    value: QuerySigningInfosResponse;
};
type paramsParams = {
    value: Params;
};
type genesisStateParams = {
    value: GenesisState;
};
type querySigningInfoResponseParams = {
    value: QuerySigningInfoResponse;
};
type querySigningInfosRequestParams = {
    value: QuerySigningInfosRequest;
};
type msgUnjailResponseParams = {
    value: MsgUnjailResponse;
};
type missedBlockParams = {
    value: MissedBlock;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type validatorSigningInfoParams = {
    value: ValidatorSigningInfo;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type signingInfoParams = {
    value: SigningInfo;
};
type querySigningInfoRequestParams = {
    value: QuerySigningInfoRequest;
};
type msgUnjailParams = {
    value: MsgUnjail;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendValidatorMissedBlocks({ value, fee, memo }: sendValidatorMissedBlocksParams): Promise<DeliverTxResponse>;
    sendQuerySigningInfosResponse({ value, fee, memo }: sendQuerySigningInfosResponseParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendQuerySigningInfoResponse({ value, fee, memo }: sendQuerySigningInfoResponseParams): Promise<DeliverTxResponse>;
    sendQuerySigningInfosRequest({ value, fee, memo }: sendQuerySigningInfosRequestParams): Promise<DeliverTxResponse>;
    sendMsgUnjailResponse({ value, fee, memo }: sendMsgUnjailResponseParams): Promise<DeliverTxResponse>;
    sendMissedBlock({ value, fee, memo }: sendMissedBlockParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendValidatorSigningInfo({ value, fee, memo }: sendValidatorSigningInfoParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendSigningInfo({ value, fee, memo }: sendSigningInfoParams): Promise<DeliverTxResponse>;
    sendQuerySigningInfoRequest({ value, fee, memo }: sendQuerySigningInfoRequestParams): Promise<DeliverTxResponse>;
    sendMsgUnjail({ value, fee, memo }: sendMsgUnjailParams): Promise<DeliverTxResponse>;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    validatorMissedBlocks({ value }: validatorMissedBlocksParams): EncodeObject;
    querySigningInfosResponse({ value }: querySigningInfosResponseParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    querySigningInfoResponse({ value }: querySigningInfoResponseParams): EncodeObject;
    querySigningInfosRequest({ value }: querySigningInfosRequestParams): EncodeObject;
    msgUnjailResponse({ value }: msgUnjailResponseParams): EncodeObject;
    missedBlock({ value }: missedBlockParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    validatorSigningInfo({ value }: validatorSigningInfoParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    signingInfo({ value }: signingInfoParams): EncodeObject;
    querySigningInfoRequest({ value }: querySigningInfoRequestParams): EncodeObject;
    msgUnjail({ value }: msgUnjailParams): EncodeObject;
};
interface QueryClientOptions {
    addr: string;
}
export declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Api<unknown>;
declare class SDKModule {
    query: ReturnType<typeof queryClient>;
    tx: ReturnType<typeof txClient>;
    structure: Record<string, unknown>;
    registry: Array<[string, GeneratedType]>;
    constructor(client: IgniteClient);
    updateTX(client: IgniteClient): void;
}
declare const IgntModule: (test: IgniteClient) => {
    module: {
        CosmosSlashingV1Beta1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
