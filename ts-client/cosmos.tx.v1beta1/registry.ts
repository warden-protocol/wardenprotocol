import { GeneratedType } from "@cosmjs/proto-signing";
import { GetTxRequest } from "./types/cosmos/tx/v1beta1/service";
import { SimulateResponse } from "./types/cosmos/tx/v1beta1/service";
import { SimulateRequest } from "./types/cosmos/tx/v1beta1/service";
import { TxDecodeAminoRequest } from "./types/cosmos/tx/v1beta1/service";
import { TxDecodeAminoResponse } from "./types/cosmos/tx/v1beta1/service";
import { ModeInfo } from "./types/cosmos/tx/v1beta1/tx";
import { GetBlockWithTxsRequest } from "./types/cosmos/tx/v1beta1/service";
import { TxDecodeResponse } from "./types/cosmos/tx/v1beta1/service";
import { TxEncodeRequest } from "./types/cosmos/tx/v1beta1/service";
import { Fee } from "./types/cosmos/tx/v1beta1/tx";
import { BroadcastTxResponse } from "./types/cosmos/tx/v1beta1/service";
import { TxEncodeResponse } from "./types/cosmos/tx/v1beta1/service";
import { Tip } from "./types/cosmos/tx/v1beta1/tx";
import { AuxSignerData } from "./types/cosmos/tx/v1beta1/tx";
import { BroadcastTxRequest } from "./types/cosmos/tx/v1beta1/service";
import { TxDecodeRequest } from "./types/cosmos/tx/v1beta1/service";
import { Tx } from "./types/cosmos/tx/v1beta1/tx";
import { SignDoc } from "./types/cosmos/tx/v1beta1/tx";
import { SignerInfo } from "./types/cosmos/tx/v1beta1/tx";
import { SignDocDirectAux } from "./types/cosmos/tx/v1beta1/tx";
import { TxRaw } from "./types/cosmos/tx/v1beta1/tx";
import { ModeInfo_Multi } from "./types/cosmos/tx/v1beta1/tx";
import { TxEncodeAminoRequest } from "./types/cosmos/tx/v1beta1/service";
import { TxEncodeAminoResponse } from "./types/cosmos/tx/v1beta1/service";
import { TxBody } from "./types/cosmos/tx/v1beta1/tx";
import { AuthInfo } from "./types/cosmos/tx/v1beta1/tx";
import { GetBlockWithTxsResponse } from "./types/cosmos/tx/v1beta1/service";
import { GetTxsEventRequest } from "./types/cosmos/tx/v1beta1/service";
import { GetTxsEventResponse } from "./types/cosmos/tx/v1beta1/service";
import { GetTxResponse } from "./types/cosmos/tx/v1beta1/service";
import { ModeInfo_Single } from "./types/cosmos/tx/v1beta1/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cosmos.tx.v1beta1.GetTxRequest", GetTxRequest],
    ["/cosmos.tx.v1beta1.SimulateResponse", SimulateResponse],
    ["/cosmos.tx.v1beta1.SimulateRequest", SimulateRequest],
    ["/cosmos.tx.v1beta1.TxDecodeAminoRequest", TxDecodeAminoRequest],
    ["/cosmos.tx.v1beta1.TxDecodeAminoResponse", TxDecodeAminoResponse],
    ["/cosmos.tx.v1beta1.ModeInfo", ModeInfo],
    ["/cosmos.tx.v1beta1.GetBlockWithTxsRequest", GetBlockWithTxsRequest],
    ["/cosmos.tx.v1beta1.TxDecodeResponse", TxDecodeResponse],
    ["/cosmos.tx.v1beta1.TxEncodeRequest", TxEncodeRequest],
    ["/cosmos.tx.v1beta1.Fee", Fee],
    ["/cosmos.tx.v1beta1.BroadcastTxResponse", BroadcastTxResponse],
    ["/cosmos.tx.v1beta1.TxEncodeResponse", TxEncodeResponse],
    ["/cosmos.tx.v1beta1.Tip", Tip],
    ["/cosmos.tx.v1beta1.AuxSignerData", AuxSignerData],
    ["/cosmos.tx.v1beta1.BroadcastTxRequest", BroadcastTxRequest],
    ["/cosmos.tx.v1beta1.TxDecodeRequest", TxDecodeRequest],
    ["/cosmos.tx.v1beta1.Tx", Tx],
    ["/cosmos.tx.v1beta1.SignDoc", SignDoc],
    ["/cosmos.tx.v1beta1.SignerInfo", SignerInfo],
    ["/cosmos.tx.v1beta1.SignDocDirectAux", SignDocDirectAux],
    ["/cosmos.tx.v1beta1.TxRaw", TxRaw],
    ["/cosmos.tx.v1beta1.ModeInfo_Multi", ModeInfo_Multi],
    ["/cosmos.tx.v1beta1.TxEncodeAminoRequest", TxEncodeAminoRequest],
    ["/cosmos.tx.v1beta1.TxEncodeAminoResponse", TxEncodeAminoResponse],
    ["/cosmos.tx.v1beta1.TxBody", TxBody],
    ["/cosmos.tx.v1beta1.AuthInfo", AuthInfo],
    ["/cosmos.tx.v1beta1.GetBlockWithTxsResponse", GetBlockWithTxsResponse],
    ["/cosmos.tx.v1beta1.GetTxsEventRequest", GetTxsEventRequest],
    ["/cosmos.tx.v1beta1.GetTxsEventResponse", GetTxsEventResponse],
    ["/cosmos.tx.v1beta1.GetTxResponse", GetTxResponse],
    ["/cosmos.tx.v1beta1.ModeInfo_Single", ModeInfo_Single],
    
];

export { msgTypes }