"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonRpcClient = void 0;
const stream_1 = require("@cosmjs/stream");
const types_1 = require("./types");
/**
 * A thin wrapper that is used to bring together requests and responses by ID.
 *
 * Using this class is only advised for continous communication channels like
 * WebSockets or WebWorker messaging.
 */
class JsonRpcClient {
    constructor(connection) {
        this.connection = connection;
    }
    async run(request) {
        const filteredStream = this.connection.responseStream.filter((r) => r.id === request.id);
        const pendingResponses = (0, stream_1.firstEvent)(filteredStream);
        this.connection.sendRequest(request);
        const response = await pendingResponses;
        if ((0, types_1.isJsonRpcErrorResponse)(response)) {
            const error = response.error;
            throw new Error(`JSON RPC error: code=${error.code}; message='${error.message}'`);
        }
        return response;
    }
}
exports.JsonRpcClient = JsonRpcClient;
//# sourceMappingURL=jsonrpcclient.js.map