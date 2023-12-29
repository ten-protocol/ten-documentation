---
sidebar_position: 5
---
# Governance

Ten's governance is explicit, transparent, and draws inspiration from the experiences of Bitcoin and Ethereum. In a decentralized system, control can be:

- **Explicit**: Exercised by a group through direct signing or voting.
- **Implicit Immutable**: Implemented in an unchangeable protocol.
- **Implicit Mutable**: Implemented in a protocol represented by an open-source, changeable codebase.

## Ten Controls

### 1. TEE Attestation Constraints

The Attestation Constraints control which software can run inside the Secure Enclave, processing user transactions and creating rollups. Independent security auditors analyze and approve the code. The constraints contain the keys of these auditors, determining which software is permitted.

### 2. Administration Of Ethereum Management Contracts

Ethereum management contracts in Ten may have upgradeable components to address bugs and introduce new features. Upgradeable components imply administrative control over:

- Bridge logic
- Rollup logic
- Attestation logic

### 3. Creating Rollups

Ten Aggregators, running attested software and hardware with a stake, have the power to append to the L2 ledger. However, they cannot choose competing software or create forks.

### 4. Canonical Rollup Chain

The canonical chain in Ten is determined by the rules implemented in the attested software run by Aggregators. A valid Secure Enclave will not sign a rollup built on a non-canonical chain, ensuring ledger integrity.

### 5. Slashing The Stake Of Misbehaving Parties

Aggregators attempting to compromise the ledger's integrity face penalties. Misbehaviors are detected by the protocol, and culprits are penalized through stake slashing.

### 6. Expected Monthly Operational Cost For Nodes

Ten's fee structure aims for predictable income for node operators and fees for users. A set value representing the monthly operational cost for each node is crucial for determining fees and balancing decentralization with user costs.