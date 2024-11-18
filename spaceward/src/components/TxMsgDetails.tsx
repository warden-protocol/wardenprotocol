import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import CardRow from "@/components/ui/card-row";
import { DecodeObject } from "@cosmjs/proto-signing";
import AddressAvatar from "./AddressAvatar";
import { MsgSend } from "@wardenprotocol/wardenjs/codegen/cosmos/bank/v1beta1/tx";
import {
	MsgVoteForAction as MsgApproveAction,
	MsgNewTemplate as MsgNewRule,
} from "@wardenprotocol/wardenjs/codegen/warden/act/v1beta1/tx";
import {
	MsgAddSpaceOwner,
	MsgNewKeyRequest,
	MsgNewKeychain,
	MsgNewSpace,
	MsgRemoveSpaceOwner,
	MsgUpdateSpace,
} from "@wardenprotocol/wardenjs/codegen/warden/warden/v1beta3/tx";
import {
	cosmosProtoRegistry,
	wardenProtoRegistry,
} from "@wardenprotocol/wardenjs";
import { extReplacer } from "@/utils/formatting";
import { useTemplateById } from "@/hooks/query/act";

export function TxMsgDetails({ msg }: { msg: DecodeObject }) {
	try {
		if (msg.typeUrl === MsgSend.typeUrl) {
			return <MsgSendDetails msg={MsgSend.decode(msg.value)} />;
		}
		if (msg.typeUrl === MsgNewSpace.typeUrl) {
			return <MsgNewSpaceDetails msg={MsgNewSpace.decode(msg.value)} />;
		}
		if (msg.typeUrl === MsgAddSpaceOwner.typeUrl) {
			return (
				<MsgAddSpaceOwnerDetails
					msg={MsgAddSpaceOwner.decode(msg.value)}
				/>
			);
		}
		if (msg.typeUrl === MsgRemoveSpaceOwner.typeUrl) {
			return (
				<MsgRemoveSpaceOwnerDetails
					msg={MsgRemoveSpaceOwner.decode(msg.value)}
				/>
			);
		}
		if (msg.typeUrl === MsgNewKeychain.typeUrl) {
			return (
				<MsgNewKeychainDetails msg={MsgNewKeychain.decode(msg.value)} />
			);
		}
		if (msg.typeUrl === MsgUpdateSpace.typeUrl) {
			return (
				<MsgUpdateSpaceDetails msg={MsgUpdateSpace.decode(msg.value)} />
			);
		}
		if (msg.typeUrl === MsgApproveAction.typeUrl) {
			return (
				<MsgApproveActionDetails
					msg={MsgApproveAction.decode(msg.value)}
				/>
			);
		}
		if (msg.typeUrl === MsgNewKeyRequest.typeUrl) {
			return (
				<MsgNewKeyRequestDetails
					msg={MsgNewKeyRequest.decode(msg.value)}
				/>
			);
		}
		if (msg.typeUrl === MsgNewRule.typeUrl) {
			return <MsgNewRuleDetails msg={MsgNewRule.decode(msg.value)} />;
		}
		throw new Error("Unsupported message type");
	} catch (e) {
		return <MsgFallback msg={msg} />;
	}
}

function MsgSendDetails({ msg }: { msg: MsgSend }) {
	return (
		<Card className="bg-background">
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
		<Card className="bg-background">
			<CardHeader>
				<CardTitle>New space</CardTitle>
				<CardDescription>Creation of a new space</CardDescription>
			</CardHeader>
			<CardContent>
				<CardRow label="From">{msg.creator}</CardRow>
				<CardRow label="Admin Approve intent">
					{msg.approveAdminTemplateId.toString()}
				</CardRow>
				<CardRow label="Admin Reject intent">
					{msg.rejectAdminTemplateId.toString()}
				</CardRow>
				<CardRow label="Sign Approve intent">
					{msg.approveSignTemplateId.toString()}
				</CardRow>
				<CardRow label="Sign Reject intent">
					{msg.rejectSignTemplateId.toString()}
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
				<CardRow label="Space">{msg.space_id}</CardRow>
				<CardRow label="New owner">{msg.new_owner}</CardRow> */}
				<span className="font-bold">Add a new owner to a space</span>
				<div>
					<div className="flex flex-row space-x-2 items-center">
						<div className="flex flex-col items-center">
							<AddressAvatar seed={msg.spaceId.toString()} />
						</div>
						<div className="flex flex-col">
							<span>Space</span>
							<span className="text-muted-foreground">
								{msg.spaceId.toString()}
							</span>
						</div>
					</div>
				</div>
				<div>
					<div className="flex flex-row space-x-2 items-center">
						<div className="flex flex-col items-center">
							<AddressAvatar seed={msg.newOwner} />
						</div>
						<div className="flex flex-col">
							<span>New owner</span>
							<span className="text-muted-foreground">
								{msg.newOwner}
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
		<Card className="bg-background">
			<CardHeader>
				<CardTitle>Remove owner</CardTitle>
				<CardDescription>Remove a new owner to a space</CardDescription>
			</CardHeader>
			<CardContent>
				<CardRow label="Space">{msg.spaceId.toString()}</CardRow>
				<CardRow label="Removed owner">{msg.owner}</CardRow>
			</CardContent>
		</Card>
	);
}

