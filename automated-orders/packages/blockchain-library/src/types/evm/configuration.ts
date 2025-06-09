import { IAwsKmsConfiguration } from "@warden-automated-orders/aws-kms-signer";

export interface IEvmConfiguration {
  rpcURL: string;
  eventsCacheSize?: number;
  awsKmsSignerConfig?: IAwsKmsConfiguration;
  publicClientTimeout?: number;
}
