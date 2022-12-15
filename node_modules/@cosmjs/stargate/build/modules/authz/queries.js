"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAuthzExtension = void 0;
const query_1 = require("cosmjs-types/cosmos/authz/v1beta1/query");
const queryclient_1 = require("../../queryclient");
function setupAuthzExtension(base) {
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const rpc = (0, queryclient_1.createProtobufRpcClient)(base);
    const queryService = new query_1.QueryClientImpl(rpc);
    return {
        authz: {
            grants: async (granter, grantee, msgTypeUrl, paginationKey) => {
                const response = await queryService.Grants({
                    granter: granter,
                    grantee: grantee,
                    msgTypeUrl: msgTypeUrl,
                    pagination: (0, queryclient_1.createPagination)(paginationKey),
                });
                return response;
            },
        },
    };
}
exports.setupAuthzExtension = setupAuthzExtension;
//# sourceMappingURL=queries.js.map