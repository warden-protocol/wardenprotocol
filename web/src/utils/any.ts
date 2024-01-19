import { Any, AnyMessage, Message } from "@bufbuild/protobuf";

export function packAny(message: Message<AnyMessage>) {
  const a = Any.pack(message);
  a.typeUrl = a.typeUrl.replace("type.googleapis.com", "");
  return a;
}
