---
sidebar_position: 4
---

# Migrate your dApp to Ten

Migrating to Ten enables your dApp to leverage "Programmable Encryption" for added data privacy. Below are steps to help you transition smoothly.

### Key Migration Steps

1. Update your Hardhat deployment to support the `--network ten` option.
2. Integrate data protection into your view functions (if applicable).
3. Set visibility for event logs.
4. Add a Ten onboarding widget to your JavaScript UI.

## 1. Configuring Hardhat

First, set up a Hardhat project if you haven't already.

### 1.1 Installing the Ten Hardhat Plugin

To add Ten Network compatibility, install the `ten-hardhat-plugin`:

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
    hardhat: {},
    ten: {
        url: "https://testnet.ten.xyz/v1/",
        chainId: 443,
        accounts: ["your-private-key"],
    },
  },
};

export default config;
```

Once configured, you’re ready to start writing or migrating your smart contracts.

## 2. Writing Smart Contracts for Ten

Ten executes bytecode within the EVM similarly to Ethereum, so you can reuse much of your existing code. However, Ten enhances privacy by hiding private variables and contract states, making it an ideal platform for privacy-focused dApps.

:::info
Ten encrypts its internal node database and also encrypts execution within a Trusted Execution Environment (TEE).
:::

The [getStorageAt](https://docs.alchemy.com/reference/eth-getstorageat) method is disabled by default on Ten, so data access relies on view functions that you define. Public variables remain accessible as Solidity automatically creates getters for them.

Let's illustrate with a basic storage dApp example where users can store and retrieve a number.

## Step 1: Defining a Public Variable

### Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StorageExample {
    mapping(address => uint256) public storedValues;

    function storeValue(uint256 value) public {
        storedValues[tx.origin] = value;
    }
}
```

### Explanation

`storedValues` is a public variable. Solidity provides a default getter for it, making it accessible on both Ethereum and Ten. The `storeValue` function allows users to associate a value with their address.

## Step 2: Converting to a Private Variable with a Getter Function

### Code

```solidity
contract StorageExample {
    mapping(address => uint256) private _storedValues;

    function storeValue(uint256 value) public {
        _storedValues[tx.origin] = value;
    }
    
    function getValue(address account) public view returns (uint256) {
        return _storedValues[account];
    }
}
```

### Explanation

The `storedValues` variable is now private, requiring a custom `getValue` function to retrieve data. While both Ethereum and Ten allow you to call this function, on Ten, `_storedValues` is inaccessible outside of `getValue`.

:::caution
In Ethereum, `_storedValues` can be accessed directly with `getStorageAt`, but not on Ten.
:::

## Step 3: Adding Data Access Control

We’ll add restrictions so users can only access their own data. This is only possible on Ten since Ten prevents unauthorized access to private state data.

### Code

```solidity
contract StorageExample {
    mapping(address => uint256) private _storedValues;

    function storeValue(uint256 value) public {
        _storedValues[tx.origin] = value;
    }

    function getValue(address account) public view returns (uint256) {
        require(tx.origin == account, "Not authorized!");
        return _storedValues[account];
    }
}
```

### Explanation

By requiring `tx.origin == account`, only the original account can retrieve its data, adding a layer of access control.

:::info
Ten uses a "Viewing Key" for authenticated view function calls, ensuring that only authorized users can access their data.
:::

## Step 4: Emitting Events - Default Visibility

Events notify UIs about state changes in smart contracts. We’ll emit an event when a user stores a value and another milestone event when a specific threshold is met.

### Code

```solidity
contract StorageExample {
    mapping(address => uint256) private _storedValues;
    uint256 private totalCalls = 0;

    event DataChanged(address indexed account, uint256 newValue);
    event MilestoneReached(uint256 noStoredValues);

    function storeValue(uint256 value) public {
        _storedValues[tx.origin] = value;
        emit DataChanged(tx.origin, value);
        totalCalls++;
        if (totalCalls % 1000 == 0) {
            emit MilestoneReached(totalCalls);
        }
    }

    function getValue(address account) public view returns (uint256) {
        require(tx.origin == account, "Not authorized!");
        return _storedValues[account];
    }
}
```

### Explanation

In Ten, event logs default to being accessible to the user they concern:
- `DataChanged` is visible only to the `account` in the event.
- `MilestoneReached` is publicly visible to all.

## Step 5: Customizing Event Visibility

You may want explicit control over event visibility. To do this, implement the `ContractTransparencyConfig` interface.

### Code

```solidity
interface ContractTransparencyConfig {
    enum Field { TOPIC1, TOPIC2, TOPIC3, SENDER, EVERYONE }
    enum ContractCfg { TRANSPARENT, PRIVATE }

    struct EventLogConfig {
        bytes32 eventSignature;
        Field[] visibleTo;
    }

    struct VisibilityConfig {
        ContractCfg contractCfg;
        EventLogConfig[] eventLogConfigs;
    }

    function visibilityRules() external pure returns (VisibilityConfig memory);
}

contract StorageExample is ContractTransparencyConfig {
    mapping(address => uint256) private _storedValues;
    uint256 private totalCalls = 0;

    event DataChanged(address indexed account, uint256 newValue);
    event MilestoneReached(uint256 noStoredValues);

    function storeValue(uint256 value) public {
        _storedValues[tx.origin] = value;
        emit DataChanged(tx.origin, value);
        totalCalls++;
        if (totalCalls % 1000 == 0) {
            emit MilestoneReached(totalCalls);
        }
    }

    function getValue(address account) public view returns (uint256) {
        require(tx.origin == account, "Not authorized!");
        return _storedValues[account];
    }

    function visibilityRules() external pure override returns (VisibilityConfig memory) {
        EventLogConfig;

        bytes32 dataChangedSig = hex"0xec851d5c322f7f1dd5581f7432e9f6683a8709a4b1ca754ccb164742b82a7d2f";
        Field;
        relevantTo[0] = Field.TOPIC1;
        relevantTo[1] = Field.SENDER;
        eventLogConfigs[0] = EventLogConfig(dataChangedSig, relevantTo);

        bytes32 milestoneSig = hex"0xd41033274424d56dd572e7196fb4230cf4141d546b91fc00555cab8403965924";
        Field;
        visibleToAll[0] = Field.EVERYONE;
        eventLogConfigs[1] = EventLogConfig(milestoneSig, visibleToAll);

        return VisibilityConfig(ContractCfg.PRIVATE, eventLogConfigs);
    }
}
```

### Explanation

- Implementing `ContractTransparencyConfig.visibilityRules` gives control over event visibility.
- `ContractCfg.TRANSPARENT`: Contracts with public storage and events, exactly like Ethereum.
- `ContractCfg.PRIVATE`: Private contracts where the event visibility can be individually specified by using `Field.EVERYONE`.