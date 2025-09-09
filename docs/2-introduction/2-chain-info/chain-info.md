---
sidebar_position: 1
---

# TEN Protocol Chain Information

## TEN Public RPC Endpoints TODO

:::caution
- TEN Protocol RPC endpoints support standard Ethereum JSON-RPC methods with additional privacy features
- All transactions are encrypted by default - use TEN-compatible wallets and tools
- View the [faucet](https://faucet.ten.xyz/) for testnet tokens
:::

This section provides an overview of the available public RPC endpoints for TEN Protocol networks and necessary details to interact with them.

| Name | RPC Url(s) | Chain ID | Block explorer | Underlying chain | Tech stack | Faucet |
|------|------------|----------|----------------|------------------|------------|---------|
| TEN Sepolia Testnet | `https://testnet.ten.xyz/v1/` | `8443` | [TENscan](https://tenscan.io/) | Ethereum Sepolia | Confidential Rollup (TEE) | [Faucet](https://faucet.ten.xyz/) |

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
  "chainId": "0x1BB",
  "chainName": "TEN Sepolia Testnet",
  "rpcUrls": ["https://testnet.ten.xyz/v1/"],
  "nativeCurrency": {
    "name": "Ether",
    "symbol": "ETH",
    "decimals": 18
  },
  "blockExplorerUrls": ["https://tenscan.io/"]
}
```

### MetaMask Configuration

1. Open MetaMask and click on the network dropdown
2. Select "Add Network"
3. Enter the network details above
4. Click "Save" to add TEN Sepolia Testnet

## TEN Protocol Smart Contract Addresses

### Core Protocol Contracts

The following contracts are deployed on Ethereum L1 (Sepolia for testnet):

| Contract | Sepolia Address | Description |
|----------|----------------|-------------|
| Management Contract | `0x...` | Core protocol management and governance |
| Message Bus | `0x...` | Cross-chain messaging between L1 and L2 |
| Bridge Contract | `0x...` | Asset bridging between Ethereum and TEN |

:::note Contract addresses
Mainnet contract addresses will be added here upon mainnet launch. Current addresses are for Sepolia testnet.
:::

### L2 System Contracts

The following contracts are deployed on TEN Protocol:

| Contract | TEN Address | Description |
|----------|-------------|-------------|
| System Contract | `0x...` | Core TEN Protocol system functionality |
| Bridge Receiver | `0x...` | Receives bridged assets from L1 |
| Fee Contract | `0x...` | Manages transaction fees and gas pricing |

## Bridge Information

### TEN Bridge

- **L1 Bridge Contract**: `0x...` (Ethereum Sepolia)
- **L2 Bridge Contract**: `0x...` (TEN Protocol)
- **Bridge UI**: [bridge.ten.xyz](https://bridge.ten.xyz/)

### Supported Assets

| Asset | L1 Address | L2 Address | 
|-------|------------|------------|
| ETH | Native | Native |
| USDC | `0x...` | `0x...` |
| USDT | `0x...` | `0x...` |

## Development Tools

### Compatible Wallets
- **MetaMask** - Full support with TEN network configuration
- **TEN Gateway** - Native TEN wallet with privacy features
- **WalletConnect** - Compatible wallets via WalletConnect protocol

### Development Frameworks
- **Hardhat** - Full compatibility with TEN networks
- **Foundry** - Supported for smart contract development
- **Remix** - Web-based IDE with TEN integration
- **Truffle** - Compatible with standard configuration

### Block Explorers
- **[TENscan](https://tenscan.io/)** - Official TEN Protocol block explorer
- **Features**: Transaction privacy controls, encrypted state viewing, TEE attestation verification

## Faucet Information

### TEN Sepolia Testnet Faucet

- **URL**: [https://faucet.ten.xyz/](https://faucet.ten.xyz/)
- **Requirements**: Valid Ethereum address
- **Limits**: 1 ETH per day per address
- **Usage**: Required for testing smart contracts and transactions on TEN Sepolia

## Network Status

### Official Status Pages
- **Network Status**: [status.ten.xyz](https://status.ten.xyz/)
- **TEN Bridge Status**: [bridge.ten.xyz/status](https://bridge.ten.xyz/status)

### Key Metrics
- **Block Time**: ~12 seconds (synchronized with Ethereum L1)
- **Finality**: Instant soft finality, ~15 minutes hard finality
- **Gas Limit**: 30,000,000 per block
- **Privacy**: All transactions encrypted by default

## Privacy Features

### Encrypted Transactions
- All transaction data is encrypted using TEE technology
- Only authorized parties can view transaction details
- Programmable disclosure rules for compliance

### Smart Transparency
- Developers control data visibility
- Time-delayed revelations supported
- Selective disclosure for auditing and compliance

### MEV Protection
- Built-in protection against front-running
- Encrypted mempool prevents transaction ordering manipulation
- Fair transaction sequencing through TEE consensus

## Getting Started

1. **Add TEN Network** to your wallet using the configuration above
2. **Get Testnet ETH** from the [faucet](https://faucet.ten.xyz/)
3. **Deploy Contracts** using standard Ethereum tools
4. **Explore Privacy Features** with encrypted transactions
5. **Monitor Activity** on [TENscan](https://tenscan.io/)

## Support and Resources

- **Documentation**: [docs.ten.xyz](https://docs.ten.xyz/)
- **Discord**: [discord.gg/ten-protocol](https://discord.gg/ten-protocol)
- **GitHub**: [github.com/ten-protocol](https://github.com/ten-protocol)
- **Blog**: [medium.com/ten-protocol](https://medium.com/ten-protocol)

---

*Last updated: January 2025*