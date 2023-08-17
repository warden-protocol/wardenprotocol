import * as proto from "./protodefs";
import { SigningCosmWasmClient, DirectSecp256k1HdWallet } from "./utilsold";
import { createTransactionWithMultipleMessages } from "@evmos/proto";
import {
  createEIP712,
  generateFee,
  generateMessageWithMultipleTransactions,
} from "@evmos/eip712";
import { Chain, Sender, Fee, TxPayload } from "@evmos/transactions";
import { generateEndpointAccount } from "@evmos/provider";
import { createTxRaw } from "@tharsis/proto";
import { GasPrice } from "@cosmjs/stargate";
import { toUtf8 } from "@cosmjs/encoding";
import { arrayify, concat, splitSignature } from "@ethersproject/bytes";
import { Wallet } from "@ethersproject/wallet";
import pako from "pako";
import fs from "fs";
import { SigningCosmWasmClientOptions } from "@cosmjs/cosmwasm-stargate";
import { stringToPath } from "@cosmjs/crypto";
import { exec } from "child_process";

(async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log("action, privkeyPath, password parameters are required");
    return;
  }
  let contractAddr = "",
    balances = {};
  if (args.length > 3) contractAddr = args[3];
  if (args.length > 4) balances = JSON.parse(args[4]);

  const address = "qredo1d652c9nngq5cneak2whyaqa4g9ehr8psyl0t7j";
  const restURL = "http://0.0.0.0:1717";
  const queryEndpoint = `${restURL}${generateEndpointAccount(address)}`;
  const restOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };
  const rawResult = await fetch(queryEndpoint, restOptions);
  const result = await rawResult.json();

  const chain: Chain = {
    chainId: 420,
    cosmosChainId: "fusion_420-1",
  };

  const sender: Sender = {
    accountAddress: address,
    sequence: result.account.base_account.sequence,
    accountNumber: result.account.base_account.account_number,
    pubkey: result.account.base_account.pub_key.key,
  };

  const fee: Fee = {
    amount: "100000000",
    denom: "nQRDO",
    gas: "10000000",
  };

  // const wallet = Wallet.fromEncryptedJsonSync(
  //   fs.readFileSync(args[1]).toString(),
  //   args[2],
  // );
  const wallet = Wallet.fromMnemonic(
    JSON.parse(fs.readFileSync(args[1]).toString()).mnemonic,
  );

  const walletOpts = {
    bip39Password: "",
    hdPaths: [stringToPath("m/44'/60'/0'/0/0")],
    prefix: "qredo",
    seed: new TextEncoder().encode(wallet.privateKey),
  };
  const w = await DirectSecp256k1HdWallet.fromMnemonic(
    wallet.mnemonic.phrase,
    walletOpts,
  );
  const tmURL = "http://0.0.0.0:27657";
  const clientOpts: SigningCosmWasmClientOptions = {
    prefix: "qredo",
    gasPrice: GasPrice.fromString(fee.gas + fee.denom),
  };
  const client = await SigningCosmWasmClient.connectWithSigner(
    tmURL,
    w,
    clientOpts,
  );

  let wasmPath = "",
    label = "",
    codeID = -1,
    msgs: Object[] = [],
    queries: Object[] = [];

  switch (args[0]) {
    case "deploy_watchlist":
      wasmPath =
        "watchlist/target/wasm32-unknown-unknown/release/fusion_watchlist.wasm";
      label = "Fusion Watchlist Contract";
      msgs = [
        {
          update_watchlist: {
            address: "0x8b21f921D19a23594ab8554dC711F420E32bE237",
            threshold: 1,
          },
        },
        {
          update_watchlist: {
            address: "0x6Ea8aC1673402989e7B653aE4e83b54173719C30",
            threshold: 1,
          },
        },
        {
          update_policy: {
            address: "0x8b21f921D19a23594ab8554dC711F420E32bE237",
            policy: "080210011a0708032203666f6f1a0708032203626172",
          },
        },
        {
          update_policy: {
            address: "0x6Ea8aC1673402989e7B653aE4e83b54173719C30",
            policy: "080210011a0708032203666f6f1a0708032203626172",
          },
        },
      ];
      break;

    case "update_watchlist":
      msgs = [{ update_balances: { new_balances: balances } }];
      break;

    case "query_watchlist":
      queries = [{ get_watchlist: {} }, { get_balances: {} }];
      break;

    case "deploy_proxy":
      wasmPath =
        "proxy/target/wasm32-unknown-unknown/release/fusion_watchlist_proxy.wasm";
      label = "Fusion Watchlist Proxy Contract";
      msgs = [{ update_addr: { address: contractAddr } }];
      break;

    case "update_proxy":
      msgs = [{ update_addr: { address: contractAddr } }];
      break;

    case "query_proxy":
      queries = [{ get_watchlist_addr: {} }];
      break;

    case "deploy_wrapper":
      wasmPath =
        "wrapper/target/wasm32-unknown-unknown/release/fusion_qrdo_wrapper.wasm";
      label = "Fusion wQRDO Wrapper Contract";
      msgs = [{ wrap: { amount: "200" } }];
      break;

    case "query_wrapper_balance":
      queries = [{ balance: { address: sender.accountAddress } }];
      break;
  }

  if (wasmPath && label) {
    codeID = await upload(sender, chain, fee, wallet, wasmPath);
  }
  if (codeID != -1) {
    contractAddr = await instantiate(sender, chain, fee, wallet, codeID, label);
  }
  if (contractAddr && msgs[0]) {
    await execute(sender, chain, fee, wallet, msgs, contractAddr);
  }
  if (contractAddr && queries) {
    query(client, contractAddr, queries);
  }
})();

