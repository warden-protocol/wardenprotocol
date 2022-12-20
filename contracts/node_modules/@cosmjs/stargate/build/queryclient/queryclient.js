"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClient = void 0;
/* eslint-disable no-dupe-class-members, @typescript-eslint/ban-types, @typescript-eslint/naming-convention */
const ics23_1 = require("@confio/ics23");
const encoding_1 = require("@cosmjs/encoding");
const stream_1 = require("@cosmjs/stream");
const utils_1 = require("@cosmjs/utils");
function checkAndParseOp(op, kind, key) {
    if (op.type !== kind) {
        throw new Error(`Op expected to be ${kind}, got "${op.type}`);
    }
    if (!(0, utils_1.arrayContentEquals)(key, op.key)) {
        throw new Error(`Proven key different than queried key.\nQuery: ${(0, encoding_1.toHex)(key)}\nProven: ${(0, encoding_1.toHex)(op.key)}`);
    }
    return ics23_1.ics23.CommitmentProof.decode(op.data);
}
class QueryClient {
    constructor(tmClient) {
        this.tmClient = tmClient;
    }
    static withExtensions(tmClient, ...extensionSetups) {
        const client = new QueryClient(tmClient);
        const extensions = extensionSetups.map((setupExtension) => setupExtension(client));
        for (const extension of extensions) {
            (0, utils_1.assert)((0, utils_1.isNonNullObject)(extension), `Extension must be a non-null object`);
            for (const [moduleKey, moduleValue] of Object.entries(extension)) {
                (0, utils_1.assert)((0, utils_1.isNonNullObject)(moduleValue), `Module must be a non-null object. Found type ${typeof moduleValue} for module "${moduleKey}".`);
                const current = client[moduleKey] || {};
                client[moduleKey] = {
                    ...current,
                    ...moduleValue,
                };
            }
        }
        return client;
    }
    async queryVerified(store, key, desiredHeight) {
        const { height, proof, value } = await this.queryRawProof(store, key, desiredHeight);
        const subProof = checkAndParseOp(proof.ops[0], "ics23:iavl", key);
        const storeProof = checkAndParseOp(proof.ops[1], "ics23:simple", (0, encoding_1.toAscii)(store));
        // this must always be existence, if the store is not a typo
        (0, utils_1.assert)(storeProof.exist);
        (0, utils_1.assert)(storeProof.exist.value);
        // this may be exist or non-exist, depends on response
        if (!value || value.length === 0) {
            // non-existence check
            (0, utils_1.assert)(subProof.nonexist);
            // the subproof must map the desired key to the "value" of the storeProof
            (0, ics23_1.verifyNonExistence)(subProof.nonexist, ics23_1.iavlSpec, storeProof.exist.value, key);
        }
        else {
            // existence check
            (0, utils_1.assert)(subProof.exist);
            (0, utils_1.assert)(subProof.exist.value);
            // the subproof must map the desired key to the "value" of the storeProof
            (0, ics23_1.verifyExistence)(subProof.exist, ics23_1.iavlSpec, storeProof.exist.value, key, value);
        }
        // the store proof must map its declared value (root of subProof) to the appHash of the next block
        const header = await this.getNextHeader(height);
        (0, ics23_1.verifyExistence)(storeProof.exist, ics23_1.tendermintSpec, header.appHash, (0, encoding_1.toAscii)(store), storeProof.exist.value);
        return value;
    }
    async queryRawProof(store, queryKey, desiredHeight) {
        var _a;
        const { key, value, height, proof, code, log } = await this.tmClient.abciQuery({
            // we need the StoreKey for the module, not the module name
            // https://github.com/cosmos/cosmos-sdk/blob/8cab43c8120fec5200c3459cbf4a92017bb6f287/x/auth/types/keys.go#L12
            path: `/store/${store}/key`,
            data: queryKey,
            prove: true,
            height: desiredHeight,
        });
        if (code) {
            throw new Error(`Query failed with (${code}): ${log}`);
        }
        if (!(0, utils_1.arrayContentEquals)(queryKey, key)) {
            throw new Error(`Response key ${(0, encoding_1.toHex)(key)} doesn't match query key ${(0, encoding_1.toHex)(queryKey)}`);
        }
        if (!height) {
            throw new Error("No query height returned");
        }
        if (!proof || proof.ops.length !== 2) {
            throw new Error(`Expected 2 proof ops, got ${(_a = proof === null || proof === void 0 ? void 0 : proof.ops.length) !== null && _a !== void 0 ? _a : 0}. Are you using stargate?`);
        }
        // we don't need the results, but we can ensure the data is the proper format
        checkAndParseOp(proof.ops[0], "ics23:iavl", key);
        checkAndParseOp(proof.ops[1], "ics23:simple", (0, encoding_1.toAscii)(store));
        return {
            key: key,
            value: value,
            height: height,
            // need to clone this: readonly input / writeable output
            proof: {
                ops: [...proof.ops],
            },
        };
    }
    async queryUnverified(path, request) {
        const response = await this.tmClient.abciQuery({
            path: path,
            data: request,
            prove: false,
        });
        if (response.code) {
            throw new Error(`Query failed with (${response.code}): ${response.log}`);
        }
        return response.value;
    }
    // this must return the header for height+1
    // throws an error if height is 0 or undefined
    async getNextHeader(height) {
        (0, utils_1.assertDefined)(height);
        if (height === 0) {
            throw new Error("Query returned height 0, cannot prove it");
        }
        const searchHeight = height + 1;
        let nextHeader;
        let headersSubscription;
        try {
            headersSubscription = this.tmClient.subscribeNewBlockHeader();
        }
        catch (_a) {
            // Ignore exception caused by non-WebSocket Tendermint clients
        }
        if (headersSubscription) {
            const firstHeader = await (0, stream_1.firstEvent)(headersSubscription);
            // The first header we get might not be n+1 but n+2 or even higher. In such cases we fall back on a query.
            if (firstHeader.height === searchHeight) {
                nextHeader = firstHeader;
            }
        }
        while (!nextHeader) {
            // start from current height to avoid backend error for minHeight in the future
            const correctHeader = (await this.tmClient.blockchain(height, searchHeight)).blockMetas
                .map((meta) => meta.header)
                .find((h) => h.height === searchHeight);
            if (correctHeader) {
                nextHeader = correctHeader;
            }
            else {
                await (0, utils_1.sleep)(1000);
            }
        }
        (0, utils_1.assert)(nextHeader.height === searchHeight, "Got wrong header. This is a bug in the logic above.");
        return nextHeader;
    }
}
exports.QueryClient = QueryClient;
//# sourceMappingURL=queryclient.js.map