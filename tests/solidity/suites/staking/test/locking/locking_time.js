const { assertRevert } = require('@aragon/contract-helpers-test/assertThrow')
const { bn, assertBn } = require('@aragon/contract-helpers-test/numbers')

const { deploy } = require('../helpers/deploy')(artifacts)
const { approveAndStake } = require('../helpers/helpers')(artifacts)
const { DEFAULT_STAKE_AMOUNT, DEFAULT_LOCK_AMOUNT, EMPTY_DATA } = require('../helpers/constants')
const { STAKING_ERRORS, TIME_LOCK_MANAGER_ERRORS } = require('../helpers/errors')

const TimeLockManagerMock = artifacts.require('TimeLockManagerMock');

contract('Staking app, Time locking', ([owner]) => {
  let token, staking, manager

  const TIME_UNIT_BLOCKS = 0
  const TIME_UNIT_SECONDS = 1

  const DEFAULT_TIME = 1000
  const DEFAULT_BLOCKS = 10

  const approveStakeAndLock = async(unit, start, end, lockAmount = DEFAULT_LOCK_AMOUNT, stakeAmount = DEFAULT_STAKE_AMOUNT) => {
    await approveAndStake({ staking, amount: stakeAmount, from: owner })
    // allow manager
    await staking.allowManager(manager.address, lockAmount, EMPTY_DATA)
    // lock amount
    await manager.lock(staking.address, owner, lockAmount, unit, start, end)
  }

  beforeEach(async () => {
    const deployment = await deploy(owner)
    token = deployment.token
    staking = deployment.staking

    manager = await TimeLockManagerMock.new()
  })

  it('locks using seconds', async () => {
    const startTime = await manager.getTimestampExt()
    const endTime = startTime.add(bn(DEFAULT_TIME))
    await approveStakeAndLock(TIME_UNIT_SECONDS, startTime, endTime)

    // check lock values
    const { _amount, _allowance } = await staking.getLock(owner, manager.address)
    assertBn(_amount, DEFAULT_LOCK_AMOUNT, "locked amount should match")
    assertBn(_allowance, DEFAULT_LOCK_AMOUNT, "locked allowance should match")

    // check time values
    const { unit, start, end } = await manager.getTimeInterval(owner)
    assert.equal(unit.toString(), TIME_UNIT_SECONDS.toString(), "interval unit should match")
    assert.equal(start.toString(), startTime.toString(), "interval start should match")
    assert.equal(end.toString(), endTime.toString(), "interval end should match")

    // can not unlock
    assert.equal(await staking.canUnlock(owner, owner, manager.address, 0), false, "Shouldn't be able to unlock")
    assertBn(await staking.unlockedBalanceOf(owner), DEFAULT_STAKE_AMOUNT.sub(DEFAULT_LOCK_AMOUNT), "Unlocked balance should match")

    await manager.setTimestamp(endTime.add(bn(1)))
    // can unlock
    assert.equal(await staking.canUnlock(owner, owner, manager.address, 0), true, "Should be able to unlock")
    assertBn(await staking.unlockedBalanceOf(owner), DEFAULT_STAKE_AMOUNT.sub(DEFAULT_LOCK_AMOUNT), "Unlocked balance should match")
  })

  it('locks using blocks', async () => {
    const startBlock = (await manager.getBlockNumberExt())
    const endBlock = startBlock.add(bn(DEFAULT_BLOCKS))
    await approveStakeAndLock(TIME_UNIT_BLOCKS, startBlock, endBlock)

    // check lock values
    const { _amount, _allowance } = await staking.getLock(owner, manager.address)
    assertBn(_amount, DEFAULT_LOCK_AMOUNT, "locked amount should match")
    assertBn(_allowance, DEFAULT_LOCK_AMOUNT, "locked allowance should match")

    // check time values
    const { unit, start, end } = await manager.getTimeInterval(owner)
    assert.equal(unit.toString(), TIME_UNIT_BLOCKS.toString(), "interval unit should match")
    assert.equal(start.toString(), startBlock.toString(), "interval start should match")
    assert.equal(end.toString(), endBlock.toString(), "interval end should match")

    // can not unlock
    assert.equal(await staking.canUnlock(owner, owner, manager.address, 0), false, "Shouldn't be able to unlock")
    assertBn(await staking.unlockedBalanceOf(owner), DEFAULT_STAKE_AMOUNT.sub(DEFAULT_LOCK_AMOUNT), "Unlocked balance should match")

    await manager.setBlockNumber(endBlock.add(bn(1)))
    // can unlock
    assert.equal(await staking.canUnlock(owner, owner, manager.address, 0), true, "Should be able to unlock")
  })

  it('fails to unlock if can not unlock', async () => {
    const startTime = await manager.getTimestampExt()
    const endTime = startTime.add(bn(DEFAULT_TIME))
    await approveStakeAndLock(TIME_UNIT_SECONDS, startTime, endTime)

    // tries to unlock
    await assertRevert(staking.unlockAndRemoveManager(owner, manager.address)/*, STAKING_ERRORS.ERROR_CANNOT_UNLOCK*/)
  })

  it('fails trying to lock twice', async () => {
    const startTime = await manager.getTimestampExt()
    const endTime = startTime.add(bn(DEFAULT_TIME))
    await approveStakeAndLock(TIME_UNIT_SECONDS, startTime, endTime)

    await assertRevert(manager.lock(staking.address, owner, DEFAULT_LOCK_AMOUNT, TIME_UNIT_SECONDS, startTime, endTime)/*, TIME_LOCK_MANAGER_ERRORS.ERROR_ALREADY_LOCKED*/)
  })


  it('fails trying to lock with wrong interval', async () => {
    const startTime = await manager.getTimestampExt()
    const endTime = startTime.add(bn(DEFAULT_TIME))

    await ({ staking, amount: DEFAULT_STAKE_AMOUNT, from: owner })
    // allow manager
    await staking.allowManager(manager.address, DEFAULT_STAKE_AMOUNT, EMPTY_DATA)
    // times are reverted!
    await assertRevert(manager.lock(staking.address, owner, DEFAULT_LOCK_AMOUNT, TIME_UNIT_SECONDS, endTime, startTime)/*, TIME_LOCK_MANAGER_ERRORS.ERROR_WRONG_INTERVAL*/)
  })
})
