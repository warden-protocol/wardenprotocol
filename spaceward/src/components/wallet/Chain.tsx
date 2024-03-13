import { Box, Stack, Text, useColorModeValue } from "@interchain-ui/react";

export type ChainProps = {
	name: string;
	logo?: string;
};

export const DefaultChainLogo =
	"https://dummyimage.com/150/9e9e9e/ffffff&text=☒";

export function Chain({ name, logo = DefaultChainLogo }: ChainProps) {
	return (
		<Stack
			space="$4"
			attributes={{
				ml: "-$4",
				width: "full",
				overflow: "hidden",
				alignItems: "center",
				wordBreak: "break-word",
				color: useColorModeValue("blackAlpha.800", "whiteAlpha.800"),
			}}
		>
			<Box
				width="full"
				height="full"
				minWidth="$10"
				minHeight="$10"
				maxWidth="$14"
				maxHeight="$14"
				border="1px solid"
				borderColor={useColorModeValue(
					"blackAlpha.200",
					"whiteAlpha.200"
				)}
				borderRadius="full"
				overflow="hidden"
			>
				<img
					alt={name}
					src={logo}
					width="38"
					height="38"
					style={{ borderRadius: "100%" }}
				/>
			</Box>
			<Text fontSize="$xl" fontWeight="$semibold">
				{name}
			</Text>
		</Stack>
	);
}
