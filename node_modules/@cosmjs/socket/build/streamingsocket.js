"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingSocket = void 0;
const xstream_1 = require("xstream");
const socketwrapper_1 = require("./socketwrapper");
/**
 * A WebSocket wrapper that exposes all events as a stream.
 *
 * This underlying socket will not be closed when the stream has no listeners
 */
class StreamingSocket {
    constructor(url, timeout = 10000) {
        this.socket = new socketwrapper_1.SocketWrapper(url, (event) => {
            if (this.eventProducerListener) {
                this.eventProducerListener.next(event);
            }
        }, (errorEvent) => {
            if (this.eventProducerListener) {
                this.eventProducerListener.error(errorEvent);
            }
        }, () => {
            // socket opened
        }, (closeEvent) => {
            if (this.eventProducerListener) {
                if (closeEvent.wasClean) {
                    this.eventProducerListener.complete();
                }
                else {
                    this.eventProducerListener.error("Socket was closed unclean");
                }
            }
        }, timeout);
        this.connected = this.socket.connected;
        const eventProducer = {
            start: (listener) => (this.eventProducerListener = listener),
            stop: () => (this.eventProducerListener = undefined),
        };
        this.events = xstream_1.Stream.create(eventProducer);
    }
    connect() {
        this.socket.connect();
    }
    disconnect() {
        this.socket.disconnect();
    }
    async send(data) {
        return this.socket.send(data);
    }
}
exports.StreamingSocket = StreamingSocket;
//# sourceMappingURL=streamingsocket.js.map