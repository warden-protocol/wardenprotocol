import { Keys, KeyRequestDialog, NewKeyButton } from "@/features/keys";
import useRequestKey from "@/hooks/useRequestKey";
import { useSpaceId } from "@/hooks/useSpaceId";

export function KeysPage() {
	const { state, error, keyRequest, reset } = useRequestKey();

	const { spaceId } = useSpaceId();

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center pb-4 space-x-4">
				<div>
					<h2 className="text-5xl">Keys</h2>
					{/* <p className="text-muted-foreground hidden xl:block">
						Keys are used to derive blockchain addresses and sign
						transactions.
					</p> */}
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
				) : null}
			</div>
		</div>
	);
}
