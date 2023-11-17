---
sidebar_position: 6
---

# Cross Chain Messaging

Ten features a cross-chain messaging protocol, facilitating secure and decentralized communication across layers.

The foundational contract for this feature is `MessageBus`, present on both L1 and L2. On L1, it's nested under the management contract, while on L2, it's managed by the protocol.

## How It Works

Users invoke the `publishMessage` function on `MessageBus`. This function triggers an event, capturing the message details. The protocol then ensures this message is accessible on the counterpart `MessageBus`.

To verify message receipt, users can call `verifyMessageFinalized` on the receiving layer's `MessageBus`. If the message matches the original details, it returns `true`.

This mechanism allows for queries like: **'Has address 0xAAAA.. received 25WETH tokens on the bridge with address 0XAB0FF?'**. If the bridge confirms the receipt, the query returns true.

For messages published on Ten's L2, the management contract transports them to L1 during rollup submission. However, these messages must await the rollup's challenge period to be deemed final.

## Advanced Capabilities

`MessageBus` offers a method to query non-finalized delivered messages: `getMessageTimeOfFinality`. This previews messages still within the challenge period.

Such "preview" functionality can empower dApps to offer faster-than-challenge-period finality. For instance, a contract might allow immediate withdrawals from a bridge at a fee, transferring withdrawal rights to the fee payer upon message finalization.

## Security

The protocol listens only to events from the contract address linked to the management contract. Messages are tied to L1 blocks, recalculating state during reorganizations. L2 messages also link to L1 block hashes, ensuring state updates align with the correct fork.

The protocol securely manages the keys for the L2 contract within SGX. Extracting the private key controlling the L2 `MessageBus` would necessitate breaching SGX. Even if achieved, the protocol would auto-reject such transactions, as it scans all external transactions.

## Interface

Below are the interfaces for interacting with `MessageBus`. For queries or issues, join our [Discord](https://discord.gg/tVnNrQ35Ke).

```solidity
interface Structs {
    struct CrossChainMessage {
        address sender;
        uint64  sequence;
        uint32  nonce;
        uint32  topic;
        bytes   payload;
        uint8   consistencyLevel;
    }
}

interface IMessageBus {
    function publishMessage(
        uint32 nonce,
        uint32 topic,
        bytes calldata payload, 
        uint8 consistencyLevel
    ) external returns (uint64 sequence);

    function verifyMessageFinalized(
        Structs.CrossChainMessage calldata crossChainMessage
    ) external view returns (bool);
    
    function getMessageTimeOfFinality(
        Structs.CrossChainMessage calldata crossChainMessage
    ) external view returns (uint256);
}
```
