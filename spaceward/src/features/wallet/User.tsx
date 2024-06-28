import { Box, Stack, Text, useColorModeValue } from "@interchain-ui/react";

export type UserProps = {
	name: string;
};

export function User({ name }: UserProps) {
	return (
		<Stack direction="vertical">
			<Box textAlign="center" py="$4" mb="$6">
				<Text
					color={useColorModeValue("$gray700", "$white")}
					fontSize="$xl"
					fontWeight="$medium"
				>
					{name}
				</Text>
			</Box>
		</Stack>
	);
}
