"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReconnectingSocket = void 0;
const xstream_1 = require("xstream");
const queueingstreamingsocket_1 = require("./queueingstreamingsocket");
/**
 * A wrapper around QueueingStreamingSocket that reconnects automatically.
 */
class ReconnectingSocket {
    constructor(url, timeout = 10000, reconnectedHandler) {
        this.unconnected = true;
        this.disconnected = false;
        this.timeoutIndex = 0;
        this.reconnectTimeout = null;
        const eventProducer = {
            start: (listener) => (this.eventProducerListener = listener),
            stop: () => (this.eventProducerListener = undefined),
        };
        this.events = xstream_1.Stream.create(eventProducer);
        this.socket = new queueingstreamingsocket_1.QueueingStreamingSocket(url, timeout, reconnectedHandler);
        this.socket.events.subscribe({
            next: (event) => {
                if (this.eventProducerListener) {
                    this.eventProducerListener.next(event);
                }
            },
            error: (error) => {
                if (this.eventProducerListener) {
                    this.eventProducerListener.error(error);
                }
            },
        });
        this.connectionStatus = this.socket.connectionStatus;
        this.connectionStatus.updates.subscribe({
            next: (status) => {
                if (status === queueingstreamingsocket_1.ConnectionStatus.Connected) {
                    this.timeoutIndex = 0;
                }
                if (status === queueingstreamingsocket_1.ConnectionStatus.Disconnected) {
                    if (this.reconnectTimeout) {
                        clearTimeout(this.reconnectTimeout);
                        this.reconnectTimeout = null;
                    }
                    this.reconnectTimeout = setTimeout(() => this.socket.reconnect(), ReconnectingSocket.calculateTimeout(this.timeoutIndex++));
                }
            },
        });
    }
    /** Starts with a 0.1 second timeout, then doubles every attempt with a maximum timeout of 5 seconds. */
    static calculateTimeout(index) {
        return Math.min(2 ** index * 100, 5000);
    }
    connect() {
        if (!this.unconnected) {
            throw new Error("Cannot connect: socket has already connected");
        }
        this.socket.connect();
        this.unconnected = false;
    }
    disconnect() {
        if (this.unconnected) {
            throw new Error("Cannot disconnect: socket has not yet connected");
        }
        this.socket.disconnect();
        if (this.eventProducerListener) {
            this.eventProducerListener.complete();
        }
        this.disconnected = true;
    }
    queueRequest(request) {
        if (this.disconnected) {
            throw new Error("Cannot queue request: socket has disconnected");
        }
        this.socket.queueRequest(request);
    }
}
exports.ReconnectingSocket = ReconnectingSocket;
//# sourceMappingURL=reconnectingsocket.js.map