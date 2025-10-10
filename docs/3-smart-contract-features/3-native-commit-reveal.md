---
sidebar_position: 3
---

# Native commit-reveal

Every on-chain game developer knows that moves that rely on entropy must be executed in two steps.

Imagine you implement an on-chain coin flip game. The player pays 0.1ETH to choose `Heads` or `Tails`.
If they win, they receive 0.2ETH, otherwise they lose the 0.1ETH.
Even if randomness is unpredictable, this simple game can be exploited in several ways:

- The attacker can create a “proxy” smart contract to play on their behalf. Using a similar mechanism to flash loans in DeFi: the proxy is programmed to make multiple actions and only “commit” if it can obtain a profit. In our case, if the coin flip is losing, the proxy can just revert. The only cost will be the gas burned.
- Transactions consume gas, and the gas cost can inadvertently reveal information. For instance, if a winning move is more computationally intensive than a losing one, players could deduce optimal moves by estimating gas costs for various actions.

The typical solution is to use an ad-hoc commit-reveal scheme. The smart contract ensures that the player commits to a move, and only afterwards reveals it to the chain. 
This way, the player can't change their mind after seeing the result.

This ad-hoc solution introduces extra complexity, latency and cost.

## The on-block-end callback

The best solution is to decouple the move from the execution without increasing the latency or the cost.
This way, the side-channel attacks are no longer possible because the move is not executed immediately.
To avoid increasing the latency, the move must be executed in the same block as the "commit" transaction.

**The TEN platform provides a way to register a callback to be executed at the end of the current block.**

### How it works

TEN provides a "System Contract" (a contract deployed and known by the platform.) 
You can get the address of the system contract for our testnet [here](https://sepolia.tenscan.io/resources/verified-data) - "Ten System Contract".

The interface for registering the callback is: [IPublicCallbacks](https://github.com/ten-protocol/go-ten/blob/main/contracts/src/system/interfaces/IPublicCallbacks.sol).

### Example

See below a secure implementation of the coin flip game using the callback:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// this interface is known by the TEN system contract
interface IPublicCallbacks {
    function register(bytes calldata callback) external payable returns (uint256);
}

contract CoinFlip {
    // Event to emit the result of the coin flip
    event CoinFlipResult(address indexed player, bool didWin, uint256 randomNumber);

    private IPublicCallbacks tenCallbacks;
    mapping(uint256 callbackId => address player) public callbackToPlayer;
    mapping(address player => uint256 refundAmount) public playerToRefundAmount;

    modifier onlyTenSystemCall() { 
        require(msg.sender == address(tenCallbacks));
        _;
    }

    // you have to pass in the address of the system contract
    constructor(address _tenCallbacksAddress) {
        tenCallbacks = TenCallbacks(_tenCallbacksAddress);
    }

    // Function to initiate a coin flip. 
    // Notice how it doesn't execute the coin flip directly, but instead registers a callback.
    function flipCoin(bool isHeads) external payable {
        // Assume doFlipCoin costs 50_000 gas;
        // We deduct a predetermined amount from the bet to pay for delayed execution.
        uint256 etherGasForCoinFlip = 50_000*block.basefee;
        require(msg.value > etherGasForCoinFlip, "Insufficent gas");

        // Encode the function we want to be called by the TEN system contract.
        bytes memory callbackTargetInfo = abi.encodeWithSelector(this.doFlipCoin.selector, msg.sender, msg.value - etherGasForCoinFlip, isHeads);

        // Commit the move
        tenCallbacks.register{value: etherGasForCoinFlip}(callbackTargetInfo);
    }

    // Function to simulate a coin flip - notice that this must only be callable by the ten system contract.
    // This function is called by the TEN platform as a synthetic transaction in the same block as the user transaction.
    function doFlipCoin(address bettor, uint256 stake, bool wantsHeads) external onlyTenSystemCall {
        // Assume getRandomNumber() is a function that returns a random number
        uint256 randomNumber = getRandomNumber();

        // Simulate a coin flip: 0 for tails, 1 for heads
        bool isHeads = (randomNumber % 2) == 1;

        if (wantsHeads == isHeads) {
            //pay out to winner
            (bool success, ) = payable(bettor).call{value: stake*2}("");
            require(success, "Payment failed.");
        }
        // Emit the result of the coin flip
        emit CoinFlipResult(msg.sender, isHeads, randomNumber);
    }

    function getRandomNumber() internal view returns (uint256) {
        // see native entropy
    }

}
```

Notice how we split the logic in two. The first part is the "commit" part, which is executed by the user.
The second part is the "reveal" part, which is executed only by the TEN platform.

*Note that you have to enforce the second function to be called only by the TEN system contract.*