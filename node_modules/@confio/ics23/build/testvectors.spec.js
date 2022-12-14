"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const compress_1 = require("./compress");
const codecimpl_1 = require("./generated/codecimpl");
const ics23_1 = require("./ics23");
const proofs_1 = require("./proofs");
const testhelpers_spec_1 = require("./testhelpers.spec");
describe("calculateExistenceRoot", () => {
    function loadFile(filepath) {
        const content = (0, fs_1.readFileSync)(filepath).toString();
        const { root, proof, key, value } = JSON.parse(content);
        expect(proof).toBeDefined();
        expect(root).toBeDefined();
        expect(key).toBeDefined();
        const commit = codecimpl_1.ics23.CommitmentProof.decode((0, testhelpers_spec_1.fromHex)(proof));
        const data = {
            root: (0, testhelpers_spec_1.fromHex)(root),
            key: (0, testhelpers_spec_1.fromHex)(key),
            value: value ? (0, testhelpers_spec_1.fromHex)(value) : undefined,
        };
        return { proof: commit, data };
    }
    function validateTestVector(filepath, spec) {
        const { proof, data: { root, key, value }, } = loadFile(filepath);
        if (value) {
            const valid = (0, ics23_1.verifyMembership)(proof, spec, root, key, value);
            expect(valid).toBe(true);
        }
        else {
            const valid = (0, ics23_1.verifyNonMembership)(proof, spec, root, key);
            expect(valid).toBe(true);
        }
    }
    it("should parse iavl left", () => {
        validateTestVector("../testdata/iavl/exist_left.json", proofs_1.iavlSpec);
    });
    it("should parse iavl right", () => {
        validateTestVector("../testdata/iavl/exist_right.json", proofs_1.iavlSpec);
    });
    it("should parse iavl middle", () => {
        validateTestVector("../testdata/iavl/exist_middle.json", proofs_1.iavlSpec);
    });
    it("should parse iavl left - nonexist", () => {
        validateTestVector("../testdata/iavl/nonexist_left.json", proofs_1.iavlSpec);
    });
    it("should parse iavl right - nonexist", () => {
        validateTestVector("../testdata/iavl/nonexist_right.json", proofs_1.iavlSpec);
    });
    it("should parse iavl middle - nonexist", () => {
        validateTestVector("../testdata/iavl/nonexist_middle.json", proofs_1.iavlSpec);
    });
    it("should parse tendermint left", () => {
        validateTestVector("../testdata/tendermint/exist_left.json", proofs_1.tendermintSpec);
    });
    it("should parse tendermint right", () => {
        validateTestVector("../testdata/tendermint/exist_right.json", proofs_1.tendermintSpec);
    });
    it("should parse tendermint middle", () => {
        validateTestVector("../testdata/tendermint/exist_middle.json", proofs_1.tendermintSpec);
    });
    it("should parse tendermint left - nonexist", () => {
        validateTestVector("../testdata/tendermint/nonexist_left.json", proofs_1.tendermintSpec);
    });
    it("should parse tendermint right - nonexist", () => {
        validateTestVector("../testdata/tendermint/nonexist_right.json", proofs_1.tendermintSpec);
    });
    it("should parse tendermint middle - nonexist", () => {
        validateTestVector("../testdata/tendermint/nonexist_middle.json", proofs_1.tendermintSpec);
    });
    function loadBatch(files) {
        let refs = [];
        let entries = [];
        for (const file of files) {
            const { proof, data } = loadFile(file);
            refs = [...refs, data];
            if (proof.exist) {
                entries = [...entries, { exist: proof.exist }];
            }
            else if (proof.nonexist) {
                entries = [...entries, { nonexist: proof.nonexist }];
            }
        }
        const commit = {
            batch: {
                entries: entries,
            },
        };
        return {
            proof: commit,
            data: refs,
        };
    }
    function validateBatch(proof, spec, data) {
        const { root, key, value } = data;
        if (value) {
            let valid = (0, ics23_1.verifyMembership)(proof, spec, root, key, value);
            expect(valid).toBe(true);
            const items = new Map([[key, value]]);
            valid = (0, ics23_1.batchVerifyMembership)(proof, spec, root, items);
            expect(valid).toBe(true);
        }
        else {
            let valid = (0, ics23_1.verifyNonMembership)(proof, spec, root, key);
            expect(valid).toBe(true);
            const keys = [key];
            valid = (0, ics23_1.batchVerifyNonMembership)(proof, spec, root, keys);
            expect(valid).toBe(true);
        }
    }
    it("should validate iavl batch exist", () => {
        const { proof, data } = loadBatch([
            "../testdata/iavl/exist_left.json",
            "../testdata/iavl/exist_right.json",
            "../testdata/iavl/exist_middle.json",
            "../testdata/iavl/nonexist_left.json",
            "../testdata/iavl/nonexist_right.json",
            "../testdata/iavl/nonexist_middle.json",
        ]);
        validateBatch(proof, proofs_1.iavlSpec, data[0]);
    });
    it("should validate iavl batch nonexist", () => {
        const { proof, data } = loadBatch([
            "../testdata/iavl/exist_left.json",
            "../testdata/iavl/exist_right.json",
            "../testdata/iavl/exist_middle.json",
            "../testdata/iavl/nonexist_left.json",
            "../testdata/iavl/nonexist_right.json",
            "../testdata/iavl/nonexist_middle.json",
        ]);
        validateBatch(proof, proofs_1.iavlSpec, data[5]);
    });
    it("should validate compressed iavl batch exist", () => {
        const { proof, data } = loadBatch([
            "../testdata/iavl/exist_left.json",
            "../testdata/iavl/exist_right.json",
            "../testdata/iavl/exist_middle.json",
            "../testdata/iavl/nonexist_left.json",
            "../testdata/iavl/nonexist_right.json",
            "../testdata/iavl/nonexist_middle.json",
        ]);
        const small = (0, compress_1.compress)(proof);
        // ensure this is acutally a different format
        const origBin = codecimpl_1.ics23.CommitmentProof.encode(proof).finish();
        const origBin2 = codecimpl_1.ics23.CommitmentProof.encode(proof).finish();
        const smallBin = codecimpl_1.ics23.CommitmentProof.encode(small).finish();
        expect(origBin).toEqual(origBin2);
        expect(origBin).not.toEqual(smallBin);
        validateBatch(small, proofs_1.iavlSpec, data[0]);
    });
    it("should validate compressed iavl batch nonexist", () => {
        const { proof, data } = loadBatch([
            "../testdata/iavl/exist_left.json",
            "../testdata/iavl/exist_right.json",
            "../testdata/iavl/exist_middle.json",
            "../testdata/iavl/nonexist_left.json",
            "../testdata/iavl/nonexist_right.json",
            "../testdata/iavl/nonexist_middle.json",
        ]);
        const small = (0, compress_1.compress)(proof);
        // ensure this is acutally a different format
        const origBin = codecimpl_1.ics23.CommitmentProof.encode(proof).finish();
        const origBin2 = codecimpl_1.ics23.CommitmentProof.encode(proof).finish();
        const smallBin = codecimpl_1.ics23.CommitmentProof.encode(small).finish();
        expect(origBin).toEqual(origBin2);
        expect(origBin).not.toEqual(smallBin);
        validateBatch(small, proofs_1.iavlSpec, data[5]);
    });
    it("should validate tendermint batch exist", () => {
        const { proof, data } = loadBatch([
            "../testdata/tendermint/exist_left.json",
            "../testdata/tendermint/exist_right.json",
            "../testdata/tendermint/exist_middle.json",
            "../testdata/tendermint/nonexist_left.json",
            "../testdata/tendermint/nonexist_right.json",
            "../testdata/tendermint/nonexist_middle.json",
        ]);
        validateBatch(proof, proofs_1.tendermintSpec, data[2]);
    });
    it("should validate tendermint batch nonexist", () => {
        const { proof, data } = loadBatch([
            "../testdata/tendermint/exist_left.json",
            "../testdata/tendermint/exist_right.json",
            "../testdata/tendermint/exist_middle.json",
            "../testdata/tendermint/nonexist_left.json",
            "../testdata/tendermint/nonexist_right.json",
            "../testdata/tendermint/nonexist_middle.json",
        ]);
        validateBatch(proof, proofs_1.tendermintSpec, data[3]);
    });
});
//# sourceMappingURL=testvectors.spec.js.map