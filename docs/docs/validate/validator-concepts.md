# Introduction to validator concepts

  

Validators play an important role in the operation and security of blockchain networks. The purpose of this section is to introduce key concepts related to validators. Note that this is work in progress. Mechanisms and values are susceptible to change.

  

**What’s a validator?**

A validator is a participant in a blockchain network responsible for verifying and validating transactions and blocks on the network. The role of validators is to run full nodes and participate in consensus by broadcasting votes that contain cryptographic signatures signed by the validator’s private key. Validators commit new blocks, and receive revenue in exchange for their work. They responsibilities include: transaction validation, block creation and validation, consensus- and governance participation, and delegator management.

  

**What’s a full node?**

A full node is a program or software client that maintains a complete copy of the blockchain ledger for a particular network. It’s a server running a chain’s binary (its software) that fully validates transactions and blocks of a blockchain and keeps a full record of all historic activity. Full nodes play a critical role in the decentralized nature of blockchain systems by independently verifying and validating transactions without relying on a central authority. Running a full-node means you are running a non-compromised, up-to-date version of the Warden Protocol.

  

**What’s staking?**

Staking refers to the process of participating in a blockchain network’s proof-of-stake (POS) consensus mechanism by locking up a certain amount of tokens as collateral to support the network’s operations. Staking occurs when Warden users delegate their WARD to a validator. This increases a validator’s weight, which in turn improves the likelihood of being selected to validate blocks and earn rewards.  
  

A validator’s weight (total stake) is determined by the amount of staking tokens (WARD) they delegate to themselves plus the WARD bonded to them by external delegators. The weight of a validator determines whether or not they are active validators and how frequently they can propose a block. A validator with a higher weight will propose blocks more frequently and in turn generate more revenue.

  

**What’s a delegator?**

A delegator is an individual or entity that holds WARD tokens and participates in a proof-of-stake blockchain network by delegating their tokens to a validator. Delegators choose to delegate their tokens to validators to participate in the staking process, secure the network and earn rewards without the responsibility of running a validator node themselves.

  

Delegators share the benefits and rewards with their validator. If a validator is successful, its delegator will consistently share in the rewards structure. Conversely, if a validator is slashed for malicious behavior, the delegator’s stake will also be slashed. This is why it's important that delegators perform due-diligence on validators before delegating. Delegators may also diversify their risk by spreading their stake over multiple validators.

  

**What’s a validator’s commission?**

A validator’s commission refers to the percentage of staking rewards earned by the validator’s pool that the validator retains for themselves, rather than distributing it to their delegators.

  

The revenue received by a validator’s pool is split between the validator and their delegators. Each validator sets its own initial commission, its maximum daily commission change rate and its maximum commission. These parameters can only be defined when initially declaring candidacy, and may only be constrained further after being declared.
