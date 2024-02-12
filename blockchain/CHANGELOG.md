# wardend 1.0.0 (2024-02-12)


### Bug Fixes

* **blockchain/policy:** cannot create a Policy with custom Participants ([#60](https://github.com/eq-lab/wardenprotocol/issues/60)) ([df25c41](https://github.com/eq-lab/wardenprotocol/commit/df25c41a7cd71e8f508ecd3bd5775bda4dc24c6f))
* **blockchain/treasury:** typo in policy generator name ([#84](https://github.com/eq-lab/wardenprotocol/issues/84)) ([1d961b0](https://github.com/eq-lab/wardenprotocol/commit/1d961b0d977c3628aecae760b8ff7597f092d981))
* **blockchain:** fix cosmos-sdk version in go.mod ([#59](https://github.com/eq-lab/wardenprotocol/issues/59)) ([d3f2968](https://github.com/eq-lab/wardenprotocol/commit/d3f296893789bf297729be49e5c943638f359719))
* **blockchain:** fusiond info cmd ([#222](https://github.com/eq-lab/wardenprotocol/issues/222)) ([9278185](https://github.com/eq-lab/wardenprotocol/commit/92781854526ce9e121eaa2d60d0b4414e2af5fd1))
* **blockchain:** genesis keyring issue ([#121](https://github.com/eq-lab/wardenprotocol/issues/121)) ([39a9bcb](https://github.com/eq-lab/wardenprotocol/commit/39a9bcbe46800f91e83225dbccdff9b545bbb795))
* **blockchain:** key/keyrequest CRUD issues (fixes LABS-319) ([#102](https://github.com/eq-lab/wardenprotocol/issues/102)) ([313d360](https://github.com/eq-lab/wardenprotocol/commit/313d36057ca5e6f59ff5d84df81c47c14fe01af7))
* **blockchain:** keyring.Fees can be nil ([#176](https://github.com/eq-lab/wardenprotocol/issues/176)) ([2cbc75d](https://github.com/eq-lab/wardenprotocol/commit/2cbc75d0c8374ab4c825b2dc3a7a3299eec09648))
* **blockchain:** move Action from identity to blackbird module ([#28](https://github.com/eq-lab/wardenprotocol/issues/28)) ([71a19f0](https://github.com/eq-lab/wardenprotocol/commit/71a19f0195a7791ca28670ee47bccf7ccdfd4353))
* **blockchain:** qasset methods (mint, burn, send) ([#31](https://github.com/eq-lab/wardenprotocol/issues/31)) ([4368157](https://github.com/eq-lab/wardenprotocol/commit/43681579bb3a59e350ada98aa6d87730711a5c97))
* **blockchain:** use test keyring backend in bootstrap script ([#220](https://github.com/eq-lab/wardenprotocol/issues/220)) ([32381d6](https://github.com/eq-lab/wardenprotocol/commit/32381d6c2a0ec7e155cfcef91f205019fb64fef3))
* broadcast tx mode "block" has been removed, use "sync" instead ([c4bd573](https://github.com/eq-lab/wardenprotocol/commit/c4bd5738f3d3da90887dbea8b6e6a4350d0f17d6))
* **ci:** Use Makefile for fusiond instead of go build ([#224](https://github.com/eq-lab/wardenprotocol/issues/224)) ([e885ec0](https://github.com/eq-lab/wardenprotocol/commit/e885ec0775d07cfefe5361e5f50ac3323ae43ed2))
* enforce 32bytes for sig request ([#183](https://github.com/eq-lab/wardenprotocol/issues/183)) ([a192e0b](https://github.com/eq-lab/wardenprotocol/commit/a192e0b980ba3c9e9506d5d1088ee05b71a79f26))
* errcheck linter errors ([2bbf57b](https://github.com/eq-lab/wardenprotocol/commit/2bbf57b7e8e2e750fe9e3d9e2183b518dd2a3856))
* **faucet:** allow CORS requests ([7875159](https://github.com/eq-lab/wardenprotocol/commit/78751599548db996bde83cf7135df2121d959fd1))
* frontend ([#132](https://github.com/eq-lab/wardenprotocol/issues/132)) ([fd24215](https://github.com/eq-lab/wardenprotocol/commit/fd24215dfb76e7f0a222d30d9473300bcea4ff42))
* gosec linter errors ([62afda0](https://github.com/eq-lab/wardenprotocol/commit/62afda055d626a711f987caf4889be6210a5a126))
* **identity:** refactors how owner duplications is checked ([#91](https://github.com/eq-lab/wardenprotocol/issues/91)) ([b449687](https://github.com/eq-lab/wardenprotocol/commit/b44968707605b1eda3efbc97ea27d7982dcf4ac9))
* keys query ([#202](https://github.com/eq-lab/wardenprotocol/issues/202)) ([2091cde](https://github.com/eq-lab/wardenprotocol/commit/2091cde5788437268691a7f842984037d0a2d7d8))
* proto generation missing files ([#133](https://github.com/eq-lab/wardenprotocol/issues/133)) ([5de3f3d](https://github.com/eq-lab/wardenprotocol/commit/5de3f3db1d8e3c85a4e1e77f10cf9b17043d3b9c))
* semantic-release github plugin disable comments on PRs and issues ([#161](https://github.com/eq-lab/wardenprotocol/issues/161)) ([9dd5a90](https://github.com/eq-lab/wardenprotocol/commit/9dd5a90baf619f2160468d3483db8ffb45c6d80a))
* update all ports ([#99](https://github.com/eq-lab/wardenprotocol/issues/99)) ([ac65c0d](https://github.com/eq-lab/wardenprotocol/commit/ac65c0daea22b5d7a3656d2a3a61ea2b5a11943e))


### Features

* add blockchain bootstrap script ([#219](https://github.com/eq-lab/wardenprotocol/issues/219)) ([6a9dd45](https://github.com/eq-lab/wardenprotocol/commit/6a9dd45183dd617a84d07d55986ccbb5aae0abab))
* add WalletConnect methods for Uniswap ([#205](https://github.com/eq-lab/wardenprotocol/issues/205)) ([b43a307](https://github.com/eq-lab/wardenprotocol/commit/b43a307ee728ce9043ed03e51a9528394d48c4ca))
* added sui address support ([#193](https://github.com/eq-lab/wardenprotocol/issues/193)) ([0c35a1d](https://github.com/eq-lab/wardenprotocol/commit/0c35a1dc6acd3ff441818f3871498a009ee2e967))
* **blackbird:** use latest version ([#105](https://github.com/eq-lab/wardenprotocol/issues/105)) ([caf6740](https://github.com/eq-lab/wardenprotocol/commit/caf67404f43ef529c8aabea527024e2af309f39a))
* **blockchain/blackbird:** add NewPolicy transaction ([#38](https://github.com/eq-lab/wardenprotocol/issues/38)) ([c2af2cc](https://github.com/eq-lab/wardenprotocol/commit/c2af2cc6870b1b342358292eccb3adac625536d0))
* **blockchain/blackbird:** add Participants to Policies ([#56](https://github.com/eq-lab/wardenprotocol/issues/56)) ([74ae686](https://github.com/eq-lab/wardenprotocol/commit/74ae6868b561753a1e690101b2a1fab57718d5d3))
* **blockchain/blackbird:** add Policies query ([#40](https://github.com/eq-lab/wardenprotocol/issues/40)) ([c90970d](https://github.com/eq-lab/wardenprotocol/commit/c90970db9e435cfb4ecf68d9edd0e93825c44220))
* **blockchain/blackbird:** add PolicyById query ([#44](https://github.com/eq-lab/wardenprotocol/issues/44)) ([c13bef8](https://github.com/eq-lab/wardenprotocol/commit/c13bef83a678474c9a601e054526645773ea8c55))
* **blockchain/blackbird:** add Witness field to ApproveAction message ([#51](https://github.com/eq-lab/wardenprotocol/issues/51)) ([4a225b4](https://github.com/eq-lab/wardenprotocol/commit/4a225b4adb3d89bbd3144ab53f1ac09f25d4dadb))
* **blockchain/identity:** add AdminPolicyId and SignPolicyId to workspaces ([#41](https://github.com/eq-lab/wardenprotocol/issues/41)) ([22b9145](https://github.com/eq-lab/wardenprotocol/commit/22b914545767cfc94b25c9daf964ce05374ebe80))
* **blockchain/identity:** implement MsgUpdateWorkspace transaction ([#74](https://github.com/eq-lab/wardenprotocol/issues/74)) ([0dc01ae](https://github.com/eq-lab/wardenprotocol/commit/0dc01ae982415294b47b93168d1c34178b045ff1))
* **blockchain/policy:** add ActionsByAddress query ([#71](https://github.com/eq-lab/wardenprotocol/issues/71)) ([0e7bd85](https://github.com/eq-lab/wardenprotocol/commit/0e7bd85b127b9b4549d3ae8d8dc872a100b9c886))
* **blockchain/policy:** attach a Metadata to Policy query responses ([#75](https://github.com/eq-lab/wardenprotocol/issues/75)) ([d49e8d1](https://github.com/eq-lab/wardenprotocol/commit/d49e8d1d24c1235a6a531deae305d4305eb316db))
* **blockchain/treasury:** extends keys cmd ([#85](https://github.com/eq-lab/wardenprotocol/issues/85)) ([6a2b1b6](https://github.com/eq-lab/wardenprotocol/commit/6a2b1b60c1041d49f0955809f0b90c16a9e62130))
* **blockchain/treasury:** re-use id of KeyRequest ([#87](https://github.com/eq-lab/wardenprotocol/issues/87)) ([41d4de2](https://github.com/eq-lab/wardenprotocol/commit/41d4de2d60f6ced463e32233d683d66f33b6f7d3))
* **blockchain:** add `revenue` module ([#73](https://github.com/eq-lab/wardenprotocol/issues/73)) ([37f7708](https://github.com/eq-lab/wardenprotocol/commit/37f7708a8fafe41e4b0c5627a82c8afbb2f51a12))
* **blockchain:** add boolparser from qredochain ([#140](https://github.com/eq-lab/wardenprotocol/issues/140)) ([f087ee7](https://github.com/eq-lab/wardenprotocol/commit/f087ee74a7b1635add56b3b752559544dfef4f5c))
* **blockchain:** add key type to signature request and perform data validation on keyring response ([#196](https://github.com/eq-lab/wardenprotocol/issues/196)) ([5f26a67](https://github.com/eq-lab/wardenprotocol/commit/5f26a67fd3ec31da5ea0815d55948ceac3d4ea5f))
* **blockchain:** Add MetaData field to MsgNewSignTransactionRequest. ([#212](https://github.com/eq-lab/wardenprotocol/issues/212)) ([7946aa8](https://github.com/eq-lab/wardenprotocol/commit/7946aa89d5a90087e6f085e658b633c6007536cf))
* **blockchain:** add more Actions to workspaces ([#43](https://github.com/eq-lab/wardenprotocol/issues/43)) ([ae466c2](https://github.com/eq-lab/wardenprotocol/commit/ae466c2eca228f589d1ed9a7dbf4f24482232ee8))
* **blockchain:** add policyByID to wasm->policy queries and fix policy module name in CLI ([#67](https://github.com/eq-lab/wardenprotocol/issues/67)) ([b79d8a6](https://github.com/eq-lab/wardenprotocol/commit/b79d8a64e483cbbb3b6de040f1f320e416bfe91d))
* **blockchain:** CosmWasm composability features, update to v0.42.0, restore ibc tests, removal of linting ([#63](https://github.com/eq-lab/wardenprotocol/issues/63)) ([5484b98](https://github.com/eq-lab/wardenprotocol/commit/5484b983af943bed4c8236a8351f56b4d2a30df9))
* **blockchain:** Implement SignTransactionRequestById Query for MPCs to use ([#53](https://github.com/eq-lab/wardenprotocol/issues/53)) ([bdfbb00](https://github.com/eq-lab/wardenprotocol/commit/bdfbb002dad786fae016cf98f8573d79efd1c3a1))
* **blockchain:** improve init.sh with auto-install and alias setter (LABS-298), reset to default ports/flag for alternate ports (LABS-301) ([#96](https://github.com/eq-lab/wardenprotocol/issues/96)) ([67694e7](https://github.com/eq-lab/wardenprotocol/commit/67694e7218ae8c9e10716a3cf9e2792b00611997))
* **blockchain:** keyring accounts + fees ([#124](https://github.com/eq-lab/wardenprotocol/issues/124)) ([584bd3b](https://github.com/eq-lab/wardenprotocol/commit/584bd3b4cd37bd53d2c7264329ad2486666e9810))
* **blockchain:** store custom Policies for using them in Actions ([#34](https://github.com/eq-lab/wardenprotocol/issues/34)) ([4e138c6](https://github.com/eq-lab/wardenprotocol/commit/4e138c69cabe95a8992d9564fc04169edca47a35))
* identity unit tests ([#130](https://github.com/eq-lab/wardenprotocol/issues/130)) ([14adeb7](https://github.com/eq-lab/wardenprotocol/commit/14adeb7946d3978129475eea5ad30fef6738b718))
* **identity:** query keyring by id ([#95](https://github.com/eq-lab/wardenprotocol/issues/95)) ([20a666a](https://github.com/eq-lab/wardenprotocol/commit/20a666ac0eec0db2c11dcd141ba19eaaad19b4b8))
* **keyring:** add keyring releaserc JSON ([#171](https://github.com/eq-lab/wardenprotocol/issues/171)) ([9dfe5b2](https://github.com/eq-lab/wardenprotocol/commit/9dfe5b20b5df63fbc5bdade434522912568ea5cf))
* new keyring activation status ([#118](https://github.com/eq-lab/wardenprotocol/issues/118)) ([640c9bc](https://github.com/eq-lab/wardenprotocol/commit/640c9bcf6af288751dc50559bcd261ea115c1b6b))
* **policy/action:** adding timeout for an action ([#93](https://github.com/eq-lab/wardenprotocol/issues/93)) ([59d5f27](https://github.com/eq-lab/wardenprotocol/commit/59d5f275ad6b2de7d055163810896174fd0f810b))
* **policy:** ability to revoke an action ([#88](https://github.com/eq-lab/wardenprotocol/issues/88)) ([df1918d](https://github.com/eq-lab/wardenprotocol/commit/df1918d140f0dac00b9004eecdd4e997877c45a2))
* **treasury:** query keys all option ([#100](https://github.com/eq-lab/wardenprotocol/issues/100)) ([6ecfa6f](https://github.com/eq-lab/wardenprotocol/commit/6ecfa6f6ca990a45f159998c797aa4dfc1d56a04))
* **web:** add Metadata field to SignTransactionRequest ([#229](https://github.com/eq-lab/wardenprotocol/issues/229)) ([0faede2](https://github.com/eq-lab/wardenprotocol/commit/0faede2fd7437a2006da3fbcdbbbe7ab3243ee2b))
* **web:** overhaul ([#52](https://github.com/eq-lab/wardenprotocol/issues/52)) ([3747b78](https://github.com/eq-lab/wardenprotocol/commit/3747b781bb168b269c1f36c8cf0ae694eef1e858))

# wardend [1.7.0](https://github.com/warden-protocol/wardenprotocol/compare/wardend@1.6.3...wardend@1.7.0) (2024-01-19)


### Features

* **web:** add Metadata field to SignTransactionRequest ([#229](https://github.com/warden-protocol/wardenprotocol/issues/229)) ([0faede2](https://github.com/warden-protocol/wardenprotocol/commit/0faede2fd7437a2006da3fbcdbbbe7ab3243ee2b))

## wardend [1.6.3](https://github.com/warden-protocol/wardenprotocol/compare/wardend@1.6.2...wardend@1.6.3) (2024-01-16)


### Bug Fixes

* **blockchain:** wardend info cmd ([#222](https://github.com/warden-protocol/wardenprotocol/issues/222)) ([9278185](https://github.com/warden-protocol/wardenprotocol/commit/92781854526ce9e121eaa2d60d0b4414e2af5fd1))

## wardend [1.6.2](https://github.com/warden-protocol/wardenprotocol/compare/wardend@1.6.1...wardend@1.6.2) (2024-01-15)


### Bug Fixes

* **ci:** Use Makefile for wardend instead of go build ([#224](https://github.com/warden-protocol/wardenprotocol/issues/224)) ([e885ec0](https://github.com/warden-protocol/wardenprotocol/commit/e885ec0775d07cfefe5361e5f50ac3323ae43ed2))

## wardend [1.6.1](https://github.com/warden-protocol/wardenprotocol/compare/wardend@1.6.0...wardend@1.6.1) (2024-01-15)


### Bug Fixes

* **blockchain:** use test keychain backend in bootstrap script ([#220](https://github.com/warden-protocol/wardenprotocol/issues/220)) ([32381d6](https://github.com/warden-protocol/wardenprotocol/commit/32381d6c2a0ec7e155cfcef91f205019fb64fef3))

# wardend [1.6.0](https://github.com/warden-protocol/wardenprotocol/compare/wardend@1.5.0...wardend@1.6.0) (2024-01-10)


### Features

* add blockchain bootstrap script ([#219](https://github.com/warden-protocol/wardenprotocol/issues/219)) ([6a9dd45](https://github.com/warden-protocol/wardenprotocol/commit/6a9dd45183dd617a84d07d55986ccbb5aae0abab))

# wardend [1.5.0](https://github.com/warden-protocol/wardenprotocol/compare/wardend@1.4.0...wardend@1.5.0) (2024-01-05)


### Features

* **blockchain:** Add MetaData field to MsgNewSignTransactionRequest. ([#212](https://github.com/warden-protocol/wardenprotocol/issues/212)) ([7946aa8](https://github.com/warden-protocol/wardenprotocol/commit/7946aa89d5a90087e6f085e658b633c6007536cf))

# wardend [1.4.0](https://github.com/warden-protocol/wardenprotocol/compare/wardend@1.3.1...wardend@1.4.0) (2024-01-04)


### Features

* add WalletConnect methods for Uniswap ([#205](https://github.com/warden-protocol/wardenprotocol/issues/205)) ([b43a307](https://github.com/warden-protocol/wardenprotocol/commit/b43a307ee728ce9043ed03e51a9528394d48c4ca))

## wardend [1.3.1](https://github.com/warden-protocol/wardenprotocol/compare/wardend@1.3.0...wardend@1.3.1) (2023-12-29)


### Bug Fixes

* keys query ([#202](https://github.com/warden-protocol/wardenprotocol/issues/202)) ([2091cde](https://github.com/warden-protocol/wardenprotocol/commit/2091cde5788437268691a7f842984037d0a2d7d8))

# wardend [1.3.0](https://github.com/warden-protocol/wardenprotocol/compare/wardend@1.2.0...wardend@1.3.0) (2023-12-23)


### Features

* added sui address support ([#193](https://github.com/warden-protocol/wardenprotocol/issues/193)) ([0c35a1d](https://github.com/warden-protocol/wardenprotocol/commit/0c35a1dc6acd3ff441818f3871498a009ee2e967))

# wardend [1.2.0](https://github.com/warden-protocol/wardenprotocol/compare/wardend@1.1.2...wardend@1.2.0) (2023-12-22)


### Features

* **blockchain:** add key type to signature request and perform data validation on keychain response ([#196](https://github.com/warden-protocol/wardenprotocol/issues/196)) ([5f26a67](https://github.com/warden-protocol/wardenprotocol/commit/5f26a67fd3ec31da5ea0815d55948ceac3d4ea5f))

## wardend [1.1.2](https://github.com/warden-protocol/wardenprotocol/compare/wardend@1.1.1...wardend@1.1.2) (2023-12-15)


### Bug Fixes

* enforce 32bytes for sig request ([#183](https://github.com/warden-protocol/wardenprotocol/issues/183)) ([a192e0b](https://github.com/warden-protocol/wardenprotocol/commit/a192e0b980ba3c9e9506d5d1088ee05b71a79f26))

## wardend [1.1.1](https://github.com/warden-protocol/wardenprotocol/compare/wardend@1.1.0...wardend@1.1.1) (2023-12-12)


### Bug Fixes

* **blockchain:** keychain.Fees can be nil ([#176](https://github.com/warden-protocol/wardenprotocol/issues/176)) ([2cbc75d](https://github.com/warden-protocol/wardenprotocol/commit/2cbc75d0c8374ab4c825b2dc3a7a3299eec09648))

# wardend [1.1.0](https://github.com/warden-protocol/wardenprotocol/compare/wardend@1.0.1...wardend@1.1.0) (2023-12-12)


### Features

* **keychain:** add keychain releaserc JSON ([#171](https://github.com/warden-protocol/wardenprotocol/issues/171)) ([9dfe5b2](https://github.com/warden-protocol/wardenprotocol/commit/9dfe5b20b5df63fbc5bdade434522912568ea5cf))

## wardend [1.0.1](https://github.com/warden-protocol/wardenprotocol/compare/wardend@1.0.0...wardend@1.0.1) (2023-12-07)


### Bug Fixes

* semantic-release github plugin disable comments on PRs and issues ([#161](https://github.com/warden-protocol/wardenprotocol/issues/161)) ([9dd5a90](https://github.com/warden-protocol/wardenprotocol/commit/9dd5a90baf619f2160468d3483db8ffb45c6d80a))

# wardend 1.0.0 (2023-12-07)


### Bug Fixes

* **blockchain/intent:** cannot create a Intent with custom Participants ([#60](https://github.com/warden-protocol/wardenprotocol/issues/60)) ([df25c41](https://github.com/warden-protocol/wardenprotocol/commit/df25c41a7cd71e8f508ecd3bd5775bda4dc24c6f))
* **blockchain/treasury:** typo in intent generator name ([#84](https://github.com/warden-protocol/wardenprotocol/issues/84)) ([1d961b0](https://github.com/warden-protocol/wardenprotocol/commit/1d961b0d977c3628aecae760b8ff7597f092d981))
* **blockchain:** fix cosmos-sdk version in go.mod ([#59](https://github.com/warden-protocol/wardenprotocol/issues/59)) ([d3f2968](https://github.com/warden-protocol/wardenprotocol/commit/d3f296893789bf297729be49e5c943638f359719))
* **blockchain:** genesis keychain issue ([#121](https://github.com/warden-protocol/wardenprotocol/issues/121)) ([39a9bcb](https://github.com/warden-protocol/wardenprotocol/commit/39a9bcbe46800f91e83225dbccdff9b545bbb795))
* **blockchain:** key/keyrequest CRUD issues (fixes LABS-319) ([#102](https://github.com/warden-protocol/wardenprotocol/issues/102)) ([313d360](https://github.com/warden-protocol/wardenprotocol/commit/313d36057ca5e6f59ff5d84df81c47c14fe01af7))
* **blockchain:** move Action from identity to blackbird module ([#28](https://github.com/warden-protocol/wardenprotocol/issues/28)) ([71a19f0](https://github.com/warden-protocol/wardenprotocol/commit/71a19f0195a7791ca28670ee47bccf7ccdfd4353))
* **blockchain:** qasset methods (mint, burn, send) ([#31](https://github.com/warden-protocol/wardenprotocol/issues/31)) ([4368157](https://github.com/warden-protocol/wardenprotocol/commit/43681579bb3a59e350ada98aa6d87730711a5c97))
* broadcast tx mode "block" has been removed, use "sync" instead ([c4bd573](https://github.com/warden-protocol/wardenprotocol/commit/c4bd5738f3d3da90887dbea8b6e6a4350d0f17d6))
* errcheck linter errors ([2bbf57b](https://github.com/warden-protocol/wardenprotocol/commit/2bbf57b7e8e2e750fe9e3d9e2183b518dd2a3856))
* **faucet:** allow CORS requests ([7875159](https://github.com/warden-protocol/wardenprotocol/commit/78751599548db996bde83cf7135df2121d959fd1))
* frontend ([#132](https://github.com/warden-protocol/wardenprotocol/issues/132)) ([fd24215](https://github.com/warden-protocol/wardenprotocol/commit/fd24215dfb76e7f0a222d30d9473300bcea4ff42))
* gosec linter errors ([62afda0](https://github.com/warden-protocol/wardenprotocol/commit/62afda055d626a711f987caf4889be6210a5a126))
* **identity:** refactors how owner duplications is checked ([#91](https://github.com/warden-protocol/wardenprotocol/issues/91)) ([b449687](https://github.com/warden-protocol/wardenprotocol/commit/b44968707605b1eda3efbc97ea27d7982dcf4ac9))
* proto generation missing files ([#133](https://github.com/warden-protocol/wardenprotocol/issues/133)) ([5de3f3d](https://github.com/warden-protocol/wardenprotocol/commit/5de3f3db1d8e3c85a4e1e77f10cf9b17043d3b9c))
* update all ports ([#99](https://github.com/warden-protocol/wardenprotocol/issues/99)) ([ac65c0d](https://github.com/warden-protocol/wardenprotocol/commit/ac65c0daea22b5d7a3656d2a3a61ea2b5a11943e))


### Features

* **blackbird:** use latest version ([#105](https://github.com/warden-protocol/wardenprotocol/issues/105)) ([caf6740](https://github.com/warden-protocol/wardenprotocol/commit/caf67404f43ef529c8aabea527024e2af309f39a))
* **blockchain/blackbird:** add NewIntent transaction ([#38](https://github.com/warden-protocol/wardenprotocol/issues/38)) ([c2af2cc](https://github.com/warden-protocol/wardenprotocol/commit/c2af2cc6870b1b342358292eccb3adac625536d0))
* **blockchain/blackbird:** add Participants to Intents ([#56](https://github.com/warden-protocol/wardenprotocol/issues/56)) ([74ae686](https://github.com/warden-protocol/wardenprotocol/commit/74ae6868b561753a1e690101b2a1fab57718d5d3))
* **blockchain/blackbird:** add Intents query ([#40](https://github.com/warden-protocol/wardenprotocol/issues/40)) ([c90970d](https://github.com/warden-protocol/wardenprotocol/commit/c90970db9e435cfb4ecf68d9edd0e93825c44220))
* **blockchain/blackbird:** add IntentById query ([#44](https://github.com/warden-protocol/wardenprotocol/issues/44)) ([c13bef8](https://github.com/warden-protocol/wardenprotocol/commit/c13bef83a678474c9a601e054526645773ea8c55))
* **blockchain/blackbird:** add Witness field to ApproveAction message ([#51](https://github.com/warden-protocol/wardenprotocol/issues/51)) ([4a225b4](https://github.com/warden-protocol/wardenprotocol/commit/4a225b4adb3d89bbd3144ab53f1ac09f25d4dadb))
* **blockchain/identity:** add AdminIntentId and SignIntentId to spaces ([#41](https://github.com/warden-protocol/wardenprotocol/issues/41)) ([22b9145](https://github.com/warden-protocol/wardenprotocol/commit/22b914545767cfc94b25c9daf964ce05374ebe80))
* **blockchain/identity:** implement MsgUpdateSpace transaction ([#74](https://github.com/warden-protocol/wardenprotocol/issues/74)) ([0dc01ae](https://github.com/warden-protocol/wardenprotocol/commit/0dc01ae982415294b47b93168d1c34178b045ff1))
* **blockchain/intent:** add ActionsByAddress query ([#71](https://github.com/warden-protocol/wardenprotocol/issues/71)) ([0e7bd85](https://github.com/warden-protocol/wardenprotocol/commit/0e7bd85b127b9b4549d3ae8d8dc872a100b9c886))
* **blockchain/intent:** attach a Metadata to Intent query responses ([#75](https://github.com/warden-protocol/wardenprotocol/issues/75)) ([d49e8d1](https://github.com/warden-protocol/wardenprotocol/commit/d49e8d1d24c1235a6a531deae305d4305eb316db))
* **blockchain/treasury:** extends keys cmd ([#85](https://github.com/warden-protocol/wardenprotocol/issues/85)) ([6a2b1b6](https://github.com/warden-protocol/wardenprotocol/commit/6a2b1b60c1041d49f0955809f0b90c16a9e62130))
* **blockchain/treasury:** re-use id of KeyRequest ([#87](https://github.com/warden-protocol/wardenprotocol/issues/87)) ([41d4de2](https://github.com/warden-protocol/wardenprotocol/commit/41d4de2d60f6ced463e32233d683d66f33b6f7d3))
* **blockchain:** add `revenue` module ([#73](https://github.com/warden-protocol/wardenprotocol/issues/73)) ([37f7708](https://github.com/warden-protocol/wardenprotocol/commit/37f7708a8fafe41e4b0c5627a82c8afbb2f51a12))
* **blockchain:** add boolparser from qredochain ([#140](https://github.com/warden-protocol/wardenprotocol/issues/140)) ([f087ee7](https://github.com/warden-protocol/wardenprotocol/commit/f087ee74a7b1635add56b3b752559544dfef4f5c))
* **blockchain:** add more Actions to spaces ([#43](https://github.com/warden-protocol/wardenprotocol/issues/43)) ([ae466c2](https://github.com/warden-protocol/wardenprotocol/commit/ae466c2eca228f589d1ed9a7dbf4f24482232ee8))
* **blockchain:** add intentByID to wasm->intent queries and fix intent module name in CLI ([#67](https://github.com/warden-protocol/wardenprotocol/issues/67)) ([b79d8a6](https://github.com/warden-protocol/wardenprotocol/commit/b79d8a64e483cbbb3b6de040f1f320e416bfe91d))
* **blockchain:** CosmWasm composability features, update to v0.42.0, restore ibc tests, removal of linting ([#63](https://github.com/warden-protocol/wardenprotocol/issues/63)) ([5484b98](https://github.com/warden-protocol/wardenprotocol/commit/5484b983af943bed4c8236a8351f56b4d2a30df9))
* **blockchain:** Implement SignTransactionRequestById Query for MPCs to use ([#53](https://github.com/warden-protocol/wardenprotocol/issues/53)) ([bdfbb00](https://github.com/warden-protocol/wardenprotocol/commit/bdfbb002dad786fae016cf98f8573d79efd1c3a1))
* **blockchain:** improve init.sh with auto-install and alias setter (LABS-298), reset to default ports/flag for alternate ports (LABS-301) ([#96](https://github.com/warden-protocol/wardenprotocol/issues/96)) ([67694e7](https://github.com/warden-protocol/wardenprotocol/commit/67694e7218ae8c9e10716a3cf9e2792b00611997))
* **blockchain:** keychain accounts + fees ([#124](https://github.com/warden-protocol/wardenprotocol/issues/124)) ([584bd3b](https://github.com/warden-protocol/wardenprotocol/commit/584bd3b4cd37bd53d2c7264329ad2486666e9810))
* **blockchain:** store custom Intents for using them in Actions ([#34](https://github.com/warden-protocol/wardenprotocol/issues/34)) ([4e138c6](https://github.com/warden-protocol/wardenprotocol/commit/4e138c69cabe95a8992d9564fc04169edca47a35))
* identity unit tests ([#130](https://github.com/warden-protocol/wardenprotocol/issues/130)) ([14adeb7](https://github.com/warden-protocol/wardenprotocol/commit/14adeb7946d3978129475eea5ad30fef6738b718))
* **identity:** query keychain by id ([#95](https://github.com/warden-protocol/wardenprotocol/issues/95)) ([20a666a](https://github.com/warden-protocol/wardenprotocol/commit/20a666ac0eec0db2c11dcd141ba19eaaad19b4b8))
* new keychain activation status ([#118](https://github.com/warden-protocol/wardenprotocol/issues/118)) ([640c9bc](https://github.com/warden-protocol/wardenprotocol/commit/640c9bcf6af288751dc50559bcd261ea115c1b6b))
* **intent/action:** adding timeout for an action ([#93](https://github.com/warden-protocol/wardenprotocol/issues/93)) ([59d5f27](https://github.com/warden-protocol/wardenprotocol/commit/59d5f275ad6b2de7d055163810896174fd0f810b))
* **intent:** ability to revoke an action ([#88](https://github.com/warden-protocol/wardenprotocol/issues/88)) ([df1918d](https://github.com/warden-protocol/wardenprotocol/commit/df1918d140f0dac00b9004eecdd4e997877c45a2))
* **treasury:** query keys all option ([#100](https://github.com/warden-protocol/wardenprotocol/issues/100)) ([6ecfa6f](https://github.com/warden-protocol/wardenprotocol/commit/6ecfa6f6ca990a45f159998c797aa4dfc1d56a04))
* **web:** overhaul ([#52](https://github.com/warden-protocol/wardenprotocol/issues/52)) ([3747b78](https://github.com/warden-protocol/wardenprotocol/commit/3747b781bb168b269c1f36c8cf0ae694eef1e858))
