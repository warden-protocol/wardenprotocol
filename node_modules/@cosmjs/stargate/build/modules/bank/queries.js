"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupBankExtension = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const utils_1 = require("@cosmjs/utils");
const query_1 = require("cosmjs-types/cosmos/bank/v1beta1/query");
const queryclient_1 = require("../../queryclient");
function setupBankExtension(base) {
    const rpc = (0, queryclient_1.createProtobufRpcClient)(base);
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const queryService = new query_1.QueryClientImpl(rpc);
    return {
        bank: {
            balance: async (address, denom) => {
                const { balance } = await queryService.Balance({ address: address, denom: denom });
                (0, utils_1.assert)(balance);
                return balance;
            },
            allBalances: async (address) => {
                const { balances } = await queryService.AllBalances({ address: address });
                return balances;
            },
            totalSupply: async () => {
                const { supply } = await queryService.TotalSupply({});
                return supply;
            },
            supplyOf: async (denom) => {
                const { amount } = await queryService.SupplyOf({ denom: denom });
                (0, utils_1.assert)(amount);
                return amount;
            },
            denomMetadata: async (denom) => {
                const { metadata } = await queryService.DenomMetadata({ denom });
                (0, utils_1.assert)(metadata);
                return metadata;
            },
            denomsMetadata: async () => {
                const { metadatas } = await queryService.DenomsMetadata({
                    pagination: undefined, // Not implemented
                });
                return metadatas;
            },
        },
    };
}
exports.setupBankExtension = setupBankExtension;
//# sourceMappingURL=queries.js.map