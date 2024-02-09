import { useQuery } from "@tanstack/react-query";
import { Params } from "react-router-dom";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Key as KeyProto } from "../proto/wardenprotocol/treasury/key_pb";
import { keys } from "../client/treasury";
import { prettyBytes, prettyKeyType } from "../utils/formatting";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import KeychainAddress from "./keychain-address";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

import AddressAvatar from "./address-avatar";
import { Avatar, AvatarImage } from "./ui/avatar";

export default function Keys({ spaceAddr }: { spaceAddr: string }) {
	const wsQuery = useQuery({
		queryKey: ["keys", spaceAddr],
		queryFn: () => keys({ spaceAddr }),
	});

	return (
		<div className="">
			<Accordion
				type="single"
				collapsible
				className="space-y-3"
			>
				{wsQuery.data?.keys.map((key) => (
					<Key
						key={key.key?.id.toString()}
						keyData={key.key!}
					/>
				))}
			</Accordion>
		</div>
	);
}

function Key({ keyData }: { keyData: KeyProto }) {
  return (
		// <Card>
		//   <CardHeader>
		//     <CardTitle>Key #{keyData.id.toString()}{" "}</CardTitle>
		//     <CardDescription>Managed by <KeychainAddress address={keyData.keychainAddr} />.</CardDescription>
		//   </CardHeader>
		//   <CardContent>
		//     <div className="grid w-full items-center gap-4">
		//       <div className="flex flex-col space-y-1">
		//         <span className="text-sm font-bold">Type</span>
		//         <span>{prettyKeyType(keyData.type)}</span>
		//       </div>
		//       <div className="flex flex-col space-y-1">
		//         <span className="text-sm font-bold">Key material</span>
		//         <span className="font-mono break-all">{prettyBytes(keyData.publicKey)}</span>
		//       </div>
		//     </div>
		//   </CardContent>
		//   <CardFooter>
		//     <Link to={`/keys/${keyData.id}`}>
		//       <Button variant="secondary" size="sm">
		//         Open
		//       </Button>
		//     </Link>
		//   </CardFooter>
		// </Card>
		<AccordionItem
			value={`item-${keyData.id.toString()}`}
			className="p-4 border rounded-lg hover:border-white"
		>
			<AccordionTrigger className="py-1">
				<div className="flex flex-row justify-between w-full mr-4">
					<div className="flex flex-row items-center gap-4">
						<AddressAvatar seed={prettyBytes(keyData.publicKey)} />
						<span className="">
							{prettyBytes(keyData.publicKey).slice(0, 8) +
								"..." +
								prettyBytes(keyData.publicKey).slice(-8)}
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
								{prettyBytes(keyData.publicKey)}
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
