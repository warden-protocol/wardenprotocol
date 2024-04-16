import SendEth from "@/components/SendEth";

export function NewTransactionPage() {
	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<div className="flex items-center justify-between pb-4 space-y-2 border-b">
				<div>
					<h2 className="text-4xl">New Transaction</h2>
					<p className="text-muted-foreground"></p>
				</div>
			</div>
			<div>
				<SendEth />
			</div>
		</div>
	);
}
