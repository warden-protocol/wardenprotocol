import { SignTypedDataVersion, TypedDataUtils } from '@metamask/eth-sig-util';
import { decodeAminoSignDoc } from './decodeAmino.js';
import { decodeProtobufSignDoc } from './decodeProtobuf.js';
export function decodeSignDocToTypedData(bytes) {
    let eip712;
    let aminoDecodeErr;
    let protoDecodeErr;
    try {
        eip712 = decodeAminoSignDoc(bytes);
    }
    catch (e) {
        aminoDecodeErr = e;
    }
    try {
        eip712 = decodeProtobufSignDoc(bytes);
    }
    catch (e) {
        protoDecodeErr = e;
    }
    if (!eip712) {
        throw new Error(`Could not cast bytes to either StdSignDoc or SignDoc:\n
                    Amino: ${aminoDecodeErr === null || aminoDecodeErr === void 0 ? void 0 : aminoDecodeErr.message}\n
                    Protobuf: ${protoDecodeErr === null || protoDecodeErr === void 0 ? void 0 : protoDecodeErr.message}\n`);
    }
    return eip712;
}
export function hashEIP712(eip712) {
    try {
        const eip712Domain = TypedDataUtils.hashStruct('EIP712Domain', eip712.domain, eip712.types, SignTypedDataVersion.V4);
        const eip712Hash = TypedDataUtils.hashStruct(eip712.primaryType, eip712.message, eip712.types, SignTypedDataVersion.V4);
        return {
            domain: eip712Domain,
            message: eip712Hash,
        };
    }
    catch (e) {
        throw new Error(`Could not hash EIP-712 object: ${e}`);
    }
}
//# sourceMappingURL=encoding.js.map