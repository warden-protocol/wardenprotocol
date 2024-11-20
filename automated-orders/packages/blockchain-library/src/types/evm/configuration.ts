import { IFordefiConfiguration } from "@warden/fordefi-library/dist/types/vault/configuration.js";

export interface IEvmConfiguration {
  rpcURL: string;
  eventsCacheSize?: number;
  fordefiConfiguration: IFordefiConfiguration;
  vaultName: string;
}