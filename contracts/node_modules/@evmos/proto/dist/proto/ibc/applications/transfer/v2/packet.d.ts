import * as pb_1 from "google-protobuf";
export declare namespace ibc.applications.transfer.v2 {
    class FungibleTokenPacketData extends pb_1.Message {
        constructor(data?: any[] | {
            denom?: string;
            amount?: string;
            sender?: string;
            receiver?: string;
        });
        get denom(): string;
        set denom(value: string);
        get amount(): string;
        set amount(value: string);
        get sender(): string;
        set sender(value: string);
        get receiver(): string;
        set receiver(value: string);
        static fromObject(data: {
            denom?: string;
            amount?: string;
            sender?: string;
            receiver?: string;
        }): FungibleTokenPacketData;
        toObject(): {
            denom?: string | undefined;
            amount?: string | undefined;
            sender?: string | undefined;
            receiver?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): FungibleTokenPacketData;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): FungibleTokenPacketData;
    }
}
//# sourceMappingURL=packet.d.ts.map