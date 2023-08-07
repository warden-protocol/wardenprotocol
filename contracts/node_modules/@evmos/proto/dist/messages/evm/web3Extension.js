import { ExtensionOptionsWeb3Tx } from '../../proto/ethermint/types/web3.js';
export function createWeb3Extension(chainId, feePayer, feePayerSig) {
    const message = new ExtensionOptionsWeb3Tx({
        typedDataChainId: BigInt(chainId),
        feePayer,
        feePayerSig,
    });
    return {
        message,
        path: ExtensionOptionsWeb3Tx.typeName,
    };
}
//# sourceMappingURL=web3Extension.js.map