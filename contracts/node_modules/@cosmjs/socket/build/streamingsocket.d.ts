import { Stream } from "xstream";
import { SocketWrapperMessageEvent } from "./socketwrapper";
/**
 * A WebSocket wrapper that exposes all events as a stream.
 *
 * This underlying socket will not be closed when the stream has no listeners
 */
export declare class StreamingSocket {
    readonly connected: Promise<void>;
    readonly events: Stream<SocketWrapperMessageEvent>;
    private eventProducerListener;
    private readonly socket;
    constructor(url: string, timeout?: number);
    connect(): void;
    disconnect(): void;
    send(data: string): Promise<void>;
}
