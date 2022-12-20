"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketwrapper_1 = require("./socketwrapper");
function pendingWithoutSocketServer() {
    if (!process.env.SOCKETSERVER_ENABLED) {
        pending("Set SOCKETSERVER_ENABLED to enable socket tests");
    }
}
describe("SocketWrapper", () => {
    const socketServerUrlNonExisting = "ws://localhost:4443/websocket";
    const socketServerUrl = "ws://localhost:4444/websocket";
    const socketServerUrlSlow = "ws://localhost:4445/websocket";
    it("can be constructed", () => {
        const socket = new socketwrapper_1.SocketWrapper(socketServerUrl, fail, fail);
        expect(socket).toBeTruthy();
    });
    it("can connect", (done) => {
        pendingWithoutSocketServer();
        const socket = new socketwrapper_1.SocketWrapper(socketServerUrl, () => done.fail("Got unexpected message event"), (error) => done.fail(error.message || "Unknown socket error"), () => {
            socket.disconnect();
            done();
        });
        expect(socket).toBeTruthy();
        socket.connect();
    });
    it("fails to connect to non-existing server", (done) => {
        pendingWithoutSocketServer();
        const socket = new socketwrapper_1.SocketWrapper(socketServerUrlNonExisting, () => done.fail("Got unexpected message event"), (error) => {
            if (error.message) {
                // error message only available in nodejs
                expect(error.message).toMatch(/ECONNREFUSED/i);
            }
            done();
        }, () => done.fail("Got unexpected open event"));
        expect(socket).toBeTruthy();
        socket.connect();
    });
    it("fails to connect to non-existing server but timeout is not triggered", (done) => {
        pendingWithoutSocketServer();
        const timeout = 1200; // ms
        const socket = new socketwrapper_1.SocketWrapper(socketServerUrlNonExisting, () => done.fail("Got unexpected message event"), (error) => {
            expect(error).toBeTruthy();
            // All done. Delay test end to ensure the timeout is not triggered
            setTimeout(done, timeout * 1.3);
        }, () => done.fail("Got unexpected open event"), () => 0, timeout);
        expect(socket).toBeTruthy();
        socket.connect();
    });
    it("can connect to slow server", (done) => {
        pendingWithoutSocketServer();
        const socket = new socketwrapper_1.SocketWrapper(socketServerUrlSlow, () => done.fail("Got unexpected message event"), (error) => done.fail(error.message || "Unknown socket error"), () => {
            socket.disconnect();
            done();
        });
        expect(socket).toBeTruthy();
        socket.connect();
    });
    it("times out when establishing connection takes too long", async () => {
        pendingWithoutSocketServer();
        const socket = new socketwrapper_1.SocketWrapper(socketServerUrlSlow, () => fail("Got unexpected message event"), (error) => fail(error.message || "Unknown socket error"), () => fail("Got unexpected opened event"), () => fail("Got unexpected closed event"), 2000);
        socket.connect();
        await socket.connected
            .then(() => fail("must not resolve"))
            .catch((error) => expect(error).toMatch(/connection attempt timed out/i));
    });
    it("can connect and disconnect", (done) => {
        pendingWithoutSocketServer();
        let opened = 0;
        const socket = new socketwrapper_1.SocketWrapper(socketServerUrl, () => done.fail("Got unexpected message event"), (error) => done.fail(error.message || "Unknown socket error"), () => {
            opened += 1;
            socket.disconnect();
        }, (closeEvent) => {
            expect(closeEvent.wasClean).toEqual(true);
            expect(closeEvent.code).toEqual(1000 /* Normal Closure */);
            expect(opened).toEqual(1);
            done();
        });
        socket.connect();
    });
    it("can disconnect before waiting for open", (done) => {
        pendingWithoutSocketServer();
        const socket = new socketwrapper_1.SocketWrapper(socketServerUrl, () => done.fail("Got unexpected message event"), (error) => done.fail(error.message || "Unknown socket error"), () => done.fail("Got unexpected open event"), (closeEvent) => {
            expect(closeEvent.wasClean).toEqual(false);
            expect(closeEvent.code).toEqual(4001);
            done();
        });
        socket.connect();
        socket.disconnect();
    });
    it("can disconnect before waiting for open and timeout will not be triggered", (done) => {
        pendingWithoutSocketServer();
        const timeout = 500; // ms
        const socket = new socketwrapper_1.SocketWrapper(socketServerUrl, () => done.fail("Got unexpected message event"), (error) => done.fail(error.message || "Unknown socket error"), () => done.fail("Got unexpected open event"), (closeEvent) => {
            expect(closeEvent.wasClean).toEqual(false);
            expect(closeEvent.code).toEqual(4001);
            // All done. Delay test end to ensure the timeout is not triggered
            setTimeout(done, timeout * 1.3);
        }, timeout);
        socket.connect();
        socket.disconnect();
    });
    it("can send events when connected", (done) => {
        pendingWithoutSocketServer();
        const responseMessages = new Array();
        const socket = new socketwrapper_1.SocketWrapper(socketServerUrl, (response) => {
            expect(response.type).toEqual("message");
            responseMessages.push(response.data);
            if (responseMessages.length === 3) {
                socket.disconnect();
            }
        }, (error) => done.fail(error.message || "Unknown socket error"), async () => {
            await socket.send("aabbccdd");
            await socket.send("whatever");
            await socket.send("lalala");
        }, () => {
            expect(responseMessages.length).toEqual(3);
            done();
        });
        socket.connect();
    });
    it("can send events after timeout period", (done) => {
        pendingWithoutSocketServer();
        // The "timeout period" is the period in which a timeout could potentially be triggered
        const timeoutPeriodLength = 1500;
        const socket = new socketwrapper_1.SocketWrapper(socketServerUrl, (response) => {
            expect(response.type).toEqual("message");
            expect(response.data).toEqual("Hello world");
            socket.disconnect();
        }, (error) => done.fail(error.message || "Unknown socket error"), undefined, () => done(), timeoutPeriodLength);
        socket.connect();
        setTimeout(() => socket.send("Hello world"), 2 * timeoutPeriodLength);
    });
    it("cannot send on a disconnect socket (it will never come back)", (done) => {
        pendingWithoutSocketServer();
        const socket = new socketwrapper_1.SocketWrapper(socketServerUrl, () => done.fail("Got unexpected message event"), (error) => done.fail(error.message || "Unknown socket error"), () => {
            socket.disconnect();
        }, () => {
            socket
                .send("la li lu")
                .then(() => done.fail("must not resolve"))
                .catch((error) => {
                expect(error).toMatch(/socket was closed/i);
                done();
            });
        });
        socket.connect();
    });
});
//# sourceMappingURL=socketwrapper.spec.js.map