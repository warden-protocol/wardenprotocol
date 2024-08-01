import { Fragment } from "react";

const descriptions = [
	{
		key: "WardenKMS",
		description: <Fragment>WardenKMS</Fragment>,
		title: "WardenKMS",
		verified: true,
		link: "#",
	},
	{
		key: "OCP KMS",
		description: <Fragment>OCP KMS</Fragment>,
		title: "OCP KMS",
		verified: true,
		link: "#",
	},
	{
		key: "Open Custody Protocol (Fordefi MPC)",
		description: <Fragment>Open Custody Protocol (Fordefi MPC)</Fragment>,
		title: "Open Custody Protocol (Fordefi MPC)",
		verified: true,
		link: "#",
	},
	{
		key: "Bushinode Keychain",
		description: <Fragment>Bushinode Keychain</Fragment>,
		title: "Bushinode Keychain",
		verified: false,
		link: "#",
	},
	{
		key: "Silence Laboratories",
		description: (
			<Fragment>
				One of the fastest MPC-based TSS for usable, secure, and truly
				decentralized support for digital wallets, exchanges and
				institutional asset enterprises. Silent Shard performs
				distributed signatures in less than 10 ms and key generation in
				less than 10s ms for 3 party settings.
			</Fragment>
		),
		title: "Silence Laboratories",
		verified: true,
		link: "#",
	},
];

export default descriptions;
