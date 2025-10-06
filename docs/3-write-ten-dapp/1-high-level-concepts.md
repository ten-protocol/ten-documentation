---
sidebar_position: 1
---

# High level concepts

Below are the core concepts that make TEN unique while maintaining complete compatibility with existing Ethereum tooling and workflows.

## End-to-End Encryption

All contract execution runs inside TEEs; inputs, state, and (optionally) logs can be private. See the [Overview](/docs/1-overview/Overview) for architecture and threat model.

## Smart Contract Execution with Hidden State

TEN disables `getStorageAt` by default and ensures private variables are truly private, only accessible through authorized functions that developers define.

## Data Access Control Primitives

TEN introduces **[Smart Transparency](https://medium.com/obscuro-labs/web3-needs-access-control-9a80719eec4a)** — a paradigm where smart contracts enforce rules of data access, not just computation. This provides fine-grained control over who can see what data and when, including programmable disclosure, conditional data access, and event visibility rules.

## TEN Gateway
Web service running in TEEs that provides the secure edge for dApps and user wallets:

- Routes encrypted transactions between clients and validator/sequencer nodes
- Manages Viewing Keys on behalf of users for authenticated private view calls
- Manages Session Keys to enable no-click UX under developer-defined policies
- Caches encrypted metadata and frequently accessed data for performance and availability

See [TEN Gateway](/docs/3-write-ten-dapp/6-testnet#ten-gateway).

## Personal Data

TEN enables true **personal data** management on-chain by ensuring that sensitive user information remains encrypted and accessible only to authorized parties. This supports applications like private messaging, confidential medical records, and identity verification systems while maintaining compliance with data protection regulations.

## Free Native On-Chain Randomness

Secure, immediate, and free randomness via enclave-backed `block.prevrandao`—no oracles needed.

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
