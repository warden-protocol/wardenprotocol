const { bn } = require('@aragon/contract-helpers-test')
const { assertAmountOfEvents, assertEvent, assertRevert, assertBn } = require('@aragon/contract-helpers-test/src/asserts')

// Mocks
const DepositableDelegateProxyMock = artifacts.require('DepositableDelegateProxyMock')
const EthSender = artifacts.require('EthSender')
const ProxyTargetWithoutFallback = artifacts.require('ProxyTargetWithoutFallback')
const ProxyTargetWithFallback = artifacts.require('ProxyTargetWithFallback')

const TX_BASE_GAS = 21000
const SEND_ETH_GAS = TX_BASE_GAS + 9999 // <10k gas is the threshold for depositing
const PROXY_FORWARD_GAS = TX_BASE_GAS + 2e6 // high gas amount to ensure that the proxy forwards the call
const FALLBACK_SETUP_GAS = 100 // rough estimation of how much gas it spends before executing the fallback code
const SOLIDITY_TRANSFER_GAS = 2300

async function assertOutOfGas(blockOrPromise) {
  try {
    typeof blockOrPromise === 'function'
      ? await blockOrPromise()
      : await blockOrPromise;
  } catch (error) {
    const errorMatchesExpected =
      error.message.search('out of gas') !== -1 ||
      error.message.search('consuming all gas') !== -1;
    assert(
      errorMatchesExpected,
      `Expected error code "out of gas" or "consuming all gas" but failed with "${error}" instead.`
    );
    return error;
  }

  assert(false, `Expected "out of gas" or "consuming all gas" but it did not fail`);
}

contract('DepositableDelegateProxy', ([ sender ]) => {
  let ethSender, proxy, target, proxyTargetWithoutFallbackBase, proxyTargetWithFallbackBase

  // Initial setup
  before(async () => {
    ethSender = await EthSender.new()
    proxyTargetWithoutFallbackBase = await ProxyTargetWithoutFallback.new()
    proxyTargetWithFallbackBase = await ProxyTargetWithFallback.new()
  })

  beforeEach(async () => {
    proxy = await DepositableDelegateProxyMock.new()
    target = await ProxyTargetWithFallback.at(proxy.address)
  })

  const itForwardsToImplementationIfGasIsOverThreshold = () => {
    context('when implementation address is set', () => {
      const itSuccessfullyForwardsCall = () => {
        it('forwards call with data', async () => {
          const receipt = await target.ping({ gas: PROXY_FORWARD_GAS })
          assertAmountOfEvents(receipt, 'Pong')
        })
      }

      context('when implementation has a fallback', () => {
        beforeEach(async () => {
          await proxy.setImplementationOnMock(proxyTargetWithFallbackBase.address)
        })

        itSuccessfullyForwardsCall()

        it('can receive ETH [@skip-on-coverage]', async () => {
          const receipt = await target.sendTransaction({ value: 1, gas: SEND_ETH_GAS + FALLBACK_SETUP_GAS })
          assertAmountOfEvents(receipt, 'ReceivedEth')
        })
      })

      context('when implementation doesn\'t have a fallback', () => {
        beforeEach(async () => {
          await proxy.setImplementationOnMock(proxyTargetWithoutFallbackBase.address)
        })

        itSuccessfullyForwardsCall()

        it('reverts when sending ETH', async () => {
          await assertRevert(target.sendTransaction({ value: 1, gas: PROXY_FORWARD_GAS }))
        })
      })
    })

    context('when implementation address is not set', () => {
      it('reverts when a function is called', async () => {
        await assertRevert(target.ping({ gas: PROXY_FORWARD_GAS }))
      })

      it('reverts when sending ETH', async () => {
        await assertRevert(target.sendTransaction({ value: 1, gas: PROXY_FORWARD_GAS }))
      })
    })
  }

  const itRevertsOnInvalidDeposits = () => {
    it('reverts when call has data', async () => {
      await proxy.setImplementationOnMock(proxyTargetWithoutFallbackBase.address)

      await assertRevert(target.ping({ gas: SEND_ETH_GAS }))
    })

    it('reverts when call sends 0 value', async () => {
      await assertRevert(proxy.sendTransaction({ value: 0, gas: SEND_ETH_GAS }))
    })
  }

  context('when proxy is set as depositable', () => {
    beforeEach(async () => {
      await proxy.enableDepositsOnMock()
    })

    context('when call gas is below the forwarding threshold', () => {
      const value = bn(100)

      const assertSendEthToProxy = async ({ value, gas, shouldOOG }) => {
        const initialBalance = bn(await web3.eth.getBalance(proxy.address))

        const sendEthAction = () => proxy.sendTransaction({ from: sender, gas, value })

        if (shouldOOG) {
          await assertOutOfGas(sendEthAction())
          assertBn(bn(await web3.eth.getBalance(proxy.address)), initialBalance, 'Target balance should be the same as before')
        } else {
          const receipt = await sendEthAction()

          assertBn(bn(await web3.eth.getBalance(proxy.address)), initialBalance.add(value), 'Target balance should be correct')
          assertAmountOfEvents(receipt, 'ProxyDeposit', { decodeForAbi: DepositableDelegateProxyMock.abi })
          assertEvent(receipt, 'ProxyDeposit', { decodeForAbi: DepositableDelegateProxyMock.abi, expectedArgs: { sender, value  } })

          return receipt
        }
      }

      it('can receive ETH', async () => {
        await assertSendEthToProxy({ value, gas: SEND_ETH_GAS })
      })

      it('cannot receive ETH if sent with a small amount of gas [@skip-on-coverage]', async () => {
        const oogDecrease = 250
        // deposit cannot be done with this amount of gas
        const gas = TX_BASE_GAS + SOLIDITY_TRANSFER_GAS - oogDecrease
        await assertSendEthToProxy({ shouldOOG: true, value, gas })
      })

      // it('can receive ETH from contract [@skip-on-coverage]', async () => {
      //   const receipt = await ethSender.sendEth(proxy.address, { value })

      //   assertAmountOfEvents(receipt, 'ProxyDeposit', { decodeForAbi: proxy.abi })
      //   assertEvent(receipt, 'ProxyDeposit', { decodeForAbi: proxy.abi, expectedArgs: { sender: ethSender.address, value } })
      // })

      itRevertsOnInvalidDeposits()
    })

    context('when call gas is over forwarding threshold', () => {
      itForwardsToImplementationIfGasIsOverThreshold()
    })
  })

  context('when proxy is not set as depositable', () => {
    context('when call gas is below the forwarding threshold', () => {
      it('reverts when depositing ETH', async () => {
        await assertRevert(proxy.sendTransaction({ value: 1, gas: SEND_ETH_GAS }))
      })

      itRevertsOnInvalidDeposits()
    })

    context('when call gas is over forwarding threshold', () => {
      itForwardsToImplementationIfGasIsOverThreshold()
    })
  })
})
