import { Decimal } from "@cosmjs/math";
import { Params } from "cosmjs-types/cosmos/mint/v1beta1/mint";
import { QueryClient } from "../../queryclient";
/**
 * Like Params from "cosmjs-types/cosmos/mint/v1beta1/mint"
 * but using decimal types.
 */
export interface MintParams extends Pick<Params, "blocksPerYear" | "mintDenom"> {
    readonly goalBonded: Decimal;
    readonly inflationMin: Decimal;
    readonly inflationMax: Decimal;
    readonly inflationRateChange: Decimal;
}
export interface MintExtension {
    readonly mint: {
        readonly params: () => Promise<MintParams>;
        readonly inflation: () => Promise<Decimal>;
        readonly annualProvisions: () => Promise<Decimal>;
    };
}
export declare function setupMintExtension(base: QueryClient): MintExtension;
