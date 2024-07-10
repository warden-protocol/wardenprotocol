export interface RemoteState {
	ready?: boolean;
	data?: Uint8Array;
}

export enum RemoteMessageType {
	Ready = 0x01,
	Data = 0x02,
}
