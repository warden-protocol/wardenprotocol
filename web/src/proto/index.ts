import { AnyMessage, IMessageTypeRegistry, MessageType } from "@bufbuild/protobuf";
import { types } from "./registry_types";

class Registry implements IMessageTypeRegistry {
  findMessage(typeName: string): MessageType<AnyMessage> | undefined {
    if (typeName.startsWith("type.googleapis.com/")) {
      typeName = typeName.slice("type.googleapis.com/".length);
    }

    if (typeName.startsWith("/")) {
      typeName = typeName.slice(1);
    }

    const type = types[typeName];
    if (type) {
      return type;
    }
    throw new Error("typeName not found: " + typeName);
  }
}

export const registry = new Registry();

