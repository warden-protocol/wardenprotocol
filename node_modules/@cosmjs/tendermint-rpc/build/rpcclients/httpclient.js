"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = exports.http = void 0;
const json_rpc_1 = require("@cosmjs/json-rpc");
const axios_1 = __importDefault(require("axios"));
const rpcclient_1 = require("./rpcclient");
function filterBadStatus(res) {
    if (res.status >= 400) {
        throw new Error(`Bad status on response: ${res.status}`);
    }
    return res;
}
/**
 * Helper to work around missing CORS support in Tendermint (https://github.com/tendermint/tendermint/pull/2800)
 *
 * For some reason, fetch does not complain about missing server-side CORS support.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function http(method, url, headers, request) {
    if (typeof fetch !== "undefined") {
        const settings = {
            method: method,
            body: request ? JSON.stringify(request) : undefined,
            headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                "Content-Type": "application/json",
                ...headers,
            },
        };
        return fetch(url, settings)
            .then(filterBadStatus)
            .then((res) => res.json());
    }
    else {
        return axios_1.default
            .request({ url: url, method: method, data: request, headers: headers })
            .then((res) => res.data);
    }
}
exports.http = http;
class HttpClient {
    constructor(endpoint) {
        if (typeof endpoint === "string") {
            // accept host.name:port and assume http protocol
            this.url = (0, rpcclient_1.hasProtocol)(endpoint) ? endpoint : "http://" + endpoint;
        }
        else {
            this.url = endpoint.url;
            this.headers = endpoint.headers;
        }
    }
    disconnect() {
        // nothing to be done
    }
    async execute(request) {
        const response = (0, json_rpc_1.parseJsonRpcResponse)(await http("POST", this.url, this.headers, request));
        if ((0, json_rpc_1.isJsonRpcErrorResponse)(response)) {
            throw new Error(JSON.stringify(response.error));
        }
        return response;
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=httpclient.js.map