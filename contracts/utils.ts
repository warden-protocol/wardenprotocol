import { MsgStoreCodeEncodeObject, createWasmAminoConverters, WasmExtension,
    MsgInstantiateContractEncodeObject, MsgUpdateAdminEncodeObject,
    MsgClearAdminEncodeObject, MsgMigrateContractEncodeObject,
    MsgExecuteContractEncodeObject, setupWasmExtension, JsonObject } from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1HdWalletOptions, OfflineDirectSigner, AccountData,
    KdfConfiguration, executeKdf, makeSignBytes, DirectSignResponse,
    makeSignDoc, makeAuthInfoBytes, TxBodyEncodeObject,
    OfflineSigner, Registry, EncodeObject, GeneratedType,
    isOfflineDirectSigner } from "@cosmjs/proto-signing";
import { HdPath, stringToPath, Secp256k1, Slip10, Slip10Curve, EnglishMnemonic,
    pathToString, Secp256k1Keypair, Keccak256, Bip39, Random, sha256,
    xchacha20NonceLength, Xchacha20poly1305Ietf } from "@cosmjs/crypto";
import { calculateFee, GasPrice, AminoTypes, createBankAminoConverters,
    defaultRegistryTypes as defaultStargateTypes, StdFee, isDeliverTxFailure,
    logs, DeliverTxResponse, MsgDelegateEncodeObject, MsgUndelegateEncodeObject,
    MsgWithdrawDelegatorRewardEncodeObject, SignerData, MsgSendEncodeObject,
    AuthExtension, BankExtension, setupAuthExtension, setupBankExtension,
    TxExtension, setupTxExtension, isSearchBySentFromOrToQuery,
    isSearchByHeightQuery, isSearchByTagsQuery, QueryClient, SequenceResponse,
    Block, SearchTxQuery, IndexedTx, SearchTxFilter, TimeoutError } from "@cosmjs/stargate";
import { rawSecp256k1PubkeyToRawAddress, Pubkey, SinglePubkey, pubkeyType, makeSignDoc as makeSignDocAmino,
    MultisigThresholdPubkey, isSecp256k1Pubkey, isMultisigThresholdPubkey } from "@cosmjs/amino";
