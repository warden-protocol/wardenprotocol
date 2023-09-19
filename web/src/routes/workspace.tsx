import { protoInt64 } from "@bufbuild/protobuf";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoaderData } from "react-router";
import { Params } from "react-router-dom";
import { useKeplrAddress } from "../keplr";
import { keplrBuildAndBroadcast } from "../newclient";
import { MsgNewKeyRequest } from "../proto/fusionchain/treasury/tx_pb";
import { KeyType } from "../proto/fusionchain/treasury/key_pb";
import Keys from "../components/keys";
import KeyRequests from "../components/key_requests";
import { workspaceByAddress } from "../client/identity";
import { useQuery } from "@tanstack/react-query";
import Address from "../components/address";
import { MsgRemoveWorkspaceOwner } from "../proto/fusionchain/identity/tx_pb";
import AddWorkspaceOwnerForm from "@/components/add_workspace_owner_form";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";

async function requestNewKey(creator: string, workspaceAddr: string, keyringId: number) {
  await keplrBuildAndBroadcast([
    new MsgNewKeyRequest({ keyringId: protoInt64.parse(keyringId), creator, workspaceAddr, keyType: KeyType.ECDSA_SECP256K1 }),
  ]);
}

async function removeOwner(creator: string, workspaceAddr: string, owner: string) {
  await keplrBuildAndBroadcast([
    new MsgRemoveWorkspaceOwner({ creator, workspaceAddr, owner }),
  ]);
}

function Workspace() {
  const addr = useKeplrAddress();
  const { workspaceAddr } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const wsQuery = useQuery(["workspace", workspaceAddr], () => workspaceByAddress(workspaceAddr));
  const keyringId = 0;
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
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href={`/workspaces/${workspaceAddr}`}>Workspace {workspaceAddr}</BreadcrumbLink>
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

      <Card>
        <CardHeader>
          <CardTitle>Policies</CardTitle>
          <CardDescription>Policies define who can operate on this workspace or use its keys to generate and sign transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <span>TODO</span>
          </div>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>

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
                  <Button variant="destructive" className="opacity-20 px-2 py-0.5 ml-2 h-auto w-auto group-hover:opacity-100" onClick={() => removeOwner(addr, ws.address, owner)}>
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
          <Button onClick={() => requestNewKey(addr, workspaceAddr, keyringId)}>
            Request a new key
          </Button>

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
