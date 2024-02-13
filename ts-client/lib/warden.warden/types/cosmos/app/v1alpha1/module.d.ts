import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "cosmos.app.v1alpha1";
/** ModuleDescriptor describes an app module. */
export interface ModuleDescriptor {
    /**
     * go_import names the package that should be imported by an app to load the
     * module in the runtime module registry. It is required to make debugging
     * of configuration errors easier for users.
     */
    goImport: string;
    /**
     * use_package refers to a protobuf package that this module
     * uses and exposes to the world. In an app, only one module should "use"
     * or own a single protobuf package. It is assumed that the module uses
     * all of the .proto files in a single package.
     */
    usePackage: PackageReference[];
    /**
     * can_migrate_from defines which module versions this module can migrate
     * state from. The framework will check that one module version is able to
     * migrate from a previous module version before attempting to update its
     * config. It is assumed that modules can transitively migrate from earlier
     * versions. For instance if v3 declares it can migrate from v2, and v2
     * declares it can migrate from v1, the framework knows how to migrate
     * from v1 to v3, assuming all 3 module versions are registered at runtime.
     */
    canMigrateFrom: MigrateFromInfo[];
}
/** PackageReference is a reference to a protobuf package used by a module. */
export interface PackageReference {
    /** name is the fully-qualified name of the package. */
    name: string;
    /**
     * revision is the optional revision of the package that is being used.
     * Protobuf packages used in Cosmos should generally have a major version
     * as the last part of the package name, ex. foo.bar.baz.v1.
     * The revision of a package can be thought of as the minor version of a
     * package which has additional backwards compatible definitions that weren't
     * present in a previous version.
     *
     * A package should indicate its revision with a source code comment
     * above the package declaration in one of its files containing the
     * text "Revision N" where N is an integer revision. All packages start
     * at revision 0 the first time they are released in a module.
     *
     * When a new version of a module is released and items are added to existing
     * .proto files, these definitions should contain comments of the form
     * "Since: Revision N" where N is an integer revision.
     *
     * When the module runtime starts up, it will check the pinned proto
     * image and panic if there are runtime protobuf definitions that are not
     * in the pinned descriptor which do not have
     * a "Since Revision N" comment or have a "Since Revision N" comment where
     * N is <= to the revision specified here. This indicates that the protobuf
     * files have been updated, but the pinned file descriptor hasn't.
     *
     * If there are items in the pinned file descriptor with a revision
     * greater than the value indicated here, this will also cause a panic
     * as it may mean that the pinned descriptor for a legacy module has been
     * improperly updated or that there is some other versioning discrepancy.
     * Runtime protobuf definitions will also be checked for compatibility
     * with pinned file descriptors to make sure there are no incompatible changes.
     *
     * This behavior ensures that:
     * * pinned proto images are up-to-date
     * * protobuf files are carefully annotated with revision comments which
     *   are important good client UX
     * * protobuf files are changed in backwards and forwards compatible ways
     */
    revision: number;
}
/**
 * MigrateFromInfo is information on a module version that a newer module
 * can migrate from.
 */
export interface MigrateFromInfo {
    /**
     * module is the fully-qualified protobuf name of the module config object
     * for the previous module version, ex: "cosmos.group.module.v1.Module".
     */
    module: string;
}
export declare const ModuleDescriptor: {
    encode(message: ModuleDescriptor, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ModuleDescriptor;
    fromJSON(object: any): ModuleDescriptor;
    toJSON(message: ModuleDescriptor): unknown;
    create<I extends {
        goImport?: string;
        usePackage?: {
            name?: string;
            revision?: number;
        }[];
        canMigrateFrom?: {
            module?: string;
        }[];
    } & {
        goImport?: string;
        usePackage?: {
            name?: string;
            revision?: number;
        }[] & ({
            name?: string;
            revision?: number;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K in Exclude<keyof I["usePackage"], keyof {
            name?: string;
            revision?: number;
        }[]>]: never; };
        canMigrateFrom?: {
            module?: string;
        }[] & ({
            module?: string;
        } & {
            [x: string]: any;
        } & {
            [x: string]: never;
        })[] & { [K_1 in Exclude<keyof I["canMigrateFrom"], keyof {
            module?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof ModuleDescriptor>]: never; }>(base?: I): ModuleDescriptor;
    fromPartial<I_1 extends {
        goImport?: string;
        usePackage?: {
            name?: string;
            revision?: number;
        }[];
        canMigrateFrom?: {
            module?: string;
        }[];
    } & {
        goImport?: string;
        usePackage?: {
            name?: string;
            revision?: number;
        }[] & ({
            name?: string;
            revision?: number;
        } & {
            name?: string;
            revision?: number;
        } & { [K_3 in Exclude<keyof I_1["usePackage"][number], keyof PackageReference>]: never; })[] & { [K_4 in Exclude<keyof I_1["usePackage"], keyof {
            name?: string;
            revision?: number;
        }[]>]: never; };
        canMigrateFrom?: {
            module?: string;
        }[] & ({
            module?: string;
        } & {
            module?: string;
        } & { [K_5 in Exclude<keyof I_1["canMigrateFrom"][number], "module">]: never; })[] & { [K_6 in Exclude<keyof I_1["canMigrateFrom"], keyof {
            module?: string;
        }[]>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof ModuleDescriptor>]: never; }>(object: I_1): ModuleDescriptor;
};
export declare const PackageReference: {
    encode(message: PackageReference, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PackageReference;
    fromJSON(object: any): PackageReference;
    toJSON(message: PackageReference): unknown;
    create<I extends {
        name?: string;
        revision?: number;
    } & {
        name?: string;
        revision?: number;
    } & { [K in Exclude<keyof I, keyof PackageReference>]: never; }>(base?: I): PackageReference;
    fromPartial<I_1 extends {
        name?: string;
        revision?: number;
    } & {
        name?: string;
        revision?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof PackageReference>]: never; }>(object: I_1): PackageReference;
};
export declare const MigrateFromInfo: {
    encode(message: MigrateFromInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MigrateFromInfo;
    fromJSON(object: any): MigrateFromInfo;
    toJSON(message: MigrateFromInfo): unknown;
    create<I extends {
        module?: string;
    } & {
        module?: string;
    } & { [K in Exclude<keyof I, "module">]: never; }>(base?: I): MigrateFromInfo;
    fromPartial<I_1 extends {
        module?: string;
    } & {
        module?: string;
    } & { [K_1 in Exclude<keyof I_1, "module">]: never; }>(object: I_1): MigrateFromInfo;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
