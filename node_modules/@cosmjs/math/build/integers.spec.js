"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const integers_1 = require("./integers");
describe("Integers", () => {
    describe("Uint32", () => {
        describe("fromBytes", () => {
            it("can be constructed from to byte array", () => {
                expect(integers_1.Uint32.fromBytes([0, 0, 0, 0]).toNumber()).toEqual(0);
                expect(integers_1.Uint32.fromBytes([0, 0, 0, 1]).toNumber()).toEqual(1);
                expect(integers_1.Uint32.fromBytes([0, 0, 0, 42]).toNumber()).toEqual(42);
                expect(integers_1.Uint32.fromBytes([0x3b, 0x9a, 0xca, 0x00]).toNumber()).toEqual(1000000000);
                expect(integers_1.Uint32.fromBytes([0x7f, 0xff, 0xff, 0xff]).toNumber()).toEqual(2147483647);
                expect(integers_1.Uint32.fromBytes([0x80, 0x00, 0x00, 0x00]).toNumber()).toEqual(2147483648);
                expect(integers_1.Uint32.fromBytes([0xff, 0xff, 0xff, 0xff]).toNumber()).toEqual(4294967295);
            });
            it("can be constructed from Buffer", () => {
                expect(integers_1.Uint32.fromBytes(Buffer.from([0, 0, 0, 0])).toNumber()).toEqual(0);
                expect(integers_1.Uint32.fromBytes(Buffer.from([0, 0, 0, 1])).toNumber()).toEqual(1);
                expect(integers_1.Uint32.fromBytes(Buffer.from([0, 0, 0, 42])).toNumber()).toEqual(42);
                expect(integers_1.Uint32.fromBytes(Buffer.from([0x3b, 0x9a, 0xca, 0x00])).toNumber()).toEqual(1000000000);
                expect(integers_1.Uint32.fromBytes(Buffer.from([0x7f, 0xff, 0xff, 0xff])).toNumber()).toEqual(2147483647);
                expect(integers_1.Uint32.fromBytes(Buffer.from([0x80, 0x00, 0x00, 0x00])).toNumber()).toEqual(2147483648);
                expect(integers_1.Uint32.fromBytes(Buffer.from([0xff, 0xff, 0xff, 0xff])).toNumber()).toEqual(4294967295);
            });
            it("throws for invalid input length", () => {
                expect(() => integers_1.Uint32.fromBytes([])).toThrowError(/Invalid input length/);
                expect(() => integers_1.Uint32.fromBytes([0, 0, 0])).toThrowError(/Invalid input length/);
                expect(() => integers_1.Uint32.fromBytes([0, 0, 0, 0, 0])).toThrowError(/Invalid input length/);
            });
            it("throws for invalid values", () => {
                expect(() => integers_1.Uint32.fromBytes([0, 0, 0, -1])).toThrowError(/Invalid value in byte/);
                expect(() => integers_1.Uint32.fromBytes([0, 0, 0, 1.5])).toThrowError(/Invalid value in byte/);
                expect(() => integers_1.Uint32.fromBytes([0, 0, 0, 256])).toThrowError(/Invalid value in byte/);
                expect(() => integers_1.Uint32.fromBytes([0, 0, 0, NaN])).toThrowError(/Invalid value in byte/);
                expect(() => integers_1.Uint32.fromBytes([0, 0, 0, Number.NEGATIVE_INFINITY])).toThrowError(/Invalid value in byte/);
                expect(() => integers_1.Uint32.fromBytes([0, 0, 0, Number.POSITIVE_INFINITY])).toThrowError(/Invalid value in byte/);
            });
            it("works for big and little endian", () => {
                const b = integers_1.Uint32.fromBytes([0x00, 0xa6, 0xb7, 0xd8], "be");
                expect(b.toNumber()).toEqual(0xa6b7d8);
                const l = integers_1.Uint32.fromBytes([0xa6, 0xb7, 0xd8, 0x00], "le");
                expect(l.toNumber()).toEqual(0xd8b7a6);
            });
        });
        describe("fromString", () => {
            it("can be constructed from string", () => {
                {
                    const a = integers_1.Uint32.fromString("0");
                    expect(a.toNumber()).toEqual(0);
                }
                {
                    const a = integers_1.Uint32.fromString("1");
                    expect(a.toNumber()).toEqual(1);
                }
                {
                    const a = integers_1.Uint32.fromString("01");
                    expect(a.toNumber()).toEqual(1);
                }
                {
                    const a = integers_1.Uint32.fromString("4294967295");
                    expect(a.toNumber()).toEqual(4294967295);
                }
            });
            it("throws for invalid string values", () => {
                expect(() => integers_1.Uint32.fromString(" 1")).toThrowError(/invalid string format/i);
                expect(() => integers_1.Uint32.fromString("-1")).toThrowError(/invalid string format/i);
                expect(() => integers_1.Uint32.fromString("+1")).toThrowError(/invalid string format/i);
                expect(() => integers_1.Uint32.fromString("1e6")).toThrowError(/invalid string format/i);
            });
            it("throws for string values exceeding uint32", () => {
                expect(() => integers_1.Uint32.fromString("4294967296")).toThrowError(/input not in uint32 range/i);
                expect(() => integers_1.Uint32.fromString("99999999999999999999")).toThrowError(/input not in uint32 range/i);
            });
        });
        it("can be constructed", () => {
            expect(new integers_1.Uint32(0)).toBeTruthy();
            expect(new integers_1.Uint32(1)).toBeTruthy();
            expect(new integers_1.Uint32(1.0)).toBeTruthy();
            expect(new integers_1.Uint32(42)).toBeTruthy();
            expect(new integers_1.Uint32(1000000000)).toBeTruthy();
            expect(new integers_1.Uint32(2147483647)).toBeTruthy();
            expect(new integers_1.Uint32(2147483648)).toBeTruthy();
            expect(new integers_1.Uint32(4294967295)).toBeTruthy();
        });
        it("throws for invald numbers", () => {
            expect(() => new integers_1.Uint32(NaN)).toThrowError(/not a number/);
            expect(() => new integers_1.Uint32(1.1)).toThrowError(/not an integer/i);
            expect(() => new integers_1.Uint32(Number.NEGATIVE_INFINITY)).toThrowError(/not an integer/i);
            expect(() => new integers_1.Uint32(Number.POSITIVE_INFINITY)).toThrowError(/not an integer/i);
        });
        it("throws for values out of range", () => {
            expect(() => new integers_1.Uint32(-1)).toThrowError(/not in uint32 range/);
            expect(() => new integers_1.Uint32(4294967296)).toThrowError(/not in uint32 range/);
            expect(() => new integers_1.Uint32(Number.MIN_SAFE_INTEGER)).toThrowError(/not in uint32 range/);
            expect(() => new integers_1.Uint32(Number.MAX_SAFE_INTEGER)).toThrowError(/not in uint32 range/);
        });
        it("can convert to number", () => {
            expect(new integers_1.Uint32(0).toNumber()).toEqual(0);
            expect(new integers_1.Uint32(1).toNumber()).toEqual(1);
            expect(new integers_1.Uint32(42).toNumber()).toEqual(42);
            expect(new integers_1.Uint32(1000000000).toNumber()).toEqual(1000000000);
            expect(new integers_1.Uint32(2147483647).toNumber()).toEqual(2147483647);
            expect(new integers_1.Uint32(2147483648).toNumber()).toEqual(2147483648);
            expect(new integers_1.Uint32(4294967295).toNumber()).toEqual(4294967295);
        });
        it("can convert to string", () => {
            expect(new integers_1.Uint32(0).toString()).toEqual("0");
            expect(new integers_1.Uint32(1).toString()).toEqual("1");
            expect(new integers_1.Uint32(42).toString()).toEqual("42");
            expect(new integers_1.Uint32(1000000000).toString()).toEqual("1000000000");
            expect(new integers_1.Uint32(2147483647).toString()).toEqual("2147483647");
            expect(new integers_1.Uint32(2147483648).toString()).toEqual("2147483648");
            expect(new integers_1.Uint32(4294967295).toString()).toEqual("4294967295");
        });
        describe("toBytesBigEndian", () => {
            it("works", () => {
                expect(new integers_1.Uint32(0).toBytesBigEndian()).toEqual(new Uint8Array([0, 0, 0, 0]));
                expect(new integers_1.Uint32(1).toBytesBigEndian()).toEqual(new Uint8Array([0, 0, 0, 1]));
                expect(new integers_1.Uint32(42).toBytesBigEndian()).toEqual(new Uint8Array([0, 0, 0, 42]));
                expect(new integers_1.Uint32(1000000000).toBytesBigEndian()).toEqual(new Uint8Array([0x3b, 0x9a, 0xca, 0x00]));
                expect(new integers_1.Uint32(2147483647).toBytesBigEndian()).toEqual(new Uint8Array([0x7f, 0xff, 0xff, 0xff]));
                expect(new integers_1.Uint32(2147483648).toBytesBigEndian()).toEqual(new Uint8Array([0x80, 0x00, 0x00, 0x00]));
                expect(new integers_1.Uint32(4294967295).toBytesBigEndian()).toEqual(new Uint8Array([0xff, 0xff, 0xff, 0xff]));
            });
        });
        describe("toBytesLittleEndian", () => {
            it("works", () => {
                expect(new integers_1.Uint32(0).toBytesLittleEndian()).toEqual(new Uint8Array([0, 0, 0, 0]));
                expect(new integers_1.Uint32(1).toBytesLittleEndian()).toEqual(new Uint8Array([1, 0, 0, 0]));
                expect(new integers_1.Uint32(42).toBytesLittleEndian()).toEqual(new Uint8Array([42, 0, 0, 0]));
                expect(new integers_1.Uint32(1000000000).toBytesLittleEndian()).toEqual(new Uint8Array([0x00, 0xca, 0x9a, 0x3b]));
                expect(new integers_1.Uint32(2147483647).toBytesLittleEndian()).toEqual(new Uint8Array([0xff, 0xff, 0xff, 0x7f]));
                expect(new integers_1.Uint32(2147483648).toBytesLittleEndian()).toEqual(new Uint8Array([0x00, 0x00, 0x00, 0x80]));
                expect(new integers_1.Uint32(4294967295).toBytesLittleEndian()).toEqual(new Uint8Array([0xff, 0xff, 0xff, 0xff]));
            });
        });
    });
    describe("Int53", () => {
        it("can be constructed", () => {
            expect(new integers_1.Int53(0)).toBeTruthy();
            expect(new integers_1.Int53(1)).toBeTruthy();
            expect(new integers_1.Int53(1.0)).toBeTruthy();
            expect(new integers_1.Int53(42)).toBeTruthy();
            expect(new integers_1.Int53(1000000000)).toBeTruthy();
            expect(new integers_1.Int53(2147483647)).toBeTruthy();
            expect(new integers_1.Int53(2147483648)).toBeTruthy();
            expect(new integers_1.Int53(4294967295)).toBeTruthy();
            expect(new integers_1.Int53(9007199254740991)).toBeTruthy();
            expect(new integers_1.Int53(-1)).toBeTruthy();
            expect(new integers_1.Int53(-42)).toBeTruthy();
            expect(new integers_1.Int53(-2147483648)).toBeTruthy();
            expect(new integers_1.Int53(-2147483649)).toBeTruthy();
            expect(new integers_1.Int53(-9007199254740991)).toBeTruthy();
        });
        it("throws for invald numbers", () => {
            expect(() => new integers_1.Int53(NaN)).toThrowError(/not a number/);
            expect(() => new integers_1.Int53(1.1)).toThrowError(/not an integer/i);
            expect(() => new integers_1.Int53(Number.NEGATIVE_INFINITY)).toThrowError(/not an integer/i);
            expect(() => new integers_1.Int53(Number.POSITIVE_INFINITY)).toThrowError(/not an integer/i);
        });
        it("throws for values out of range", () => {
            expect(() => new integers_1.Int53(Number.MIN_SAFE_INTEGER - 1)).toThrowError(/not in int53 range/);
            expect(() => new integers_1.Int53(Number.MAX_SAFE_INTEGER + 1)).toThrowError(/not in int53 range/);
        });
        it("can convert to number", () => {
            expect(new integers_1.Int53(0).toNumber()).toEqual(0);
            expect(new integers_1.Int53(1).toNumber()).toEqual(1);
            expect(new integers_1.Int53(42).toNumber()).toEqual(42);
            expect(new integers_1.Int53(1000000000).toNumber()).toEqual(1000000000);
            expect(new integers_1.Int53(2147483647).toNumber()).toEqual(2147483647);
            expect(new integers_1.Int53(2147483648).toNumber()).toEqual(2147483648);
            expect(new integers_1.Int53(4294967295).toNumber()).toEqual(4294967295);
            expect(new integers_1.Int53(9007199254740991).toNumber()).toEqual(9007199254740991);
            expect(new integers_1.Int53(-1).toNumber()).toEqual(-1);
            expect(new integers_1.Int53(-9007199254740991).toNumber()).toEqual(-9007199254740991);
        });
        it("can convert to string", () => {
            expect(new integers_1.Int53(0).toString()).toEqual("0");
            expect(new integers_1.Int53(1).toString()).toEqual("1");
            expect(new integers_1.Int53(42).toString()).toEqual("42");
            expect(new integers_1.Int53(1000000000).toString()).toEqual("1000000000");
            expect(new integers_1.Int53(2147483647).toString()).toEqual("2147483647");
            expect(new integers_1.Int53(2147483648).toString()).toEqual("2147483648");
            expect(new integers_1.Int53(4294967295).toString()).toEqual("4294967295");
            expect(new integers_1.Int53(9007199254740991).toString()).toEqual("9007199254740991");
            expect(new integers_1.Int53(-1).toString()).toEqual("-1");
            expect(new integers_1.Int53(-9007199254740991).toString()).toEqual("-9007199254740991");
        });
        it("can be constructed from string", () => {
            expect(integers_1.Int53.fromString("0").toString()).toEqual("0");
            expect(integers_1.Int53.fromString("1").toString()).toEqual("1");
            expect(integers_1.Int53.fromString("9007199254740991").toString()).toEqual("9007199254740991");
            expect(integers_1.Int53.fromString("-1").toString()).toEqual("-1");
            expect(integers_1.Int53.fromString("-9007199254740991").toString()).toEqual("-9007199254740991");
        });
        it("throws for invalid string format", () => {
            expect(() => integers_1.Int53.fromString(" 0")).toThrowError(/invalid string format/i);
            expect(() => integers_1.Int53.fromString("+0")).toThrowError(/invalid string format/i);
            expect(() => integers_1.Int53.fromString("1e6")).toThrowError(/invalid string format/i);
            expect(() => integers_1.Int53.fromString("9007199254740992")).toThrowError(/input not in int53 range/i);
            expect(() => integers_1.Int53.fromString("-9007199254740992")).toThrowError(/input not in int53 range/i);
        });
    });
    describe("Uint53", () => {
        it("can be constructed", () => {
            expect(new integers_1.Uint53(0)).toBeTruthy();
            expect(new integers_1.Uint53(1)).toBeTruthy();
            expect(new integers_1.Uint53(1.0)).toBeTruthy();
            expect(new integers_1.Uint53(42)).toBeTruthy();
            expect(new integers_1.Uint53(1000000000)).toBeTruthy();
            expect(new integers_1.Uint53(2147483647)).toBeTruthy();
            expect(new integers_1.Uint53(2147483648)).toBeTruthy();
            expect(new integers_1.Uint53(4294967295)).toBeTruthy();
            expect(new integers_1.Uint53(9007199254740991)).toBeTruthy();
        });
        it("throws for invald numbers", () => {
            expect(() => new integers_1.Uint53(NaN)).toThrowError(/not a number/);
            expect(() => new integers_1.Uint53(1.1)).toThrowError(/not an integer/i);
            expect(() => new integers_1.Uint53(Number.NEGATIVE_INFINITY)).toThrowError(/not an integer/i);
            expect(() => new integers_1.Uint53(Number.POSITIVE_INFINITY)).toThrowError(/not an integer/i);
        });
        it("throws for values out of range", () => {
            expect(() => new integers_1.Uint53(Number.MIN_SAFE_INTEGER - 1)).toThrowError(/not in int53 range/);
            expect(() => new integers_1.Uint53(Number.MAX_SAFE_INTEGER + 1)).toThrowError(/not in int53 range/);
        });
        it("throws for negative inputs", () => {
            expect(() => new integers_1.Uint53(-1)).toThrowError(/is negative/);
            expect(() => new integers_1.Uint53(-42)).toThrowError(/is negative/);
            expect(() => new integers_1.Uint53(-2147483648)).toThrowError(/is negative/);
            expect(() => new integers_1.Uint53(-2147483649)).toThrowError(/is negative/);
            expect(() => new integers_1.Uint53(-9007199254740991)).toThrowError(/is negative/);
        });
        it("can convert to number", () => {
            expect(new integers_1.Uint53(0).toNumber()).toEqual(0);
            expect(new integers_1.Uint53(1).toNumber()).toEqual(1);
            expect(new integers_1.Uint53(42).toNumber()).toEqual(42);
            expect(new integers_1.Uint53(1000000000).toNumber()).toEqual(1000000000);
            expect(new integers_1.Uint53(2147483647).toNumber()).toEqual(2147483647);
            expect(new integers_1.Uint53(2147483648).toNumber()).toEqual(2147483648);
            expect(new integers_1.Uint53(4294967295).toNumber()).toEqual(4294967295);
            expect(new integers_1.Uint53(9007199254740991).toNumber()).toEqual(9007199254740991);
        });
        it("can convert to string", () => {
            expect(new integers_1.Uint53(0).toString()).toEqual("0");
            expect(new integers_1.Uint53(1).toString()).toEqual("1");
            expect(new integers_1.Uint53(42).toString()).toEqual("42");
            expect(new integers_1.Uint53(1000000000).toString()).toEqual("1000000000");
            expect(new integers_1.Uint53(2147483647).toString()).toEqual("2147483647");
            expect(new integers_1.Uint53(2147483648).toString()).toEqual("2147483648");
            expect(new integers_1.Uint53(4294967295).toString()).toEqual("4294967295");
            expect(new integers_1.Uint53(9007199254740991).toString()).toEqual("9007199254740991");
        });
        it("can be constructed from string", () => {
            expect(integers_1.Uint53.fromString("0").toString()).toEqual("0");
            expect(integers_1.Uint53.fromString("1").toString()).toEqual("1");
            expect(integers_1.Uint53.fromString("9007199254740991").toString()).toEqual("9007199254740991");
        });
        it("throws for invalid string format", () => {
            expect(() => integers_1.Uint53.fromString(" 0")).toThrowError(/invalid string format/i);
            expect(() => integers_1.Uint53.fromString("+0")).toThrowError(/invalid string format/i);
            expect(() => integers_1.Uint53.fromString("1e6")).toThrowError(/invalid string format/i);
            expect(() => integers_1.Uint53.fromString("-9007199254740992")).toThrowError(/input not in int53 range/i);
            expect(() => integers_1.Uint53.fromString("9007199254740992")).toThrowError(/input not in int53 range/i);
            expect(() => integers_1.Uint53.fromString("-1")).toThrowError(/input is negative/i);
        });
    });
    describe("Uint64", () => {
        describe("fromBytes", () => {
            it("can be constructed from bytes", () => {
                integers_1.Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
                integers_1.Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01]);
                integers_1.Uint64.fromBytes([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
            });
            it("can be constructed from Uint8Array", () => {
                integers_1.Uint64.fromBytes(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
            });
            it("throws for wrong number of bytes", () => {
                expect(() => integers_1.Uint64.fromBytes([])).toThrowError(/invalid input length/i);
                expect(() => integers_1.Uint64.fromBytes([0x00])).toThrowError(/invalid input length/i);
                expect(() => integers_1.Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])).toThrowError(/invalid input length/i);
                expect(() => integers_1.Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])).toThrowError(/invalid input length/i);
            });
            it("throws for wrong byte value", () => {
                expect(() => integers_1.Uint64.fromBytes([0, 0, 0, 0, 0, 0, 0, 256])).toThrowError(/invalid value in byte/i);
                expect(() => integers_1.Uint64.fromBytes([0, 0, 0, 0, 0, 0, 0, -1])).toThrowError(/invalid value in byte/i);
                expect(() => integers_1.Uint64.fromBytes([0, 0, 0, 0, 0, 0, 0, 1.5])).toThrowError(/invalid value in byte/i);
                expect(() => integers_1.Uint64.fromBytes([0, 0, 0, 0, 0, 0, 0, Number.NEGATIVE_INFINITY])).toThrowError(/invalid value in byte/i);
                expect(() => integers_1.Uint64.fromBytes([0, 0, 0, 0, 0, 0, 0, Number.POSITIVE_INFINITY])).toThrowError(/invalid value in byte/i);
                expect(() => integers_1.Uint64.fromBytes([0, 0, 0, 0, 0, 0, 0, Number.NaN])).toThrowError(/invalid value in byte/i);
            });
            it("works for big and little endian", () => {
                const b = integers_1.Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0xa6, 0xb7, 0xd8], "be");
                expect(b.toNumber()).toEqual(0xa6b7d8);
                const l = integers_1.Uint64.fromBytes([0xa6, 0xb7, 0xd8, 0x00, 0x00, 0x00, 0x00, 0x00], "le");
                expect(l.toNumber()).toEqual(0xd8b7a6);
            });
        });
        describe("fromString", () => {
            it("can be constructed from string", () => {
                {
                    const a = integers_1.Uint64.fromString("0");
                    expect(a).toBeTruthy();
                }
                {
                    const a = integers_1.Uint64.fromString("1");
                    expect(a).toBeTruthy();
                }
                {
                    const a = integers_1.Uint64.fromString("01");
                    expect(a).toBeTruthy();
                }
                {
                    const a = integers_1.Uint64.fromString("9999999999999999999");
                    expect(a).toBeTruthy();
                }
                {
                    const a = integers_1.Uint64.fromString("18446744073709551615");
                    expect(a).toBeTruthy();
                }
            });
            it("throws for invalid string values", () => {
                expect(() => integers_1.Uint64.fromString(" 1")).toThrowError(/invalid string format/i);
                expect(() => integers_1.Uint64.fromString("-1")).toThrowError(/invalid string format/i);
                expect(() => integers_1.Uint64.fromString("+1")).toThrowError(/invalid string format/i);
                expect(() => integers_1.Uint64.fromString("1e6")).toThrowError(/invalid string format/i);
            });
            it("throws for string values exceeding uint64", () => {
                expect(() => integers_1.Uint64.fromString("18446744073709551616")).toThrowError(/input exceeds uint64 range/i);
                expect(() => integers_1.Uint64.fromString("99999999999999999999")).toThrowError(/input exceeds uint64 range/i);
            });
        });
        describe("fromNumber", () => {
            it("can be constructed from number", () => {
                const a = integers_1.Uint64.fromNumber(0);
                expect(a.toNumber()).toEqual(0);
                const b = integers_1.Uint64.fromNumber(1);
                expect(b.toNumber()).toEqual(1);
                const c = integers_1.Uint64.fromNumber(Number.MAX_SAFE_INTEGER);
                expect(c.toNumber()).toEqual(Number.MAX_SAFE_INTEGER);
            });
            it("throws when constructed from wrong numbers", () => {
                // not a number
                expect(() => integers_1.Uint64.fromNumber(Number.NaN)).toThrowError(/input is not a number/i);
                // not an integer
                expect(() => integers_1.Uint64.fromNumber(1.1)).toThrowError(/input is not an integer/i);
                expect(() => integers_1.Uint64.fromNumber(Number.NEGATIVE_INFINITY)).toThrowError(/input is not an integer/i);
                expect(() => integers_1.Uint64.fromNumber(Number.POSITIVE_INFINITY)).toThrowError(/input is not an integer/i);
                // not a safe integer
                expect(() => integers_1.Uint64.fromNumber(Number.MAX_SAFE_INTEGER + 1)).toThrowError(/input is not a safe integer/i);
                // negative integer
                expect(() => integers_1.Uint64.fromNumber(-1)).toThrowError(/input is negative/i);
                expect(() => integers_1.Uint64.fromNumber(Number.MIN_SAFE_INTEGER)).toThrowError(/input is negative/i);
            });
        });
        it("can export bytes (big endian)", () => {
            expect(integers_1.Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).toBytesBigEndian()).toEqual(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
            expect(integers_1.Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01]).toBytesBigEndian()).toEqual(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01]));
            expect(integers_1.Uint64.fromBytes([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).toBytesBigEndian()).toEqual(new Uint8Array([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
            expect(integers_1.Uint64.fromBytes([0xab, 0x22, 0xbc, 0x5f, 0xa9, 0x20, 0x4e, 0x0d]).toBytesBigEndian()).toEqual(new Uint8Array([0xab, 0x22, 0xbc, 0x5f, 0xa9, 0x20, 0x4e, 0x0d]));
            expect(integers_1.Uint64.fromBytes([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]).toBytesBigEndian()).toEqual(new Uint8Array([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]));
        });
        it("can export bytes (little endian)", () => {
            expect(integers_1.Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).toBytesLittleEndian()).toEqual(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
            expect(integers_1.Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01]).toBytesLittleEndian()).toEqual(new Uint8Array([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
            expect(integers_1.Uint64.fromBytes([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]).toBytesLittleEndian()).toEqual(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01]));
            expect(integers_1.Uint64.fromBytes([0xab, 0x22, 0xbc, 0x5f, 0xa9, 0x20, 0x4e, 0x0d]).toBytesLittleEndian()).toEqual(new Uint8Array([0x0d, 0x4e, 0x20, 0xa9, 0x5f, 0xbc, 0x22, 0xab]));
            expect(integers_1.Uint64.fromBytes([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]).toBytesLittleEndian()).toEqual(new Uint8Array([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]));
        });
        it("can export strings", () => {
            {
                const a = integers_1.Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
                expect(a.toString()).toEqual("0");
            }
            {
                const a = integers_1.Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01]);
                expect(a.toString()).toEqual("1");
            }
            {
                const a = integers_1.Uint64.fromBytes([0x8a, 0xc7, 0x23, 0x04, 0x89, 0xe7, 0xff, 0xff]);
                expect(a.toString()).toEqual("9999999999999999999");
            }
            {
                const a = integers_1.Uint64.fromBytes([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
                expect(a.toString()).toEqual("18446744073709551615");
            }
        });
        it("can export numbers", () => {
            {
                const a = integers_1.Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
                expect(a.toNumber()).toEqual(0);
            }
            {
                const a = integers_1.Uint64.fromBytes([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01]);
                expect(a.toNumber()).toEqual(1);
            }
            {
                // value too large for 53 bit integer
                const a = integers_1.Uint64.fromBytes([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
                expect(() => a.toNumber()).toThrowError(/number can only safely store up to 53 bits/i);
            }
            {
                // Number.MAX_SAFE_INTEGER + 1
                const a = integers_1.Uint64.fromBytes([0x00, 0x20, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
                expect(() => a.toNumber()).toThrowError(/number can only safely store up to 53 bits/i);
            }
        });
    });
});
//# sourceMappingURL=integers.spec.js.map