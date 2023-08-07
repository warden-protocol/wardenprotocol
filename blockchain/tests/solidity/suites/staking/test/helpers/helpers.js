const { assertRevert } = require('@aragon/contract-helpers-test/assertThrow')
const { bn, assertBn } = require('@aragon/contract-helpers-test/numbers')

const { DEFAULT_STAKE_AMOUNT, DEFAULT_LOCK_AMOUNT, EMPTY_DATA, ZERO_ADDRESS } = require('./constants')
const { STAKING_ERRORS } = require('../helpers/errors')

module.exports = (artifacts) => {
  const StandardTokenMock = artifacts.require('StandardTokenMock')
  const LockManagerMock = artifacts.require('LockManagerMock')

  const approveAndStake = async ({ staking, amount = DEFAULT_STAKE_AMOUNT, from }) => {
    const token = await StandardTokenMock.at(await staking.token())
    await token.approve(staking.address, amount, { from })
    await staking.stake(amount, EMPTY_DATA, { from })
  }

  const approveStakeAndLock = async ({
    staking,
    manager,
    allowanceAmount = DEFAULT_LOCK_AMOUNT,
    lockAmount = DEFAULT_LOCK_AMOUNT,
    stakeAmount = DEFAULT_STAKE_AMOUNT,
    data = EMPTY_DATA,
    from
  }) => {
    await approveAndStake({ staking, stake: stakeAmount, from })
    const receipt = await staking.allowManagerAndLock(lockAmount, manager, allowanceAmount, data, { from })

    return receipt
  }

  // funds flows helpers

  function UserState(address, walletBalance) {
    this.address = address
    this.walletBalance = walletBalance
    this.stakedBalance = bn(0)
    this.lockedBalance = bn(0)

    this.walletAdd = (amount) => { this.walletBalance = this.walletBalance.add(amount) }
    this.walletSub = (amount) => { this.walletBalance = this.walletBalance.sub(amount) }

    this.stakedAdd = (amount) => { this.stakedBalance = this.stakedBalance.add(amount) }
    this.stakedSub = (amount) => { this.stakedBalance = this.stakedBalance.sub(amount) }

    this.lockedAdd = (amount) => { this.lockedBalance = this.lockedBalance.add(amount) }
    this.lockedSub = (amount) => { this.lockedBalance = this.lockedBalance.sub(amount) }

    this.totalBalance = () => this.walletBalance.add(this.stakedBalance)
  }

  const approveAndStakeWithState = async ({ staking, amount = DEFAULT_STAKE_AMOUNT, user }) => {
    await approveAndStake({ staking, amount, from: user.address })
    user.walletSub(amount)
    user.stakedAdd(amount)
  }

  const approveStakeAndLockWithState = async ({
    staking,
    manager,
    allowanceAmount = DEFAULT_LOCK_AMOUNT,
    lockAmount = DEFAULT_LOCK_AMOUNT,
    stakeAmount = DEFAULT_STAKE_AMOUNT,
    data = EMPTY_DATA,
    user
  }) => {
    await approveStakeAndLock({ staking, manager, allowanceAmount, lockAmount, stakeAmount, data, from: user.address })
    user.walletSub(stakeAmount)
    user.stakedAdd(stakeAmount)
    user.lockedAdd(lockAmount)
  }

  const unstakeWithState = async ({ staking, unstakeAmount, user }) => {
    await staking.unstake(unstakeAmount, EMPTY_DATA, { from: user.address })
    user.walletAdd(unstakeAmount)
    user.stakedSub(unstakeAmount)
  }

  const unlockWithState = async ({ staking, managerAddress, unlockAmount, user }) => {
    await staking.unlock(user.address, managerAddress, unlockAmount, { from: user.address })
    user.lockedSub(unlockAmount)
  }

  const unlockFromManagerWithState = async ({ staking, lockManager, unlockAmount, user }) => {
    await lockManager.unlock(staking.address, user.address, unlockAmount, { from: user.address })
    user.lockedSub(unlockAmount)
  }

  const transferWithState = async ({ staking, transferAmount, userFrom, userTo }) => {
    await staking.transfer(userTo.address, transferAmount, { from: userFrom.address })
    userTo.stakedAdd(transferAmount)
    userFrom.stakedSub(transferAmount)
  }

  const transferAndUnstakeWithState = async ({ staking, transferAmount, userFrom, userTo }) => {
    await staking.transferAndUnstake(userTo.address, transferAmount, { from: userFrom.address })
    userTo.walletAdd(transferAmount)
    userFrom.stakedSub(transferAmount)
  }

  const slashWithState = async ({ staking, slashAmount, userFrom, userTo, managerAddress }) => {
    await staking.slash(userFrom.address, userTo.address, slashAmount, { from: managerAddress })
    userTo.stakedAdd(slashAmount)
    userFrom.stakedSub(slashAmount)
    userFrom.lockedSub(slashAmount)
  }

  const slashAndUnstakeWithState = async ({ staking, slashAmount, userFrom, userTo, managerAddress }) => {
    await staking.slashAndUnstake(userFrom.address, userTo.address, slashAmount, { from: managerAddress })
    userTo.walletAdd(slashAmount)
    userFrom.stakedSub(slashAmount)
    userFrom.lockedSub(slashAmount)
  }

  const slashFromContractWithState = async ({ staking, slashAmount, userFrom, userTo, lockManager }) => {
    await lockManager.slash(staking.address, userFrom.address, userTo.address, slashAmount)
    userTo.stakedAdd(slashAmount)
    userFrom.stakedSub(slashAmount)
    userFrom.lockedSub(slashAmount)
  }

  const slashAndUnstakeFromContractWithState = async ({ staking, slashAmount, userFrom, userTo, lockManager }) => {
    await lockManager.slashAndUnstake(staking.address, userFrom.address, userTo.address, slashAmount)
    userTo.walletAdd(slashAmount)
    userFrom.stakedSub(slashAmount)
    userFrom.lockedSub(slashAmount)
  }

  // check that real user balances (token in external wallet, staked and locked) match with accounted in state
  const checkUserBalances = async ({ staking, users }) => {
    const token = await StandardTokenMock.at(await staking.token())
    await Promise.all(
      users.map(async (user) => {
        assertBn(user.walletBalance, await token.balanceOf(user.address), 'token balance doesn’t match')
        const balances = await staking.getBalancesOf(user.address)
        assertBn(user.stakedBalance, balances.staked, 'staked balance doesn’t match')
        assertBn(user.lockedBalance, balances.locked, 'locked balance doesn’t match')
      })
    )
  }

  // check that Staking contract total staked matches with:
  // - total staked by users in state (must go in combination with checkUserBalances, to make sure this is legit)
  // - token balance of staking app
  const checkTotalStaked = async ({ staking, users }) => {
    const totalStaked = await staking.totalStaked()
    const totalStakedState = users.reduce((total, user) => total.add(user.stakedBalance), bn(0))
    assertBn(totalStaked, totalStakedState, 'total staked doesn’t match')
    const token = await StandardTokenMock.at(await staking.token())
    const stakingTokenBalance = await token.balanceOf(staking.address)
    assertBn(totalStaked, stakingTokenBalance, 'Staking token balance doesn’t match')
  }

  // check that staked balance is greater than locked balance for all users
  // uses local state for efficiency, so it must go with checkUserBalances
  const checkStakeAndLock = ({ staking, users }) => {
    users.map(user => assert.isTrue(user.stakedBalance.gte(user.lockedBalance)))
  }

  // check that allowed balance is always greater than locked balance, for all pairs of owner-manager
  const checkAllowanceAndLock = async ({ staking, users, managers }) => {
    await Promise.all(
      users.map(async (user) => await Promise.all(
        managers.map(async (manager) => {
          const lock = await staking.getLock(user.address, manager)
          assert.isTrue(lock._amount.lte(lock._allowance))
        })
      ))
    )
  }

  // check that users can’t unstake more than unlocked balance
  const checkOverUnstaking = async ({ staking, users }) => {
    await Promise.all(
      users.map(async (user) => {
        await assertRevert(
          staking.unstake(user.stakedBalance.sub(user.lockedBalance).add(bn(1)), EMPTY_DATA, { from: user.address })/*,
          STAKING_ERRORS.ERROR_NOT_ENOUGH_BALANCE
          */
        )
      })
    )
  }

  // check that users can’t unlock more than locked balance
  const checkOverUnlocking = async ({ staking, users, managers }) => {
    await Promise.all(
      users.map(async (user) => await Promise.all(
        managers.map(async (manager) => {
          const lock = await staking.getLock(user.address, manager)
          // const errorMessage = lock._allowance.gt(bn(0)) ? STAKING_ERRORS.ERROR_NOT_ENOUGH_LOCK : STAKING_ERRORS.ERROR_LOCK_DOES_NOT_EXIST
          await assertRevert(
            staking.unlock(user.address, manager, user.lockedBalance.add(bn(1)), { from: user.address })/*,
            errorMessage
            */
          )
        })
      ))
    )
  }

  // check that users can’t transfer more than unlocked balance
  const checkOverTransferring = async ({ staking, users }) => {
    await Promise.all(
      users.map(async (user) => {
        const to = user.address === users[0].address ? users[1].address : users[0].address
        await assertRevert(
          staking.transfer(to, user.stakedBalance.sub(user.lockedBalance).add(bn(1)), { from: user.address })/*,
          STAKING_ERRORS.ERROR_NOT_ENOUGH_BALANCE
          */
        )
        await assertRevert(
          staking.transferAndUnstake(to, user.stakedBalance.sub(user.lockedBalance).add(bn(1)), { from: user.address })/*,
          STAKING_ERRORS.ERROR_NOT_ENOUGH_BALANCE
          */
        )
      })
    )
  }

  // check that managers can’t slash more than locked balance
  const checkOverSlashing = async ({ staking, users, managers }) => {
    await Promise.all(
      users.map(async (user) => {
        const to = user.address === users[0].address ? users[1].address : users[0].address
        for (let i = 0; i < managers.length - 1; i++) {
          await assertRevert(
            staking.slash(user.address, to, user.lockedBalance.add(bn(1)), { from: managers[i] })/*,
            STAKING_ERRORS.ERROR_NOT_ENOUGH_LOCK
            */
          )
          await assertRevert(
            staking.slashAndUnstake(user.address, to, user.lockedBalance.add(bn(1)), { from: managers[i] }),/*
            STAKING_ERRORS.ERROR_NOT_ENOUGH_LOCK
            */
          )
        }
        // last in the array is a contract
        const lockManagerAddress = managers[managers.length - 1]
        const lockManager = await LockManagerMock.at(lockManagerAddress)
        await assertRevert(
          lockManager.slash(staking.address, user.address, to, user.lockedBalance.add(bn(1))),/*
          STAKING_ERRORS.ERROR_NOT_ENOUGH_LOCK
          */
        )
        await assertRevert(
          lockManager.slashAndUnstake(staking.address, user.address, to, user.lockedBalance.add(bn(1))),/*
          STAKING_ERRORS.ERROR_NOT_ENOUGH_LOCK
          */
        )
      })
    )
  }

  const checkInvariants = async ({ staking, users, managers }) => {
    await checkUserBalances({ staking, users })
    await checkTotalStaked({ staking, users })
    checkStakeAndLock({ staking, users })
    await checkAllowanceAndLock({ staking, users, managers })
    await checkOverUnstaking({ staking, users })
    await checkOverUnlocking({ staking, users, managers })
    await checkOverTransferring({ staking, users })
    await checkOverSlashing({ staking, users, managers })
  }

  return {
    approveAndStake,
    approveStakeAndLock,
    UserState,
    approveAndStakeWithState,
    approveStakeAndLockWithState,
    unstakeWithState,
    unlockWithState,
    unlockFromManagerWithState,
    transferWithState,
    transferAndUnstakeWithState,
    slashWithState,
    slashAndUnstakeWithState,
    slashFromContractWithState,
    slashAndUnstakeFromContractWithState,
    checkInvariants,
  }
}
