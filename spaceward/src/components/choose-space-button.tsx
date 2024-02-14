import useSpaceAddress from "@/hooks/useSpaceAddress";
import { Button } from "./ui/button";

function ChooseSpaceButton({
	spaceAddress: newSpaceAddress,
}: {
	spaceAddress: string;
}) {
	const [spaceAddress, setSpaceAddress] = useSpaceAddress();

	return (
		<Button
			disabled={newSpaceAddress === spaceAddress}
			onClick={() => {
				setSpaceAddress(newSpaceAddress);
			}}
		>
			{spaceAddress === newSpaceAddress
				? "In use"
				: "Use this space"}
		</Button>
	);
}

export default ChooseSpaceButton;
