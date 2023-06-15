# CW3 Spec: MultiSig/Voting Contracts

CW3 is a specification for voting contracts based on CosmWasm. It is an extension of CW1 (which served as an immediate 1
of N multisig). In this case, no key can immediately execute, but only propose a set of messages for execution. The
proposal, subsequent approvals, and signature aggregation all happen on chain.

There are at least 3 different cases we want to cover in this spec:

- K of N immutible multisig. One key proposes a set of messages, after K-1 others approve it, it can be executed with
  the multisig address.
- K of N flexible, mutable multisig. Like above, but with multiple contracts. One contract stores the group, which is
  referenced from multiple multisig contracts (which in turn implement cw3). One cw3 contracts is able to update the
  group content (maybe needing 67% vote). Other cw3 contracts may hold tokens, staking rights, etc with various
  execution thresholds, all controlled by one group. (Group interface and updating them will be defined in a future
  spec, likely cw4).

This should fit in this interface (possibly with some extensions for pieces, but the usage should look the same
externally):

- Token weighted voting. People lock tokens in a contract for voting rights. There is a vote threshold to execute
  messages. The voting set is dynamic. This has a similar "propose, approve, execute" flow, but we will need to support
  clear YES/NO votes and quora not just absolute thresholds.

The common denominator is that they allow you to propose arbitrary `CosmosMsg` to a contract, and allow a series of
votes/approvals to determine if it can be executed, as well as a final step to execute any approved proposal once.

## Base

The following interfaces must be implemented for all cw3 contracts. Note that updating the members of the voting
contract is not contained here (one approach is defined in cw4). Also, how to change the threshold rules (if at all) is
not standardized. Those are considered admin tasks, and the common API is designed for standard usage, as that is where
we can standardize the most tooling without limiting more complex governance controls.

### Messages

`Propose{title, description, msgs, earliest, latest}` - This accepts `Vec<CosmosMsg>` and creates a new proposal. This
will return an auto-generated ID in the `Data` field (and the logs) that can be used to reference the proposal later.

If the Proposer is a valid voter on the proposal, this will imply a Yes vote by the Proposer for a faster workflow,
especially useful in eg. 2 of 3 or 3 of 5 multisig, we don't need to propose in one block, get result, and vote in
another block.

Earliest and latest are optional and can request the first and last height/time that we can try `Execute`. For a vote,
we may require at least 2 days to pass, but no more than 7. This is optional and even if set, may be modified by the
contract (overriding or just enforcing min/max/default values).

Many implementations will want to restrict who can propose. Maybe only people in the voting set. Maybe there is some
deposit to be made along with the proposal. This is not in the spec but left open to the implementation.

Attributes emitted:

| Key           | Value                  |
| ------------- | ---------------------- |
| "action"      | "propose"              |
| "sender"      | msg sender             |
| "proposal_id" | a UID for the proposal |
| "status"      | new proposal status    |

`Vote{proposal_id, vote}` - Given a proposal_id, you can vote yes, no, abstain or veto. Each signed may have a different
"weight" in the voting and they apply their entire weight on the vote.

Many contracts (like typical multisig with absolute threshold) may consider veto and abstain as no and just count yes
votes. Contracts with quora may count abstain towards quora but not yes or no for threshold. Some contracts may give
extra power to veto rather than a simple no, but this may just act like a normal no vote.

Attributes emitted:

| Key           | Value                  |
| ------------- | ---------------------- |
| "action"      | "vote"                 |
| "sender"      | msg sender             |
| "proposal_id" | a UID for the proposal |
| "status"      | new proposal status    |

`Execute{proposal_id}` - This will check if the voting conditions have passed for the given proposal. If it has
succeeded, the proposal is marked as `Executed` and the messages are dispatched. If the messages fail (eg out of gas),
this is all reverted and can be tried again later with more gas.

Attributes emitted:

| Key           | Value                  |
| ------------- | ---------------------- |
| "action"      | "execute"              |
| "sender"      | msg sender             |
| "proposal_id" | a UID for the proposal |

`Close{proposal_id}` - This will check if the voting conditions have failed for the given proposal. If so (eg. time
expired and insufficient votes), then the proposal is marked `Failed`. This is not strictly necessary, as it will only
act when it is impossible the contract would ever be executed, but can be triggered to provide some better UI.

Attributes emitted:

| Key           | Value                  |
| ------------- | ---------------------- |
| "action"      | "close"                |
| "sender"      | msg sender             |
| "proposal_id" | a UID for the proposal |

### Queries

`Threshold{}` - This returns information on the rules needed to declare a contract a success. What percentage of the
votes and how they are tallied.

`Proposal{proposal_id}` - Returns the information set when creating the proposal, along with the current status.

`ListProposals{start_after, limit}` - Returns the same info as `Proposal`, but for all proposals along with pagination.
Starts at proposal_id 1 and accending.

`ReverseProposals{start_before, limit}` - Returns the same info as `Proposal`, but for all proposals along with
pagination. Starts at latest proposal_id and descending. (Often this is what you will want for a UI)

`Vote{proposal_id, voter}` - Returns how the given voter (HumanAddr) voted on the proposal. (May be null)

`ListVotes{proposal_id, start_after, limit}` - Returns the same info as `Vote`, but for all votes along with pagination.
Returns the voters sorted by the voters' address in lexographically ascending order.

## Voter Info

Information on who can vote is contract dependent. But we will work on a common API to display some of this.

`Voter { address }` - returns voting power (weight) of this address, if any

`ListVoters { start_after, limit }` - list all eligable voters
