export const toUint8Array = (x) => {
  if (x instanceof ArrayBuffer) {
    return new Uint8Array(x);
  } else if (ArrayBuffer.isView(x)) {
    if (x instanceof Uint8Array && x.constructor.name === Uint8Array.name) {
      return x;
    } else {
      return new Uint8Array(x.buffer, x.byteOffset, x.byteLength);
    }
  } else {
    const textEncoder = new TextEncoder();
    return textEncoder.encode(x);
  }
};
