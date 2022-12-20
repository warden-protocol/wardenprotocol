"use strict";
/// <reference lib="webworker" />
Object.defineProperty(exports, "__esModule", { value: true });
// for testing only
const compatibility_1 = require("../compatibility");
const parse_1 = require("../parse");
const types_1 = require("../types");
function handleRequest(event) {
    let request;
    try {
        request = (0, parse_1.parseJsonRpcRequest)(event.data);
    }
    catch (error) {
        const requestId = (0, parse_1.parseJsonRpcId)(event.data);
        const errorResponse = {
            jsonrpc: "2.0",
            id: requestId,
            error: {
                code: types_1.jsonRpcCode.invalidRequest,
                message: error.toString(),
            },
        };
        return errorResponse;
    }
    let paramsString;
    if ((0, compatibility_1.isJsonCompatibleDictionary)(request.params)) {
        paramsString = JSON.stringify(request.params);
    }
    else {
        paramsString = request.params
            .map((p) => {
            if (typeof p === "number") {
                return p;
            }
            else if (p === null) {
                return `null`;
            }
            else if (typeof p === "string") {
                return `"${p}"`;
            }
            else {
                return p.toString();
            }
        })
            .join(", ");
    }
    const response = {
        jsonrpc: "2.0",
        id: request.id,
        result: `Called ${request.method}(${paramsString})`,
    };
    return response;
}
onmessage = (event) => {
    // filter out empty {"isTrusted":true} events
    if (!event.data) {
        return;
    }
    const response = handleRequest(event);
    setTimeout(() => postMessage(response), 50);
};
//# sourceMappingURL=dummyservice.worker.js.map