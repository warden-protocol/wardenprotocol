import { ValueAndUpdates } from "@cosmjs/stream";
import { Stream } from "xstream";
import { SocketWrapperMessageEvent } from "./socketwrapper";
export declare enum ConnectionStatus {
    Unconnected = 0,
    Connecting = 1,
    Connected = 2,
    Disconnected = 3
}
/**
 * A wrapper around StreamingSocket that can queue requests.
 */
export declare class QueueingStreamingSocket {
    readonly connectionStatus: ValueAndUpdates<ConnectionStatus>;
    readonly events: Stream<SocketWrapperMessageEvent>;
    private readonly url;
    private readonly timeout;
    private readonly queue;
    private socket;
    private isProcessingQueue;
    private eventProducerListener;
    private readonly connectionStatusProducer;
    private readonly reconnectedHandler?;
    constructor(url: string, timeout?: number, reconnectedHandler?: () => void);
    connect(): void;
    disconnect(): void;
    reconnect(): void;
    getQueueLength(): number;
    queueRequest(request: string): void;
    private processQueue;
}
