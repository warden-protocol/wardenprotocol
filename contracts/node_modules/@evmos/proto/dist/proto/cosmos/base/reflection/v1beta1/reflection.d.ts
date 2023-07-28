import * as pb_1 from "google-protobuf";
export declare namespace cosmos.base.reflection.v1beta1 {
    class ListAllInterfacesRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): ListAllInterfacesRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ListAllInterfacesRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ListAllInterfacesRequest;
    }
    class ListAllInterfacesResponse extends pb_1.Message {
        constructor(data?: any[] | {
            interface_names?: string[];
        });
        get interface_names(): string[];
        set interface_names(value: string[]);
        static fromObject(data: {
            interface_names?: string[];
        }): ListAllInterfacesResponse;
        toObject(): {
            interface_names?: string[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ListAllInterfacesResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ListAllInterfacesResponse;
    }
    class ListImplementationsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            interface_name?: string;
        });
        get interface_name(): string;
        set interface_name(value: string);
        static fromObject(data: {
            interface_name?: string;
        }): ListImplementationsRequest;
        toObject(): {
            interface_name?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ListImplementationsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ListImplementationsRequest;
    }
    class ListImplementationsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            implementation_message_names?: string[];
        });
        get implementation_message_names(): string[];
        set implementation_message_names(value: string[]);
        static fromObject(data: {
            implementation_message_names?: string[];
        }): ListImplementationsResponse;
        toObject(): {
            implementation_message_names?: string[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ListImplementationsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ListImplementationsResponse;
    }
}
//# sourceMappingURL=reflection.d.ts.map