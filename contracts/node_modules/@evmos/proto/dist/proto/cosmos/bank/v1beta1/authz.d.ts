import * as dependency_3 from "./../../base/v1beta1/coin";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.bank.v1beta1 {
    class SendAuthorization extends pb_1.Message {
        constructor(data?: any[] | {
            spend_limit?: dependency_3.cosmos.base.v1beta1.Coin[];
        });
        get spend_limit(): dependency_3.cosmos.base.v1beta1.Coin[];
        set spend_limit(value: dependency_3.cosmos.base.v1beta1.Coin[]);
        static fromObject(data: {
            spend_limit?: ReturnType<typeof dependency_3.cosmos.base.v1beta1.Coin.prototype.toObject>[];
        }): SendAuthorization;
        toObject(): {
            spend_limit?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SendAuthorization;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SendAuthorization;
    }
}
//# sourceMappingURL=authz.d.ts.map