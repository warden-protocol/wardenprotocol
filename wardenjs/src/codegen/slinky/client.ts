//@ts-nocheck
import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as slinkyMarketmapV1TxRegistry from "./marketmap/v1/tx.registry.js";
import * as slinkyOracleV1TxRegistry from "./oracle/v1/tx.registry.js";
import * as slinkyMarketmapV1TxAmino from "./marketmap/v1/tx.amino.js";
import * as slinkyOracleV1TxAmino from "./oracle/v1/tx.amino.js";
export const slinkyAminoConverters = {
  ...slinkyMarketmapV1TxAmino.AminoConverter,
  ...slinkyOracleV1TxAmino.AminoConverter
};
export const slinkyProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...slinkyMarketmapV1TxRegistry.registry, ...slinkyOracleV1TxRegistry.registry];
export const getSigningSlinkyClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...slinkyProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...slinkyAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningSlinkyClient = async ({
  rpcEndpoint,
  signer,
  defaultTypes = defaultRegistryTypes
}: {
  rpcEndpoint: string | HttpEndpoint;
  signer: OfflineSigner;
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
}) => {
  const {
    registry,
    aminoTypes
  } = getSigningSlinkyClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};