const { assertRevert } = require('@aragon/contract-helpers-test/assertThrow')
const { bn, assertBn, MAX_UINT64 } = require('@aragon/contract-helpers-test/numbers')

const { deploy } = require('../helpers/deploy')(artifacts)
const {
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
} = require('../helpers/helpers')(artifacts)
const { DEFAULT_STAKE_AMOUNT, DEFAULT_LOCK_AMOUNT, EMPTY_DATA, ZERO_ADDRESS } = require('../helpers/constants')

contract('Staking app, Locking funds flows', ([_, owner, user1, user2, user3]) => {
  let staking, lockManager, users, managers, token

  beforeEach(async () => {
    const deployment = await deploy(owner)
    staking = deployment.staking
    lockManager = deployment.lockManager

    token = deployment.token

    // fund users and create user state objects
    users = []
    const userAddresses = [user1, user2, user3]
    await Promise.all(userAddresses.map(async (userAddress, index) => {
      const amount = DEFAULT_STAKE_AMOUNT.mul(bn(userAddresses.length - index))
      users.push(new UserState(userAddress, amount))
      await token.transfer(userAddress, amount, { from: owner })
    }))

    // managers
    managers = users.reduce((result, user) => {
      result.push(user.address)
      return result
    }, [])
    managers.push(lockManager.address)
  })

  describe('same origin and destiny', () => {
    context('when user hasn’t staked', () => {
      it('check invariants', async () => {
        await checkInvariants({ staking, users, managers })
      })
    })

    context('when user has staked', () => {
      const stakeAmount = DEFAULT_STAKE_AMOUNT

      beforeEach('stakes', async () => {
        await checkInvariants({ staking, users, managers })
        await approveAndStakeWithState({ staking, amount: stakeAmount, user: users[0] })
        await checkInvariants({ staking, users, managers })
      })

      context('when user hasn’t locked', () => {
        it('unstakes half', async () => {
          await unstakeWithState({ staking, unstakeAmount: stakeAmount.div(bn(2)), user: users[0] })
          await checkInvariants({ staking, users, managers })
        })

        it('unstakes all', async () => {
          await unstakeWithState({ staking, unstakeAmount: stakeAmount, user: users[0] })
          await checkInvariants({ staking, users, managers })
        })
      })

      context('when user has locked', () => {
        const lockAmount = DEFAULT_LOCK_AMOUNT

        const moveFunds = ({ isContract, canUnlock = false }) => {
          let lockManagerAddress

          beforeEach('stakes and locks', async () => {
            lockManagerAddress = isContract ? lockManager.address : user3
            if (isContract && canUnlock) {
              await lockManager.setResult(true)
            }

            await checkInvariants({ staking, users, managers })
            await approveStakeAndLockWithState({
              staking,
              manager: lockManagerAddress,
              stakeAmount,
              allowanceAmount: stakeAmount,
              lockAmount,
              user: users[0]
            })
            await checkInvariants({ staking, users, managers })
          })

          const unstake = async (unstakeAmount) => {
            await unstakeWithState({ staking, unstakeAmount, user: users[0] })
            await checkInvariants({ staking, users, managers })
          }

          it('unstakes remaining', async () => {
            await unstake(stakeAmount.sub(lockAmount))
          })

          const unlockAndUnstake = async (unlockAmount) => {
            await unlockWithState({ staking, managerAddress: lockManagerAddress, unlockAmount, user: users[0]})
            await unstake(stakeAmount.sub(lockAmount.sub(unlockAmount)))
          }

          const unlockAndUnstakeFromManager = async (unlockAmount) => {
            await unlockFromManagerWithState({ staking, lockManager, unlockAmount, user: users[0]})
            await unstake(stakeAmount.sub(lockAmount.sub(unlockAmount)))
          }

          if (canUnlock) {
            it('owner unlocks half and then unstakes', async () => {
              await unlockAndUnstake(lockAmount.div(bn(2)))
            })

            it('owner unlocks all and then unstakes', async () => {
              await unlockAndUnstake(lockAmount)
            })
          } else {
            it('owner cannot unlock', async () => {
              await assertRevert(staking.unlock(users[0].address, lockManagerAddress, bn(1), { from: users[0].address }))
            })

            if (isContract) {
              it('manager unlocks half and then owner unstakes', async () => {
                await unlockAndUnstakeFromManager(lockAmount.div(bn(2)))
              })

              it('manager unlocks all and then owner unstakes', async () => {
                await unlockAndUnstakeFromManager(lockAmount)
              })
            }
          }
        }

        context('when lock manager is EOA', () => {
          moveFunds({ isContract: false, canUnlock: false })
        })

        context('when lock manager is contract', () => {
          context('when lock manager allows to unlock', () => {
            moveFunds({ isContract: true, canUnlock: true })
          })

          context('when lock manager doesn’t allow to unlock', () => {
            moveFunds({ isContract: true, canUnlock: false })
          })
        })
      })
    })
  })

  describe('different origin and destiny', () => {
    context('when user hasn’t staked', () => {
      it('check invariants', async () => {
        await checkInvariants({ staking, users, managers })
      })
    })

    context('when user has staked', () => {
      const stakeAmount = DEFAULT_STAKE_AMOUNT

      beforeEach('stakes', async () => {
        await checkInvariants({ staking, users, managers })
        await approveAndStakeWithState({ staking, amount: stakeAmount, user: users[0] })
        await checkInvariants({ staking, users, managers })
      })

      context('when user hasn’t locked', () => {
        context('to staking balance', () => {
          it('transfers half', async () => {
            await transferWithState({ staking, transferAmount: stakeAmount.div(bn(2)), userFrom: users[0], userTo: users[1] })
            await checkInvariants({ staking, users, managers })
          })

          it('transfers all', async () => {
            await transferWithState({ staking, transferAmount: stakeAmount, userFrom: users[0], userTo: users[1] })
            await checkInvariants({ staking, users, managers })
          })
        })

        context('to external wallet', () => {
          it('transfers half', async () => {
            await transferAndUnstakeWithState({ staking, transferAmount: stakeAmount.div(bn(2)), userFrom: users[0], userTo: users[1] })
            await checkInvariants({ staking, users, managers })
          })

          it('transfers all', async () => {
            await transferAndUnstakeWithState({ staking, transferAmount: stakeAmount, userFrom: users[0], userTo: users[1] })
            await checkInvariants({ staking, users, managers })
          })
        })
      })

      context('when user has locked', () => {
        const lockAmount = DEFAULT_LOCK_AMOUNT

        const moveFunds = ({ isContract, canUnlock = false, toStaking }) => {
          let lockManagerAddress

          beforeEach('stakes and locks', async () => {
            lockManagerAddress = isContract ? lockManager.address : user3
            if (isContract && canUnlock) {
              await lockManager.setResult(true)
            }

            await checkInvariants({ staking, users, managers })
            await approveStakeAndLockWithState({
              staking,
              manager: lockManagerAddress,
              stakeAmount,
              allowanceAmount: stakeAmount,
              lockAmount,
              user: users[0]
            })
            await checkInvariants({ staking, users, managers })
          })

          const transfer = async (transferAmount) => {
            await transferWithState({ staking, transferAmount, userFrom: users[0], userTo: users[1] })
            await checkInvariants({ staking, users, managers })
          }

          it('transfers remaining', async () => {
            await transfer(stakeAmount.sub(lockAmount))
          })

          const slashAndTransfer = async (slashAmount) => {
            if (toStaking) {
              await slashWithState({ staking, slashAmount, userFrom: users[0], userTo: users[1], managerAddress: lockManagerAddress })
            } else {
              await slashAndUnstakeWithState({ staking, slashAmount, userFrom: users[0], userTo: users[1], managerAddress: lockManagerAddress })
            }
            await transfer(stakeAmount.sub(lockAmount.sub(slashAmount)))
          }

          const slashAndTransferFromContract = async (slashAmount) => {
            if (toStaking) {
              await slashFromContractWithState({ staking, slashAmount, userFrom: users[0], userTo: users[1], lockManager })
            } else {
              await slashAndUnstakeFromContractWithState({ staking, slashAmount, userFrom: users[0], userTo: users[1], lockManager })
            }
            await transfer(stakeAmount.sub(lockAmount.sub(slashAmount)))
          }

          if (isContract) {
            it('manager unlockes half and then owner transfers', async () => {
              await slashAndTransferFromContract(lockAmount.div(bn(2)))
            })

            it('manager slashes all and then owner transfers', async () => {
              await slashAndTransferFromContract(lockAmount)
            })
          } else {
            it('manager slashes half and then transfers', async () => {
              await slashAndTransfer(lockAmount.div(bn(2)))
            })

            it('manager slashes all and then transfers', async () => {
              await slashAndTransfer(lockAmount)
            })
          }
        }

        context('when lock manager is EOA', () => {
          context('to staking balance', () => {
            moveFunds({ isContract: false, canUnlock: false, toStaking: true })
          })

          context('to external wallet', () => {
            moveFunds({ isContract: false, canUnlock: false, toStaking: false })
          })
        })

        context('when lock manager is contract', () => {
          context('when lock manager allows to unlock', () => {
            context('to staking balance', () => {
              moveFunds({ isContract: true, canUnlock: true, toStaking: true })
            })

            context('to external wallet', () => {
              moveFunds({ isContract: true, canUnlock: true, toStaking: false })
            })
          })

          context('when lock manager doesn’t allow to unlock', () => {
            context('to staking balance', () => {
              moveFunds({ isContract: true, canUnlock: false, toStaking: true })
            })

            context('to external wallet', () => {
              moveFunds({ isContract: true, canUnlock: false, toStaking: false })
            })
          })
        })
      })
    })
  })
})
