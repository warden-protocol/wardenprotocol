import clsx from "clsx";

export default function CardRow({ className, label, labelClassName, children }: { className?: string, label: string, labelClassName?: string, children: React.ReactNode }) {
	return (
		<div className={clsx("flex flex-row gap-4 items-center", className)}>
			<span className={clsx("font-bold text-sm w-[100px] shrink-0", labelClassName)}>{label}</span>
			<span>{children}</span>
		</div>
	);
}

