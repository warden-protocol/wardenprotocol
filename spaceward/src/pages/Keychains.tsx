import KeychainCard from "@/features/keychains/KeychainCard";
import { useQueryHooks } from "@/hooks/useClient";

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

	return (
		<div className="flex flex-col flex-1 h-full px-8 py-4 space-y-8">
			<h2 className="text-5xl font-bold">Keychains</h2>

			<div className="my-10">
				<div className="grid grid-cols-2 gap-6">
					{KEYCHAINS.map((item, key) => (
						<KeychainCard key={key} {...item} />
					))}
				</div>
			</div>
		</div>
	);
}
