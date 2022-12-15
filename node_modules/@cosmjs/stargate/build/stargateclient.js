"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StargateClient = exports.assertIsDeliverTxFailure = exports.assertIsDeliverTxSuccess = exports.isDeliverTxSuccess = exports.isDeliverTxFailure = exports.TimeoutError = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const amino_1 = require("@cosmjs/amino");
const encoding_1 = require("@cosmjs/encoding");
const math_1 = require("@cosmjs/math");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const utils_1 = require("@cosmjs/utils");
const accounts_1 = require("./accounts");
const modules_1 = require("./modules");
const queryclient_1 = require("./queryclient");
const search_1 = require("./search");
class TimeoutError extends Error {
    constructor(message, txId) {
        super(message);
        this.txId = txId;
    }
}
exports.TimeoutError = TimeoutError;
function isDeliverTxFailure(result) {
    return !!result.code;
}
exports.isDeliverTxFailure = isDeliverTxFailure;
function isDeliverTxSuccess(result) {
    return !isDeliverTxFailure(result);
}
exports.isDeliverTxSuccess = isDeliverTxSuccess;
/**
 * Ensures the given result is a success. Throws a detailed error message otherwise.
 */
function assertIsDeliverTxSuccess(result) {
    if (isDeliverTxFailure(result)) {
        throw new Error(`Error when broadcasting tx ${result.transactionHash} at height ${result.height}. Code: ${result.code}; Raw log: ${result.rawLog}`);
    }
}
exports.assertIsDeliverTxSuccess = assertIsDeliverTxSuccess;
/**
 * Ensures the given result is a failure. Throws a detailed error message otherwise.
 */
