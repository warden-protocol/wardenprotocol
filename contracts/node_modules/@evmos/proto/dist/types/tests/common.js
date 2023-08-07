import { MsgSend } from '../cosmos/bank/tx';
import { PubKey } from '../ethermint/crypto/keys';
import { GenericAuthorization } from '../cosmos/authz/authz';
import { MsgVote } from '../cosmos/gov/tx';
const parseType = (msgs, typeName) => {
    for (const m of msgs) {
        if (`/${m.typeName}` === typeName) {
            return m;
        }
    }
    return undefined;
};
const registry = {
    findMessage: (typeName) => {
        const msgs = [MsgSend, PubKey, GenericAuthorization, MsgVote];
        return parseType(msgs, typeName);
    },
};
export const JSONOptions = {
    emitDefaultValues: true,
    enumAsInteger: true,
    useProtoFieldName: true,
    typeRegistry: registry,
};
//# sourceMappingURL=common.js.map