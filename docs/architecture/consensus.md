---
sidebar_position: 3
---
# Consensus Mechanism

Ten combines Ethereum's L1 security, rollup efficiency, Secure Enclave privacy, and the POBI mechanism for a unique consensus approach.

## POBI (Proof Of Block Inclusion)

- **Unique to Ten**: Ensures a single version of truth by validating rollups only if they're included in a block.
- **Chain Selection**: The chain with the latest block inclusion is deemed the canonical chain.

## Rollup-Based Consensus

- **Aggregators**: These are L2 nodes that collect, aggregate, and submit batches of transactions to Ethereum L1. They play a crucial role in the consensus mechanism.

- **Sequential Processing**: Transactions are processed in the order they are received, ensuring a consistent state across all nodes.

- **Finality**: Once a rollup is accepted on Ethereum L1, it is considered final. This provides the same level of security as Ethereum itself.

## Attestation

- **Secure Enclave Attestation**: Before an L2 node can participate in the network, it must prove its legitimacy through a process called attestation. This ensures that the node operates within a genuine Secure Enclave.

- **Continuous Attestation**: Nodes must continuously attest to their validity to remain active in the network.

## Economic Incentives

- **Staking**: L2 nodes are required to stake a certain amount of tokens as collateral. This ensures they act honestly, as malicious actions can lead to the loss of their stake.

- **Rewards**: Honest nodes are rewarded for their services, such as aggregating transactions or producing rollups.

- **Penalties**: Malicious nodes or those that fail to meet the network's standards can be penalized, which includes the loss of their staked tokens.

## Sybil Attack Prevention

Ten's consensus mechanism is designed to resist Sybil attacks. The combination of Secure Enclave attestation and economic incentives ensures that creating multiple fake nodes is not only challenging but also economically unviable.