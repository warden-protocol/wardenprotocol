import Space from "./space";
import { Button } from "./ui/button";
import { PlusIcon } from '@heroicons/react/20/solid'
import useWardenWarden from "@/hooks/useWardenWarden";
import { useClient } from "@/hooks/useClient";
import { monitorTx } from "@/hooks/keplr";
import { useToast } from "./ui/use-toast";

export default function Spaces({ owner }: { owner: string }) {
  const { QuerySpacesByOwner } = useWardenWarden();
  const { data: spacesQuery } = QuerySpacesByOwner({ owner }, {}, 10);
  const count = spacesQuery?.pages.length || 0 > 0 && spacesQuery?.pages[0].spaces?.length || 0;

  const { toast } = useToast();
  const client = useClient();
  const sendMsgNewSpace = client.WardenWarden.tx.sendMsgNewSpace;

  return (
    <div className="flex items-center justify-center">
      {count && count > 0 ? (
        <div className="flex flex-col mt-6 gap-4">
          {spacesQuery?.pages[0].spaces?.map((space) => (
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
                monitorTx(sendMsgNewSpace({
                  value: { creator: owner, signIntentId: 0, adminIntentId: 0, additionalOwners: [] }
                }), toast);
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
