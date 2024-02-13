import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { BroadcastTxResponse } from "./types/cosmos/tx/v1beta1/service";
import { TxDecodeAminoRequest } from "./types/cosmos/tx/v1beta1/service";
import { SignDocDirectAux } from "./types/cosmos/tx/v1beta1/tx";
import { SignerInfo } from "./types/cosmos/tx/v1beta1/tx";
import { ModeInfo } from "./types/cosmos/tx/v1beta1/tx";
import { GetBlockWithTxsRequest } from "./types/cosmos/tx/v1beta1/service";
import { TxDecodeRequest } from "./types/cosmos/tx/v1beta1/service";
import { TxEncodeRequest } from "./types/cosmos/tx/v1beta1/service";
import { ModeInfo_Multi } from "./types/cosmos/tx/v1beta1/tx";
import { GetTxResponse } from "./types/cosmos/tx/v1beta1/service";
import { TxEncodeAminoResponse } from "./types/cosmos/tx/v1beta1/service";
import { Tip } from "./types/cosmos/tx/v1beta1/tx";
import { GetBlockWithTxsResponse } from "./types/cosmos/tx/v1beta1/service";
import { AuthInfo } from "./types/cosmos/tx/v1beta1/tx";
import { GetTxsEventRequest } from "./types/cosmos/tx/v1beta1/service";
import { GetTxsEventResponse } from "./types/cosmos/tx/v1beta1/service";
import { SimulateResponse } from "./types/cosmos/tx/v1beta1/service";
import { TxRaw } from "./types/cosmos/tx/v1beta1/tx";
import { SimulateRequest } from "./types/cosmos/tx/v1beta1/service";
import { GetTxRequest } from "./types/cosmos/tx/v1beta1/service";
import { Tx } from "./types/cosmos/tx/v1beta1/tx";
import { AuxSignerData } from "./types/cosmos/tx/v1beta1/tx";
import { BroadcastTxRequest } from "./types/cosmos/tx/v1beta1/service";
import { TxDecodeResponse } from "./types/cosmos/tx/v1beta1/service";
import { TxDecodeAminoResponse } from "./types/cosmos/tx/v1beta1/service";
import { TxBody } from "./types/cosmos/tx/v1beta1/tx";
import { ModeInfo_Single } from "./types/cosmos/tx/v1beta1/tx";
import { Fee } from "./types/cosmos/tx/v1beta1/tx";
import { TxEncodeResponse } from "./types/cosmos/tx/v1beta1/service";
import { TxEncodeAminoRequest } from "./types/cosmos/tx/v1beta1/service";
import { SignDoc } from "./types/cosmos/tx/v1beta1/tx";
export { BroadcastTxResponse, TxDecodeAminoRequest, SignDocDirectAux, SignerInfo, ModeInfo, GetBlockWithTxsRequest, TxDecodeRequest, TxEncodeRequest, ModeInfo_Multi, GetTxResponse, TxEncodeAminoResponse, Tip, GetBlockWithTxsResponse, AuthInfo, GetTxsEventRequest, GetTxsEventResponse, SimulateResponse, TxRaw, SimulateRequest, GetTxRequest, Tx, AuxSignerData, BroadcastTxRequest, TxDecodeResponse, TxDecodeAminoResponse, TxBody, ModeInfo_Single, Fee, TxEncodeResponse, TxEncodeAminoRequest, SignDoc };
type sendBroadcastTxResponseParams = {
    value: BroadcastTxResponse;
    fee?: StdFee;
    memo?: string;
};
type sendTxDecodeAminoRequestParams = {
    value: TxDecodeAminoRequest;
    fee?: StdFee;
    memo?: string;
};
type sendSignDocDirectAuxParams = {
    value: SignDocDirectAux;
    fee?: StdFee;
    memo?: string;
};
type sendSignerInfoParams = {
    value: SignerInfo;
    fee?: StdFee;
    memo?: string;
};
type sendModeInfoParams = {
    value: ModeInfo;
    fee?: StdFee;
    memo?: string;
};
type sendGetBlockWithTxsRequestParams = {
    value: GetBlockWithTxsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendTxDecodeRequestParams = {
    value: TxDecodeRequest;
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
type sendTipParams = {
    value: Tip;
    fee?: StdFee;
    memo?: string;
};
type sendGetBlockWithTxsResponseParams = {
    value: GetBlockWithTxsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendAuthInfoParams = {
    value: AuthInfo;
    fee?: StdFee;
    memo?: string;
};
type sendGetTxsEventRequestParams = {
    value: GetTxsEventRequest;
    fee?: StdFee;
    memo?: string;
};
type sendGetTxsEventResponseParams = {
    value: GetTxsEventResponse;
    fee?: StdFee;
    memo?: string;
};
type sendSimulateResponseParams = {
    value: SimulateResponse;
    fee?: StdFee;
    memo?: string;
};
type sendTxRawParams = {
    value: TxRaw;
    fee?: StdFee;
    memo?: string;
};
type sendSimulateRequestParams = {
    value: SimulateRequest;
    fee?: StdFee;
    memo?: string;
};
type sendGetTxRequestParams = {
    value: GetTxRequest;
    fee?: StdFee;
    memo?: string;
};
type sendTxParams = {
    value: Tx;
    fee?: StdFee;
    memo?: string;
};
type sendAuxSignerDataParams = {
    value: AuxSignerData;
    fee?: StdFee;
    memo?: string;
};
type sendBroadcastTxRequestParams = {
    value: BroadcastTxRequest;
    fee?: StdFee;
    memo?: string;
};
type sendTxDecodeResponseParams = {
    value: TxDecodeResponse;
    fee?: StdFee;
    memo?: string;
};
type sendTxDecodeAminoResponseParams = {
    value: TxDecodeAminoResponse;
    fee?: StdFee;
    memo?: string;
};
type sendTxBodyParams = {
    value: TxBody;
    fee?: StdFee;
    memo?: string;
};
type sendModeInfo_SingleParams = {
    value: ModeInfo_Single;
    fee?: StdFee;
    memo?: string;
};
type sendFeeParams = {
    value: Fee;
    fee?: StdFee;
    memo?: string;
};
type sendTxEncodeResponseParams = {
    value: TxEncodeResponse;
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
type broadcastTxResponseParams = {
    value: BroadcastTxResponse;
};
type txDecodeAminoRequestParams = {
    value: TxDecodeAminoRequest;
};
type signDocDirectAuxParams = {
    value: SignDocDirectAux;
};
type signerInfoParams = {
    value: SignerInfo;
};
type modeInfoParams = {
    value: ModeInfo;
};
type getBlockWithTxsRequestParams = {
    value: GetBlockWithTxsRequest;
};
type txDecodeRequestParams = {
    value: TxDecodeRequest;
};
type txEncodeRequestParams = {
    value: TxEncodeRequest;
};
type modeInfoMultiParams = {
    value: ModeInfo_Multi;
};
type getTxResponseParams = {
    value: GetTxResponse;
};
type txEncodeAminoResponseParams = {
    value: TxEncodeAminoResponse;
};
type tipParams = {
    value: Tip;
};
type getBlockWithTxsResponseParams = {
    value: GetBlockWithTxsResponse;
};
type authInfoParams = {
    value: AuthInfo;
};
type getTxsEventRequestParams = {
    value: GetTxsEventRequest;
};
type getTxsEventResponseParams = {
    value: GetTxsEventResponse;
};
type simulateResponseParams = {
    value: SimulateResponse;
};
type txRawParams = {
    value: TxRaw;
};
type simulateRequestParams = {
    value: SimulateRequest;
};
type getTxRequestParams = {
    value: GetTxRequest;
};
type txParams = {
    value: Tx;
};
type auxSignerDataParams = {
    value: AuxSignerData;
};
type broadcastTxRequestParams = {
    value: BroadcastTxRequest;
};
type txDecodeResponseParams = {
    value: TxDecodeResponse;
};
type txDecodeAminoResponseParams = {
    value: TxDecodeAminoResponse;
};
type txBodyParams = {
    value: TxBody;
};
type modeInfoSingleParams = {
    value: ModeInfo_Single;
};
type feeParams = {
    value: Fee;
};
type txEncodeResponseParams = {
    value: TxEncodeResponse;
};
type txEncodeAminoRequestParams = {
    value: TxEncodeAminoRequest;
};
type signDocParams = {
    value: SignDoc;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendBroadcastTxResponse({ value, fee, memo }: sendBroadcastTxResponseParams): Promise<DeliverTxResponse>;
    sendTxDecodeAminoRequest({ value, fee, memo }: sendTxDecodeAminoRequestParams): Promise<DeliverTxResponse>;
    sendSignDocDirectAux({ value, fee, memo }: sendSignDocDirectAuxParams): Promise<DeliverTxResponse>;
    sendSignerInfo({ value, fee, memo }: sendSignerInfoParams): Promise<DeliverTxResponse>;
    sendModeInfo({ value, fee, memo }: sendModeInfoParams): Promise<DeliverTxResponse>;
    sendGetBlockWithTxsRequest({ value, fee, memo }: sendGetBlockWithTxsRequestParams): Promise<DeliverTxResponse>;
    sendTxDecodeRequest({ value, fee, memo }: sendTxDecodeRequestParams): Promise<DeliverTxResponse>;
    sendTxEncodeRequest({ value, fee, memo }: sendTxEncodeRequestParams): Promise<DeliverTxResponse>;
    sendModeInfo_Multi({ value, fee, memo }: sendModeInfo_MultiParams): Promise<DeliverTxResponse>;
    sendGetTxResponse({ value, fee, memo }: sendGetTxResponseParams): Promise<DeliverTxResponse>;
    sendTxEncodeAminoResponse({ value, fee, memo }: sendTxEncodeAminoResponseParams): Promise<DeliverTxResponse>;
    sendTip({ value, fee, memo }: sendTipParams): Promise<DeliverTxResponse>;
    sendGetBlockWithTxsResponse({ value, fee, memo }: sendGetBlockWithTxsResponseParams): Promise<DeliverTxResponse>;
    sendAuthInfo({ value, fee, memo }: sendAuthInfoParams): Promise<DeliverTxResponse>;
    sendGetTxsEventRequest({ value, fee, memo }: sendGetTxsEventRequestParams): Promise<DeliverTxResponse>;
    sendGetTxsEventResponse({ value, fee, memo }: sendGetTxsEventResponseParams): Promise<DeliverTxResponse>;
    sendSimulateResponse({ value, fee, memo }: sendSimulateResponseParams): Promise<DeliverTxResponse>;
    sendTxRaw({ value, fee, memo }: sendTxRawParams): Promise<DeliverTxResponse>;
    sendSimulateRequest({ value, fee, memo }: sendSimulateRequestParams): Promise<DeliverTxResponse>;
    sendGetTxRequest({ value, fee, memo }: sendGetTxRequestParams): Promise<DeliverTxResponse>;
    sendTx({ value, fee, memo }: sendTxParams): Promise<DeliverTxResponse>;
    sendAuxSignerData({ value, fee, memo }: sendAuxSignerDataParams): Promise<DeliverTxResponse>;
    sendBroadcastTxRequest({ value, fee, memo }: sendBroadcastTxRequestParams): Promise<DeliverTxResponse>;
    sendTxDecodeResponse({ value, fee, memo }: sendTxDecodeResponseParams): Promise<DeliverTxResponse>;
    sendTxDecodeAminoResponse({ value, fee, memo }: sendTxDecodeAminoResponseParams): Promise<DeliverTxResponse>;
    sendTxBody({ value, fee, memo }: sendTxBodyParams): Promise<DeliverTxResponse>;
    sendModeInfo_Single({ value, fee, memo }: sendModeInfo_SingleParams): Promise<DeliverTxResponse>;
    sendFee({ value, fee, memo }: sendFeeParams): Promise<DeliverTxResponse>;
    sendTxEncodeResponse({ value, fee, memo }: sendTxEncodeResponseParams): Promise<DeliverTxResponse>;
    sendTxEncodeAminoRequest({ value, fee, memo }: sendTxEncodeAminoRequestParams): Promise<DeliverTxResponse>;
    sendSignDoc({ value, fee, memo }: sendSignDocParams): Promise<DeliverTxResponse>;
    broadcastTxResponse({ value }: broadcastTxResponseParams): EncodeObject;
    txDecodeAminoRequest({ value }: txDecodeAminoRequestParams): EncodeObject;
    signDocDirectAux({ value }: signDocDirectAuxParams): EncodeObject;
    signerInfo({ value }: signerInfoParams): EncodeObject;
    modeInfo({ value }: modeInfoParams): EncodeObject;
    getBlockWithTxsRequest({ value }: getBlockWithTxsRequestParams): EncodeObject;
    txDecodeRequest({ value }: txDecodeRequestParams): EncodeObject;
    txEncodeRequest({ value }: txEncodeRequestParams): EncodeObject;
    modeInfoMulti({ value }: modeInfoMultiParams): EncodeObject;
    getTxResponse({ value }: getTxResponseParams): EncodeObject;
    txEncodeAminoResponse({ value }: txEncodeAminoResponseParams): EncodeObject;
    tip({ value }: tipParams): EncodeObject;
    getBlockWithTxsResponse({ value }: getBlockWithTxsResponseParams): EncodeObject;
    authInfo({ value }: authInfoParams): EncodeObject;
    getTxsEventRequest({ value }: getTxsEventRequestParams): EncodeObject;
    getTxsEventResponse({ value }: getTxsEventResponseParams): EncodeObject;
    simulateResponse({ value }: simulateResponseParams): EncodeObject;
    txRaw({ value }: txRawParams): EncodeObject;
    simulateRequest({ value }: simulateRequestParams): EncodeObject;
    getTxRequest({ value }: getTxRequestParams): EncodeObject;
    tx({ value }: txParams): EncodeObject;
    auxSignerData({ value }: auxSignerDataParams): EncodeObject;
    broadcastTxRequest({ value }: broadcastTxRequestParams): EncodeObject;
    txDecodeResponse({ value }: txDecodeResponseParams): EncodeObject;
    txDecodeAminoResponse({ value }: txDecodeAminoResponseParams): EncodeObject;
    txBody({ value }: txBodyParams): EncodeObject;
    modeInfoSingle({ value }: modeInfoSingleParams): EncodeObject;
    fee({ value }: feeParams): EncodeObject;
    txEncodeResponse({ value }: txEncodeResponseParams): EncodeObject;
    txEncodeAminoRequest({ value }: txEncodeAminoRequestParams): EncodeObject;
    signDoc({ value }: signDocParams): EncodeObject;
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
