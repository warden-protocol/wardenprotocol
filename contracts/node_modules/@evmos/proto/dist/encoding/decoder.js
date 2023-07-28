import { PubKey } from '../proto/ethermint/crypto/keys.js';
import { EthAccount } from '../proto/ethermint/types/account.js';
export const decodeEthSecp256k1PubKey = (key) => {
    const { typeUrl, value } = key;
    if (typeUrl === `/${PubKey.typeName}`) {
        return PubKey.fromBinary(value);
    }
    throw new Error(`unrecognized public key type, expected /${PubKey.typeName}, got /${typeUrl}`);
};
export const decodeEthermintAccount = (account) => {
    const { typeUrl, value } = account;
    if (typeUrl === `/${EthAccount.typeName}`) {
        const { baseAccount } = EthAccount.fromBinary(value);
        if (!baseAccount) {
            return undefined;
        }
        const pubkey = baseAccount.pubKey
            ? decodeEthSecp256k1PubKey(baseAccount.pubKey)
            : null;
        return {
            address: baseAccount.address,
            pubkey,
            accountNumber: Number(baseAccount.accountNumber),
            sequence: Number(baseAccount.sequence),
        };
    }
    throw new Error(`unrecognized account type, expected /${EthAccount.typeName}`);
};
//# sourceMappingURL=decoder.js.map