"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const proto_signing_1 = require("@cosmjs/proto-signing");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const utils_1 = require("@cosmjs/utils");
const auth_1 = require("cosmjs-types/cosmos/auth/v1beta1/auth");
const any_1 = require("cosmjs-types/google/protobuf/any");
const long_1 = __importDefault(require("long"));
const queryclient_1 = require("../../queryclient");
const testutils_spec_1 = require("../../testutils.spec");
const queries_1 = require("./queries");
async function makeClientWithAuth(rpcUrl) {
    const tmClient = await tendermint_rpc_1.Tendermint34Client.connect(rpcUrl);
    return [queryclient_1.QueryClient.withExtensions(tmClient, queries_1.setupAuthExtension), tmClient];
}
describe("AuthExtension", () => {
    describe("account", () => {
        it("works for unused account", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithAuth(testutils_spec_1.simapp.tendermintUrl);
            const account = await client.auth.account(testutils_spec_1.unused.address);
            (0, utils_1.assert)(account);
            expect(account.typeUrl).toEqual("/cosmos.auth.v1beta1.BaseAccount");
            expect(auth_1.BaseAccount.decode(account.value)).toEqual({
                address: testutils_spec_1.unused.address,
                // pubKey not set
                accountNumber: long_1.default.fromNumber(testutils_spec_1.unused.accountNumber, true),
                sequence: long_1.default.fromNumber(0, true),
            });
            tmClient.disconnect();
        });
        it("works for account with pubkey and non-zero sequence", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithAuth(testutils_spec_1.simapp.tendermintUrl);
            const account = await client.auth.account(testutils_spec_1.validator.delegatorAddress);
            (0, utils_1.assert)(account);
            expect(account.typeUrl).toEqual("/cosmos.auth.v1beta1.BaseAccount");
            expect(auth_1.BaseAccount.decode(account.value)).toEqual({
                address: testutils_spec_1.validator.delegatorAddress,
                pubKey: any_1.Any.fromPartial((0, proto_signing_1.encodePubkey)(testutils_spec_1.validator.pubkey)),
                accountNumber: long_1.default.fromNumber(0, true),
                sequence: long_1.default.fromNumber(testutils_spec_1.validator.sequence, true),
            });
            tmClient.disconnect();
        });
        it("rejects for non-existent address", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const [client, tmClient] = await makeClientWithAuth(testutils_spec_1.simapp.tendermintUrl);
            await expectAsync(client.auth.account(testutils_spec_1.nonExistentAddress)).toBeRejectedWithError(/account cosmos1p79apjaufyphcmsn4g07cynqf0wyjuezqu84hd not found/i);
            tmClient.disconnect();
        });
    });
});
//# sourceMappingURL=queries.spec.js.map