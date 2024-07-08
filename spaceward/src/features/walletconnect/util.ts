import type { CommonActions } from "../../utils/common";
import { RemoteMessageType, type RemoteState } from "./types";

export function decodeRemoteMessage(
	message: Uint8Array,
): CommonActions<RemoteState> {
	const type = message[0];
	const data = message.slice(1);

	switch (type) {
		case RemoteMessageType.Ready:
			return { type: "ready", payload: Boolean(data[0]) };
		case RemoteMessageType.Data:
			return { type: "data", payload: data };
		default:
			throw new Error(`Unknown message type: ${type}`);
	}
}

export function encodeRemoteMessage(
	action: CommonActions<RemoteState>,
): Uint8Array {
	switch (action.type) {
		case "ready":
			const ready = action.payload as boolean;
			return new Uint8Array([RemoteMessageType.Ready, Number(ready)]);
		case "data":
			const data = action.payload as Uint8Array;
			return new Uint8Array([RemoteMessageType.Data, ...data]);
		default:
			throw new Error(`Action type not implemented: ${action.type}`);
	}
}
