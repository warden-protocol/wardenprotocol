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
    pubkey: result.account.base_account.pub_key,
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

  const tx: TxPayload = createTxMsgSend(context, params)

  console.log(tx)
  
})()


