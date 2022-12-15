const Staking = artifacts.require('Staking')
const StakingProxy = artifacts.require('StakingProxy')
const StandardTokenMock = artifacts.require('StandardTokenMock')

contract('StakingProxy', ([_, owner]) => {
  let proxy, token, implementation

  const FORWARDING_TYPE = 1

  beforeEach('deploy sample token and staking implementation', async () => {
    token = await StandardTokenMock.new(owner, 100000, { from: owner })
    implementation = await Staking.new()
    proxy = await StakingProxy.new(implementation.address, token.address)
  })

  describe('initialize', async () => {
    it('initializes the given implementation', async () => {
      const staking = await Staking.at(proxy.address)
      assert(await staking.hasInitialized(), 'should have been initialized')
    })
  })

  describe('implementation', async () => {
    it('uses an unstructured storage slot for the implementation address', async () => {
      const implementationAddress = await web3.eth.getStorageAt(proxy.address, web3.utils.sha3('aragon.network.staking'))
      assert.equal(implementationAddress.toLowerCase().replace(/0x0*/g, ''), implementation.address.toLowerCase().replace(/0x0*/g, ''), 'implementation address does not match')
    })

    it('uses the given implementation', async () => {
      const implementationAddress = await proxy.implementation()
      assert.equal(implementationAddress, implementation.address, 'implementation address does not match')
    })
  })

  describe('proxyType', () => {
    it('is a forwarding type', async () => {
      assert.equal(await proxy.proxyType(), FORWARDING_TYPE, 'proxy type does not match')
    })
  })

  describe('fallback', () => {
    it('forward calls to the implementation set', async () => {
      const staking = await Staking.at(proxy.address)
      assert.equal(await staking.token(), token.address, 'token address does not match')
    })
  })
})
