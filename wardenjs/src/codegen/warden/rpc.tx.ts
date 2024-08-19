//@ts-nocheck
import { Rpc } from "../helpers.js";
export const createRPCMsgClient = async ({
  rpc
}: {
  rpc: Rpc;
}) => ({
  cosmos: {
    authz: {
      v1beta1: new (await import("../cosmos/authz/v1beta1/tx.rpc.msg.js")).MsgClientImpl(rpc)
    },
    bank: {
      v1beta1: new (await import("../cosmos/bank/v1beta1/tx.rpc.msg.js")).MsgClientImpl(rpc)
    },
    distribution: {
      v1beta1: new (await import("../cosmos/distribution/v1beta1/tx.rpc.msg.js")).MsgClientImpl(rpc)
    },
    feegrant: {
      v1beta1: new (await import("../cosmos/feegrant/v1beta1/tx.rpc.msg.js")).MsgClientImpl(rpc)
    },
    gov: {
      v1: new (await import("../cosmos/gov/v1/tx.rpc.msg.js")).MsgClientImpl(rpc),
      v1beta1: new (await import("../cosmos/gov/v1beta1/tx.rpc.msg.js")).MsgClientImpl(rpc)
    },
    group: {
      v1: new (await import("../cosmos/group/v1/tx.rpc.msg.js")).MsgClientImpl(rpc)
    },
    staking: {
      v1beta1: new (await import("../cosmos/staking/v1beta1/tx.rpc.msg.js")).MsgClientImpl(rpc)
    },
    upgrade: {
      v1beta1: new (await import("../cosmos/upgrade/v1beta1/tx.rpc.msg.js")).MsgClientImpl(rpc)
    },
    vesting: {
      v1beta1: new (await import("../cosmos/vesting/v1beta1/tx.rpc.msg.js")).MsgClientImpl(rpc)
    }
  },
  warden: {
    act: {
      v1beta1: new (await import("./act/v1beta1/tx.rpc.msg.js")).MsgClientImpl(rpc)
    },
    gmp: new (await import("./gmp/tx.rpc.msg.js")).MsgClientImpl(rpc),
    warden: {
      v1beta3: new (await import("./warden/v1beta3/tx.rpc.msg.js")).MsgClientImpl(rpc)
    }
  }
});