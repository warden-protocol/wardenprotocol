import DESCRIPTIONS from "@/features/keychains/description";
import KeychainCard from "@/features/keychains/KeychainCard";
import { useQueryHooks } from "@/hooks/useClient";

const KEYCHAINS = [
	{
		name: "OCP KMS",
		link: "#",
		description:
			"Open Custody Protocol (OCP), a modular custody primitive to expand the original vision from blah blah blah blah blah blah blah blah blah Open Custody Protocol (OCP), a modular custody primitive to expand the original",
		lastSeen: "1",
	},
	{
		name: "Open Custody Protocol (Fordefi MPC)",
		link: "#",
		description:
			"Open Custody Protocol (OCP), a modular custody primitive to expand the original vision from Qredo by blah blah blah blah blah blah blah blah blah blah Open Custody Protocol (OCP), dy primitive to expand the original",
		lastSeen: "3",
	},
	{
		name: "OCP KMS",
		link: "#",
		description:
			"Open Custody Protocol (OCP), a modular to expand the original vision from Qredo by blah blah blah blah blah blah blah blah blah blah Open Custody Protocol (OCP), a modular custody primitive to expand the original",
		lastSeen: "2",
	},
];

export function KeychainsPage() {
	const { useKeychains } = useQueryHooks();
	const q = useKeychains({});

	if (q.status === "loading") {
		return <div>Loading keychains...</div>;
	}

	const keychains = q.data?.keychains;

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
							({ key }) => key === item.description,
						);

						return (
							<KeychainCard
								id={item.id}
								key={item.description}
								name={desc?.title ?? item.description}
								description={
									desc?.description ?? "Description is empty"
								}
								link={desc?.link ?? "#"}
								// fixme
								lastSeen="never"
								verified={desc?.verified}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
