import {
	Toast,
	ToastActionElement,
	ToastClose,
	ToastDescription,
	ToastTitle,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { ReactNode, useEffect } from "react";

function ToastComponent({
	id,
	title,
	description,
	action,
	...props
}: {
	id: string;
	title?: string;
	description?: ReactNode;
	action?: ToastActionElement;
}) {
	const { dismiss } = useToast();

	useEffect(() => {
		if (!action) {
			const closeToast = setTimeout(() => {
				dismiss(id);
			}, 5000);
			return () => clearTimeout(closeToast);
		}
	}, [action, id]);

	return (
		<Toast key={id} {...props}>
			<div className="grid gap-1">
				{title && <ToastTitle>{title}</ToastTitle>}
				{description && (
					<ToastDescription>{description}</ToastDescription>
				)}
			</div>
			{action}
			<ToastClose />
		</Toast>
	);
}

export default ToastComponent;
