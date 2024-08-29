import Chart from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import {
	TOTAL_ASSET_CHART_MOCK,
	TOTAL_ASSET_CHART_MOCK_WITH_BALANCE,
} from "./mock";

export default function TotalAssetsChart(balance: any) {
	const ref = useRef<HTMLCanvasElement>(null);
	const [hasMounted, setHasMounted] = useState(false);
	const [mockData, setMockData] = useState(TOTAL_ASSET_CHART_MOCK);

	useEffect(() => {
		// setHasMounted(false);
		setMockData(
			balance && balance.balance > 0
				? TOTAL_ASSET_CHART_MOCK_WITH_BALANCE
				: TOTAL_ASSET_CHART_MOCK,
		);
	}, [balance]);

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
		gradient.addColorStop(0, "rgba(202, 255, 148, .4)");
		gradient.addColorStop(1, "rgba(202, 255, 148, 0.05)");

		const chart = new Chart(canvas, {
			type: "line",
			data: {
				labels: mockData.map(() => ""),
				datasets: [
					{
						fill: true,
						backgroundColor: gradient,
						label: "",
						data: mockData.map((item) => item.y),
						borderColor: "rgb(202, 255, 148)",
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
	}, [!hasMounted, mockData]);

	useEffect(() => {
		// hot reload
		setHasMounted(true);
	}, [mockData]);

	return <canvas ref={ref} className="m-[-5px] mt-0" />;
}
