import { Params } from "react-router-dom";
import { prettyKeyType } from "../utils/formatting";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import AddressAvatar from "./address-avatar";
import { Avatar, AvatarImage } from "./ui/avatar";
import useWardenWarden from "@/hooks/useWardenWarden";
import { Key as KeyModel } from "wardenprotocol-warden-client-ts/lib/warden.warden/rest";

export default function Keys({ spaceAddr }: { spaceAddr: string }) {
	const { QueryKeys } = useWardenWarden();
	const query = QueryKeys({ space_addr: spaceAddr }, {}, 10);

	return (
		<div className="">
			<Accordion
				type="single"
				collapsible
				className="space-y-3"
			>
				{query.data?.pages.flatMap((page) => (
					page.keys?.map((key) => (
						<Key
							key={key.key!.id!.toString()}
							keyData={key.key! as Required<KeyModel>}
						/>
					))
				))}
			</Accordion>
		</div>
	);
}

function Key({ keyData }: { keyData: Required<KeyModel> }) {
	return (
		<AccordionItem
			value={`item-${keyData.id.toString()}`}
			className="p-4 border rounded-lg hover:border-white"
		>
			<AccordionTrigger className="py-1">
				<div className="flex flex-row justify-between w-full mr-4">
					<div className="flex flex-row items-center gap-4">
						<AddressAvatar seed={keyData.public_key} />
						<span className="">
							{keyData.public_key.slice(0, 8) +
								"..." +
								keyData.public_key.slice(-8)}
						</span>
					</div>
					<div className="flex flex-row">
						<Avatar className="bg-white p-2 border">
							<AvatarImage
								src="/logos/ethereum.svg "
								alt="Ethereum"
							/>
						</Avatar>
						<Avatar className="bg-white p-0 -ml-2 border">
							<AvatarImage
								src="/logos/celestia.svg "
								alt="Celestia"
							/>
						</Avatar>
					</div>
				</div>
			</AccordionTrigger>
			<AccordionContent>
				<div className="space-y-4">
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1">
							<span className="text-sm font-bold">Type</span>
							<span>{prettyKeyType(keyData.type)}</span>
						</div>
						<div className="flex flex-col space-y-1">
							<span className="text-sm font-bold">
								Key material
							</span>
							<span className="font-mono break-all">
								{keyData.public_key}
							</span>
						</div>
					</div>
					<div>
						<Link to={`/keys/${keyData.id}`}>
							<Button
								variant="secondary"
								size="sm"
							>
								Open
							</Button>
						</Link>
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
}

export async function loader({ params }: { params: Params<string> }) {
	if (!params.spaceAddr) {
		throw new Error("No space address provided");
	}
	return {
		spaceAddr: params.spaceAddr,
	};
}
