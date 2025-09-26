import { RefObject, useEffect } from "react";

export function useClickOutside<T extends HTMLElement>(
	ref: RefObject<T> | null,
	onClickOutsideClick: () => void,
) {
	useEffect(() => {
		const iframes = Array.from(document.querySelectorAll("iframe"))
			.filter((node) => {
				try {
					return node?.contentWindow?.document;
				} catch (e) {
					if (e instanceof DOMException) {
						/** ignore this error */
					} else if (e instanceof Error) {
						console.error(e.message);
					}

					return false;
				}
			})
			.map((node) => node?.contentWindow?.document)
			.filter((v) => !!v) as Document[];

		const listenerNodes = [document, ...iframes];

		const handleClickOutside = (event: MouseEvent) => {
			if (
				ref &&
				ref.current &&
				event &&
				!ref.current.contains(event.target as Node)
			) {
				onClickOutsideClick();
			}
		};

		listenerNodes.forEach((node) =>
			node.addEventListener("click", handleClickOutside),
		);

		return () => {
			listenerNodes.forEach((node) =>
				node.removeEventListener("click", handleClickOutside),
			);
		};
	}, [ref, onClickOutsideClick]);
}
