import Chart from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import { TOTAL_ASSET_CHART_MOCK } from "./mock";

export default function TotalAssetsChart() {
	const ref = useRef<HTMLCanvasElement>(null);
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		const canvas = ref.current;

		if (!canvas || !hasMounted) {
			return;
		}

		const ctx = canvas.getContext("2d");

		if (!ctx) {
			return;
		}

		const gradient = ctx.createLinearGradient(0, 0, 0, 400);
		gradient.addColorStop(0, "rgba(255,174,238,0.4)");
		gradient.addColorStop(1, "rgba(250,174,238,0.05)");

		const chart = new Chart(canvas, {
			type: "line",
			data: {
				labels: TOTAL_ASSET_CHART_MOCK.map(() => ""),
				datasets: [
					{
						fill: true,
						backgroundColor: gradient,
						label: "",
						data: TOTAL_ASSET_CHART_MOCK.map((item) => item.y),
						borderColor: "rgb(255, 174, 238)",
						tension: 0.1,
					},
				],
			},
			options: {
				elements: {
					point: {
						radius: 0,
					},
				},
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false,
					},
				},
				scales: {
					x: {
						display: false,
					},
					y: {
						display: false,
					},
				},
			},
		});

		return () => {
			// hot reload
			chart.destroy();
			setHasMounted(false);
		};
	}, [!hasMounted]);

	useEffect(() => {
		// hot reload
		setHasMounted(true);
	}, []);

	return <canvas ref={ref} className="m-[-5px] mt-0" />;
}
