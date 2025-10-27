---
sidebar_position: 2
---

# Chain Information

## TEN Public RPC Endpoints

:::caution
- TEN Protocol RPC endpoints support standard Ethereum JSON-RPC methods with additional privacy features
- All transactions are encrypted by default - use TEN-compatible wallets and tools
- View the [faucet](https://faucet.ten.xyz/) for testnet tokens
:::

This section provides an overview of the available public RPC endpoints for TEN Protocol networks and necessary details to interact with them.

| Name | RPC Url(s) | Chain ID | Block explorer | Underlying chain | Gateway |Bridge | Faucet |
|------|------------|----------|----------------|------------------|---------|---------|---------|
| TEN Mainnet | `https://rpc.ten.xyz/` | `443` | [TENscan](https://tenscan.io/) | Ethereum | [Gateway](https://gateway.ten.xyz/) |[Bridge]( https://bridge.ten.xyz/) | [Faucet](https://faucet.ten.xyz/) 
| TEN Sepolia Testnet | `https://testnet.ten.xyz/` | `8443` | [TENscan](https://testnet.tenscan.io/) | Ethereum Sepolia | [Gateway](https://testnet.ten.xyz/)  |[Bridge](https://testnet.bridge.ten.xyz/) | [Faucet](https://faucet.ten.xyz/) |

:::info More RPC endpoints
Additional TEN Protocol RPC endpoints and infrastructure providers will be listed here as they become available.
:::

# JSON-RPC API

TEN offers compatibility with a subset of Ethereum's [JSON-RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/). This document outlines the supported JSON-RPC API methods.

## Supported Methods

TEN nodes cater to the following JSON-RPC API methods, accessible via both HTTP and websockets:

- `eth_blockNumber`
- `eth_call`
- `eth_chainId`
- `eth_estimateGas`
- `eth_gasPrice`
- `eth_getBalance`
- `eth_getBlockByHash`
- `eth_getBlockByNumber`
- `eth_getCode`
- `eth_getLogs`
- `eth_getTransactionByHash`
- `eth_getTransactionCount`
- `eth_getTransactionReceipt`
- `eth_sendRawTransaction`

## Websocket Subscriptions

For websocket connections, additional API methods include:

- `eth_subscribe`
- `eth_unsubscribe`

Currently, the sole supported subscription type is `logs`.

## Network Configuration

### TEN Sepolia Testnet

To add TEN Sepolia Testnet to your wallet, use the following configuration:

```json
{
  "chainId": "0x20FB",
  "chainName": "TEN Sepolia Testnet",
  "rpcUrls": ["https://testnet.ten.xyz/v1/"],
  "nativeCurrency": {
    "name": "Ether",
    "symbol": "ETH",
    "decimals": 18
  },
  "blockExplorerUrls": ["https://testnet.tenscan.io/"]
}
```