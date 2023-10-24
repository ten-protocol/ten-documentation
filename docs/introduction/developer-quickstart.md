---
sidebar_position: 4
---

# Migrate your dApp to Obscuro

## 1. Setting Up the Project

This section will walk you through setting up a Hardhat project for Obscuro, installing plugin, and configuring network.

### Prerequisites

- Node.js (v12 or later)
- npm (v7 or later)

### 1. Initial Set Up

First, create a new directory for your project and navigate into it:

```bash
mkdir my-obscuro-project
cd my-obscuro-project
```

Initialize a new npm project:

```bash
npm init -y
```

Or if you are using Yarn:

```bash
yarn init -y
```

### 2. Installing Hardhat

Install Hardhat using npm or Yarn:

```bash
npm install --save-dev hardhat
```

Or:

```bash
yarn add --dev hardhat
```

### 3. Creating a Hardhat Project

Run the following command to create a Hardhat project:

```bash
npx hardhat
```

Follow the prompts to create a sample project, or choose to create an empty hardhat.config.js.

### 4. Installing the Obscuro Hardhat Plugin

To integrate the Obscuro Network into your Hardhat project, install the hh-obscuro-network plugin:

```bash
npm install --save-dev @obscurolabs/hh-obscuro-plugin
```

You can extend the functionality of Hardhat by installing plugins. Install them using npm or Yarn & configure it in the next step.

### 5. Configuring `hardhat.config.js`

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

### 6. Running Your Project

Now that everything is set up, you can run Hardhat tasks:

```bash
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network obscuro
```

or

```bash
npx hardhat deploy --network obscuro
```

# 2. Writing Smart Contracts

Obscuro performs bytecode execution in the EVM identically to Ethereum, allowing developers to leverage their existing codebase and tools.

The main difference and advantage of Obscuro is that on Obscuro, during execution, private variables and the internal state of the contract are hidden from everyone, including node operators and the sequencer.

:::info
In Obscuro, the internal node database is encrypted, and the execution itself is also encrypted inside the TEE.
:::

The calls to [getStorageAt](https://docs.alchemy.com/reference/eth-getstorageat) are disabled, so all data access will be performed through view functions which are under the control of the smart contract developer. Public variables are accessible to everyone because Solidity automatically generates a getter function for them.

We'll illustrate how this works by creating a simple data storage example. In this dApp, users can store a number and retrieve it later.

## Pre-requisite

Please set up your wallet by following the instructions [here](/docs/getting-started/for-developers/setup-dev-env#1-wallet-setup--configuration).

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

In this step, we've declared a public variable `storedValues`. Solidity automatically generates a public getter view function for it, so on both Ethereum and Obscuro, you can call this view function without any restrictions. We also created a function that allows users to store a value against their address.

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

We've now made our data variable private, meaning it can't be accessed directly from outside the contract. To fetch its value, we've provided a custom public view function `getValue` where the user provides the address. On both Ethereum and Obscuro, if you call this function you will retrieve the number stored by that address.

:::caution
In Ethereum, the `_storedValues` variable can also be accessed directly using the `getStorageAt` method, but not in Obscuro.
:::

## Step 3: Implementing Data Access Control 

In this step, our aim is to restrict users to only access their own value. This feature can only be implemented in Obscuro because as mentioned above, `_storedValues` is not hidden in Ethereum.

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

In Obscuro, the platform ensures that calls to view functions are authenticated. Which means that behind the scenes, there is a signature of the `tx.origin` address.

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

On Ethereum, events are visible to anyone. For example, you can subscribe to the `DataChanged` event and receive notifications in real-time about the data of everyone else. In Obscuro, we wanted to do better than that.

- The `DataChanged` event is specific to an account, so it should only be received by that user.
- `MilestoneReached`, on the other hand, is intended for everyone, as we want to show how popular our contract is.

The behavior you desire is to restrict the visibility of `DataChanged`, but not that of `MilestoneReached`. **This is exactly how it works by default!**

How it works:
- `DataChanged` - has an address as a topic (an indexed field), which makes it relevant to that address.
- `MilestoneReached` - has no address topic, so it is visible to everyone.

All you have to do is emit events as usual, and the platform applies common-sense visibility rules.


# 3. Building the Frontend

Creating a user-friendly frontend is crucial for interacting with your smart contracts on Obscuro. This section will guide you through setting up a frontend application, installing necessary packages, and integrating the Obscuro network.

## 3.1. Setting Up Your Project

Start by creating a new directory for your frontend application and initialize a Node.js project:

```bash
mkdir my-obscuro-dapp
cd my-obscuro-dapp
npm init -y
```

## 3.2. Setting Up Your Application

Create your components and set up the application structure. Ensure that you have a component to interact with your smart contract.

## 3.3. Integrating Obscuro Network

### 3.3.1. Using Obscuro Gateway Widget Package

Install the Obscuro Gateway Widget package to easily integrate the Obscuro network into your dApp:

```bash
npm install @obscuro/obscuro-gateway-widget
```

Import and use the package in your components to interact with the Obscuro network.

### 3.3.2. Using CDN as a Fallback

In case you are unable to install the Obscuro Gateway Widget package, you can use the Obscuro Gateway Library through CDN. Add the following script tag to your HTML file:

```html
<script src="https://cdn.obscuro.network/gateway-library.js"></script>
```

Then, use the `join` and `authorizeAccount` functions provided by the library to integrate the Obscuro network into your dApp:

```javascript
obscuroGateway.join();
obscuroGateway.authorizeAccount();
```

## 3.5. Running Your Application

Finally, run your application:

```bash
npm start
```

Your application should now be running on `http://localhost`, and you should be able to interact with your smart contracts on the Obscuro network through the frontend.

---

Migrate your dApp to Obscuro today and experience enhanced encryption and privacy without compromising on the Ethereum experience.
