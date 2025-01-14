import { IAwsKmsConfiguration } from "../../../../aws-kms-signer/dist/types/configuration.js";

export interface IEvmConfiguration {
  rpcURL: string;
  eventsCacheSize?: number;
  awsKmsSignerConfig?: IAwsKmsConfiguration;
  publicClientTimeout?: number;
}