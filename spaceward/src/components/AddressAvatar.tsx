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
import { useConnectWallet } from "@web3-onboard/react";

export default function AddressAvatar({
	seed,
	disableTooltip,
	sm,
	logo,
	customTooltip,
	className,
	size = 512,
	...theme
}: {
	seed: string | Uint8Array;
	disableTooltip?: boolean;
	sm?: boolean;
	logo?: string;
	customTooltip?: string;
	className?: string;
	size?: number;
	backgroundColor?: string;
	shape1Color?: string;
	shape2Color?: string;
	shape3Color?: string;
}) {
	const seedStr = stringify(seed);

	const avatar = useMemo(() => {
		const params: NonNullable<Parameters<typeof createAvatar>[1]> = {
			size,
			seed: seedStr,
			// @ts-ignore
			shape1Color: ["8DE3E9", "9747FF", "F15A24"],
			shape2Color: ["F15A24", "005156", "0A0A0A"],
			shape3Color: ["D8FF33", "FFAEEE", "8DE3E9"],
		};

		for (const key in theme) {
			// @ts-ignore
			if (theme[key]) {
				// @ts-ignore
				params[key] = [theme[key]];
			}
		}

		return logo ?? createAvatar(shapes, params).toDataUriSync();
	}, [
		seedStr,
		logo,
		size,
		theme.backgroundColor,
		theme.shape1Color,
		theme.shape2Color,
		theme.shape3Color,
	]);

	const [{ wallet }] = useConnectWallet();
	const myAddress = wallet?.accounts[0].address;

	return (
		<span
			className={clsx(
				"inline-flex flex-row items-center",
				className ?? "",
			)}
		>
			{disableTooltip ? (
				<Avatar>
					<AvatarImage
						className={clsx(
							sm ? `w-6 h-6` : `w-10 h-10`,
							className ?? "",
						)}
						src={avatar}
					/>
				</Avatar>
			) : (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Avatar>
								<AvatarImage
									className={clsx(
										sm ? `w-6 h-6` : `w-10 h-10`,
										className ?? "",
									)}
									src={avatar}
								/>
							</Avatar>
						</TooltipTrigger>
						<TooltipContent>
							<p>
								{customTooltip ??
									(seed === myAddress
										? `you (${seedStr})`
										: seedStr)}
							</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}
		</span>
	);
}

export function stringify(seed: string | Uint8Array): string {
	if (typeof seed === "string") {
		return seed;
	}
	return Buffer.from(seed).toString("base64");
}
