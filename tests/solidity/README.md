# Solidity tests

Increasingly difficult tests are provided:

- [Basic](./suites/basic): simple Counter example, for basic calls, transactions, and events
- [Initialize](./suites/initialize): initialization contract and tests from [aragonOS](https://github.com/aragon/aragonOS)
- [Initialize (Buidler)](./suites/initialize-buidler): initialization contract and tests from [aragonOS](https://github.com/aragon/aragonOS), using [buidler](https://buidler.dev/)
- [Proxy](./suites/proxy): depositable delegate proxy contract and tests from [aragonOS](https://github.com/aragon/aragonOS)
- [Staking](./suites/staking): Staking contracts and full test suite from [aragon/staking](http://github.com/aragon/staking)

### Quick start

**Prerequisite**: in the repo's root, run `make install` to install the `ethermintd` and `ethermintd` binaries. When done, come back to this directory.

**Prerequisite**: install the individual solidity packages. They're set up as individual reops in a yarn monorepo workspace. Install them all via `yarn install`.

To run the tests, you can use the `test-helper.js` utility to test all suites under `ganache` or `ethermint` network. The `test-helper.js` will help you spawn an `ethermintd` process before running the tests.

You can simply run `yarn test --network ethermint` to run all tests with ethermint network, or you can run `yarn test --network ganache` to use ganache shipped with truffle. In most cases, there two networks should produce identical test results.

If you only want to run a few test cases, append the name of tests following by the command line. For example, use `yarn test --network ethermint basic` to run the `basic` test under `ethermint` network.

If you need to take more control, you can also run `ethermintd` using:

```sh
./init-test-node.sh
```

You will now have three ethereum accounts unlocked in the test node:

- `0x3b7252d007059ffc82d16d022da3cbf9992d2f70` (Validator)
- `0xddd64b4712f7c8f1ace3c145c950339eddaf221d` (User 1)
- `0x0f54f47bf9b8e317b214ccd6a7c3e38b893cd7f0` (user 2)

Keep the terminal window open, go into any of the tests and run `yarn test-ethermint`. You should see `ethermintd` accepting transactions and producing blocks. You should be able to query for any transaction via:

- `ethermintd query tx <cosmos-sdk tx>`
- `curl localhost:8545 -H "Content-Type:application/json" -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["<ethereum tx>"],"id":1}'`

From here, in your other available terminal,
And obviously more, via the Ethereum JSON-RPC API).

When in doubt, you can also run the tests against a Ganache instance via `yarn test-ganache`, to make sure they are behaving correctly.

### Test node

The [`init-test-node.sh`](./init-test-node.sh) script sets up ethermint with the following accounts:

- `ethm10jmp6sgh4cc6zt3e8gw05wavvejgr5pwtu750w` (Validator)
    - `0x7cB61D4117AE31a12E393a1Cfa3BaC666481D02E`
- `ethm1cml96vmptgw99syqrrz8az79xer2pcgp767p9e` (User 1)
    - `0xC6Fe5D33615a1C52c08018c47E8Bc53646A0E101`
- `ethm1jcltmuhplrdcwp7stlr4hlhlhgd4htqhgjpff2` (user 2)
    - `0x963EBDf2e1f8DB8707D05FC75bfeFFBa1B5BaC17`

Each with roughly 100 ETH available (1e18 photon).

Running `ethermintd keys list --keyring-backend=test` should output:

```json
[
  {
    "name": "localkey",
    "type": "local",
    "address": "ethm18de995q8qk0leqk3d5pzmg7tlxvj6tmsku084d",
    "pubkey": "ethpub1pfqnmk6pq3ycjs34vv4n6rkty89f6m02qcsal3ecdzn7a3uunx0e5ly0846pzg903hxf2zp5gq4grh8jcatcemfrscdfl797zhg5crkcsx43gujzppge3n"
  },
  {
    "name": "user1",
    "type": "local",
    "address": "ethm1mhtyk3cj7ly0rt8rc9zuj5pnnmw67gsapygwyq",
    "pubkey": "ethpub1pfqnmk6pq3wrkx6lh7uug8ss0thggact3n49m5gkmpca4vylldpur5qrept57e0rrxfmeq5mp5xt3cyf4kys53qcv66qxttv970das69hlpkf8cnyd2a2x"
  },
  {
    "name": "user2",
    "type": "local",
    "address": "ethm1pa20g7lehr330vs5ent20slr3wyne4lsy8qae3",
    "pubkey": "ethpub1pfqnmk6pq3art9y45zw5ntyktt2qrt0skmsl0ux9qwk8458ed3d8sgnrs99zlgvj3rt2vggvkh0x56hffugwsyddwqla48npx46pglgs6xhcqpall58tgn"
  }
]
```

And running:

```sh
curl localhost:8545 -H "Content-Type:application/json" -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
```

Should output:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    "0x3b7252d007059ffc82d16d022da3cbf9992d2f70",
    "0xddd64b4712f7c8f1ace3c145c950339eddaf221d",
    "0x0f54f47bf9b8e317b214ccd6a7c3e38b893cd7f0"
  ]
}
```
