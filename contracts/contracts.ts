import * as fusion from "./utils"
import {
    MsgStoreCodeEncodeObject, MsgInstantiateContractEncodeObject,
    MsgExecuteContractEncodeObject
} from "@cosmjs/cosmwasm-stargate";
import { AccountData, makeSignDoc, makeAuthInfoBytes, TxBodyEncodeObject } from "@cosmjs/proto-signing";
import { Secp256k1, Slip10, Slip10Curve, EnglishMnemonic, stringToPath } from "@cosmjs/crypto";
import { GasPrice, logs } from "@cosmjs/stargate";
import { fromBase64, toUtf8 } from "@cosmjs/encoding";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { MsgExecuteContract, MsgInstantiateContract, MsgStoreCode } from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { Any } from "cosmjs-types/google/protobuf/any";
import { Uint53 } from "@cosmjs/math"
import Long from "long";
import pako from "pako";
import fs from "fs";

(async function main() {
    const args = process.argv.slice(2);
    if (args.length < 2) { return };

    const action = args[0];
    const skPath = args[1];

    let contractAddr = "", balances = {};
    if (args.length > 2)
        contractAddr = args[2];
    if (args.length > 3)
        balances = JSON.parse(args[3]);

    const HDPath = stringToPath("m/44'/60'/0'/0/0");
    const sk = JSON.parse(fs.readFileSync(skPath).toString());
    const walletOpts = {
        bip39Password: "",
        hdPaths: [HDPath],
        prefix: "qredo",
        seed: sk.seed,
    };
    const englishMnemonic = new EnglishMnemonic(sk.mnemonic)
    const wallet = new fusion.DirectSecp256k1HdWallet(englishMnemonic, walletOpts)
    const [acct] = await wallet.getAccounts()
    const { privkey } = Slip10.derivePath(Slip10Curve.Secp256k1, sk.seed, HDPath);
    const { pubkey } = await Secp256k1.makeKeypair(privkey);

    const chainOpts: fusion.Options = {
        httpUrl: 'http://0.0.0.0:27657',
        networkId: 'fusion_420-1',
        bech32prefix: 'qredo',
        feeToken: 'qrdo',
        faucetUrl: '',
        hdPath: HDPath,
        defaultKeyFile: '',
        fees: {
            upload: 3000000,
            init: 300000,
            exec: 1200000,
        },
        gasPrice: GasPrice.fromString("0.01qrdo"),
    }

    const clientOpts = { prefix: chainOpts.bech32prefix, gasPrice: chainOpts.gasPrice }
    const client = await fusion.SigningCosmWasmClient.connectWithSigner(chainOpts.httpUrl, wallet, clientOpts)
    const accountAny = await client.forceGetQueryClient().auth.account(acct.address);
    const account = fusion.accountFromAny(accountAny);
    const publicKey = fusion.encodePubkey(fusion.encodeSecp256k1Pubkey(Secp256k1.compressPubkey(pubkey), "/ethermint.crypto.v1.ethsecp256k1.PubKey"));

    let wasmPath = "", label = "", codeID = -1, msgs: Object[] = [], queries: Object[] = [];
    switch (action) {
        case "deploy_watchlist":
            wasmPath = "watchlist/target/wasm32-unknown-unknown/release/fusion_watchlist.wasm";
            label = "Fusion Watchlist Contract";
            msgs = [{
                watch: {
                    address: "0x8b21f921D19a23594ab8554dC711F420E32bE237",
                    threshold: 2,
                }
            },
            {
                watch: {
                    address: "0x6Ea8aC1673402989e7B653aE4e83b54173719C30",
                    threshold: 2,
                }
            }];
            break;
        case "update_watchlist":
            msgs = [{ update_balances: { new_balances: balances } }];
            break;
        case "query_watchlist":
            queries = [{ get_watchlist: {} }, { get_balances: {} }];
            break;
        case "deploy_proxy":   
            wasmPath = "proxy/target/wasm32-unknown-unknown/release/fusion_watchlist_proxy.wasm";
            label = "Fusion Watchlist Proxy Contract";
            msgs = [{ update_addr: { address: contractAddr }}];
            break;
        case "update_proxy":
            msgs = [{ update_addr: { address: contractAddr }}];
            break;
        case "query_proxy":
            queries = [{ get_watchlist_addr: {} }];
    }    

    /// 1. Store the WASM binary on-chain
    if (wasmPath)
        codeID = await upload(wasmPath, client, account, acct, chainOpts, wallet, publicKey)
    /// 2. Instantiate the contract
    if (codeID != -1)
        contractAddr = await instantiate(client, account, codeID, label, chainOpts, wallet, publicKey)
    /// 3. Execute the contract
    if (contractAddr && msgs)
        await execute(client, account, contractAddr, chainOpts, wallet, publicKey, msgs)
    /// 4. Finally results can be queried
    if (contractAddr && queries) {
        query(client, contractAddr, queries)
    }
})();


