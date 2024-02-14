function Assets() {

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2 border-b">
				<div>
					<h2 className="text-4xl">Assets</h2>
					<p className="text-muted-foreground"></p>
				</div>
			</div>
			<div>
				<h3>
					TODO: Here a user can view assets in the current space, due to the number of http requests it would take to get the total balance for all the keys in the space we would need to do this on a key by key basis.
				</h3>
			</div>
		</div>
	);
}

export default Assets;
