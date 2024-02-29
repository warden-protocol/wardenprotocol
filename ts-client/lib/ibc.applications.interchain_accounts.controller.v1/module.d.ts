import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgRegisterInterchainAccount } from "./types/ibc/applications/interchain_accounts/controller/v1/tx";
import { MsgUpdateParams } from "./types/ibc/applications/interchain_accounts/controller/v1/tx";
import { MsgRegisterInterchainAccountResponse } from "./types/ibc/applications/interchain_accounts/controller/v1/tx";
import { QueryParamsResponse } from "./types/ibc/applications/interchain_accounts/controller/v1/query";
import { Params } from "./types/ibc/applications/interchain_accounts/controller/v1/controller";
import { MsgSendTx } from "./types/ibc/applications/interchain_accounts/controller/v1/tx";
import { MsgUpdateParamsResponse } from "./types/ibc/applications/interchain_accounts/controller/v1/tx";
import { MsgSendTxResponse } from "./types/ibc/applications/interchain_accounts/controller/v1/tx";
import { QueryInterchainAccountResponse } from "./types/ibc/applications/interchain_accounts/controller/v1/query";
import { QueryParamsRequest } from "./types/ibc/applications/interchain_accounts/controller/v1/query";
import { QueryInterchainAccountRequest } from "./types/ibc/applications/interchain_accounts/controller/v1/query";
export { MsgRegisterInterchainAccount, MsgUpdateParams, MsgRegisterInterchainAccountResponse, QueryParamsResponse, Params, MsgSendTx, MsgUpdateParamsResponse, MsgSendTxResponse, QueryInterchainAccountResponse, QueryParamsRequest, QueryInterchainAccountRequest };
type sendMsgRegisterInterchainAccountParams = {
    value: MsgRegisterInterchainAccount;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRegisterInterchainAccountResponseParams = {
    value: MsgRegisterInterchainAccountResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSendTxParams = {
    value: MsgSendTx;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSendTxResponseParams = {
    value: MsgSendTxResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryInterchainAccountResponseParams = {
    value: QueryInterchainAccountResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryInterchainAccountRequestParams = {
    value: QueryInterchainAccountRequest;
    fee?: StdFee;
    memo?: string;
};
type msgRegisterInterchainAccountParams = {
    value: MsgRegisterInterchainAccount;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type msgRegisterInterchainAccountResponseParams = {
    value: MsgRegisterInterchainAccountResponse;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type paramsParams = {
    value: Params;
};
type msgSendTxParams = {
    value: MsgSendTx;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type msgSendTxResponseParams = {
    value: MsgSendTxResponse;
};
type queryInterchainAccountResponseParams = {
    value: QueryInterchainAccountResponse;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type queryInterchainAccountRequestParams = {
    value: QueryInterchainAccountRequest;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgRegisterInterchainAccount({ value, fee, memo }: sendMsgRegisterInterchainAccountParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendMsgRegisterInterchainAccountResponse({ value, fee, memo }: sendMsgRegisterInterchainAccountResponseParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendMsgSendTx({ value, fee, memo }: sendMsgSendTxParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendMsgSendTxResponse({ value, fee, memo }: sendMsgSendTxResponseParams): Promise<DeliverTxResponse>;
    sendQueryInterchainAccountResponse({ value, fee, memo }: sendQueryInterchainAccountResponseParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendQueryInterchainAccountRequest({ value, fee, memo }: sendQueryInterchainAccountRequestParams): Promise<DeliverTxResponse>;
    msgRegisterInterchainAccount({ value }: msgRegisterInterchainAccountParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    msgRegisterInterchainAccountResponse({ value }: msgRegisterInterchainAccountResponseParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    msgSendTx({ value }: msgSendTxParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    msgSendTxResponse({ value }: msgSendTxResponseParams): EncodeObject;
    queryInterchainAccountResponse({ value }: queryInterchainAccountResponseParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    queryInterchainAccountRequest({ value }: queryInterchainAccountRequestParams): EncodeObject;
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
        IbcApplicationsInterchainAccountsControllerV1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
