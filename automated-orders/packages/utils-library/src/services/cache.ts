export class LruCache<T> {

    constructor(maxEntries: number) {
        this.maxEntries = maxEntries;
    }

    private values: Map<string, T> = new Map<string, T>();
    private maxEntries: number;

    public get(key: string): T | undefined {
        const hasKey = this.values.has(key);
        if (hasKey) {
            // peek the entry, re-insert for LRU strategy
            const entry = this.refresh(key);

            return entry
        }

        return undefined;
    }

    public has(key: string): boolean {
        const hasKey = this.values.has(key);
        if (hasKey) {
            this.refresh(key);
        }

        return hasKey;
    }

    public put(key: string, value: T) {

        if (this.values.size >= this.maxEntries) {
            // least-recently used cache eviction strategy
            const keyToDelete = this.values.keys().next().value;

            this.values.delete(keyToDelete);
        }

        this.values.set(key, value);
    }
    
    private refresh(key: string) {
        const entry = this.values.get(key)!;
        this.values.delete(key);
        this.values.set(key, entry);
        return entry;
    }
}