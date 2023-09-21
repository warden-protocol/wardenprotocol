import { AnyMessage, IMessageTypeRegistry, MessageType } from "@bufbuild/protobuf";
import { BlackbirdPolicy } from "@/proto/fusionchain/policy/policy_pb";

class Registry implements IMessageTypeRegistry {
  findMessage(typeName: string): MessageType<AnyMessage> | undefined {
      switch (typeName) {
        case "/fusionchain.policy.BlackbirdPolicy":
        case "fusionchain.policy.BlackbirdPolicy":
          return BlackbirdPolicy;
      }
      throw new Error("typeName not found: " + typeName);
  }
}

export const registry = new Registry();

