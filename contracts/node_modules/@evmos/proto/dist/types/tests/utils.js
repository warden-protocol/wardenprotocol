export const testMessageEncodeDecode = (msg, expBase64) => {
    const bytes = msg.toBinary();
    expect(Buffer.from(bytes).toString('base64')).toBe(expBase64);
    const decoded = msg.fromBinary(bytes);
    expect(decoded.equals(msg)).toBe(true);
};
export const from = 'evmos1pmk2r32ssqwps42y3c9d4clqlca403yd9wymgr';
export const to = 'evmos12nml2w93uva0smjw3c36stczfay0k67ny94ecz';
export const val = 'evmosvaloper14rajuselkxsvqtqv20lamd08t8zxg8qdw3r3xm';
export const denom = 'aevmos';
export const hex = '0xe2D61e49ff8a9d724CC54d338D8076F878aC6b71';
//# sourceMappingURL=utils.js.map