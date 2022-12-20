import { JsonRpcId, JsonRpcRequest, JsonRpcResponse, JsonRpcSuccessResponse } from "@cosmjs/json-rpc";
import { Stream } from "xstream";
import { RpcStreamingClient, SubscriptionEvent } from "./rpcclient";
export declare class WebsocketClient implements RpcStreamingClient {
    private readonly url;
    private readonly socket;
    /** Same events as in socket.events but in the format we need */
    private readonly jsonRpcResponseStream;
    private readonly subscriptionStreams;
    constructor(baseUrl: string, onError?: (err: any) => void);
    execute(request: JsonRpcRequest): Promise<JsonRpcSuccessResponse>;
    listen(request: JsonRpcRequest): Stream<SubscriptionEvent>;
    /**
     * Resolves as soon as websocket is connected. execute() queues requests automatically,
     * so this should be required for testing purposes only.
     */
    connected(): Promise<void>;
    disconnect(): void;
    protected responseForRequestId(id: JsonRpcId): Promise<JsonRpcResponse>;
}
