"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const proto_signing_1 = require("@cosmjs/proto-signing");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const utils_1 = require("@cosmjs/utils");
const long_1 = __importDefault(require("long"));
const queryclient_1 = require("../../queryclient");
const signingstargateclient_1 = require("../../signingstargateclient");
const stargateclient_1 = require("../../stargateclient");
const testutils_spec_1 = require("../../testutils.spec");
const queries_1 = require("./queries");
async function makeClientWithTx(rpcUrl) {
    const tmClient = await tendermint_rpc_1.Tendermint34Client.connect(rpcUrl);
    return [queryclient_1.QueryClient.withExtensions(tmClient, queries_1.setupTxExtension), tmClient];
}
describe("TxExtension", () => {
    const defaultFee = {
        amount: (0, proto_signing_1.coins)(25000, "ucosm"),
        gas: "1500000", // 1.5 million
    };
    let txHash;
    let memo;
    beforeAll(async () => {
        if ((0, testutils_spec_1.simappEnabled)()) {
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
            const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
            {
                const recipient = (0, testutils_spec_1.makeRandomAddress)();
                memo = `Test tx ${Date.now()}`;
                const result = await client.sendTokens(testutils_spec_1.faucet.address0, recipient, (0, proto_signing_1.coins)(25000, "ucosm"), defaultFee, memo);
                (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                txHash = result.transactionHash;
            }
            await (0, utils_1.sleep)(75); // wait until transactions are indexed
        }
    });
    describe("getTx", () => {
        it("works", async () => {
            var _a, _b;
            (0, testutils_spec_1.pendingWithoutSimapp)();
            (0, utils_1.assertDefined)(txHash);
            (0, utils_1.assertDefined)(memo);
            const [client, tmClient] = await makeClientWithTx(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.tx.getTx(txHash);
            expect((_b = (_a = response.tx) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.memo).toEqual(memo);
            tmClient.disconnect();
        });
    });
    describe("simulate", () => {
        it("works", async () => {
            var _a, _b, _c;
            (0, testutils_spec_1.pendingWithoutSimapp)();
            (0, utils_1.assertDefined)(txHash);
            (0, utils_1.assertDefined)(memo);
            const [client, tmClient] = await makeClientWithTx(testutils_spec_1.simapp.tendermintUrl);
            const sequenceClient = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
            const registry = new proto_signing_1.Registry(signingstargateclient_1.defaultRegistryTypes);
            const msg = {
                delegatorAddress: testutils_spec_1.faucet.address0,
                validatorAddress: testutils_spec_1.validator.validatorAddress,
                amount: (0, proto_signing_1.coin)(25000, "ustake"),
            };
            const msgAny = registry.encodeAsAny({
                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                value: msg,
            });
            const { sequence } = await sequenceClient.getSequence(testutils_spec_1.faucet.address0);
            const response = await client.tx.simulate([msgAny], "foo", testutils_spec_1.faucet.pubkey0, sequence);
            expect((_a = response.gasInfo) === null || _a === void 0 ? void 0 : _a.gasUsed.toNumber()).toBeGreaterThanOrEqual(101000);
            expect((_b = response.gasInfo) === null || _b === void 0 ? void 0 : _b.gasUsed.toNumber()).toBeLessThanOrEqual(150000);
            expect((_c = response.gasInfo) === null || _c === void 0 ? void 0 : _c.gasWanted).toEqual((0, queryclient_1.longify)(long_1.default.UZERO));
            tmClient.disconnect();
        });
    });
});
//# sourceMappingURL=queries.spec.js.map