import { AnyMessage, IMessageTypeRegistry, MessageType } from "@bufbuild/protobuf";
import { BlackbirdPolicy } from "@/proto/fusionchain/policy/policy_pb";
import { MsgSend } from "./cosmos/bank/v1beta1/tx_pb";
import { MsgNewWorkspace } from "./fusionchain/identity/tx_pb";

const bankTypes: Record<string, MessageType<AnyMessage>> = {
  "/cosmos.bank.v1beta1.MsgSend": MsgSend,
};

const identityTypes: Record<string, MessageType<AnyMessage>> = {
  "/fusionchain.identity.MsgNewWorkspace": MsgNewWorkspace,
};

const treasuryTypes: Record<string, MessageType<AnyMessage>> = {
};

const policyTypes: Record<string, MessageType<AnyMessage>> = {
  "/fusionchain.policy.BlackbirdPolicy": BlackbirdPolicy,
};

const types = {
  ...bankTypes,
  ...identityTypes,
  ...treasuryTypes,
  ...policyTypes,
};

class Registry implements IMessageTypeRegistry {
  findMessage(typeName: string): MessageType<AnyMessage> | undefined {
    if (!typeName.startsWith("/")) {
      typeName = "/" + typeName;
    }

    const type = types[typeName];
    if (type) {
      return type;
    }
    throw new Error("typeName not found: " + typeName);
  }
}

export const registry = new Registry();

