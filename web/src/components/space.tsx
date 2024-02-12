// import { Link } from "react-router-dom";
import Address from "./address";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Space as SpacePB } from "@/proto/wardenprotocol/identity/space_pb";
// import { Button } from "./ui/button";
// import CardRow from "./card-row";
// import IntentPreviewCard from "./intent-preview-card";
// import ChooseSpaceButton from "@/components/choose-space-button";
import useSpaceAddress from "@/hooks/useSpaceAddress";
import AddressAvatar from "./address-avatar";

export default function Space({ space }: { space: SpacePB }) {

  const [spaceAddress, setSpaceAddress] = useSpaceAddress();

  return (
		<Card
			onClick={() => {
				setSpaceAddress(space.address);
			}}
			className={`cursor-pointer hover:border-white w-full ${
				spaceAddress === space.address ? "border-white" : ""
			}`}
		>
			<CardHeader>
				<CardTitle className="flex flex-row items-center pb-4 space-x-4">
					<AddressAvatar seed={space.address} />
					<span className="">
						{space.address.slice(0, 8) +
							"..." +
							space.address.slice(-8)}
					</span>
				</CardTitle>
				<CardDescription>
					<div>
						Created by <Address address={space.creator} />
					</div>
					<div className="flex flex-row">
						<span className="">Owners</span>
						{space.owners.map((owner) => (
							<Address address={owner} />
						))}
					</div>
				</CardDescription>
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
					{space.adminIntentId.toString() == "0"
						? "Default intent"
						: space.adminIntentId.toString()}
				</div>
				<div>
					Sign Intent:{" "}
					{space.signIntentId.toString() == "0"
						? "Default intent"
						: space.signIntentId.toString()}
				</div>
				<ul className="flex flex-col space-y-1"></ul>
				{space.childSpaces.length > 0 && (
					<span className="flex flex-col space-y-1 text-sm font-bold">
						{space.childSpaces.length} children spaces
					</span>
				)}
			</CardContent>
			{/* <CardFooter> */}
			{/* <ChooseSpaceButton spaceAddress={space.address} /> */}
			{/* <Link to={`/spaces/${space.address}`}>
					<Button variant="secondary">Open details</Button>
				</Link> */}
			{/* </CardFooter> */}
		</Card>
  );
}
