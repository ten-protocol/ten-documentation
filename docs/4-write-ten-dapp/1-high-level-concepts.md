---
sidebar_position: 1
---

# High Level Concepts

Below are the core concepts that make TEN unique while maintaining complete compatibility with existing Ethereum tooling and workflows.

## End-to-End Encryption

All contract execution runs inside TEEs; inputs, state, and (optionally) logs can be private. See the [Overview](../1-overview/overview.md) for architecture and threat model.

Clients establish HTTPS connections that terminate inside TEEs via the TEN Gateway, preventing plaintext exposure on intermediaries; smart contracts then execute entirely within the enclave boundary, and contract state plus sensitive metadata are stored encrypted at rest, with read access enforced through Viewing Keys and policy logic.

## Smart Contract Execution with Hidden State

TEN disables `getStorageAt` by default and ensures private variables are truly private, only accessible through authorized functions that developers define.
 
Revisit [Data Acess](../3-smart-contract-features/1-data-access.md) for more information.

## Data Access Control Primitives

TEN introduces **[Smart Transparency](https://medium.com/obscuro-labs/web3-needs-access-control-9a80719eec4a)** — a paradigm where smart contracts enforce rules of data access, not just computation. This provides fine-grained control over who can see what data and when, including programmable disclosure, conditional data access, and event visibility rules.

## TEN Gateway
Web service running in TEEs that provides the secure edge for dApps and user wallets:

- Routes encrypted transactions between clients and validator/sequencer nodes
- Manages Viewing Keys on behalf of users for authenticated private view calls
- Manages Session Keys to enable no-click UX under developer-defined policies
- Caches encrypted metadata and frequently accessed data for performance and availability

See [TEN Gateway](./9-testnet.md#ten-gateway) for more information.

## Personal Data

TEN enables true **personal data** management on-chain by ensuring that sensitive user information remains encrypted and accessible only to authorized parties. This supports applications like private messaging, confidential medical records, and identity verification systems while maintaining compliance with data protection regulations.

## Free Native On-Chain Randomness

Secure, immediate, and free randomness via enclave-backed `block.prevrandao` — no oracles needed.

```solidity
function getRandomNumber() public view returns (uint256) {
    return uint256(block.prevrandao);  // Secure randomness on TEN
}
```

## Precise Timestamping of Transactions

Every transaction on TEN receives a **precise timestamp** when it reaches the sequencer, enabling applications that require exact timing information such as real-time games, auction systems, and time-sensitive financial instruments.

An example of how this works can be found in the [TEN Aviator](https://github.com/ten-protocol/ten-aviator/tree/1aa6454da5c52586eaccc9cf3d957b9c5d5f2f6d) game that utilises real-time game state tracking.

```solidity
function checkGameEnd() external onlyOwner {
        if (block.timestamp >= gameStartTime + gameDuration) {
            endGame();
        }
    }
```

## Native Commit-Reveal (Required by Many Games)

TEN eliminates the need for traditional commit-reveal schemes through its **native async execution** and **on-block-end callbacks**. This provides the same security benefits without the complexity, latency, and cost of separate commit and reveal transactions, enabling seamless gaming experiences.

TEN provides secure entropy that is generated within the TEE environment using hardware-based random number generation, ensuring that random values cannot be predicted or manipulated by node operators or external parties.

```solidity
function _resetSecretNumber() private {
   uint256 randomNumber = block.prevrandao;
   secretNumber = (randomNumber % MAX_GUESS) + 1;
}
```

On Ethereum mainnet, `block.prevrandao` must be used with care. It has some important caveats:
- The same random value is provided to every transaction executing in the same block.
- The value is known at the time the transactions are being ordered into the block, meaning MEV bots can manipulate outcomes.

The same code on TEN does not expose those attack vectors. It should be noted that:
- A fresh, uncorrelated key is generated for each transaction.
- The value cannot be seen outside of the executing code, secure enclave hardware means even node operators can't access it.
- Outcomes cannot be known until the block is published (which cannot be undone), removing the threat of MEV exploits.

See [Secure Entropy](../3-smart-contract-features/2-native-entropy.md) for more information.


## Native Session Keys

TEN provides **native session key** support managed by TEEs, eliminating the need for proxy contracts while enabling seamless user experiences. Users can play games or interact with dApps without signing every transaction, while developers benefit from simple integration through standard RPC endpoints.

The management of these session keys is provided by the [ten-kit](https://github.com/ten-protocol/ten-kit/tree/2c4265bdb2832249af8c9ec21c4b60d02eb8dd3a?tab=readme-ov-file#advanced-example-with-session-keys) library, which provides the React components and hooks needed, as well as wallet connection and privacy‑preserving transactions.

See [Session Keys](./4-session-keys.md) for more information.

---
