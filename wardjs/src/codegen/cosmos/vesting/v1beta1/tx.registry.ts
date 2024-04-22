//@ts-nocheck
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCreateVestingAccount, MsgCreatePermanentLockedAccount, MsgCreatePeriodicVestingAccount } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/cosmos.vesting.v1beta1.MsgCreateVestingAccount", MsgCreateVestingAccount], ["/cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccount", MsgCreatePermanentLockedAccount], ["/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount", MsgCreatePeriodicVestingAccount]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    createVestingAccount(value: MsgCreateVestingAccount) {
      return {
        typeUrl: "/cosmos.vesting.v1beta1.MsgCreateVestingAccount",
        value: MsgCreateVestingAccount.encode(value).finish()
      };
    },
    createPermanentLockedAccount(value: MsgCreatePermanentLockedAccount) {
      return {
        typeUrl: "/cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccount",
        value: MsgCreatePermanentLockedAccount.encode(value).finish()
      };
    },
    createPeriodicVestingAccount(value: MsgCreatePeriodicVestingAccount) {
      return {
        typeUrl: "/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount",
        value: MsgCreatePeriodicVestingAccount.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    createVestingAccount(value: MsgCreateVestingAccount) {
      return {
        typeUrl: "/cosmos.vesting.v1beta1.MsgCreateVestingAccount",
        value
      };
    },
    createPermanentLockedAccount(value: MsgCreatePermanentLockedAccount) {
      return {
        typeUrl: "/cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccount",
        value
      };
    },
    createPeriodicVestingAccount(value: MsgCreatePeriodicVestingAccount) {
      return {
        typeUrl: "/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount",
        value
      };
    }
  },
  toJSON: {
    createVestingAccount(value: MsgCreateVestingAccount) {
      return {
        typeUrl: "/cosmos.vesting.v1beta1.MsgCreateVestingAccount",
        value: MsgCreateVestingAccount.toJSON(value)
      };
    },
    createPermanentLockedAccount(value: MsgCreatePermanentLockedAccount) {
      return {
        typeUrl: "/cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccount",
        value: MsgCreatePermanentLockedAccount.toJSON(value)
      };
    },
    createPeriodicVestingAccount(value: MsgCreatePeriodicVestingAccount) {
      return {
        typeUrl: "/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount",
        value: MsgCreatePeriodicVestingAccount.toJSON(value)
      };
    }
  },
  fromJSON: {
    createVestingAccount(value: any) {
      return {
        typeUrl: "/cosmos.vesting.v1beta1.MsgCreateVestingAccount",
        value: MsgCreateVestingAccount.fromJSON(value)
      };
    },
    createPermanentLockedAccount(value: any) {
      return {
        typeUrl: "/cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccount",
        value: MsgCreatePermanentLockedAccount.fromJSON(value)
      };
    },
    createPeriodicVestingAccount(value: any) {
      return {
        typeUrl: "/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount",
        value: MsgCreatePeriodicVestingAccount.fromJSON(value)
      };
    }
  },
  fromPartial: {
    createVestingAccount(value: MsgCreateVestingAccount) {
      return {
        typeUrl: "/cosmos.vesting.v1beta1.MsgCreateVestingAccount",
        value: MsgCreateVestingAccount.fromPartial(value)
      };
    },
    createPermanentLockedAccount(value: MsgCreatePermanentLockedAccount) {
      return {
        typeUrl: "/cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccount",
        value: MsgCreatePermanentLockedAccount.fromPartial(value)
      };
    },
    createPeriodicVestingAccount(value: MsgCreatePeriodicVestingAccount) {
      return {
        typeUrl: "/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount",
        value: MsgCreatePeriodicVestingAccount.fromPartial(value)
      };
    }
  }
};