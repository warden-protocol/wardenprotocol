import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoaderData } from "react-router";
import { Link, Params } from "react-router-dom";
import { useKeplrAddress } from "../keplr";
import { MsgNewKeyRequest, MsgNewKeyRequestResponse } from "../proto/fusionchain/treasury/tx_pb";
import { KeyRequest, KeyRequestStatus, KeyType } from "../proto/fusionchain/treasury/key_pb";
import Keys from "../components/keys";
import KeyRequests from "../components/key_requests";
import { workspaceByAddress } from "../client/identity";
import { useQuery } from "@tanstack/react-query";
import Address from "../components/address";
import { MsgRemoveWorkspaceOwner } from "../proto/fusionchain/identity/tx_pb";
import AddWorkspaceOwnerForm from "@/components/add_workspace_owner_form";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { useBroadcaster } from "@/hooks/keplr";
import WorkspacePolicyCard from "@/components/workspace_policy_card";
import useKeyringAddress from "@/hooks/useKeyringAddress";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { TxMsgData } from "cosmjs-types/cosmos/base/abci/v1beta1/abci";
import { keyRequestById } from "@/client/treasury";
import ProgressStep from "@/components/ui/progress-step";

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

enum KeyRequesterState {
  IDLE = "idle",
  BROADCAST_KEY_REQUEST = "broadcast_key_request",
  WAITING_KEYRING = "waiting_keyring",
  KEY_FULFILLED = "key_fulfilled",
  ERROR = "error",
}

function useKeyRequester() {
  const { broadcast } = useBroadcaster();
  const [state, setState] = useState<KeyRequesterState>(KeyRequesterState.IDLE);
  const [error, setError] = useState<string | undefined>(undefined);
  const [keyRequest, setKeyRequest] = useState<KeyRequest | undefined>(undefined);

  return {
    state,
    keyRequest,
    error,
    requestKey: async (keyringAddress: string, addr: string, workspaceAddr: string) => {
      try {
        setState(KeyRequesterState.BROADCAST_KEY_REQUEST);

        const res = await broadcast([
          new MsgNewKeyRequest({ keyringAddr: keyringAddress, creator: addr, workspaceAddr, keyType: KeyType.ECDSA_SECP256K1 }),
        ]);

        setState(KeyRequesterState.WAITING_KEYRING);

        if (!res || !res.result) {
          throw new Error('failed to broadcast tx');
        }

        if (res.result?.tx_result.code) {
          throw new Error(`tx failed with code ${res.result?.tx_result.code}`);
        }

        // parse tx msg response
        const bytes = Uint8Array.from(atob(res.result.tx_result.data), c => c.charCodeAt(0));
        const msgData = TxMsgData.decode(bytes);
        const newKeyRequestResponse = MsgNewKeyRequestResponse.fromBinary(msgData.msgResponses[0].value);
        const keyRequestId = newKeyRequestResponse.id;

        // wait for sign request to be processed
        while (true) {
          const res = await keyRequestById(keyRequestId);
          setKeyRequest(res.keyRequest);
          if (res?.keyRequest?.status === KeyRequestStatus.PENDING) {
            await sleep(1000);
            continue;
          }

          if (res.keyRequest?.status === KeyRequestStatus.FULFILLED) {
            setState(KeyRequesterState.KEY_FULFILLED);
            return
          }

          throw new Error(`key request rejected with reason: ${res.keyRequest?.rejectReason}`);
        }
      } catch (e) {
        setError(`${e}`);
        setState(KeyRequesterState.ERROR);
      }
    },
    reset: () => {
      if (state === KeyRequesterState.KEY_FULFILLED || state === KeyRequesterState.ERROR) {
        setState(KeyRequesterState.IDLE);
      }
    },
  }
}

function progressForState(state: KeyRequesterState) {
  switch (state) {
    case KeyRequesterState.IDLE:
      return 0;
    case KeyRequesterState.BROADCAST_KEY_REQUEST:
      return 10;
    case KeyRequesterState.WAITING_KEYRING:
      return 50;
    case KeyRequesterState.KEY_FULFILLED:
      return 100;
    default:
      return 0;
  }
}

