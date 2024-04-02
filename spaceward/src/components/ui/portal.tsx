import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
	domId: string;
	children?: ReactNode;
}

export default function Portal(props: Props) {
	const [element, setElement] = useState<HTMLDivElement>();

	useEffect(() => {
		if (props.domId && typeof window !== "undefined") {
			const element = document.createElement("div");
			element.id = props.domId;
			document.body.appendChild(element);
			setElement(element);

			return () => {
				document.body.removeChild(element);
				setElement(undefined);
			};
		}
	}, [props.domId]);

	return element ? createPortal(props.children, element) : null;
}
