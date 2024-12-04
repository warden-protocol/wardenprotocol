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

export function notEmpty(arr: Uint8Array | undefined): boolean {
  return arr && arr.length > 0 || false;
}

export function empty(arr: Uint8Array | undefined): boolean {
  return !notEmpty(arr);
}
