"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueingStreamingSocket = exports.ConnectionStatus = void 0;
const stream_1 = require("@cosmjs/stream");
const xstream_1 = require("xstream");
const streamingsocket_1 = require("./streamingsocket");
var ConnectionStatus;
(function (ConnectionStatus) {
    ConnectionStatus[ConnectionStatus["Unconnected"] = 0] = "Unconnected";
    ConnectionStatus[ConnectionStatus["Connecting"] = 1] = "Connecting";
    ConnectionStatus[ConnectionStatus["Connected"] = 2] = "Connected";
    ConnectionStatus[ConnectionStatus["Disconnected"] = 3] = "Disconnected";
})(ConnectionStatus = exports.ConnectionStatus || (exports.ConnectionStatus = {}));
/**
 * A wrapper around StreamingSocket that can queue requests.
 */
class QueueingStreamingSocket {
    constructor(url, timeout = 10000, reconnectedHandler) {
        this.queue = [];
        this.isProcessingQueue = false;
        this.url = url;
        this.timeout = timeout;
        this.reconnectedHandler = reconnectedHandler;
        const eventProducer = {
            start: (listener) => (this.eventProducerListener = listener),
            stop: () => (this.eventProducerListener = undefined),
        };
        this.events = xstream_1.Stream.create(eventProducer);
        this.connectionStatusProducer = new stream_1.DefaultValueProducer(ConnectionStatus.Unconnected);
        this.connectionStatus = new stream_1.ValueAndUpdates(this.connectionStatusProducer);
        this.socket = new streamingsocket_1.StreamingSocket(this.url, this.timeout);
        this.socket.events.subscribe({
            next: (event) => {
                if (!this.eventProducerListener)
                    throw new Error("No event producer listener set");
                this.eventProducerListener.next(event);
            },
            error: () => this.connectionStatusProducer.update(ConnectionStatus.Disconnected),
        });
    }
    connect() {
        this.connectionStatusProducer.update(ConnectionStatus.Connecting);
        this.socket.connected.then(async () => {
            this.connectionStatusProducer.update(ConnectionStatus.Connected);
            return this.processQueue();
        }, () => this.connectionStatusProducer.update(ConnectionStatus.Disconnected));
        this.socket.connect();
    }
    disconnect() {
        this.connectionStatusProducer.update(ConnectionStatus.Disconnected);
        this.socket.disconnect();
    }
    reconnect() {
        this.socket = new streamingsocket_1.StreamingSocket(this.url, this.timeout);
        this.socket.events.subscribe({
            next: (event) => {
                if (!this.eventProducerListener)
                    throw new Error("No event producer listener set");
                this.eventProducerListener.next(event);
            },
            error: () => this.connectionStatusProducer.update(ConnectionStatus.Disconnected),
        });
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.socket.connected.then(() => {
            if (this.reconnectedHandler) {
                this.reconnectedHandler();
            }
        });
        this.connect();
    }
    getQueueLength() {
        return this.queue.length;
    }
    queueRequest(request) {
        this.queue.push(request);
        // We don’t need to wait for the queue to be processed.
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.processQueue();
    }
    async processQueue() {
        if (this.isProcessingQueue || this.connectionStatus.value !== ConnectionStatus.Connected) {
            return;
        }
        this.isProcessingQueue = true;
        let request;
        while ((request = this.queue.shift())) {
            try {
                await this.socket.send(request);
                this.isProcessingQueue = false;
            }
            catch (error) {
                // Probably the connection is down; will try again automatically when reconnected.
                this.queue.unshift(request);
                this.isProcessingQueue = false;
                return;
            }
        }
    }
}
exports.QueueingStreamingSocket = QueueingStreamingSocket;
//# sourceMappingURL=queueingstreamingsocket.js.map