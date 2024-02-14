export interface Account {
  address: string;
  pathIncrement: Nullable<number>;
}
export type Nullable<T> = T | null;

export type Wallet = {
  name: string;
  mnemonic: string | null;
  HDpath: string | null;
  password: string | null;
  prefix: string;
  pathIncrement: Nullable<number>;
  accounts: Account[];
};
export type EncodedWallet = {
  name: string;
  wallet: string;
};
export type Amount = {
  amount: string;
  denom: string;
};
export type ColoredAmount = Amount & { color: string };
export interface DenomTrace {
  denom_trace: { path: string; base_denom: string };
}
export interface DenomTraces {
  [key: string]: DenomTrace;
}
export type Block = {
  height: number;
} & {
  [key: string]: string | undefined;
};
export interface IBCAckHeights {
  packetHeightA: number;
  packetHeightB: number;
  ackHeightA: number;
  ackHeightB: number;
}
export interface IBCEndpoint {
  clientID: string;
  connectionID: string;
}
export interface IBCChannel {
  portId?: string;
  channelId: string;
}
export interface Relayer {
  name: string;
  prefix?: string;
  endpoint?: string;
  gasPrice?: string;
  external: boolean;
  status: "connected" | "linked" | "created";
  heights?: IBCAckHeights;
  running?: boolean;
  chainIdA?: string;
  chainIdB: string;
  targetAddress?: string;
  endA?: IBCEndpoint;
  endB?: IBCEndpoint;
  src: IBCChannel;
  dest?: IBCChannel;
}

export interface Transactions {
  txs: Array<RawTransaction>;
  tx_responses: Array<RawTransactionResponse>;
}
export type RawTransactionResponse = {
  height: number;
  code: number;
} & {
  [key: string]: string | undefined;
};
export interface TxPacket {
  data: string;
  source_port: string;
  source_channel: string;
  destination_port: string;
  destination_channel: string;
}
export interface TxDecodedPacket {
  sender?: string;
  receiver?: string;
  amount?: string;
  denom?: string;
}
export interface TxMessage {
  "@type": string;
  packet?: TxPacket;
  signer: string;
  connection_id?: string;
  client_id?: string;
  amount?: Amount[];
  token?: Amount;
  counterparty_connection_id?: string;
  previous_connection_id?: string;
  from_address?: string;
  to_address?: string;
  sender?: string;
  receiver?: string;
  port_id?: string;
  channel_id?: string;
  source_channel?: string;
  counterparty_version?: string;
  previous_channel_id?: string;
}
export interface TxBody {
  messages: Array<TxMessage>;
}
export type RawTransaction = {
  response: RawTransactionResponse;
  body: TxBody;
} & {
  [key: string]: unknown;
};
export type Transaction = RawTransaction & {
  [key: string]: unknown;
};
export interface SpTypeObject {
  id?: string;
  creator?: string;
  [key: string]: string | undefined;
}
export interface Field {
  name: string;
  type: string;
}
export type AmountWithMeta = Amount & {
  coinDenom: string;
  coinMinimalDenom: string;
  coinDecimals: number;
};
