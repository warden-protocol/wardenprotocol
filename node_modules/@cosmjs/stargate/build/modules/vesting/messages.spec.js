"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amino_1 = require("@cosmjs/amino");
const proto_signing_1 = require("@cosmjs/proto-signing");
const tx_1 = require("cosmjs-types/cosmos/vesting/v1beta1/tx");
const long_1 = __importDefault(require("long"));
const signingstargateclient_1 = require("../../signingstargateclient");
const stargateclient_1 = require("../../stargateclient");
const testutils_spec_1 = require("../../testutils.spec");
describe("vestingTypes", () => {
    it("can sign MsgCreateVestingAccount with sign mode direct", async () => {
        (0, testutils_spec_1.pendingWithoutSimapp)();
        const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
        const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
        const memo = "Vesting is cool!";
        const recipient = (0, testutils_spec_1.makeRandomAddress)();
        const vestingMsg = {
            typeUrl: "/cosmos.vesting.v1beta1.MsgCreateVestingAccount",
            value: tx_1.MsgCreateVestingAccount.fromPartial({
                fromAddress: testutils_spec_1.faucet.address0,
                toAddress: recipient,
                amount: (0, amino_1.coins)(1234, "ucosm"),
                endTime: long_1.default.fromString("1838718434"),
                delayed: true,
            }),
        };
        const result = await client.signAndBroadcast(testutils_spec_1.faucet.address0, [vestingMsg], "auto", memo);
        (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
        const balance = await client.getBalance(recipient, "ucosm");
        expect(balance).toEqual((0, amino_1.coin)(1234, "ucosm"));
        client.disconnect();
    });
});
//# sourceMappingURL=messages.spec.js.map