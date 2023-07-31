"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMsgRevoke = exports.RevokeMessages = exports.createMsgGrant = void 0;
const authz = __importStar(require("../../proto/cosmos/authz/v1beta1/tx"));
const authzUtils = __importStar(require("../../proto/cosmos/authz/v1beta1/authz"));
const utils_1 = require("../utils");
const google = __importStar(require("../../proto/google/protobuf/timestamp"));
function createMsgGrant(granter, grantee, grantMessage, seconds) {
    const msg = new authz.cosmos.authz.v1beta1.MsgGrant({
        granter,
        grantee,
        grant: new authzUtils.cosmos.authz.v1beta1.Grant({
            authorization: (0, utils_1.createAnyMessage)(grantMessage),
            expiration: new google.google.protobuf.Timestamp({
                seconds,
                nanos: 0,
            }),
        }),
    });
    return {
        message: msg,
        path: 'cosmos.authz.v1beta1.MsgGrant',
    };
}
exports.createMsgGrant = createMsgGrant;
var RevokeMessages;
(function (RevokeMessages) {
    RevokeMessages["REVOKE_MSG_DELEGATE"] = "/cosmos.staking.v1beta1.MsgDelegate";
    RevokeMessages["REVOKE_MSG_WITHDRAW_DELEGATOR_REWARDS"] = "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward";
})(RevokeMessages = exports.RevokeMessages || (exports.RevokeMessages = {}));
function createMsgRevoke(granter, grantee, type) {
    const msg = new authz.cosmos.authz.v1beta1.MsgRevoke({
        granter,
        grantee,
        msg_type_url: type,
    });
    return {
        message: msg,
        path: 'cosmos.authz.v1beta1.MsgRevoke',
    };
}
exports.createMsgRevoke = createMsgRevoke;
//# sourceMappingURL=authz.js.map