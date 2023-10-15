---
sidebar_position: 4
---

# Developer Quickstart

Obscuro is 100% EVM and uses Solidity, no different than Ethereum or any other L2 on Ethereum. What makes developers achieve this encryption is simple tweaks in the code that we'll show you using a simple data storage example. In Obscuro, the internal node database is encrypted, and the contract execution is also encrypted inside the TEE. Nobody (which includes node operators and the sequencer) can access the internal state of a contract.

:::info
Public state variables in Solidity automatically get a getter function, making them easily accessible.
:::

## Step 1: Declaring a Public Variable

### Code:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StorageExample {
    uint256 public dataPublic;
}
```

### Explanation:

In this step, we've declared a public state variable `dataPublic`. Being public, Ethereum automatically generates a getter function for it. On both Ethereum and Obscuro, you can directly access this variable without any restrictions.

## Step 2: Transitioning to a Private Variable with a Getter Function

### Code:

```solidity
uint256 private dataPrivate;

function getData() public view returns (uint256) {
    return dataPrivate;
}
```

### Explanation:

We've now made our data variable private, meaning it can't be accessed directly from outside the contract. To fetch its value, we've provided a public function `getData`.

On Ethereum and Obscuro, you'd call this function to retrieve the value of `dataPrivate`.

:::caution
Private variables in Ethereum can still be accessed directly using the `getStorageAt` method, potentially compromising privacy.
:::

### Obscuro's Privacy:

In Obscuro, the `getStorageAt` method is blocked. This means that there's no way to directly access the values of a private variable outside of its contract. The only way to access such a variable in Obscuro is through a function designed for that purpose.

:::tip
Obscuro ensures true privacy by blocking direct access methods like `getStorageAt`.
:::

## Step 4: Implementing Access Control for Enhanced Privacy

### Code:

```solidity
address private authorizedAddress = <Whitelisted_Address>;

function getData() public view returns (uint256) {
    require(msg.sender == authorizedAddress, "Not authorized!");
    return dataPrivate;
}
```

Replace `<Whitelisted_Address>` with the desired access address.

### Explanation:

To add a layer of privacy, we've restricted the `getData` function to an authorized address. Now, only the specified address can call this function and retrieve the value of `dataPrivate`.

:::caution
On Ethereum, while this does gate the function, remember that the `getStorageAt` method can still be used to bypass this check. On Obscuro, however, this function is the only way to access the private data, making the access control truly effective.
:::

### Encrypting ERC20 Tokens:

This same technique can be used to encrypt ERC20 tokens. By adding a check in your view functions, you can compare `tx.origin` and `msg.sender` against the accounts allowed to access that data. This ensures that only the token owner can view their balance, adding an extra layer of privacy to your tokens.

:::info
Encrypt your ERC20 tokens by adding checks in your view functions, ensuring only the token owner can view their balance.
:::

## Step 5: Emitting Events on Data Setting

### Code:

```solidity
event DataChanged(uint256 newValue);

function setData(uint256 _data) public {
    dataPrivate = _data;
    emit DataChanged(_data);
}
```

### Explanation:

Events in Ethereum are crucial for dApps to react to smart contract state changes. Here, we've added an event `DataChanged` that gets emitted every time the `setData` function is called.

:::caution
On Ethereum, once an event is emitted, it's logged on the blockchain. Anyone can access these logs and filter out events based on their signatures. This means that if someone knows about the `DataChanged` event, they can easily track when and what data was set, leading to potential privacy concerns.
:::

:::tip
Obscuro provides enhanced event privacy, ensuring that only the interacting party can see the relevant events.
:::

**Note:** In Obscuro, there are two ways an event can be relevant for an account:

  * **Lifecycle events**: These are relevant to everyone. A lifecycle event is any event which has no user addresses in its topics.
  * **Account events**: An event will be relevant for any account in its topics.

:::note
This distinction ensures that while some events are broadcasted for all to see (like contract deployments or major state changes), others are kept private, visible only to the parties directly involved.
:::

---

Migrate your dApp to Obscuro today and experience enhanced encryption and privacy without compromising on the Ethereum experience.
