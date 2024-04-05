//@ts-nocheck
import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as wardenIntentTxRegistry from "./intent/tx.registry.js";
import * as wardenWardenV1beta2TxRegistry from "./warden/v1beta2/tx.registry.js";
import * as wardenIntentTxAmino from "./intent/tx.amino.js";
import * as wardenWardenV1beta2TxAmino from "./warden/v1beta2/tx.amino.js";
export const wardenAminoConverters = {
  ...wardenIntentTxAmino.AminoConverter,
  ...wardenWardenV1beta2TxAmino.AminoConverter
};
export const wardenProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...wardenIntentTxRegistry.registry, ...wardenWardenV1beta2TxRegistry.registry];
export const getSigningWardenClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...wardenProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...wardenAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningWardenClient = async ({
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
  } = getSigningWardenClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};