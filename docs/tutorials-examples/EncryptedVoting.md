---
sidebar_position: 4
---
# Encrypted DAO Voting

Encrypted DAO Voting demonstrates TEN's encryption capabilities in a critical governance scenario. DAO members can cast encrypted votes, ensuring true privacy throughout the voting process. This showcases how TEN solves the challenge of maintaining vote secrecy in transparent blockchain environments, preventing vote buying and coercion.

## **Voting Mechanics**

- DAO members submit encrypted votes (upvote or downvote) during the voting period.
- Each vote is kept secret from other members.
- Members can verify they've voted without revealing their choice.
- The voting results (total upvotes and downvotes) remain hidden until the voting period concludes.
- After voting ends, only the final tally is revealed, not individual votes.

:::tip
You can get free testnet tokens from the [TEN Faucet](/docs/getting-started/for-users/get-tokens).
:::

## **Building the Encrypted DAO Voting System**

This guide will walk you through creating a Encrypted DAO Voting system on TEN, using private shared states.

1. **Contract Setup:**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract encryptedVoting {
    address public admin;
    uint public votingEndTime;

    // These variables are private and encrypted by TEN's L2 protocol
    uint private upvotes;
    uint private downvotes;
    mapping(address => bool) private hasVoted;

    event VoteCast(address indexed voter);
    event VotingEnded(uint upvotes, uint downvotes);

    constructor(uint _durationInMinutes) {
        admin = msg.sender;
        votingEndTime = block.timestamp + (_durationInMinutes * 1 minutes);
    }
}
```

2. **Secure Vote Storage:** TEN provides true on-chain encryption for private state variables. Even using `getStorageAt`, these variables cannot be accessed.

```solidity
uint private upvotes;
uint private downvotes;
mapping(address => bool) private hasVoted;
```

This ensures that votes are stored securely and are inaccessible to anyone outside the contract.

3. **Casting Votes:** The voting function allows members to submit their votes securely.

```solidity
function vote(bool isUpvote) external votingOpen {
    require(!hasVoted[msg.sender], "Already voted");

    if (isUpvote) {
        upvotes++;
    } else {
        downvotes++;
    }
    hasVoted[msg.sender] = true;

    emit VoteCast(msg.sender);
}
```

On TEN, the `isUpvote` parameter in transactions is encrypted, ensuring vote choices remain private. The `upvotes`, `downvotes`, and `hasVoted` variables are private, keeping the voting status secret.

4. **Verifying Votes:** Members can verify each other's vote was counted without revealing their choice.

```solidity
function hasUserVoted(address user) external view returns (bool) {
    return hasVoted[user];
}
```

This function allows anyone to check if a specific address has voted, maintaining vote privacy while ensuring transparency.

5. **Ending the Vote:** Only the admin can end the voting and reveal the results.

```solidity
function endVoting() external onlyAdmin {
    require(block.timestamp >= votingEndTime, "Voting period not yet over");
    emit VotingEnded(upvotes, downvotes);
}
```

The `VotingEnded` event reveals only the total upvotes and downvotes, maintaining privacy of individual votes.

By leveraging TEN's encryption features, this Encrypted DAO Voting system ensures:

- **Vote Secrecy:** Individual votes remain hidden throughout the process.
- **Verifiable Participation:** Members can prove they voted without revealing their choice.
- **Tamper-Resistant Tallying:** Vote counts are securely updated and stored.
- **Delayed Result Revelation:** Final tallies are only revealed when voting ends.

This provides a fair, tamper-resistant, and truly private voting mechanism for DAOs, which is not possible on traditional transparent blockchains.

Find the complete contract & frontend here: [https://github.com/ten-protocol/sample-applications/tree/main/Encrypted%20DAO%20Voting]

## **Participating in DAO Voting**

1. **Ensure Gateway Authentication:** Verify your account is authenticated through the [TEN Gateway](https://testnet.ten.xyz/).

2. **Visit the DAO Voting Website:** Navigate to the DAO's voting interface.

3. **Cast Your Vote:** Choose to upvote or downvote and submit. The transaction will be encrypted.

4. **Verify Your Vote:** Use the `hasUserVoted` function to confirm your vote was recorded without revealing your choice.

5. **Wait for Voting End:** Once the voting period is over, results will be tallied.

6. **Check Results:** View the final tally of upvotes and downvotes without compromising individual vote privacy.
