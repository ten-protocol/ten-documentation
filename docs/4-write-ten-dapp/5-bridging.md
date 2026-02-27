---
sidebar_position: 5
---
# Cross-Chain Messaging

`CrossChainEnabledTEN` is a convenience base contract that applications inherit to get cross-chain capabilities. During initialisation it must be configured with the address of the `CrossChainMessenger` on the same chain — e.g. `TenBridge` on L1 points to the L1 messenger, `EthereumBridge` on L2 points to the L2 messenger. This is the trusted authority that authenticates incoming cross-chain calls:

```solidity
CrossChainEnabledTEN.configure(messengerAddress);
```

The `configure` call derives the `MessageBus` address from the messenger and initialises the nonce counter. Once configured, the contract provides the ability to send and receive cross-chain messages.

## Sending Messages

```solidity
function queueMessage(
    address remoteTarget,
    bytes memory payload,
    uint32 topic,
    uint256 gas,
    uint8 consistencyLevel
) internal;
```

This encodes a `CrossChainCall` and publishes it through the MessageBus. The bridge uses this to send function calls like `receiveAssets(...)` to its counterpart on the other chain.

For raw data (not function calls):

```solidity
function publishRawMessage(bytes memory data, uint32 topic, uint8 consistencyLevel) internal;
```

## Receiving Messages

The `onlyCrossChainSender` modifier verifies that the current call originated from a cross-chain relay and came from the expected sender:

```solidity
modifier onlyCrossChainSender(address expectedSender) {
    require(_isCrossChain());
    require(_crossChainSender() == expectedSender);
    require(_crossChainTarget() == address(this));
    _;
}
```

This is how the reference bridge ensures that only its counterpart on the other chain can call `receiveAssets`.

## Reference Bridge

TEN includes a reference bridge that demonstrates `CrossChainEnabledTEN` in practice. It handles ERC-20 transfers, native ETH, and WETH wrapping/unwrapping across L1 and L2.

### L1 TenBridge

[`TenBridge.sol`](https://github.com/ten-protocol/go-ten/blob/main/contracts/src/reference_bridge/L1/contracts/TenBridge.sol) sits on Ethereum. It locks assets on L1 and uses `queueMessage` to instruct the L2 bridge to mint or release the equivalent on TEN:

```solidity
contract TenBridge is CrossChainEnabledTEN, IBridge, ... {

    function initialize(address messenger, address _owner) public initializer {
        CrossChainEnabledTEN.configure(messenger);
        // ...
    }

    function sendERC20(address asset, uint256 amount, address receiver) external payable {
        SafeERC20.safeTransferFrom(IERC20(asset), msg.sender, address(this), amount);

        bytes memory data = abi.encodeWithSelector(
            IBridge.receiveAssets.selector, asset, amount, receiver
        );
        queueMessage(remoteBridgeAddress, data, uint32(Topics.TRANSFER), 0, 0, 0);
    }

    function receiveAssets(address asset, uint256 amount, address receiver)
        external
        onlyCrossChainSender(remoteBridgeAddress)
    {
        // unlock tokens or native ETH back to the receiver
    }
}
```

### L2 EthereumBridge

[`EthereumBridge.sol`](https://github.com/ten-protocol/go-ten/blob/main/contracts/src/reference_bridge/L2/contracts/EthereumBridge.sol) sits on TEN. It mints wrapped tokens when assets arrive from L1 and burns them when a user bridges back:

```solidity
contract EthereumBridge is IBridge, ITokenFactory, CrossChainEnabledTEN, ... {

    function initialize(address messenger, address remoteBridge, address localWeth)
        public initializer
    {
        CrossChainEnabledTEN.configure(messenger);
        remoteBridgeAddress = remoteBridge;
        // ...
    }

    function sendERC20(address asset, uint256 amount, address receiver) external payable {
        WrappedERC20 token = wrappedTokens[asset];
        token.burnFor(msg.sender, amount);

        bytes memory data = abi.encodeWithSelector(
            IBridge.receiveAssets.selector, localToRemoteToken[asset], amount, receiver
        );
        queueMessage(remoteBridgeAddress, data, uint32(Topics.TRANSFER), 0, 0, msg.value);
    }

    function receiveAssets(address asset, uint256 amount, address receiver)
        external
        onlyCrossChainSender(remoteBridgeAddress)
    {
        wrappedTokens[remoteToLocalToken[asset]].issueFor(receiver, amount);
    }
}
```

Both contracts follow the same pattern: 
* **Configure** the messenger
* **Send** via `queueMessage`
* **Receive** behind `onlyCrossChainSender`

Use them as a starting point for your own cross-chain application.

