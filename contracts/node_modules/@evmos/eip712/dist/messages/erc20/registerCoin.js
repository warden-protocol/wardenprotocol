export const REGISTER_COIN_TYPES = {
    ContentValue: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'metadata', type: 'TypeMetadata[]' },
    ],
    TypeMetadata: [
        { name: 'description', type: 'string' },
        { name: 'denomUnits', type: 'TypeDenomUnit[]' },
        { name: 'base', type: 'string' },
        { name: 'display', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'symbol', type: 'string' },
        { name: 'uri', type: 'string' },
        { name: 'uriHash', type: 'string' },
    ],
    TypeDenomUnit: [
        { name: 'denom', type: 'string' },
        { name: 'exponent', type: 'number' },
        { name: 'aliases', type: 'string[]' },
    ],
};
export function createRegisterCoin(title, description, metadata) {
    return {
        type: 'erc20/RegisterCoinProposal',
        value: {
            title,
            description,
            metadata,
        },
    };
}
//# sourceMappingURL=registerCoin.js.map