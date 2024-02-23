import { Any } from "@bufbuild/protobuf";
import Address from "./address";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import CardRow from "./card-row";
import { MsgSend } from "wardenprotocol-warden-client-ts/lib/cosmos.bank.v1beta1/module";
import {
	MsgAddSpaceOwner,
	MsgNewKeychain,
	MsgNewSpace,
	MsgRemoveSpaceOwner,
	MsgUpdateSpace,
	MsgNewKeyRequest,
} from "wardenprotocol-warden-client-ts/lib/warden.warden/module";
import { MsgApproveAction } from "wardenprotocol-warden-client-ts/lib/warden.intent/module";
import { DecodeObject } from "@cosmjs/proto-signing";

export function TxMsgDetails({ msg }: { msg: DecodeObject }) {
	try {
		// const data = registry.decode(msg);
		// if (data instanceof MsgSend) {
		//   return <MsgSendDetails msg={data} />;
		// }
		// if (data instanceof MsgNewSpace) {
		//   return <MsgNewSpaceDetails msg={data} />;
		// }
		// if (data instanceof MsgAddSpaceOwner) {
		//   return <MsgAddSpaceOwnerDetails msg={data} />;
		// }
		// if (data instanceof MsgRemoveSpaceOwner) {
		//   return <MsgRemoveSpaceOwnerDetails msg={data} />;
		// }
		// if (data instanceof MsgNewKeychain) {
		//   return <MsgNewKeychainDetails msg={data} />;
		// }
		// if (data instanceof MsgUpdateSpace) {
		//   return <MsgUpdateSpaceDetails msg={data} />;
		// }
		// if (data instanceof MsgApproveAction) {
		//   return <MsgApproveActionDetails msg={data} />;
		// }
		throw new Error("Unsupported message type");
	} catch (e) {
		return <MsgFallback msg={msg} />;
	}
}

function MsgSendDetails({ msg }: { msg: MsgSend }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Bank send</CardTitle>
				<CardDescription>Transfer of coins.</CardDescription>
			</CardHeader>
			<CardContent>
				<CardRow label="From">
					<Address address={msg.fromAddress} />
				</CardRow>
				<CardRow label="To">
					<Address address={msg.toAddress} />
				</CardRow>
				<CardRow label="Amount">
					{msg.amount
						.map((amount) => `${amount.amount} ${amount.denom}`)
						.join(", ")}
				</CardRow>
			</CardContent>
		</Card>
	);
}

function MsgNewSpaceDetails({ msg }: { msg: MsgNewSpace }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>New space</CardTitle>
				<CardDescription>Creation of a new space</CardDescription>
			</CardHeader>
			<CardContent>
				<CardRow label="From">
					<Address address={msg.creator} />
				</CardRow>
				<CardRow label="Admin intent">
					{msg.adminIntentId.toString()}
				</CardRow>
				<CardRow label="Sign intent">
					{msg.signIntentId.toString()}
				</CardRow>
			</CardContent>
		</Card>
	);
}

function MsgAddSpaceOwnerDetails({ msg }: { msg: MsgAddSpaceOwner }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Add owner</CardTitle>
				<CardDescription>Add a new owner to a space</CardDescription>
			</CardHeader>
			<CardContent>
				<CardRow label="From">
					<Address address={msg.creator} />
				</CardRow>
				<CardRow label="Space">{msg.spaceAddr}</CardRow>
				<CardRow label="New owner">
					<Address address={msg.newOwner} />
				</CardRow>
			</CardContent>
		</Card>
	);
}

function MsgRemoveSpaceOwnerDetails({ msg }: { msg: MsgRemoveSpaceOwner }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Remove owner</CardTitle>
				<CardDescription>Remove a new owner to a space</CardDescription>
			</CardHeader>
			<CardContent>
				<CardRow label="From">
					<Address address={msg.creator} />
				</CardRow>
				<CardRow label="Space">{msg.spaceAddr}</CardRow>
				<CardRow label="Removed owner">
					<Address address={msg.owner} />
				</CardRow>
			</CardContent>
		</Card>
	);
}

function MsgNewKeychainDetails({ msg }: { msg: MsgNewKeychain }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>New keychain</CardTitle>
				<CardDescription>Creation of a new keychain</CardDescription>
			</CardHeader>
			<CardContent>
				<CardRow label="From">
					<Address address={msg.creator} />
				</CardRow>
				<CardRow label="Description">{msg.description}</CardRow>
			</CardContent>
		</Card>
	);
}

function MsgUpdateSpaceDetails({ msg }: { msg: MsgUpdateSpace }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Update space</CardTitle>
				<CardDescription>Update a space</CardDescription>
			</CardHeader>
			<CardContent>
				<CardRow label="From">
					<Address address={msg.creator} />
				</CardRow>
				<CardRow label="Space">{msg.spaceAddr}</CardRow>
			</CardContent>
		</Card>
	);
}

function MsgApproveActionDetails({ msg }: { msg: MsgApproveAction }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Approve action</CardTitle>
				<CardDescription>Approve an action</CardDescription>
			</CardHeader>
			<CardContent>
				<CardRow label="From">
					<Address address={msg.creator} />
				</CardRow>
				<CardRow label="Action">{msg.actionId.toString()}</CardRow>
			</CardContent>
		</Card>
	);
}

function MsgNewKeyRequestDetails({ msg }: { msg: MsgNewKeyRequest }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>New key request</CardTitle>
				<CardDescription>Request a new key</CardDescription>
			</CardHeader>
			<CardContent>
				<CardRow label="From">
					<Address address={msg.creator} />
				</CardRow>
				<CardRow label="Keychain">{msg.keychainAddr}</CardRow>
				<CardRow label="Keytype">{msg.keyType}</CardRow>
			</CardContent>
		</Card>
	);
}

function MsgFallback({ msg }: { msg: DecodeObject }) {
	const type = msg.typeUrl;
	return (
		<Card>
			<CardHeader>
				<CardTitle>{type}</CardTitle>
				<CardDescription>
					<span className="text-sm text-red-500">
						Unsupported message type.
					</span>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col gap-2">
					<span className="font-bold text-sm">Raw value</span>
					<span className="font-mono break-all">{msg.value}</span>
				</div>
			</CardContent>
		</Card>
	);
}
