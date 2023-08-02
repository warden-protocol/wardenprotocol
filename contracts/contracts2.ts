import { generateEndpointAccount } from '@evmos/provider'
import {
  Chain,
  Sender,
  Fee,
  TxContext,
  MsgSendParams,
  createTxMsgSend,
  TxPayload,
} from '@evmos/transactions'
import * as fusion from "./utils"
import { Wallet } from '@ethersproject/wallet'
import {
  arrayify,
  concat,
  splitSignature,
} from '@ethersproject/bytes'
import { createTxRaw } from '@tharsis/proto'
import { proto3 } from "@bufbuild/protobuf";
import { createTransactionWithMultipleMessages } from '@evmos/proto';
import { createEIP712, generateFee, generateMessageWithMultipleTransactions, } from '@evmos/eip712';


function signTransaction(
  wallet: Wallet,
  tx: TxPayload,
  broadcastMode: string = 'BROADCAST_MODE_BLOCK',
) {
  const dataToSign = `0x${Buffer.from(
    tx.signDirect.signBytes,
    'base64',
  ).toString('hex')}`

  const signatureRaw = wallet._signingKey().signDigest(dataToSign)
  const splitSig = splitSignature(signatureRaw)
  const signature = arrayify(concat([splitSig.r, splitSig.s]))

  const signedTx = createTxRaw(
    tx.signDirect.body.toBinary(),
    tx.signDirect.authInfo.toBinary(),
    [signature],
  )
  const body = `{ "tx_bytes": [${signedTx.message
    .serializeBinary()
    .toString()}], "mode": "${broadcastMode}" }`

  return body
}

async function broadcast(
  transactionBody: string,
  url: string = 'http://0.0.0.0:1717',
) {
  const post = await fetch(`${url}/cosmos/tx/v1beta1/txs`, {
    method: 'post',
    body: transactionBody,
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await post.json()
  return data
}

(async function main() {
  const address = 'qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j'
  const nodeUrl = 'http://0.0.0.0:1717'
  const queryEndpoint = `${nodeUrl}${generateEndpointAccount(address)}`
  const restOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  const rawResult = await fetch(
    queryEndpoint,
    restOptions,
  )
  const result = await rawResult.json()

  const chain: Chain = {
    chainId: 420,
    cosmosChainId: 'fusion_420-1',
  }
  const sender: Sender = {
    accountAddress: address,
    sequence: result.account.base_account.sequence,
    accountNumber: result.account.base_account.account_number,
    pubkey: result.account.base_account.pub_key.key,
  }
  const fee: Fee = {
    amount: '20',
    denom: 'qrdo',
    gas: '200000',
  }
  const memo = ""
  const context: TxContext = {
    chain,
    sender,
    fee,
    memo,
  }
  const params: MsgSendParams = {
    destinationAddress: 'qredo1ud49m3n00jkmtayj9w7k35zka3fqcl4lqp2j03',
    amount: '1000000',
    denom: 'qrdo',
  }

  // const tx = createTxMsgSend(context, params)
  
  const msgStoreCode = proto3.makeMessageType(
    "cosmos.wasm.v1beta1.MsgStoreCode",
    () => [
      { no: 1, name: "sender", kind: "scalar", T: 9 /* ScalarType.STRING */ },
      { no: 2, name: "wasmByteCode", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
      // { no: 3, name: "instantiatePermission", kind: "message", T: types_1.AccessConfig },
    ],
  );
  const txRaw = createTransactionWithMultipleMessages([msgStoreCode], "", fee.amount, fee.denom, parseInt(fee.gas, 10), 'ethsecp256', sender.pubkey, sender.sequence, sender.accountNumber, chain.cosmosChainId)
  const feeObject = generateFee(fee.amount, fee.denom, fee.gas, sender.accountAddress);
  const msgs = generateMessageWithMultipleTransactions(sender.accountNumber.toString(), sender.sequence.toString(), chain.cosmosChainId, memo, feeObject, [msgStoreCode]);

  const tx: TxPayload = {
    signDirect: txRaw.signDirect,
    legacyAmino: txRaw.legacyAmino,
    eipToSign: createEIP712([msgStoreCode], chain.chainId, msgs), //TODO: Fix this line (msgStoreCode)
  }
  
  const mnemonic = "exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge"
  const wallet = Wallet.fromMnemonic(mnemonic)
  const signedTx = signTransaction(wallet, tx)
  const response = await broadcast(signedTx)
  console.log(response)
})()

// declare enum AccessType {
//     ACCESS_TYPE_UNSPECIFIED = 0,
//     ACCESS_TYPE_NOBODY = 1,
//     /** ACCESS_TYPE_ONLY_ADDRESS - AccessTypeOnlyAddress restricted to an address */
//     ACCESS_TYPE_ONLY_ADDRESS = 2,
//     ACCESS_TYPE_EVERYBODY = 3,
//     UNRECOGNIZED = -1
// }
// export interface AccessConfig {
//     permission: AccessType;
//     address: string;
// }


