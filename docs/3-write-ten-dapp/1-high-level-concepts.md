---
sidebar_position: 1
---

# High level concepts

TEN Protocol is fully **Ethereum-compatible**, meaning you can use all your familiar development tools; Solidity, Hardhat, Foundry, MetaMask, and Remix, without any changes. The key difference is that TEN adds powerful privacy and confidentiality features on top of the standard EVM functionality.

Below are the core concepts that make TEN unique while maintaining complete compatibility with existing Ethereum tooling and workflows.

## End-to-End Encryption

TEN implements comprehensive end-to-end encryption through its **Encrypted EVM** architecture. All smart contract execution occurs inside **Trusted Execution Environments (TEEs)**, ensuring that transaction data, contract logic, inputs, and state remain encrypted and private from all external observers—including node operators and validators.

## Smart Contract Execution with Hidden State

Unlike Ethereum where all contract state is publicly visible, TEN provides **genuine private variables** through its encrypted execution environment. TEN disables `getStorageAt` and ensures private variables are truly private, only accessible through authorized functions that developers define.

## Data Access Control Primitives

TEN introduces **Smart Transparency**—a paradigm where smart contracts enforce rules of data access, not just computation. This provides fine-grained control over who can see what data and when, including programmable disclosure, conditional data access, and event visibility rules.

## TEN Gateway
The TEN Gateway securely routes encrypted transactions between users and validator nodes, ensuring data confidentiality throughout the transaction process.

## Personal Data

TEN enables true **personal data** management on-chain by ensuring that sensitive user information remains encrypted and accessible only to authorized parties. This supports applications like private messaging, confidential medical records, and identity verification systems while maintaining compliance with data protection regulations.

## Free Native On-Chain Randomness

TEN provides **secure, immediate, and free randomness** without oracles or external dependencies. Random numbers are generated within secure enclaves, ensuring unpredictability while eliminating the delays, complexity, and fees associated with traditional oracle-based solutions.

```solidity
function getRandomNumber() public view returns (uint256) {
    return uint256(block.prevrandao);  // Secure randomness on TEN
}
```

## Precise Timestamping of Transactions

Every transaction on TEN receives a **precise timestamp** when it reaches the sequencer, enabling applications that require exact timing information such as real-time games, auction systems, and time-sensitive financial instruments.

## Native Commit-Reveal (Required by Many Games)

TEN eliminates the need for traditional commit-reveal schemes through its **native async execution** and **on-block-end callbacks**. This provides the same security benefits without the complexity, latency, and cost of separate commit and reveal transactions, enabling seamless gaming experiences.

## Native Session Keys

TEN provides **native session key** support managed by TEEs, eliminating the need for proxy contracts while enabling seamless user experiences. Users can play games or interact with dApps without signing every transaction, while developers benefit from simple integration through standard RPC endpoints.

---
