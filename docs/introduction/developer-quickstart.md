---
sidebar_position: 4
---

# Migrate your dApp to Ten
Migrating to Ten is a straightforward process that immediately unlocks "Programmable Encryption".

There are a couple of changes you need to make:

1. Change your hardhat deployment script so that you can use `--network ten`.
2. Add logic to your view functions to protect data (if needed).
3. Configure event log visibility (if needed).
4. Add a widget to your javascript UI to onboard Ten users.

## 1. Configuring Hardhat

To begin building on Ten, you can start by setting up a Hardhat project as usual.

### 1.1 Installing the Ten Hardhat Plugin

To integrate the Ten Network into your Hardhat project, install the ten-hardhat-plugin:

```bash
npm install ten-hardhat-plugin
```

Note: Plugins can be installed using `npm` or `yarn`.

### 1.2 Configuring `hardhat.config.js` for the Ten Testnet

Open `hardhat.config.js` in your project's root directory and configure it in the following way:

```javascript
import {HardhatUserConfig} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import 'ten-hardhat-plugin'

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
Now, you can start writing or migrating the smart contracts.

# 2. Writing Smart Contracts

Ten performs bytecode execution in the EVM identically to Ethereum, allowing developers to leverage their existing codebase and tools.

The main difference is that, during execution, private variables and the internal state of the contract are hidden from everyone, including node operators and the sequencer.
This is a major advantage that represents "Programmable Privacy".

:::info
In Ten, the internal node database is encrypted, and the execution itself is also encrypted inside the TEE.
:::

The calls to [getStorageAt](https://docs.alchemy.com/reference/eth-getstorageat) are disabled by default, so all data access will be performed through view functions which are under the control of the smart contract developer. Note that public variables are accessible to everyone because Solidity automatically generates a getter function for them.

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

In this step, we aim to restrict users to only access their own value. This feature can only be implemented in Ten because as mentioned above, `_storedValues` is not hidden in Ethereum.

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

In Ten, the platform ensures that calls to view functions are authenticated, which means that behind the scenes, there is a "Viewing Key" signature of the `tx.origin` address.

## Step 4: Emitting Events - Default visibility

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

On Ethereum, events are visible to anyone. For example, you can subscribe to the `DataChanged` event and receive notifications in real time about the data of everyone else. 

The programmable encryption of Ten allows you full control over visibility but also has sensible defaults. 
Event logs can be queried using `eth_getLogs` or subscribed to using the `logs` endpoint. Both these calls are authenticated, and the platform makes sure to return only visible logs.

In our case, the requirements are very simple and common sense:

- The `DataChanged` event is specific to an account, so it should only be received by that user.
- `MilestoneReached`, on the other hand, is intended for everyone, as we want to show how popular our contract is.

The behaviour you desire is to restrict the visibility of `DataChanged`, but not that of `MilestoneReached`. **Which is exactly how it works by default!**

Default behaviour:

- `DataChanged` - has an address as a topic (an indexed field), which instructs the platform that the event log is only visible to that address.
- `MilestoneReached` - has no address topic which by default means it is visible to everyone.

All you have to do is emit events as usual, and the platform applies common-sense visibility rules.


## Step 5: Emitting Events - Configuring visibility

Once you prepare your application for production, you will want explicit control over the event visibility.

### Code:

```solidity
interface ContractTransparencyConfig {
    enum Field {
        TOPIC1, TOPIC2, TOPIC3,
        SENDER,  // tx.origin - msg.sender
        EVERYONE // the event is public - visible to everyone
    }

    enum ContractCfg {
        TRANSPARENT, // internal state via getStorageAt is accessible to everyone, all events are public
        PRIVATE      // internal state is hidden, and events can be configured individually
    }

    struct EventLogConfig {
        bytes32 eventSignature; // the event signature hash
        Field[] visibleTo;      // list of fields denoting who can see the event when private
    }

    struct VisibilityConfig {
        ContractCfg contractCfg;
        EventLogConfig[] eventLogConfigs;
    }

    function visibilityRules() external pure returns (VisibilityConfig memory);
}

contract StorageExample is ContractTransparencyConfig{
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

        // the signagure of "event DataChanged(address indexed account, uint256 newValue);"
        bytes32 dataChangedEventSig = hex"0xec851d5c322f7f1dd5581f7432e9f6683a8709a4b1ca754ccb164742b82a7d2f";
        Field[]  memory relevantTo = new Field[](2);
        relevantTo[0] = Field.TOPIC1;
        relevantTo[1] = Field.SENDER;
        eventLogConfigs[0] = EventLogConfig(dataChangedEventSig, relevantTo);

        // the signagure of "event MilestoneReached(uint256 noStoredValues);"
        bytes32 milestoneReachedEventSig = hex"0xd41033274424d56dd572e7196fb4230cf4141d546b91fc00555cab8403965924";
        Field[]  memory relevantTo = new Field[](1);
        relevantTo[0] = Field.EVERYONE;
        eventLogConfigs[1] = EventLogConfig(milestoneReachedEventSig, relevantTo);

        return VisibilityConfig(ContractCfg.PRIVATE, eventLogConfigs);
    }
}
```

### Explanation:

By implementing the `ContractTransparencyConfig.visibilityRules` method you can configure the visibility concerns of the current contract.

A `ContractCfg.PUBLIC` contract behaves exactly like a contract deployed on Ethereum. The storage slots are exposed, and all contracts are public.

For private contracts, you can configure the visibility of each individual event type you're emitting by specifying the "fields" that can receive it. 
`Field.EVERYONE` means that this is a public event.
