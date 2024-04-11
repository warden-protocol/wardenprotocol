import Address from "../../components/address";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { useSpaceId } from "@/hooks/useSpaceId";
import AddressAvatar from "../../components/address-avatar";
import { QuerySpacesResponse } from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden.v1beta2/rest";

type SpaceModel = NonNullable<QuerySpacesResponse["spaces"]>[number];

export default function Space({ space }: { space: SpaceModel }) {
	const { spaceId, setSpaceId } = useSpaceId();

	return (
		<Card
			onClick={() => {
				setSpaceId(space.id || null);
			}}
			className={`cursor-pointer hover:border-white w-full ${
				spaceId === space.id ? "border-white" : ""
			}`}
		>
			<CardHeader>
				<div className="flex flex-row items-center pb-4 space-x-4 text-2xl font-semibold leading-none tracking-tight">
					<AddressAvatar seed={space.id || ""} />
					<span className="">{space.id}</span>
				</div>
				<div>
					<div>
						Created by <Address address={space.creator || ""} />
					</div>
					<div className="flex flex-row">
						<span className="">Owners</span>
						{space.owners?.map((owner) => (
							<Address key={owner} address={owner} />
						))}
					</div>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				{/* <CardRow label="Admin intent">
					<IntentPreviewCard id={space.adminIntentId.toString()} />
				</CardRow>
				<CardRow label="Sign intent">
					<IntentPreviewCard id={space.signIntentId.toString()} />
				</CardRow> */}
				<div>
					Admin Intent:{" "}
					{space.admin_intent_id?.toString() == "0"
						? "Default intent"
						: space.admin_intent_id?.toString()}
				</div>
				<div>
					Sign Intent:{" "}
					{space.sign_intent_id?.toString() == "0"
						? "Default intent"
						: space.sign_intent_id?.toString()}
				</div>
			</CardContent>
			{/* <CardFooter> */}
			{/* <ChooseSpaceButton spaceId={space.id} /> */}
			{/* <Link to={`/spaces/${space.id}`}>
					<Button variant="secondary">Open details</Button>
				</Link> */}
			{/* </CardFooter> */}
		</Card>
	);
}
