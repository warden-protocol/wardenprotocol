"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasProtocol = exports.instanceOfRpcStreamingClient = void 0;
function instanceOfRpcStreamingClient(client) {
    return typeof client.listen === "function";
}
exports.instanceOfRpcStreamingClient = instanceOfRpcStreamingClient;
// Helpers for all RPC clients
function hasProtocol(url) {
    return url.search("://") !== -1;
}
exports.hasProtocol = hasProtocol;
//# sourceMappingURL=rpcclient.js.map