---
sidebar_position: 2
---
# System Components

## Cryptography

- **Master Seed**: Every Secure Enclave is provisioned with one or multiple keys, known as the Enclave Key (EK). The first enclave, termed the Genesis Enclave, generates a random byte array called the Master Seed. This seed is encrypted using the EK and stored in the Management Contract.

- **Sharing the Master Seed**: After attestation, subsequent nodes receive the Master Seed encrypted with their key. Before obtaining this shared secret, the L2 nodes must attest their validity.

- **Generating Keys**: Secure Enclaves use the shared secret to generate further keys. These keys are used for various purposes, including network identity and encrypting transactions.

- **Transaction Encryption**: Ten aims to balance user privacy with application functionality. Transactions are encrypted differently based on predefined revealing options, ensuring that they can be decrypted independently after a set time delay.

- **Revelation Mechanism**: Ten uses L1 blocks as a reliable measure of average time. After a set number of blocks, any user can request the encryption key from any Ten node's Secure Enclave.

- **Cryptographic Algorithms**: Ten uses the same cryptographic algorithms as Ethereum for hashing and signing. Communication encryption algorithms are still under consideration.

## State

Ten's state management is similar to Ethereum's L1 blockchain. It's an account-based L2 decentralized ledger system. The state is stored as a Patricia Trie in each rollup, and each node processes all prior transactions to establish the current state.

## Smart Contracts and the Ten VM

- **Smart Contract Types**: Ten supports two types of smart contracts: Public contracts (similar to Ethereum smart contracts) and Private contracts (where the source code isn't publicly available).

- **State Confidentiality between Smart Contracts**: Ten aims to protect user data while allowing contract composition. Developers need to be cautious about data access and potential data leaks when their contracts interact with others.

- **Wallets and Transaction Submission**: User wallets create transactions encrypted with the Ten public key. These transactions can only be decrypted, executed, and viewed by valid Secure Enclaves.