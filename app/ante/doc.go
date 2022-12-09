/*
Package ante defines the SDK auth module's AnteHandler as well as an internal
AnteHandler for an Ethereum transaction (i.e MsgEthereumTx).

During CheckTx, the transaction is passed through a series of
pre-message execution validation checks such as signature and account
verification in addition to minimum fees being checked. Otherwise, during
DeliverTx, the transaction is simply passed to the EVM which will also
perform the same series of checks. The distinction is made in CheckTx to
prevent spam and DoS attacks.
*/
package ante
