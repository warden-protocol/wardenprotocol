import { KMS } from '@aws-sdk/client-kms';

import { IAwsKmsConfiguration } from './types/configuration.js';

export class FordefiService {
  configuration: IAwsKmsConfiguration;
  kms: KMS;

  constructor(configuration: IAwsKmsConfiguration) {
    this.configuration = configuration;
    this.kms = new KMS({
      region: this.configuration.awsKmsRegion,
    });
  }

  async signTransactionHash(hashBytes: Uint8Array): Promise<Uint8Array> {
    const signatureResponse = await this.kms.sign({
      KeyId: this.configuration.awsKmsKeyId,
      Message: hashBytes,
      SigningAlgorithm: 'ECDSA_SHA_256',
      MessageType: 'DIGEST',
    });

    const signature = signatureResponse.Signature as Uint8Array;

    return signature;

    // const signatureResponse = await this.kms.sign({
    //   KeyId: this.configuration.awsKmsKeyId,
    //   Message: Buffer.from(payload, 'utf-8'),
    //   SigningAlgorithm: 'ECDSA_SHA_256',
    //   MessageType: 'RAW',
    // });

    // const signature = Buffer.from(signatureResponse.Signature!).toString('base64');
    // return signature;
  }
}