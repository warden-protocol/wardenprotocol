import { Message } from "@bufbuild/protobuf";
import {
  TxPayload,
  TxContext,
} from '@evmos/transactions'
import { createTxRaw } from '@evmos/proto'
import { createTransactionWithMultipleMessages } from '@evmos/proto';
import { createEIP712, generateFee, generateMessageWithMultipleTransactions, } from '@evmos/eip712';
import Long from 'long'
import {
  AccountResponse,
  BroadcastMode,
  TxToSend,
  generateEndpointAccount,
  generateEndpointBroadcast,
  generatePostBodyBroadcast,
} from '@evmos/provider'
import { fromBase64 } from '@cosmjs/encoding';
import { chainDescriptor } from "../keplr";

export async function fetchAccount(
  address: string,
) {
  const queryEndpoint = `${chainDescriptor.rpc}/${generateEndpointAccount(address)}`

  const restOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }

  // Note that the node will return a 400 status code if the account does not exist.
  const rawResult = await fetch(
    queryEndpoint,
    restOptions,
  );

  const result = await rawResult.json();

  // Note that the `pub_key` will be `null` if the address has not sent any transactions.
  return result as AccountResponse;
}

export function buildTransaction(
  context: TxContext,
  msgs: Message<any>[],
) {
  const wrappedMsgs = msgs.map((msg) => ({
    message: msg,
    path: msg.getType().typeName,
  }));

  const txRaw = createTransactionWithMultipleMessages(
    wrappedMsgs,
    "",
    context.fee.amount,
    context.fee.denom,
    parseInt(context.fee.gas, 10),
    'ethsecp256',
    context.sender.pubkey,
    context.sender.sequence,
    context.sender.accountNumber,
    context.chain.cosmosChainId,
  )
  const feeObject = generateFee(context.fee.amount, context.fee.denom, context.fee.gas, context.sender.accountAddress);
  const msg = generateMessageWithMultipleTransactions(
    context.sender.accountNumber.toString(),
    context.sender.sequence.toString(),
    context.chain.cosmosChainId,
    context.memo,
    feeObject,
    wrappedMsgs,
  );

  const tx: TxPayload = {
    signDirect: txRaw.signDirect,
    legacyAmino: txRaw.legacyAmino,
    eipToSign: createEIP712(wrappedMsgs, context.chain.chainId, msg),
  }

  return tx;
}

export async function signTransaction(
  context: TxContext,
  tx: TxPayload,
) {
  const { chain, sender } = context

  const { signDirect } = tx

  const signResponse = await window?.keplr?.signDirect(
    chain.cosmosChainId,
    sender.accountAddress,
    {
      bodyBytes: signDirect.body.toBinary(),
      authInfoBytes: signDirect.authInfo.toBinary(),
      chainId: chain.cosmosChainId,
      accountNumber: new Long(sender.accountNumber),
    },
  )

  if (!signResponse) {
    throw new Error('No sign response');
  }

  const signatures = [
    fromBase64(signResponse.signature.signature),
  ]

  const { signed } = signResponse

  const signedTx = createTxRaw(
    signed.bodyBytes,
    signed.authInfoBytes,
    signatures,
  )

  return signedTx;
}

export async function broadcastTransaction(
  signedTx: TxToSend,
  broadcastMode: BroadcastMode | undefined = BroadcastMode.Sync,
) {
  const postOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: generatePostBodyBroadcast(signedTx, broadcastMode),
  }

  const broadcastEndpoint = `${chainDescriptor.rpc}/${generateEndpointBroadcast()}`
  const broadcastPost = await fetch(
    broadcastEndpoint,
    postOptions,
  )

  const { tx_response } = await broadcastPost.json()
  if (tx_response.code) {
    throw new Error("Error from chain node: " + tx_response.raw_log)
  }

  return tx_response;
}