function KeyRequestDialog({ state, error, keyRequest, reset }: { state: KeyRequesterState, error: string | undefined, keyRequest: KeyRequest | undefined, reset: () => void }) {
  return (
    <AlertDialog open={state !== "idle"}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>New key request</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col gap-4">
              <ProgressStep loading={state === KeyRequesterState.BROADCAST_KEY_REQUEST} done={progressForState(state) > progressForState(KeyRequesterState.BROADCAST_KEY_REQUEST)}>
                <span className="font-bold">Request key</span>
                <span>Use Keplr to sign and broadcast a new key request for this workspace</span>
              </ProgressStep>

              <ProgressStep loading={state === KeyRequesterState.WAITING_KEYRING} done={progressForState(state) > progressForState(KeyRequesterState.WAITING_KEYRING)}>
                <span className="font-bold">Waiting for keyring</span>
                <span>The keyring will pick up your request, generate a new key, and send it back to Fusion</span>
              </ProgressStep>

              <ProgressStep loading={false} done={progressForState(state) >= progressForState(KeyRequesterState.KEY_FULFILLED)}>
                <span className="font-bold">Key generated</span>
                <span>Your new key is ready to be used</span>
              </ProgressStep>

              {
                state === KeyRequesterState.ERROR && (
                  <div className="flex flex-col gap-2 mt-4">
                    <span className="text-red-800">{error}</span>
                    <div className="flex flex-row gap-4">
                      <Button size="sm" variant="secondary" onClick={() => reset()}>
                        Close
                      </Button>
                    </div>
                  </div>
                )
              }

              {
                state === KeyRequesterState.KEY_FULFILLED && (
                  <div className="flex flex-col gap-2 mt-4">
                    <div className="flex flex-row gap-4">
                      <Link to={`/keys/${keyRequest?.id}`}>
                        <Button size="sm">
                          Open key #{keyRequest?.id.toString()}
                        </Button>
                      </Link>
                      <Button size="sm" variant="secondary" onClick={() => reset()}>
                        Close
                      </Button>
                    </div>
                  </div>
                )
              }
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function Workspace() {
  const addr = useKeplrAddress();
  const [keyringAddress, _] = useKeyringAddress();
  const { broadcast } = useBroadcaster();
  const { state, error, keyRequest, requestKey, reset } = useKeyRequester();
  const { workspaceAddr } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const wsQuery = useQuery({
    queryKey: ["workspace", workspaceAddr],
    queryFn: () => workspaceByAddress(workspaceAddr)
  });
  const ws = wsQuery.data?.workspace;

  if (!ws) {
    return (
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Workspace {workspaceAddr} not found</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink to="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink to={`/workspaces/${workspaceAddr}`}>Workspace {workspaceAddr}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Workspace {workspaceAddr}</h2>
          <p className="text-muted-foreground">
            Created by <Address address={ws.creator} />.
          </p>
        </div>
      </div>

      <WorkspacePolicyCard workspace={ws} />

      <Card>
        <CardHeader>
          <CardTitle>Owners</CardTitle>
          <CardDescription>With default policies, owners will be able to perform actions such as adding other owners or signing transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <ul className="flex flex-col space-y-1">
              {ws.owners.map((owner) => (
                <li key={owner} className="list-disc list-inside group">
                  <Address address={owner} />
                  <Button variant="destructive" className="opacity-20 px-2 py-0.5 ml-2 h-auto w-auto group-hover:opacity-100" onClick={() => {
                    broadcast([
                      new MsgRemoveWorkspaceOwner({ creator: addr, workspaceAddr, owner }),
                    ]);
                  }}>
                    X
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <AddWorkspaceOwnerForm addr={addr} workspaceAddr={workspaceAddr} />
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keys</CardTitle>
          <CardDescription>Keys are used to derive blockchain addresses and sign transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          {
            keyringAddress ? (
              <>
                <Button
                  className="flex flex-col"
                  onClick={() => requestKey(keyringAddress, addr, workspaceAddr)}>
                  <span>
                    Request a new key
                  </span>
                  <span className="text-xs">
                    ({keyringAddress})
                  </span>
                </Button>
                <KeyRequestDialog state={state} error={error} keyRequest={keyRequest} reset={reset} />
              </>
            ) : (
              <Link to={`/keyrings`}>
                <Button>
                  Select a keyring
                </Button>
              </Link>
            )}

          <KeyRequests workspaceAddr={workspaceAddr} />
          <Keys workspaceAddr={workspaceAddr} />
        </CardContent>
      </Card>
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
