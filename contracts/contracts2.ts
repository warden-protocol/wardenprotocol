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
// import * as fusion from "./utils"
import { Wallet } from '@ethersproject/wallet'
import {
  arrayify,
  concat,
  splitSignature,
} from '@ethersproject/bytes'
import { createTxRaw } from '@tharsis/proto'
// import { signTransaction } from '@hanchon/evmos-ts-wallet'

async function signTransaction(
  wallet: Wallet,
  tx: TxPayload,
  broadcastMode: string = 'BROADCAST_MODE_BLOCK',
) {
  const dataToSign = `0x${Buffer.from(
    tx.signDirect.signBytes,
    'base64',
  ).toString('hex')}`

  /* eslint-disable no-underscore-dangle */
  const signatureRaw = wallet._signingKey().signDigest(dataToSign)
  const splitedSignature = splitSignature(signatureRaw)
  const signature = arrayify(concat([splitedSignature.r, splitedSignature.s]))

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
  url: string = 'http://0.0.0.0:1317',
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
  const nodeUrl = 'http://0.0.0.0:1317'
  
  const queryEndpoint = `${nodeUrl}${generateEndpointAccount(address)}`
  console.log(queryEndpoint)
  
  const restOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  
  const rawResult = await fetch(
    queryEndpoint,
    restOptions,
  )
  
  const result = await rawResult.json()
  console.log(result)

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

  const memo: string = ''

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

  const tx = createTxMsgSend(context, params)
  console.log(tx)
  
  const mnemonic = "exclude try nephew main caught favorite tone degree lottery device tissue tent ugly mouse pelican gasp lava flush pen river noise remind balcony emerge"
  const wallet = Wallet.fromMnemonic(mnemonic)
  const signedTx = await signTransaction(wallet, tx)
  // console.log(signedTx)
  const response = await broadcast(signedTx)
  console.log(response)
})()