import { fromHex, toBech32, toHex, toAscii, fromBase64, fromUtf8, toUtf8, toBase64, fromAscii } from "@cosmjs/encoding";
import { assert, isNonNullObject, assertDefined, sleep } from "@cosmjs/utils";
import { SignDoc, TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { Tendermint34Client, HttpEndpoint, toRfc3339WithNanoseconds } from "@cosmjs/tendermint-rpc";
import { MsgClearAdmin, MsgExecuteContract, MsgInstantiateContract, MsgMigrateContract,
    MsgStoreCode, MsgUpdateAdmin } from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { ContractCodeHistoryOperationType } from "cosmjs-types/cosmwasm/wasm/v1/types";
import { CodeInfoResponse, QueryCodesResponse, QueryContractsByCodeResponse } from "cosmjs-types/cosmwasm/wasm/v1/query";
import { MsgWithdrawDelegatorReward } from "cosmjs-types/cosmos/distribution/v1beta1/tx";
import { MsgDelegate, MsgUndelegate } from "cosmjs-types/cosmos/staking/v1beta1/tx";
import { BaseAccount, ModuleAccount } from "cosmjs-types/cosmos/auth/v1beta1/auth";
import { LegacyAminoPubKey } from "cosmjs-types/cosmos/crypto/multisig/keys";
import { SignMode } from "cosmjs-types/cosmos/tx/signing/v1beta1/signing";
import { PubKey } from "cosmjs-types/cosmos/crypto/secp256k1/keys";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { Any } from "cosmjs-types/google/protobuf/any";
import { Int53, Uint53, Uint64 } from "@cosmjs/math"
import Long from "long";
import pako from "pako";


export interface Account {
    /** Bech32 account address */
    readonly address: string;
    readonly pubkey: Pubkey | null;
    readonly accountNumber: number;
    readonly sequence: number;
}

function uint64FromProto(input: number | Long): Uint64 {
    return Uint64.fromString(input.toString());
}

function decodeSinglePubkey(pubkey: any): SinglePubkey {
    switch (pubkey.typeUrl) {
        case "/cosmos.crypto.secp256k1.PubKey": {
            const { key } = PubKey.decode(pubkey.value);
            return encodeSecp256k1Pubkey(key);
        }
        case "/ethermint.crypto.v1.ethsecp256k1.PubKey": {
            const { key } = PubKey.decode(pubkey.value);
            return encodeSecp256k1Pubkey(key, "/ethermint.crypto.v1.ethsecp256k1.PubKey");
        }
        default:
            throw new Error(`Pubkey type_url ${pubkey.typeUrl} not recognized as single public key type`);
    }
}

function decodePubkey(pubkey?: any | null): Pubkey | null {
    if (!pubkey || !pubkey.value) {
        return null;
    }

    switch (pubkey.typeUrl) {
        case "/cosmos.crypto.secp256k1.PubKey": {
            return decodeSinglePubkey(pubkey);
        }
        case "/ethermint.crypto.v1.ethsecp256k1.PubKey": {
            return decodeSinglePubkey(pubkey);
        }
        case "/cosmos.crypto.multisig.LegacyAminoPubKey": {
            const { threshold, publicKeys } = LegacyAminoPubKey.decode(pubkey.value);
            const out: MultisigThresholdPubkey = {
                type: "tendermint/PubKeyMultisigThreshold",
                value: {
                    threshold: threshold.toString(),
                    pubkeys: publicKeys.map(decodeSinglePubkey),
                },
            };
            return out;
        }
        default:
            throw new Error(`Pubkey type_url ${pubkey.typeUrl} not recognized`);
    }
}

export function encodePubkey(pubkey: Pubkey): Any {
    if (isSecp256k1Pubkey(pubkey) || pubkey.type != "/cosmos.crypto.secp256k1.PubKey") {
        const pubkeyProto = PubKey.fromPartial({
            key: fromBase64(pubkey.value),
        });
        if (pubkey.type == "/ethermint.crypto.v1.ethsecp256k1.PubKey") {
            return Any.fromPartial({
                typeUrl: "/ethermint.crypto.v1.ethsecp256k1.PubKey",
                value: Uint8Array.from(PubKey.encode(pubkeyProto).finish()),
            });
        } else {
            return Any.fromPartial({
                typeUrl: "/cosmos.crypto.secp256k1.PubKey",
                value: Uint8Array.from(PubKey.encode(pubkeyProto).finish()),
            });
        }
    } else if (isMultisigThresholdPubkey(pubkey)) {
        const pubkeyProto = LegacyAminoPubKey.fromPartial({
            threshold: Uint53.fromString(pubkey.value.threshold).toNumber(),
            publicKeys: pubkey.value.pubkeys.map(encodePubkey),
        });
        return Any.fromPartial({
            typeUrl: "/cosmos.crypto.multisig.LegacyAminoPubKey",
            value: Uint8Array.from(LegacyAminoPubKey.encode(pubkeyProto).finish()),
        });
    } else {
        throw new Error(`Pubkey type ${pubkey.type} not recognized`);
    }
}

export function encodeSecp256k1Pubkey(pubkey: Uint8Array, urlType?: string): Secp256k1Pubkey {
    if (pubkey.length !== 33 || (pubkey[0] !== 0x02 && pubkey[0] !== 0x03)) {
        throw new Error("Public key must be compressed secp256k1, i.e. 33 bytes starting with 0x02 or 0x03");
    }
    urlType = urlType ? urlType : pubkeyType.secp256k1
    return {
        type: urlType,
        value: toBase64(pubkey),
    };
}

function encodeSecp256k1Signature(pubkey: Uint8Array, signature: Uint8Array, urlType?: string): StdSignature {
    if (signature.length !== 64) {
        throw new Error(
            "Signature must be 64 bytes long. Cosmos SDK uses a 2x32 byte fixed length encoding for the secp256k1 signature integers r and s.",
        );
    }
    return {
        pub_key: encodeSecp256k1Pubkey(pubkey, urlType),
        signature: toBase64(signature),
    };
}

function accountFromBaseAccount(input: BaseAccount): Account {
    const { address, pubKey, accountNumber, sequence } = input;
    const pubkey = decodePubkey(pubKey);
    return {
        address: address,
        pubkey: pubkey,
        accountNumber: uint64FromProto(accountNumber).toNumber(),
        sequence: uint64FromProto(sequence).toNumber(),
    };
}

export function accountFromAny(input: any): Account {
    const { typeUrl, value } = input;

    switch (typeUrl) {
        case "/cosmos.auth.v1beta1.BaseAccount":
            return accountFromBaseAccount(BaseAccount.decode(value));
        case "/ethermint.types.v1.EthAccount":
            const baseAccount = ModuleAccount.decode(value).baseAccount;
            assert(baseAccount);
            return accountFromBaseAccount(baseAccount);
        default:
            throw new Error(`Unsupported type: '${typeUrl}'`);
    }
}

interface Code {
    readonly id: number;
    /** Bech32 account address */
    readonly creator: string;
    /** Hex-encoded sha256 hash of the code stored here */
    readonly checksum: string;

    // `source` and `builder` were removed in wasmd 0.18
    // https://github.com/sashaduke/fusion/issues/540
}

interface CodeDetails extends Code {
    /** The original Wasm bytes */
    readonly data: Uint8Array;
}

interface Contract {
    readonly address: string;
    readonly codeId: number;
    /** Bech32 account address */
    readonly creator: string;
    /** Bech32-encoded admin address */
    readonly admin: string | undefined;
    readonly label: string;
    /**
     * The IBC port ID assigned to this contract by wasmd.
     *
     * This is set for all IBC contracts (https://github.com/sashaduke/fusion/blob/v0.16.0/x/wasm/keeper/keeper.go#L299-L306).
     */
    readonly ibcPortId: string | undefined;
}

interface ContractCodeHistoryEntry {
    /** The source of this history entry */
    readonly operation: "Genesis" | "Init" | "Migrate";
    readonly codeId: number;
    readonly msg: Record<string, unknown>;
}

const wasmTypes: ReadonlyArray<[string, GeneratedType]> = [
    ["/cosmwasm.wasm.v1.MsgClearAdmin", MsgClearAdmin],
    ["/cosmwasm.wasm.v1.MsgExecuteContract", MsgExecuteContract],
    ["/cosmwasm.wasm.v1.MsgMigrateContract", MsgMigrateContract],
    ["/cosmwasm.wasm.v1.MsgStoreCode", MsgStoreCode],
    ["/cosmwasm.wasm.v1.MsgInstantiateContract", MsgInstantiateContract],
    ["/cosmwasm.wasm.v1.MsgUpdateAdmin", MsgUpdateAdmin],
];

interface ChangeAdminResult {
    readonly logs: readonly logs.Log[];
    /** Block height in which the transaction is included */
    readonly height: number;
    /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
    readonly transactionHash: string;
    readonly gasWanted: number;
    readonly gasUsed: number;
}

interface MigrateResult {
    readonly logs: readonly logs.Log[];
    /** Block height in which the transaction is included */
    readonly height: number;
    /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
    readonly transactionHash: string;
    readonly gasWanted: number;
    readonly gasUsed: number;
}

interface ExecuteInstruction {
    contractAddress: string;
    msg: Record<string, unknown>;
    funds?: readonly Coin[];
}

interface ExecuteResult {
    readonly logs: readonly logs.Log[];
    /** Block height in which the transaction is included */
    readonly height: number;
    /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
    readonly transactionHash: string;
    readonly gasWanted: number;
    readonly gasUsed: number;
}

interface UploadResult {
    /** Size of the original wasm code in bytes */
    readonly originalSize: number;
    /** A hex encoded sha256 checksum of the original wasm code (that is stored on chain) */
    readonly originalChecksum: string;
    /** Size of the compressed wasm code in bytes */
    readonly compressedSize: number;
    /** A hex encoded sha256 checksum of the compressed wasm code (that stored in the transaction) */
    readonly compressedChecksum: string;
    /** The ID of the code asigned by the chain */
    readonly codeId: number;
    readonly logs: readonly logs.Log[];
    /** Block height in which the transaction is included */
    readonly height: number;
    /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
    readonly transactionHash: string;
    readonly gasWanted: number;
    readonly gasUsed: number;
}

interface InstantiateOptions {
    readonly memo?: string;
    /**
     * The funds that are transferred from the sender to the newly created contract.
     * The funds are transferred as part of the message execution after the contract address is
     * created and before the instantiation message is executed by the contract.
     *
     * Only native tokens are supported.
     */
    readonly funds?: readonly Coin[];
    /**
     * A bech32 encoded address of an admin account.
     * Caution: an admin has the privilege to upgrade a contract. If this is not desired, do not set this value.
     */
    readonly admin?: string;
}

interface InstantiateResult {
    /** The address of the newly instantiated contract */
    readonly contractAddress: string;
    readonly logs: readonly logs.Log[];
    /** Block height in which the transaction is included */
    readonly height: number;
    /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
    readonly transactionHash: string;
    readonly gasWanted: number;
    readonly gasUsed: number;
}

interface EncryptionConfiguration {
    readonly algorithm: string;
    readonly params?: Record<string, unknown>;
}

const supportedAlgorithms = {
    xchacha20poly1305Ietf: "xchacha20poly1305-ietf",
};

async function encrypt(
    plaintext: Uint8Array,
    encryptionKey: Uint8Array,
    config: EncryptionConfiguration,
): Promise<Uint8Array> {
    switch (config.algorithm) {
        case supportedAlgorithms.xchacha20poly1305Ietf: {
            const nonce = Random.getBytes(xchacha20NonceLength);
            // Prepend fixed-length nonce to ciphertext as suggested in the example from https://github.com/jedisct1/libsodium.js#api
            return new Uint8Array([
                ...nonce,
                ...(await Xchacha20poly1305Ietf.encrypt(plaintext, encryptionKey, nonce)),
            ]);
        }
        default:
            throw new Error(`Unsupported encryption algorithm: '${config.algorithm}'`);
    }
}

async function decrypt(
    ciphertext: Uint8Array,
    encryptionKey: Uint8Array,
    config: EncryptionConfiguration,
): Promise<Uint8Array> {
    switch (config.algorithm) {
        case supportedAlgorithms.xchacha20poly1305Ietf: {
            const nonce = ciphertext.slice(0, xchacha20NonceLength);
            return Xchacha20poly1305Ietf.decrypt(ciphertext.slice(xchacha20NonceLength), encryptionKey, nonce);
        }
        default:
            throw new Error(`Unsupported encryption algorithm: '${config.algorithm}'`);
    }
}

export interface Options {
    readonly httpUrl: string
    readonly networkId: string
    readonly feeToken: string
    readonly bech32prefix: string
    readonly hdPath: HdPath
    readonly faucetUrl?: string
    readonly defaultKeyFile: string,
    readonly fees: {
        upload: number,
        init: number,
        exec: number
    },
    readonly gasPrice: GasPrice,
}

interface Secp256k1Derivation {
    readonly hdPath: HdPath;
    readonly prefix: string;
}

interface DirectSecp256k1HdWalletConstructorOptions extends Partial<DirectSecp256k1HdWalletOptions> {
    readonly seed: Uint8Array;
}

interface AccountDataWithPrivkey extends AccountData {
    readonly privkey: Uint8Array;
}

interface DirectSecp256k1HdWalletData {
    readonly mnemonic: string;
    readonly accounts: readonly DerivationInfoJson[];
}

interface DerivationInfoJson {
    readonly hdPath: string;
    readonly prefix: string;
}

interface DirectSecp256k1HdWalletSerialization {
    /** A format+version identifier for this serialization format */
    readonly type: string;
    /** Information about the key derivation function (i.e. password to encryption key) */
    readonly kdf: KdfConfiguration;
    /** Information about the symmetric encryption */
    readonly encryption: EncryptionConfiguration;
    /** An instance of Secp256k1HdWalletData, which is stringified, encrypted and base64 encoded. */
    readonly data: string;
}

const serializationTypeV1 = "directsecp256k1hdwallet-v1";

const basicPasswordHashingOptions: KdfConfiguration = {
    algorithm: "argon2id",
    params: {
        outputLength: 32,
        opsLimit: 24,
        memLimitKib: 12 * 1024,
    },
};

function isDerivationJson(thing: unknown): thing is DerivationInfoJson {
    if (!isNonNullObject(thing)) return false;
    if (typeof (thing as DerivationInfoJson).hdPath !== "string") return false;
    if (typeof (thing as DerivationInfoJson).prefix !== "string") return false;
    return true;
}

export class DirectSecp256k1HdWallet implements OfflineDirectSigner {
    /** Base secret */
    private readonly secret: EnglishMnemonic;
    /** BIP39 seed */
    private readonly seed: Uint8Array;
    /** Derivation instructions */
    private readonly accounts: readonly Secp256k1Derivation[];

    private static isValidAddress(address: string): boolean {
        if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
            return false;
        }
        return true
    }

    public get mnemonic(): string {
        return this.secret.toString();
    }

    public static async fromMnemonic(
        mnemonic: string,
        options: Partial<DirectSecp256k1HdWalletOptions> = {},
    ): Promise<DirectSecp256k1HdWallet> {
        const mnemonicChecked = new EnglishMnemonic(mnemonic);
        const seed = await Bip39.mnemonicToSeed(mnemonicChecked, options.bip39Password);
        return new DirectSecp256k1HdWallet(mnemonicChecked, {
            ...options,
            seed: seed,
        });
    }

    public static async generate(
        length: 12 | 15 | 18 | 21 | 24 = 12,
        options: Partial<DirectSecp256k1HdWalletOptions> = {},
    ): Promise<DirectSecp256k1HdWallet> {
        const entropyLength = 4 * Math.floor((11 * length) / 33);
        const entropy = Random.getBytes(entropyLength);
        const mnemonic = Bip39.encode(entropy);
        return DirectSecp256k1HdWallet.fromMnemonic(mnemonic.toString(), options);
    }

    public static async deserialize(serialization: string, password: string): Promise<DirectSecp256k1HdWallet> {
        const root = JSON.parse(serialization);
        if (!isNonNullObject(root)) throw new Error("Root document is not an object.");
        switch ((root as any).type) {
            case serializationTypeV1:
                return DirectSecp256k1HdWallet.deserializeTypeV1(serialization, password);
            default:
                throw new Error("Unsupported serialization type");
        }
    }

    private static async deserializeTypeV1(
        serialization: string,
        password: string,
    ): Promise<DirectSecp256k1HdWallet> {
        const root = JSON.parse(serialization);
        if (!isNonNullObject(root)) throw new Error("Root document is not an object.");
        const encryptionKey = await executeKdf(password, (root as any).kdf);
        return DirectSecp256k1HdWallet.deserializeWithEncryptionKey(serialization, encryptionKey);
    }

    public static async deserializeWithEncryptionKey(
        serialization: string,
        encryptionKey: Uint8Array,
    ): Promise<DirectSecp256k1HdWallet> {
        const root = JSON.parse(serialization);
        if (!isNonNullObject(root)) throw new Error("Root document is not an object.");
        const untypedRoot: any = root;
        switch (untypedRoot.type) {
            case serializationTypeV1: {
                const decryptedBytes = await decrypt(
                    fromBase64(untypedRoot.data),
                    encryptionKey,
                    untypedRoot.encryption,
                );
                const decryptedDocument = JSON.parse(fromUtf8(decryptedBytes));
                const { mnemonic, accounts } = decryptedDocument;
                assert(typeof mnemonic === "string");
                if (!Array.isArray(accounts)) throw new Error("Property 'accounts' is not an array");
                if (!accounts.every((account) => isDerivationJson(account))) {
                    throw new Error("Account is not in the correct format.");
                }
                const firstPrefix = accounts[0].prefix;
                if (!accounts.every(({ prefix }) => prefix === firstPrefix)) {
                    throw new Error("Accounts do not all have the same prefix");
                }
                const hdPaths = accounts.map(({ hdPath }) => stringToPath(hdPath));
                return DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
                    hdPaths: hdPaths,
                    prefix: firstPrefix,
                });
            }
            default:
                throw new Error("Unsupported serialization type");
        }
    }

    public async signDirect(signerAddress: string, signDoc: SignDoc, urlType?: string,): Promise<DirectSignResponse> {
        const accounts = await this.getAccountsWithPrivkeys();
        const account = accounts.find(({ address }) => address === signerAddress);
        if (account === undefined) {
            throw new Error(`Address ${signerAddress} not found in wallet`);
        }
        const { privkey, pubkey } = account;
        const signBytes = makeSignBytes(signDoc);

        switch (urlType) {
            case "/ethermint.crypto.v1.ethsecp256k1.PubKey": {
                // eth signing
                const hashedMessage = new Keccak256(signBytes).digest()
                const signature = await Secp256k1.createSignature(hashedMessage, privkey);
                const signatureBytes = new Uint8Array([...signature.r(32), ...signature.s(32)]);
                const stdSignature = encodeSecp256k1Signature(pubkey, signatureBytes, "/ethermint.crypto.v1.ethsecp256k1.PubKey");

                return {
                    signed: signDoc,
                    signature: stdSignature
                };
            }
            default: {
                // cosmos signing
                const hashedMessage = sha256(signBytes);
                const signature = await Secp256k1.createSignature(hashedMessage, privkey);
                const signatureBytes = new Uint8Array([...signature.r(32), ...signature.s(32)]);
                const stdSignature = encodeSecp256k1Signature(pubkey, signatureBytes);

                return {
                    signed: signDoc,
                    signature: stdSignature,
                };
            }
        }
    }

    public async serialize(password: string): Promise<string> {
        const kdfConfiguration = basicPasswordHashingOptions;
        const encryptionKey = await executeKdf(password, kdfConfiguration);
        return this.serializeWithEncryptionKey(encryptionKey, kdfConfiguration);
    }

    public async serializeWithEncryptionKey(
        encryptionKey: Uint8Array,
        kdfConfiguration: KdfConfiguration,
    ): Promise<string> {
        const dataToEncrypt: DirectSecp256k1HdWalletData = {
            mnemonic: this.mnemonic,
            accounts: this.accounts.map(({ hdPath, prefix }) => ({
                hdPath: pathToString(hdPath),
                prefix: prefix,
            })),
        };
        const dataToEncryptRaw = toUtf8(JSON.stringify(dataToEncrypt));

        const encryptionConfiguration: EncryptionConfiguration = {
            algorithm: supportedAlgorithms.xchacha20poly1305Ietf,
        };
        const encryptedData = await encrypt(dataToEncryptRaw, encryptionKey, encryptionConfiguration);

        const out: DirectSecp256k1HdWalletSerialization = {
            type: serializationTypeV1,
            kdf: kdfConfiguration,
            encryption: encryptionConfiguration,
            data: toBase64(encryptedData),
        };
        return JSON.stringify(out);
    }

    private static toChecksummedAddress(address: string): string {
        // 40 low hex characters
        let addressLower;
        if (typeof address === "string") {
            if (!DirectSecp256k1HdWallet.isValidAddress(address)) {
                throw new Error("Input is not a valid Ethereum address");
            }
            addressLower = address.toLowerCase().replace("0x", "");
        } else {
            addressLower = toHex(address);
        }

        const addressHash = toHex(new Keccak256(toAscii(addressLower)).digest());
        let checksumAddress = "0x";
        for (let i = 0; i < 40; i++) {
            checksumAddress += parseInt(addressHash[i], 16) > 7 ? addressLower[i].toUpperCase() : addressLower[i];
        }
        return checksumAddress;
    }
    private static isAddress (address: string): boolean {
        // check if it has the basic requirements of an address
        if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            return false;
            // If it's ALL lowercase or ALL upppercase
        } else if (/^(0x|0X)?[0-9a-f]{40}$/.test(address) || /^(0x|0X)?[0-9A-F]{40}$/.test(address)) {
            return true;
            // Otherwise check each case
        }
        return false
    };

    private async getKeyPair(hdPath: HdPath): Promise<Secp256k1Keypair> {
        const { privkey } = Slip10.derivePath(Slip10Curve.Secp256k1, this.seed, hdPath);
        const { pubkey } = await Secp256k1.makeKeypair(privkey);

        const coinType = pathToString(hdPath).split('/')[2]
        switch (coinType) {
            // ETH cointype=60
            case "60'": // 65 byte len
                return {
                    privkey: privkey,
                    pubkey: pubkey
                }
            default:
                return {
                    privkey: privkey,
                    pubkey: Secp256k1.compressPubkey(pubkey) // 33 byte len,
                }
        }
    }

    private async getAccountsWithPrivkeys(): Promise<readonly AccountDataWithPrivkey[]> {
        return Promise.all(
            this.accounts.map(async ({ hdPath, prefix }) => {
                const { privkey, pubkey } = await this.getKeyPair(hdPath);

                const coinType = pathToString(hdPath).split('/')[2]
                switch (coinType) {
                    case "60'":
                        const hash = new Keccak256(pubkey.slice(1)).digest()
                        const lastTwentyBytes = toHex(hash.slice(-20));
                        // EVM address
                        const address = DirectSecp256k1HdWallet.toChecksummedAddress('0x' + lastTwentyBytes)

                        return {
                            algo: "secp256k1" as const,
                            privkey: privkey,
                            pubkey: Secp256k1.compressPubkey(pubkey),
                            address: await DirectSecp256k1HdWallet.getBech32AddressFromEVMAddress(address, prefix)
                        };
                    default:
                        return {
                            algo: "secp256k1" as const,
                            privkey: privkey,
                            pubkey: pubkey,
                            address: toBech32(prefix, rawSecp256k1PubkeyToRawAddress(pubkey)),
                        };
                }
            }),
        );
    }
    private static async getBech32AddressFromEVMAddress(evmAddress: string, bech32Prefix: string): Promise<string> {
        if (!DirectSecp256k1HdWallet.isAddress(evmAddress.toLowerCase())) {
            throw new TypeError('Please provide a valid EVM compatible address.');
        }

        var evmAddrWithoutHexPrefix = evmAddress.replace(/^(-)?0x/i, '$1');
        var evmAddressBytes = fromHex(evmAddrWithoutHexPrefix);
        var evmToBech32Address = toBech32(bech32Prefix, evmAddressBytes);
        return evmToBech32Address;
    };

    public async getAccounts(): Promise<readonly AccountData[]> {
        const accountsWithPrivkeys = await this.getAccountsWithPrivkeys();
        return accountsWithPrivkeys.map(({ algo, pubkey, address }) => ({
            algo: algo,
            pubkey: pubkey,
            address: address,
        }));
    }

    public constructor(mnemonic: EnglishMnemonic, options: any) {
        const prefix = options.prefix
        const hdPaths = options.hdPaths
        this.secret = mnemonic;
        this.seed = options.seed;
        this.accounts = hdPaths.map((hdPath: any) => ({
            hdPath: hdPath,
            prefix: prefix,
        }));
    }
}

