---
sidebar_position: 2
---
# Set up development environment

## 1. Wallet Setup & Configuration

To start building on TEN, you first need to set up and configure your wallet with the TEN network.

1. **Install MetaMask**: [Install](https://metamask.io/download/) MetaMask either as a browser extension or mobile app.
2. **Configure MetaMask for TEN**:
   - Visit the [TEN Gateway](https://gateway.ten.xyz/) for wallet setup.
   - Click on 'Connect to TEN Testnet' and follow the on-screen instructions.
   - Learn more about the [TEN Gateway](/docs/tools-infrastructure/hosted-gateway).
3. **Acquire Testnet ETH Tokens**: To perform transactions, you'll need testnet ETH tokens. Refer to our [Getting tokens](/docs/getting-started/for-users/get-tokens).

## 2. Setting Up the Environment

Once your wallet is ready, you can proceed with the development and deployment of your smart contracts.

1. **Choose an IDE**: Use your preferred development environment or Integrated Development Environment (IDE) like Truffle, Remix, Hardhat, or Foundry. Check out IDE compatibility and its features [here](/docs/tools-infrastructure/compatible-tools).
2. **Connect IDE to MetaMask**: Ensure your chosen IDE is connected to your MetaMask wallet.

## 3. Docker Configuration

For developers running a node and infrastructure using Docker on a Mac, please be aware that you must **disable** the
“Use Rosetta for x86_64/amd64 emulation on Apple Silicon” setting. Failing to do so will prevent the testnet from running correctly.
