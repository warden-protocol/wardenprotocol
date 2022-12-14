"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queueingstreamingsocket_1 = require("./queueingstreamingsocket");
function pendingWithoutSocketServer() {
    if (!process.env.SOCKETSERVER_ENABLED) {
        pending("Set SOCKETSERVER_ENABLED to enable socket tests");
    }
}
describe("QueueingStreamingSocket", () => {
    const socketServerUrl = "ws://localhost:4444/websocket";
    it("can be constructed", () => {
        const socket = new queueingstreamingsocket_1.QueueingStreamingSocket(socketServerUrl);
        expect(socket).toBeTruthy();
    });
    describe("queueRequest", () => {
        it("can queue and process requests with a connection", (done) => {
            pendingWithoutSocketServer();
            const socket = new queueingstreamingsocket_1.QueueingStreamingSocket(socketServerUrl);
            const requests = ["request 1", "request 2", "request 3"];
            let eventsSeen = 0;
            socket.events.subscribe({
                next: (event) => {
                    expect(event.data).toEqual(requests[eventsSeen++]);
                    if (eventsSeen === requests.length) {
                        expect(socket.getQueueLength()).toEqual(0);
                        socket.disconnect();
                        done();
                    }
                },
            });
            socket.connect();
            requests.forEach((request) => socket.queueRequest(request));
        });
        it("can queue requests without a connection and process them later", (done) => {
            pendingWithoutSocketServer();
            const socket = new queueingstreamingsocket_1.QueueingStreamingSocket(socketServerUrl);
            const requests = ["request 1", "request 2", "request 3"];
            let eventsSeen = 0;
            socket.events.subscribe({
                next: (event) => {
                    expect(event.data).toEqual(requests[eventsSeen++]);
                    if (eventsSeen === requests.length) {
                        expect(socket.getQueueLength()).toEqual(0);
                        socket.disconnect();
                        done();
                    }
                },
            });
            requests.forEach((request) => socket.queueRequest(request));
            setTimeout(() => {
                expect(socket.getQueueLength()).toEqual(3);
                socket.connect();
            }, 5000);
        });
    });
    describe("reconnect", () => {
        it("does not emit a completed event when disconnected", (done) => {
            pendingWithoutSocketServer();
            const request = "request";
            const socket = new queueingstreamingsocket_1.QueueingStreamingSocket(socketServerUrl);
            socket.events.subscribe({
                next: ({ data }) => {
                    if (data === request) {
                        socket.disconnect();
                        done();
                    }
                },
                complete: () => done.fail("Stream completed"),
            });
            socket.connect();
            socket.disconnect();
            socket.reconnect();
            socket.queueRequest(request);
        });
        it("can reconnect and process remaining queue", (done) => {
            pendingWithoutSocketServer();
            const socket = new queueingstreamingsocket_1.QueueingStreamingSocket(socketServerUrl);
            const requests = ["request 1", "request 2", "request 3"];
            let eventsSeen = 0;
            socket.connect();
            socket.disconnect();
            requests.forEach((request) => socket.queueRequest(request));
            socket.events.subscribe({
                next: (event) => {
                    expect(event.data).toEqual(requests[eventsSeen++]);
                    if (eventsSeen === requests.length) {
                        expect(socket.getQueueLength()).toEqual(0);
                        socket.disconnect();
                        done();
                    }
                },
            });
            socket.reconnect();
        });
        it("notifies on reconnection via a callback", (done) => {
            pendingWithoutSocketServer();
            const socket = new queueingstreamingsocket_1.QueueingStreamingSocket(socketServerUrl, undefined, done);
            socket.reconnect();
        });
    });
    describe("connectionStatus", () => {
        it("exposes connection status", (done) => {
            pendingWithoutSocketServer();
            const socket = new queueingstreamingsocket_1.QueueingStreamingSocket(socketServerUrl);
            let statusChangesSeen = 0;
            socket.connectionStatus.updates.subscribe({
                next: (status) => {
                    switch (statusChangesSeen++) {
                        case 0:
                            expect(status).toEqual(queueingstreamingsocket_1.ConnectionStatus.Unconnected);
                            break;
                        case 1:
                        case 4:
                            expect(status).toEqual(queueingstreamingsocket_1.ConnectionStatus.Connecting);
                            break;
                        case 2:
                        case 5:
                            expect(status).toEqual(queueingstreamingsocket_1.ConnectionStatus.Connected);
                            break;
                        case 3:
                        case 6:
                            expect(status).toEqual(queueingstreamingsocket_1.ConnectionStatus.Disconnected);
                            break;
                        default:
                            done.fail("Got too many status changes");
                    }
                    if (statusChangesSeen === 7) {
                        done();
                    }
                },
            });
            socket.connect();
            setTimeout(() => {
                socket.disconnect();
                socket.reconnect();
                setTimeout(() => socket.disconnect(), 1000);
            }, 1000);
        });
    });
});
//# sourceMappingURL=queueingstreamingsocket.spec.js.map