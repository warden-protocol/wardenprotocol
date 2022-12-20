export interface SocketWrapperCloseEvent {
    readonly wasClean: boolean;
    readonly code: number;
}
export interface SocketWrapperErrorEvent {
    readonly isTrusted?: boolean;
    readonly type?: string;
    readonly message?: string;
}
export interface SocketWrapperMessageEvent {
    readonly data: string;
    readonly type: string;
}
/**
 * A thin wrapper around isomorphic-ws' WebSocket class that adds
 * - constant message/error/open/close handlers
 * - explict connection via a connect() method
 * - type support for events
 * - handling of corner cases in the open and close behaviour
 */
export declare class SocketWrapper {
    readonly connected: Promise<void>;
    private connectedResolver;
    private connectedRejecter;
    private socket;
    private timeoutId;
    private closed;
    private readonly url;
    private readonly messageHandler;
    private readonly errorHandler;
    private readonly openHandler?;
    private readonly closeHandler?;
    private readonly timeout;
    constructor(url: string, messageHandler: (event: SocketWrapperMessageEvent) => void, errorHandler: (event: SocketWrapperErrorEvent) => void, openHandler?: () => void, closeHandler?: (event: SocketWrapperCloseEvent) => void, timeout?: number);
    /**
     * returns a promise that resolves when connection is open
     */
    connect(): void;
    /**
     * Closes an established connection and aborts other connection states
     */
    disconnect(): void;
    send(data: string): Promise<void>;
    /**
     * Clears the timeout function, such that no timeout error will be raised anymore. This should be
     * called when the connection is established, a connection error occurred or the socket is disconnected.
     *
     * This method must not be called before `connect()`.
     * This method is idempotent.
     */
    private clearTimeout;
}
