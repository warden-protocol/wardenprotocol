import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { StatusRequest } from "./types/cosmos/base/node/v1beta1/query";
import { StatusResponse } from "./types/cosmos/base/node/v1beta1/query";
import { ConfigRequest } from "./types/cosmos/base/node/v1beta1/query";
import { ConfigResponse } from "./types/cosmos/base/node/v1beta1/query";
export { StatusRequest, StatusResponse, ConfigRequest, ConfigResponse };
type sendStatusRequestParams = {
    value: StatusRequest;
    fee?: StdFee;
    memo?: string;
};
type sendStatusResponseParams = {
    value: StatusResponse;
    fee?: StdFee;
    memo?: string;
};
type sendConfigRequestParams = {
    value: ConfigRequest;
    fee?: StdFee;
    memo?: string;
};
type sendConfigResponseParams = {
    value: ConfigResponse;
    fee?: StdFee;
    memo?: string;
};
type statusRequestParams = {
    value: StatusRequest;
};
type statusResponseParams = {
    value: StatusResponse;
};
type configRequestParams = {
    value: ConfigRequest;
};
type configResponseParams = {
    value: ConfigResponse;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendStatusRequest({ value, fee, memo }: sendStatusRequestParams): Promise<DeliverTxResponse>;
    sendStatusResponse({ value, fee, memo }: sendStatusResponseParams): Promise<DeliverTxResponse>;
    sendConfigRequest({ value, fee, memo }: sendConfigRequestParams): Promise<DeliverTxResponse>;
    sendConfigResponse({ value, fee, memo }: sendConfigResponseParams): Promise<DeliverTxResponse>;
    statusRequest({ value }: statusRequestParams): EncodeObject;
    statusResponse({ value }: statusResponseParams): EncodeObject;
    configRequest({ value }: configRequestParams): EncodeObject;
    configResponse({ value }: configResponseParams): EncodeObject;
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
        CosmosBaseNodeV1Beta1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
