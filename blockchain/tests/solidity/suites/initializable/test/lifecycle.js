const { assertRevert } = require('@aragon/contract-helpers-test/src/asserts')

// Mocks
const LifecycleMock = artifacts.require('LifecycleMock')

const ERRORS = {
  INIT_ALREADY_INITIALIZED: 'INIT_ALREADY_INITIALIZED',
}

contract('Lifecycle', () => {
  let lifecycle

  beforeEach(async () => {
    lifecycle = await LifecycleMock.new()
  })

  it('is not initialized', async () => {
    assert.isFalse(await lifecycle.hasInitialized(), 'should not be initialized')
  })

  it('is not petrified', async () => {
    assert.isFalse(await lifecycle.isPetrified(), 'should not be petrified')
  })

  context('> Initialized', () => {
    beforeEach(async () => {
      await lifecycle.initializeMock()
    })

    it('is initialized', async () => {
      assert.isTrue(await lifecycle.hasInitialized(), 'should be initialized')
    })

    it('is not petrified', async () => {
      assert.isFalse(await lifecycle.isPetrified(), 'should not be petrified')
    })

    it('cannot be re-initialized', async () => {
      await assertRevert(lifecycle.initializeMock()/*, ERRORS.INIT_ALREADY_INITIALIZED*/)
    })

    it('cannot be petrified', async () => {
      await assertRevert(lifecycle.petrifyMock()/*, ERRORS.INIT_ALREADY_INITIALIZED*/)
    })
  })

  context('> Petrified', () => {
    beforeEach(async () => {
      await lifecycle.petrifyMock()
    })

    it('is not initialized', async () => {
      assert.isFalse(await lifecycle.hasInitialized(), 'should not be initialized')
    })

    it('is petrified', async () => {
      assert.isTrue(await lifecycle.isPetrified(), 'should be petrified')
    })

    it('cannot be petrified again', async () => {
      await assertRevert(lifecycle.petrifyMock()/*, ERRORS.INIT_ALREADY_INITIALIZED*/)
    })

    it('has initialization block in the future', async () => {
      const petrifiedBlock = await lifecycle.getInitializationBlock()
      const blockNumber = await web3.eth.getBlockNumber()
      assert.isTrue(petrifiedBlock.gt(blockNumber), 'petrified block should be in the future')
    })
  })
})