function queryTx(hash: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec("fusiond --node tcp://localhost:27657 q tx " + hash, (error, out) => {
      if (error) {
        reject(error);
      } else {
        resolve(out);
      }
    });
  });
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function upload(
  sender: Sender,
  chain: Chain,
  fee: Fee,
  wallet: Wallet,
  wasmPath: string,
): Promise<number> {
  const msgStoreCode = {
    message: new proto.MsgStoreCode({
      sender: sender.accountAddress,
      wasmByteCode: pako.gzip(fs.readFileSync(wasmPath), { level: 9 }),
    }),
    path: "cosmwasm.wasm.v1.MsgStoreCode",
  };

  const response = await createAndBroadcastTx(
    sender,
    chain,
    fee,
    wallet,
    msgStoreCode,
  );
  sender.sequence++;

  await sleep(5000);
  const output = await queryTx(response.tx_response.txhash);
  const regex = /key: code_id\s+value: "(\d+)"/;
  const match = output.match(regex);

  return new Promise((resolve, reject) => {
    if (match) {
      console.log("\nWASM bytecode uploaded to chain, codeID is " + match[1]);
      resolve(parseInt(match[1]));
    } else {
      reject("error getting codeID");
    }
  });
}

async function instantiate(
  sender: Sender,
  chain: Chain,
  fee: Fee,
  wallet: Wallet,
  codeID: number,
  label: string,
): Promise<string> {
  const msgInstantiateContract = {
    message: new proto.MsgInstantiateContract({
      sender: sender.accountAddress,
      admin: "",
      codeId: codeID,
      label: label,
      msg: toUtf8(JSON.stringify({})),
      funds: [new proto.Coin({ denom: "nQRDO", amount: "200" })],
    }),
    path: "cosmwasm.wasm.v1.MsgInstantiateContract",
  };

  const response = await createAndBroadcastTx(
    sender,
    chain,
    fee,
    wallet,
    msgInstantiateContract,
  );
  sender.sequence++;

  await sleep(5000);
  const output = await queryTx(response.tx_response.txhash);
  // const regex = /key: _contract_address\s+value: "(\s+)"/;
  const regex = /_contract_address\"\s*,\s*\"value\"\s*:\s*\"([^\"]+)/;
  const match = output.match(regex);

  return new Promise((resolve, reject) => {
    if (match) {
      console.log("\nCW contract instantiated, address is " + match[1]);
      resolve(match[1]);
    } else {
      reject("error getting contractAddr");
    }
  });
}

