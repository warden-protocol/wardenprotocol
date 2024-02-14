import { env } from "@/env";
import { EncodeObject } from "@cosmjs/proto-signing";
import { SigningStargateClient } from "@cosmjs/stargate";

export async function keplrBuildAndBroadcast(msgs: readonly EncodeObject[]) {
  if (!window.getOfflineSigner) {
    throw new Error("keplr not found")
  }

  const offlineSigner = window.getOfflineSigner("wardenprotocol");

  // You can get the address/public keys by `getAccounts` method.
  // It can return the array of address/public key.
  // But, currently, Keplr extension manages only one address/public key pair.
  // XXX: This line is needed to set the sender address for SigningCosmosClient.
  const accounts = await offlineSigner.getAccounts();

  const { address } = accounts[0];
  const signingClient = await SigningStargateClient.connectWithSigner(env.apiURL, offlineSigner);
  return await signingClient.signAndBroadcast(address, msgs, {
    amount: [{
      amount: '200000000',
      denom: 'uward',
    }],
    gas: '200000',
  }, "");

  // // build tx context
  // const context: TxContext = {
  //   chain,
  //   sender: {
  //     accountAddress: chainAccount.account.base_account.address,
  //     sequence: parseInt(chainAccount.account.base_account.sequence),
  //     accountNumber: parseInt(chainAccount.account.base_account.account_number),
  //     pubkey,
  //   },
  //   fee: {
  //     amount: '200000000000000',
  //     denom: 'nward',
  //     gas: '200000',
  //   },
  //   memo: "",
  // }
  //
  // // 1 - build tx
  // const tx = buildTransaction(context, msgs);
  // // 2 - sign tx
  // const signedTx = await signTransaction(context, tx);
  // // 3 - broadcast tx
  // const res = await broadcastTransaction(signedTx, undefined);

  // return res
}
