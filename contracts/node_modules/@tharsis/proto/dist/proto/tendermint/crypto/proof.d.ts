import * as pb_1 from "google-protobuf";
export declare namespace tendermint.crypto {
    class Proof extends pb_1.Message {
        constructor(data?: any[] | {
            total?: number;
            index?: number;
            leaf_hash?: Uint8Array;
            aunts?: Uint8Array[];
        });
        get total(): number;
        set total(value: number);
        get index(): number;
        set index(value: number);
        get leaf_hash(): Uint8Array;
        set leaf_hash(value: Uint8Array);
        get aunts(): Uint8Array[];
        set aunts(value: Uint8Array[]);
        static fromObject(data: {
            total?: number;
            index?: number;
            leaf_hash?: Uint8Array;
            aunts?: Uint8Array[];
        }): Proof;
        toObject(): {
            total?: number | undefined;
            index?: number | undefined;
            leaf_hash?: Uint8Array | undefined;
            aunts?: Uint8Array[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Proof;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Proof;
    }
    class ValueOp extends pb_1.Message {
        constructor(data?: any[] | {
            key?: Uint8Array;
            proof?: Proof;
        });
        get key(): Uint8Array;
        set key(value: Uint8Array);
        get proof(): Proof;
        set proof(value: Proof);
        static fromObject(data: {
            key?: Uint8Array;
            proof?: ReturnType<typeof Proof.prototype.toObject>;
        }): ValueOp;
        toObject(): {
            key?: Uint8Array | undefined;
            proof?: {
                total?: number | undefined;
                index?: number | undefined;
                leaf_hash?: Uint8Array | undefined;
                aunts?: Uint8Array[] | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ValueOp;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ValueOp;
    }
    class DominoOp extends pb_1.Message {
        constructor(data?: any[] | {
            key?: string;
            input?: string;
            output?: string;
        });
        get key(): string;
        set key(value: string);
        get input(): string;
        set input(value: string);
        get output(): string;
        set output(value: string);
        static fromObject(data: {
            key?: string;
            input?: string;
            output?: string;
        }): DominoOp;
        toObject(): {
            key?: string | undefined;
            input?: string | undefined;
            output?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DominoOp;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DominoOp;
    }
    class ProofOp extends pb_1.Message {
        constructor(data?: any[] | {
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        });
        get type(): string;
        set type(value: string);
        get key(): Uint8Array;
        set key(value: Uint8Array);
        get data(): Uint8Array;
        set data(value: Uint8Array);
        static fromObject(data: {
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        }): ProofOp;
        toObject(): {
            type?: string | undefined;
            key?: Uint8Array | undefined;
            data?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ProofOp;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ProofOp;
    }
    class ProofOps extends pb_1.Message {
        constructor(data?: any[] | {
            ops?: ProofOp[];
        });
        get ops(): ProofOp[];
        set ops(value: ProofOp[]);
        static fromObject(data: {
            ops?: ReturnType<typeof ProofOp.prototype.toObject>[];
        }): ProofOps;
        toObject(): {
            ops?: {
                type?: string | undefined;
                key?: Uint8Array | undefined;
                data?: Uint8Array | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ProofOps;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ProofOps;
    }
}
//# sourceMappingURL=proof.d.ts.map