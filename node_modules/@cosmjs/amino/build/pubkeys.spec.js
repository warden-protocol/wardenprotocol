"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pubkeys_1 = require("./pubkeys");
describe("pubkeys", () => {
    const pubkeyEd25519 = {
        type: "tendermint/PubKeyEd25519",
        value: "YZHlYxP5R6olj3Tj3f7VgkQE5VaOvv9G0jKATqdQsqI=",
    };
    const pubkeySecp256k1 = {
        type: "tendermint/PubKeySecp256k1",
        value: "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP",
    };
    const pubkeyMultisigThreshold = {
        type: "tendermint/PubKeyMultisigThreshold",
        value: {
            threshold: "3",
            pubkeys: [
                {
                    type: "tendermint/PubKeySecp256k1",
                    value: "A4KZH7VSRwW/6RTExROivRYKsQP63LnGcBlXFo+eKGpQ",
                },
                {
                    type: "tendermint/PubKeySecp256k1",
                    value: "A8/Cq4VigOnDgl6RSdcx97fjrdCo/qwAX6C34n7ZDZLs",
                },
                {
                    type: "tendermint/PubKeySecp256k1",
                    value: "ApKgZuwy03xgdRnXqG6yEHATomsWDOPacy7nbpsuUCSS",
                },
                {
                    type: "tendermint/PubKeySecp256k1",
                    value: "Aptm8E3WSSFS0RTAIUW+bLi/slYnTEE+h4qPTG28CHfq",
                },
            ],
        },
    };
    describe("isSinglePubkey", () => {
        it("works", () => {
            expect((0, pubkeys_1.isSinglePubkey)(pubkeyEd25519)).toEqual(true);
            expect((0, pubkeys_1.isSinglePubkey)(pubkeySecp256k1)).toEqual(true);
            expect((0, pubkeys_1.isSinglePubkey)(pubkeyMultisigThreshold)).toEqual(false);
        });
    });
    describe("isMultisigThresholdPubkey", () => {
        it("works", () => {
            expect((0, pubkeys_1.isMultisigThresholdPubkey)(pubkeyEd25519)).toEqual(false);
            expect((0, pubkeys_1.isMultisigThresholdPubkey)(pubkeySecp256k1)).toEqual(false);
            expect((0, pubkeys_1.isMultisigThresholdPubkey)(pubkeyMultisigThreshold)).toEqual(true);
        });
    });
});
//# sourceMappingURL=pubkeys.spec.js.map