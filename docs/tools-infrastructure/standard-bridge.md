---
sidebar_position: 5
---

# Standard Bridge

The standard Obscuro bridge is a trustless and decentralized asset bridge leveraging a wrapped token mint and burn pattern. It's built on the cross-chain messaging protocol and operates entirely as a smart contract, eliminating the need for separate runnables or nodes.

## Interacting with the Contract

Users can interact with the bridge contract through the `sendERC20` or `sendNative` functions. Note: ERC20 tokens must be whitelisted before use.

### Using `sendERC20`:
1. Approve the bridge contract to manage a specific amount of tokens using the ERC20 `approve()` method.
2. Invoke `sendERC20` specifying the approved amount and the recipient's address on the other side.
3. Wait briefly for the cross-chain protocol to synchronize the layers.
4. Utilize your assets on the other layer.

For `sendNative`, simply add value to the transaction. The bridge contract's received value during `sendNative` execution will be logged as a transfer to the other layer.

## Layer 1 To Layer 2 Specifics

- **Layer 1 (L1)**: Managed by `ObscuroBridge.sol` - the bridge to Obscuro.
- **Layer 2 (L2)**: Managed by `EthereumBridge.sol` - the bridge to Ethereum.

Tokens must be whitelisted to bridge over. Initially, only admin role accounts can whitelist tokens. As the protocol matures, this will change. To whitelist your token, request it on [Discord](https://discord.com/invite/yQfmKeNzNd).

## Security

The bridge uses the `CrossChainEnabledObscuro` contract, offering a `onlyCrossChainSender` modifier to restrict public function access. The bridge initialization phase securely links the two bridge contracts. The setup ensures that `receiveAsset` can only be invoked with a valid cross-chain message from the correct contract.

## Building Bridges

The standard bridge operates without needing private platform capabilities, meaning anyone can build a bridge using the cross-chain messaging API. No permissions are required. Innovative bridge construction is encouraged and support is available. Join [Discord](https://discord.com/invite/yQfmKeNzNd) for discussions, questions, and support.

## Interface 

Interact with the bridge using the following interface:

```solidity
interface IBridge {
    function sendNative(address receiver) external payable;

    function sendERC20(
        address asset,
        uint256 amount,
        address receiver
    ) external;
}
```

For more details, discussions, or support, join our [Discord](https://discord.com/invite/yQfmKeNzNd).
