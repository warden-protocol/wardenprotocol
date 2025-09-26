import jsqr from "jsqr";
import { useEffect, useRef, useState } from "react";
import { Assets } from "./assets";
import type { CommonActions } from "@/utils/common";
import type { RemoteState } from "./types";
import { Icons } from "@/components/ui/icons-assets";
import { wcUriRegex } from "../modals/WalletConnect";

interface MobileReaderProps {
	hideQRScaner: () => void;
	dispatch: (action: CommonActions<RemoteState>) => void;
}

class BlankError extends Error {
	constructor() {
		super("Updated");
	}
}

export default function MobileReader(props: MobileReaderProps) {
	const [ready, setReady] = useState(false);
	const [error, setError] = useState<Error>();
	const [success, setSuccess] = useState(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		let checkInterval: number | undefined;
		let reject: undefined | ((e: Error) => void);

		function setVideoSize() {
			if (
				!videoRef.current ||
				!containerRef.current ||
				!canvasRef.current
			) {
				return;
			}

			const { width, height } =
				containerRef.current.getBoundingClientRect();

			canvasRef.current.width = videoRef.current.width =
				Math.floor(width);
			canvasRef.current.height = videoRef.current.height =
				Math.floor(height);
		}

		async function initCamera() {
			if (!videoRef.current) {
				return;
			}

			setError(undefined);
			setVideoSize();
			window.addEventListener("resize", setVideoSize);

			let resolve: undefined | (() => void);

			const promise = new Promise<void>((_resolve, _reject) => {
				resolve = _resolve;
				reject = _reject;
			});

			console.log("Requesting camera");

			try {
				// todo check if camera permission is disabled
				// const status = await navigator.permissions.query({ name: "camera" })

				const stream = await navigator.mediaDevices?.getUserMedia({
					video: { facingMode: "environment" },
				});

				videoRef.current.srcObject = stream;

				videoRef.current.onloadedmetadata = () => {
					console.log("Data source loaded");
					videoRef.current?.play().then(resolve);
				};

				return promise;
			} catch (e) {
				reject?.(e as Error);
				return promise;
			}
		}

		initCamera()
			.then(() => {
				setReady(true);
				props.dispatch({ type: "ready", payload: true });

				checkInterval = setInterval(
					() =>
						window.requestAnimationFrame(() => {
							const ctx = canvasRef.current?.getContext("2d");

							if (!videoRef.current || !ctx) {
								return;
							}

							const { width, height } = videoRef.current;

							ctx.drawImage(
								videoRef.current,
								0,
								0,
								width,
								height,
							);

							const data = ctx.getImageData(0, 0, width, height);
							const code = jsqr(data.data, width, height)?.data;

							const success = Boolean(
								code && wcUriRegex.test(code),
							);

							if (success) {
								setSuccess(true);

								props.dispatch({
									type: "data",
									payload: Uint8Array.from(
										Buffer.from(code!),
									),
								});
							}
						}),
					500,
				) as any;
			})
			.catch((e) => {
				if (!(e instanceof BlankError)) {
					setError(e);
				}

				setReady(false);
				props.dispatch({ type: "ready", payload: false });
			});

		return () => {
			reject?.(new BlankError());
			window.removeEventListener("resize", setVideoSize);
			clearInterval(checkInterval);
		};
	}, []);

	return (
		<div
			className="flex flex-col flex-auto relative w-full h-full justify-benween max-w-[420px] "
			ref={containerRef}
		>
			<div className="mb-6 h-full">
				<canvas ref={canvasRef} className="hidden" />

				<video
					autoPlay
					muted
					playsInline
					ref={videoRef}
					className="absolute z-0 w-full h-full object-cover"
				/>

				<div className="relative z-10 w-full h-full flex flex-col overflow-hidden text-wrap mx-auto mt-6">
					{error ? (
						<div className="relative text-center text-[32px] font-bold">
							{error.message}
						</div>
					) : ready ? (
						<div className="flex flex-auto justify-center items-center">
							<Assets.qrTarget className="m-auto w-[282px] h-[282px] object-contain object-center" />
						</div>
					) : (
						<div className="h-full flex flex-col">
							<div className="relative text-center text-[32px] font-bold">
								<button
									onClick={props.hideQRScaner}
									className="absolute top-1/2 -translate-y-1/2 left-2"
								>
									<Icons.chevronRight className="rotate-180" />
								</button>
								Open the access
							</div>

							<Assets.qrTarget
								locked
								className="m-auto w-[282px] h-[282px] object-contain object-center"
							/>
						</div>
					)}
				</div>
			</div>

			<div className="mt-auto shrink-0 flex flex-col gap-3 mb-4 z-10">
				<button
					onClick={props.hideQRScaner}
					className="w-full flex items-center justify-center transition-colors focus-visible:outline-none hover:bg-accent hover:text-background rounded-lg h-[56px] bg-transparent text-muted-foreground font-semibold shrink-0 "
				>
					Cancel
				</button>
			</div>
		</div>
	);
}
