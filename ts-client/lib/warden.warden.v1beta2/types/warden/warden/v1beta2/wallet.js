/* eslint-disable */
export const protobufPackage = "warden.warden.v1beta2";
/**
 * WalletType specifies the Layer 1 blockchain that this wallet will be used
 * for.
 */
export var WalletType;
(function (WalletType) {
    /** WALLET_TYPE_UNSPECIFIED - The wallet type is missing */
    WalletType[WalletType["WALLET_TYPE_UNSPECIFIED"] = 0] = "WALLET_TYPE_UNSPECIFIED";
    /** WALLET_TYPE_ETH - The wallet type for Ethereum */
    WalletType[WalletType["WALLET_TYPE_ETH"] = 1] = "WALLET_TYPE_ETH";
    /** WALLET_TYPE_CELESTIA - The wallet type for Celestia */
    WalletType[WalletType["WALLET_TYPE_CELESTIA"] = 2] = "WALLET_TYPE_CELESTIA";
    /** WALLET_TYPE_SUI - The wallet type for Sui */
    WalletType[WalletType["WALLET_TYPE_SUI"] = 3] = "WALLET_TYPE_SUI";
    /** WALLET_TYPE_OSMOSIS - The wallet type for Osmosis */
    WalletType[WalletType["WALLET_TYPE_OSMOSIS"] = 4] = "WALLET_TYPE_OSMOSIS";
    WalletType[WalletType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(WalletType || (WalletType = {}));
export function walletTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "WALLET_TYPE_UNSPECIFIED":
            return WalletType.WALLET_TYPE_UNSPECIFIED;
        case 1:
        case "WALLET_TYPE_ETH":
            return WalletType.WALLET_TYPE_ETH;
        case 2:
        case "WALLET_TYPE_CELESTIA":
            return WalletType.WALLET_TYPE_CELESTIA;
        case 3:
        case "WALLET_TYPE_SUI":
            return WalletType.WALLET_TYPE_SUI;
        case 4:
        case "WALLET_TYPE_OSMOSIS":
            return WalletType.WALLET_TYPE_OSMOSIS;
        case -1:
        case "UNRECOGNIZED":
        default:
            return WalletType.UNRECOGNIZED;
    }
}
export function walletTypeToJSON(object) {
    switch (object) {
        case WalletType.WALLET_TYPE_UNSPECIFIED:
            return "WALLET_TYPE_UNSPECIFIED";
        case WalletType.WALLET_TYPE_ETH:
            return "WALLET_TYPE_ETH";
        case WalletType.WALLET_TYPE_CELESTIA:
            return "WALLET_TYPE_CELESTIA";
        case WalletType.WALLET_TYPE_SUI:
            return "WALLET_TYPE_SUI";
        case WalletType.WALLET_TYPE_OSMOSIS:
            return "WALLET_TYPE_OSMOSIS";
        case WalletType.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
