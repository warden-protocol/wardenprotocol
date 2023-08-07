import { JSONObject } from './types.js';
export declare const PRIMARY_TYPE = "Tx";
declare const createTypedData: (chainId: number, stdSignDoc: JSONObject) => {
    types: JSONObject;
    primaryType: string;
    domain: {
        name: string;
        version: string;
        chainId: number;
        verifyingContract: string;
        salt: string;
    };
    message: JSONObject;
};
export default createTypedData;
//# sourceMappingURL=createTypedData.d.ts.map