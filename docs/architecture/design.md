---
sidebar_position: 1
---
# Design

Ten is architected as an L2 protocol, leveraging the rollup pattern to store transaction data on the L1 chain. While most rollup implementations aim for scalability, Ten's primary objective is confidentiality. The rollups encapsulate the entire encrypted transaction data.

![L1-L2 Interaction](../assets/l1-l2-interaction.png)

## L1 Network

- **Management Contracts**: On the L1 network, there are several standard Ethereum contracts, often referred to as Management Contracts. These contracts play a pivotal role in the functioning and management of the Ten network.

  - **Network Management**: This contract acts as the gatekeeper for the protocol. It manages the Secure Enclave / TEE attestation requirements, verifies attestation reports, and oversees the stake of the Aggregators.

  - **Rollup Management**: This module accepts rollups submitted by L2 nodes and collaborates with the bridge to process user withdrawal requests.

  - **Ten Bridge**: A crucial contract ensuring the security of the liquidity deposited by Ethereum end-users, mirrored in the confidential Ten ledger.

## L2 Network

The L2 design aims to establish a decentralized network of nodes with valid Secure Enclave / TEEs, ensuring transaction confidentiality even amidst potential Secure Enclave / TEE breaches.

- **L2 Nodes**: There are two primary categories of nodes within the Ten network:

  - **Aggregator Nodes**: These nodes, equipped with Secure Enclave / TEEs and the shared secret, can submit rollups to the L1. They process user transactions, roll them up, and submit them for inclusion in Ethereum blocks.

  - **Verifier Nodes**: These nodes, also equipped with Secure Enclave / TEEs and the shared secret, play a significant role in consensus security. They monitor the L1 network, calculating the state based on the submitted rollups.

## Rollup Data Structure

The Management Contract implements a blockchain-like structure to store the rollups. Each rollup references a parent rollup, and multiple competing sibling rollups can exist simultaneously. It's the responsibility of individual L2 nodes to determine the validity of these siblings.
