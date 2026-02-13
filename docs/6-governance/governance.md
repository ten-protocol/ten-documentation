---
sidebar_position: 1
---
# Governance

TEN's governance framework defines how TEN evolves over time so it can adapt to a changing world while remaining aligned to how TEN is best put to use. It exists to give the TEN community a transparent and accountable way to propose, debate, and decide on changes. While governance is the framework by which changes are proposed and decided upon, how these changes are implemented in practice depends on where control is applied. TEN includes a number of controls intentionally introduced by technical designs and economic incentives which work alongside the governance framework. Some of these controls could, in practice, block the implementation of approved proposals.

## TEN Protocol Controls

### 1. TEE Attestation Constraints

Trusted Execution Environments (TEEs) used by TEN feature the concept of attestation, the ability to attest that what you think is running inside the TEE is in fact running. The attestation constraints control which software can run inside the TEE to process transactions and create encrypted rollups. Anyone, including independent security auditors, can analyze the code and check the attestation report to confirm this code is running in the TEE. Attestation prevents malicious software being executed on a TEN network node.

### 2. Administration Of Management Smart Contracts

The governance framework may result in an approved proposal to make changes to the protocol's management smart contracts. As a result, these smart contracts have upgradeable components to address bugs, introduce new features and allow for changes. On that basis, upgradeable components require the means to apply administrative control over bridge logic, rollup logic and attestation logic.

### 3. Validator Node Rules

TEN validator nodes run attested software and hardware and they have the power to append to the TEN ledger. Validator nodes can validate the accuracy of an encrypted rollup before it is submitted to Ethereum. Validator nodes cannot run competing software or create forks of the Ethereum ledger. As such, Ethereum maintains a single source of truth.

### 4. Ledger Integrity

The canonical chain in the protocol is determined by the rules implemented in the attested software run by the nodes in the TEN network. An attested and therefore valid TEE will not sign an encrypted rollup built on a non-canonical chain. This ensures the integrity of the ledger remains intact.

### 5. Slashing The Stake Of Misbehaving Parties

Nodes on the TEN network will face penalties if there is an attempt to compromise the ledger's integrity, for example as a result of operator actions or the installation of malicious software. Misbehaviors are detected by the protocol and culprits are penalized through the slashing of their node stake.