export function signerData(pubkey: any, sequence: number): ReadonlyArray<{readonly pubkey: any, readonly sequence: number}> {
    return [ pubkey, sequence ]
}

export function coinData(denom: string, amount: string): readonly Coin[] {
    return [{ denom, amount }]
}

interface Secp256k1Pubkey extends SinglePubkey {
    readonly type: string;
    readonly value: string;
}

interface StdSignature {
    readonly pub_key: Pubkey;
    readonly signature: string;
}

function createDefaultRegistry(): Registry {
    return new Registry([...defaultStargateTypes, ...wasmTypes]);
}

function createDeliverTxResponseErrorMessage(result: DeliverTxResponse): string {
    return `Error when broadcasting tx ${result.transactionHash} at height ${result.height}. Code: ${result.code}; Raw log: ${result.rawLog}`;
}

class CosmWasmClient {
    private readonly tmClient: Tendermint34Client | undefined;
    private readonly queryClient:
        | (QueryClient & AuthExtension & BankExtension & TxExtension & WasmExtension)
        | undefined;
    private readonly codesCache = new Map<number, CodeDetails>();
    private chainId: string | undefined;

    public static async connect(endpoint: string | HttpEndpoint): Promise<CosmWasmClient> {
        const tmClient = await Tendermint34Client.connect(endpoint);
        return new CosmWasmClient(tmClient);
    }

