---
sidebar_position: 4
---

# Migrate your dApp to TEN

Migrating to TEN enables your dApp to leverage "Programmable Encryption". Below are steps to help you transition smoothly.

## Key Migration Steps

- Update your Hardhat deployment to support the `--network ten` option.
- Add data protection logic to your view functions (if applicable).
- Configure visibility rules for event logs and internal storage.
- Add the TEN onboarding widget to your JavaScript UI.

## 1. Configuring Hardhat

First, set up a Hardhat project if you haven't already.

### 1.1 Installing the TEN Hardhat Plugin

To add TEN Network compatibility, install the `ten-hardhat-plugin`:

```bash
npm install ten-hardhat-plugin
```

_You can use `npm` or `yarn` to install plugins._

### 1.2 Configuring `hardhat.config.js`

Modify `hardhat.config.js` in your project's root directory as follows:

```javascript
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "ten-hardhat-plugin";

module.exports = {
  solidity: "0.8.10",
  networks: {
    hardhat: {
        // Configuration for the Hardhat Network
    },
    ten: {
        url: "https://testnet.ten.xyz/v1/",
        chainId: 443,
        accounts: ["your-private-key"],
    },
  },
};

export default config;
```

Once configured, you can start writing or migrating your smart contracts.

## 2. Understanding TEN Contract Development

TEN executes smart contracts within the EVM similarly to Ethereum, so you can reuse your existing code. 
However, the execution and the internal state are hidden from everyone, including node operators and the sequencer.

:::info
TEN encrypts both the execution and its internal database using Trusted Execution Environments (TEEs).
:::

For detailed guidance on writing smart contracts for TEN, including:
- Data access control patterns
- Event visibility configuration
- Privacy-preserving contract design

See the comprehensive guide: [Smart Contracts](/docs/getting-started/for-developers/explore-contracts-in-ten/)

## 3. Advanced TEN Features

### Session Keys for Smooth UX
TEN supports native session keys for seamless user experiences without requiring transaction signing for every action. This is particularly useful for games and interactive dApps.

Learn more: [Session Keys](/docs/standards-primitives/session-keys)

### Secure Game Development
Building secure on-chain games requires special considerations for randomness and preventing exploits. TEN provides unique solutions for these challenges.

Learn more: [Game Security](/docs/getting-started/for-developers/game-security)

## 4. Migration Checklist

- [ ] Install and configure the TEN Hardhat plugin
- [ ] Update your contracts to use TEN's privacy features
- [ ] Configure event visibility rules (if needed)
- [ ] Test your contracts on TEN testnet
- [ ] Implement session keys (if applicable)
- [ ] Add TEN Gateway integration to your frontend
- [ ] Deploy and verify your contracts