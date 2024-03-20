/* eslint-disable */

export const protobufPackage = "warden.warden.v1beta1";

/**
 * WalletType specifies the Layer 1 blockchain that this wallet will be used
 * for.
 */
export enum WalletType {
  /** WALLET_TYPE_UNSPECIFIED - The wallet type is missing */
  WALLET_TYPE_UNSPECIFIED = 0,
  /** WALLET_TYPE_ETH - The wallet type for Ethereum */
  WALLET_TYPE_ETH = 1,
  /** WALLET_TYPE_CELESTIA - The wallet type for Celestia */
  WALLET_TYPE_CELESTIA = 2,
  /** WALLET_TYPE_SUI - The wallet type for Sui */
  WALLET_TYPE_SUI = 3,
  UNRECOGNIZED = -1,
}

export function walletTypeFromJSON(object: any): WalletType {
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
    case -1:
    case "UNRECOGNIZED":
    default:
      return WalletType.UNRECOGNIZED;
  }
}

export function walletTypeToJSON(object: WalletType): string {
  switch (object) {
    case WalletType.WALLET_TYPE_UNSPECIFIED:
      return "WALLET_TYPE_UNSPECIFIED";
    case WalletType.WALLET_TYPE_ETH:
      return "WALLET_TYPE_ETH";
    case WalletType.WALLET_TYPE_CELESTIA:
      return "WALLET_TYPE_CELESTIA";
    case WalletType.WALLET_TYPE_SUI:
      return "WALLET_TYPE_SUI";
    case WalletType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
