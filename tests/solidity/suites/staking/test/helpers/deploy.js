const { bn } = require('@aragon/contract-helpers-test/numbers')

const { DEFAULT_STAKE_AMOUNT } = require('./constants')

module.exports = (artifacts) => {
  const StakingFactory = artifacts.require('StakingFactory')
  const Staking = artifacts.require('Staking')
  const StandardTokenMock = artifacts.require('StandardTokenMock')
  const LockManagerMock = artifacts.require('LockManagerMock')

  const getEvent = (receipt, event, arg) => { return receipt.logs.filter(l => l.event === event)[0].args[arg] }

  const deploy = async (owner, initialAmount = DEFAULT_STAKE_AMOUNT.mul(bn(1000))) => {
    const token = await StandardTokenMock.new(owner, initialAmount)

    const staking = await deployStaking(token)

    const lockManager = await LockManagerMock.new()

    return { token, staking, lockManager }
  }

  const deployStaking = async (token) => {
    const factory = await StakingFactory.new()
    const receipt = await factory.getOrCreateInstance(token.address)
    const stakingAddress = getEvent(receipt, 'NewStaking', 'instance')
    const staking = await Staking.at(stakingAddress)

    return staking
  }

  return {
    deploy
  }
}
