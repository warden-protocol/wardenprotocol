export declare const REGISTER_COIN_TYPES: {
    ContentValue: {
        name: string;
        type: string;
    }[];
    TypeMetadata: {
        name: string;
        type: string;
    }[];
    TypeDenomUnit: {
        name: string;
        type: string;
    }[];
};
export interface DenomUnit {
    denom: string;
    exponent: number;
    aliases: string[];
}
export interface Metadata {
    description: string;
    denomUnits: DenomUnit[];
    base: string;
    display: string;
    name: string;
    symbol: string;
    uri: string;
    uriHash: string;
}
export declare function createRegisterCoin(title: string, description: string, metadata: Metadata[]): {
    type: string;
    value: {
        title: string;
        description: string;
        metadata: Metadata[];
    };
};
//# sourceMappingURL=registerCoin.d.ts.map