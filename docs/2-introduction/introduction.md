---
sidebar_position: 1
---

# What is TEN Protocol?

TEN is a next-generation Ethereum Layer 2 rollup protocol that introduces data confidentiality, computational privacy, and resistance to Maximal Extractable Value (MEV) by leveraging hardware-based Trusted Execution Environments (TEEs). TEN represents a major step forward in decentralized system design by reintroducing **data access controls** — a foundational feature of Web2 that Web3 largely abandoned in favor of radical transparency.

## The Web3 Privacy Problem

Public blockchains have validated the promise of programmable value, but exposed a critical flaw: the complete absence of data access control. Transparency, once celebrated as a virtue, has become a liability. On-chain activity today remains fully public — every balance, transaction, strategy, and piece of logic is visible to everyone, including competitors, adversaries, and MEV bots.

If you analyze any successful digital application — Netflix, WhatsApp, Spotify, banking apps, even mobile games — they all rely on access control. Not just for privacy, but to function. Smart contracts today can define who can write data, but they cannot restrict who can read it. This fundamental limitation makes it nearly impossible to build viable real-world applications in Web3 beyond speculation.

## TEN's Solution: Smart Transparency

TEN introduces **Smart Transparency** — a paradigm where smart contracts not only enforce rules of computation, but also enforce rules of data access. By integrating [programmable encryption](https://medium.com/obscuro-labs/web3-needs-access-control-9a80719eec4a), TEEs, and an Ethereum-compatible execution environment, TEN enables encrypted, autonomous, and composable smart contracts that preserve privacy without sacrificing decentralization or composability.

### Core Architecture

**Encrypted Execution**: All transactions and internal state of application contracts remain encrypted and hidden, providing a credible solution to MEV while maintaining EVM compatibility for easy migration of existing contracts.

**Trustless Design**: TEN leverages TEEs for privacy but not for integrity. If a TEE is compromised or a manufacturer behaves maliciously, the system gracefully degrades into a transparent blockchain, preserving ledger integrity while forfeiting privacy.

**Ethereum Layer 1**: TEN uses Ethereum as a base layer for security and data availability while enabling lower transaction costs similar to other Layer 2 networks, with quick finality synchronized to L1 block cadence.

## Key Differentiators from Transparent Chains

| Feature | Transparent Chains | TEN Protocol |
|---------|-------------------|--------------|
| **Data Access** | All data public | Programmable access control |
| **MEV Protection** | Limited solutions | Built-in confidentiality |
| **Smart Contract State** | Fully visible | Encrypted with selective disclosure |
| **Transaction Privacy** | Public by default | Private by default |
| **Compliance** | Difficult | Time-delayed revelation for deterrence |
| **Account-based smart contract execution** | Account model with public state and calls | Account model, EVM-compatible, encrypted state and calls |
| **Decentralised** | Decentralizsed consensus | Sequencer and decentralised validators |

## Addressing Key Challenges

**Hardware Trust**: TEN's trust model doesn't require perpetual belief in any single hardware vendor. The protocol uses Ethereum's security combined with game theory to detect and correct eventual TEE compromises.

**Usability**: The system implements flexible policies for delayed transaction revelation, balancing privacy needs with regulatory compliance and illegal activity deterrence.

**MEV Prevention**: Beyond hiding transactions, TEN introduces delays at critical moments to prevent aggregators from performing replay-attacks and exploiting side-channels.

## Unlocking New Applications

TEN's confidential rollup architecture enables previously impossible on-chain applications:

- **Confidential DeFi**: Dark pools, private lending, MEV-resistant trading
- **Private Gaming**: Poker, strategy games with hidden information
- **Autonomous AI Agents**: Protected algorithms and private coordination
- **Enterprise Solutions**: Confidential auctions, private supply chains
- **TEE-Stablecoins**: Reserve-backed with provable but confidential attestation

## Whitepaper & Blog Links
- [TEN Protocol Whitepaper](https://github.com/ten-protocol/ten-whitepaper/blob/main/whitepaper.md)
- [SGX Demystified](https://medium.com/obscuro-labs/intel-sgx-demystified-757a242682a3)
- [Smart Transparency](https://medium.com/obscuro-labs/web3-needs-access-control-9a80719eec4a)
- [Securing Randomness](https://medium.com/obscuro-labs/against-all-odds-securing-randomness-on-the-blockchain-4c15587a39a8)
- [High-Level Explanation](https://medium.com/obscuro-labs/ten-in-a-nutshell-for-devs-874666910f65)
- [iGaming Features](https://medium.com/@tudor.malene/the-ideal-gaming-chain-bb5674202ec2)

