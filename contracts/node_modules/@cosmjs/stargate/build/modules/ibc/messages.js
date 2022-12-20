"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMsgTransferEncodeObject = exports.ibcTypes = void 0;
const tx_1 = require("cosmjs-types/ibc/applications/transfer/v1/tx");
const tx_2 = require("cosmjs-types/ibc/core/channel/v1/tx");
const tx_3 = require("cosmjs-types/ibc/core/client/v1/tx");
const tx_4 = require("cosmjs-types/ibc/core/connection/v1/tx");
exports.ibcTypes = [
    ["/ibc.applications.transfer.v1.MsgTransfer", tx_1.MsgTransfer],
    ["/ibc.core.channel.v1.MsgAcknowledgement", tx_2.MsgAcknowledgement],
    ["/ibc.core.channel.v1.MsgChannelCloseConfirm", tx_2.MsgChannelCloseConfirm],
    ["/ibc.core.channel.v1.MsgChannelCloseInit", tx_2.MsgChannelCloseInit],
    ["/ibc.core.channel.v1.MsgChannelOpenAck", tx_2.MsgChannelOpenAck],
    ["/ibc.core.channel.v1.MsgChannelOpenConfirm", tx_2.MsgChannelOpenConfirm],
    ["/ibc.core.channel.v1.MsgChannelOpenInit", tx_2.MsgChannelOpenInit],
    ["/ibc.core.channel.v1.MsgChannelOpenTry", tx_2.MsgChannelOpenTry],
    ["/ibc.core.channel.v1.MsgRecvPacket", tx_2.MsgRecvPacket],
    ["/ibc.core.channel.v1.MsgTimeout", tx_2.MsgTimeout],
    ["/ibc.core.channel.v1.MsgTimeoutOnClose", tx_2.MsgTimeoutOnClose],
    ["/ibc.core.client.v1.MsgCreateClient", tx_3.MsgCreateClient],
    ["/ibc.core.client.v1.MsgSubmitMisbehaviour", tx_3.MsgSubmitMisbehaviour],
    ["/ibc.core.client.v1.MsgUpdateClient", tx_3.MsgUpdateClient],
    ["/ibc.core.client.v1.MsgUpgradeClient", tx_3.MsgUpgradeClient],
    ["/ibc.core.connection.v1.MsgConnectionOpenAck", tx_4.MsgConnectionOpenAck],
    ["/ibc.core.connection.v1.MsgConnectionOpenConfirm", tx_4.MsgConnectionOpenConfirm],
    ["/ibc.core.connection.v1.MsgConnectionOpenInit", tx_4.MsgConnectionOpenInit],
    ["/ibc.core.connection.v1.MsgConnectionOpenTry", tx_4.MsgConnectionOpenTry],
];
function isMsgTransferEncodeObject(object) {
    return object.typeUrl === "/ibc.applications.transfer.v1.MsgTransfer";
}
exports.isMsgTransferEncodeObject = isMsgTransferEncodeObject;
//# sourceMappingURL=messages.js.map