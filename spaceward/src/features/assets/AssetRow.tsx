interface AssetProp {
	name: string;
	fullName: string;
	balance?: number;
	icon: string;
	network: string;
}

const AssetRow = ({ asset }: { asset: AssetProp }) => {
	return (
		<div className="flex gap-3 text-left cursor-pointer items-center p-3">
			<div className="relative">
				<img src={asset.icon} className="w-10 h-10" alt="" />
				<img
					src={asset.network}
					className="absolute bottom-[-6px] right-[-6px] w-[18px] h-[18px]"
					alt=""
				/>
			</div>

			<div>
				<div>{asset.name}</div>
				<div className="text-xs text-muted-foreground">
					{asset.fullName}
				</div>
			</div>

			{asset.balance && <div className="ml-auto">{asset.balance}</div>}
		</div>
	);
};

export default AssetRow;
