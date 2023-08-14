import { TxContext } from "@evmos/transactions";
import { broadcastTransaction, buildTransaction, fetchAccount, signTransaction } from ".";
import { chain } from "../keplr";
import { Message } from "@bufbuild/protobuf";

export async function keplrBuildAndBroadcast(msgs: Message<any>[]) {
  if (!window.keplr) {
    throw new Error("keplr not found")
  }

  const account = await window.keplr.getKey(chain.cosmosChainId)
  const pubkey = btoa(String.fromCharCode(...new Uint8Array(account.pubKey)));

  // fetch sequence number
  const chainAccount = await fetchAccount(undefined, account.bech32Address);

  // build tx context
  const context: TxContext = {
    chain,
    sender: {
      accountAddress: chainAccount.account.base_account.address,
      sequence: parseInt(chainAccount.account.base_account.sequence),
      accountNumber: parseInt(chainAccount.account.base_account.account_number),
      pubkey,
    },
    fee: {
      amount: '4000000000000000',
      denom: 'qrdo',
      gas: '200000',
    },
    memo: "",
  }

  // 1 - build tx
  const tx = buildTransaction(context, msgs);
  // 2 - sign tx
  const signedTx = await signTransaction(context, tx);
  // 3 - broadcast tx
  const res = await broadcastTransaction(undefined, signedTx, undefined);

  return res
}
