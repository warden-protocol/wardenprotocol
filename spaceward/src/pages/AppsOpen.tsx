import { useIframe } from "@cosmos-kit/react-lite";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function AppsOpenPage() {
	const { iframeRef } = useIframe();
	const location = useLocation();

	const [iframe, setIframe] = useState<HTMLIFrameElement | null>(null);
	const [url, setUrl] = useState("");

	const loadIframe = () => {
		const queryParameters = new URLSearchParams(location.search);
		const url = queryParameters.get("url") || "";
		if (typeof url === "string") {
			setUrl(url as string);
			if (iframe) {
				iframe.src = url;
			}
		}
	};

	useEffect(() => {
		loadIframe();
	}, [location, iframe]);

	return (
		<div className="max-w-full px-4 pt-4">
			<div className="flex items-center justify-between pb-4 space-y-2 px-4">
				<div>
					<h2 className="text-5xl font-sans font-bold">dApps</h2>
					<p className="text-muted-foreground"></p>
				</div>
			</div>
			<div className="min-h-[calc(100vh-120px)] block relative overflow-hidden rounded-xl">
				<iframe
					className="absolute w-full h-full inset-0"
					sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-downloads allow-orientation-lock allow-modals"
					allow={`clipboard-read self ${url}; clipboard-write self ${url}`}
					// ref={(ref) => {
					// 	setIframe(ref);
					// 	iframeRef(ref);
					// }}
					src={url}
				></iframe>
			</div>
		</div>
	);
}