    protected constructor(tmClient: Tendermint34Client | undefined) {
        if (tmClient) {
            this.tmClient = tmClient;
            this.queryClient = QueryClient.withExtensions(
                tmClient,
                setupAuthExtension,
                setupBankExtension,
                setupWasmExtension,
                setupTxExtension,
            );
        }
    }

    protected getTmClient(): Tendermint34Client | undefined {
        return this.tmClient;
    }

    protected forceGetTmClient(): Tendermint34Client {
        if (!this.tmClient) {
            throw new Error(
                "Tendermint client not available. You cannot use online functionality in offline mode.",
            );
        }
        return this.tmClient;
    }

    protected getQueryClient():
        | (QueryClient & AuthExtension & BankExtension & TxExtension & WasmExtension)
        | undefined {
        return this.queryClient;
    }

    public forceGetQueryClient(): QueryClient & AuthExtension & BankExtension & TxExtension & WasmExtension {
        if (!this.queryClient) {
            throw new Error("Query client not available. You cannot use online functionality in offline mode.");
        }
        return this.queryClient;
    }

    public async getChainId(): Promise<string> {
        if (!this.chainId) {
            const response = await this.forceGetTmClient().status();
            const chainId = response.nodeInfo.network;
            if (!chainId) throw new Error("Chain ID must not be empty");
            this.chainId = chainId;
        }

        return this.chainId;
    }

