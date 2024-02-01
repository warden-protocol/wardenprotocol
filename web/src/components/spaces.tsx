import { useQuery } from "@tanstack/react-query";
import { spacesByOwner } from "../client/identity";
import Space from "./space";
import { MsgNewSpace } from "../proto/wardenprotocol/identity/tx_pb";
import { Button } from "./ui/button";
import { useBroadcaster } from "@/hooks/keplr";
import { PlusIcon } from '@heroicons/react/20/solid'

export default function Spaces({ owner }: { owner: string }) {
  const { broadcast } = useBroadcaster();
  const wsQuery = useQuery({ queryKey: ["spaces", "owner", owner], queryFn: () => spacesByOwner(owner) });
  const count = wsQuery.data?.spaces.length;

  return (
    <div className="flex items-center justify-center">
      {count && count > 0 ? (
        <div className="flex flex-col mt-6 gap-4">
          {wsQuery.data?.spaces.map((space) => (
            <Space key={space.address} space={space} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h3 className="mt-2 text-3xl text-gray-900">No spaces</h3>
          <p className="mt-1 text-gray-500">Get started by creating a new space.</p>
          <div className="mt-6">
            <Button
              type="button"
              onClick={() => {
                broadcast([
                  new MsgNewSpace({ creator: owner }),
                ]);
              }}
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              New Space
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
