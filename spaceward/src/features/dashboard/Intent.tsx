import { TemplateName } from "@/components/TxMsgDetails";
import { Icons } from "@/components/ui/icons-assets";

const ActiveIntent = ({ id }: { id: bigint }) => {
	return (
		<div className="text-muted-foreground flex items-center">
			<TemplateName id={id} />
			<Icons.chevronSecondary />
		</div>
	);
};

export default ActiveIntent;
