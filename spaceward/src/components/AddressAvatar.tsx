import { useAddressContext } from "@/hooks/useAddressContext";
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
import clsx from "clsx";

export default function AddressAvatar({
	seed,
	disableTooltip,
	sm,
}: {
	seed: string | Uint8Array;
	disableTooltip?: boolean;
	sm?: boolean;
}) {
	const seedStr = stringify(seed);

	const avatar = useMemo(() => {
		return createAvatar(shapes, {
			size: 512,
			seed: seedStr,
			shape1Color: ["F5F5F5", "9747FF", "F15A24"],
			shape2Color: ["0000F5", "005156", "0A0A0A"],
			shape3Color: ["D8FF33", "FFAEEE", "8DE3E9"],
		}).toDataUriSync();
	}, [seedStr]);

	const { address: myAddress } = useAddressContext();
	return (
		<span className="inline-flex flex-row items-center">
			{disableTooltip ? (
				<Avatar>
					<AvatarImage
						className={clsx(sm ? `w-6 h-6` : `w-10 h-10`)}
						src={avatar}
					/>
				</Avatar>
			) : (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Avatar>
								<AvatarImage
									className={clsx(
										sm ? `w-6 h-6` : `w-10 h-10`,
									)}
									src={avatar}
								/>
							</Avatar>
						</TooltipTrigger>
						<TooltipContent>
							<p>
								{seed === myAddress
									? `you (${seedStr})`
									: seedStr}
							</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}
		</span>
	);
}

function stringify(seed: string | Uint8Array): string {
	if (typeof seed === "string") {
		return seed;
	}
	return Buffer.from(seed).toString("base64");
}
