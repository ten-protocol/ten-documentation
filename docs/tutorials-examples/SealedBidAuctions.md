---
sidebar_position: 2
---
# Sealed Bid Auction

Sealed Bid Auction demonstrates TEN's encryption capabilities in a practical scenario. Bidders submit encrypted bids, ensuring true privacy until the auction ends. This showcases how TEN solves the challenge of maintaining bid secrecy in transparent blockchain environments.

## **Auction Mechanics**

- Bidders submit encrypted bids during the auction period.
- Each bid is kept secret from other participants and even the auctioneer.
- The highest bid and bidder remain hidden until the auction concludes.
- After the auction ends, the highest bid and winner are revealed only to the auctioneer through an event.
- Losing bidders can withdraw their bids.

:::tip
You can get free testnet tokens from the [TEN Faucet](/docs/getting-started/for-users/get-tokens).
:::

## **Building the Sealed Bid Auction**

This guide will walk you through creating a Sealed Bid Auction on TEN, using private shared states.

1. **Contract Setup:**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SealedBidAuction {
    address public auctioneer;
    uint public auctionEndTime;
    address private highestBidder;
    uint private highestBid;

    event AuctionEnded(address winner, uint winningBid);

    constructor(uint _duration) {
        auctioneer = msg.sender;
        auctionEndTime = block.timestamp + _duration;
    }
}
```

2. **Secure Bid Storage:** TEN provides true on-chain encryption for private state variables. Even using `getStorageAt`, these variables cannot be accessed.

```solidity
mapping(address => uint) private bids;
```

This ensures that bids are stored securely and are inaccessible to anyone outside the contract.

3. **Placing Bids:** The bidding function allows users to submit their bids securely.

```solidity
function placeBid() public payable {
    require(block.timestamp < auctionEndTime, "Auction ended");
    bids[msg.sender] += msg.value;
    
    if (msg.value > highestBid) {
        highestBidder = msg.sender;
        highestBid = msg.value;
    }
}
```

On TEN, the `msg.value` in transactions is encrypted, ensuring bid amounts remain private. Moreover, `highestBidder` and `highestBid` are private variables, keeping the current auction status secret.

4. **Ending the Auction:** Only the auctioneer can end the auction and reveal the winner.

```solidity
function endAuction() external {
    require(msg.sender == auctioneer, "Only auctioneer");
    require(block.timestamp >= auctionEndTime, "Auction not yet ended");
    
    emit AuctionEnded(highestBidder, highestBid);
    
    // Transfer highest bid to auctioneer
    payable(auctioneer).transfer(highestBid);
}
```

The `AuctionEnded` event reveals the winner and winning bid only at the end of the auction, maintaining privacy throughout the bidding process.

5. **Withdrawing Bids:** Losing bidders can withdraw their bids after the auction ends.

```solidity
function withdrawBid() external {
    require(block.timestamp >= auctionEndTime, "Auction not yet ended");
    require(msg.sender != highestBidder, "Winner cannot withdraw");
    
    uint amount = bids[msg.sender];
    bids[msg.sender] = 0;
    payable(msg.sender).transfer(amount);
}
```

By leveraging TEN's privacy features, this Sealed Bid Auction ensures true bid secrecy until the auction concludes. The highest bid and bidder remain hidden throughout the auction, only being revealed through an event when the auction ends. This provides a fair, tamper-resistant, and truly private bidding process.

Find the complete contract & frontend here: [https://github.com/ten-protocol/sample-applications/tree/main/Sealed%20Bid%20Auctions]

## **Participating in the Auction**

1. **Ensure Gateway Authentication:** Verify your account is authenticated through the [TEN Gateway](https://testnet.ten.xyz/).

2. **Visit the Auction Website:** Navigate to the auction's web interface.

3. **Place Your Bid:** Enter your bid amount and submit. The transaction will be encrypted.

4. **Wait for Auction End:** Once the auction period is over, the winner will be determined.

5. **Check Results or Withdraw:** If you win, you'll be notified. If not, you can withdraw your bid.
