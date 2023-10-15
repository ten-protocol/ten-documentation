---
sidebar_position: 1
---
# Explore Contracts in Obscuro

Obscuro offers a distinct environment for smart contract development, differing slightly from traditional Solidity. This guide explains these differences:

## 1. Accessing Storage Values

While both Ethereum and Obscuro allow easy access to public variables, their handling of private variables differs significantly, highlighting Ethereum's transparency challenges and Obscuro's privacy solutions.

### Ethereum's Transparency Challenge

In Ethereum, private variables are intended to be accessed solely through functions. However, due to Ethereum's transparent nature, a workaround exists using the `getStorageAt` function. This method can bypass the designated functions, making true private data storage unattainable.

**Example**:
Accessing a private variable in Ethereum:
```solidity
uint256 value = eth.getStorageAt(contractAddress, position);
```

### Obscuro's Privacy Solution

To provide privacy on Ethereum, Obscuro has disabled the `getStorageAt` function. This ensures that private variables can only be accessed via their associated functions, providing genuine programmable privacy.

**Example**:
Accessing a private variable in Obscuro:
```solidity
private uint256 privateVariable;

function getPrivateVariable() public view returns (uint256) {
    return privateVariable;
}
```

In summary, while Ethereum's transparency poses challenges for true data privacy, Obscuro offers a robust solution by ensuring that private data remains genuinely private.

## 2. Access Control for Functions

In smart contract development, it's essential to ensure that only authorized entities can access certain functions. This is achieved using access control mechanisms.

### Access Control Using `require`

The `require` statement in Solidity is a straightforward way to enforce access control. It checks a condition, and if the condition is not met, the function execution stops, and an optional error message is thrown.

**Example**:
```solidity
address owner = msg.sender;

function restrictedFunction() public {
    require(msg.sender == owner, "Only the owner can call this function.");
    // Rest of the function logic
}
```

This example ensures that only the contract's owner can call the `restrictedFunction`.

## 3. Event Visibility

Obscuro has specific event visibility rules:

- Lifecycle events without an address parameter are public.
- Events with an address parameter related to an account are private.

**Example**:
```solidity
// Public event on Obscuro
event LifecycleEvent(uint256 indexed value);

// Private event on Obscuro
event AccountEvent(address indexed account, uint256 value);
```

## 4. Secure Random Number Generation in Obscuro

Random number generation on blockchains is challenging due to timing, delay, complexity, and fees. Obscuro offers a unique, immediate, and secure solution.

### Challenges with On-Chain Randomness

1. **Timing**: If block producers predict randomness, they can manipulate results.
2. **Delay**: Many solutions introduce a delay, affecting user experience.
3. **Complexity & Fees**: Solutions like oracles add overhead and costs.

### Obscuro's Solution  

Obscuro nodes run on secure enclave's, ensuring:

- **Immediate Randomness**: No delays.
- **Unpredictability**: Random numbers are based on an inaccessible private seed.
- **Simplicity & No Extra Fees**: Every transaction gets its random seed.

**Example**:
```solidity
function getRandomNumber() public view returns (uint256) {
    return uint256(blockhash(block.number - 1));
}
```

Obscuro's approach ensures secure and straightforward random number generation.

## 5. Gas Consumption

Gas consumption is a vital consideration in smart contract development. On Obscuro, it's essential to optimize your contract functions to ensure efficient gas usage. Always test your contracts in a simulated environment before deploying to gauge gas consumption.
