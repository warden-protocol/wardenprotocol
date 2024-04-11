export declare const protobufPackage = "warden.warden.v1beta2";
/**
 * WalletType specifies the Layer 1 blockchain that this wallet will be used
 * for.
 */
export declare enum WalletType {
    /** WALLET_TYPE_UNSPECIFIED - The wallet type is missing */
    WALLET_TYPE_UNSPECIFIED = 0,
    /** WALLET_TYPE_ETH - The wallet type for Ethereum */
    WALLET_TYPE_ETH = 1,
    /** WALLET_TYPE_CELESTIA - The wallet type for Celestia */
    WALLET_TYPE_CELESTIA = 2,
    /** WALLET_TYPE_SUI - The wallet type for Sui */
    WALLET_TYPE_SUI = 3,
    /** WALLET_TYPE_OSMOSIS - The wallet type for Osmosis */
    WALLET_TYPE_OSMOSIS = 4,
    UNRECOGNIZED = -1
}
export declare function walletTypeFromJSON(object: any): WalletType;
export declare function walletTypeToJSON(object: WalletType): string;
