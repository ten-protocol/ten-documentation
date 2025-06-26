# Guessing Game

![Guessing Game](/assets/images/guessing-game-2b17294db01b3d25cf8ef18b6e775b8e.png)

The TEN Guessing Game is a simple yet powerful demonstration of TEN's unique encryption capabilities. Players attempt to guess a secret number, with each guess requiring a token fee. The game showcases the challenges of maintaining secrecy in transparent ecosystems like Ethereum and how TEN addresses these challenges.

## **Game Mechanics**[​](#game-mechanics "Direct link to game-mechanics")

* The game's objective is to guess a secret number.
* Each guess requires an entrance fee of 1 unit of the token (1x10^18 units make a single token).
* Correct guesses result in the player receiving all accumulated entrance fees.
* The game then resets with a new random secret number.

## **Playing the Game**[​](#playing-the-game "Direct link to playing-the-game")

How to Play the Guessing Game: A Step-by-Step Guide This guide assumes you have a Metamask wallet installed and configured with the TEN testnet.

1. **Verify Gateway Authentication:** Ensure your connected account is properly authenticated through the [TEN Gateway](https://gateway.ten.xyz/).

2. **Visit the Game Website:** Navigate to the official [website](https://TEN-protocol.github.io/sample-applications/guessing-game-v2/) of the guessing game.

tip

You can get free testnet tokens from the [TEN Faucet](/docs/getting-started/for-users/get-tokens.md).

3. **Make Your Guess:** Enter your guess for the secret number within the designated field. This number should be within the specified range (e.g., 1-1000).

4. **Sign the Transaction:** Click on the "Submit" or similar button. A Metamask window will pop up asking you to sign a transaction authorizing your guess on the blockchain. Carefully review the transaction details and gas fees before confirming.

5. **Wait for the Result:** The transaction will be processed on the blockchain, and it may take a few seconds to minutes for the result to be confirmed. You can see the status/result of your guess on the message log below the guessing field.

6. **Inspect the Transaction (Optional):** You can explore the details of your guess transaction on the block explorer - [Tenscan](https://tenscan.io/).This will allow you to see the status, gas usage, and other details associated with your guess.

## **Building the Guessing Game**[​](#building-the-guessing-game "Direct link to building-the-guessing-game")

This tutorial will guide you through building the Guessing Game on TEN with secure RNG to generate truly random & secure numbers as well as hidden states to make sure the random number to be guessed is secret.

1. **Pre-requisites:**

2. **Generate Secure Random Number:** We'll use `block.difficulty` to generate a random number. On TEN, `block.difficulty` is private and secure, unlike on Ethereum, where it can be manipulated or predicted.

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract GuessingGame {

    uint256 private secretNumber;

    constructor() {
        _generateSecretNumber();
    }

    function _generateSecretNumber() private {
        uint256 randomNumber = block.difficulty;
        secretNumber = (randomNumber % 100000) + 1;
    }
}
```

3. **Store the Random Number Privately:** TEN offers true on-chain encryption for state variables marked with the private modifier. Even using `getStorageAt`, these variables cannot be accessed.

```
uint256 private secretNumber;
```

This ensures that secretNumber is stored securely and is inaccessible to anyone outside the contract.

4. **Function to Guess the Number:** The guessing function allows users to submit their guess for the secret number. If correct, they win the prize pool. If incorrect, they are encouraged to try again.

```
function guess(uint256 _number) external payable {
    require(_number > 0 && _number <= 100000, "The guess should be between 1 & 100000");
    require(msg.value == 443e14, "Incorrect Fee");

    if(_number == secretNumber) {
        payable(msg.sender).transfer(address(this).balance);
        _generateSecretNumber(); // Reset the secret number after a successful guess
    } else {
    }
}
```

5. **Function to See the Prize Pool:** This function allows users to view the current prize pool, which is simply the contract's balance.

```
function getContractBalance() external view returns (uint256) {
    return address(this).balance;
}
```

6. **Feature to Reset the Secret Number After It Has Been Guessed:** After a successful guess, the secret number should be reset to keep the game going. This is handled within the guessing function:

```
function _generateSecretNumber() private {
    uint256 randomNumber = block.difficulty;
    secretNumber = (randomNumber % 100000) + 1;
}
```

By calling `_generateSecretNumber()` again, the contract resets the secret number, allowing the game to continue with a new random number.

Find the complete contract & fronTENd here: [this GitHub repository](https://github.com/TEN-protocol/sample-applications/tree/main/guessing-game-v2).
