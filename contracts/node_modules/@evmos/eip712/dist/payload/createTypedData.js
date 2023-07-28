import createDomain from './createDomain.js';
import createTypes from './createTypes/index.js';
import flattenPayload from './flattenPayload.js';
export const PRIMARY_TYPE = 'Tx';
const createTypedData = (chainId, stdSignDoc) => {
    const transformResponse = flattenPayload(stdSignDoc);
    const types = createTypes(transformResponse);
    const domain = createDomain(chainId);
    const message = transformResponse.payload;
    return {
        types,
        primaryType: PRIMARY_TYPE,
        domain,
        message,
    };
};
export default createTypedData;
//# sourceMappingURL=createTypedData.js.map