import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { SignDocDirectAux } from "./types/cosmos/tx/v1beta1/tx";
import { TxEncodeAminoRequest } from "./types/cosmos/tx/v1beta1/service";
import { SignDoc } from "./types/cosmos/tx/v1beta1/tx";
import { BroadcastTxResponse } from "./types/cosmos/tx/v1beta1/service";
import { GetTxRequest } from "./types/cosmos/tx/v1beta1/service";
import { GetBlockWithTxsRequest } from "./types/cosmos/tx/v1beta1/service";
import { TxEncodeRequest } from "./types/cosmos/tx/v1beta1/service";
import { Tx } from "./types/cosmos/tx/v1beta1/tx";
import { ModeInfo_Single } from "./types/cosmos/tx/v1beta1/tx";
import { Tip } from "./types/cosmos/tx/v1beta1/tx";
import { GetTxsEventResponse } from "./types/cosmos/tx/v1beta1/service";
import { TxDecodeResponse } from "./types/cosmos/tx/v1beta1/service";
import { ModeInfo_Multi } from "./types/cosmos/tx/v1beta1/tx";
import { AuxSignerData } from "./types/cosmos/tx/v1beta1/tx";
import { TxRaw } from "./types/cosmos/tx/v1beta1/tx";
import { AuthInfo } from "./types/cosmos/tx/v1beta1/tx";
import { Fee } from "./types/cosmos/tx/v1beta1/tx";
import { BroadcastTxRequest } from "./types/cosmos/tx/v1beta1/service";
import { GetTxResponse } from "./types/cosmos/tx/v1beta1/service";
import { TxEncodeAminoResponse } from "./types/cosmos/tx/v1beta1/service";
import { ModeInfo } from "./types/cosmos/tx/v1beta1/tx";
import { SimulateRequest } from "./types/cosmos/tx/v1beta1/service";
import { TxEncodeResponse } from "./types/cosmos/tx/v1beta1/service";
import { TxDecodeAminoResponse } from "./types/cosmos/tx/v1beta1/service";
import { GetTxsEventRequest } from "./types/cosmos/tx/v1beta1/service";
import { GetBlockWithTxsResponse } from "./types/cosmos/tx/v1beta1/service";
import { TxDecodeAminoRequest } from "./types/cosmos/tx/v1beta1/service";
import { SimulateResponse } from "./types/cosmos/tx/v1beta1/service";
import { TxDecodeRequest } from "./types/cosmos/tx/v1beta1/service";
import { TxBody } from "./types/cosmos/tx/v1beta1/tx";
import { SignerInfo } from "./types/cosmos/tx/v1beta1/tx";
export { SignDocDirectAux, TxEncodeAminoRequest, SignDoc, BroadcastTxResponse, GetTxRequest, GetBlockWithTxsRequest, TxEncodeRequest, Tx, ModeInfo_Single, Tip, GetTxsEventResponse, TxDecodeResponse, ModeInfo_Multi, AuxSignerData, TxRaw, AuthInfo, Fee, BroadcastTxRequest, GetTxResponse, TxEncodeAminoResponse, ModeInfo, SimulateRequest, TxEncodeResponse, TxDecodeAminoResponse, GetTxsEventRequest, GetBlockWithTxsResponse, TxDecodeAminoRequest, SimulateResponse, TxDecodeRequest, TxBody, SignerInfo };
type sendSignDocDirectAuxParams = {
    value: SignDocDirectAux;
    fee?: StdFee;
    memo?: string;
};
type sendTxEncodeAminoRequestParams = {
    value: TxEncodeAminoRequest;
    fee?: StdFee;
    memo?: string;
};
type sendSignDocParams = {
    value: SignDoc;
    fee?: StdFee;
    memo?: string;
};
type sendBroadcastTxResponseParams = {
    value: BroadcastTxResponse;
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
type sendTxEncodeRequestParams = {
    value: TxEncodeRequest;
    fee?: StdFee;
    memo?: string;
};
type sendTxParams = {
    value: Tx;
    fee?: StdFee;
    memo?: string;
};
type sendModeInfo_SingleParams = {
    value: ModeInfo_Single;
    fee?: StdFee;
    memo?: string;
};
type sendTipParams = {
    value: Tip;
    fee?: StdFee;
    memo?: string;
};
type sendGetTxsEventResponseParams = {
    value: GetTxsEventResponse;
    fee?: StdFee;
    memo?: string;
};
type sendTxDecodeResponseParams = {
    value: TxDecodeResponse;
    fee?: StdFee;
    memo?: string;
};
type sendModeInfo_MultiParams = {
    value: ModeInfo_Multi;
    fee?: StdFee;
    memo?: string;
};
type sendAuxSignerDataParams = {
    value: AuxSignerData;
    fee?: StdFee;
    memo?: string;
};
type sendTxRawParams = {
    value: TxRaw;
    fee?: StdFee;
    memo?: string;
};
type sendAuthInfoParams = {
    value: AuthInfo;
    fee?: StdFee;
    memo?: string;
};
type sendFeeParams = {
    value: Fee;
    fee?: StdFee;
    memo?: string;
};
type sendBroadcastTxRequestParams = {
    value: BroadcastTxRequest;
    fee?: StdFee;
    memo?: string;
};
type sendGetTxResponseParams = {
    value: GetTxResponse;
    fee?: StdFee;
    memo?: string;
};
type sendTxEncodeAminoResponseParams = {
    value: TxEncodeAminoResponse;
    fee?: StdFee;
    memo?: string;
};
type sendModeInfoParams = {
    value: ModeInfo;
    fee?: StdFee;
    memo?: string;
};
type sendSimulateRequestParams = {
    value: SimulateRequest;
    fee?: StdFee;
    memo?: string;
};
type sendTxEncodeResponseParams = {
    value: TxEncodeResponse;
    fee?: StdFee;
    memo?: string;
};
type sendTxDecodeAminoResponseParams = {
    value: TxDecodeAminoResponse;
    fee?: StdFee;
    memo?: string;
};
type sendGetTxsEventRequestParams = {
    value: GetTxsEventRequest;
    fee?: StdFee;
    memo?: string;
};
type sendGetBlockWithTxsResponseParams = {
    value: GetBlockWithTxsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendTxDecodeAminoRequestParams = {
    value: TxDecodeAminoRequest;
    fee?: StdFee;
    memo?: string;
};
type sendSimulateResponseParams = {
    value: SimulateResponse;
    fee?: StdFee;
    memo?: string;
};
type sendTxDecodeRequestParams = {
    value: TxDecodeRequest;
    fee?: StdFee;
    memo?: string;
};
type sendTxBodyParams = {
    value: TxBody;
    fee?: StdFee;
    memo?: string;
};
type sendSignerInfoParams = {
    value: SignerInfo;
    fee?: StdFee;
    memo?: string;
};
type signDocDirectAuxParams = {
    value: SignDocDirectAux;
};
type txEncodeAminoRequestParams = {
    value: TxEncodeAminoRequest;
};
type signDocParams = {
    value: SignDoc;
};
type broadcastTxResponseParams = {
    value: BroadcastTxResponse;
};
type getTxRequestParams = {
    value: GetTxRequest;
};
type getBlockWithTxsRequestParams = {
    value: GetBlockWithTxsRequest;
};
type txEncodeRequestParams = {
    value: TxEncodeRequest;
};
type txParams = {
    value: Tx;
};
type modeInfoSingleParams = {
    value: ModeInfo_Single;
};
type tipParams = {
    value: Tip;
};
type getTxsEventResponseParams = {
    value: GetTxsEventResponse;
};
type txDecodeResponseParams = {
    value: TxDecodeResponse;
};
type modeInfoMultiParams = {
    value: ModeInfo_Multi;
};
type auxSignerDataParams = {
    value: AuxSignerData;
};
type txRawParams = {
    value: TxRaw;
};
type authInfoParams = {
    value: AuthInfo;
};
type feeParams = {
    value: Fee;
};
type broadcastTxRequestParams = {
    value: BroadcastTxRequest;
};
type getTxResponseParams = {
    value: GetTxResponse;
};
type txEncodeAminoResponseParams = {
    value: TxEncodeAminoResponse;
};
type modeInfoParams = {
    value: ModeInfo;
};
type simulateRequestParams = {
    value: SimulateRequest;
};
type txEncodeResponseParams = {
    value: TxEncodeResponse;
};
type txDecodeAminoResponseParams = {
    value: TxDecodeAminoResponse;
};
type getTxsEventRequestParams = {
    value: GetTxsEventRequest;
};
type getBlockWithTxsResponseParams = {
    value: GetBlockWithTxsResponse;
};
type txDecodeAminoRequestParams = {
    value: TxDecodeAminoRequest;
};
type simulateResponseParams = {
    value: SimulateResponse;
};
type txDecodeRequestParams = {
    value: TxDecodeRequest;
};
type txBodyParams = {
    value: TxBody;
};
type signerInfoParams = {
    value: SignerInfo;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendSignDocDirectAux({ value, fee, memo }: sendSignDocDirectAuxParams): Promise<DeliverTxResponse>;
    sendTxEncodeAminoRequest({ value, fee, memo }: sendTxEncodeAminoRequestParams): Promise<DeliverTxResponse>;
    sendSignDoc({ value, fee, memo }: sendSignDocParams): Promise<DeliverTxResponse>;
    sendBroadcastTxResponse({ value, fee, memo }: sendBroadcastTxResponseParams): Promise<DeliverTxResponse>;
    sendGetTxRequest({ value, fee, memo }: sendGetTxRequestParams): Promise<DeliverTxResponse>;
    sendGetBlockWithTxsRequest({ value, fee, memo }: sendGetBlockWithTxsRequestParams): Promise<DeliverTxResponse>;
    sendTxEncodeRequest({ value, fee, memo }: sendTxEncodeRequestParams): Promise<DeliverTxResponse>;
    sendTx({ value, fee, memo }: sendTxParams): Promise<DeliverTxResponse>;
    sendModeInfo_Single({ value, fee, memo }: sendModeInfo_SingleParams): Promise<DeliverTxResponse>;
    sendTip({ value, fee, memo }: sendTipParams): Promise<DeliverTxResponse>;
    sendGetTxsEventResponse({ value, fee, memo }: sendGetTxsEventResponseParams): Promise<DeliverTxResponse>;
    sendTxDecodeResponse({ value, fee, memo }: sendTxDecodeResponseParams): Promise<DeliverTxResponse>;
    sendModeInfo_Multi({ value, fee, memo }: sendModeInfo_MultiParams): Promise<DeliverTxResponse>;
    sendAuxSignerData({ value, fee, memo }: sendAuxSignerDataParams): Promise<DeliverTxResponse>;
    sendTxRaw({ value, fee, memo }: sendTxRawParams): Promise<DeliverTxResponse>;
    sendAuthInfo({ value, fee, memo }: sendAuthInfoParams): Promise<DeliverTxResponse>;
    sendFee({ value, fee, memo }: sendFeeParams): Promise<DeliverTxResponse>;
    sendBroadcastTxRequest({ value, fee, memo }: sendBroadcastTxRequestParams): Promise<DeliverTxResponse>;
    sendGetTxResponse({ value, fee, memo }: sendGetTxResponseParams): Promise<DeliverTxResponse>;
    sendTxEncodeAminoResponse({ value, fee, memo }: sendTxEncodeAminoResponseParams): Promise<DeliverTxResponse>;
    sendModeInfo({ value, fee, memo }: sendModeInfoParams): Promise<DeliverTxResponse>;
    sendSimulateRequest({ value, fee, memo }: sendSimulateRequestParams): Promise<DeliverTxResponse>;
    sendTxEncodeResponse({ value, fee, memo }: sendTxEncodeResponseParams): Promise<DeliverTxResponse>;
    sendTxDecodeAminoResponse({ value, fee, memo }: sendTxDecodeAminoResponseParams): Promise<DeliverTxResponse>;
    sendGetTxsEventRequest({ value, fee, memo }: sendGetTxsEventRequestParams): Promise<DeliverTxResponse>;
    sendGetBlockWithTxsResponse({ value, fee, memo }: sendGetBlockWithTxsResponseParams): Promise<DeliverTxResponse>;
    sendTxDecodeAminoRequest({ value, fee, memo }: sendTxDecodeAminoRequestParams): Promise<DeliverTxResponse>;
    sendSimulateResponse({ value, fee, memo }: sendSimulateResponseParams): Promise<DeliverTxResponse>;
    sendTxDecodeRequest({ value, fee, memo }: sendTxDecodeRequestParams): Promise<DeliverTxResponse>;
    sendTxBody({ value, fee, memo }: sendTxBodyParams): Promise<DeliverTxResponse>;
    sendSignerInfo({ value, fee, memo }: sendSignerInfoParams): Promise<DeliverTxResponse>;
    signDocDirectAux({ value }: signDocDirectAuxParams): EncodeObject;
    txEncodeAminoRequest({ value }: txEncodeAminoRequestParams): EncodeObject;
    signDoc({ value }: signDocParams): EncodeObject;
    broadcastTxResponse({ value }: broadcastTxResponseParams): EncodeObject;
    getTxRequest({ value }: getTxRequestParams): EncodeObject;
    getBlockWithTxsRequest({ value }: getBlockWithTxsRequestParams): EncodeObject;
    txEncodeRequest({ value }: txEncodeRequestParams): EncodeObject;
    tx({ value }: txParams): EncodeObject;
    modeInfoSingle({ value }: modeInfoSingleParams): EncodeObject;
    tip({ value }: tipParams): EncodeObject;
    getTxsEventResponse({ value }: getTxsEventResponseParams): EncodeObject;
    txDecodeResponse({ value }: txDecodeResponseParams): EncodeObject;
    modeInfoMulti({ value }: modeInfoMultiParams): EncodeObject;
    auxSignerData({ value }: auxSignerDataParams): EncodeObject;
    txRaw({ value }: txRawParams): EncodeObject;
    authInfo({ value }: authInfoParams): EncodeObject;
    fee({ value }: feeParams): EncodeObject;
    broadcastTxRequest({ value }: broadcastTxRequestParams): EncodeObject;
    getTxResponse({ value }: getTxResponseParams): EncodeObject;
    txEncodeAminoResponse({ value }: txEncodeAminoResponseParams): EncodeObject;
    modeInfo({ value }: modeInfoParams): EncodeObject;
    simulateRequest({ value }: simulateRequestParams): EncodeObject;
    txEncodeResponse({ value }: txEncodeResponseParams): EncodeObject;
    txDecodeAminoResponse({ value }: txDecodeAminoResponseParams): EncodeObject;
    getTxsEventRequest({ value }: getTxsEventRequestParams): EncodeObject;
    getBlockWithTxsResponse({ value }: getBlockWithTxsResponseParams): EncodeObject;
    txDecodeAminoRequest({ value }: txDecodeAminoRequestParams): EncodeObject;
    simulateResponse({ value }: simulateResponseParams): EncodeObject;
    txDecodeRequest({ value }: txDecodeRequestParams): EncodeObject;
    txBody({ value }: txBodyParams): EncodeObject;
    signerInfo({ value }: signerInfoParams): EncodeObject;
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
