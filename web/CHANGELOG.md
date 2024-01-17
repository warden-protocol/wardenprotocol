# web [1.1.0](https://github.com/qredo/fusionchain/compare/web@1.0.3...web@1.1.0) (2024-01-17)


### Features

* **web:** trigger CI ([97c6720](https://github.com/qredo/fusionchain/commit/97c6720d0100eed554ba06035c9279301d4e84e7))

## web [1.0.3](https://github.com/qredo/fusionchain/compare/web@1.0.2...web@1.0.3) (2024-01-17)


### Bug Fixes

* **web:** trigger CI/CD ([ef42655](https://github.com/qredo/fusionchain/commit/ef42655576bcb6f39ccc3bdd2c875cb421749937))

## web [1.0.2](https://github.com/qredo/fusionchain/compare/web@1.0.1...web@1.0.2) (2024-01-16)


### Bug Fixes

* **web:** rename Dockerfile ([f795cbf](https://github.com/qredo/fusionchain/commit/f795cbf47a2186575c11c4b7f09f4fe824587ad4))

## web [1.0.1](https://github.com/qredo/fusionchain/compare/web@1.0.0...web@1.0.1) (2024-01-16)


### Bug Fixes

* **web:** dummy change to trigger CI ([3fbeb8c](https://github.com/qredo/fusionchain/commit/3fbeb8cea6d9b10aef2425cc520a1056d6daf9aa))

# web 1.0.0 (2024-01-16)


### Bug Fixes

* add extensions to tsconfig resolver ([#204](https://github.com/qredo/fusionchain/issues/204)) ([7b3c9e5](https://github.com/qredo/fusionchain/commit/7b3c9e51531b18dfc365441855df0ab26b4b113e))
* **blockchain:** key/keyrequest CRUD issues (fixes LABS-319) ([#102](https://github.com/qredo/fusionchain/issues/102)) ([313d360](https://github.com/qredo/fusionchain/commit/313d36057ca5e6f59ff5d84df81c47c14fe01af7))
* **docker:** fix web docker build error ([#209](https://github.com/qredo/fusionchain/issues/209)) ([13a1ff7](https://github.com/qredo/fusionchain/commit/13a1ff79050d2aac56373e89cff719f81ef86c37))
* frontend ([#132](https://github.com/qredo/fusionchain/issues/132)) ([fd24215](https://github.com/qredo/fusionchain/commit/fd24215dfb76e7f0a222d30d9473300bcea4ff42))
* semantic-release github plugin disable comments on PRs and issues ([#161](https://github.com/qredo/fusionchain/issues/161)) ([9dd5a90](https://github.com/qredo/fusionchain/commit/9dd5a90baf619f2160468d3483db8ffb45c6d80a))
* **web:** avoid double slashes ([#50](https://github.com/qredo/fusionchain/issues/50)) ([35a84d9](https://github.com/qredo/fusionchain/commit/35a84d96689282038966ef4994bb4aa1c3a0cf47))
* **web:** avoid expensive block_search query ([#142](https://github.com/qredo/fusionchain/issues/142)) ([ecd4319](https://github.com/qredo/fusionchain/commit/ecd43195262b57c56fa89f56ea2466e0f733bc2a))
* **web:** build after new protobuf definitions ([#143](https://github.com/qredo/fusionchain/issues/143)) ([974af83](https://github.com/qredo/fusionchain/commit/974af83f256e49f290f9d4fcaa301e068c7521be))
* **web:** remove hardcoded urls ([#48](https://github.com/qredo/fusionchain/issues/48)) ([8f0ab79](https://github.com/qredo/fusionchain/commit/8f0ab79a2d507f3fdd9f027222339a8d5fd0906d))
* **web:** take FAUCET_URL from environment var ([73b6d03](https://github.com/qredo/fusionchain/commit/73b6d037f2a3700d56e597fda8fb7c76e2482e23))
* **web:** use <Link> instead of <a> ([#157](https://github.com/qredo/fusionchain/issues/157)) ([d891413](https://github.com/qredo/fusionchain/commit/d891413569c574e3967650b690493d2813054026))
* **web:** use correct fees and broadcasting method ([e9ab40e](https://github.com/qredo/fusionchain/commit/e9ab40ef0267fcbd3478a9cabfbc66b65329f462))
* **web:** use correct rest api, not tendermint rpc ([#49](https://github.com/qredo/fusionchain/issues/49)) ([e952254](https://github.com/qredo/fusionchain/commit/e952254830293c93035aadaa19c35d604deac4e2))
* **web:** use string for balance instead of uint64 ([0cd4197](https://github.com/qredo/fusionchain/commit/0cd41971eb092be8e4c16779777a09ce2b21ffae))
* **web:** view overflowing when user had multiple workspaces ([#213](https://github.com/qredo/fusionchain/issues/213)) ([4724ac8](https://github.com/qredo/fusionchain/commit/4724ac86daf7d3b665ee46fe0bb879f5946bd8a6))


### Features

* add WalletConnect methods for Uniswap ([#205](https://github.com/qredo/fusionchain/issues/205)) ([b43a307](https://github.com/qredo/fusionchain/commit/b43a307ee728ce9043ed03e51a9528394d48c4ca))
* **blockchain:** improve init.sh with auto-install and alias setter (LABS-298), reset to default ports/flag for alternate ports (LABS-301) ([#96](https://github.com/qredo/fusionchain/issues/96)) ([67694e7](https://github.com/qredo/fusionchain/commit/67694e7218ae8c9e10716a3cf9e2792b00611997))
* **web:** add "transaction by hash" page ([#69](https://github.com/qredo/fusionchain/issues/69)) ([9542204](https://github.com/qredo/fusionchain/commit/9542204be987f304cdc8fdb085641590bf6e9724))
* **web:** add ability to choose a keyring to use ([#156](https://github.com/qredo/fusionchain/issues/156)) ([f0d0ee6](https://github.com/qredo/fusionchain/commit/f0d0ee6e5f8d67fcd6831336afe99888bc85c739))
* **web:** add Actions page ([#72](https://github.com/qredo/fusionchain/issues/72)) ([579da6b](https://github.com/qredo/fusionchain/commit/579da6b70db180edeb2864e9c47a9643547d48af))
* **web:** add little avatars next to addresses ([#78](https://github.com/qredo/fusionchain/issues/78)) ([e4c0a25](https://github.com/qredo/fusionchain/commit/e4c0a250461069e6c5da29e1df48ed03f849a82d))
* **web:** add Policies section ([#62](https://github.com/qredo/fusionchain/issues/62)) ([f7ea41e](https://github.com/qredo/fusionchain/commit/f7ea41e1b43036d351bd7eca419f0673e52f7d07))
* **web:** add toast while broadcasting tx ([#68](https://github.com/qredo/fusionchain/issues/68)) ([a0a428d](https://github.com/qredo/fusionchain/commit/a0a428dbdce059e65fe55db335fbeab2cd4a20ea))
* **web:** allow environment variables at runtime ([#226](https://github.com/qredo/fusionchain/issues/226)) ([e280a1b](https://github.com/qredo/fusionchain/commit/e280a1b6380951dd1385ae1e46795c00940e8e4c))
* **web:** dYdX login through WalletConnect ([#206](https://github.com/qredo/fusionchain/issues/206)) ([9515e62](https://github.com/qredo/fusionchain/commit/9515e623bb2a3793cee017afef81f8b0d14de779))
* **web:** generate typescript protobuf messages ([3a6d14f](https://github.com/qredo/fusionchain/commit/3a6d14fa4b6c0cce07718bb6a39b9e869ca1e215))
* **web:** implement form to edit Policies for Workspaces ([#76](https://github.com/qredo/fusionchain/issues/76)) ([a3df563](https://github.com/qredo/fusionchain/commit/a3df563d0baef7a13d02f799d60e49e6fb850b36))
* **web:** initial block explorer version ([#64](https://github.com/qredo/fusionchain/issues/64)) ([0569e78](https://github.com/qredo/fusionchain/commit/0569e78b2bed97c59da7d811ecc39b39f2a093d7))
* **web:** initial version ([3e60771](https://github.com/qredo/fusionchain/commit/3e60771795f924aaab0bd70c037e34df4a60d5f1))
* **web:** keyring admin pages ([#144](https://github.com/qredo/fusionchain/issues/144)) ([d3dd2f1](https://github.com/qredo/fusionchain/commit/d3dd2f1e71d2c52b7035a25884a0d868ed5fb417))
* **web:** make RPC/REST urls configurable ([#45](https://github.com/qredo/fusionchain/issues/45)) ([3464ecd](https://github.com/qredo/fusionchain/commit/3464ecdaf5fa1aa3c9510c3fdcfa332bb677592e))
* **web:** overhaul ([#52](https://github.com/qredo/fusionchain/issues/52)) ([3747b78](https://github.com/qredo/fusionchain/commit/3747b781bb168b269c1f36c8cf0ae694eef1e858))
* **web:** revamp keys and loading states ui ([#218](https://github.com/qredo/fusionchain/issues/218)) ([05dbae1](https://github.com/qredo/fusionchain/commit/05dbae1013398d77c2191da5aeb3fbe44776b09b))
* **web:** rewrite web frontend to use Keplr and be interactive ([92e2b51](https://github.com/qredo/fusionchain/commit/92e2b510cf0c4bc79fff3b414644fac194d823b0))
* **web:** updates to frontend ([#148](https://github.com/qredo/fusionchain/issues/148)) ([931e5f0](https://github.com/qredo/fusionchain/commit/931e5f08d4a45ddbd4767ee2cf5a003fd52d2e57))
* **web:** use Blackbird API to compile policy from source ([#65](https://github.com/qredo/fusionchain/issues/65)) ([54f229b](https://github.com/qredo/fusionchain/commit/54f229b4c535b5ad46ddcc9d05060092b1a91faa))
* **web:** use BooleanPolicy instead of BlackbirdPolicy ([#145](https://github.com/qredo/fusionchain/issues/145)) ([94b9091](https://github.com/qredo/fusionchain/commit/94b9091021312c6ff4849101e1e4cf4763175c75))
* **web:** WalletConnect ([#89](https://github.com/qredo/fusionchain/issues/89)) ([4e739e0](https://github.com/qredo/fusionchain/commit/4e739e0036aeea9d8cfd70f533940f1aafa0006f))


### Performance Improvements

* **web:** speed up Explorer page ([#155](https://github.com/qredo/fusionchain/issues/155)) ([937ae77](https://github.com/qredo/fusionchain/commit/937ae77b8c41c2b2dca16fee99c8a421dc0f06ff))
