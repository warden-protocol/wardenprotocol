export const payloadMsgFieldForIndex = (i) => `msg${i}`;
const getPayloadMessages = (payload) => {
    const { msgs } = payload;
    if (!msgs || !Array.isArray(msgs)) {
        throw new TypeError(`invalid payload msgs field: expected JSON array but got ${msgs}`);
    }
    return msgs;
};
const flattenPayloadMessages = (payload) => {
    const msgs = getPayloadMessages(payload);
    msgs.forEach((msg, i) => {
        const key = payloadMsgFieldForIndex(i);
        if (Object.keys(payload).includes(key)) {
            throw new TypeError(`malformed payload, found unexpected key ${key}`);
        }
        if (!msg || !(msg instanceof Object)) {
            throw new TypeError(`invalid msg field, expected JSON object but got ${msg}`);
        }
        payload[key] = msg;
    });
    delete payload.msgs;
    return msgs.length;
};
const flattenPayload = (payload) => {
    const numMessages = flattenPayloadMessages(payload);
    return {
        numMessages,
        payload,
    };
};
export default flattenPayload;
//# sourceMappingURL=flattenPayload.js.map