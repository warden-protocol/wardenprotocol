import { JsonRpcErrorResponse, JsonRpcId, JsonRpcRequest, JsonRpcResponse, JsonRpcSuccessResponse } from "./types";
/**
 * Extracts ID field from request or response object.
 *
 * Returns `null` when no valid ID was found.
 */
export declare function parseJsonRpcId(data: unknown): JsonRpcId | null;
export declare function parseJsonRpcRequest(data: unknown): JsonRpcRequest;
/** Throws if data is not a JsonRpcErrorResponse */
export declare function parseJsonRpcErrorResponse(data: unknown): JsonRpcErrorResponse;
/** Throws if data is not a JsonRpcSuccessResponse */
export declare function parseJsonRpcSuccessResponse(data: unknown): JsonRpcSuccessResponse;
/**
 * Returns a JsonRpcErrorResponse if input can be parsed as a JSON-RPC error. Otherwise parses
 * input as JsonRpcSuccessResponse. Throws if input is neither a valid error nor success response.
 */
export declare function parseJsonRpcResponse(data: unknown): JsonRpcResponse;
