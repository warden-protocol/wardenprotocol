import { KMS } from '@aws-sdk/client-kms';
import { IAwsKmsConfiguration } from './types/configuration.js';
import { keccak256 } from 'viem';

import asn1 from 'asn1.js';
const { define } = asn1;

/* eslint-disable @typescript-eslint/no-explicit-any */
const EcdsaPubKey = define('EcdsaPubKey', function (this: any) {
  // https://tools.ietf.org/html/rfc5480#section-2
  this.seq().obj(
    this.key('algo').seq().obj(
      this.key('algorithm').objid(),
      this.key('parameters').objid(),
    ),
    this.key('pubKey').bitstr()
  );
});

export class AwsKmsSigner {
  configuration: IAwsKmsConfiguration;
  kms: KMS;

  constructor(configuration: IAwsKmsConfiguration) {
    this.configuration = configuration;
    this.kms = new KMS({
      region: this.configuration.awsKmsRegion,
    });
  }

  public async signTransactionHash(hashBytes: Uint8Array): Promise<Uint8Array> {
    const signatureResponse = await this.kms.sign({
      KeyId: this.configuration.awsKmsKeyId,
      Message: hashBytes,
      SigningAlgorithm: 'ECDSA_SHA_256',
      MessageType: 'DIGEST',
    });
    const signature = new Uint8Array((signatureResponse.Signature as unknown) as ArrayBuffer);

    return signature;
  }

  public async getAddress(): Promise<string> {
    const publicKeyResponse = await this.kms.getPublicKey({
      KeyId: this.configuration.awsKmsKeyId,
    });
    const publicKeyDer = new Uint8Array((publicKeyResponse.PublicKey as unknown) as ArrayBuffer);
    const publicKeyBytes = this.getPublicKeyBytes(publicKeyDer);
    const address = this.publicKeyToAddress(publicKeyBytes);

    return address;
  }

  private getPublicKeyBytes(publicKeyDer: Uint8Array): Uint8Array {
    const decoded = EcdsaPubKey.decode(Buffer.from(publicKeyDer), 'der');
    const publicKeyBuffer = decoded.pubKey.data;

    return new Uint8Array(publicKeyBuffer);
  }

  private publicKeyToAddress(publicKeyBytes: Uint8Array): string {
    const uncompressedPublicKey = publicKeyBytes;
    const hash = keccak256(uncompressedPublicKey.slice(1));
    const address = '0x' + hash.slice(-40);

    return address;
  }
}