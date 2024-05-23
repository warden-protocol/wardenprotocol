import { Icons } from "@/components/ui/icons-assets";
import { useQueryHooks } from "@/hooks/useClient";

export default function Validators() {
	const {
		cosmos: {
			staking: { v1beta1: staking },
		},
	} = useQueryHooks();

	const query = staking.useValidators({ request: {} });
	console.log(query, query.data, query.error);
	return (
		<div>
			<div className="grid grid-cols-[1fr_150px_150px_150px_200px] gap-3 h-[72px]  border-t-[1px] border-secondary-bg">
				<div className="flex items-center gap-3">
					<img
						src="/images/eth.png"
						alt=""
						className="w-10 h-10 object-contain"
					/>

					<div>Chorus One</div>
				</div>

				<div className="flex flex-col justify-center">5.1%</div>

				<div className="flex flex-col justify-center">100%</div>

				<div className="flex flex-col justify-center">
					<div className="flex items-center gap-1">
						<div className="w-[6px] h-[6px] rounded-full bg-positive" />
						Active
					</div>
				</div>

				<div className="flex items-center justify-end gap-1 cursor-pointer text-secondary-text">
					<div>10,345,456.01</div>
					<Icons.chevronRight />
				</div>
			</div>

			<div className="grid grid-cols-[1fr_150px_150px_150px_200px] gap-3 h-[72px]  border-t-[1px] border-secondary-bg">
				<div className="flex items-center gap-3">
					<img
						src="/images/uni.png"
						alt=""
						className="w-10 h-10 object-contain"
					/>

					<div>Nodes.Guru</div>
				</div>

				<div className="flex flex-col justify-center">5%</div>

				<div className="flex flex-col justify-center">5%</div>

				<div className="flex flex-col justify-center">
					<div className="flex items-center gap-1">
						<div className="w-[6px] h-[6px] rounded-full bg-negative" />
						Inactive
					</div>
				</div>

				<div className="flex items-center justify-end">
					<button
						onClick={() => {
							// setStakeModal(true);
						}}
						className="cursor-pointer bg-secondary-bg text-white py-[6px] px-4 rounded hover:bg-hover-bg ease-in duration-100"
					>
						Stake
					</button>
				</div>
			</div>
		</div>
	);
}
