"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSlashingExtension = void 0;
const query_1 = require("cosmjs-types/cosmos/slashing/v1beta1/query");
const queryclient_1 = require("../../queryclient");
function setupSlashingExtension(base) {
    const rpc = (0, queryclient_1.createProtobufRpcClient)(base);
    const queryService = new query_1.QueryClientImpl(rpc);
    return {
        slashing: {
            signingInfo: async (consAddress) => {
                const response = await queryService.SigningInfo({
                    consAddress: consAddress,
                });
                return response;
            },
            signingInfos: async (paginationKey) => {
                const response = await queryService.SigningInfos({
                    pagination: (0, queryclient_1.createPagination)(paginationKey),
                });
                return response;
            },
            params: async () => {
                const response = await queryService.Params({});
                return response;
            },
        },
    };
}
exports.setupSlashingExtension = setupSlashingExtension;
//# sourceMappingURL=queries.js.map