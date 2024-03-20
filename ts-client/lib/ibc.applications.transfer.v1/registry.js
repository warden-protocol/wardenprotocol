import { QueryDenomTraceResponse } from "./types/ibc/applications/transfer/v1/query";
import { QueryDenomTracesRequest } from "./types/ibc/applications/transfer/v1/query";
import { QueryDenomTracesResponse } from "./types/ibc/applications/transfer/v1/query";
import { QueryParamsResponse } from "./types/ibc/applications/transfer/v1/query";
import { MsgUpdateParamsResponse } from "./types/ibc/applications/transfer/v1/tx";
import { Params } from "./types/ibc/applications/transfer/v1/transfer";
import { QueryParamsRequest } from "./types/ibc/applications/transfer/v1/query";
import { TransferAuthorization } from "./types/ibc/applications/transfer/v1/authz";
import { MsgTransfer } from "./types/ibc/applications/transfer/v1/tx";
import { QueryEscrowAddressResponse } from "./types/ibc/applications/transfer/v1/query";
import { QueryTotalEscrowForDenomResponse } from "./types/ibc/applications/transfer/v1/query";
import { DenomTrace } from "./types/ibc/applications/transfer/v1/transfer";
import { QueryDenomTraceRequest } from "./types/ibc/applications/transfer/v1/query";
import { QueryEscrowAddressRequest } from "./types/ibc/applications/transfer/v1/query";
import { QueryTotalEscrowForDenomRequest } from "./types/ibc/applications/transfer/v1/query";
import { GenesisState } from "./types/ibc/applications/transfer/v1/genesis";
import { QueryDenomHashResponse } from "./types/ibc/applications/transfer/v1/query";
import { MsgUpdateParams } from "./types/ibc/applications/transfer/v1/tx";
import { Allocation } from "./types/ibc/applications/transfer/v1/authz";
import { MsgTransferResponse } from "./types/ibc/applications/transfer/v1/tx";
import { QueryDenomHashRequest } from "./types/ibc/applications/transfer/v1/query";
const msgTypes = [
    ["/ibc.applications.transfer.v1.QueryDenomTraceResponse", QueryDenomTraceResponse],
    ["/ibc.applications.transfer.v1.QueryDenomTracesRequest", QueryDenomTracesRequest],
    ["/ibc.applications.transfer.v1.QueryDenomTracesResponse", QueryDenomTracesResponse],
    ["/ibc.applications.transfer.v1.QueryParamsResponse", QueryParamsResponse],
    ["/ibc.applications.transfer.v1.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/ibc.applications.transfer.v1.Params", Params],
    ["/ibc.applications.transfer.v1.QueryParamsRequest", QueryParamsRequest],
    ["/ibc.applications.transfer.v1.TransferAuthorization", TransferAuthorization],
    ["/ibc.applications.transfer.v1.MsgTransfer", MsgTransfer],
    ["/ibc.applications.transfer.v1.QueryEscrowAddressResponse", QueryEscrowAddressResponse],
    ["/ibc.applications.transfer.v1.QueryTotalEscrowForDenomResponse", QueryTotalEscrowForDenomResponse],
    ["/ibc.applications.transfer.v1.DenomTrace", DenomTrace],
    ["/ibc.applications.transfer.v1.QueryDenomTraceRequest", QueryDenomTraceRequest],
    ["/ibc.applications.transfer.v1.QueryEscrowAddressRequest", QueryEscrowAddressRequest],
    ["/ibc.applications.transfer.v1.QueryTotalEscrowForDenomRequest", QueryTotalEscrowForDenomRequest],
    ["/ibc.applications.transfer.v1.GenesisState", GenesisState],
    ["/ibc.applications.transfer.v1.QueryDenomHashResponse", QueryDenomHashResponse],
    ["/ibc.applications.transfer.v1.MsgUpdateParams", MsgUpdateParams],
    ["/ibc.applications.transfer.v1.Allocation", Allocation],
    ["/ibc.applications.transfer.v1.MsgTransferResponse", MsgTransferResponse],
    ["/ibc.applications.transfer.v1.QueryDenomHashRequest", QueryDenomHashRequest],
];
export { msgTypes };