    public async getHeight(): Promise<number> {
        const status = await this.forceGetTmClient().status();
        return status.syncInfo.latestBlockHeight;
    }

    public async getAccount(searchAddress: string): Promise<Account | null> {
        try {
            const account = await this.forceGetQueryClient().auth.account(searchAddress);
            return account ? accountFromAny(account) : null;
            // return accountFromBaseAccount(BaseAccount.decode(account))
        } catch (error: any) {
            if (/rpc error: code = NotFound/i.test(error.toString())) {
                return null;
            }
            throw error;
        }
    }

    public async getSequence(address: string): Promise<SequenceResponse> {
        const account = await this.getAccount(address);
        if (!account) {
            throw new Error(
                "Account does not exist on chain. Send some tokens there before trying to query sequence.",
            );
        }
        return {
            accountNumber: account.accountNumber,
            sequence: account.sequence,
        };
    }

    public async getBlock(height?: number): Promise<Block> {
        const response = await this.forceGetTmClient().block(height);
        return {
            id: toHex(response.blockId.hash).toUpperCase(),
            header: {
                version: {
                    block: new Uint53(response.block.header.version.block).toString(),
                    app: new Uint53(response.block.header.version.app).toString(),
                },
                height: response.block.header.height,
                chainId: response.block.header.chainId,
                time: toRfc3339WithNanoseconds(response.block.header.time),
            },
            txs: response.block.txs,
        };
    }

    public async getBalance(address: string, searchDenom: string): Promise<Coin> {
        return this.forceGetQueryClient().bank.balance(address, searchDenom);
    }

    public async getTx(id: string): Promise<IndexedTx | null> {
        const results = await this.txsQuery(`tx.hash='${id}'`);
        return results[0] ?? null;
    }

    public async searchTx(query: SearchTxQuery, filter: SearchTxFilter = {}): Promise<readonly IndexedTx[]> {
        const minHeight = filter.minHeight || 0;
        const maxHeight = filter.maxHeight || Number.MAX_SAFE_INTEGER;

        if (maxHeight < minHeight) return []; // optional optimization

        function withFilters(originalQuery: string): string {
            return `${originalQuery} AND tx.height>=${minHeight} AND tx.height<=${maxHeight}`;
        }

        let txs: readonly IndexedTx[];

        if (isSearchByHeightQuery(query)) {
            txs =
                query.height >= minHeight && query.height <= maxHeight
                    ? await this.txsQuery(`tx.height=${query.height}`)
                    : [];
        } else if (isSearchBySentFromOrToQuery(query)) {
            const sentQuery = withFilters(`message.module='bank' AND transfer.sender='${query.sentFromOrTo}'`);
            const receivedQuery = withFilters(
                `message.module='bank' AND transfer.recipient='${query.sentFromOrTo}'`,
            );
            const [sent, received] = await Promise.all(
                [sentQuery, receivedQuery].map((rawQuery) => this.txsQuery(rawQuery)),
            );
            const sentHashes = sent.map((t) => t.hash);
            txs = [...sent, ...received.filter((t) => !sentHashes.includes(t.hash))];
        } else if (isSearchByTagsQuery(query)) {
            const rawQuery = withFilters(query.tags.map((t) => `${t.key}='${t.value}'`).join(" AND "));
            txs = await this.txsQuery(rawQuery);
        } else {
            throw new Error("Unknown query type");
        }

        const filtered = txs.filter((tx) => tx.height >= minHeight && tx.height <= maxHeight);
        return filtered;
    }

    public disconnect(): void {
        if (this.tmClient) this.tmClient.disconnect();
    }

    /**
     * Broadcasts a signed transaction to the network and monitors its inclusion in a block.
     *
     * If broadcasting is rejected by the node for some reason (e.g. because of a CheckTx failure),
     * an error is thrown.
     *
     * If the transaction is not included in a block before the provided timeout, this errors with a `TimeoutError`.
     *
     * If the transaction is included in a block, a `DeliverTxResponse` is returned. The caller then
     * usually needs to check for execution success or failure.
     */
    // NOTE: This method is tested against slow chains and timeouts in the @cosmjs/stargate package.
    // Make sure it is kept in sync!
    public async broadcastTx(
        tx: Uint8Array,
        timeoutMs = 60_000,
        pollIntervalMs = 3_000,
    ): Promise<DeliverTxResponse> {
        let timedOut = false;
        const txPollTimeout = setTimeout(() => {
            timedOut = true;
        }, timeoutMs);

        const pollForTx = async (txId: string): Promise<DeliverTxResponse> => {
            if (timedOut) {
                throw new TimeoutError(
                    `Transaction with ID ${txId} was submitted but was not yet found on the chain. You might want to check later. There was a wait of ${
                        timeoutMs / 1000
                    } seconds.`,
                    txId,
                );
            }
            await sleep(pollIntervalMs);
            const result = await this.getTx(txId);
            return result
                ? {
                    code: result.code,
                    height: result.height,
                    rawLog: result.rawLog,
                    transactionHash: txId,
                    gasUsed: result.gasUsed,
                    gasWanted: result.gasWanted,
                }
                : pollForTx(txId);
        };

        const broadcasted = await this.forceGetTmClient().broadcastTxSync({ tx });
        if (broadcasted.code) {
            throw new Error(
                `Broadcasting transaction failed with code ${broadcasted.code} (codespace: ${broadcasted.codeSpace}). Log: ${broadcasted.log}`,
            );
        }
        const transactionId = toHex(broadcasted.hash).toUpperCase();
        return new Promise((resolve, reject) =>
            pollForTx(transactionId).then(
                (value) => {
                    clearTimeout(txPollTimeout);
                    resolve(value);
                },
                (error) => {
                    clearTimeout(txPollTimeout);
                    reject(error);
                },
            ),
        );
    }

    /**
     * getCodes() returns all codes and is just looping through all pagination pages.
     *
     * This is potentially inefficient and advanced apps should consider creating
     * their own query client to handle pagination together with the app's screens.
     */
    public async getCodes(): Promise<readonly Code[]> {
        const allCodes = [];

        let startAtKey: Uint8Array | undefined = undefined;
        do {
            const { codeInfos, pagination }: QueryCodesResponse =
                await this.forceGetQueryClient().wasm.listCodeInfo(startAtKey);
            const loadedCodes = codeInfos || [];
            allCodes.push(...loadedCodes);
            startAtKey = pagination?.nextKey;
        } while (startAtKey?.length !== 0);

        return allCodes.map((entry: CodeInfoResponse): Code => {
            assert(entry.creator && entry.codeId && entry.dataHash, "entry incomplete");
            return {
                id: entry.codeId.toNumber(),
                creator: entry.creator,
                checksum: toHex(entry.dataHash),
            };
        });
    }

