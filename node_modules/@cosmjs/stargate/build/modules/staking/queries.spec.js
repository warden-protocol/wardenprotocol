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
async function makeClientWithStaking(rpcUrl) {
    const tmClient = await tendermint_rpc_1.Tendermint34Client.connect(rpcUrl);
    return [queryclient_1.QueryClient.withExtensions(tmClient, queries_1.setupStakingExtension), tmClient];
}
describe("StakingExtension", () => {
    const defaultFee = {
        amount: (0, proto_signing_1.coins)(25000, "ucosm"),
        gas: "1500000", // 1.5 million
    };
    beforeAll(async () => {
        if ((0, testutils_spec_1.simappEnabled)()) {
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
            const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
            {
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
            }
            {
                const msg = {
                    delegatorAddress: testutils_spec_1.faucet.address0,
                    validatorAddress: testutils_spec_1.validator.validatorAddress,
                    amount: (0, proto_signing_1.coin)(100, "ustake"),
                };
                const msgAny = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
                    value: msg,
                };
                const memo = "Test undelegation for Stargate";
                const result = await client.signAndBroadcast(testutils_spec_1.faucet.address0, [msgAny], defaultFee, memo);
                (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
            }
            await (0, utils_1.sleep)(75); // wait until transactions are indexed
        }
    });
    describe("delegation", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithStaking(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.staking.delegation(testutils_spec_1.faucet.address0, testutils_spec_1.validator.validatorAddress);
            expect(response.delegationResponse).toBeDefined();
            expect(response.delegationResponse).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("delegatorDelegations", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithStaking(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.staking.delegatorDelegations(testutils_spec_1.faucet.address0);
            expect(response.delegationResponses).toBeDefined();
            expect(response.delegationResponses).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("delegatorUnbondingDelegations", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithStaking(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.staking.delegatorUnbondingDelegations(testutils_spec_1.faucet.address0);
            expect(response.unbondingResponses).toBeDefined();
            expect(response.unbondingResponses).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("delegatorValidator", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithStaking(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.staking.delegatorValidator(testutils_spec_1.faucet.address0, testutils_spec_1.validator.validatorAddress);
            expect(response.validator).toBeDefined();
            expect(response.validator).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("delegatorValidators", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithStaking(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.staking.delegatorValidators(testutils_spec_1.faucet.address0);
            expect(response.validators).toBeDefined();
            expect(response.validators).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("historicalInfo", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithStaking(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.staking.historicalInfo(5);
            expect(response.hist).toBeDefined();
            expect(response.hist).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("params", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithStaking(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.staking.params();
            expect(response.params).toBeDefined();
            expect(response.params).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("pool", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithStaking(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.staking.pool();
            expect(response.pool).toBeDefined();
            expect(response.pool).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("redelegations", () => {
        it("works", async () => {
            // TODO: Set up a result for this test
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithStaking(testutils_spec_1.simapp.tendermintUrl);
            await expectAsync(client.staking.redelegations(testutils_spec_1.faucet.address0, testutils_spec_1.validator.validatorAddress, testutils_spec_1.validator.validatorAddress)).toBeRejectedWithError(/redelegation not found/i);
            tmClient.disconnect();
        });
    });
    describe("unbondingDelegation", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithStaking(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.staking.unbondingDelegation(testutils_spec_1.faucet.address0, testutils_spec_1.validator.validatorAddress);
            expect(response.unbond).toBeDefined();
            expect(response.unbond).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("validator", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithStaking(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.staking.validator(testutils_spec_1.validator.validatorAddress);
            expect(response.validator).toBeDefined();
            expect(response.validator).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("validatorDelegations", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithStaking(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.staking.validatorDelegations(testutils_spec_1.validator.validatorAddress);
            expect(response.delegationResponses).toBeDefined();
            expect(response.delegationResponses).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("validators", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithStaking(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.staking.validators("BOND_STATUS_BONDED");
            expect(response.validators).toBeDefined();
            expect(response.validators).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("validatorUnbondingDelegations", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithStaking(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.staking.validatorUnbondingDelegations(testutils_spec_1.validator.validatorAddress);
            expect(response.unbondingResponses).toBeDefined();
            expect(response.unbondingResponses).not.toBeNull();
            tmClient.disconnect();
        });
    });
});
//# sourceMappingURL=queries.spec.js.map