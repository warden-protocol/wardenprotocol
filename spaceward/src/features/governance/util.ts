import type { Timestamp } from "@wardenprotocol/wardenjs/codegen/google/protobuf/timestamp";
import type { MetadataJSON, ProposalParsed } from "./types";
import { hasKey } from "@/utils/validate";
import {
	ProposalStatus,
	TallyResult,
} from "@wardenprotocol/wardenjs/codegen/cosmos/gov/v1/gov";

export function parseMetadata(metadata: string): MetadataJSON {
	try {
		const json = JSON.parse(metadata);

		if (
			[json.title, json.summary, json.forum, json.other].every(
				(x) => typeof x === "string",
			)
		) {
			return json;
		}

		throw new Error("Unexpected metadata format");
	} catch (e) {
		return {
			title: "Unexpected metadata",
			summary: hasKey("message", e) ? e.message : "No description",
			forum: "",
			other: "",
		};
	}
}

export function parseTimestamp(timestamp?: Timestamp) {
	const sec = parseInt(timestamp?.seconds.toString() ?? "0");
	const ms = timestamp?.nanos ? Math.floor(timestamp.nanos / 1e6) : 0;
	return 1000 * sec + ms;
}

const B_100 = BigInt(100);

export function formatDate(date: Date) {
	return `${date.getDate()} ${date.toLocaleString("en-US", { month: "long" })}, ${date.getFullYear().toString().slice(-2)}`;
}

export function formatResult(tally?: TallyResult) {
	if (!tally) {
		return;
	}

	const abstain = BigInt(tally.abstainCount);
	const no = BigInt(tally.noCount);
	const noWithVeto = BigInt(tally.noWithVetoCount);
	const yes = BigInt(tally.yesCount);
	const total = abstain + no + noWithVeto + yes;

	if (!total) {
		return;
	}

	const abstainPercent = Number((B_100 * abstain) / total);
	const noPercent = Number((B_100 * no) / total);
	const noWithVetoPercent = Number((B_100 * noWithVeto) / total);
	const yesPercent = Number((B_100 * yes) / total);

	return {
		total,
		abstain,
		abstainPercent,
		no,
		noPercent,
		noWithVeto,
		noWithVetoPercent,
		yes,
		yesPercent,
	};
}

export function formatStatus({ status }: Pick<ProposalParsed, "status">) {
	let text = "Unknown";
	let classNames: string = "bg-secondary-bg";

	switch (status) {
		case ProposalStatus.PROPOSAL_STATUS_PASSED:
			text = "Passed";
			classNames = "bg-positive-secondary text-positive";
			break;
		case ProposalStatus.PROPOSAL_STATUS_REJECTED:
			text = "Rejected";
			classNames = "bg-orange-secondary text-orange";
			break;
		case ProposalStatus.PROPOSAL_STATUS_FAILED:
			text = "Failed";
			classNames = "bg-negative-secondary text-negative";
			break;
		case ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD:
			classNames = "bg-popover dark:bg-secondary-bg";
			text = "Voting";
			break;
		case ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD:
			text = "Deposit";
			break;
		case ProposalStatus.UNRECOGNIZED:
		case ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED:
		default:
	}

	return { text, classNames };
}
