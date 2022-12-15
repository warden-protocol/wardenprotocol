const { assertRevert } = require('@aragon/contract-helpers-test/assertThrow')

const { ZERO_ADDRESS } = require('./helpers/constants')
const { STAKING_ERRORS } = require('./helpers/errors')

const Staking = artifacts.require('Staking')
const StakingFactory = artifacts.require('StakingFactory')
const StandardTokenMock = artifacts.require('StandardTokenMock')

contract('StakingFactory', ([_, owner, someone]) => {
  let token, factory, staking

  const getInstance = receipt => receipt.logs.find(log => log.event === 'NewStaking').args.instance

  beforeEach('deploy sample token and staking factory', async () => {
    token = await StandardTokenMock.new(owner, 100000, { from: owner })
    factory = await StakingFactory.new()
  })

  describe('getInstance', () => {
    context('when the given token was not registered before', () => {
      it('returns the zero address', async () => {
        const instance = await factory.getInstance(token.address)

        assert.equal(instance, ZERO_ADDRESS, 'instance address does not match')
      })
    })

    context('when the given token was already registered', () => {
      let instance

      beforeEach('create staking instance', async () => {
        instance = getInstance(await factory.getOrCreateInstance(token.address))
      })

      it('returns the corresponding staking instance address', async () => {
        const foundInstance = await factory.getInstance(token.address)

        assert.equal(instance, foundInstance, 'instance address does not match')
      })
    })
  })

  describe('existsInstance', () => {
    context('when the given token was not registered before', () => {
      it('returns false', async () => {
        const exists = await factory.existsInstance(token.address)
        assert(!exists, 'staking instance does exist')
      })
    })

    context('when the given token was already registered', () => {
      beforeEach('create staking instance', async () => {
        await factory.getOrCreateInstance(token.address)
      })

      it('returns true', async () => {
        const exists = await factory.existsInstance(token.address)
        assert(exists, 'staking instance does not exist')
      })
    })
  })

  describe('getOrCreateInstance', () => {
    context('when the given token was not registered before', () => {
      context('when the given token is a contract', () => {
        it('emits a NewStaking event', async () => {
          const receipt = await factory.getOrCreateInstance(token.address)

          const events = receipt.logs.filter(l => l.event === 'NewStaking')
          assert.equal(events.length, 1, 'number of NewStaking events does not match')
          assert.equal(events[0].args.token, token.address, 'token address does not match')
          assert.notEqual(events[0].args.instance, ZERO_ADDRESS, 'instance address does not match')
        })

        it('creates a new staking instance', async () => {
          const instance = getInstance(await factory.getOrCreateInstance(token.address))

          staking = await Staking.at(instance)
          assert.equal(await staking.token(), token.address, 'token address does not match')
        })
      })

      context('when the given token is the zero address', () => {
        const tokenAddress = ZERO_ADDRESS

        it('reverts', async () => {
          await assertRevert(factory.getOrCreateInstance(tokenAddress)/*, STAKING_ERRORS.ERROR_TOKEN_NOT_CONTRACT*/)
        })
      })

      context('when the given token is not a contract', () => {
        const tokenAddress = someone

        it('reverts', async () => {
          await assertRevert(factory.getOrCreateInstance(tokenAddress)/*, STAKING_ERRORS.ERROR_TOKEN_NOT_CONTRACT*/)
        })
      })
    })

    context('when the given token was already registered', () => {
      let instance

      beforeEach('create staking instance', async () => {
        instance = getInstance(await factory.getOrCreateInstance(token.address))
      })

      it('does not create a new staking instance', async () => {
        const receipt = await factory.getOrCreateInstance(token.address)

        const events = receipt.logs.filter(l => l.event === 'NewStaking')
        assert.equal(events.length, 0, 'number of NewStaking events does not match')
      })
    })
  })
})
