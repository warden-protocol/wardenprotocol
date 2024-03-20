import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoaderData } from "react-router";
import { Link, Params } from "react-router-dom";
import { useAddressContext } from "@/def-hooks/useAddressContext";
import Keys from "../components/keys";
import Address from "../components/address";
import AddSpaceOwnerForm from "@/components/add-space-owner-form";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import SpaceIntentCard from "@/components/space-intent-card";
import useKeychainId from "@/hooks/useKeychainId";
import KeyRequestDialog from "@/components/key-request-dialog";
import useRequestKey from "@/hooks/useRequestKey";
import useWardenWardenV1Beta2 from "@/hooks/useWardenWardenV1Beta2";
import { Space as SpaceModel } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/rest";
import { useClient } from "@/hooks/useClient";
import { monitorTx } from "@/hooks/keplr";
import { useToast } from "@/components/ui/use-toast";

function Space() {
  const { address } = useAddressContext();
  const [keychainId, _] = useKeychainId();
  const { state, error, keyRequest, requestKey, reset } = useRequestKey();
  const { spaceId } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const client = useClient();
  const toast = useToast();
  const sendMsgRemoveSpaceOwner = client.WardenWardenV1Beta2.tx.sendMsgRemoveSpaceOwner;
  const { QuerySpaceById } = useWardenWardenV1Beta2();
  const wsQuery = QuerySpaceById({ id: spaceId }, {});
  const space = wsQuery.data?.space as Required<SpaceModel>;

  if (!space) {
    return (
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Space {spaceId} not found</h2>
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
          <BreadcrumbLink to={`/spaces/${spaceId}`}>Space {spaceId}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Space {spaceId}</h2>
          <p className="text-muted-foreground">
            Created by <Address address={space.creator} />.
          </p>
        </div>
      </div>

      <SpaceIntentCard space={space} />

      <Card>
        <CardHeader>
          <CardTitle>Owners</CardTitle>
          <CardDescription>With default intents, owners will be able to perform actions such as adding other owners or signing transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <ul className="flex flex-col space-y-1">
              {space.owners.map((owner) => (
                <li key={owner} className="list-disc list-inside group">
                  <Address address={owner} />
                  <Button variant="destructive" className="opacity-20 px-2 py-0.5 ml-2 h-auto w-auto group-hover:opacity-100" onClick={() => {
                    monitorTx(sendMsgRemoveSpaceOwner({
                      value: { creator: address, spaceId, owner, btl: 0 }
                    }), toast);
                  }}>
                    X
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <AddSpaceOwnerForm addr={address} spaceId={spaceId} />
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keys</CardTitle>
          <CardDescription>Keys are used to derive blockchain addresses and sign transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          {
            keychainId ? (
              <>
                <Button
                  className="flex flex-col"
                  onClick={() => requestKey(keychainId, address, spaceId)}>
                  <span>
                    Request a new key
                  </span>
                  <span className="text-xs">
                    ({keychainId})
                  </span>
                </Button>
                <KeyRequestDialog state={state} error={error} keyRequest={keyRequest} reset={reset} />
              </>
            ) : (
              <Link to={`/keychains`}>
                <Button>
                  Select a keychain
                </Button>
              </Link>
            )}

          <Keys spaceId={spaceId} />
        </CardContent>
      </Card>
    </div>
  );
}

export async function loader({ params }: { params: Params<string> }) {
  if (!params.spaceId) {
    throw new Error("No space address provided");
  }
  return {
    spaceId: params.spaceId,
  };
}

export default Space;
