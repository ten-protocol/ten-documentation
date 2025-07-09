---
sidebar_position: 2
---
# Features

## **Encryption: Data Access Controls and Computational Privacy**
TEN runs the EVM inside trusted hardware known as [Trusted Execution Environments (TEEs)](https://whitepaper.ten.xyz/obscuro-whitepaper/technical-background.html#trusted-execution-environment) to achieve [decentralised data access controls](https://medium.com/obscuro-labs/web3-needs-access-control-9a80719eec4a) and computational privacy. Nobody can read the internal state of the contracts, not even node operators of the sequencer. The developer can configure who can receive and query event logs.
  
## **Scaling: Ethereum Layer 2 Rollup**
Designed as a decentralized Ethereum L2 Rollup protocol, TEN enhances the scalability of the Ethereum network.

## **MEV-free: Prevention of Maximal Extractable Value**
TEN is designed to prevent [Maximal Extractable Value (MEV)](https://ethereum.org/en/developers/docs/mev/), ensuring fairness in transaction ordering.

## **RNG: Secure, Free Random Number Generation**
TEN can generate secure random numbers without using any additional libraries or external applications. Generated random numbers are completely secure and no validator or user can peek into the generated numbers. No more calls to third-party oracles.

## **Native Async Execution for Games **
To prevent users from exploiting on-chain games, TEN has features that enable moves tobe executed separately from transactions, but in the same block. You get the same latency, but no vulnerability.

## **Precise Timestamping**
Every transaction has a precise timestamp available when it has reached the sequencer. This allows you to create on-chain games that require continous flow or games where users compete on pricise timing. 

## **System Smart Contracts**
You can create platform level smart contracts that can drive certain behaviours e.g. a platform contract that refunds all gas costs for particular dApps or randmly rewards transactions on the network with prizes.

## **High Performance: Fast Bridge**
TEN's design allows faster bridging of assets between Ethereum and TEN when compared to Optimistic rollups.
