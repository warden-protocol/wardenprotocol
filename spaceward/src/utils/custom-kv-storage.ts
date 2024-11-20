// copied from https://github.com/WalletConnect/walletconnect-utils/blob/master/misc/keyvaluestorage/src/browser/lib/indexedDb.ts
// with the addition of a custom db name
import { createStorage } from "unstorage";
import indexedDbDriver from "unstorage/drivers/indexedb";
import { ICore } from "@walletconnect/types";

type IKeyValueStorage = ICore["storage"];

const JSONStringify = (data: any) =>
	JSON.stringify(data, (_, value) =>
		typeof value === "bigint" ? value.toString() + "n" : value,
	);

export function safeJsonStringify(value: any): string {
	return typeof value === "string" ? value : JSONStringify(value) || "";
}

const DB_STORE_NAME = "keyvaluestorage";

export class IndexedDb implements IKeyValueStorage {
	private indexedDb;
	constructor(name: string) {
		this.indexedDb = createStorage({
			driver: indexedDbDriver({
				dbName: name,
				storeName: DB_STORE_NAME,
			}),
		});
	}

	public async getKeys(): Promise<string[]> {
		return this.indexedDb.getKeys();
	}

	public async getEntries<T = any>(): Promise<[string, T][]> {
		const entries = await this.indexedDb.getItems(
			await this.indexedDb.getKeys(),
		);
		return entries.map(
			(item: any) => [item.key, item.value] as [string, T],
		);
	}

	public async getItem<T = any>(key: string): Promise<T | undefined> {
		const item = await this.indexedDb.getItem(key);
		if (item === null) {
			return undefined;
		}
		return item as T;
	}

	public async setItem<T = any>(key: string, value: T): Promise<void> {
		await this.indexedDb.setItem(key, safeJsonStringify(value));
	}

	public async removeItem(key: string): Promise<void> {
		await this.indexedDb.removeItem(key);
	}
}
