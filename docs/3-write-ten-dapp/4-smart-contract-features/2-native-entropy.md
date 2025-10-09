---
sidebar_position: 2
---

# Native secure entropy

This excellent [blog](https://medium.com/obscuro-labs/against-all-odds-securing-randomness-on-the-blockchain-4c15587a39a8) explains the need for native entropy.

## How it works

TEN provides a "System Contract" (a contract deployed and known by the platform.)
You can get the address of the system contract for our testnet [here](https://sepolia.tenscan.io/resources/verified-data) - "??".

The interface you must implement is: 

```solidity
interface IRnd {
    function getRandomNumber() external returns (uint256);
}
```


## Example

```solidity

// TEN provides a system contract that provides a unique secure random number generator.
interface IRnd {
    function getRandomNumber() external returns (uint256);
}

contract CoinFlip {
    private IRnd rnd;

    // you have to pass in the address of the system contract
    constructor(address _rndSystemAddress) {
        rnd = IRnd(_rndSystemAddress);
    }

    function getRandomNumber() internal view returns (uint256) {
        return rnd.getRandomNumber();
    }
}
```