async function execute(
  sender: Sender,
  chain: Chain,
  fee: Fee,
  wallet: Wallet,
  msgs: any,
  contractAddr: string,
) {
  var messages: any[] = [];

  for (const msg of msgs) {
    messages.push({
      message: new proto.MsgExecuteContract({
        sender: sender.accountAddress,
        contract: contractAddr,
        msg: toUtf8(JSON.stringify(msg)),
        funds: [new proto.Coin({ denom: "nQRDO", amount: "200" })],
      }),
      path: "cosmwasm.wasm.v1.MsgExecuteContract",
    });
  }

  const response = await createAndBroadcastTx(
    sender,
    chain,
    fee,
    wallet,
    messages,
  );
  sender.sequence++;

  console.log("\nexecuted contract call(s), not waiting for response\n");
  // await sleep(5000);
  // console.log(await queryTx(response.tx_response.txhash));
}

async function createAndBroadcastTx(
  sender: Sender,
  chain: Chain,
  fee: Fee,
  wallet: Wallet,
  msgs: Object,
): Promise<any> {
  const txRaw = createTransactionWithMultipleMessages(
    wrapToArray(msgs),
    "",
    fee.amount,
    fee.denom,
    parseInt(fee.gas),
    "ethsecp256",
    sender.pubkey,
    sender.sequence,
    sender.accountNumber,
    chain.cosmosChainId,
  );

  const message = generateMessageWithMultipleTransactions(
    sender.accountNumber.toString(),
    sender.sequence.toString(),
    chain.cosmosChainId,
    "",
    generateFee(fee.amount, fee.denom, fee.gas, sender.accountAddress),
    wrapToArray(msgs),
  );

  const tx: TxPayload = {
    signDirect: txRaw.signDirect,
    legacyAmino: txRaw.legacyAmino,
    eipToSign: createEIP712(wrapToArray(msgs), chain.chainId, message), //TODO: Fix this line (message)
  };

  return await broadcast(signTransaction(wallet, tx));
}

function signTransaction(
  wallet: Wallet,
  tx: TxPayload,
  broadcastMode: string = "BROADCAST_MODE_SYNC",
) {
  const dataToSign = `0x${Buffer.from(
    tx.signDirect.signBytes,
    "base64",
  ).toString("hex")}`;

  const signatureRaw = wallet._signingKey().signDigest(dataToSign);
  const splitSig = splitSignature(signatureRaw);
  const signature = arrayify(concat([splitSig.r, splitSig.s]));

  const signedTx = createTxRaw(
    tx.signDirect.body.toBinary(),
    tx.signDirect.authInfo.toBinary(),
    [signature],
  );
  const body = `{ "tx_bytes": [${signedTx.message
    .serializeBinary()
    .toString()}], "mode": "${broadcastMode}" }`;

  return body;
}

async function broadcast(
  transactionBody: string,
  url: string = "http://0.0.0.0:1717",
) {
  const post = await fetch(`${url}/cosmos/tx/v1beta1/txs`, {
    method: "post",
    body: transactionBody,
    headers: { "Content-Type": "application/json" },
  });
  const data = await post.json();
  console.log("\ntx broadcasted, waiting for inclusion within block");
  return data;
}

async function query(
  client: SigningCosmWasmClient,
  contractAddr: string,
  queries: any[],
) {
  for (const query of queries) {
    console.log(await client.queryContractSmart(contractAddr, query));
  }
}

const wrapToArray = (obj: any) => {
  return Array.isArray(obj) ? obj : [obj];
};
