import { useAddressContext } from "@/def-hooks/addressContext";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import { createAvatar } from "@dicebear/core";
import { shapes } from "@dicebear/collection";
import { useMemo } from "react";

export default function AddressAvatar({ seed }: { seed: string }) {
	const avatar = useMemo(() => {
		return createAvatar(shapes, {
			size: 512,
			seed: seed,
			shape1Color: ["F5F5F5", "9747FF", "F15A24"],
			shape2Color: ["0000F5", "005156", "0A0A0A"],
			shape3Color: ["D8FF33", "FFAEEE", "8DE3E9"],
		}).toDataUriSync();
	}, []);

	const {address: myAddress} = useAddressContext();
	return (
		<span className="inline-flex flex-row items-center">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<Avatar className="">
							<AvatarImage src={avatar} />
						</Avatar>
					</TooltipTrigger>
					<TooltipContent>
						<p>{seed === myAddress ? `you (${seed})` : seed}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</span>
	);
}
