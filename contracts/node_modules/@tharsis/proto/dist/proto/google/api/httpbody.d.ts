import * as dependency_1 from "./../protobuf/any";
import * as pb_1 from "google-protobuf";
export declare namespace google.api {
    class HttpBody extends pb_1.Message {
        constructor(data?: any[] | {
            content_type?: string;
            data?: Uint8Array;
            extensions?: dependency_1.google.protobuf.Any[];
        });
        get content_type(): string;
        set content_type(value: string);
        get data(): Uint8Array;
        set data(value: Uint8Array);
        get extensions(): dependency_1.google.protobuf.Any[];
        set extensions(value: dependency_1.google.protobuf.Any[]);
        static fromObject(data: {
            content_type?: string;
            data?: Uint8Array;
            extensions?: ReturnType<typeof dependency_1.google.protobuf.Any.prototype.toObject>[];
        }): HttpBody;
        toObject(): {
            content_type?: string | undefined;
            data?: Uint8Array | undefined;
            extensions?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): HttpBody;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): HttpBody;
    }
}
//# sourceMappingURL=httpbody.d.ts.map