function assertIsDeliverTxFailure(result) {
    if (isDeliverTxSuccess(result)) {
        throw new Error(`Transaction ${result.transactionHash} did not fail at height ${result.height}. Code: ${result.code}; Raw log: ${result.rawLog}`);
    }
}
exports.assertIsDeliverTxFailure = assertIsDeliverTxFailure;
class StargateClient {
    constructor(tmClient, options) {
        if (tmClient) {
            this.tmClient = tmClient;
            this.queryClient = queryclient_1.QueryClient.withExtensions(tmClient, modules_1.setupAuthExtension, modules_1.setupBankExtension, modules_1.setupStakingExtension, modules_1.setupTxExtension);
        }
        const { accountParser = accounts_1.accountFromAny } = options;
        this.accountParser = accountParser;
    }
    static async connect(endpoint, options = {}) {
        const tmClient = await tendermint_rpc_1.Tendermint34Client.connect(endpoint);
        return new StargateClient(tmClient, options);
    }
    getTmClient() {
        return this.tmClient;
    }
    forceGetTmClient() {
        if (!this.tmClient) {
            throw new Error("Tendermint client not available. You cannot use online functionality in offline mode.");
        }
        return this.tmClient;
    }
    getQueryClient() {
        return this.queryClient;
    }
    forceGetQueryClient() {
        if (!this.queryClient) {
            throw new Error("Query client not available. You cannot use online functionality in offline mode.");
        }
        return this.queryClient;
    }
    async getChainId() {
        if (!this.chainId) {
            const response = await this.forceGetTmClient().status();
            const chainId = response.nodeInfo.network;
            if (!chainId)
                throw new Error("Chain ID must not be empty");
            this.chainId = chainId;
        }
        return this.chainId;
    }
    async getHeight() {
        const status = await this.forceGetTmClient().status();
        return status.syncInfo.latestBlockHeight;
    }
    async getAccount(searchAddress) {
        try {
            const account = await this.forceGetQueryClient().auth.account(searchAddress);
            return account ? this.accountParser(account) : null;
        }
        catch (error) {
            if (/rpc error: code = NotFound/i.test(error.toString())) {
                return null;
            }
            throw error;
        }
    }
    async getSequence(address) {
        const account = await this.getAccount(address);
        if (!account) {
            throw new Error("Account does not exist on chain. Send some tokens there before trying to query sequence.");
        }
        return {
            accountNumber: account.accountNumber,
            sequence: account.sequence,
        };
    }
    async getBlock(height) {
        const response = await this.forceGetTmClient().block(height);
        return {
            id: (0, encoding_1.toHex)(response.blockId.hash).toUpperCase(),
            header: {
                version: {
                    block: new math_1.Uint53(response.block.header.version.block).toString(),
                    app: new math_1.Uint53(response.block.header.version.app).toString(),
                },
                height: response.block.header.height,
                chainId: response.block.header.chainId,
                time: (0, tendermint_rpc_1.toRfc3339WithNanoseconds)(response.block.header.time),
            },
            txs: response.block.txs,
        };
    }
    async getBalance(address, searchDenom) {
        return this.forceGetQueryClient().bank.balance(address, searchDenom);
    }
    /**
     * Queries all balances for all denoms that belong to this address.
     *
     * Uses the grpc queries (which iterates over the store internally), and we cannot get
     * proofs from such a method.
     */
    async getAllBalances(address) {
        return this.forceGetQueryClient().bank.allBalances(address);
    }
    async getBalanceStaked(address) {
        const allDelegations = [];
        let startAtKey = undefined;
        do {
            const { delegationResponses, pagination } = await this.forceGetQueryClient().staking.delegatorDelegations(address, startAtKey);
            const loadedDelegations = delegationResponses || [];
            allDelegations.push(...loadedDelegations);
            startAtKey = pagination === null || pagination === void 0 ? void 0 : pagination.nextKey;
        } while (startAtKey !== undefined && startAtKey.length !== 0);
        const sumValues = allDelegations.reduce((previousValue, currentValue) => {
            // Safe because field is set to non-nullable (https://github.com/cosmos/cosmos-sdk/blob/v0.45.3/proto/cosmos/staking/v1beta1/staking.proto#L295)
            (0, utils_1.assert)(currentValue.balance);
            return previousValue !== null ? (0, amino_1.addCoins)(previousValue, currentValue.balance) : currentValue.balance;
        }, null);
        return sumValues;
    }
    async getDelegation(delegatorAddress, validatorAddress) {
        var _a;
        let delegatedAmount;
        try {
            delegatedAmount = (_a = (await this.forceGetQueryClient().staking.delegation(delegatorAddress, validatorAddress)).delegationResponse) === null || _a === void 0 ? void 0 : _a.balance;
        }
        catch (e) {
            if (e.toString().includes("key not found")) {
                // ignore, `delegatedAmount` remains undefined
            }
            else {
                throw e;
            }
        }
        return delegatedAmount || null;
    }
    async getTx(id) {
        var _a;
        const results = await this.txsQuery(`tx.hash='${id}'`);
        return (_a = results[0]) !== null && _a !== void 0 ? _a : null;
    }
    async searchTx(query, filter = {}) {
        const minHeight = filter.minHeight || 0;
        const maxHeight = filter.maxHeight || Number.MAX_SAFE_INTEGER;
        if (maxHeight < minHeight)
            return []; // optional optimization
        function withFilters(originalQuery) {
            return `${originalQuery} AND tx.height>=${minHeight} AND tx.height<=${maxHeight}`;
        }
        let txs;
        if ((0, search_1.isSearchByHeightQuery)(query)) {
            txs =
                query.height >= minHeight && query.height <= maxHeight
                    ? await this.txsQuery(`tx.height=${query.height}`)
                    : [];
        }
        else if ((0, search_1.isSearchBySentFromOrToQuery)(query)) {
            const sentQuery = withFilters(`message.module='bank' AND transfer.sender='${query.sentFromOrTo}'`);
            const receivedQuery = withFilters(`message.module='bank' AND transfer.recipient='${query.sentFromOrTo}'`);
            const [sent, received] = await Promise.all([sentQuery, receivedQuery].map((rawQuery) => this.txsQuery(rawQuery)));
            const sentHashes = sent.map((t) => t.hash);
            txs = [...sent, ...received.filter((t) => !sentHashes.includes(t.hash))];
        }
        else if ((0, search_1.isSearchByTagsQuery)(query)) {
            const rawQuery = withFilters(query.tags.map((t) => `${t.key}='${t.value}'`).join(" AND "));
            txs = await this.txsQuery(rawQuery);
        }
        else {
            throw new Error("Unknown query type");
        }
        const filtered = txs.filter((tx) => tx.height >= minHeight && tx.height <= maxHeight);
        return filtered;
    }
    disconnect() {
        if (this.tmClient)
            this.tmClient.disconnect();
    }
    /**
     * Broadcasts a signed transaction to the network and monitors its inclusion in a block.
     *
     * If broadcasting is rejected by the node for some reason (e.g. because of a CheckTx failure),
     * an error is thrown.
     *
     * If the transaction is not included in a block before the provided timeout, this errors with a `TimeoutError`.
     *
     * If the transaction is included in a block, a `DeliverTxResponse` is returned. The caller then
     * usually needs to check for execution success or failure.
     */
    async broadcastTx(tx, timeoutMs = 60000, pollIntervalMs = 3000) {
        let timedOut = false;
        const txPollTimeout = setTimeout(() => {
            timedOut = true;
        }, timeoutMs);
        const pollForTx = async (txId) => {
            if (timedOut) {
                throw new TimeoutError(`Transaction with ID ${txId} was submitted but was not yet found on the chain. You might want to check later. There was a wait of ${timeoutMs / 1000} seconds.`, txId);
            }
            await (0, utils_1.sleep)(pollIntervalMs);
            const result = await this.getTx(txId);
            return result
                ? {
                    code: result.code,
                    height: result.height,
                    rawLog: result.rawLog,
                    transactionHash: txId,
                    gasUsed: result.gasUsed,
                    gasWanted: result.gasWanted,
                }
                : pollForTx(txId);
        };
        const broadcasted = await this.forceGetTmClient().broadcastTxSync({ tx });
        if (broadcasted.code) {
            return Promise.reject(new Error(`Broadcasting transaction failed with code ${broadcasted.code} (codespace: ${broadcasted.codeSpace}). Log: ${broadcasted.log}`));
        }
        const transactionId = (0, encoding_1.toHex)(broadcasted.hash).toUpperCase();
        return new Promise((resolve, reject) => pollForTx(transactionId).then((value) => {
            clearTimeout(txPollTimeout);
            resolve(value);
        }, (error) => {
            clearTimeout(txPollTimeout);
            reject(error);
        }));
    }
    async txsQuery(query) {
        const results = await this.forceGetTmClient().txSearchAll({ query: query });
        return results.txs.map((tx) => {
            return {
                height: tx.height,
                hash: (0, encoding_1.toHex)(tx.hash).toUpperCase(),
                code: tx.result.code,
                rawLog: tx.result.log || "",
                tx: tx.tx,
                gasUsed: tx.result.gasUsed,
                gasWanted: tx.result.gasWanted,
            };
        });
    }
}
exports.StargateClient = StargateClient;
//# sourceMappingURL=stargateclient.js.map