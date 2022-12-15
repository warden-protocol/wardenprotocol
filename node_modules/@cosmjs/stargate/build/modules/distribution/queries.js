"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDistributionExtension = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const query_1 = require("cosmjs-types/cosmos/distribution/v1beta1/query");
const long_1 = __importDefault(require("long"));
const queryclient_1 = require("../../queryclient");
function setupDistributionExtension(base) {
    const rpc = (0, queryclient_1.createProtobufRpcClient)(base);
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const queryService = new query_1.QueryClientImpl(rpc);
    return {
        distribution: {
            communityPool: async () => {
                const response = await queryService.CommunityPool({});
                return response;
            },
            delegationRewards: async (delegatorAddress, validatorAddress) => {
                const response = await queryService.DelegationRewards({
                    delegatorAddress: delegatorAddress,
                    validatorAddress: validatorAddress,
                });
                return response;
            },
            delegationTotalRewards: async (delegatorAddress) => {
                const response = await queryService.DelegationTotalRewards({
                    delegatorAddress: delegatorAddress,
                });
                return response;
            },
            delegatorValidators: async (delegatorAddress) => {
                const response = await queryService.DelegatorValidators({
                    delegatorAddress: delegatorAddress,
                });
                return response;
            },
            delegatorWithdrawAddress: async (delegatorAddress) => {
                const response = await queryService.DelegatorWithdrawAddress({
                    delegatorAddress: delegatorAddress,
                });
                return response;
            },
            params: async () => {
                const response = await queryService.Params({});
                return response;
            },
            validatorCommission: async (validatorAddress) => {
                const response = await queryService.ValidatorCommission({
                    validatorAddress: validatorAddress,
                });
                return response;
            },
            validatorOutstandingRewards: async (validatorAddress) => {
                const response = await queryService.ValidatorOutstandingRewards({
                    validatorAddress: validatorAddress,
                });
                return response;
            },
            validatorSlashes: async (validatorAddress, startingHeight, endingHeight, paginationKey) => {
                const response = await queryService.ValidatorSlashes({
                    validatorAddress: validatorAddress,
                    startingHeight: long_1.default.fromNumber(startingHeight, true),
                    endingHeight: long_1.default.fromNumber(endingHeight, true),
                    pagination: (0, queryclient_1.createPagination)(paginationKey),
                });
                return response;
            },
        },
    };
}
exports.setupDistributionExtension = setupDistributionExtension;
//# sourceMappingURL=queries.js.map