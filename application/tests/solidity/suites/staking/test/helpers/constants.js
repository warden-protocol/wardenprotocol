const { bn, bigExp } = require('@aragon/contract-helpers-test/numbers')
const DEFAULT_STAKE_AMOUNT = bigExp(120, 18)

module.exports = {
  DEFAULT_STAKE_AMOUNT,
  DEFAULT_LOCK_AMOUNT: DEFAULT_STAKE_AMOUNT.div(bn(3)),
  EMPTY_DATA: '0x',
  ZERO_ADDRESS: '0x' + '0'.repeat(40),
  ACTIVATED_LOCK: '0x01'
}
