import {
    cosmos,
    createRpcQueryHooks,
    getSigningWardenClient,
    useRpcClient,
    warden,
} from "@wardenprotocol/wardenjs";
import { env } from "../env";
import { useChain } from "@cosmos-kit/react";
import { EncodeObject, OfflineSigner } from "@cosmjs/proto-signing";
import {
    DeliverTxResponse,
    StdFee,
    isDeliverTxSuccess,
} from "@cosmjs/stargate";

export async function getSigningClient(signer: OfflineSigner) {
    return await getSigningWardenClient({
        signer,
        rpcEndpoint: env.rpcURL,
    });
}

const txRaw = cosmos.tx.v1beta1.TxRaw;

const defaultFee: StdFee = {
    gas: "200000",
    amount: [{ denom: "uward", amount: "250" }],
};

export interface TxOptions {
    fee?: StdFee | null;
    onSuccess?: (res: DeliverTxResponse) => void;
}

export enum TxStatus {
    Failed = "Transaction Failed",
    Successful = "Transaction Successful",
    Broadcasting = "Transaction confirmation in progress",
}

export function useTx(): {
    tx: (
        msgs: EncodeObject[],
        options: TxOptions
    ) => Promise<DeliverTxResponse | undefined>;
} {
    const { address, getOfflineSignerDirect: getOfflineSigner } = useChain(
        env.cosmoskitChainName
    );

    const tx = async (msgs: EncodeObject[], options: TxOptions) => {
        if (!address) {
            throw new Error("No address found. Please connect your wallet.");
        }

        let signed: Parameters<typeof txRaw.encode>["0"];
        const signer = getOfflineSigner();
        const client = await getSigningClient(signer);

        try {
            const fee = options.fee || defaultFee;
            signed = await client.sign(address, msgs, fee, "");
        } catch (e: unknown) {
            console.error(e);
            return;
        }

        if (client && signed) {
            try {
                const res = await client.broadcastTx(
                    Uint8Array.from(txRaw.encode(signed).finish())
                );
                if (isDeliverTxSuccess(res)) {
                    if (options.onSuccess) options.onSuccess(res);

                    return res;
                } else {
                    return res;
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    return { tx };
}

export function useQueryHooks() {
    const rpcQuery = useRpcClient({ rpcEndpoint: env.rpcURL });
    const rpc = rpcQuery.data;
    const isReady = !!rpcQuery.data;

    return {
        isReady,
        ...createRpcQueryHooks({ rpc }),
    };
}

export function getClient() {
    return warden.ClientFactory.createRPCQueryClient({
        rpcEndpoint: env.rpcURL,
    });
}
