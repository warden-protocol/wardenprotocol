"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const queryclient_1 = require("../../queryclient");
const testutils_spec_1 = require("../../testutils.spec");
const queries_1 = require("./queries");
async function makeClientWithSlashing(rpcUrl) {
    const tmClient = await tendermint_rpc_1.Tendermint34Client.connect(rpcUrl);
    return [queryclient_1.QueryClient.withExtensions(tmClient, queries_1.setupSlashingExtension), tmClient];
}
describe("SlashingExtension", () => {
    describe("signingInfos", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithSlashing(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.slashing.signingInfos();
            expect(response.info).toBeDefined();
            expect(response.info).not.toBeNull();
            tmClient.disconnect();
        });
    });
    describe("params", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithSlashing(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.slashing.params();
            expect(response.params).toBeDefined();
            expect(response.params).not.toBeNull();
            tmClient.disconnect();
        });
    });
});
//# sourceMappingURL=queries.spec.js.map