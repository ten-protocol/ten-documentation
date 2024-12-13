---
sidebar_position: 4
---

# Migrate your dApp to TEN

Migrating to TEN enables your dApp to leverage "Programmable Encryption". Below are steps to help you transition smoothly.

### Key Migration Steps

1. Update your Hardhat deployment to support the `--network ten` option.
2. Add data protection logic to your view functions (if applicable).
3. Configure visibility rules for event logs and internal storage.
4. Add the TEN onboarding widget to your JavaScript UI.

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
        chainId: 443,
        accounts: ["your-private-key"],
    },
  },
};

export default config;
```

Once configured, you can start writing or migrating your smart contracts.

## 2. Writing Smart Contracts for TEN

TEN executes smart contracts within the EVM similarly to Ethereum, so you can reuse your existing code. 
However, the execution and the internal state are hidden from everyone, including node operators and the sequencer.

:::info
TEN encrypts both the execution and its internal database using Trusted Execution Environments (TEEs).
:::

The [getStorageAt](https://docs.alchemy.com/reference/eth-getstorageat) method is disabled by default on TEN, so data access relies on view functions that you define. 
Public variables remain accessible as Solidity automatically creates getters for them.

Let's illustrate with a basic storage dApp example where users can store and retrieve a number.

At every step, we'll add a new feature and explain the difference between `TEN` and `Ethereum`.

## Step 1: Basic contract with a Public Variable

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

In this step, we created a public variable `storedValues` that maps the provided value to the address of the user who called the `storeValue` function. 

Because the variable is public, Solidity will provide a default public getter for it. 

Since there are no data access restrictions, on both Ethereum and TEN, everyone will be able to read the values of all users.

## Step 2: Converting to a Private Variable with an explicit Getter Function

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

The `storedValues` variable is now private, and we added a basic `getValue` function for users to retrieve their value. 

On both Ethereum and TEN, anyone can call `getValue` to retrieve any value.   
On Ethereum, `_storedValues` can also be accessed directly with `getStorageAt`

## Step 3:  Data Access Control

In this step, we'll add restrictions so users can only access their own data. 

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

The key line is: ``require(tx.origin == account, "Not authorized!");``, which ensures that the caller of the view function is the owner of the data.

:::info
TEN uses  "Viewing Keys" to authenticate view function calls.
:::

**When deployed on TEN, this code guarantees that all users can only access their own values, and nobody can read the `_storedValues`.**

## Step 4: Emitting Events - Default Visibility

Event logs notify UIs about state changes in smart contracts. 

To improve our smart contract, we’ll emit an event when a user stores a value and milestone events when a specific size threshold is met.

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

Notice how we defined the two events: `DataChanged` and `MilestoneReached`, and are emitting them in the `storeValue` function.

In Ethereum, everyone can query and subscribe to these events. This obviously can't be the case for TEN because it would completely break the functionality.

Notice how in this version, we have no configuration for event log visibility, so we are relying on the default rules.

Rule 1: Event logs that contain EOAs as indexed fields (topics) are only visible to those EOAs.
Rule 2: Event logs that don't contain any EOA are visible to everyone.

In our case, the default rules ensure that:
- `DataChanged` is visible only to the address that is storing the value.
- `MilestoneReached` is publicly visible.


## Step 5: Customizing Event Visibility

The default visibility rules are a good starting point, but complex dApps require greater flexibility. 

TEN give you explicit control over event visibility. 

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
        EventLogConfig[]  memory eventLogConfigs = new EventLogConfig[](2);

        // the signature of "event DataChanged(address indexed account, uint256 newValue);"
        bytes32 dataChangedEventSig = hex"0xec851d5c322f7f1dd5581f7432e9f6683a8709a4b1ca754ccb164742b82a7d2f";
        Field[]  memory relevantTo = new Field[](2);
        relevantTo[0] = Field.TOPIC1;
        relevantTo[1] = Field.SENDER;
        eventLogConfigs[0] = EventLogConfig(dataChangedEventSig, relevantTo);

        // the signature of "event MilestoneReached(uint256 noStoredValues);"
        bytes32 milestoneReachedEventSig = hex"0xd41033274424d56dd572e7196fb4230cf4141d546b91fc00555cab8403965924";
        Field[]  memory relevantTo = new Field[](1);
        relevantTo[0] = Field.EVERYONE;
        eventLogConfigs[1] = EventLogConfig(milestoneReachedEventSig, relevantTo);

        return VisibilityConfig(ContractCfg.PRIVATE, eventLogConfigs);
    }
}
```

### Explanation

The `ContractTransparencyConfig` interface is known by the TEN platform. 
When a contract is deployed, the platform will call the `visibilityRules` function, and store the `VisibilityConfig`.

For each event type, you can configure which fields can access it. 
This allows the developer to configure an event to be public even if it has EOAs or to allow the sender of the transaction to access events emitted even if the address is not in the event.  

Notice how in the `visibilityRules` above, we configure the `DataChanged` event to be visible to the first field and the sender, and the `MilestoneReached` to be visible to everyone. 

The other configuration: `VisibilityConfig.contractCfg` applies to the entire contract:
- `ContractCfg.TRANSPARENT`: The contracts will have public storage and events, behaving exactly like Ethereum.
- `ContractCfg.PRIVATE`: The default TEN behaviour, where the storage is not accessible and the events are individually configurable.
