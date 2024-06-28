import { Timestamp } from '@wardenprotocol/wardenjs/codegen/google/protobuf/timestamp';
import dayjs from 'dayjs';

export const formatDateTime = (date: Timestamp) => {
	return dayjs(timestampToDate(date)).format('DD/MM/YYYY HH:mm:ss');
}

export function timestampToDate(timestamp: Timestamp): Date {
	return new Date(Number(timestamp.seconds) * 1000 + Number(timestamp.nanos) / 1000);
}
