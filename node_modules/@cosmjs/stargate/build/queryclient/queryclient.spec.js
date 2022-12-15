"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const encoding_1 = require("@cosmjs/encoding");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const bank_1 = require("cosmjs-types/cosmos/bank/v1beta1/bank");
const query_1 = require("cosmjs-types/cosmos/bank/v1beta1/query");
const testutils_spec_1 = require("../testutils.spec");
const queryclient_1 = require("./queryclient");
async function makeClient(rpcUrl) {
    const tmClient = await tendermint_rpc_1.Tendermint34Client.connect(rpcUrl);
    return [queryclient_1.QueryClient.withExtensions(tmClient), tmClient];
}
/**
 * See
 * - https://github.com/cosmos/cosmos-sdk/blob/v0.42.10/x/bank/types/key.go#L27
 * - https://github.com/cosmos/cosmos-sdk/blob/v0.44.2/x/bank/types/key.go#L28
 */
const denomMetadataPrefix = new Uint8Array([0x01]);
describe("QueryClient", () => {
    describe("queryVerified", () => {
        it("works via WebSockets", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClient(testutils_spec_1.simapp.tendermintUrlWs);
            // "keys before 0.45 had denom two times in the key"
            // https://github.com/cosmos/cosmos-sdk/blob/10ad61a4dd/x/bank/migrations/v045/store_test.go#L91
            const key = Uint8Array.from([
                ...denomMetadataPrefix,
                ...(0, encoding_1.toAscii)(testutils_spec_1.simapp.denomFee),
                ...(0, encoding_1.toAscii)(testutils_spec_1.simapp.denomFee),
            ]);
            const data = await client.queryVerified("bank", key);
            const response = bank_1.Metadata.decode(data);
            expect(response.base).toEqual(testutils_spec_1.simapp.denomFee);
            expect(response.description).toEqual("The fee token of this test chain");
            tmClient.disconnect();
        });
        it("works via http", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClient(testutils_spec_1.simapp.tendermintUrlHttp);
            // "keys before 0.45 had denom two times in the key"
            // https://github.com/cosmos/cosmos-sdk/blob/10ad61a4dd/x/bank/migrations/v045/store_test.go#L91
            const key = Uint8Array.from([
                ...denomMetadataPrefix,
                ...(0, encoding_1.toAscii)(testutils_spec_1.simapp.denomFee),
                ...(0, encoding_1.toAscii)(testutils_spec_1.simapp.denomFee),
            ]);
            const data = await client.queryVerified("bank", key);
            const response = bank_1.Metadata.decode(data);
            expect(response.base).toEqual(testutils_spec_1.simapp.denomFee);
            expect(response.description).toEqual("The fee token of this test chain");
            tmClient.disconnect();
        });
    });
    describe("queryUnverified", () => {
        it("works via WebSockets", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClient(testutils_spec_1.simapp.tendermintUrlWs);
            const requestData = Uint8Array.from(query_1.QueryAllBalancesRequest.encode({ address: testutils_spec_1.unused.address }).finish());
            const data = await client.queryUnverified(`/cosmos.bank.v1beta1.Query/AllBalances`, requestData);
            const response = query_1.QueryAllBalancesResponse.decode(data);
            expect(response.balances.length).toEqual(2);
            tmClient.disconnect();
        });
        it("works via http", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClient(testutils_spec_1.simapp.tendermintUrlHttp);
            const requestData = Uint8Array.from(query_1.QueryAllBalancesRequest.encode({ address: testutils_spec_1.unused.address }).finish());
            const data = await client.queryUnverified(`/cosmos.bank.v1beta1.Query/AllBalances`, requestData);
            const response = query_1.QueryAllBalancesResponse.decode(data);
            expect(response.balances.length).toEqual(2);
            tmClient.disconnect();
        });
    });
});
//# sourceMappingURL=queryclient.spec.js.map