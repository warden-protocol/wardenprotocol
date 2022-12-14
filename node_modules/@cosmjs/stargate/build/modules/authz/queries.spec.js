"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amino_1 = require("@cosmjs/amino");
const proto_signing_1 = require("@cosmjs/proto-signing");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const utils_1 = require("@cosmjs/utils");
const authz_1 = require("cosmjs-types/cosmos/authz/v1beta1/authz");
const queryclient_1 = require("../../queryclient");
const signingstargateclient_1 = require("../../signingstargateclient");
const stargateclient_1 = require("../../stargateclient");
const testutils_spec_1 = require("../../testutils.spec");
const queries_1 = require("./queries");
async function makeClientWithAuthz(rpcUrl) {
    const tmClient = await tendermint_rpc_1.Tendermint34Client.connect(rpcUrl);
    return [queryclient_1.QueryClient.withExtensions(tmClient, queries_1.setupAuthzExtension), tmClient];
}
describe("AuthzExtension", () => {
    const defaultFee = {
        amount: (0, proto_signing_1.coins)(25000, "ucosm"),
        gas: "1500000", // 1.5 million
    };
    const granter1Address = testutils_spec_1.faucet.address1;
    const grantee1Address = (0, testutils_spec_1.makeRandomAddress)();
    const grantedMsg = "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward";
    beforeAll(async () => {
        if ((0, testutils_spec_1.simapp44Enabled)()) {
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic, {
                // Use address 1 and 2 instead of 0 to avoid conflicts with other delegation tests
                // This must match `voterAddress` above.
                hdPaths: [(0, amino_1.makeCosmoshubPath)(1), (0, amino_1.makeCosmoshubPath)(2)],
            });
            const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
            const grantMsg = {
                typeUrl: "/cosmos.authz.v1beta1.MsgGrant",
                value: {
                    granter: granter1Address,
                    grantee: grantee1Address,
                    grant: {
                        authorization: {
                            typeUrl: "/cosmos.authz.v1beta1.GenericAuthorization",
                            value: authz_1.GenericAuthorization.encode(authz_1.GenericAuthorization.fromPartial({
                                msg: grantedMsg,
                            })).finish(),
                        },
                    },
                },
            };
            const grantResult = await client.signAndBroadcast(granter1Address, [grantMsg], defaultFee, "Test grant for simd");
            (0, stargateclient_1.assertIsDeliverTxSuccess)(grantResult);
            await (0, utils_1.sleep)(75); // wait until transactions are indexed
            client.disconnect();
        }
    });
    describe("grants", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp44)();
            const [client, tmClient] = await makeClientWithAuthz(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.authz.grants(granter1Address, grantee1Address, "");
            expect(response.grants.length).toEqual(1);
            const grant = response.grants[0];
            // Needs to respond with a grant
            (0, utils_1.assertDefined)(grant.authorization);
            // Needs to be GenericAuthorization to decode it below
            expect(grant.authorization.typeUrl).toEqual("/cosmos.authz.v1beta1.GenericAuthorization");
            // Decode the message
            const msgDecoded = authz_1.GenericAuthorization.decode(grant.authorization.value).msg;
            // Check if its the same one then we granted
            expect(msgDecoded).toEqual(grantedMsg);
            tmClient.disconnect();
        });
    });
});
//# sourceMappingURL=queries.spec.js.map