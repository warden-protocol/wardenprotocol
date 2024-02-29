import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { SigningInfo } from "./types/cosmos/slashing/v1beta1/genesis";
import { QueryParamsResponse } from "./types/cosmos/slashing/v1beta1/query";
import { MsgUnjail } from "./types/cosmos/slashing/v1beta1/tx";
import { MsgUpdateParamsResponse } from "./types/cosmos/slashing/v1beta1/tx";
import { GenesisState } from "./types/cosmos/slashing/v1beta1/genesis";
import { MissedBlock } from "./types/cosmos/slashing/v1beta1/genesis";
import { QueryParamsRequest } from "./types/cosmos/slashing/v1beta1/query";
import { QuerySigningInfosRequest } from "./types/cosmos/slashing/v1beta1/query";
import { MsgUnjailResponse } from "./types/cosmos/slashing/v1beta1/tx";
import { MsgUpdateParams } from "./types/cosmos/slashing/v1beta1/tx";
import { Params } from "./types/cosmos/slashing/v1beta1/slashing";
import { ValidatorMissedBlocks } from "./types/cosmos/slashing/v1beta1/genesis";
import { ValidatorSigningInfo } from "./types/cosmos/slashing/v1beta1/slashing";
import { QuerySigningInfoRequest } from "./types/cosmos/slashing/v1beta1/query";
import { QuerySigningInfoResponse } from "./types/cosmos/slashing/v1beta1/query";
import { QuerySigningInfosResponse } from "./types/cosmos/slashing/v1beta1/query";
export { SigningInfo, QueryParamsResponse, MsgUnjail, MsgUpdateParamsResponse, GenesisState, MissedBlock, QueryParamsRequest, QuerySigningInfosRequest, MsgUnjailResponse, MsgUpdateParams, Params, ValidatorMissedBlocks, ValidatorSigningInfo, QuerySigningInfoRequest, QuerySigningInfoResponse, QuerySigningInfosResponse };
type sendSigningInfoParams = {
    value: SigningInfo;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUnjailParams = {
    value: MsgUnjail;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
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
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendValidatorMissedBlocksParams = {
    value: ValidatorMissedBlocks;
    fee?: StdFee;
    memo?: string;
};
type sendValidatorSigningInfoParams = {
    value: ValidatorSigningInfo;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySigningInfoRequestParams = {
    value: QuerySigningInfoRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySigningInfoResponseParams = {
    value: QuerySigningInfoResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQuerySigningInfosResponseParams = {
    value: QuerySigningInfosResponse;
    fee?: StdFee;
    memo?: string;
};
type signingInfoParams = {
    value: SigningInfo;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type msgUnjailParams = {
    value: MsgUnjail;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type genesisStateParams = {
    value: GenesisState;
};
type missedBlockParams = {
    value: MissedBlock;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type querySigningInfosRequestParams = {
    value: QuerySigningInfosRequest;
};
type msgUnjailResponseParams = {
    value: MsgUnjailResponse;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type paramsParams = {
    value: Params;
};
type validatorMissedBlocksParams = {
    value: ValidatorMissedBlocks;
};
type validatorSigningInfoParams = {
    value: ValidatorSigningInfo;
};
type querySigningInfoRequestParams = {
    value: QuerySigningInfoRequest;
};
type querySigningInfoResponseParams = {
    value: QuerySigningInfoResponse;
};
type querySigningInfosResponseParams = {
    value: QuerySigningInfosResponse;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendSigningInfo({ value, fee, memo }: sendSigningInfoParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendMsgUnjail({ value, fee, memo }: sendMsgUnjailParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendMissedBlock({ value, fee, memo }: sendMissedBlockParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendQuerySigningInfosRequest({ value, fee, memo }: sendQuerySigningInfosRequestParams): Promise<DeliverTxResponse>;
    sendMsgUnjailResponse({ value, fee, memo }: sendMsgUnjailResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendValidatorMissedBlocks({ value, fee, memo }: sendValidatorMissedBlocksParams): Promise<DeliverTxResponse>;
    sendValidatorSigningInfo({ value, fee, memo }: sendValidatorSigningInfoParams): Promise<DeliverTxResponse>;
    sendQuerySigningInfoRequest({ value, fee, memo }: sendQuerySigningInfoRequestParams): Promise<DeliverTxResponse>;
    sendQuerySigningInfoResponse({ value, fee, memo }: sendQuerySigningInfoResponseParams): Promise<DeliverTxResponse>;
    sendQuerySigningInfosResponse({ value, fee, memo }: sendQuerySigningInfosResponseParams): Promise<DeliverTxResponse>;
    signingInfo({ value }: signingInfoParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    msgUnjail({ value }: msgUnjailParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    missedBlock({ value }: missedBlockParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    querySigningInfosRequest({ value }: querySigningInfosRequestParams): EncodeObject;
    msgUnjailResponse({ value }: msgUnjailResponseParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    validatorMissedBlocks({ value }: validatorMissedBlocksParams): EncodeObject;
    validatorSigningInfo({ value }: validatorSigningInfoParams): EncodeObject;
    querySigningInfoRequest({ value }: querySigningInfoRequestParams): EncodeObject;
    querySigningInfoResponse({ value }: querySigningInfoResponseParams): EncodeObject;
    querySigningInfosResponse({ value }: querySigningInfosResponseParams): EncodeObject;
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
