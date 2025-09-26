import { BinaryReader, BinaryWriter, google } from "@wardenprotocol/wardenjs";
import { Any } from "cosmjs-types/google/protobuf/any";

export interface Msg<Data> {
	typeUrl: string;
	fromPartial: (data: Partial<Data>) => Data;
	encode: (data: Data) => BinaryWriter;
	decode: (data: BinaryReader | Uint8Array) => Data;
}

export function packAny<Data>(msg: Msg<Data>, data: Data): Any {
	return google.protobuf.Any.fromPartial({
		typeUrl: msg.typeUrl,
		value: msg.encode(msg.fromPartial(data)).finish(),
	})
}
