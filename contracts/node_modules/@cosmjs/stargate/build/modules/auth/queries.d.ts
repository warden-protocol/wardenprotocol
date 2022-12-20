import { Any } from "cosmjs-types/google/protobuf/any";
import { QueryClient } from "../../queryclient";
export interface AuthExtension {
    readonly auth: {
        /**
         * Returns an account if it exists and `null` otherwise.
         *
         * The account is a protobuf Any in order to be able to support many different
         * account types in one API. The caller needs to switch over the expected and supported
         * `typeUrl` and decode the `value` using its own type decoder.
         */
        readonly account: (address: string) => Promise<Any | null>;
    };
}
export declare function setupAuthExtension(base: QueryClient): AuthExtension;
