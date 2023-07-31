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
exports.createMsgEditValidator = void 0;
const stakingTypes = __importStar(require("../proto/cosmos/staking/v1beta1/staking"));
const staking = __importStar(require("../proto/cosmos/staking/v1beta1/tx"));
const NOT_MODIFY = '[do-not-modify]';
function createMsgEditValidator(moniker, identity, website, securityContact, details, validatorAddress, commissionRate, minSelfDelegation) {
    const message = new staking.cosmos.staking.v1beta1.MsgEditValidator({
        description: new stakingTypes.cosmos.staking.v1beta1.Description({
            moniker: moniker || NOT_MODIFY,
            identity: identity || NOT_MODIFY,
            website: website || NOT_MODIFY,
            security_contact: securityContact || NOT_MODIFY,
            details: details || NOT_MODIFY,
        }),
        validator_address: validatorAddress,
        commission_rate: commissionRate,
        min_self_delegation: minSelfDelegation,
    });
    return {
        message,
        path: 'cosmos.staking.v1beta1.MsgEditValidator',
    };
}
exports.createMsgEditValidator = createMsgEditValidator;
//# sourceMappingURL=validator.js.map