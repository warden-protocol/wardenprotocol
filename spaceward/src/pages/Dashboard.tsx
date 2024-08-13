import Keys from "@/features/dashboard/Keys";
import { useSpaceId } from "@/hooks/useSpaceId";
import { Actions } from "@/features/dashboard/Actions";
import DappsDashboard from "@/features/dashboard/Dapps";
import GovernanceDashboard from "@/features/dashboard/Governance";

export function DashboardPage() {
	const { spaceId } = useSpaceId();

	return (
		<div className="px-8 py-4">
			<h2 className="text-5xl mb-10 font-bold leading-[0.24px]">Dashboard</h2>

			{spaceId ? <Keys spaceId={BigInt(spaceId)} /> : null}

			<div className="my-6 h-[1px] bg-background" />

			<div className="grid gap-6 grid-cols-[2fr_1fr] mb-5">
				<div>
					<GovernanceDashboard />
					<Actions />
				</div>

				<DappsDashboard />
			</div>
		</div>
	);
}
