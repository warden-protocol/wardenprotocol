import { LoaderCircle } from "lucide-react";
import { useContext, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta2/key";
import { Icons } from "@/components/ui/icons-assets";
import { NewKeyButton } from "@/features/keys";
import { useQueryHooks } from "@/hooks/useClient";
import Key from "./Key";
import DashboardGraph from "./DashboardGraph";
import { useIntents } from "@/pages";
import Intent from "./Intent";

interface CurrentSpaceProps {
	spaceId: bigint;
}

export default function Keys({ spaceId }: CurrentSpaceProps) {
	const { useKeysBySpaceId, useSpaceById, isReady } = useQueryHooks();
	// fixme new key hack
	const newKeyButtonRef = useRef<HTMLButtonElement | null>(null);

	const keysQuery = useKeysBySpaceId({
		request: {
			spaceId,
			deriveAddresses: [
				AddressType.ADDRESS_TYPE_ETHEREUM,
				AddressType.ADDRESS_TYPE_OSMOSIS,
			],
		},
		options: {
			enabled: isReady,
		},
	});

	const spaceQuery = useSpaceById({
		request: {
			id: spaceId,
		},
		options: {
			enabled: isReady,
		},
	});

	const addresses = useMemo(
		() => keysQuery.data?.keys.flatMap(({ addresses }) => addresses),
		[keysQuery.data?.keys],
	);

	const { activeIntentId } = useIntents();
	const space = spaceQuery.data?.space;
	const isEmpty = !space || !keysQuery.data?.keys.length;

	return (
		<div className="grid gap-6 grid-cols-[2fr_1fr]">
			{isEmpty ? (
				<div className="relative isolate flex flex-col items-center justify-center text-center bg-card  border-[1px] border-border-secondary rounded-2xl">
					<img
						className="absolute left-0 top-0 z-[-1] w-full h-full object-cover"
						src="/images/nokeys.png"
						alt=""
					/>
					<div className="font-bold text-2xl">No Keys found</div>
					<div className="text-muted-foreground">
						First add a key to start receiving assets
					</div>

					<NewKeyButton />
				</div>
			) : (
				<DashboardGraph addresses={addresses} />
			)}

			<div className="bg-card py-6 px-8 border-[1px] border-border-secondary rounded-2xl">
				<div className="font-bold text-[32px] text-center mb-4">
					#{spaceId.toString()} Space
				</div>

				<div className="flex gap-2 justify-center min-h-[56px]">
					{keysQuery.status === "loading" ? (
						<LoaderCircle className="animate-spin mb-1" />
					) : (
						<div className="flex gap-2 justify-center">
							{keysQuery.data?.keys.map((item, key) => (
								<Key keyValue={item} key={key} />
							))}
						</div>
					)}

					<div className="hidden">
						<NewKeyButton ref={newKeyButtonRef} />
					</div>

					<div
						onClick={() => newKeyButtonRef.current?.click()}
						className="cursor-pointer max-h-8 bg-background flex items-center justify-center min-w-12 border-[1px] border-border-secondary rounded"
					>
						<Icons.plus className="w-4 h-4" stroke="currentColor" />
					</div>
				</div>

				<div className="mb-[22px] mt-1 h-[1px] bg-background" />

				<Link
					to="/intents"
					className="py-[10px] flex justify-between items-center gap-3 cursor-pointer"
				>
					<div className="flex gap-3 items-center">
						<Icons.activeIntent stroke="currentColor" />
						Active Intent
					</div>

					{activeIntentId ? (
						<Intent activeIntentId={activeIntentId} />
					) : (
						<div className="text-pixel-pink flex items-center">
							Add
							<Icons.chevronPink stroke="currentColor" />
						</div>
					)}
				</Link>
				<Link
					to="/owners"
					className="py-[10px]  flex justify-between items-center gap-3 cursor-pointer"
				>
					<div className="flex gap-3 items-center">
						<Icons.group stroke="currentColor" />
						Owners
					</div>

					{space?.owners.length ? (
						<div className="text-muted-foreground flex items-center">
							{space.owners.length}
							<Icons.chevronSecondary stroke="currentColor" />
						</div>
					) : (
						<div className="text-muted-foreground flex items-center">
							You
							<Icons.chevronSecondary stroke="currentColor" />
						</div>
					)}
				</Link>
			</div>
		</div>
	);
}
