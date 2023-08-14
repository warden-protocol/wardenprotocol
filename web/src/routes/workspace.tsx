import {  protoInt64 } from "@bufbuild/protobuf";
import { useLoaderData } from "react-router";
import { Params } from "react-router-dom";
import { useKeplrAddress } from "../keplr";
import { keplrBuildAndBroadcast } from "../newclient";
import { MsgNewKeyRequest } from "../proto/fusionchain/treasury/tx_pb";
import { KeyType } from "../proto/fusionchain/treasury/key_pb";
import Keys from "../components/keys";
import KeyRequests from "../components/key_requests";

async function requestNewKey(creator: string, workspaceAddr: string, keyringId: number) {
  await keplrBuildAndBroadcast([
    new MsgNewKeyRequest({ keyringId: protoInt64.parse(keyringId), creator, workspaceAddr, keyType: KeyType.ECDSA_SECP256K1 }),
  ]);
}

function Workspace() {
  const addr = useKeplrAddress();
  const { workspaceAddr } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const keyringId = 0;

  return (
    <div className="px-6 mt-10">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="font-bold text-lg">Workspace {workspaceAddr}</h1>
        </div>
      </div>

      <div className="mt-10 flex flex-col">
        <h2 className="font-bold">Admin things</h2>
        <span>TODO: allow to view/add/remove admins and owners</span>
      </div>

      <div className="mt-10 flex flex-row justify-between items-center">
        <div>
          <h2 className="font-bold">Keys</h2>
        </div>

        <button className="bg-slate-200 hover:bg-blue-200 px-4 py-2 rounded-lg" onClick={() => requestNewKey(addr, workspaceAddr, keyringId)}>
          Request a new key
        </button>
      </div>

      <KeyRequests workspaceAddr={workspaceAddr} />

      <Keys workspaceAddr={workspaceAddr} />
    </div>
  );
}

export async function loader({ params }: { params: Params<string> }) {
  if (!params.workspaceAddr) {
    throw new Error("No workspace address provided");
  }
  return {
    workspaceAddr: params.workspaceAddr,
  };
}

export default Workspace;
