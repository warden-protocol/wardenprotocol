# Evmos TS Wallet

Evmos ts/js wallet to sign and broadcast messages created with evmosjs

## Usage

```sh
yarn add @hanchon/evmos-ts-wallet
```

Some constants are exported as helpers but the values may not be updated for the current state of the network:

- MAINNET_FEE
- TESTNET_FEE
- LOCALNET_FEE
- MAINNET_CHAIN
- TESTNET_CHAIN
- LOCALNET_CHAIN

## Configuration

The constants for `fee` and `chain` should be updated by the user to follow the network upgrade and the fee changes, I'll try to keep it up to date, but probably you want to control this values in your code.

Both `getSender` and `brodcast` should set the option parameter called `url`, this should be pointing to the port `1317` of your node or a public rest endpoint. By default is using `localhost:1317`.

Both `signing` functions have the optional parameter `broadcastMode` that by default is `BROADCAST_MODE_BLOCK`.

## Example using keplr signature

```ts
import { Wallet } from '@ethersproject/wallet'
import { createMessageSend } from '@tharsis/transactions'
import {
  broadcast,
  getSender,
  LOCALNET_CHAIN,
  LOCALNET_FEE,
  signTransaction,
} from '@hanchon/evmos-ts-wallet'
;(async () => {
  const privateMnemonic =
    'pluck view carry maid bamboo river major where dutch wood certain oval order wise awkward clerk adult summer because number raven coil crunch hat'
  const wallet = Wallet.fromMnemonic(privateMnemonic)

  const sender = await getSender(wallet)
  const txSimple = createMessageSend(LOCALNET_CHAIN, sender, LOCALNET_FEE, '', {
    destinationAddress: 'evmos1pmk2r32ssqwps42y3c9d4clqlca403yd9wymgr',
    amount: '1',
    denom: 'aevmos',
  })

  const resKeplr = await signTransaction(wallet, txSimple)
  const broadcastRes = await broadcast(resKeplr)
  if (broadcastRes.tx_response.code === 0) {
    console.log('Success')
  } else {
    console.log('Error')
  }
})()
```

## Example using eip712

```ts
import { Wallet } from '@ethersproject/wallet'
import { createMessageSend } from '@tharsis/transactions'
import {
  broadcast,
  getSender,
  LOCALNET_CHAIN,
  LOCALNET_FEE,
  signTransactionUsingEIP712,
} from '@hanchon/evmos-ts-wallet'
;(async () => {
  const privateMnemonic =
    'pluck view carry maid bamboo river major where dutch wood certain oval order wise awkward clerk adult summer because number raven coil crunch hat'
  const wallet = Wallet.fromMnemonic(privateMnemonic)
  const sender = await getSender(wallet)

  const txSimple = createMessageSend(LOCALNET_CHAIN, sender, LOCALNET_FEE, '', {
    destinationAddress: 'evmos1pmk2r32ssqwps42y3c9d4clqlca403yd9wymgr',
    amount: '1',
    denom: 'aevmos',
  })

  const resMM = await signTransactionUsingEIP712(
    wallet,
    sender.accountAddress,
    txSimple,
  )

  const broadcastRes = await broadcast(resMM)
  if (broadcastRes.tx_response.code === 0) {
    console.log('Success')
  } else {
    console.log('Error')
  }
})()
```

## NOTE

- If your wallet didn't get any transaction, it won't be registered in the blockchain and the `getSender` function will throw an error.
- The `getSender` function should be called before sending each transaction to update the nonce or manually increment the value in the sender object.

## Dependencies

- @ethersproject
- @metamask/eth-sig-util
- @tharsis/proto
- @tharsis/transactions
- node-fetch (using `v2` that is limited but should work without enforcing `ESM`. In `src/helper.ts` there is a basic implementation of `fetch` and `post` that can be used to replace `node-fetch`, in case that lib is not working for your case)
