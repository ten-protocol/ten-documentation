---
sidebar_position: 4
---

# Writing smart contracts for TEN

TEN executes smart contracts within the EVM similarly to Ethereum, so you can reuse your existing code. 
However, the execution and the internal state are hidden from everyone, including node operators and the sequencer.

:::info
TEN encrypts both the execution and its internal database using Trusted Execution Environments (TEEs).
:::

The [getStorageAt](https://docs.alchemy.com/reference/eth-getstorageat) method is disabled by default on TEN, so data access relies on view functions that you define. 
Public variables remain accessible as Solidity automatically creates getters for them.

Let's illustrate with a basic storage dApp example where users can store and retrieve a number.

At every step, we'll add a new feature and explain the difference between `TEN` and `Ethereum`.

### Step 1: Basic contract with a Public Variable

#### Code

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

#### Explanation

In this step, we created a public variable `storedValues` that maps the provided value to the address of the user who called the `storeValue` function. 

Because the variable is public, Solidity will provide a default public getter for it. 

Since there are no data access restrictions, on both Ethereum and TEN, everyone will be able to read the values of all users.

### Step 2: Converting to a Private Variable with an explicit Getter Function

#### Code

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

#### Explanation

The `storedValues` variable is now private, and we added a basic `getValue` function for users to retrieve their value. 

On both Ethereum and TEN, anyone can call `getValue` to retrieve any value.   
On Ethereum, `_storedValues` can also be accessed directly with `getStorageAt`

### Step 3:  Data Access Control

In this step, we'll add restrictions so users can only access their own data. 

#### Code

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

#### Explanation

The key line is: ``require(tx.origin == account, "Not authorized!");``, which ensures that the caller of the view function is the owner of the data.

:::info
TEN uses  "Viewing Keys" to authenticate view function calls.
:::

**When deployed on TEN, this code guarantees that all users can only access their own values, and nobody can read the `_storedValues`.**
