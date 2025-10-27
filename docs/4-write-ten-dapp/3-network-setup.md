---
sidebar_position: 3
---

# Network Configuration

Migrating to TEN enables your dApp to leverage “programmable encryption.” Below are steps to help you transition smoothly.

### Key Migration Steps

- Update your Hardhat deployment to support the `--network ten` option.
- Add data protection logic to your view functions (if applicable).
- Configure visibility rules for event logs and internal storage.
- Add the TEN onboarding widget to your JavaScript UI.
- Add features that make use of secure, verifiable randomness using `block.prevrandao` or precise timestamping

## 1. Configuring Hardhat

First, set up a Hardhat project if you haven't already.

### 1.1 Installing the TEN Hardhat Plugin

To add TEN Network compatibility, install the `ten-hardhat-plugin`:

```bash
npm install ten-hardhat-plugin
```

_You can use `npm` or `yarn` to install plugins._

### 1.2 Configuring `hardhat.config.js`

Modify `hardhat.config.js` in your project’s root directory as follows:

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
        chainId: 8443,
        accounts: ["your-private-key"],
    },
  },
};

export default config;
```

Once configured, you can start writing or migrating your smart contracts.