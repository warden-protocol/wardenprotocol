import * as pb_1 from "google-protobuf";
export declare namespace evmos.claims.v1 {
    enum Action {
        ACTION_UNSPECIFIED = 0,
        ACTION_VOTE = 1,
        ACTION_DELEGATE = 2,
        ACTION_EVM = 3,
        ACTION_IBC_TRANSFER = 4
    }
    class Claim extends pb_1.Message {
        constructor(data?: any[] | {
            action?: Action;
            completed?: boolean;
            claimable_amount?: string;
        });
        get action(): Action;
        set action(value: Action);
        get completed(): boolean;
        set completed(value: boolean);
        get claimable_amount(): string;
        set claimable_amount(value: string);
        static fromObject(data: {
            action?: Action;
            completed?: boolean;
            claimable_amount?: string;
        }): Claim;
        toObject(): {
            action?: Action | undefined;
            completed?: boolean | undefined;
            claimable_amount?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Claim;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Claim;
    }
    class ClaimsRecordAddress extends pb_1.Message {
        constructor(data?: any[] | {
            address?: string;
            initial_claimable_amount?: string;
            actions_completed?: boolean[];
        });
        get address(): string;
        set address(value: string);
        get initial_claimable_amount(): string;
        set initial_claimable_amount(value: string);
        get actions_completed(): boolean[];
        set actions_completed(value: boolean[]);
        static fromObject(data: {
            address?: string;
            initial_claimable_amount?: string;
            actions_completed?: boolean[];
        }): ClaimsRecordAddress;
        toObject(): {
            address?: string | undefined;
            initial_claimable_amount?: string | undefined;
            actions_completed?: boolean[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ClaimsRecordAddress;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ClaimsRecordAddress;
    }
    class ClaimsRecord extends pb_1.Message {
        constructor(data?: any[] | {
            initial_claimable_amount?: string;
            actions_completed?: boolean[];
        });
        get initial_claimable_amount(): string;
        set initial_claimable_amount(value: string);
        get actions_completed(): boolean[];
        set actions_completed(value: boolean[]);
        static fromObject(data: {
            initial_claimable_amount?: string;
            actions_completed?: boolean[];
        }): ClaimsRecord;
        toObject(): {
            initial_claimable_amount?: string | undefined;
            actions_completed?: boolean[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ClaimsRecord;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ClaimsRecord;
    }
}
//# sourceMappingURL=claims.d.ts.map