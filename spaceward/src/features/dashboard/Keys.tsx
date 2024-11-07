import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { AddressType } from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/key";
import { Icons } from "@/components/ui/icons-assets";
import { NewKeyButton } from "@/features/keys";
import Key from "./Key";
import DashboardGraph from "./DashboardGraph";
import Intent from "./Intent";
import { useAssetQueries } from "../assets/hooks";
import { useModalState } from "../modals/state";
import { useSpaceById } from "@/hooks/query/warden";

interface CurrentSpaceProps {
	spaceId: bigint;
}

export default function Keys({ spaceId }: CurrentSpaceProps) {
	const { setData: setModal } = useModalState();
	const { queryBalances, queryKeys } = useAssetQueries(spaceId.toString());

	const spaceQuery = useSpaceById({
		request: {
			id: spaceId,
		}
	});

	const keys = queryKeys.data?.[0];
	const space = spaceQuery.data;
	const activeRuleId = space?.approveSignTemplateId;

	return (
		<div className="grid gap-6 grid-cols-1 lg:grid-cols-[2fr_1fr]">
			{!keys?.length ? (
				<div className="relative min-h-72 isolate flex flex-col items-center justify-center text-center bg-card  border-[1px] border-border-edge rounded-2xl overflow-hidden">
					<img
						className="absolute blur-[12px] left-0 top-0 z-[-1] w-full h-full object-cover invert dark:invert-0"
						src="/images/nokeys.png"
						alt=""
					/>
					<div className="font-bold text-2xl tracking-[0.12px]">
						No Keys found
					</div>
					<div className="text-muted-foreground">
						First add a key to start receiving assets
					</div>

					<NewKeyButton className="mt-4 text-background bg-foreground rounded-lg font-semibold hover:bg-fill-accent-primary duration-200" />
				</div>
			) : (
				<DashboardGraph />
			)}

			<div className="bg-card py-6 px-8 border-[1px] border-border-edge rounded-2xl">
				<div className="font-bold text-3xl text-center mb-6">
					Space #{spaceId.toString()}
				</div>

				<div className="flex gap-2 justify-center min-h-[56px]">
					{queryKeys.status === "loading" ? (
						<LoaderCircle className="animate-spin mb-1" />
					) : (
						<div className="flex flex-wrap gap-2 justify-center w-full mb-4 max-w-96">
							{keys?.map((item) => (
								<Key
									keyValue={item}
									key={item.key.id}
									onClick={() => {
										const results = queryBalances.find(
											(x) =>
												x.data?.key.key.id ===
												item.key.id,
										)?.data?.results;

										if (!results) {
											return;
										}

										let result = results[0];

										for (const res of results) {
											if (res.balance) {
												result = res;
												break;
											}
										}

										setModal({
											type: "send",
											params: {
												chainName: result.chainName,
												keyResponse: item,
												token: result.token,
												type: result.type.startsWith(
													"eip155:",
												)
													? AddressType.ADDRESS_TYPE_ETHEREUM
													: AddressType.ADDRESS_TYPE_OSMOSIS,
											},
										});
									}}
								/>
							))}
							<div
								onClick={() =>
									setModal({
										type: "create-key",
										params: {},
									})
								}
								className="cursor-pointer h-8 bg-fill-quaternary flex items-center justify-center min-w-12 rounded"
							>
								<Icons.plus
									className="w-4 h-4"
									stroke="currentColor"
								/>
							</div>
						</div>
					)}
				</div>

				<div className="mb-[22px] mt-1 h-[1px] bg-border-quaternary" />

				<Link
					to="/rules"
					className="py-[10px] flex justify-between items-center gap-3 cursor-pointer"
				>
					<div className="flex gap-3 items-center">
						<Icons.activeIntent stroke="currentColor" />
						Active Rule
					</div>

					{activeRuleId ? (
						<Intent id={activeRuleId} />
					) : (
						<div className="text-label-accent flex items-center">
							Add
							<Icons.chevronPink stroke="currentColor" />
						</div>
					)}
				</Link>
				<Link
					to="/owners"
					className="py-[10px]  flex justify-between items-center gap-3 cursor-pointer"
				>
					<div className="flex gap-3 items-center">
						<Icons.group stroke="currentColor" />
						Owners
					</div>

					{space?.owners.length ? (
						<div className="text-muted-foreground flex items-center">
							{space.owners.length}
							<Icons.chevronSecondary stroke="currentColor" />
						</div>
					) : (
						<div className="text-muted-foreground flex items-center">
							You
							<Icons.chevronSecondary stroke="currentColor" />
						</div>
					)}
				</Link>
			</div>
		</div>
	);
}
