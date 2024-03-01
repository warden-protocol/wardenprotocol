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
import { MsgSend } from "warden-protocol-wardenprotocol-client-ts/lib/cosmos.bank.v1beta1/module";
import {
	MsgAddSpaceOwner,
	MsgNewKeychain,
	MsgNewSpace,
	MsgRemoveSpaceOwner,
	MsgUpdateSpace,
	MsgNewKeyRequest,
} from "warden-protocol-wardenprotocol-client-ts/lib/warden.warden/module";
import { MsgApproveAction } from "warden-protocol-wardenprotocol-client-ts/lib/warden.intent/module";
import { DecodeObject } from "@cosmjs/proto-signing";
import AddressAvatar from "./address-avatar";

export function TxMsgDetails({ msg }: { msg: DecodeObject }) {
	try {
		if (msg["@type"] === "/warden.warden.MsgSend") {
			return <MsgSendDetails msg={msg} />;
		}
		if (msg["@type"] === "/warden.warden.MsgNewSpace") {
			return <MsgNewSpaceDetails msg={msg} />;
		}
		if (msg["@type"] === "/warden.warden.MsgAddSpaceOwner") {
			return <MsgAddSpaceOwnerDetails msg={msg} />;
		}
		if (msg["@type"] === "/warden.warden.MsgRemoveSpaceOwner") {
			return <MsgRemoveSpaceOwnerDetails msg={msg} />;
		}
		if (msg["@type"] === "/warden.warden.MsgNewKeychain") {
			return <MsgNewKeychainDetails msg={msg} />;
		}
		if (msg["@type"] === "/warden.warden.MsgUpdateSpace") {
			return <MsgUpdateSpaceDetails msg={msg} />;
		}
		if (msg["@type"] === "/warden.warden.MsgApproveAction") {
			return <MsgApproveActionDetails msg={msg} />;
		}
		if (msg["@type"] === "/warden.warden.MsgNewKeyRequest") {
			return <MsgNewKeyRequestDetails msg={msg} />;
		}
		if (msg["@type"] === "/warden.intent.MsgNewIntent") {
			return <MsgNewIntentDetails msg={msg} />;
		}
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
				<CardRow label="From">{msg.fromAddress}</CardRow>
				<CardRow label="To">{msg.toAddress}</CardRow>
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
				<CardRow label="From">{msg.creator}</CardRow>
				<CardRow label="Admin intent">
					{msg.admin_intent_id.toString()}
				</CardRow>
				<CardRow label="Sign intent">
					{msg.sign_intent_id.toString()}
				</CardRow>
			</CardContent>
		</Card>
	);
}

function MsgAddSpaceOwnerDetails({ msg }: { msg: MsgAddSpaceOwner }) {
	return (
		<div>
			{/* <CardHeader>
				<CardTitle>Add owner</CardTitle>
				<CardDescription>Add a new owner to a space</CardDescription>
			</CardHeader> */}
			<div className="flex flex-col space-y-4">
				{/* <CardRow label="From">{msg.creator}</CardRow>
				<CardRow label="Space">{msg.space_addr}</CardRow>
				<CardRow label="New owner">{msg.new_owner}</CardRow> */}
				<span className="font-bold">Add a new owner to a space</span>
				<div>
					<div className="flex flex-row space-x-2 items-center">
						<div className="flex flex-col items-center">
							<AddressAvatar seed={msg.creator} />
						</div>
						<div className="flex flex-col">
							<span className="">From</span>
							<span className="text-muted-foreground">
								{msg.creator}
							</span>
						</div>
					</div>
				</div>
				<div>
					<div className="flex flex-row space-x-2 items-center">
						<div className="flex flex-col items-center">
							<AddressAvatar seed={msg.space_addr} />
						</div>
						<div className="flex flex-col">
							<span>Space</span>
							<span className="text-muted-foreground">
								{msg.space_addr}
							</span>
						</div>
					</div>
				</div>
				<div>
					<div className="flex flex-row space-x-2 items-center">
						<div className="flex flex-col items-center">
							<AddressAvatar seed={msg.new_owner} />
						</div>
						<div className="flex flex-col">
							<span>New owner</span>
							<span className="text-muted-foreground">
								{msg.new_owner}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
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
				<CardRow label="From">{msg.creator}</CardRow>
				<CardRow label="Space">{msg.space_addr}</CardRow>
				<CardRow label="Removed owner">{msg.owner}</CardRow>
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
				<CardRow label="From">{msg.creator}</CardRow>
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
				<CardRow label="From">{msg.creator}</CardRow>
				<CardRow label="Space">{msg.space_addr}</CardRow>
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
				<CardRow label="From">{msg.creator}</CardRow>
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
				<CardRow label="From">{msg.creator}</CardRow>
				<CardRow label="Keychain">{msg.keychain_addr}</CardRow>
				<CardRow label="Keytype">{msg.key_type}</CardRow>
			</CardContent>
		</Card>
	);
}

function MsgNewIntentDetails({ msg }: { msg: Any }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>New intent</CardTitle>
				<CardDescription>Creation of a new intent</CardDescription>
			</CardHeader>
			<CardContent>
				<CardRow label="From">{msg.creator}</CardRow>
				<CardRow label="Name">{msg.name}</CardRow>
				<CardRow label="Type">{msg.intent["@type"]}</CardRow>
				<CardRow label="Definition">{msg.intent.definition}</CardRow>
				<CardRow label="Participants">
					{msg.intent.participants.toString()}
				</CardRow>
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
