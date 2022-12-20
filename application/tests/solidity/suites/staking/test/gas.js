const { MAX_UINT64 } = require('@aragon/contract-helpers-test/numbers')

const getEvent = (receipt, event, arg) => { return receipt.logs.filter(l => l.event == event)[0].args[arg] }

const { deploy } = require('./helpers/deploy')(artifacts)
const { DEFAULT_STAKE_AMOUNT, DEFAULT_LOCK_AMOUNT, EMPTY_DATA, ZERO_ADDRESS, ACTIVATED_LOCK } = require('./helpers/constants')

contract.skip('Staking app, gas measures', accounts => {
  let staking, token, lockManager, stakingAddress, tokenAddress, lockManagerAddress
  let owner, user1, user2

  const approveAndStake = async (amount = DEFAULT_STAKE_AMOUNT, from = owner) => {
    await token.approve(stakingAddress, amount, { from })
    await staking.stake(amount, EMPTY_DATA, { from })
  }

  const approveStakeAndLock = async (
    manager,
    lockAmount = DEFAULT_LOCK_AMOUNT,
    stakeAmount = DEFAULT_STAKE_AMOUNT,
    from = owner
  ) => {
    await approveAndStake(stakeAmount, from)
    await staking.allowManagerAndLock(lockAmount, manager, lockAmount, ACTIVATED_LOCK, { from })
  }

  before(async () => {
    owner = accounts[0]
    user1 = accounts[1]
    user2 = accounts[2]
  })

  beforeEach(async () => {
    const deployment = await deploy(owner)
    token = deployment.token
    staking = deployment.staking
    lockManager = deployment.lockManager

    stakingAddress = staking.address
    tokenAddress = token.address
    lockManagerAddress = lockManager.address
  })

  // increases 1185 gas for each lock
  it('measures unlockedBalanceOf gas', async () => {
    await approveStakeAndLock(lockManagerAddress)

    const r = await staking.unlockedBalanceOfGas()
    const gas = getEvent(r, 'LogGas', 'gas')
    console.log(`unlockedBalanceOf gas: ${gas.toNumber()}`)
  })

  // 110973 gas
  /*
  it('measures lock gas', async () => {
    await approveAndStake()

    const r = await staking.lockGas(DEFAULT_LOCK_AMOUNT, lockManagerAddress, ACTIVATED_LOCK, { from: owner })
    const gas = getEvent(r, 'LogGas', 'gas')
    console.log('lock gas:', gas.toNumber())
  })
  */

  // 27601 gas
  it('measures transfer gas', async () => {
    await approveStakeAndLock(lockManagerAddress)

    const r = await staking.transferGas(owner, lockManagerAddress, DEFAULT_LOCK_AMOUNT)
    const gas = getEvent(r, 'LogGas', 'gas')
    console.log('transfer gas:', gas.toNumber())
  })

  /*
  it('measures unlock gas', async () => {
    await approveStakeAndLock(user1)

    const r = await staking.unlockGas(owner, user1, { from: user1 })
    const gas = getEvent(r, 'LogGas', 'gas')
    console.log(`unlock gas: ${gas.toNumber()}`)
    await approveStakeAndLock(lockManagerAddress)
  })
  */
})
