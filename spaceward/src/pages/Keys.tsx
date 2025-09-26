import { Keys } from "@/features/keys";
import Assets from "@/features/keys/assets";
import { useKeySettingsState } from "@/features/keys/state";
import { useModalState } from "@/features/modals/state";
import { useSpaceId } from "@/hooks/useSpaceId";
import { PlusIcon } from "lucide-react";

export function KeysPage() {
	const { data, setData } = useKeySettingsState();
	const { spaceId } = useSpaceId();
	const { setData: setModal } = useModalState();

	function toggleView() {
		setData({ view: data?.view === "card" ? "list" : "card" });
	}

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center pb-4 space-x-4">
				<div>
					<h2 className="text-5xl font-bold">Keys</h2>
					{/* <p className="text-muted-foreground hidden xl:block">
						Keys are used to derive blockchain addresses and sign
						transactions.
					</p> */}
				</div>
				{spaceId ? (
					<div className="!ml-auto flex items-center">
						<div
							className="flex items-center text-muted-foreground text-sm rounded-sm bg-fill-quaternary p-2 mr-4 cursor-pointer"
							onClick={setModal.bind(null, {
								type: "create-key",
								params: {},
							})}
						>
							<PlusIcon className="h-4 w-4 mr-2" />
							New key
						</div>

						{/* <Assets.toggleView
							className="cursor-pointer bg-fill-quaternary rounded-2xl invert dark:invert-0"
							selected={data?.view}
							onClick={toggleView}
						/> */}
					</div>
				) : null}
			</div>
			<div className="h-full flex-1 flex-col space-y-8 flex">
				{spaceId ? (
					<Keys spaceId={spaceId} view={data?.view ?? "card"} />
				) : null}
			</div>
		</div>
	);
}
