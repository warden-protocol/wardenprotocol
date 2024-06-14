const SignTranactionModal = () => {
	return (
		<div
			onClick={(e) => e.stopPropagation()}
			className="max-w-[520px] w-[520px] text-center tracking-wide pb-5"
		>
			<div className="font-bold text-5xl mb-6 leading-[56px]">
				Sign transaction
			</div>
			<div>Open the browser extension if it didn't.</div>
		</div>
	);
};

export default SignTranactionModal;
