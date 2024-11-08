import { Timestamp } from "@wardenprotocol/wardenjs/codegen/google/protobuf/timestamp";
import dayjs from "dayjs";

interface EthTimestamp {
	secs: bigint;
	nanos: bigint;
}

export const formatDateTime = (date: Timestamp | EthTimestamp) => {
	return dayjs(timestampToDate(date)).format("DD/MM/YYYY HH:mm:ss");
};

export function timestampToDate(timestamp: Timestamp | EthTimestamp): Date {
	return new Date(
		Number("secs" in timestamp ? timestamp.secs : timestamp.seconds) *
			1000 +
			Math.floor(Number(timestamp.nanos) / 1e6),
	);
}
