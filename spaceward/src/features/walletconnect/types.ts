export interface RemoteState {
	ready?: boolean;
	data?: Uint8Array;
	metadata?: string;
	error?: string;
}

export enum RemoteMessageType {
	Ready = 0x01,
	Data = 0x02,
	Success = 0x10,
	Error = 0xff,
}
