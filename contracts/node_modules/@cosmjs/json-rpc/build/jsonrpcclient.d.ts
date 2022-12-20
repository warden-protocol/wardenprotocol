import { Stream } from "xstream";
import { JsonRpcRequest, JsonRpcResponse, JsonRpcSuccessResponse } from "./types";
export interface SimpleMessagingConnection<Request, Response> {
    readonly responseStream: Stream<Response>;
    readonly sendRequest: (request: Request) => void;
}
/**
 * A thin wrapper that is used to bring together requests and responses by ID.
 *
 * Using this class is only advised for continous communication channels like
 * WebSockets or WebWorker messaging.
 */
export declare class JsonRpcClient {
    private readonly connection;
    constructor(connection: SimpleMessagingConnection<JsonRpcRequest, JsonRpcResponse>);
    run(request: JsonRpcRequest): Promise<JsonRpcSuccessResponse>;
}
