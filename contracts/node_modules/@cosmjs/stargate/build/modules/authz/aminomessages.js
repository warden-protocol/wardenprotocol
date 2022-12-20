"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthzAminoConverters = void 0;
function createAuthzAminoConverters() {
    return {
        "/cosmos.authz.v1beta1.MsgGrant": "not_supported_by_chain",
        "/cosmos.authz.v1beta1.MsgExec": "not_supported_by_chain",
        "/cosmos.authz.v1beta1.MsgRevoke": "not_supported_by_chain",
    };
}
exports.createAuthzAminoConverters = createAuthzAminoConverters;
//# sourceMappingURL=aminomessages.js.map