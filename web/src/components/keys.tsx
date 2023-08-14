import { useQuery } from "@tanstack/react-query";
import { protoInt64 } from "@bufbuild/protobuf";
import { Key as KeyProto } from "../proto/fusionchain/treasury/key_pb";
import { keys, wallets } from "../client/treasury";
import { prettyBytes, prettyKeyType } from "../utils/formatting";
import { Link } from "react-router-dom";
import { keplrBuildAndBroadcast } from "../newclient";
import { MsgNewWalletRequest } from "../proto/fusionchain/treasury/tx_pb";
import { WalletType } from "../proto/fusionchain/treasury/wallet_pb";
import { useKeplrAddress } from "../keplr";

async function attachEthereumWallet(creator: string, keyId: bigint) {
  await keplrBuildAndBroadcast([
    new MsgNewWalletRequest({
      creator,
      keyId: protoInt64.parse(keyId),
      walletType: WalletType.ETH_SEPOLIA,
    }),
  ]);
}

export default function Keys({ workspaceAddr }: { workspaceAddr: string }) {
  const wsQuery = useQuery({ queryKey: ["keys"], queryFn: () => keys(workspaceAddr) });

  return (
    <div className="p-4 space-y-3">
      <span className="text-gray-800 italic">
        Key: a key managed by MPC network, belongs to a specific Workspace
      </span>
      {wsQuery.data?.keys.map((key) => <Key key={key.id.toString()} keyData={key} />)}
    </div>
  );
}

function Key({ keyData }: { keyData: KeyProto }) {
  return (
    <div className="border-2 border-blue-700 bg-blue-50 flex flex-col p-4 rounded">
      <span className="font-bold">
        Key #{keyData.id.toString()}{" "}
        (from <KeyringLink keyringId={keyData.keyringId} />)
      </span>
      <span>Type: {prettyKeyType(keyData.type)}</span>
      <span>Public Key: {prettyBytes(keyData.publicKey)}</span>

      <div className="mt-8">
        <Wallets keyId={keyData.id} />

        <Link to={`/sign-data/${keyData.id}`} className="bg-slate-200 hover:bg-blue-200 px-4 py-2 rounded-lg mt-4 block">
          Sign arbitrary messages
        </Link>
      </div>
    </div>
  );
}

function Wallets({ keyId }: { keyId: bigint }) {
  const addr = useKeplrAddress();
  const walletsQuery = useQuery({ queryKey: ["wallets", keyId.toString()], queryFn: () => wallets(keyId) });

  const sepoliaWallet = walletsQuery.data?.wallets.find((wallet) => wallet.wallet?.type === WalletType.ETH_SEPOLIA);

  if (!sepoliaWallet) {
    return (
      <div>
        <button className="bg-slate-200 hover:bg-blue-200 px-4 py-2 rounded-lg" onClick={() => attachEthereumWallet(addr, keyId)}>
          + Ethereum Sepolia wallet
        </button>
      </div>
    )
  }

  return (
    <div className="">
      {walletsQuery.data?.wallets.map((wallet) => (
        <div key={wallet.wallet?.id.toString()}>
          <span>
            <span className="font-semibold">Sepolia address: </span>
            <span key={wallet.wallet?.id.toString()} className="font-mono">
              {wallet.address}
            </span>
          </span>
          <Link to={`/wallet/${wallet.wallet?.id.toString()}`} className="bg-slate-200 hover:bg-blue-200 px-4 py-2 rounded-lg mt-4 block">
            Sign Sepolia transactions
          </Link>
        </div>
      ))}
    </div>
  );
}

function KeyringLink({ keyringId }: { keyringId: bigint }) {
  return (
    <Link className="underline" to={`/keyrings/${keyringId}`}>
      Keyring #{keyringId.toString()}
    </Link>
  );
}
