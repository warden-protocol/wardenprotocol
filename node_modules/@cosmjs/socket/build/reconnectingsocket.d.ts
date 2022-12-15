import { ValueAndUpdates } from "@cosmjs/stream";
import { Stream } from "xstream";
import { ConnectionStatus } from "./queueingstreamingsocket";
import { SocketWrapperMessageEvent } from "./socketwrapper";
/**
 * A wrapper around QueueingStreamingSocket that reconnects automatically.
 */
export declare class ReconnectingSocket {
    /** Starts with a 0.1 second timeout, then doubles every attempt with a maximum timeout of 5 seconds. */
    private static calculateTimeout;
    readonly connectionStatus: ValueAndUpdates<ConnectionStatus>;
    readonly events: Stream<SocketWrapperMessageEvent>;
    private readonly socket;
    private eventProducerListener;
    private unconnected;
    private disconnected;
    private timeoutIndex;
    private reconnectTimeout;
    constructor(url: string, timeout?: number, reconnectedHandler?: () => void);
    connect(): void;
    disconnect(): void;
    queueRequest(request: string): void;
}
