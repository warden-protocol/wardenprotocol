import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { cn } from "@/lib/utils";
import { CopyIcon } from "lucide-react";
import clsx from "clsx";

const buttonVariants = cva("", {
	variants: {
		variant: {
			default: "",
			icon: "",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	value?: string;
	split?: boolean;
}

const Copy = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, value, split, variant, ...props }, ref) => {
		const [copied, setCopied] = React.useState(false);
		const [showTooltip, setShowTooltip] = React.useState(false);
		const onCopy = React.useCallback(() => {
			setCopied(true);
			setShowTooltip(true);

			setTimeout(() => {
				setCopied(false);
				setShowTooltip(false);
			}, 2000);
		}, []);
		return (
			<div
				className={clsx(
					"relative",
					className?.indexOf("inline-block") !== -1
						? "inline-block mx-1"
						: "flex",
				)}
			>
				{value && (
					<CopyToClipboard text={value} onCopy={onCopy}>
						<span
							className={cn(
								buttonVariants({ variant, className }),
							)}
							ref={ref}
							{...props}
							onMouseEnter={() => setShowTooltip(true)}
							onMouseLeave={() => setShowTooltip(false)}
						>
							{variant === "icon" ? (
								<CopyIcon className="h-4 w-4" />
							) : split ? (
								value?.slice(0, 8) + "..." + value?.slice(-8)
							) : (
								value
							)}
						</span>
					</CopyToClipboard>
				)}
				{showTooltip && (
					<div
						className={cn(
							"absolute top-0 left-1/2 text-center -translate-x-1/2 w-auto -translate-y-full block px-2 border bg-background rounded-md text-sm py-1",
							!copied && "w-36",
						)}
					>
						{copied ? (
							<span>Copied</span>
						) : (
							<span>Copy to clipboard</span>
						)}
					</div>
				)}
			</div>
		);
	},
);

export { Copy };
