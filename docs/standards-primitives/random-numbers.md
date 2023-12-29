---
sidebar_position: 2
---

# Random Numbers


## Using Randomness on Ten

Random numbers are available as a secure and private primitive within Ten contracts.

A random string of bytes can be accessed in solidity contracts on Ten using `block.prevrandao`, just like on Ethereum mainnet. But it is important to stress that this provides **much stronger** security guarantees than those on mainnet.

## Benefits of Ten Randomness
On Ethereum mainnet, `block.prevrandao` must be used with care. It has some important caveats:
- The same random value is provided to every transaction executing in the same block.
- The value is known at the time the transactions are being ordered into the block, meaning MEV bots can manipulate outcomes.

The same code on Ten does not expose those attack vectors. It should be noted that:
- A fresh, uncorrelated key is generated for each transaction.
- The value cannot be seen outside of the executing code, secure enclave hardware means even node operators can't access it.
- Outcomes cannot be known until the block is published (which cannot be undone), removing the threat of MEV exploits.

The upshot of all this is that developers have much less to think about and secure contract code can stay simple and clean.

Users also benefit, dApps using randomness on Ten can provide a much better UX because oracles and commit-reveal schemes (which add artificial delays and extra transactions) are no longer necessary.

## Example

This example is taken from a live app, the [Guessing Game demo application](../tutorials-examples/guessing-game.md).

This solidity function is used to reset the secret number which players are guessing. It is called both when the contract is first deployed, and also after a player wins the game.

It will set the `secretNumber` private state to an integer between 1 and MAX_GUESS. 

```
function _resetSecretNumber() private {
   uint256 randomNumber = block.prevrandao;
   secretNumber = (randomNumber % MAX_GUESS) + 1;
}
```

Now the game is immediately available to play again, with a fair random seed that had no external (oracle) dependency and no enforced delay or commit-reveal transactions.

:::warning
Be aware that the random seed is the same for the entire transaction. That means if your contract was called from another contract, then both contracts would see the same random seed during that transaction. 

In many cases this does not matter, the result of the dice roll or the lottery winner is immediately made public anyway, so there is no information to leak. But in some cases you may want to put a check in place to ensure that a longer-lived random secret cannot be leaked. For example, you may choose to require your contract can only be called directly, not from other contracts.

This is important for situations (like the guessing game above) where the random seed must not revealed even **after** the transaction is completed.
:::
