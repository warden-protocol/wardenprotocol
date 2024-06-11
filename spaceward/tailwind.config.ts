import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		fontFamily: {
			display: "Alliance Neue Regular, Arial, sans-serif",
			sans: "Inter, Arial, sans-serif",
		},
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				"pixel-pink": "#FFAEEE",
				"fill-gray": "#9EA4AE",
				"secondary-text": "rgba(229,238,255,0.60)",
				"tertiary-text": "rgba(229,238,255,0.30)",
				tertiary: "#141414",
				positive: "#00997F",
				"positive-secondary": "rgba(0,153,127,0.15)",
				negative: "#E54545",
				"negative-secondary": "rgba(229,69,69,0.15)",
				banner: "#75426A",
				"bg-negative": "rgba(229,69,69,0.15)",
				overlay: "rgba(64,64,64,0.40)",
				"hover-bg": "rgba(255,174,238,0.15)",
				"secondary-bg": "rgba(229,238,255,0.15)",
				"tertiary-bg": "#482E42",
				lightgray: "#232527",
				checkbox: "rgba(229,238,255,0.60)",
				"border-secondary": "rgba(229,238,255,0.04)",
				orange: "#E57F45",
				"orange-secondary": "rgba(229,238,255,0.04)",
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			boxShadow: {
				hoverGlow: "0px 0px 25px 0px #F186DB",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
