import { GenericAuthorization } from '../../proto/cosmos/authz/authz.js';
export const createGenericAuthorization = (typeUrl) => ({
    message: new GenericAuthorization({
        msg: typeUrl,
    }),
    path: GenericAuthorization.typeName,
});
//# sourceMappingURL=generic.js.map