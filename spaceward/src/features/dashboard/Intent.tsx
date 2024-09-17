import { Icons } from "@/components/ui/icons-assets";
import { useQueryHooks } from "@/hooks/useClient";

const ActiveIntent = ({ activeIntentId }: { activeIntentId: number }) => {
	const intent = useQueryHooks().warden.act.v1beta1.useTemplateById({
		request: { id: BigInt(activeIntentId) },
	});

	return (
		<div className="text-muted-foreground flex items-center">
			{intent.data?.template?.name}
			<Icons.chevronSecondary />
		</div>
	);
};

export default ActiveIntent;
