"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketClient = void 0;
const json_rpc_1 = require("@cosmjs/json-rpc");
const socket_1 = require("@cosmjs/socket");
const stream_1 = require("@cosmjs/stream");
const xstream_1 = require("xstream");
const rpcclient_1 = require("./rpcclient");
function defaultErrorHandler(error) {
    throw error;
}
function toJsonRpcResponse(message) {
    // this should never happen, but I want an alert if it does
    if (message.type !== "message") {
        throw new Error(`Unexcepted message type on websocket: ${message.type}`);
    }
    const jsonRpcEvent = (0, json_rpc_1.parseJsonRpcResponse)(JSON.parse(message.data));
    return jsonRpcEvent;
}
class RpcEventProducer {
    constructor(request, socket) {
        this.running = false;
        this.subscriptions = [];
        this.request = request;
        this.socket = socket;
    }
    /**
     * Implementation of Producer.start
     */
    start(listener) {
        if (this.running) {
            throw Error("Already started. Please stop first before restarting.");
        }
        this.running = true;
        this.connectToClient(listener);
        this.socket.queueRequest(JSON.stringify(this.request));
    }
    /**
     * Implementation of Producer.stop
     *
     * Called by the stream when the stream's last listener stopped listening
     * or when the producer completed.
     */
    stop() {
        this.running = false;
        // Tell the server we are done in order to save resources. We cannot wait for the result.
        // This may fail when socket connection is not open, thus ignore errors in queueRequest
        const endRequest = { ...this.request, method: "unsubscribe" };
        try {
            this.socket.queueRequest(JSON.stringify(endRequest));
        }
        catch (error) {
            if (error instanceof Error && error.message.match(/socket has disconnected/i)) {
                // ignore
            }
            else {
                throw error;
            }
        }
    }
    connectToClient(listener) {
        const responseStream = this.socket.events.map(toJsonRpcResponse);
        // this should unsubscribe itself, so doesn't need to be removed explicitly
        const idSubscription = responseStream
            .filter((response) => response.id === this.request.id)
            .subscribe({
            next: (response) => {
                if ((0, json_rpc_1.isJsonRpcErrorResponse)(response)) {
                    this.closeSubscriptions();
                    listener.error(JSON.stringify(response.error));
                }
                idSubscription.unsubscribe();
            },
        });
        // this will fire on a response (success or error)
        // Tendermint adds an "#event" suffix for events that follow a previous subscription
        // https://github.com/tendermint/tendermint/blob/v0.23.0/rpc/core/events.go#L107
        const idEventSubscription = responseStream
            .filter((response) => response.id === this.request.id)
            .subscribe({
            next: (response) => {
                if ((0, json_rpc_1.isJsonRpcErrorResponse)(response)) {
                    this.closeSubscriptions();
                    listener.error(JSON.stringify(response.error));
                }
                else {
                    listener.next(response.result);
                }
            },
        });
        // this will fire in case the websocket disconnects cleanly
        const nonResponseSubscription = responseStream.subscribe({
            error: (error) => {
                this.closeSubscriptions();
                listener.error(error);
            },
            complete: () => {
                this.closeSubscriptions();
                listener.complete();
            },
        });
        this.subscriptions.push(idSubscription, idEventSubscription, nonResponseSubscription);
    }
    closeSubscriptions() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
        // clear unused subscriptions
        this.subscriptions = [];
    }
}
class WebsocketClient {
    constructor(baseUrl, onError = defaultErrorHandler) {
        // Lazily create streams and use the same stream when listening to the same query twice.
        //
        // Creating streams is cheap since producer is not started as long as nobody listens to events. Thus this
        // map is never cleared and there is no need to do so. But unsubscribe all the subscriptions!
        this.subscriptionStreams = new Map();
        // accept host.name:port and assume ws protocol
        // make sure we don't end up with ...//websocket
        const path = baseUrl.endsWith("/") ? "websocket" : "/websocket";
        const cleanBaseUrl = (0, rpcclient_1.hasProtocol)(baseUrl) ? baseUrl : "ws://" + baseUrl;
        this.url = cleanBaseUrl + path;
        this.socket = new socket_1.ReconnectingSocket(this.url);
        const errorSubscription = this.socket.events.subscribe({
            error: (error) => {
                onError(error);
                errorSubscription.unsubscribe();
            },
        });
        this.jsonRpcResponseStream = this.socket.events.map(toJsonRpcResponse);
        this.socket.connect();
    }
    async execute(request) {
        const pendingResponse = this.responseForRequestId(request.id);
        this.socket.queueRequest(JSON.stringify(request));
        const response = await pendingResponse;
        if ((0, json_rpc_1.isJsonRpcErrorResponse)(response)) {
            throw new Error(JSON.stringify(response.error));
        }
        return response;
    }
    listen(request) {
        if (request.method !== "subscribe") {
            throw new Error(`Request method must be "subscribe" to start event listening`);
        }
        const query = request.params.query;
        if (typeof query !== "string") {
            throw new Error("request.params.query must be a string");
        }
        if (!this.subscriptionStreams.has(query)) {
            const producer = new RpcEventProducer(request, this.socket);
            const stream = xstream_1.Stream.create(producer);
            this.subscriptionStreams.set(query, stream);
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.subscriptionStreams.get(query).filter((response) => response.query !== undefined);
    }
    /**
     * Resolves as soon as websocket is connected. execute() queues requests automatically,
     * so this should be required for testing purposes only.
     */
    async connected() {
        await this.socket.connectionStatus.waitFor(socket_1.ConnectionStatus.Connected);
    }
    disconnect() {
        this.socket.disconnect();
    }
    async responseForRequestId(id) {
        return (0, stream_1.firstEvent)(this.jsonRpcResponseStream.filter((r) => r.id === id));
    }
}
exports.WebsocketClient = WebsocketClient;
//# sourceMappingURL=websocketclient.js.map