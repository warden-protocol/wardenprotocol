const { assertRevert } = require('@aragon/contract-helpers-test/assertThrow')
const { bn, assertBn, MAX_UINT64 } = require('@aragon/contract-helpers-test/numbers')

const { deploy } = require('./helpers/deploy')(artifacts)
const { approveAndStake } = require('./helpers/helpers')(artifacts)
const { DEFAULT_STAKE_AMOUNT, EMPTY_DATA } = require('./helpers/constants')
const { STAKING_ERRORS } = require('./helpers/errors')

const StakingMock = artifacts.require('StakingMock')
const StandardTokenMock = artifacts.require('StandardTokenMock');
const BadTokenMock = artifacts.require('BadTokenMock')

const getTokenBalance = async (token, account) =>  await token.balanceOf(account)

contract('Staking app', ([owner, other]) => {
  let staking, token, stakingAddress, tokenAddress

  beforeEach(async () => {
    const initialAmount = DEFAULT_STAKE_AMOUNT.mul(bn(1000))
    const tokenContract = await StandardTokenMock.new(owner, initialAmount)
    token = tokenContract
    tokenAddress = tokenContract.address
    await token.mint(other, DEFAULT_STAKE_AMOUNT)
    const stakingContract = await StakingMock.new(tokenAddress)
    staking = stakingContract
    stakingAddress = stakingContract.address
  })

  it('has correct initial state', async () => {
    assert.equal(await staking.token(), tokenAddress, "Token is wrong")
    assert.equal((await staking.totalStaked()).valueOf(), 0, "Initial total staked amount should be zero")
    assert.equal(await staking.supportsHistory(), true, "history support should match")
  })

  it('fails deploying if token is not a contract', async() => {
    await assertRevert(StakingMock.new(owner)/*, STAKING_ERRORS.ERROR_TOKEN_NOT_CONTRACT*/)
  })

  it('stakes', async () => {
    const initialOwnerBalance = await getTokenBalance(token, owner)
    const initialStakingBalance = await getTokenBalance(token, stakingAddress)

    await approveAndStake({ staking, from: owner })

    const finalOwnerBalance = await getTokenBalance(token, owner)
    const finalStakingBalance = await getTokenBalance(token, stakingAddress)
    assertBn(finalOwnerBalance, initialOwnerBalance.sub(bn(DEFAULT_STAKE_AMOUNT)), "owner balance should match")
    assertBn(finalStakingBalance, initialStakingBalance.add(bn(DEFAULT_STAKE_AMOUNT)), "Staking app balance should match")
    assertBn(await staking.totalStakedFor(owner), bn(DEFAULT_STAKE_AMOUNT), "staked value should match")
    // total stake
    assertBn(await staking.totalStaked(), bn(DEFAULT_STAKE_AMOUNT), "Total stake should match")
  })

  it('fails staking 0 amount', async () => {
    await token.approve(stakingAddress, 1)
    await assertRevert(staking.stake(0, EMPTY_DATA)/*, STAKING_ERRORS.ERROR_AMOUNT_ZERO*/)
  })

  it('fails staking more than balance', async () => {
    const balance = await getTokenBalance(token, owner)
    const amount = balance.add(bn(1))
    await token.approve(stakingAddress, amount)
    await assertRevert(staking.stake(amount, EMPTY_DATA)/*, STAKING_ERRORS.ERROR_TOKEN_DEPOSIT*/)
  })

  it('stakes for', async () => {
    const initialOwnerBalance = await getTokenBalance(token, owner)
    const initialOtherBalance = await getTokenBalance(token, other)
    const initialStakingBalance = await getTokenBalance(token, stakingAddress)

    // allow Staking app to move owner tokens
    await token.approve(stakingAddress, DEFAULT_STAKE_AMOUNT)
    // stake tokens
    await staking.stakeFor(other, DEFAULT_STAKE_AMOUNT, EMPTY_DATA)

    const finalOwnerBalance = await getTokenBalance(token, owner)
    const finalOtherBalance = await getTokenBalance(token, other)
    const finalStakingBalance = await getTokenBalance(token, stakingAddress)
    assertBn(finalOwnerBalance, initialOwnerBalance.sub(bn(DEFAULT_STAKE_AMOUNT)), "owner balance should match")
    assertBn(finalOtherBalance, initialOtherBalance, "other balance should match")
    assertBn(finalStakingBalance, initialStakingBalance.add(bn(DEFAULT_STAKE_AMOUNT)), "Staking app balance should match")
    assertBn(await staking.totalStakedFor(owner), bn(0), "staked value for owner should match")
    assertBn(await staking.totalStakedFor(other), bn(DEFAULT_STAKE_AMOUNT), "staked value for other should match")
  })

  it('unstakes', async () => {
    const initialOwnerBalance = await getTokenBalance(token, owner)
    const initialStakingBalance = await getTokenBalance(token, stakingAddress)

    await approveAndStake({ staking, from: owner })

    // unstake half of them
    await staking.unstake(DEFAULT_STAKE_AMOUNT.div(bn(2)), EMPTY_DATA)

    const finalOwnerBalance = await getTokenBalance(token, owner)
    const finalStakingBalance = await getTokenBalance(token, stakingAddress)
    assertBn(finalOwnerBalance, initialOwnerBalance.sub(bn(DEFAULT_STAKE_AMOUNT.div(bn(2)))), "owner balance should match")
    assertBn(finalStakingBalance, initialStakingBalance.add(bn(DEFAULT_STAKE_AMOUNT.div(bn(2)))), "Staking app balance should match")
    assertBn(await staking.totalStakedFor(owner), bn(DEFAULT_STAKE_AMOUNT.div(bn(2))), "staked value should match")
  })

  it('fails unstaking 0 amount', async () => {
    await approveAndStake({ staking, from: owner })
    await assertRevert(staking.unstake(0, EMPTY_DATA)/*, STAKING_ERRORS.ERROR_AMOUNT_ZERO*/)
  })

  it('fails unstaking more than staked', async () => {
    await approveAndStake({ staking, from: owner })
    await assertRevert(staking.unstake(DEFAULT_STAKE_AMOUNT.add(bn(1)), EMPTY_DATA)/*, STAKING_ERRORS.ERROR_NOT_ENOUGH_BALANCE*/)
  })

  context('History', async () => {
    it('supports history', async () => {
      assert.equal(await staking.supportsHistory(), true, "It should support History")
    })

    it('has correct "last staked for"', async () => {
      const blockNumber = await staking.getBlockNumberPublic()
      const lastStaked = blockNumber.add(bn(5))
      await staking.setBlockNumber(lastStaked)
      await approveAndStake({ staking, from: owner })
      assertBn(await staking.lastStakedFor(owner), lastStaked, "Last staked for should match")
    })

    it('has correct "total staked for at"', async () => {
      const beforeBlockNumber = await staking.getBlockNumberPublic()
      const lastStaked = beforeBlockNumber.add(bn(5))
      await staking.setBlockNumber(lastStaked)
      await approveAndStake({ staking, from: owner })
      assertBn(await staking.totalStakedForAt(owner, beforeBlockNumber), bn(0), "Staked for at before staking should match")
      assertBn(await staking.totalStakedForAt(owner, lastStaked), bn(DEFAULT_STAKE_AMOUNT), "Staked for after staking should match")
    })

    it('has correct "total staked at"', async () => {
      const beforeBlockNumber = await staking.getBlockNumberPublic()
      const lastStaked = beforeBlockNumber.add(bn(5))
      await staking.setBlockNumber(lastStaked)
      await approveAndStake({ staking, from: owner })
      await approveAndStake({ staking, from: other })
      assertBn(await staking.totalStakedAt(beforeBlockNumber), bn(0), "Staked for at before should match")
      assertBn(await staking.totalStakedAt(lastStaked), bn(DEFAULT_STAKE_AMOUNT.mul(bn(2))), "Staked for at after staking should match")
    })

    it('fails to call totalStakedForAt with block number greater than max uint64', async () => {
      await assertRevert(staking.totalStakedForAt(owner, MAX_UINT64.add(bn(1)))/*, STAKING_ERRORS.ERROR_BLOCKNUMBER_TOO_BIG*/)
    })

    it('fails to call totalStakedAt with block number greater than max uint64', async () => {
      await assertRevert(staking.totalStakedAt(MAX_UINT64.add(bn(1)))/*, STAKING_ERRORS.ERROR_BLOCKNUMBER_TOO_BIG*/)
    })
  })

  context('Bad Token', async () => {
    let badStaking, badStakingAddress, badToken, badTokenAddress
    beforeEach(async () => {
      const initialAmount = DEFAULT_STAKE_AMOUNT.mul(bn(1000))
      const tokenContract = await BadTokenMock.new(owner, initialAmount)
      badToken = tokenContract
      badTokenAddress = tokenContract.address
      await badToken.mint(other, DEFAULT_STAKE_AMOUNT)
      const stakingContract = await StakingMock.new(badTokenAddress)
      badStaking = stakingContract
      badStakingAddress = stakingContract.address
    })

    it('fails unstaking because of bad token', async () => {
      // allow Staking app to move owner tokens
      await badToken.approve(badStakingAddress, DEFAULT_STAKE_AMOUNT, { from: owner })
      // stake tokens
      await badStaking.stake(DEFAULT_STAKE_AMOUNT, EMPTY_DATA, { from: owner })

      // unstake half of them, fails on token transfer
      await assertRevert(badStaking.unstake(DEFAULT_STAKE_AMOUNT.div(bn(2)), EMPTY_DATA)/*, STAKING_ERRORS.ERROR_TOKEN_TRANSFER*/)
    })
  })
})
