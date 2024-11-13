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
			title: "", // "Unexpected metadata",
			summary: "", // hasKey("message", e) ? e.message : "No description",
			forum: "",
			other: "",
		};
	}
}

interface EthTimestamp {
	secs: bigint;
	nanos: bigint;
}

export function parseTimestamp(timestamp?: Timestamp | EthTimestamp) {
	const secs = timestamp
		? "secs" in timestamp
			? timestamp.secs
			: timestamp.seconds
		: BigInt(0);

	const sec = parseInt(secs.toString());
	const ms = timestamp?.nanos ? Math.floor(Number(timestamp.nanos) / 1e6) : 0;
	return 1000 * sec + ms;
}

const biMinNoZero = (...vals: bigint[]) =>
	vals.reduce(
		(min, v) => (!v ? min : min > v ? v : min),
		BigInt("99999999999999999"),
	);

const divideWithDecimals = (decimals: number) => {
	const base = BigInt(10) ** BigInt(decimals);
	const B0 = BigInt(0);
	const B1 = BigInt(1);
	const MB1 = BigInt(-1);

	return (_a: bigint, b: bigint, ceil?: boolean) => {
		const a = _a * base;
		return ceil
			? a / b + (a % b === B0 ? B0 : a > B0 === b > B0 ? B1 : MB1)
			: a / b;
	};
};

const bigintDiv = divideWithDecimals(4);

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

	const min = biMinNoZero(abstain, no, noWithVeto, yes);
	const abstainPercent =
		Number(bigintDiv(abstain, total, min === abstain)) / 100;
	const noPercent = Number(bigintDiv(no, total, min === no)) / 100;
	const noWithVetoPercent =
		Number(bigintDiv(noWithVeto, total, min === noWithVeto)) / 100;
	const yesPercent = Number(bigintDiv(yes, total, min === yes)) / 100;

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