async function upload(
    wasmPath: string, client: fusion.SigningCosmWasmClient, account: fusion.Account, acct: AccountData,
    chainOpts: fusion.Options, wallet: fusion.DirectSecp256k1HdWallet, publicKey: Any
): Promise<number> {
    const wasm = fs.readFileSync(wasmPath)
    const compressed = pako.gzip(wasm, { level: 9 });
    const storeCodeMsg: MsgStoreCodeEncodeObject = {
        typeUrl: "/cosmwasm.wasm.v1.MsgStoreCode",
        value: MsgStoreCode.fromPartial({
            sender: acct.address,
            wasmByteCode: compressed,
        }),
    };
    const txBodyStore: TxBodyEncodeObject = {
        typeUrl: "/cosmos.tx.v1beta1.TxBody",
        value: {
            messages: [storeCodeMsg],
            memo: "",
        },
    };
    const txBodyBytesStore = client.registry.encode(txBodyStore);
    const authInfoBytesStore = makeAuthInfoBytes(
        fusion.signerData(publicKey, account.sequence),
        fusion.coinData(chainOpts.feeToken, chainOpts.fees.upload.toString()),
        chainOpts.fees.upload
    );
    const signDocStore = makeSignDoc(txBodyBytesStore, authInfoBytesStore, chainOpts.networkId, account.accountNumber);
    const sigStore = await wallet.signDirect(account.address, signDocStore, "/ethermint.crypto.v1.ethsecp256k1.PubKey");
    const txRawStore = TxRaw.fromPartial({
        bodyBytes: sigStore.signed.bodyBytes,
        authInfoBytes: sigStore.signed.authInfoBytes,
        signatures: [fromBase64(sigStore.signature.signature)],
    });
    const txBytesStore = TxRaw.encode(txRawStore).finish();
    const txStore = await client.broadcastTx(txBytesStore);
    console.log(txStore);
    const parsedLogsStore = logs.parseRawLog(txStore.rawLog);
    const codeIdAttr = logs.findAttribute(parsedLogsStore, "store_code", "code_id");
    return Number.parseInt(codeIdAttr.value, 10);
}

async function instantiate(
    client: fusion.SigningCosmWasmClient, account: fusion.Account, codeID: number, label: string,
    chainOpts: fusion.Options, wallet: fusion.DirectSecp256k1HdWallet, publicKey: Any
): Promise<string> {
    const initContractMsg: MsgInstantiateContractEncodeObject = {
        typeUrl: "/cosmwasm.wasm.v1.MsgInstantiateContract",
        value: MsgInstantiateContract.fromPartial({
            sender: account.address,
            codeId: Long.fromString(new Uint53(codeID).toString()),
            label: label,
            msg: toUtf8(JSON.stringify({})),
            funds: [...([])],
            admin: "",
        }),
    };
    const txBodyInit: TxBodyEncodeObject = {
        typeUrl: "/cosmos.tx.v1beta1.TxBody",
        value: {
            messages: [initContractMsg],
            memo: "",
        },
    };
    const txBodyBytesInit = client.registry.encode(txBodyInit);
    const authBytesInit = makeAuthInfoBytes(
        fusion.signerData(publicKey, account.sequence),
        fusion.coinData(chainOpts.feeToken, chainOpts.fees.init.toString()),
        chainOpts.fees.init
    );
    const signDocInit = makeSignDoc(txBodyBytesInit, authBytesInit, chainOpts.networkId, account.accountNumber);
    const sigInit = await wallet.signDirect(account.address, signDocInit, "/ethermint.crypto.v1.ethsecp256k1.PubKey");
    const txRawInit = TxRaw.fromPartial({
        bodyBytes: sigInit.signed.bodyBytes,
        authInfoBytes: sigInit.signed.authInfoBytes,
        signatures: [fromBase64(sigInit.signature.signature)],
    });
    const txBytesInit = TxRaw.encode(txRawInit).finish();
    const txInit = await client.broadcastTx(txBytesInit);
    console.log(txInit);
    const parsedLogsInit = logs.parseRawLog(txInit.rawLog);
    const contractAddressAttr = logs.findAttribute(parsedLogsInit, "instantiate", "_contract_address");
    console.log(contractAddressAttr);
    return contractAddressAttr.value
}


async function execute(
    client: fusion.SigningCosmWasmClient, account: fusion.Account, contractAddr: string,
    chainOpts: fusion.Options, wallet: fusion.DirectSecp256k1HdWallet, publicKey: Any, msgs: any[]
) {
    for (const msg of msgs) {
        const executeMsg: MsgExecuteContractEncodeObject = ({
            typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
            value: MsgExecuteContract.fromPartial({
                sender: account.address,
                contract: contractAddr,
                msg: toUtf8(JSON.stringify(msg)),
                funds: [Coin.fromJSON({ amount: 1, denom: "qrdo" })],
            }),
        });
        const txBodyExec: TxBodyEncodeObject = {
            typeUrl: "/cosmos.tx.v1beta1.TxBody",
            value: {
                messages: [executeMsg],
                memo: "",
            },
        };
        const txBodyBytesExec = client.registry.encode(txBodyExec);
        const authInfoBytesExec = makeAuthInfoBytes(
            fusion.signerData(publicKey, account.sequence),
            fusion.coinData(chainOpts.feeToken, chainOpts.fees.exec.toString()),
            chainOpts.fees.exec);
        const signDocExec = makeSignDoc(txBodyBytesExec, authInfoBytesExec, chainOpts.networkId, account.accountNumber);
        const sigExec = await wallet.signDirect(account.address, signDocExec, "/ethermint.crypto.v1.ethsecp256k1.PubKey");
        const txRawExec = TxRaw.fromPartial({
            bodyBytes: sigExec.signed.bodyBytes,
            authInfoBytes: sigExec.signed.authInfoBytes,
            signatures: [fromBase64(sigExec.signature.signature)],
        });
        const txBytesExec = TxRaw.encode(txRawExec).finish();
        const txExec = await client.broadcastTx(txBytesExec);
        console.log(txExec);
    }
}


async function query(client: fusion.SigningCosmWasmClient, contractAddr: string, queries: any[]) {
    for (const query of queries) {
        console.log(await client.queryContractSmart(contractAddr, query));
    }
}
