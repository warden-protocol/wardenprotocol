"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMintExtension = void 0;
const utils_1 = require("@cosmjs/utils");
const query_1 = require("cosmjs-types/cosmos/mint/v1beta1/query");
const queryclient_1 = require("../../queryclient");
function setupMintExtension(base) {
    const rpc = (0, queryclient_1.createProtobufRpcClient)(base);
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const queryService = new query_1.QueryClientImpl(rpc);
    return {
        mint: {
            params: async () => {
                const { params } = await queryService.Params({});
                (0, utils_1.assert)(params);
                return {
                    blocksPerYear: params.blocksPerYear,
                    goalBonded: (0, queryclient_1.decodeCosmosSdkDecFromProto)(params.goalBonded),
                    inflationMin: (0, queryclient_1.decodeCosmosSdkDecFromProto)(params.inflationMin),
                    inflationMax: (0, queryclient_1.decodeCosmosSdkDecFromProto)(params.inflationMax),
                    inflationRateChange: (0, queryclient_1.decodeCosmosSdkDecFromProto)(params.inflationRateChange),
                    mintDenom: params.mintDenom,
                };
            },
            inflation: async () => {
                const { inflation } = await queryService.Inflation({});
                return (0, queryclient_1.decodeCosmosSdkDecFromProto)(inflation);
            },
            annualProvisions: async () => {
                const { annualProvisions } = await queryService.AnnualProvisions({});
                return (0, queryclient_1.decodeCosmosSdkDecFromProto)(annualProvisions);
            },
        },
    };
}
exports.setupMintExtension = setupMintExtension;
//# sourceMappingURL=queries.js.map