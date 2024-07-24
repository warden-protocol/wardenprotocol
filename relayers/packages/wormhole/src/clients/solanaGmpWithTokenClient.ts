import { CONTRACTS, isBytes, parseTokenTransferVaa } from '@certusone/wormhole-sdk';
import {
  NodeWallet,
  deriveAddress,
  getTokenBridgeDerivedAccounts,
  getTransferNativeWithPayloadCpiAccounts,
  postVaaSolana,
} from '@certusone/wormhole-sdk/lib/cjs/solana/index.js';
import {
  deriveEndpointKey,
  deriveMintAuthorityKey,
  deriveRedeemerAccountKey,
  deriveTokenBridgeConfigKey,
  deriveWrappedMetaKey,
  deriveWrappedMintKey,
} from '@certusone/wormhole-sdk/lib/cjs/solana/tokenBridge/index.js';
import {
  deriveClaimKey,
  derivePostedVaaKey,
  getProgramSequenceTracker,
} from '@certusone/wormhole-sdk/lib/cjs/solana/wormhole/index.js';
import { Idl, Program } from '@coral-xyz/anchor/dist/cjs/index.js';
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import {
  Connection,
  Keypair,
  PublicKey,
  PublicKeyInitData,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import { ChainId } from '@wormhole-foundation/sdk';
import { BN } from 'bn.js';
import bs58 from 'bs58';

import { GmpWithToken, IDL as IdlGmpWithToken } from '../../contracts/solana/target/types/gmp_with_token.js';
import { config } from '../config/schema.js';
import { rootLogger } from '../index.js';
import { getWormholeContractsNetwork } from '../utils.js';

export class SolanaGmpWithTokenClient {
  wormholeCore: PublicKeyInitData;
  wormholeTokenBridge: PublicKeyInitData;
  programId: PublicKey;
  adminKeypair: Keypair;

  constructor(gmpWithTokenContract: string) {
    this.wormholeCore = CONTRACTS[getWormholeContractsNetwork(config.ENVIRONMENT)].solana.core;
    this.wormholeTokenBridge = CONTRACTS[getWormholeContractsNetwork(config.ENVIRONMENT)].solana.token_bridge;
    this.programId = new PublicKey(gmpWithTokenContract);
    this.adminKeypair = Keypair.fromSecretKey(bs58.decode(config.SOL_PRIVATE_KEY));
  }

  async initialize(relayerFee: number, relayerFeePrecition: number): Promise<void> {
    const [connection, program] = createProgram<GmpWithToken>(
      this.programId,
      IdlGmpWithToken,
      this.adminKeypair.publicKey,
    );

    const instruction = await program.methods
      .initialize(relayerFee, relayerFeePrecition)
      .accounts({
        owner: this.adminKeypair.publicKey,
        senderConfig: deriveAddress([Buffer.from('sender')], this.programId),
        redeemerConfig: deriveAddress([Buffer.from('redeemer')], this.programId),
        tokenBridgeProgram: new PublicKey(this.wormholeTokenBridge),
        wormholeProgram: new PublicKey(this.wormholeCore),
        ...getTokenBridgeDerivedAccounts(this.programId, this.wormholeTokenBridge, this.wormholeCore),
      })
      .instruction();

    const tx = new Transaction().add(instruction);
    const result = await sendAndConfirmTransaction(connection, tx, [this.adminKeypair]);

    rootLogger.info(`Gmp with token contract has been successfully initialized: ${result}`);
  }

  async registerForeignContract(
    foreignChain: ChainId,
    foreignContract: Buffer,
    foreignTokenBridge: string,
  ): Promise<void> {
    const [connection, program] = createProgram<GmpWithToken>(
      this.programId,
      IdlGmpWithToken,
      this.adminKeypair.publicKey,
    );

    const foreignContractKey = deriveAddress(
      [
        Buffer.from('foreign_contract'),
        (() => {
          const buf = Buffer.alloc(2);
          buf.writeUInt16LE(foreignChain);
          return buf;
        })(),
      ],
      this.programId,
    );

    const instruction = await program.methods
      .registerForeignContract(foreignChain, [...foreignContract])
      .accounts({
        owner: this.adminKeypair.publicKey,
        config: deriveAddress([Buffer.from('sender')], this.programId),
        foreignContract: foreignContractKey,
        tokenBridgeForeignEndpoint: deriveEndpointKey(this.wormholeTokenBridge, foreignChain, foreignTokenBridge),
        tokenBridgeProgram: new PublicKey(this.wormholeTokenBridge),
      })
      .instruction();

    const tx = new Transaction().add(instruction);
    const result = await sendAndConfirmTransaction(connection, tx, [this.adminKeypair]);

    rootLogger.info(`Foreign contract has been successfully registered: ${result}`);
  }

  async sendNative(from: Keypair, to: Buffer, toChain: ChainId, mint: PublicKey, amount: bigint): Promise<void> {
    const [connection, program] = createProgram<GmpWithToken>(this.programId, IdlGmpWithToken);
    const tracker = await getProgramSequenceTracker(connection, this.wormholeTokenBridge, this.wormholeCore);
    const message = deriveAddress(
      [
        Buffer.from('bridged'),
        (() => {
          const buf = Buffer.alloc(8);
          buf.writeBigUInt64LE(tracker.sequence + 1n);
          return buf;
        })(),
      ],
      this.programId,
    );

    const fromTokenAccount = getAssociatedTokenAddressSync(mint, from.publicKey);
    const tmpTokenAccount = deriveAddress([Buffer.from('tmp'), new PublicKey(mint).toBuffer()], this.programId);

    const tokenBridgeAccounts = getTransferNativeWithPayloadCpiAccounts(
      this.programId,
      this.wormholeTokenBridge,
      this.wormholeCore,
      from.publicKey,
      message,
      fromTokenAccount,
      mint,
    );

    const instruction = await program.methods
      .sendNativeTokensWithPayload(0, new BN(amount.toString()), [...to], toChain)
      .accounts({
        config: deriveAddress([Buffer.from('sender')], this.programId),
        foreignContract: deriveAddress(
          [
            Buffer.from('foreign_contract'),
            (() => {
              const buf = Buffer.alloc(2);
              buf.writeUInt16LE(toChain);
              return buf;
            })(),
          ],
          this.programId,
        ),
        tmpTokenAccount,
        tokenBridgeProgram: new PublicKey(this.wormholeTokenBridge),
        ...tokenBridgeAccounts,
      })
      .instruction();

    const tx = new Transaction().add(instruction);
    const result = await sendAndConfirmTransaction(connection, tx, [from]);

    rootLogger.info(`GMP with token has been successfully sent: ${result}`);
  }

  async postVaa(vaa: Buffer): Promise<void> {
    const [connection, _] = createProgram<GmpWithToken>(this.programId, IdlGmpWithToken);

    await postVaaSolana(
      connection,
      NodeWallet.fromSecretKey(this.adminKeypair.secretKey).signTransaction,
      this.wormholeCore,
      this.adminKeypair.publicKey,
      vaa,
    );

    rootLogger.info(`VAA has been successfully posted to Solana`);
  }

  async redeemWrapped(vaa: Buffer): Promise<void> {
    const [connection, program] = createProgram<GmpWithToken>(this.programId, IdlGmpWithToken);

    const parsedVaa = isBytes(vaa) ? parseTokenTransferVaa(vaa) : vaa;
    const wrappedMint = deriveWrappedMintKey(this.wormholeTokenBridge, parsedVaa.tokenChain, parsedVaa.tokenAddress);

    const tmpTokenAccount = deriveAddress([Buffer.from('tmp'), new PublicKey(wrappedMint).toBuffer()], this.programId);
    const recipient = new PublicKey(parsedVaa.tokenTransferPayload.subarray(1, 33));
    const recipientAta = getAssociatedTokenAddressSync(wrappedMint, recipient);
    const cpiProgramId = new PublicKey(parsedVaa.to);

    await getOrCreateAssociatedTokenAccount(connection, this.adminKeypair, wrappedMint, recipient);
    await getOrCreateAssociatedTokenAccount(connection, this.adminKeypair, wrappedMint, this.adminKeypair.publicKey);

    const foreignContract = deriveAddress(
      [
        Buffer.from('foreign_contract'),
        (() => {
          const buf = Buffer.alloc(2);
          buf.writeUInt16LE(parsedVaa.emitterChain);
          return buf;
        })(),
      ],
      this.programId,
    );

    const instruction = await program.methods
      .redeemWrappedTransferWithPayload([...parsedVaa.hash])
      .accounts({
        config: deriveAddress([Buffer.from('redeemer')], this.programId),
        foreignContract: foreignContract,
        tmpTokenAccount,
        recipientTokenAccount: recipientAta,
        recipient,
        payerTokenAccount: getAssociatedTokenAddressSync(wrappedMint, this.adminKeypair.publicKey),
        tokenBridgeProgram: new PublicKey(this.wormholeTokenBridge),
        ...{
          payer: this.adminKeypair.publicKey,
          tokenBridgeConfig: deriveTokenBridgeConfigKey(this.wormholeTokenBridge),
          vaa: derivePostedVaaKey(this.wormholeCore, parsedVaa.hash),
          tokenBridgeClaim: deriveClaimKey(
            this.wormholeTokenBridge,
            parsedVaa.emitterAddress,
            parsedVaa.emitterChain,
            parsedVaa.sequence,
          ),
          tokenBridgeForeignEndpoint: deriveEndpointKey(
            this.wormholeTokenBridge,
            parsedVaa.emitterChain,
            parsedVaa.emitterAddress,
          ),
          toTokenAccount: new PublicKey(tmpTokenAccount),
          tokenBridgeRedeemer: deriveRedeemerAccountKey(cpiProgramId),
          toFeesTokenAccount: new PublicKey(tmpTokenAccount),
          tokenBridgeWrappedMint: wrappedMint,
          tokenBridgeWrappedMeta: deriveWrappedMetaKey(this.wormholeTokenBridge, wrappedMint),
          tokenBridgeMintAuthority: deriveMintAuthorityKey(this.wormholeTokenBridge),
          rent: SYSVAR_RENT_PUBKEY,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          wormholeProgram: new PublicKey(this.wormholeCore),
        },
      })
      .instruction();

    const tx = new Transaction().add(instruction);
    const result = await sendAndConfirmTransaction(connection, tx, [this.adminKeypair]);

    rootLogger.info(`GMP with token has been successfully redeemed: ${result}`);
  }
}

function createProgram<IDL extends Idl = Idl>(
  programId: PublicKeyInitData,
  idl: IDL,
  payer?: PublicKeyInitData,
): [Connection, Program<IDL>] {
  const connection = new Connection(config.SOLANA_RPC, 'processed');
  const program = new Program<IDL>(idl, new PublicKey(programId), {
    connection,
    publicKey: payer == undefined ? undefined : new PublicKey(payer),
  });

  return [connection, program];
}
