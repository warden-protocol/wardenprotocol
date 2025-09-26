export async function pasteFromClipboard() {
	if (!navigator?.clipboard) {
		throw new Error("Clipboard API not available");
	}

	return navigator.clipboard.readText();
}
