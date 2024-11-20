import { KMS } from '@aws-sdk/client-kms';
import axios from 'axios';
import * as crypto from 'crypto';

import { CreateBlackBoxSignatureRequestParams } from './types/blackbox-signature/blackBox.createSignatureParams.js';
import { BlackBoxSignature } from './types/blackbox-signature/blackBox.signature.js';
import { IFordefiConfiguration } from './types/vault/configuration.js';
import { CreateVaultParams } from './types/vault/vault.createParams.js';
import { Vault, Vaults } from './types/vault/vault.js';

export class FordefiService {
  configuration: IFordefiConfiguration;
  kms: KMS;

  constructor(configuration: IFordefiConfiguration) {
    this.configuration = configuration;
    this.kms = new KMS({
      region: this.configuration.awsKmsRegion,
    });
  }

  decompressPublicKey(compressedKey: string, format: crypto.BinaryToTextEncoding): Buffer {
    const ecdh = crypto.ECDH.convertKey(compressedKey, 'secp256k1', format, 'hex', 'uncompressed');
    return Buffer.from(ecdh as string, 'hex');
  }

  async createVault(createVaultParams: CreateVaultParams): Promise<Vault> {
    const url = new URL('vaults', this.configuration.fordefiAPIEndpoint).toString();
    const headers = {
      'Content-type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${this.configuration.accessToken}`,
    };
    const response = await axios.post(url, createVaultParams, { headers });
    return { ...response.data, public_key: this.decompressPublicKey(response.data.public_key_compressed, 'base64') };
  }

  async getVault(search: string): Promise<Vault | undefined> {
    const url = new URL(`vaults?page=1&size=1&search=${search}`, this.configuration.fordefiAPIEndpoint).toString();
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.configuration.accessToken}`,
    };
    const response = await axios.get<Vaults>(url, { headers });

    if (response.data.vaults.length === 0) return;

    const vault = response.data.vaults[0];

    return { ...vault, public_key: this.decompressPublicKey(vault.public_key_compressed, 'base64') };
  }

  async getVaults(search: string, page: number, size: number): Promise<Vaults> {
    const url = new URL(
      `vaults?page=${page}&size=${size}&search=${search}`,
      this.configuration.fordefiAPIEndpoint,
    ).toString();

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.configuration.accessToken}`,
    };

    const response = await axios.get<Vaults>(url, { headers });

    return {
      ...response.data,
      vaults: response.data.vaults.map((x) => ({
        ...x,
        public_key: this.decompressPublicKey(x.public_key_compressed, 'base64'),
      })),
    };
  }

  async createBlackBoxSignatureRequest(
    createParams: CreateBlackBoxSignatureRequestParams,
    idempontenceId: string | null = null,
  ): Promise<BlackBoxSignature> {
    const url = new URL('transactions', this.configuration.fordefiAPIEndpoint);

    const path = url.pathname;
    const timestamp = new Date().getTime();
    const requestBody = JSON.stringify(createParams);
    const payload = `${path}|${timestamp}|${requestBody}`;

    const signatureResponse = await this.kms.sign({
      KeyId: this.configuration.awsKmsKeyId,
      Message: Buffer.from(payload, 'utf-8'),
      SigningAlgorithm: 'ECDSA_SHA_256',
      MessageType: 'RAW',
    });

    const signature = Buffer.from(signatureResponse.Signature!).toString('base64');

    const headers = {
      'Content-type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${this.configuration.accessToken}`,
      'x-signature': signature,
      'x-timestamp': timestamp,
      'x-idempotence-id': idempontenceId,
    };

    const response = await axios.post(url.toString(), createParams, { headers });
    return response.data;
  }

  async getBlackBoxSignatureResult(id: string): Promise<BlackBoxSignature> {
    const url = new URL(`transactions/${id}`, this.configuration.fordefiAPIEndpoint).toString();
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${this.configuration.accessToken}`,
    };
    const response = await axios.get(url, { headers });
    return response.data;
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
  }
}

export { Vault } from './types/vault/vault.js';
