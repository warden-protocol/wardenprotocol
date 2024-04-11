import Keys from "../features/keys/Keys";
import { useSpaceId } from "@/hooks/useSpaceId";
import NewKeyButton from "@/features/keys/NewKeyButton";
import useRequestKey from "@/hooks/useRequestKey";
import KeyRequestDialog from "@/features/keys/KeyRequestDialog";
import NoActiveSpace from "@/features/spaces/NoActiveSpace";

function KeysPage() {
	const { state, error, keyRequest, reset } = useRequestKey();

	const { spaceId } = useSpaceId();

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2 border-b">
				<div>
					<h2 className="text-4xl">Keys</h2>
					<p className="text-muted-foreground hidden xl:block">
						Keys are used to derive blockchain addresses and sign
						transactions.
					</p>
				</div>
				{spaceId ? (
					<div>
						<NewKeyButton />
						<KeyRequestDialog
							state={state}
							error={error}
							keyRequest={keyRequest}
							reset={reset}
						/>
					</div>
				) : null}
			</div>
			<div className="h-full flex-1 flex-col space-y-8 flex">
				{spaceId ? (
					<>
						<Keys spaceId={spaceId} />
					</>
				) : (
					<NoActiveSpace />
				)}
			</div>
		</div>
	);
}

export default KeysPage;
