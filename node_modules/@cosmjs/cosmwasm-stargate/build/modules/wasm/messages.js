"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMsgExecuteEncodeObject = exports.isMsgMigrateEncodeObject = exports.isMsgClearAdminEncodeObject = exports.isMsgUpdateAdminEncodeObject = exports.isMsgInstantiateContractEncodeObject = exports.isMsgStoreCodeEncodeObject = exports.wasmTypes = void 0;
const tx_1 = require("cosmjs-types/cosmwasm/wasm/v1/tx");
exports.wasmTypes = [
    ["/cosmwasm.wasm.v1.MsgClearAdmin", tx_1.MsgClearAdmin],
    ["/cosmwasm.wasm.v1.MsgExecuteContract", tx_1.MsgExecuteContract],
    ["/cosmwasm.wasm.v1.MsgMigrateContract", tx_1.MsgMigrateContract],
    ["/cosmwasm.wasm.v1.MsgStoreCode", tx_1.MsgStoreCode],
    ["/cosmwasm.wasm.v1.MsgInstantiateContract", tx_1.MsgInstantiateContract],
    ["/cosmwasm.wasm.v1.MsgUpdateAdmin", tx_1.MsgUpdateAdmin],
];
function isMsgStoreCodeEncodeObject(object) {
    return object.typeUrl === "/cosmwasm.wasm.v1.MsgStoreCode";
}
exports.isMsgStoreCodeEncodeObject = isMsgStoreCodeEncodeObject;
function isMsgInstantiateContractEncodeObject(object) {
    return (object.typeUrl === "/cosmwasm.wasm.v1.MsgInstantiateContract");
}
exports.isMsgInstantiateContractEncodeObject = isMsgInstantiateContractEncodeObject;
function isMsgUpdateAdminEncodeObject(object) {
    return object.typeUrl === "/cosmwasm.wasm.v1.MsgUpdateAdmin";
}
exports.isMsgUpdateAdminEncodeObject = isMsgUpdateAdminEncodeObject;
function isMsgClearAdminEncodeObject(object) {
    return object.typeUrl === "/cosmwasm.wasm.v1.MsgClearAdmin";
}
exports.isMsgClearAdminEncodeObject = isMsgClearAdminEncodeObject;
function isMsgMigrateEncodeObject(object) {
    return object.typeUrl === "/cosmwasm.wasm.v1.MsgMigrateContract";
}
exports.isMsgMigrateEncodeObject = isMsgMigrateEncodeObject;
function isMsgExecuteEncodeObject(object) {
    return object.typeUrl === "/cosmwasm.wasm.v1.MsgExecuteContract";
}
exports.isMsgExecuteEncodeObject = isMsgExecuteEncodeObject;
//# sourceMappingURL=messages.js.map