import { useSpaceId } from "@/hooks/useSpaceId";
import { Button } from "./ui/button";

function ChooseSpaceButton({
	spaceId: newSpaceId,
}: {
	spaceId: string;
}) {
	const [spaceId, setSpaceId] = useSpaceId();

	return (
		<Button
			disabled={newSpaceId === spaceId}
			onClick={() => {
				setSpaceId(newSpaceId);
			}}
		>
			{spaceId === newSpaceId ? "In use" : "Use this space"}
		</Button>
	);
}

export default ChooseSpaceButton;
