import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { SimulateResponse } from "./types/cosmos/tx/v1beta1/service";
import { SignDocDirectAux } from "./types/cosmos/tx/v1beta1/tx";
import { BroadcastTxResponse } from "./types/cosmos/tx/v1beta1/service";
import { TxDecodeResponse } from "./types/cosmos/tx/v1beta1/service";
import { TxEncodeAminoResponse } from "./types/cosmos/tx/v1beta1/service";
import { SignerInfo } from "./types/cosmos/tx/v1beta1/tx";
import { SimulateRequest } from "./types/cosmos/tx/v1beta1/service";
import { TxDecodeAminoRequest } from "./types/cosmos/tx/v1beta1/service";
import { AuxSignerData } from "./types/cosmos/tx/v1beta1/tx";
import { GetBlockWithTxsResponse } from "./types/cosmos/tx/v1beta1/service";
import { TxEncodeResponse } from "./types/cosmos/tx/v1beta1/service";
import { SignDoc } from "./types/cosmos/tx/v1beta1/tx";
import { Fee } from "./types/cosmos/tx/v1beta1/tx";
import { GetTxRequest } from "./types/cosmos/tx/v1beta1/service";
import { GetBlockWithTxsRequest } from "./types/cosmos/tx/v1beta1/service";
import { TxDecodeAminoResponse } from "./types/cosmos/tx/v1beta1/service";
import { TxRaw } from "./types/cosmos/tx/v1beta1/tx";
import { ModeInfo } from "./types/cosmos/tx/v1beta1/tx";
import { ModeInfo_Single } from "./types/cosmos/tx/v1beta1/tx";
import { TxDecodeRequest } from "./types/cosmos/tx/v1beta1/service";
import { AuthInfo } from "./types/cosmos/tx/v1beta1/tx";
import { Tip } from "./types/cosmos/tx/v1beta1/tx";
import { GetTxsEventRequest } from "./types/cosmos/tx/v1beta1/service";
import { BroadcastTxRequest } from "./types/cosmos/tx/v1beta1/service";
import { TxEncodeAminoRequest } from "./types/cosmos/tx/v1beta1/service";
import { Tx } from "./types/cosmos/tx/v1beta1/tx";
import { TxBody } from "./types/cosmos/tx/v1beta1/tx";
import { GetTxsEventResponse } from "./types/cosmos/tx/v1beta1/service";
import { GetTxResponse } from "./types/cosmos/tx/v1beta1/service";
import { TxEncodeRequest } from "./types/cosmos/tx/v1beta1/service";
import { ModeInfo_Multi } from "./types/cosmos/tx/v1beta1/tx";
export { SimulateResponse, SignDocDirectAux, BroadcastTxResponse, TxDecodeResponse, TxEncodeAminoResponse, SignerInfo, SimulateRequest, TxDecodeAminoRequest, AuxSignerData, GetBlockWithTxsResponse, TxEncodeResponse, SignDoc, Fee, GetTxRequest, GetBlockWithTxsRequest, TxDecodeAminoResponse, TxRaw, ModeInfo, ModeInfo_Single, TxDecodeRequest, AuthInfo, Tip, GetTxsEventRequest, BroadcastTxRequest, TxEncodeAminoRequest, Tx, TxBody, GetTxsEventResponse, GetTxResponse, TxEncodeRequest, ModeInfo_Multi };
type sendSimulateResponseParams = {
    value: SimulateResponse;
    fee?: StdFee;
    memo?: string;
};
type sendSignDocDirectAuxParams = {
    value: SignDocDirectAux;
    fee?: StdFee;
    memo?: string;
};
type sendBroadcastTxResponseParams = {
    value: BroadcastTxResponse;
    fee?: StdFee;
    memo?: string;
};
type sendTxDecodeResponseParams = {
    value: TxDecodeResponse;
    fee?: StdFee;
    memo?: string;
};
type sendTxEncodeAminoResponseParams = {
    value: TxEncodeAminoResponse;
    fee?: StdFee;
    memo?: string;
};
type sendSignerInfoParams = {
    value: SignerInfo;
    fee?: StdFee;
    memo?: string;
};
type sendSimulateRequestParams = {
    value: SimulateRequest;
    fee?: StdFee;
    memo?: string;
};
type sendTxDecodeAminoRequestParams = {
    value: TxDecodeAminoRequest;
    fee?: StdFee;
    memo?: string;
};
type sendAuxSignerDataParams = {
    value: AuxSignerData;
    fee?: StdFee;
    memo?: string;
};
type sendGetBlockWithTxsResponseParams = {
    value: GetBlockWithTxsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendTxEncodeResponseParams = {
    value: TxEncodeResponse;
    fee?: StdFee;
    memo?: string;
};
type sendSignDocParams = {
    value: SignDoc;
    fee?: StdFee;
    memo?: string;
};
type sendFeeParams = {
    value: Fee;
    fee?: StdFee;
    memo?: string;
};
type sendGetTxRequestParams = {
    value: GetTxRequest;
    fee?: StdFee;
    memo?: string;
};
type sendGetBlockWithTxsRequestParams = {
    value: GetBlockWithTxsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendTxDecodeAminoResponseParams = {
    value: TxDecodeAminoResponse;
    fee?: StdFee;
    memo?: string;
};
type sendTxRawParams = {
    value: TxRaw;
    fee?: StdFee;
    memo?: string;
};
type sendModeInfoParams = {
    value: ModeInfo;
    fee?: StdFee;
    memo?: string;
};
type sendModeInfo_SingleParams = {
    value: ModeInfo_Single;
    fee?: StdFee;
    memo?: string;
};
type sendTxDecodeRequestParams = {
    value: TxDecodeRequest;
    fee?: StdFee;
    memo?: string;
};
type sendAuthInfoParams = {
    value: AuthInfo;
    fee?: StdFee;
    memo?: string;
};
type sendTipParams = {
    value: Tip;
    fee?: StdFee;
    memo?: string;
};
type sendGetTxsEventRequestParams = {
    value: GetTxsEventRequest;
    fee?: StdFee;
    memo?: string;
};
type sendBroadcastTxRequestParams = {
    value: BroadcastTxRequest;
    fee?: StdFee;
    memo?: string;
};
type sendTxEncodeAminoRequestParams = {
    value: TxEncodeAminoRequest;
    fee?: StdFee;
    memo?: string;
};
type sendTxParams = {
    value: Tx;
    fee?: StdFee;
    memo?: string;
};
type sendTxBodyParams = {
    value: TxBody;
    fee?: StdFee;
    memo?: string;
};
type sendGetTxsEventResponseParams = {
    value: GetTxsEventResponse;
    fee?: StdFee;
    memo?: string;
};
type sendGetTxResponseParams = {
    value: GetTxResponse;
    fee?: StdFee;
    memo?: string;
};
type sendTxEncodeRequestParams = {
    value: TxEncodeRequest;
    fee?: StdFee;
    memo?: string;
};
type sendModeInfo_MultiParams = {
    value: ModeInfo_Multi;
    fee?: StdFee;
    memo?: string;
};
type simulateResponseParams = {
    value: SimulateResponse;
};
type signDocDirectAuxParams = {
    value: SignDocDirectAux;
};
type broadcastTxResponseParams = {
    value: BroadcastTxResponse;
};
type txDecodeResponseParams = {
    value: TxDecodeResponse;
};
type txEncodeAminoResponseParams = {
    value: TxEncodeAminoResponse;
};
type signerInfoParams = {
    value: SignerInfo;
};
type simulateRequestParams = {
    value: SimulateRequest;
};
type txDecodeAminoRequestParams = {
    value: TxDecodeAminoRequest;
};
type auxSignerDataParams = {
    value: AuxSignerData;
};
type getBlockWithTxsResponseParams = {
    value: GetBlockWithTxsResponse;
};
type txEncodeResponseParams = {
    value: TxEncodeResponse;
};
type signDocParams = {
    value: SignDoc;
};
type feeParams = {
    value: Fee;
};
type getTxRequestParams = {
    value: GetTxRequest;
};
type getBlockWithTxsRequestParams = {
    value: GetBlockWithTxsRequest;
};
type txDecodeAminoResponseParams = {
    value: TxDecodeAminoResponse;
};
type txRawParams = {
    value: TxRaw;
};
type modeInfoParams = {
    value: ModeInfo;
};
type modeInfoSingleParams = {
    value: ModeInfo_Single;
};
type txDecodeRequestParams = {
    value: TxDecodeRequest;
};
type authInfoParams = {
    value: AuthInfo;
};
type tipParams = {
    value: Tip;
};
type getTxsEventRequestParams = {
    value: GetTxsEventRequest;
};
type broadcastTxRequestParams = {
    value: BroadcastTxRequest;
};
type txEncodeAminoRequestParams = {
    value: TxEncodeAminoRequest;
};
type txParams = {
    value: Tx;
};
type txBodyParams = {
    value: TxBody;
};
type getTxsEventResponseParams = {
    value: GetTxsEventResponse;
};
type getTxResponseParams = {
    value: GetTxResponse;
};
type txEncodeRequestParams = {
    value: TxEncodeRequest;
};
type modeInfoMultiParams = {
    value: ModeInfo_Multi;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendSimulateResponse({ value, fee, memo }: sendSimulateResponseParams): Promise<DeliverTxResponse>;
    sendSignDocDirectAux({ value, fee, memo }: sendSignDocDirectAuxParams): Promise<DeliverTxResponse>;
    sendBroadcastTxResponse({ value, fee, memo }: sendBroadcastTxResponseParams): Promise<DeliverTxResponse>;
    sendTxDecodeResponse({ value, fee, memo }: sendTxDecodeResponseParams): Promise<DeliverTxResponse>;
    sendTxEncodeAminoResponse({ value, fee, memo }: sendTxEncodeAminoResponseParams): Promise<DeliverTxResponse>;
    sendSignerInfo({ value, fee, memo }: sendSignerInfoParams): Promise<DeliverTxResponse>;
    sendSimulateRequest({ value, fee, memo }: sendSimulateRequestParams): Promise<DeliverTxResponse>;
    sendTxDecodeAminoRequest({ value, fee, memo }: sendTxDecodeAminoRequestParams): Promise<DeliverTxResponse>;
    sendAuxSignerData({ value, fee, memo }: sendAuxSignerDataParams): Promise<DeliverTxResponse>;
    sendGetBlockWithTxsResponse({ value, fee, memo }: sendGetBlockWithTxsResponseParams): Promise<DeliverTxResponse>;
    sendTxEncodeResponse({ value, fee, memo }: sendTxEncodeResponseParams): Promise<DeliverTxResponse>;
    sendSignDoc({ value, fee, memo }: sendSignDocParams): Promise<DeliverTxResponse>;
    sendFee({ value, fee, memo }: sendFeeParams): Promise<DeliverTxResponse>;
    sendGetTxRequest({ value, fee, memo }: sendGetTxRequestParams): Promise<DeliverTxResponse>;
    sendGetBlockWithTxsRequest({ value, fee, memo }: sendGetBlockWithTxsRequestParams): Promise<DeliverTxResponse>;
    sendTxDecodeAminoResponse({ value, fee, memo }: sendTxDecodeAminoResponseParams): Promise<DeliverTxResponse>;
    sendTxRaw({ value, fee, memo }: sendTxRawParams): Promise<DeliverTxResponse>;
    sendModeInfo({ value, fee, memo }: sendModeInfoParams): Promise<DeliverTxResponse>;
    sendModeInfo_Single({ value, fee, memo }: sendModeInfo_SingleParams): Promise<DeliverTxResponse>;
    sendTxDecodeRequest({ value, fee, memo }: sendTxDecodeRequestParams): Promise<DeliverTxResponse>;
    sendAuthInfo({ value, fee, memo }: sendAuthInfoParams): Promise<DeliverTxResponse>;
    sendTip({ value, fee, memo }: sendTipParams): Promise<DeliverTxResponse>;
    sendGetTxsEventRequest({ value, fee, memo }: sendGetTxsEventRequestParams): Promise<DeliverTxResponse>;
    sendBroadcastTxRequest({ value, fee, memo }: sendBroadcastTxRequestParams): Promise<DeliverTxResponse>;
    sendTxEncodeAminoRequest({ value, fee, memo }: sendTxEncodeAminoRequestParams): Promise<DeliverTxResponse>;
    sendTx({ value, fee, memo }: sendTxParams): Promise<DeliverTxResponse>;
    sendTxBody({ value, fee, memo }: sendTxBodyParams): Promise<DeliverTxResponse>;
    sendGetTxsEventResponse({ value, fee, memo }: sendGetTxsEventResponseParams): Promise<DeliverTxResponse>;
    sendGetTxResponse({ value, fee, memo }: sendGetTxResponseParams): Promise<DeliverTxResponse>;
    sendTxEncodeRequest({ value, fee, memo }: sendTxEncodeRequestParams): Promise<DeliverTxResponse>;
    sendModeInfo_Multi({ value, fee, memo }: sendModeInfo_MultiParams): Promise<DeliverTxResponse>;
    simulateResponse({ value }: simulateResponseParams): EncodeObject;
    signDocDirectAux({ value }: signDocDirectAuxParams): EncodeObject;
    broadcastTxResponse({ value }: broadcastTxResponseParams): EncodeObject;
    txDecodeResponse({ value }: txDecodeResponseParams): EncodeObject;
    txEncodeAminoResponse({ value }: txEncodeAminoResponseParams): EncodeObject;
    signerInfo({ value }: signerInfoParams): EncodeObject;
    simulateRequest({ value }: simulateRequestParams): EncodeObject;
    txDecodeAminoRequest({ value }: txDecodeAminoRequestParams): EncodeObject;
    auxSignerData({ value }: auxSignerDataParams): EncodeObject;
    getBlockWithTxsResponse({ value }: getBlockWithTxsResponseParams): EncodeObject;
    txEncodeResponse({ value }: txEncodeResponseParams): EncodeObject;
    signDoc({ value }: signDocParams): EncodeObject;
    fee({ value }: feeParams): EncodeObject;
    getTxRequest({ value }: getTxRequestParams): EncodeObject;
    getBlockWithTxsRequest({ value }: getBlockWithTxsRequestParams): EncodeObject;
    txDecodeAminoResponse({ value }: txDecodeAminoResponseParams): EncodeObject;
    txRaw({ value }: txRawParams): EncodeObject;
    modeInfo({ value }: modeInfoParams): EncodeObject;
    modeInfoSingle({ value }: modeInfoSingleParams): EncodeObject;
    txDecodeRequest({ value }: txDecodeRequestParams): EncodeObject;
    authInfo({ value }: authInfoParams): EncodeObject;
    tip({ value }: tipParams): EncodeObject;
    getTxsEventRequest({ value }: getTxsEventRequestParams): EncodeObject;
    broadcastTxRequest({ value }: broadcastTxRequestParams): EncodeObject;
    txEncodeAminoRequest({ value }: txEncodeAminoRequestParams): EncodeObject;
    tx({ value }: txParams): EncodeObject;
    txBody({ value }: txBodyParams): EncodeObject;
    getTxsEventResponse({ value }: getTxsEventResponseParams): EncodeObject;
    getTxResponse({ value }: getTxResponseParams): EncodeObject;
    txEncodeRequest({ value }: txEncodeRequestParams): EncodeObject;
    modeInfoMulti({ value }: modeInfoMultiParams): EncodeObject;
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
        CosmosTxV1Beta1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
