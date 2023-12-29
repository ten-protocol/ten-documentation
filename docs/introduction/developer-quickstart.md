---
sidebar_position: 4
---

# Migrate your dApp to Ten
Migrating to Ten is a straight-forward process that immediately unlocks private state.
There are three main types of changes you need to make:

1. Change your hardhat deployment script so that you can use --network obscuro
2. Add logic to your view functions to protect data (if needed).
3. Add a widget to your javascript UI to onboard Ten users.


## 1. Configuring Hardhat

To begin building on Ten, start by setting up a Hardhat project as usual.

### 1.1 Installing the Ten Hardhat Plugin

To integrate the Ten Network into your Hardhat project, install the hh-obscuro-network plugin:

```bash
npm install --save-dev @obscurolabs/hh-obscuro-plugin
```

You can extend the functionality of Hardhat by installing plugins. Install them using npm or Yarn & configure it in the next step.

### 1.2 Configuring `hardhat.config.js`

Open `hardhat.config.js` in your project's root directory and configure it in the following way:

```javascript
import {HardhatUserConfig} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "hh-obscuro-plugin"

module.exports = {
  solidity: "0.8.10",
  networks: {
    hardhat: {
      // Configuration for the Hardhat Network
    },
    obscuro: {
      url: "https://testnet.obscu.ro/V1/",
      accounts: ["your-private-key"],
    },
  },
};

export default config;
```
Now, start writing the smart contracts for your project.

# 2. Writing Smart Contracts

Ten performs bytecode execution in the EVM identically to Ethereum, allowing developers to leverage their existing codebase and tools.

The main difference and advantage of Ten is that on Ten, during execution, private variables and the internal state of the contract are hidden from everyone, including node operators and the sequencer.

:::info
In Ten, the internal node database is encrypted, and the execution itself is also encrypted inside the TEE.
:::

The calls to [getStorageAt](https://docs.alchemy.com/reference/eth-getstorageat) are disabled, so all data access will be performed through view functions which are under the control of the smart contract developer. Public variables are accessible to everyone because Solidity automatically generates a getter function for them.

We'll illustrate how this works by creating a simple data storage example. In this dApp, users can store a number and retrieve it later.

## Step 1: Declaring a Public Variable

### Code:

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

### Explanation:

In this step, we've declared a public variable `storedValues`. Solidity automatically generates a public getter view function for it, so on both Ethereum and Ten, you can call this view function without any restrictions. We also created a function that allows users to store a value against their address.

## Step 2: Transitioning to a Private Variable with a Getter Function

### Code:

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

### Explanation:

We've now made our data variable private, meaning it can't be accessed directly from outside the contract. To fetch its value, we've provided a custom public view function `getValue` where the user provides the address. On both Ethereum and Ten, if you call this function you will retrieve the number stored by that address.

:::caution
In Ethereum, the `_storedValues` variable can also be accessed directly using the `getStorageAt` method, but not in Ten.
:::

## Step 3: Implementing Data Access Control 

In this step, our aim is to restrict users to only access their own value. This feature can only be implemented in Ten because as mentioned above, `_storedValues` is not hidden in Ethereum.

### Code:

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

### Explanation:

Since `getValue` is the only function which exposes the values, we can add a check like this: `require(tx.origin == account, "Not authorized!");` If anyone, other than the original account, asks for the value, they will get an error.

:::info
In Ethereum, since all data is accessible anyway, there is no need to sign calls to view functions, so `tx.origin` can be spoofed.
:::

In Ten, the platform ensures that calls to view functions are authenticated. Which means that behind the scenes, there is a signature of the `tx.origin` address.

## Step 4: Emitting Events

Events in Ethereum are crucial for UIs to react to smart contract state changes. In this step, we'll emit an event when a user stores a value. We'll also gauge the popularity of our contract by emitting an event when certain milestones are reached.

### Code:

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

### Explanation:

On Ethereum, events are visible to anyone. For example, you can subscribe to the `DataChanged` event and receive notifications in real-time about the data of everyone else. In Ten, we wanted to do better than that.

- The `DataChanged` event is specific to an account, so it should only be received by that user.
- `MilestoneReached`, on the other hand, is intended for everyone, as we want to show how popular our contract is.

The behavior you desire is to restrict the visibility of `DataChanged`, but not that of `MilestoneReached`. **This is exactly how it works by default!**

How it works:
- `DataChanged` - has an address as a topic (an indexed field), which makes it relevant to that address.
- `MilestoneReached` - has no address topic, so it is visible to everyone.

All you have to do is emit events as usual, and the platform applies common-sense visibility rules.


# 3. Integrating Ten Network in the Frontend

Creating a user-friendly frontend is crucial for interacting with your smart contracts on Ten. This section will guide you through installing necessary packages and integrating the Ten network.

```bash
npm install @obscuro/obscuro-gateway-widget
```

Import and use the package in your components to interact with the Ten network. Example: If you want the Ten Gateway Widget to appear on the homepage then you can call the component \<obscuro-gateway-widget> there.

---

Migrate your dApp to Ten today and experience enhanced encryption and privacy without compromising on the Ethereum experience.
