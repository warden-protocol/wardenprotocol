import { KeyType } from "../client/treasury"

export function prettyKeyType(type: KeyType) {
  switch (type) {
    case KeyType.ECDSA:
      return "ECDSA"
    default:
      return "unknown"
  }
}

