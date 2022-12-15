<!--
order: 6
-->

# Hooks

The `x/evm` module implements an `EvmHooks` interface that extend and customize the `Tx` processing logic externally.

This supports EVM contracts to call native cosmos modules by

1. defining a log signature and emitting the specific log from the smart contract,
2. recognizing those logs in the native tx processing code, and
3. converting them to native module calls.

To do this, the interface includes a  `PostTxProcessing` hook that registers custom `Tx` hooks in the `EvmKeeper`. These  `Tx` hooks are processed after the EVM state transition is finalized and doesn't fail. Note that there are no default hooks implemented in the EVM module.

```go
type EvmHooks interface {
 // Must be called after tx is processed successfully, if return an error, the whole transaction is reverted.
 PostTxProcessing(ctx sdk.Context, msg core.Message, receipt *ethtypes.Receipt) error
}
```

## `PostTxProcessing`

 `PostTxProcessing` is only called after a EVM transaction finished successfully and delegates the call to underlying hooks.  If no hook has been registered, this function returns with a `nil` error.

```go
func (k *Keeper) PostTxProcessing(ctx sdk.Context, msg core.Message, receipt *ethtypes.Receipt) error {
 if k.hooks == nil {
  return nil
 }
 return k.hooks.PostTxProcessing(k.Ctx(), msg, receipt)
}
```

It's executed in the same cache context as the EVM transaction, if it returns an error, the whole EVM transaction is reverted, if the hook implementor doesn't want to revert the tx, they can always return `nil` instead.

The error returned by the hooks is translated to a VM error `failed to process native logs`, the detailed error message is stored in the return value. The message is sent to native modules asynchronously, there's no way for the caller to catch and recover the error.

## Use Case: Call Native ERC20 Module on Evmos

Here is an example taken from the Evmos [erc20 module](https://evmos.dev/modules/erc20/) that shows how the `EVMHooks` supports a contract calling a native module to convert ERC-20 Tokens into Cosmos native Coins. Following the steps from above.

You can define and emit a `Transfer` log signature in the smart contract like this:

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);

function _transfer(address sender, address recipient, uint256 amount) internal virtual {
  require(sender != address(0), "ERC20: transfer from the zero address");
  require(recipient != address(0), "ERC20: transfer to the zero address");

  _beforeTokenTransfer(sender, recipient, amount);

  _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
  _balances[recipient] = _balances[recipient].add(amount);
  emit Transfer(sender, recipient, amount);
}
```

The application will register a `BankSendHook` to the `EvmKeeper`. It recognizes the ethereum tx `Log` and converts it to a call to the bank module's `SendCoinsFromAccountToAccount` method:

```go

const ERC20EventTransfer = "Transfer"

// PostTxProcessing implements EvmHooks.PostTxProcessing
func (k Keeper) PostTxProcessing(
 ctx sdk.Context,
 msg core.Message,
 receipt *ethtypes.Receipt,
) error {
 params := h.k.GetParams(ctx)
 if !params.EnableErc20 || !params.EnableEVMHook {
  // no error is returned to allow for other post processing txs
  // to pass
  return nil
 }

 erc20 := contracts.ERC20BurnableContract.ABI

 for i, log := range receipt.Logs {
  if len(log.Topics) < 3 {
   continue
  }

  eventID := log.Topics[0] // event ID

  event, err := erc20.EventByID(eventID)
  if err != nil {
   // invalid event for ERC20
   continue
  }

  if event.Name != types.ERC20EventTransfer {
   h.k.Logger(ctx).Info("emitted event", "name", event.Name, "signature", event.Sig)
   continue
  }

  transferEvent, err := erc20.Unpack(event.Name, log.Data)
  if err != nil {
   h.k.Logger(ctx).Error("failed to unpack transfer event", "error", err.Error())
   continue
  }

  if len(transferEvent) == 0 {
   continue
  }

  tokens, ok := transferEvent[0].(*big.Int)
  // safety check and ignore if amount not positive
  if !ok || tokens == nil || tokens.Sign() != 1 {
   continue
  }

  // check that the contract is a registered token pair
  contractAddr := log.Address

  id := h.k.GetERC20Map(ctx, contractAddr)

  if len(id) == 0 {
   // no token is registered for the caller contract
   continue
  }

  pair, found := h.k.GetTokenPair(ctx, id)
  if !found {
   continue
  }

  // check that conversion for the pair is enabled
  if !pair.Enabled {
   // continue to allow transfers for the ERC20 in case the token pair is disabled
   h.k.Logger(ctx).Debug(
    "ERC20 token -> Cosmos coin conversion is disabled for pair",
    "coin", pair.Denom, "contract", pair.Erc20Address,
   )
   continue
  }

  // ignore as the burning always transfers to the zero address
  to := common.BytesToAddress(log.Topics[2].Bytes())
  if !bytes.Equal(to.Bytes(), types.ModuleAddress.Bytes()) {
   continue
  }

  // check that the event is Burn from the ERC20Burnable interface
  // NOTE: assume that if they are burning the token that has been registered as a pair, they want to mint a Cosmos coin

  // create the corresponding sdk.Coin that is paired with ERC20
  coins := sdk.Coins{{Denom: pair.Denom, Amount: sdk.NewIntFromBigInt(tokens)}}

  // Mint the coin only if ERC20 is external
  switch pair.ContractOwner {
  case types.OWNER_MODULE:
   _, err = h.k.CallEVM(ctx, erc20, types.ModuleAddress, contractAddr, true, "burn", tokens)
  case types.OWNER_EXTERNAL:
   err = h.k.bankKeeper.MintCoins(ctx, types.ModuleName, coins)
  default:
   err = types.ErrUndefinedOwner
  }

  if err != nil {
   h.k.Logger(ctx).Debug(
    "failed to process EVM hook for ER20 -> coin conversion",
    "coin", pair.Denom, "contract", pair.Erc20Address, "error", err.Error(),
   )
   continue
  }

  // Only need last 20 bytes from log.topics
  from := common.BytesToAddress(log.Topics[1].Bytes())
  recipient := sdk.AccAddress(from.Bytes())

  // transfer the tokens from ModuleAccount to sender address
  if err := h.k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, recipient, coins); err != nil {
   h.k.Logger(ctx).Debug(
    "failed to process EVM hook for ER20 -> coin conversion",
    "tx-hash", receipt.TxHash.Hex(), "log-idx", i,
    "coin", pair.Denom, "contract", pair.Erc20Address, "error", err.Error(),
   )
   continue
  }
 }

 return nil
```

Lastly, register the hook in `app.go`:

```go
app.EvmKeeper = app.EvmKeeper.SetHooks(app.Erc20Keeper)
```
