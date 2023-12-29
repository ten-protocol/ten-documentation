---
sidebar_position: 4
---
# Interaction with Ethereum

Ten serves as a confidential extension to Ethereum, enabling assets to move seamlessly between the two networks. While many sidechains and L2 solutions have developed bridges to address mismatches between different network models, Ten's approach is distinct, ensuring a decentralized and secure interaction.

## Deposits

- **Process**: Users deposit supported ERC tokens into the Bridge contract's address. Once the transaction is confirmed on Ethereum L1, the Ten-enabled wallet automatically creates an L2 transaction, crediting the user's Ten account with wrapped tokens.
  
- **Finality Consideration**: Due to Ethereum's probabilistic finality, Ten introduces a dependency mechanism between L2 rollups and L1 blocks to ensure accurate crediting of L2 accounts.

## Withdrawals

- **Requirement**: To move assets back to Ethereum, Ten provides a secure withdrawal function.
  
- **Decentralized Approach**: Ten employs economic incentives on top of the POBI protocol to ensure a decentralized withdrawal process, avoiding reliance on multi-signature technology or long waiting periods.

## Rollup Finality

- **Standard Delay**: Typically, a rollup is considered final if a standard number of Ethereum blocks (equivalent to a 1-day period) have passed since its publication on Ethereum L1.

- **Competing Forks**: If multiple forks are detected, finality is suspended on all forks, and withdrawals are halted. The protocol has mechanisms to address such scenarios and ensure user satisfaction.

## Ten Public Events

- **Use Cases**: Ethereum applications can utilize Ten for tasks like organizing fair lotteries or publishing poker game results, which require data originating in L2 to be final.

- **Public Events**: Applications within Ten can emit special "Public Events". Once these events reach finality, they are exposed to external contracts on Ethereum L1.