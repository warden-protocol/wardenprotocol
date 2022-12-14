import { QueryGrantsResponse } from "cosmjs-types/cosmos/authz/v1beta1/query";
import { QueryClient } from "../../queryclient";
export interface AuthzExtension {
    readonly authz: {
        readonly grants: (granter: string, grantee: string, msgTypeUrl: string, paginationKey?: Uint8Array) => Promise<QueryGrantsResponse>;
    };
}
export declare function setupAuthzExtension(base: QueryClient): AuthzExtension;