    public async getCodeDetails(codeId: number): Promise<CodeDetails> {
        const cached = this.codesCache.get(codeId);
        if (cached) return cached;

        const { codeInfo, data } = await this.forceGetQueryClient().wasm.getCode(codeId);
        assert(
            codeInfo && codeInfo.codeId && codeInfo.creator && codeInfo.dataHash && data,
            "codeInfo missing or incomplete",
        );
        const codeDetails: CodeDetails = {
            id: codeInfo.codeId.toNumber(),
            creator: codeInfo.creator,
            checksum: toHex(codeInfo.dataHash),
            data: data,
        };
        this.codesCache.set(codeId, codeDetails);
        return codeDetails;
    }

    /**
     * getContracts() returns all contract instances for one code and is just looping through all pagination pages.
     *
     * This is potentially inefficient and advanced apps should consider creating
     * their own query client to handle pagination together with the app's screens.
     */
    public async getContracts(codeId: number): Promise<readonly string[]> {
        const allContracts = [];
        let startAtKey: Uint8Array | undefined = undefined;
        do {
            const { contracts, pagination }: QueryContractsByCodeResponse =
                await this.forceGetQueryClient().wasm.listContractsByCodeId(codeId, startAtKey);
            const loadedContracts = contracts || [];
            allContracts.push(...loadedContracts);
            startAtKey = pagination?.nextKey;
        } while (startAtKey?.length !== 0 && startAtKey !== undefined);

        return allContracts;
    }

    /**
     * Throws an error if no contract was found at the address
     */
    public async getContract(address: string): Promise<Contract> {
        const { address: retrievedAddress, contractInfo } = await this.forceGetQueryClient().wasm.getContractInfo(
            address,
        );
        if (!contractInfo) throw new Error(`No contract found at address "${address}"`);
        assert(retrievedAddress, "address missing");
        assert(contractInfo.codeId && contractInfo.creator && contractInfo.label, "contractInfo incomplete");
        return {
            address: retrievedAddress,
            codeId: contractInfo.codeId.toNumber(),
            creator: contractInfo.creator,
            admin: contractInfo.admin || undefined,
            label: contractInfo.label,
            ibcPortId: contractInfo.ibcPortId || undefined,
        };
    }

    /**
     * Throws an error if no contract was found at the address
     */
    public async getContractCodeHistory(address: string): Promise<readonly ContractCodeHistoryEntry[]> {
        const result = await this.forceGetQueryClient().wasm.getContractCodeHistory(address);
        if (!result) throw new Error(`No contract history found for address "${address}"`);
        const operations: Record<number, "Init" | "Genesis" | "Migrate"> = {
            [ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT]: "Init",
            [ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS]: "Genesis",
            [ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE]: "Migrate",
        };
        return (result.entries || []).map((entry): ContractCodeHistoryEntry => {
            assert(entry.operation && entry.codeId && entry.msg);
            return {
                operation: operations[entry.operation],
                codeId: entry.codeId.toNumber(),
                msg: JSON.parse(fromAscii(entry.msg)),
            };
        });
    }

    /**
     * Returns the data at the key if present (raw contract dependent storage data)
     * or null if no data at this key.
     *
     * Promise is rejected when contract does not exist.
     */
    public async queryContractRaw(address: string, key: Uint8Array): Promise<Uint8Array | null> {
        // just test contract existence
        await this.getContract(address);

        const { data } = await this.forceGetQueryClient().wasm.queryContractRaw(address, key);
        return data ?? null;
    }

    /**
     * Makes a smart query on the contract, returns the parsed JSON document.
     *
     * Promise is rejected when contract does not exist.
     * Promise is rejected for invalid query format.
     * Promise is rejected for invalid response format.
     */
    public async queryContractSmart(address: string, queryMsg: Record<string, unknown>): Promise<JsonObject> {
        try {
            return await this.forceGetQueryClient().wasm.queryContractSmart(address, queryMsg);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith("not found: contract")) {
                    throw new Error(`No contract found at address "${address}"`);
                } else {
                    throw error;
                }
            } else {
                throw error;
            }
        }
    }

    private async txsQuery(query: string): Promise<readonly IndexedTx[]> {
        const results = await this.forceGetTmClient().txSearchAll({ query: query });
        return results.txs.map((tx) => {
            return {
                height: tx.height,
                hash: toHex(tx.hash).toUpperCase(),
                code: tx.result.code,
                rawLog: tx.result.log || "",
                tx: tx.tx,
                gasUsed: tx.result.gasUsed,
                gasWanted: tx.result.gasWanted,
            };
        });
    }
}

interface SigningCosmWasmClientOptions {
    readonly registry?: Registry;
    readonly aminoTypes?: AminoTypes;
    readonly prefix?: string;
    readonly broadcastTimeoutMs?: number;
    readonly broadcastPollIntervalMs?: number;
    readonly gasPrice?: GasPrice;
}

export class SigningCosmWasmClient extends CosmWasmClient {
    public readonly registry: Registry;
    public readonly broadcastTimeoutMs: number | undefined;
    public readonly broadcastPollIntervalMs: number | undefined;

    private readonly signer: OfflineSigner;
    private readonly aminoTypes: AminoTypes;
    private readonly gasPrice: GasPrice | undefined;

    public static async connectWithSigner(
        endpoint: string | HttpEndpoint,
        signer: OfflineSigner,
        options: SigningCosmWasmClientOptions = {},
    ): Promise<SigningCosmWasmClient> {
        const tmClient = await Tendermint34Client.connect(endpoint);
        return new SigningCosmWasmClient(tmClient, signer, options);
    }

    /**
     * Creates a client in offline mode.
     *
     * This should only be used in niche cases where you know exactly what you're doing,
     * e.g. when building an offline signing application.
     *
     * When you try to use online functionality with such a signer, an
     * exception will be raised.
     */
    public static async offline(
        signer: OfflineSigner,
        options: SigningCosmWasmClientOptions = {},
    ): Promise<SigningCosmWasmClient> {
        return new SigningCosmWasmClient(undefined, signer, options);
    }

    protected constructor(
        tmClient: Tendermint34Client | undefined,
        signer: OfflineSigner,
        options: SigningCosmWasmClientOptions,
    ) {
        super(tmClient);
        const {
            registry = createDefaultRegistry(),
            aminoTypes = new AminoTypes({ ...createWasmAminoConverters(), ...createBankAminoConverters() }),
        } = options;
        this.registry = registry;
        this.aminoTypes = aminoTypes;
        this.signer = signer;
        this.broadcastTimeoutMs = options.broadcastTimeoutMs;
        this.broadcastPollIntervalMs = options.broadcastPollIntervalMs;
        this.gasPrice = options.gasPrice;
    }

    public async simulate(
        signerAddress: string,
        messages: readonly EncodeObject[],
        memo: string | undefined,
    ): Promise<number> {
        const anyMsgs = messages.map((m) => this.registry.encodeAsAny(m));
        const accountFromSigner = (await this.signer.getAccounts()).find(
            (account) => account.address === signerAddress,
        );
        if (!accountFromSigner) {
            throw new Error("Failed to retrieve account from signer");
        }
        const pubkey = encodeSecp256k1Pubkey(accountFromSigner.pubkey);
        const { sequence } = await this.getSequence(signerAddress);
        const { gasInfo } = await this.forceGetQueryClient().tx.simulate(anyMsgs, memo, pubkey, sequence);
        assertDefined(gasInfo);
        return Uint53.fromString(gasInfo.gasUsed.toString()).toNumber();
    }

