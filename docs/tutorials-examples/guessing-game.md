---
sidebar_position: 1
---
# Guessing Game

![Guessing Game](../assets/guessing-game.png)

The Ten Guessing Game is a simple yet powerful demonstration of Ten's unique encryption capabilities. Players attempt to guess a secret number, with each guess requiring a token fee. The game showcases the challenges of maintaining secrecy in transparent ecosystems like Ethereum and how Ten addresses these challenges.

## **Game Mechanics**

- The game's objective is to guess a secret number.
- Each guess requires an entrance fee of 1 unit of the token (1x10^18 units make a single token).
- Correct guesses result in the player receiving all accumulated entrance fees.
- The game then resets with a new random secret number.

## **Playing the Game**

How to Play the Guessing Game: A Step-by-Step Guide
This guide assumes you have a Metamask wallet installed and configured with the Obscuro testnet.

1. **Visit the Game Website:** Navigate to the official [website](http://guessing.fun) of the guessing game.

2. **Verify Gateway Authentication:** Ensure your connected account is properly authenticated through the [Ten Gateway](https://testnet.obscu.ro/).

:::tip
You can get free testnet tokens from the [Ten Faucet](/docs/getting-started/for-users/get-tokens).
:::

3. **Make Your Guess:** Enter your guess for the secret number within the designated field. This number should be within the specified range (e.g., 1-1000).

4. **Sign the Transaction:** Click on the "Submit" or similar button. A Metamask window will pop up asking you to sign a transaction authorizing your guess on the blockchain. Carefully review the transaction details and gas fees before confirming.

5. **Wait for the Result:** The transaction will be processed on the blockchain, and it may take a few seconds to minutes for the result to be confirmed. You can see the status/result of your guess on the message log below the guessing field.

6. **Inspect the Transaction (Optional):** You can explore the details of your guess transaction on the block explorer - [Tenscan](https://tenscan.io/).This will allow you to see the status, gas usage, and other details associated with your guess.

## **Contribute**

Enhance the guessing game! Fork the game code from [this GitHub repository](#).
