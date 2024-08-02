import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import ToastComponent from "./ToastComponent";

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider>
			{toasts.map(function ({
				id,
				title,
				description,
				action,
				...props
			}) {
				return (
					<ToastComponent
						id={id}
						title={title}
						description={description}
						action={action}
						{...props}
					/>
				);
			})}
			<ToastViewport />
		</ToastProvider>
	);
}
