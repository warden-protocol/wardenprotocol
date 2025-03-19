//@ts-nocheck
import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as wardenActV1beta1TxRegistry from "./act/v1beta1/tx.registry.js";
import * as wardenAsyncV1beta1TxRegistry from "./async/v1beta1/tx.registry.js";
import * as wardenGmpTxRegistry from "./gmp/tx.registry.js";
import * as wardenWardenV1beta3TxRegistry from "./warden/v1beta3/tx.registry.js";
import * as wardenActV1beta1TxAmino from "./act/v1beta1/tx.amino.js";
import * as wardenAsyncV1beta1TxAmino from "./async/v1beta1/tx.amino.js";
import * as wardenGmpTxAmino from "./gmp/tx.amino.js";
import * as wardenWardenV1beta3TxAmino from "./warden/v1beta3/tx.amino.js";
export const wardenAminoConverters = {
  ...wardenActV1beta1TxAmino.AminoConverter,
  ...wardenAsyncV1beta1TxAmino.AminoConverter,
  ...wardenGmpTxAmino.AminoConverter,
  ...wardenWardenV1beta3TxAmino.AminoConverter
};
export const wardenProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...wardenActV1beta1TxRegistry.registry, ...wardenAsyncV1beta1TxRegistry.registry, ...wardenGmpTxRegistry.registry, ...wardenWardenV1beta3TxRegistry.registry];
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
    registry: registry as any,
    aminoTypes
  });
  return client;
};