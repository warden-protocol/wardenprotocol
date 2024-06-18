import { Icons } from "@/components/ui/icons-assets";
import { useQueryHooks } from "@/hooks/useClient";

const ActiveIntent = ({ activeIntentId }: { activeIntentId: number }) => {
	const intent = useQueryHooks().warden.intent.useIntentById({
		request: { id: BigInt(activeIntentId) },
	});

	return (
		<div className="text-muted-foreground flex items-center">
			{intent.data?.intent?.name}
			<Icons.chevronSecondary />
		</div>
	);
};

export default ActiveIntent;
