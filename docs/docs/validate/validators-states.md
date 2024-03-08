# What are the different states a validator can be in?

Validators can exist in different states depending on their participation in the consensus process and their status in the network. States reflect the different stages of the validator's lifecycle from active participation to removal from the networks. States a validators can be in are: bonded, unbonding and unbonded.

  
**-   Bonded:** a validator that is in the active set and participates in consensus. Bonded validators validate transactions, propose blocks and earn rewards for their contributions to the network.
    
**-   Unbonding:** a validator that is transitioning from the bonded to the unbonded states. Validators may enter an unbonding state when they decide to stop participating in the network or when they are slashed for misbehavior. During the unbonding period, the validator is not participating in the consensus process and is not earning rewards.
    
**-   Unbonded:** A validator that is not in the active set and is not signing blocks. Unbonded validators can't be slashed, and can’t earn any rewards from their operation.

All delegators have the same state as their validators.

