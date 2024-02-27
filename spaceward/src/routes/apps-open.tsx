function AppsOpen() {
	const queryParameters = new URLSearchParams(window.location.search);
	const url = queryParameters.get("url");

	return (
		<div className="h-[calc(100vh-64px)] p-0 -m-8">
			{/* <div className="h-16 border-b"></div> */}
			<div className="h-full block pb-0">
				<iframe
					className="w-full h-full"
					id=""
					src={url}
					//src="https://testnet.app.0xsquid.com/iframe?config=%7B%22integratorId%22%3A%22squid-swap-widget%22%2C%22companyName%22%3A%22Custom%22%2C%22style%22%3A%7B%22neutralContent%22%3A%22%236A61FF%22%2C%22baseContent%22%3A%22%23FDFDFD%22%2C%22base100%22%3A%22%23000000%22%2C%22base200%22%3A%22%23181C63%22%2C%22base300%22%3A%22%2313164E%22%2C%22error%22%3A%22%23ED6A5E%22%2C%22warning%22%3A%22%23FFB155%22%2C%22success%22%3A%22%232EAEB0%22%2C%22primary%22%3A%22%236C5BE0%22%2C%22secondary%22%3A%22%234030FA%22%2C%22secondaryContent%22%3A%22%23F6F7FB%22%2C%22neutral%22%3A%22%230C1536%22%2C%22roundedBtn%22%3A%228px%22%2C%22roundedCornerBtn%22%3A%22999px%22%2C%22roundedBox%22%3A%220px%22%2C%22roundedDropDown%22%3A%228px%22%7D%2C%22slippage%22%3A1.5%2C%22infiniteApproval%22%3Afalse%2C%22enableExpress%22%3Atrue%2C%22apiUrl%22%3A%22https%3A%2F%2Ftestnet.api.squidrouter.com%22%2C%22comingSoonChainIds%22%3A%5B%5D%2C%22titles%22%3A%7B%22swap%22%3A%22Swap%22%2C%22settings%22%3A%22Settings%22%2C%22wallets%22%3A%22Wallets%22%2C%22tokens%22%3A%22Select%20Token%22%2C%22chains%22%3A%22Select%20Chain%22%2C%22history%22%3A%22History%22%2C%22transaction%22%3A%22Transaction%22%2C%22allTokens%22%3A%22Select%20Token%22%2C%22destination%22%3A%22Destination%20address%22%7D%2C%22priceImpactWarnings%22%3A%7B%22warning%22%3A3%2C%22critical%22%3A5%7D%2C%22environment%22%3A%22testnet%22%2C%22showOnRampLink%22%3Atrue%7D"
					// src="https://app.squidrouter.com"
					title="Squid App"
					// width="420"
					// height="684"
					sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-downloads allow-orientation-lock"
					allow={`clipboard-read self ${url}; clipboard-write self ${url}`}
				></iframe>
			</div>
		</div>
	);
}

export default AppsOpen;
