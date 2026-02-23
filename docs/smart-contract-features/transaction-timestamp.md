# Precise transaction timestamp

Real-time games require users to make quick decisions, and the outcomes depend on the precise moment in time when the action was made. This doesn't work well on-chain because latencies are not low enough. **The TEN timestamp is provided in milliseconds**.

### Option 1 - External Timestamp oracle[​](#option-1---external-timestamp-oracle "Direct link to Option 1 - External Timestamp oracle")

A standard Ethereum smart contract does not have access to the timestamp of a transaction. The reason is that the "clock" of the user is not trusted, and a network like "Ethereum" is decentralised and there is no trusted "clock".

A dApp wanting to timestamp a transaction would have to use a trusted "Oracle" to sign over a payload containing the tx hash and the timestamp. And then create another Ethereum transaction with this payload, and the smart contract matching the previous action with this proof. This approach is very complex with multiple on-chain transactions and adds even more latency.

### TEN - Native timestamp oracle[​](#ten---native-timestamp-oracle "Direct link to TEN - Native timestamp oracle")

The TEN protocol provides a native timestamp oracle, and a system smart contract which exposes this information to smart contracts.

The trusted authority is the "Sequencer" node which is running in a Trusted Execution Environment (TEE).

Each transaction is accompanied by the precise timestamp when included in a block.

## How it works[​](#how-it-works "Direct link to How it works")

TEN provides a "System Contract" (a contract deployed and known by the platform). You can get the address of the system contract for our testnet [here](https://sepolia.tenscan.io/resources/verified-data) - "TEN System Contract".

The interface for the system contract is:

```
interface ITimestamp {
    function getTransactionTimestamp() external returns (uint256);
}
```

## Example[​](#example "Direct link to Example")

```

// TEN provides a system contract that returns the precise timestamp in milliseconds of the calling transaction
interface ITimestamp {
    function getTransactionTimestamp() external returns (uint256);
}

contract TimedAuction {
    ITimestamp private timestamp;

    uint256 public auctionEndMs;
    address public highestBidder;
    uint256 public highestBid;

    event BidPlaced(address indexed bidder, uint256 amount, uint256 timestampMs);

    constructor(address _timestampSystemAddress, uint256 _durationMs) {
        timestamp = ITimestamp(_timestampSystemAddress);
        auctionEndMs = timestamp.getTransactionTimestamp() + _durationMs;
    }

    function bid() external payable {
        uint256 txTimestamp = timestamp.getTransactionTimestamp();
        require(txTimestamp < auctionEndMs, "Auction has ended");
        require(msg.value > highestBid, "Bid too low");

        highestBidder = msg.sender;
        highestBid = msg.value;
        emit BidPlaced(msg.sender, msg.value, txTimestamp);
    }
}
```
