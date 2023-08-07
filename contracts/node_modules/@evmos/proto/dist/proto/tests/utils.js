export const from = 'evmos1pmk2r32ssqwps42y3c9d4clqlca403yd9wymgr';
export const to = 'evmos12nml2w93uva0smjw3c36stczfay0k67ny94ecz';
export const to2 = 'evmos1xqnm0wf0rmntujjmpsz8nr28324qqyzy5k02u0';
export const val = 'evmosvaloper14rajuselkxsvqtqv20lamd08t8zxg8qdw3r3xm';
export const val2 = 'evmosvaloper1ex3wpda6mpczlgtcm2dsd60ltz39g5a7wqewls';
export const denom = 'aevmos';
export const hex = '0xe2D61e49ff8a9d724CC54d338D8076F878aC6b71';
export const ibcDenom = 'ibc/748375B5DD168C6C4DCBF54B3D54DCF20C2B41572C9603B1B9774419326A5A43';
export const testMessageEncodeDecode = (msg, expBase64) => {
    const bytes = msg.toBinary();
    expect(Buffer.from(bytes).toString('base64')).toBe(expBase64);
    const decoded = msg.fromBinary(bytes);
    expect(decoded.equals(msg)).toBe(true);
};
//# sourceMappingURL=utils.js.map