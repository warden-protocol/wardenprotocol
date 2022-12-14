import { QueryParamsResponse, QuerySigningInfoResponse, QuerySigningInfosResponse } from "cosmjs-types/cosmos/slashing/v1beta1/query";
import { QueryClient } from "../../queryclient";
export interface SlashingExtension {
    readonly slashing: {
        signingInfo: (consAddress: string) => Promise<QuerySigningInfoResponse>;
        signingInfos: (paginationKey?: Uint8Array) => Promise<QuerySigningInfosResponse>;
        params: () => Promise<QueryParamsResponse>;
    };
}
export declare function setupSlashingExtension(base: QueryClient): SlashingExtension;
