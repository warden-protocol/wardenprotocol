"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testgroup4PubkeyBech32 = exports.testgroup4 = exports.testgroup3PubkeyBech32 = exports.testgroup3 = exports.testgroup2PubkeyBech32 = exports.testgroup2 = exports.testgroup1PubkeyBech32 = exports.testgroup1 = exports.test3 = exports.test2 = exports.test1 = exports.base64Matcher = void 0;
const encoding_1 = require("./encoding");
exports.base64Matcher = /^(?:[a-zA-Z0-9+/]{4})*(?:|(?:[a-zA-Z0-9+/]{3}=)|(?:[a-zA-Z0-9+/]{2}==)|(?:[a-zA-Z0-9+/]{1}===))$/;
// ./build/wasmd keys add test1
// ./build/wasmd keys add test2
// ./build/wasmd keys add test3
// ./build/wasmd keys add testgroup1 --multisig=test1,test2,test3 --multisig-threshold 2
// ./build/wasmd keys add testgroup2 --multisig=test1,test2,test3 --multisig-threshold 1
// # By default pubkeys are sorted by its address data (https://github.com/cosmos/cosmos-sdk/blob/v0.42.2/client/keys/add.go#L172-L174)
// ./build/wasmd keys add testgroup3 --multisig=test3,test1 --multisig-threshold 2
// ./build/wasmd keys add testgroup4 --multisig=test3,test1 --nosort --multisig-threshold 2
exports.test1 = (0, encoding_1.decodeBech32Pubkey)("wasmpub1addwnpepqwxttx8w2sfs6d8cuzqcuau84grp8xsw95qzdjkmvc44tnckskdxw3zw2km");
exports.test2 = (0, encoding_1.decodeBech32Pubkey)("wasmpub1addwnpepq2gx7x7e29kge5a4ycunytyqr0u8ynql5h583s8r9wdads9m3v8ks6y0nhc");
exports.test3 = (0, encoding_1.decodeBech32Pubkey)("wasmpub1addwnpepq0xfx5vavxmgdkn0p6x0l9p3udttghu3qcldd7ql08wa3xy93qq0xuzvtxc");
// 2/3 multisig
exports.testgroup1 = {
    type: "tendermint/PubKeyMultisigThreshold",
    value: {
        threshold: "2",
        pubkeys: [exports.test1, exports.test2, exports.test3],
    },
};
exports.testgroup1PubkeyBech32 = "wasmpub1ytql0csgqgfzd666axrjzquvkkvwu4qnp5603cyp3emc02sxzwdqutgqym9dke3t2h83dpv6vufzd666axrjzq5sdudaj5tv3nfm2f3exgkgqxlcwfxplf0g0rqwx2um6mqthzc0dqfzd666axrjzq7vjdge6cdksmdx7r5vl72rrc6kk30ezp376mup77wamzvgtzqq7v7aysdd";
exports.testgroup2 = {
    type: "tendermint/PubKeyMultisigThreshold",
    value: {
        threshold: "1",
        pubkeys: [exports.test1, exports.test2, exports.test3],
    },
};
exports.testgroup2PubkeyBech32 = "wasmpub1ytql0csgqyfzd666axrjzquvkkvwu4qnp5603cyp3emc02sxzwdqutgqym9dke3t2h83dpv6vufzd666axrjzq5sdudaj5tv3nfm2f3exgkgqxlcwfxplf0g0rqwx2um6mqthzc0dqfzd666axrjzq7vjdge6cdksmdx7r5vl72rrc6kk30ezp376mup77wamzvgtzqq7vc4ejke";
// 2/2 multisig
exports.testgroup3 = {
    type: "tendermint/PubKeyMultisigThreshold",
    value: {
        threshold: "2",
        pubkeys: [exports.test1, exports.test3],
    },
};
exports.testgroup3PubkeyBech32 = "wasmpub1ytql0csgqgfzd666axrjzquvkkvwu4qnp5603cyp3emc02sxzwdqutgqym9dke3t2h83dpv6vufzd666axrjzq7vjdge6cdksmdx7r5vl72rrc6kk30ezp376mup77wamzvgtzqq7vzjhugu";
// 2/2 multisig with custom sorting
exports.testgroup4 = {
    type: "tendermint/PubKeyMultisigThreshold",
    value: {
        threshold: "2",
        pubkeys: [exports.test3, exports.test1],
    },
};
exports.testgroup4PubkeyBech32 = "wasmpub1ytql0csgqgfzd666axrjzq7vjdge6cdksmdx7r5vl72rrc6kk30ezp376mup77wamzvgtzqq7vfzd666axrjzquvkkvwu4qnp5603cyp3emc02sxzwdqutgqym9dke3t2h83dpv6vujvg56k";
//# sourceMappingURL=testutils.spec.js.map