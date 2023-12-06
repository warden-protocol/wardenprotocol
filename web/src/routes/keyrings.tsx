import { keyrings } from "@/client/identity";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import CardRow from "@/components/card_row";
import NewKeyringButton from "@/components/new_keyring_button";
import Address from "@/components/address";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ChooseKeyringButton from "@/components/choose_keyring_button";

function KeyringsPage() {
  const q = useQuery({ queryKey: ["keyrings"], queryFn: () => keyrings() });
  if (!q.data?.keyrings) {
    return null;
  }

  return (
    <div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
      <div className="flex items-center justify-between pb-4 space-y-2 border-b">
        <div>
          <h2 className="text-4xl">Keyrings</h2>
          <p className="text-muted-foreground">
            A keyring is a trusted party that holds your private keys.
          </p>
        </div>

        <NewKeyringButton />
      </div>

      <div className="space-y-6">
        {q.data?.keyrings.map((kr) => (
          <Card key={kr.address}>
            <CardHeader>
              <CardTitle>Keyring {kr.address}</CardTitle>
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
                  {kr.isActive ? <span className="font-bold text-green-600">Active</span> : "Inactive"}
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

                <CardRow label="Parties">
                  <ul>
                    {kr.parties.map((p) => (
                      <li key={p}>
                        <Address address={p} />
                      </li>
                    ))}
                  </ul>
                </CardRow>
              </div>
            </CardContent>

            <CardFooter className="gap-4">
              <ChooseKeyringButton keyringAddress={kr.address} />

              <Link to={`/keyrings/${kr.address}`}>
                <Button variant="secondary">
                  Open details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div >
  )
}

export default KeyringsPage;
