import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgUpdateParams } from "./types/cosmos/slashing/v1beta1/tx";
import { GenesisState } from "./types/cosmos/slashing/v1beta1/genesis";
import { ValidatorMissedBlocks } from "./types/cosmos/slashing/v1beta1/genesis";
import { QueryParamsRequest } from "./types/cosmos/slashing/v1beta1/query";
import { QuerySigningInfoRequest } from "./types/cosmos/slashing/v1beta1/query";
import { QuerySigningInfosResponse } from "./types/cosmos/slashing/v1beta1/query";
import { Params } from "./types/cosmos/slashing/v1beta1/slashing";
import { QuerySigningInfoResponse } from "./types/cosmos/slashing/v1beta1/query";
import { MsgUnjail } from "./types/cosmos/slashing/v1beta1/tx";
import { MissedBlock } from "./types/cosmos/slashing/v1beta1/genesis";
import { MsgUpdateParamsResponse } from "./types/cosmos/slashing/v1beta1/tx";
import { SigningInfo } from "./types/cosmos/slashing/v1beta1/genesis";
import { ValidatorSigningInfo } from "./types/cosmos/slashing/v1beta1/slashing";
import { QueryParamsResponse } from "./types/cosmos/slashing/v1beta1/query";
import { QuerySigningInfosRequest } from "./types/cosmos/slashing/v1beta1/query";
import { MsgUnjailResponse } from "./types/cosmos/slashing/v1beta1/tx";
export { MsgUpdateParams, GenesisState, ValidatorMissedBlocks, QueryParamsRequest, QuerySigningInfoRequest, QuerySigningInfosResponse, Params, QuerySigningInfoResponse, MsgUnjail, MissedBlock, MsgUpdateParamsResponse, SigningInfo, ValidatorSigningInfo, QueryParamsResponse, QuerySigningInfosRequest, MsgUnjailResponse };
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendValidatorMissedBlocksParams = {
    value: ValidatorMissedBlocks;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySigningInfoRequestParams = {
    value: QuerySigningInfoRequest;
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
type sendQuerySigningInfoResponseParams = {
    value: QuerySigningInfoResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUnjailParams = {
    value: MsgUnjail;
    fee?: StdFee;
    memo?: string;
};
type sendMissedBlockParams = {
    value: MissedBlock;
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
type sendValidatorSigningInfoParams = {
    value: ValidatorSigningInfo;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
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
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type genesisStateParams = {
    value: GenesisState;
};
type validatorMissedBlocksParams = {
    value: ValidatorMissedBlocks;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type querySigningInfoRequestParams = {
    value: QuerySigningInfoRequest;
};
type querySigningInfosResponseParams = {
    value: QuerySigningInfosResponse;
};
type paramsParams = {
    value: Params;
};
type querySigningInfoResponseParams = {
    value: QuerySigningInfoResponse;
};
type msgUnjailParams = {
    value: MsgUnjail;
};
type missedBlockParams = {
    value: MissedBlock;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type signingInfoParams = {
    value: SigningInfo;
};
type validatorSigningInfoParams = {
    value: ValidatorSigningInfo;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type querySigningInfosRequestParams = {
    value: QuerySigningInfosRequest;
};
type msgUnjailResponseParams = {
    value: MsgUnjailResponse;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendValidatorMissedBlocks({ value, fee, memo }: sendValidatorMissedBlocksParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendQuerySigningInfoRequest({ value, fee, memo }: sendQuerySigningInfoRequestParams): Promise<DeliverTxResponse>;
    sendQuerySigningInfosResponse({ value, fee, memo }: sendQuerySigningInfosResponseParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendQuerySigningInfoResponse({ value, fee, memo }: sendQuerySigningInfoResponseParams): Promise<DeliverTxResponse>;
    sendMsgUnjail({ value, fee, memo }: sendMsgUnjailParams): Promise<DeliverTxResponse>;
    sendMissedBlock({ value, fee, memo }: sendMissedBlockParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendSigningInfo({ value, fee, memo }: sendSigningInfoParams): Promise<DeliverTxResponse>;
    sendValidatorSigningInfo({ value, fee, memo }: sendValidatorSigningInfoParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendQuerySigningInfosRequest({ value, fee, memo }: sendQuerySigningInfosRequestParams): Promise<DeliverTxResponse>;
    sendMsgUnjailResponse({ value, fee, memo }: sendMsgUnjailResponseParams): Promise<DeliverTxResponse>;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    validatorMissedBlocks({ value }: validatorMissedBlocksParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    querySigningInfoRequest({ value }: querySigningInfoRequestParams): EncodeObject;
    querySigningInfosResponse({ value }: querySigningInfosResponseParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    querySigningInfoResponse({ value }: querySigningInfoResponseParams): EncodeObject;
    msgUnjail({ value }: msgUnjailParams): EncodeObject;
    missedBlock({ value }: missedBlockParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    signingInfo({ value }: signingInfoParams): EncodeObject;
    validatorSigningInfo({ value }: validatorSigningInfoParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    querySigningInfosRequest({ value }: querySigningInfosRequestParams): EncodeObject;
    msgUnjailResponse({ value }: msgUnjailResponseParams): EncodeObject;
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
