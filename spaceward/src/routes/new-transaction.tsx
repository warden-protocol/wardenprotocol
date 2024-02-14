function NewTransaction() {
	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2 border-b">
				<div>
					<h2 className="text-4xl">New Transaction</h2>
					<p className="text-muted-foreground"></p>
				</div>
			</div>
			<div>
				<h3>
					TODO: Here a user can create a new transaction but they first must select key and chain they would like to initiate the transaction on.
				</h3>
			</div>
		</div>
	);
}

export default NewTransaction;
