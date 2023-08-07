import { proto3 } from "@bufbuild/protobuf";

export const Coin = proto3.makeMessageType("cosmos.base.v1beta1.Coin", () => [
  { no: 1, name: "denom", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  { no: 2, name: "amount", kind: "scalar", T: 9 /* ScalarType.STRING */ },
]);

export const MsgStoreCode = proto3.makeMessageType(
  "cosmos.wasm.v1.MsgStoreCode",
  () => [
    { no: 1, name: "sender", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "wasmByteCode", kind: "scalar",T: 12 /* ScalarType.BYTES */ },
  ],
);

export const MsgInstantiateContract = proto3.makeMessageType(
  "cosmwasm.wasm.v1.MsgInstantiateContract",
  () => [
    { no: 1, name: "sender", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "admin", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "codeId", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 4, name: "label", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "msg", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 6, name: "funds", kind: "message", T: Coin, repeated: true },
  ],
);

export const MsgExecuteContract = proto3.makeMessageType(
  "cosmwasm.wasm.v1.MsgExecuteContract",
  () => [
    { no: 1, name: "sender", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "contract", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "msg", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 5, name: "funds", kind: "message", T: Coin, repeated: true },
  ],
);
