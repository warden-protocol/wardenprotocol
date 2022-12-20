"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const proto_signing_1 = require("@cosmjs/proto-signing");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const utils_1 = require("@cosmjs/utils");
const queryclient_1 = require("../../queryclient");
const signingstargateclient_1 = require("../../signingstargateclient");
const stargateclient_1 = require("../../stargateclient");
const testutils_spec_1 = require("../../testutils.spec");
const queries_1 = require("./queries");
async function makeClientWithDistribution(rpcUrl) {
    const tmClient = await tendermint_rpc_1.Tendermint34Client.connect(rpcUrl);
    return [queryclient_1.QueryClient.withExtensions(tmClient, queries_1.setupDistributionExtension), tmClient];
}
describe("DistributionExtension", () => {
    const defaultFee = {
        amount: (0, proto_signing_1.coins)(25000, "ucosm"),
        gas: "1500000", // 1.5 million
    };
    beforeAll(async () => {
        if ((0, testutils_spec_1.simappEnabled)()) {
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
            const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
            const msg = {
                delegatorAddress: testutils_spec_1.faucet.address0,
                validatorAddress: testutils_spec_1.validator.validatorAddress,
                amount: (0, proto_signing_1.coin)(25000, "ustake"),
            };
            const msgAny = {
                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                value: msg,
            };
            const memo = "Test delegation for Stargate";
            const result = await client.signAndBroadcast(testutils_spec_1.faucet.address0, [msgAny], defaultFee, memo);
            (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
            await (0, utils_1.sleep)(75); // wait until transactions are indexed
        }
    });
    describe("communityPool", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithDistribution(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.distribution.communityPool();
            expect(response.pool).toBeDefined();
            expect(response.pool).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("delegationRewards", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithDistribution(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.distribution.delegationRewards(testutils_spec_1.faucet.address0, testutils_spec_1.validator.validatorAddress);
            expect(response.rewards).toBeDefined();
            expect(response.rewards).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("delegationTotalRewards", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithDistribution(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.distribution.delegationTotalRewards(testutils_spec_1.faucet.address0);
            expect(response.rewards).toBeDefined();
            expect(response.rewards).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("delegatorValidators", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithDistribution(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.distribution.delegatorValidators(testutils_spec_1.faucet.address0);
            expect(response.validators).toBeDefined();
            expect(response.validators).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("delegatorWithdrawAddress", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithDistribution(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.distribution.delegatorWithdrawAddress(testutils_spec_1.faucet.address0);
            expect(response.withdrawAddress).toBeDefined();
            expect(response.withdrawAddress).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("params", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithDistribution(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.distribution.params();
            expect(response.params).toBeDefined();
            expect(response.params).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("validatorCommission", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithDistribution(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.distribution.validatorCommission(testutils_spec_1.validator.validatorAddress);
            expect(response.commission).toBeDefined();
            expect(response.commission).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("validatorOutstandingRewards", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithDistribution(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.distribution.validatorOutstandingRewards(testutils_spec_1.validator.validatorAddress);
            expect(response.rewards).toBeDefined();
            expect(response.rewards).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("validatorSlashes", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithDistribution(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.distribution.validatorSlashes(testutils_spec_1.validator.validatorAddress, 1, 5);
            expect(response.slashes).toBeDefined();
            expect(response.slashes).not.toBeNull();
            tmClient.disconnect();
        });
    });
});
//# sourceMappingURL=queries.spec.js.map