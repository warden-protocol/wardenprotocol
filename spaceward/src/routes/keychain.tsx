import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoaderData } from "react-router";
import { Params } from "react-router-dom";
import Address from "../components/address";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import AddKeychainPartyForm from "@/components/add-keychain-party-form";
import CardRow from "@/components/card-row";
import useWardenWarden from "@/hooks/useWardenWarden";
import { useAddressContext } from "@/def-hooks/useAddressContext";
import { Keychain as KeychainRest } from "wardenprotocol-warden-client-ts/lib/warden.warden/rest";

function Keychain() {
  const { keychainAddr } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { address } = useAddressContext();
  const { QueryKeychainByAddress } = useWardenWarden();
  const krQuery  = QueryKeychainByAddress({ address: keychainAddr }, {});
  const kr = krQuery.data?.keychain as Required<KeychainRest>;

  if (!kr) {
    return (
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Keychain {keychainAddr} not found</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink to="/keychains">Keychains</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink to={`/keychains/${keychainAddr}`}>{keychainAddr}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Keychain {keychainAddr}</h2>
          <p className="text-muted-foreground">
            Created by <Address address={kr.creator} />.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <CardRow label="Description">
              {kr.description}
            </CardRow>

            <CardRow label="Creator">
              <Address address={kr.creator} />
            </CardRow>

            <CardRow label="Active">
              {kr.is_active ? <span className="font-bold text-green-600">Active</span> : "Inactive"}
            </CardRow>

            <CardRow label="Admins">
              <ul>
                {kr.admins.map((admin) => (
                  <li key={admin}>
                    <Address address={admin} />
                  </li>
                ))}
              </ul>
            </CardRow>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Parties</CardTitle>
          <CardDescription>These accounts will be allowed to respond to keys and signatures requests for this keychain.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <ul className="flex flex-col space-y-1">
              {kr.parties.map((p) => (
                <li key={p} className="list-disc list-inside group">
                  <Address address={p} />
                  {/** this tx doesn't exist yet
                  <Button variant="destructive" className="opacity-20 px-2 py-0.5 ml-2 h-auto w-auto group-hover:opacity-100" onClick={() => {
                    broadcast([
                    ]);
                  }}>
                    X
                  </Button>
                  **/ }
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <AddKeychainPartyForm addr={address} keychainAddr={keychainAddr} />
        </CardFooter>
      </Card>
    </div>
  );
}

export async function loader({ params }: { params: Params<string> }) {
  if (!params.keychainAddr) {
    throw new Error("No keychain address provided");
  }
  return {
    keychainAddr: params.keychainAddr,
  };
}

export default Keychain;