function MsgNewKeychainDetails({ msg }: { msg: MsgNewKeychain }) {
	return (
		<Card className="bg-background">
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

export function TemplateName({ id }: { id: bigint }) {
	const { data } = useTemplateById({ request: { id } });
	return <span>{data?.template?.name ?? "Default Template"}</span>;
}

function MsgUpdateSpaceDetails({ msg }: { msg: MsgUpdateSpace }) {
	return (
		<Card className="bg-background">
			<CardHeader>
				<CardTitle>Update space</CardTitle>
				<CardDescription>Update a space</CardDescription>
			</CardHeader>
			<CardContent>
				<CardRow labelClassName="!w-52" label="Space">
					{msg.spaceId.toString()}
				</CardRow>
				<CardRow labelClassName="!w-52" label="Admin Approve intent">
					<TemplateName id={msg.approveAdminTemplateId} />
				</CardRow>
				<CardRow labelClassName="!w-52" label="Admin Reject intent">
					<TemplateName id={msg.rejectAdminTemplateId} />
				</CardRow>
				<CardRow labelClassName="!w-52" label="Sign Approve intent">
					<TemplateName id={msg.approveSignTemplateId} />
				</CardRow>
				<CardRow labelClassName="!w-52" label="Sign Reject intent">
					<TemplateName id={msg.rejectSignTemplateId} />
				</CardRow>
			</CardContent>
		</Card>
	);
}

function MsgApproveActionDetails({ msg }: { msg: MsgApproveAction }) {
	return (
		<Card className="bg-background">
			<CardHeader>
				<CardTitle>Approve action</CardTitle>
				<CardDescription>Approve an action</CardDescription>
			</CardHeader>
			<CardContent>
				<CardRow label="From">{msg.participant}</CardRow>
				<CardRow label="Action">{msg.actionId.toString()}</CardRow>
			</CardContent>
		</Card>
	);
}

function MsgNewKeyRequestDetails({ msg }: { msg: MsgNewKeyRequest }) {
	return (
		<Card className="bg-background">
			<CardHeader>
				<CardTitle>New key request</CardTitle>
				<CardDescription>Request a new key</CardDescription>
			</CardHeader>
			<CardContent>
				<CardRow label="Keychain">{msg.keychainId.toString()}</CardRow>
				<CardRow label="Keytype">{msg.keyType}</CardRow>
			</CardContent>
		</Card>
	);
}

function MsgNewRuleDetails({ msg }: { msg: MsgNewRule }) {
	return (
		<Card className="bg-background">
			<CardHeader>
				<CardTitle>New rule</CardTitle>
				<CardDescription>Creation of a new rule</CardDescription>
			</CardHeader>
			<CardContent>
				<CardRow label="From">{msg.creator}</CardRow>
				<CardRow label="Name">{msg.name}</CardRow>
				<CardRow label="Definition">{msg.definition}</CardRow>
			</CardContent>
		</Card>
	);
}

function MsgFallback({ msg }: { msg: DecodeObject }) {
	const type = msg.typeUrl;

	const t = [...wardenProtoRegistry, ...cosmosProtoRegistry].find(
		(r) => r[0] === type,
	)?.[1];
	if (t) {
		return <MsgFallbackDetails type={type} msg={t.decode(msg.value)} />;
	}

	return (
		<Card className="bg-background">
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MsgFallbackDetails({ type, msg }: { type: string; msg: any }) {
	return (
		<Card className="bg-background">
			<CardHeader>
				<CardTitle>{type}</CardTitle>
				<CardDescription>
					<span className="text-sm text-red-500">
						Partially supported message type.
					</span>
				</CardDescription>
			</CardHeader>
			<CardContent>
				{Object.entries(msg).map(([key, value]) => (
					<CardRow labelClassName="!w-52" label={key} key={key}>
						{JSON.stringify(value, extReplacer, 2)}
					</CardRow>
				))}
			</CardContent>
		</Card>
	);
}