    /** Uploads code and returns a receipt, including the code ID */
    public async upload(
        senderAddress: string,
        wasmCode: Uint8Array,
        fee: StdFee | "auto" | number,
        memo = "",
    ): Promise<UploadResult> {
        const compressed = pako.gzip(wasmCode, { level: 9 });
        const storeCodeMsg: MsgStoreCodeEncodeObject = {
            typeUrl: "/cosmwasm.wasm.v1.MsgStoreCode",
            value: MsgStoreCode.fromPartial({
                sender: senderAddress,
                wasmByteCode: compressed,
            }),
        };

        const result = await this.signAndBroadcast(senderAddress, [storeCodeMsg], fee, memo);
        if (isDeliverTxFailure(result)) {
            throw new Error(createDeliverTxResponseErrorMessage(result));
        }
        const parsedLogs = logs.parseRawLog(result.rawLog);
        const codeIdAttr = logs.findAttribute(parsedLogs, "store_code", "code_id");
        return {
            originalSize: wasmCode.length,
            originalChecksum: toHex(sha256(wasmCode)),
            compressedSize: compressed.length,
            compressedChecksum: toHex(sha256(compressed)),
            codeId: Number.parseInt(codeIdAttr.value, 10),
            logs: parsedLogs,
            height: result.height,
            transactionHash: result.transactionHash,
            gasWanted: result.gasWanted,
            gasUsed: result.gasUsed,
        };
    }

    public async instantiate(
        senderAddress: string,
        codeId: number,
        msg: Record<string, unknown>,
        label: string,
        fee: StdFee | "auto" | number,
        options: InstantiateOptions = {},
    ): Promise<InstantiateResult> {
        const instantiateContractMsg: MsgInstantiateContractEncodeObject = {
            typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract",
            value: MsgInstantiateContract.fromPartial({
                sender: senderAddress,
                codeId: Long.fromString(new Uint53(codeId).toString()),
                label: label,
                msg: toUtf8(JSON.stringify(msg)),
                funds: [...(options.funds || [])],
                admin: options.admin,
            }),
        };
        const result = await this.signAndBroadcast(senderAddress, [instantiateContractMsg], fee, options.memo);
        if (isDeliverTxFailure(result)) {
            throw new Error(createDeliverTxResponseErrorMessage(result));
        }
        const parsedLogs = logs.parseRawLog(result.rawLog);
        const contractAddressAttr = logs.findAttribute(parsedLogs, "instantiate", "_contract_address");
        return {
            contractAddress: contractAddressAttr.value,
            logs: parsedLogs,
            height: result.height,
            transactionHash: result.transactionHash,
            gasWanted: result.gasWanted,
            gasUsed: result.gasUsed,
        };
    }

    public async updateAdmin(
        senderAddress: string,
        contractAddress: string,
        newAdmin: string,
        fee: StdFee | "auto" | number,
        memo = "",
    ): Promise<ChangeAdminResult> {
        const updateAdminMsg: MsgUpdateAdminEncodeObject = {
            typeUrl: "/cosmwasm.wasm.v1.MsgUpdateAdmin",
            value: MsgUpdateAdmin.fromPartial({
                sender: senderAddress,
                contract: contractAddress,
                newAdmin: newAdmin,
            }),
        };
        const result = await this.signAndBroadcast(senderAddress, [updateAdminMsg], fee, memo);
        if (isDeliverTxFailure(result)) {
            throw new Error(createDeliverTxResponseErrorMessage(result));
        }
        return {
            logs: logs.parseRawLog(result.rawLog),
            height: result.height,
            transactionHash: result.transactionHash,
            gasWanted: result.gasWanted,
            gasUsed: result.gasUsed,
        };
    }

    public async clearAdmin(
        senderAddress: string,
        contractAddress: string,
        fee: StdFee | "auto" | number,
        memo = "",
    ): Promise<ChangeAdminResult> {
        const clearAdminMsg: MsgClearAdminEncodeObject = {
            typeUrl: "/cosmwasm.wasm.v1.MsgClearAdmin",
            value: MsgClearAdmin.fromPartial({
                sender: senderAddress,
                contract: contractAddress,
            }),
        };
        const result = await this.signAndBroadcast(senderAddress, [clearAdminMsg], fee, memo);
        if (isDeliverTxFailure(result)) {
            throw new Error(createDeliverTxResponseErrorMessage(result));
        }
        return {
            logs: logs.parseRawLog(result.rawLog),
            height: result.height,
            transactionHash: result.transactionHash,
            gasWanted: result.gasWanted,
            gasUsed: result.gasUsed,
        };
    }

    public async migrate(
        senderAddress: string,
        contractAddress: string,
        codeId: number,
        migrateMsg: Record<string, unknown>,
        fee: StdFee | "auto" | number,
        memo = "",
    ): Promise<MigrateResult> {
        const migrateContractMsg: MsgMigrateContractEncodeObject = {
            typeUrl: "/cosmwasm.wasm.v1.MsgMigrateContract",
            value: MsgMigrateContract.fromPartial({
                sender: senderAddress,
                contract: contractAddress,
                codeId: Long.fromString(new Uint53(codeId).toString()),
                msg: toUtf8(JSON.stringify(migrateMsg)),
            }),
        };
        const result = await this.signAndBroadcast(senderAddress, [migrateContractMsg], fee, memo);
        if (isDeliverTxFailure(result)) {
            throw new Error(createDeliverTxResponseErrorMessage(result));
        }
        return {
            logs: logs.parseRawLog(result.rawLog),
            height: result.height,
            transactionHash: result.transactionHash,
            gasWanted: result.gasWanted,
            gasUsed: result.gasUsed,
        };
    }

    public async execute(
        senderAddress: string,
        contractAddress: string,
        msg: Record<string, unknown>,
        fee: StdFee | "auto" | number,
        memo = "",
        funds?: readonly Coin[],
    ): Promise<ExecuteResult> {
        const instruction: ExecuteInstruction = {
            contractAddress: contractAddress,
            msg: msg,
            funds: funds,
        };
        return this.executeMultiple(senderAddress, [instruction], fee, memo);
    }

    /**
     * Like `execute` but allows executing multiple messages in one transaction.
     */
    public async executeMultiple(
        senderAddress: string,
        instructions: readonly ExecuteInstruction[],
        fee: StdFee | "auto" | number,
        memo = "",
    ): Promise<ExecuteResult> {
        const msgs: MsgExecuteContractEncodeObject[] = instructions.map((i) => ({
            typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
            value: MsgExecuteContract.fromPartial({
                sender: senderAddress,
                contract: i.contractAddress,
                msg: toUtf8(JSON.stringify(i.msg)),
                funds: [...(i.funds || [])],
            }),
        }));
        const result = await this.signAndBroadcast(senderAddress, msgs, fee, memo);
        if (isDeliverTxFailure(result)) {
            throw new Error(createDeliverTxResponseErrorMessage(result));
        }
        return {
            logs: logs.parseRawLog(result.rawLog),
            height: result.height,
            transactionHash: result.transactionHash,
            gasWanted: result.gasWanted,
            gasUsed: result.gasUsed,
        };
    }

