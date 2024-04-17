export function AppsOpenPage() {
	const queryParameters = new URLSearchParams(window.location.search);
	const url = queryParameters.get("url") || "";

	return (
		<div className="max-w-full px-4 pt-4">
			<div className="flex items-center justify-between pb-4 space-y-2 px-4">
				<div>
					<h2 className="text-5xl">dApps</h2>
					<p className="text-muted-foreground"></p>
				</div>
			</div>
			<div className="min-h-[calc(100vh-120px)] block relative overflow-hidden rounded-xl">
				<iframe
					className="absolute w-full h-full inset-0"
					id=""
					src={url}
					sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-downloads allow-orientation-lock allow-modals"
					allow={`clipboard-read self ${url}; clipboard-write self ${url}`}
				></iframe>
			</div>
		</div>
	);
}
