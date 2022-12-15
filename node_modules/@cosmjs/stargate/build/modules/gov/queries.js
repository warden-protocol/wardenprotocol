"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupGovExtension = void 0;
const query_1 = require("cosmjs-types/cosmos/gov/v1beta1/query");
const queryclient_1 = require("../../queryclient");
function setupGovExtension(base) {
    const rpc = (0, queryclient_1.createProtobufRpcClient)(base);
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const queryService = new query_1.QueryClientImpl(rpc);
    return {
        gov: {
            params: async (parametersType) => {
                const response = await queryService.Params({ paramsType: parametersType });
                return response;
            },
            proposals: async (proposalStatus, depositorAddress, voterAddress, paginationKey) => {
                const response = await queryService.Proposals({
                    proposalStatus,
                    depositor: depositorAddress,
                    voter: voterAddress,
                    pagination: (0, queryclient_1.createPagination)(paginationKey),
                });
                return response;
            },
            proposal: async (proposalId) => {
                const response = await queryService.Proposal({ proposalId: (0, queryclient_1.longify)(proposalId) });
                return response;
            },
            deposits: async (proposalId, paginationKey) => {
                const response = await queryService.Deposits({
                    proposalId: (0, queryclient_1.longify)(proposalId),
                    pagination: (0, queryclient_1.createPagination)(paginationKey),
                });
                return response;
            },
            deposit: async (proposalId, depositorAddress) => {
                const response = await queryService.Deposit({
                    proposalId: (0, queryclient_1.longify)(proposalId),
                    depositor: depositorAddress,
                });
                return response;
            },
            tally: async (proposalId) => {
                const response = await queryService.TallyResult({
                    proposalId: (0, queryclient_1.longify)(proposalId),
                });
                return response;
            },
            votes: async (proposalId, paginationKey) => {
                const response = await queryService.Votes({
                    proposalId: (0, queryclient_1.longify)(proposalId),
                    pagination: (0, queryclient_1.createPagination)(paginationKey),
                });
                return response;
            },
            vote: async (proposalId, voterAddress) => {
                const response = await queryService.Vote({
                    proposalId: (0, queryclient_1.longify)(proposalId),
                    voter: voterAddress,
                });
                return response;
            },
        },
    };
}
exports.setupGovExtension = setupGovExtension;
//# sourceMappingURL=queries.js.map