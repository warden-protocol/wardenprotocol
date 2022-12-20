"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const queryclient_1 = require("../../queryclient");
const testutils_spec_1 = require("../../testutils.spec");
const queries_1 = require("./queries");
async function makeClientWithBank(rpcUrl) {
    const tmClient = await tendermint_rpc_1.Tendermint34Client.connect(rpcUrl);
    return [queryclient_1.QueryClient.withExtensions(tmClient, queries_1.setupBankExtension), tmClient];
}
describe("BankExtension", () => {
    describe("balance", () => {
        it("works for different existing balances", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithBank(testutils_spec_1.simapp.tendermintUrl);
            const response1 = await client.bank.balance(testutils_spec_1.unused.address, testutils_spec_1.simapp.denomFee);
            expect(response1).toEqual({
                amount: testutils_spec_1.unused.balanceFee,
                denom: testutils_spec_1.simapp.denomFee,
            });
            const response2 = await client.bank.balance(testutils_spec_1.unused.address, testutils_spec_1.simapp.denomStaking);
            expect(response2).toEqual({
                amount: testutils_spec_1.unused.balanceStaking,
                denom: testutils_spec_1.simapp.denomStaking,
            });
            tmClient.disconnect();
        });
        it("returns zero for non-existent balance", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithBank(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.bank.balance(testutils_spec_1.unused.address, "gintonic");
            expect(response).toEqual({
                amount: "0",
                denom: "gintonic",
            });
            tmClient.disconnect();
        });
        it("returns zero for non-existent address", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithBank(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.bank.balance(testutils_spec_1.nonExistentAddress, testutils_spec_1.simapp.denomFee);
            expect(response).toEqual({
                amount: "0",
                denom: testutils_spec_1.simapp.denomFee,
            });
            tmClient.disconnect();
        });
    });
    describe("allBalances", () => {
        it("returns all balances for unused account", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithBank(testutils_spec_1.simapp.tendermintUrl);
            const balances = await client.bank.allBalances(testutils_spec_1.unused.address);
            expect(balances).toEqual([
                {
                    amount: testutils_spec_1.unused.balanceFee,
                    denom: testutils_spec_1.simapp.denomFee,
                },
                {
                    amount: testutils_spec_1.unused.balanceStaking,
                    denom: testutils_spec_1.simapp.denomStaking,
                },
            ]);
            tmClient.disconnect();
        });
        it("returns an empty list for non-existent account", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithBank(testutils_spec_1.simapp.tendermintUrl);
            const balances = await client.bank.allBalances(testutils_spec_1.nonExistentAddress);
            expect(balances).toEqual([]);
            tmClient.disconnect();
        });
    });
    describe("totalSupply", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithBank(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.bank.totalSupply();
            expect(response).toEqual([
                {
                    amount: testutils_spec_1.simapp.totalSupply.toString(),
                    denom: testutils_spec_1.simapp.denomFee,
                },
                {
                    amount: jasmine.stringMatching(testutils_spec_1.nonNegativeIntegerMatcher),
                    denom: testutils_spec_1.simapp.denomStaking,
                },
            ]);
            tmClient.disconnect();
        });
    });
    describe("supplyOf", () => {
        it("works for existing denom", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithBank(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.bank.supplyOf(testutils_spec_1.simapp.denomFee);
            expect(response).toEqual({
                amount: testutils_spec_1.simapp.totalSupply.toString(),
                denom: testutils_spec_1.simapp.denomFee,
            });
            tmClient.disconnect();
        });
        it("returns zero for non-existent denom", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithBank(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.bank.supplyOf("gintonic");
            expect(response).toEqual({
                amount: "0",
                denom: "gintonic",
            });
            tmClient.disconnect();
        });
    });
    describe("denomMetadata", () => {
        it("works for existent denom", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithBank(testutils_spec_1.simapp.tendermintUrl);
            const metadata = await client.bank.denomMetadata("ucosm");
            expect(metadata).toEqual({
                description: "The fee token of this test chain",
                denomUnits: [
                    {
                        denom: "ucosm",
                        exponent: 0,
                        aliases: [],
                    },
                    {
                        denom: "COSM",
                        exponent: 6,
                        aliases: [],
                    },
                ],
                base: "ucosm",
                display: "COSM",
                name: "",
                symbol: "",
            });
            tmClient.disconnect();
        });
        it("works for non-existent denom", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithBank(testutils_spec_1.simapp.tendermintUrl);
            await expectAsync(client.bank.denomMetadata("nothere")).toBeRejectedWithError(/code = NotFound/i);
            tmClient.disconnect();
        });
    });
    describe("denomsMetadata", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithBank(testutils_spec_1.simapp.tendermintUrl);
            const metadatas = await client.bank.denomsMetadata();
            expect(metadatas.length).toEqual(1);
            expect(metadatas[0]).toEqual({
                description: "The fee token of this test chain",
                denomUnits: [
                    {
                        denom: "ucosm",
                        exponent: 0,
                        aliases: [],
                    },
                    {
                        denom: "COSM",
                        exponent: 6,
                        aliases: [],
                    },
                ],
                base: "ucosm",
                display: "COSM",
                name: "",
                symbol: "",
            });
            tmClient.disconnect();
        });
    });
});
//# sourceMappingURL=queries.spec.js.map