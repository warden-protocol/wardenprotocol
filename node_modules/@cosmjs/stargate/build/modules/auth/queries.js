"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAuthExtension = void 0;
const query_1 = require("cosmjs-types/cosmos/auth/v1beta1/query");
const queryclient_1 = require("../../queryclient");
function setupAuthExtension(base) {
    const rpc = (0, queryclient_1.createProtobufRpcClient)(base);
    // Use this service to get easy typed access to query methods
    // This cannot be used for proof verification
    const queryService = new query_1.QueryClientImpl(rpc);
    return {
        auth: {
            account: async (address) => {
                const { account } = await queryService.Account({ address: address });
                return account !== null && account !== void 0 ? account : null;
            },
        },
    };
}
exports.setupAuthExtension = setupAuthExtension;
//# sourceMappingURL=queries.js.map