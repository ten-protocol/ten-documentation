---
sidebar_position: 4
---

# Developer Quickstart

Obscuro executes bytecode in the EVM no different than Ethereum (or Arbitrum), so as a developer you can use all your existing code and tooling.

The difference from Ethereum (and virtually all chains) is that private variables and the internal state of the contract while 
executing are hidden from everyone (which includes node operators and the sequencer).

:::info
In Obscuro, the internal node database is encrypted, and the execution itself is also encrypted inside the TEE.
:::

The calls to [getStorageAt](https://docs.alchemy.com/reference/eth-getstorageat) are disabled, so all data access
will be performed through view functions which are under the control of the smart contract developer.
Public variables are accessible to everyone because Solidity automatically generates a getter function for them.

We'll illustrate how it works by creating a simple data storage example.
In this dApp, users can store a number and retrieve it later.

## Pre-requisite
Please setup your wallet by following the instructions [here](/docs/getting-started/for-developers/setup-dev-env#1-wallet-setup--configuration).

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
In this step, we've declared a public variable `storedValues`. 
Solidity automatically generates a public getter view function for it, so on both Ethereum and Obscuro, you can call 
this view function without any restrictions.

We also created a function that allows users to store a value against their address.

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
We've now made our data variable private, meaning it can't be accessed directly from outside the contract. 
To fetch its value, we've provided a custom public view function `getValue` where the user provides the address.

On both Ethereum and Obscuro, if you call this function you will retrieve the number stored by that address.

:::caution
In Ethereum, the `_storedValues` variable can also be accessed directly using the `getStorageAt` method, but not in Obscuro.
:::

## Step 3: Implementing Data Access Control 

In this step, our aim is to restrict users to only access their own value. 
This feature can only be implemented in Obscuro, because as mentioned above, ``_storedValues`` is not hidden in Ethereum.

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

Since `getValue` is the only function which exposes the values, we can add a check like this: `require(tx.origin == account, "Not authorized!");` 
If anyone, other than the original account, asks for the value, they will get an error.

:::info
In Ethereum, since all data is accessible anyway, there is no need to sign calls to view functions, so `tx.origin` can be spoofed.
:::

In Obscuro, the platform ensures that calls to view functions are authenticated. Which means that behind the scenes, 
there is a signature of the ``tx.origin`` address. 


## Step 4: Emitting Events

Events in Ethereum are crucial for UIs to react to smart contract state changes.
In this step we'll emit an event when a user stores a value, and also, to show how popular our contract is,
we'll emit an event when certain milestones are reached.

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

On Ethereum, events are visible to anyone. For example, you can subscribe to the `DataChanged` event, and receive notifications
in real-time about the data of everyone else.

In Obscuro, we wanted to do better than that.

- The ``DataChanged`` event is specific to an account, so it should only be received by that user.
- ``MilestoneReached``, on the other hand, is intended for everyone, as we want to show how popular our contract is.

The behaviour you desire is to restrict the visibility of ``DataChanged``, but not that of ``MilestoneReached``. 

** This is exactly how it works by default! **

How it works:
- ``DataChanged`` - has an address as a topic (an indexed field), which makes it relevant to that address
- ``MilestoneReached`` - has no address topic, so it is visible to everyone.

All you have to do is emit events as usual, and the platform applies common sense visibility rules.

---

Migrate your dApp to Obscuro today and experience enhanced encryption and privacy without compromising on the Ethereum experience.
