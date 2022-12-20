const { assertRevert } = require('@aragon/contract-helpers-test/assertThrow')
const { bn, assertBn } = require('@aragon/contract-helpers-test/numbers')

const { DEFAULT_STAKE_AMOUNT, EMPTY_DATA, ZERO_ADDRESS } = require('./helpers/constants')
const { STAKING_ERRORS } = require('./helpers/errors')

const StakingMock = artifacts.require('StakingMock')
const MiniMeToken = artifacts.require('MiniMeToken')

contract('Staking app, Approve and call fallback', ([owner, user]) => {
  let staking, token, stakingAddress, tokenAddress

  beforeEach(async () => {
    const initialAmount = DEFAULT_STAKE_AMOUNT.mul(bn(1000))
    const tokenContract = await MiniMeToken.new(ZERO_ADDRESS, ZERO_ADDRESS, 0, 'Test Token', 18, 'TT', true)
    token = tokenContract
    tokenAddress = tokenContract.address
    await token.generateTokens(user, DEFAULT_STAKE_AMOUNT)
    const stakingContract = await StakingMock.new(tokenAddress)
    staking = stakingContract
    stakingAddress = stakingContract.address
  })

  it('stakes through approveAndCall', async () => {
    const initialUserBalance = await token.balanceOf(user)
    const initialStakingBalance = await token.balanceOf(stakingAddress)

    await token.approveAndCall(stakingAddress, DEFAULT_STAKE_AMOUNT, EMPTY_DATA, { from: user })

    const finalUserBalance = await token.balanceOf(user)
    const finalStakingBalance = await token.balanceOf(stakingAddress)
    assertBn(finalUserBalance, initialUserBalance.sub(DEFAULT_STAKE_AMOUNT), "user balance should match")
    assertBn(finalStakingBalance, initialStakingBalance.add(DEFAULT_STAKE_AMOUNT), "Staking app balance should match")
    assertBn(await staking.totalStakedFor(user), DEFAULT_STAKE_AMOUNT, "staked value should match")
    // total stake
    assertBn(await staking.totalStaked(), DEFAULT_STAKE_AMOUNT, "Total stake should match")
  })

  it('fails staking 0 amount through approveAndCall', async () => {
    await assertRevert(token.approveAndCall(stakingAddress, 0, EMPTY_DATA, { from: user })/*, STAKING_ERRORS.ERROR_AMOUNT_ZERO*/)
  })

  it('fails calling approveAndCall on a different token', async () => {
    const token2 = await MiniMeToken.new(ZERO_ADDRESS, ZERO_ADDRESS, 0, 'Test Token 2', 18, 'TT2', true)
    await token2.generateTokens(user, DEFAULT_STAKE_AMOUNT)
    await assertRevert(token2.approveAndCall(stakingAddress, 0, EMPTY_DATA, { from: user })/*, STAKING_ERRORS.ERROR_WRONG_TOKEN*/)
  })

  it('fails calling receiveApproval from a different account than the token', async () => {
    await assertRevert(staking.receiveApproval(user, DEFAULT_STAKE_AMOUNT, tokenAddress, EMPTY_DATA)/*, STAKING_ERRORS.ERROR_TOKEN_NOT_SENDER*/)
  })
})
