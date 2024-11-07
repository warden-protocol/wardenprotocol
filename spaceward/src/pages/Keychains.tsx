import DESCRIPTIONS from "@/features/keychains/description";
import KeychainCard from "@/features/keychains/KeychainCard";
import { useKeychains } from "@/hooks/query/warden";

export function KeychainsPage() {
	const q = useKeychains({});

	if (q.status === "loading") {
		return <div>Loading keychains...</div>;
	}

	const keychains = q.data?.[0];

	if (!keychains || keychains.length === 0) {
		return (
			<div>
				<p>No keychains found</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<h2 className="text-5xl font-bold">Keychains</h2>

			<div className="my-10">
				<div className="grid grid-cols-2 gap-6">
					{keychains.map((item) => {
						const desc = DESCRIPTIONS.find(
							({ key }) =>
								// key === item.description,
								key === item.name,
						);

						if (desc && !desc.disabled) {
							return (
								<KeychainCard
									id={item.id}
									key={item.description}
									name={desc?.title ?? item.description}
									description={
										desc?.description ??
										"Description is empty"
									}
									link={desc?.link ?? "#"}
									// fixme
									lastSeen="never"
									verified={desc?.verified}
								/>
							);
						}
					})}
				</div>
			</div>
		</div>
	);
}
