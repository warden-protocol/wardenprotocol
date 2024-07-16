import { multiaddr } from "@multiformats/multiaddr";
import jsqr from "jsqr";
import { useEffect, useRef, useState } from "react";
import useLibp2p from "@/hooks/useLibp2p";
import { Assets } from "./assets";
import { encodeRemoteMessage } from "./util";
import clsx from "clsx";

interface MobileReaderProps {
	base64MultiAddress: string;
	topic: string;
	hideQRScaner: () => void;
}

export default function MobileReader(props: MobileReaderProps) {
	const ma = Buffer.from(props.base64MultiAddress, "base64").toString(
		"utf-8",
	);

	const { libp2p } = useLibp2p();
	const [ready, setReady] = useState(false);
	const [error, setError] = useState<Error>();
	const [peers, setPeers] = useState<string[]>([]);
	const [success, setSuccess] = useState(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		let intervalId: number | undefined;

		async function initConnection() {
			if (!libp2p) {
				return;
			}

			const connection = await libp2p.dial(multiaddr(ma));
			await libp2p.services.pubsub.subscribe(props.topic);

			intervalId = setInterval(() => {
				if (!libp2p) {
					return;
				}

				const peers = libp2p.services.pubsub.getSubscribers(
					props.topic,
				);

				setPeers((p) => {
					const next = peers.map((p) => p.toString());

					// strict equal
					if (JSON.stringify(next) !== JSON.stringify(p)) {
						return next;
					}

					return p;
				});
			}, 1000) as any;

			return connection;
		}

		initConnection().catch(console.error);

		return () => {
			clearInterval(intervalId);
			libp2p?.services.pubsub.unsubscribe(props.topic);
			setPeers([]);
		};
	}, [libp2p, ma, props.topic]);

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

				libp2p?.services.pubsub.publish(
					props.topic,
					encodeRemoteMessage({ type: "ready", payload: true }),
				);

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
							setSuccess(Boolean(code));

							if (code) {
								libp2p?.services.pubsub.publish(
									props.topic,
									encodeRemoteMessage({
										type: "data",
										payload: Uint8Array.from(
											Buffer.from(code),
										),
									}),
								);
							}
						}),
					500,
				) as any;
			})
			.catch((e) => {
				setReady(false);
				setError(e);

				libp2p?.services.pubsub.publish(
					props.topic,
					encodeRemoteMessage({ type: "ready", payload: false }),
				);
			});

		return () => {
			reject?.(new Error("updated"));
			window.removeEventListener("resize", setVideoSize);
			clearInterval(checkInterval);
		};
	}, [peers]);

	return (
		<div
			className="flex flex-col flex-auto relative w-full h-full justify-benween "
			ref={containerRef}
		>
			<div className="mb-6">
				<canvas ref={canvasRef} className="hidden" />

				{peers.length ? (
					<video
						autoPlay
						muted
						playsInline
						ref={videoRef}
						className="absolute z-0 w-full h-full"
					/>
				) : (
					<p>Connecting to peer...</p>
				)}

				<div className="relative z-10 w-full h-full flex flex-col overflow-hidden text-wrap">
					{error ? (
						<p>{error.message}</p>
					) : !peers.length ? (
						<>
							<p>Destination multiaddr:</p>
							<p className="w-full text-wrap break-all">{ma}</p>
						</>
					) : ready ? (
						<div className="flex flex-auto justify-center items-center">
							<Assets.qrTarget
								className={clsx({
									"stroke-green-600": success,
								})}
							/>
						</div>
					) : (
						<p>Please allow camera</p>
					)}
				</div>
			</div>

			<div className="mt-auto shrink-0 flex flex-col gap-3 mb-4">
				<button className="w-full flex items-center justify-center transition-colors focus-visible:outline-none hover:bg-accent hover:text-background rounded-lg h-[56px] bg-foreground text-background font-semibold shrink-0 ">
					Open Access
				</button>

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
