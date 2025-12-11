---
sidebar_position: 4
---

# Precise transaction timestamp

Real-time games require users to make quick decisions, and the outcomes depend on the precise moment in time when the action was made.
This doesn't work well on-chain because latencies are not low enough. **The timestamp is provided in milliseconds**.

### Option 1 - External Timestamp oracle

A standard Ethereum smart contract does not have access to the timestamp of a transaction.
The reason is that the "clock" of the user is not trusted, and a network like "Ethereum" is decentralised and there is no trusted "clock".

A dApp wanting to timestamp a transaction would have to use a trusted "Oracle" to sign over a payload containing the tx hash and the timestamp. 
And then create another Ethereum transaction with this payload, and the smart contract matching the previous action with this proof.
This approach is very complex with multiple on-chain transactions and adds even more latency.

### TEN - Native timestamp oracle

The TEN protocol provides a native timestamp oracle, and a system smart contract which exposes this information to smart contracts.

The trusted authority is the "Sequencer" node which is running in a Trusted Execution Environment (TEE). 

Each transaction is accompanied by the precise timestamp when included in a block.

## How it works

TEN provides a "System Contract" (a contract deployed and known by the platform.)
You can get the address of the system contract for our testnet [here](https://sepolia.tenscan.io/resources/verified-data) - under `TenSystemCalls`.

The interface you must implement is:

```solidity
interface ITimestamp {
    function getTransactionTimestamp() external returns (uint256);
}
```


## Example

```solidity

// TEN provides a system contract that returns the precise timestamp in milliseconds of the calling transaction
interface ITimestamp {
    function getTransactionTimestamp() external returns (uint256);
}

contract CoinFlip {
    private ITimestamp timestamp;

    // you have to pass in the address of the system contract
    constructor(address _timestampSystemAddress) {
        timestamp = ITimestamp(_timestampSystemAddress);
    }

    function getRandomNumber() internal view returns (uint256) {
        return rnd.getRandomNumber();
    }
}
```