    public async sendTokens(
        senderAddress: string,
        recipientAddress: string,
        amount: readonly Coin[],
        fee: StdFee | "auto" | number,
        memo = "",
    ): Promise<DeliverTxResponse> {
        const sendMsg: MsgSendEncodeObject = {
            typeUrl: "/cosmos.bank.v1beta1.MsgSend",
            value: {
                fromAddress: senderAddress,
                toAddress: recipientAddress,
                amount: [...amount],
            },
        };
        return this.signAndBroadcast(senderAddress, [sendMsg], fee, memo);
    }

    public async delegateTokens(
        delegatorAddress: string,
        validatorAddress: string,
        amount: Coin,
        fee: StdFee | "auto" | number,
        memo = "",
    ): Promise<DeliverTxResponse> {
        const delegateMsg: MsgDelegateEncodeObject = {
            typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
            value: MsgDelegate.fromPartial({ delegatorAddress: delegatorAddress, validatorAddress, amount }),
        };
        return this.signAndBroadcast(delegatorAddress, [delegateMsg], fee, memo);
    }

    public async undelegateTokens(
        delegatorAddress: string,
        validatorAddress: string,
        amount: Coin,
        fee: StdFee | "auto" | number,
        memo = "",
    ): Promise<DeliverTxResponse> {
        const undelegateMsg: MsgUndelegateEncodeObject = {
            typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
            value: MsgUndelegate.fromPartial({ delegatorAddress: delegatorAddress, validatorAddress, amount }),
        };
        return this.signAndBroadcast(delegatorAddress, [undelegateMsg], fee, memo);
    }

    public async withdrawRewards(
        delegatorAddress: string,
        validatorAddress: string,
        fee: StdFee | "auto" | number,
        memo = "",
    ): Promise<DeliverTxResponse> {
        const withdrawDelegatorRewardMsg: MsgWithdrawDelegatorRewardEncodeObject = {
            typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
            value: MsgWithdrawDelegatorReward.fromPartial({ delegatorAddress: delegatorAddress, validatorAddress }),
        };
        return this.signAndBroadcast(delegatorAddress, [withdrawDelegatorRewardMsg], fee, memo);
    }

    /**
     * Creates a transaction with the given messages, fee and memo. Then signs and broadcasts the transaction.
     *
     * @param signerAddress The address that will sign transactions using this instance. The signer must be able to sign with this address.
     * @param messages
     * @param fee
     * @param memo
     */
    public async signAndBroadcast(
        signerAddress: string,
        messages: readonly EncodeObject[],
        fee: StdFee | "auto" | number,
        memo = "",
    ): Promise<DeliverTxResponse> {
        let usedFee: StdFee;
        if (fee == "auto" || typeof fee === "number") {
            assertDefined(this.gasPrice, "Gas price must be set in the client options when auto gas is used.");
            const gasEstimation = await this.simulate(signerAddress, messages, memo);
            const multiplier = typeof fee === "number" ? fee : 1.3;
            usedFee = calculateFee(Math.round(gasEstimation * multiplier), this.gasPrice);
        } else {
            usedFee = fee;
        }
        const txRaw = await this.sign(signerAddress, messages, usedFee, memo);
        const txBytes = TxRaw.encode(txRaw).finish();
        return this.broadcastTx(txBytes, this.broadcastTimeoutMs, this.broadcastPollIntervalMs);
    }

    public async sign(
        signerAddress: string,
        messages: readonly EncodeObject[],
        fee: StdFee,
        memo: string,
        explicitSignerData?: SignerData,
    ): Promise<TxRaw> {
        let signerData: SignerData;
        if (explicitSignerData) {
            signerData = explicitSignerData;
        } else {
            const { accountNumber, sequence } = await this.getSequence(signerAddress);
            const chainId = await this.getChainId();
            signerData = {
                accountNumber: accountNumber,
                sequence: sequence,
                chainId: chainId,
            };
        }

        return isOfflineDirectSigner(this.signer)
            ? this.signDirect(signerAddress, messages, fee, memo, signerData)
            : this.signAmino(signerAddress, messages, fee, memo, signerData);
    }

    private async signAmino(
        signerAddress: string,
        messages: readonly EncodeObject[],
        fee: StdFee,
        memo: string,
        { accountNumber, sequence, chainId }: SignerData,
    ): Promise<TxRaw> {
        assert(!isOfflineDirectSigner(this.signer));
        const accountFromSigner = (await this.signer.getAccounts()).find(
            (account) => account.address === signerAddress,
        );
        if (!accountFromSigner) {
            throw new Error("Failed to retrieve account from signer");
        }
        const pubkey = encodePubkey(encodeSecp256k1Pubkey(accountFromSigner.pubkey));
        const signMode = SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
        const msgs = messages.map((msg) => this.aminoTypes.toAmino(msg));
        const signDoc = makeSignDocAmino(msgs, fee, chainId, memo, accountNumber, sequence);
        const { signature, signed } = await this.signer.signAmino(signerAddress, signDoc);
        const signedTxBody: TxBodyEncodeObject = {
            typeUrl: "/cosmos.tx.v1beta1.TxBody",
            value: {
                messages: signed.msgs.map((msg) => this.aminoTypes.fromAmino(msg)),
                memo: signed.memo,
            },
        };
        const signedTxBodyBytes = this.registry.encode(signedTxBody);
        const signedGasLimit = Int53.fromString(signed.fee.gas).toNumber();
        const signedSequence = Int53.fromString(signed.sequence).toNumber();
        const signedAuthInfoBytes = makeAuthInfoBytes(
            [{ pubkey, sequence: signedSequence }],
            signed.fee.amount,
            signedGasLimit,
            127 //signMode,
        );
        return TxRaw.fromPartial({
            bodyBytes: signedTxBodyBytes,
            authInfoBytes: signedAuthInfoBytes,
            signatures: [fromBase64(signature.signature)],
        });
    }

    public async signDirect(
        signerAddress: string,
        messages: readonly EncodeObject[],
        fee: StdFee,
        memo: string,
        { accountNumber, sequence, chainId }: SignerData,
    ): Promise<TxRaw> {
        assert(isOfflineDirectSigner(this.signer));
        const accountFromSigner = (await this.signer.getAccounts()).find(
            (account) => account.address === signerAddress,
        );
        if (!accountFromSigner) {
            throw new Error("Failed to retrieve account from signer");
        }
        const pubkey = encodePubkey(encodeSecp256k1Pubkey(accountFromSigner.pubkey));
        const txBody: TxBodyEncodeObject = {
            typeUrl: "/cosmos.tx.v1beta1.TxBody",
            value: {
                messages: messages,
                memo: memo,
            },
        };
        const txBodyBytes = this.registry.encode(txBody);
        const gasLimit = Int53.fromString(fee.gas).toNumber();
        const authInfoBytes = makeAuthInfoBytes([{ pubkey, sequence }], fee.amount, gasLimit);
        const signDoc = makeSignDoc(txBodyBytes, authInfoBytes, chainId, accountNumber);
        const { signature, signed } = await this.signer.signDirect(signerAddress, signDoc);
        return TxRaw.fromPartial({
            bodyBytes: signed.bodyBytes,
            authInfoBytes: signed.authInfoBytes,
            signatures: [fromBase64(signature.signature)],
        });
    }
}
