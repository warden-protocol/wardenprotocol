export const NAME = 'Cosmos Web3';
export const VERSION = '1.0.0';
export const VERIFYING_CONTRACT = 'cosmos';
export const SALT = '0';
const createDomain = (chainId) => ({
    name: NAME,
    version: VERSION,
    chainId,
    verifyingContract: VERIFYING_CONTRACT,
    salt: SALT,
});
export default createDomain;
//# sourceMappingURL=createDomain.js.map