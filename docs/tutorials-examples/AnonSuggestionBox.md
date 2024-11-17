---
sidebar_position: 3
---
# Anonymous Suggestion Box

The Anon Suggestion Box demonstrates TEN's encryption capabilities in a practical scenario. Users submit encrypted suggestions, ensuring true privacy and anonymity. This showcases how TEN solves the challenge of maintaining confidentiality in transparent blockchain environments.

## **Suggestion Box Mechanics**

- Users submit encrypted suggestions at any time.
- Each suggestion is kept secret from other participants.
- Only the authorized user (here contract owner) can read the suggestions.
- The number of suggestions is public, but their content remains private.
- Suggestions can be cleared by the authorized user if needed.

:::tip
You can get free testnet tokens from the [TEN Faucet](/docs/getting-started/for-users/get-tokens).
:::

## **Building the Anon Suggestion Box**

This guide will walk you through creating an anonymous suggestion box on TEN, using private shared states.

1. **Contract Setup:**

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract AnonSuggestionBox {
    address private owner;
    bytes[] private suggestions;

    event NewSuggestion(uint256 indexed suggestionId);

    constructor() {
        owner = msg.sender;
    }
}
```

2. **Secure Suggestion Storage:** TEN provides true on-chain encryption for private state variables. Even using `getStorageAt`, these variables cannot be accessed.

```solidity
bytes[] private suggestions;
```

This ensures that suggestions are stored securely and are inaccessible to anyone outside the contract.

3. **Submitting Suggestions:** The submission function allows users to submit their suggestions securely.

```solidity
function submitSuggestion(bytes calldata encryptedSuggestion) external {
    suggestions.push(encryptedSuggestion);
    emit NewSuggestion(suggestions.length - 1);
}
```

On TEN, the `encryptedSuggestion` in transactions is encrypted, ensuring suggestion content remains private. The `suggestions` array is a private variable, keeping all submissions secret.

4. **Reading Suggestions:** Only the owner can read the suggestions.

```solidity
function readAllSuggestions() external view onlyOwner returns (bytes[] memory) {
    return suggestions;
}
```

This function allows only the authorized user to retrieve all suggestions.

5. **Clearing Suggestions:** The authorized user can clear all suggestions if needed.

```solidity
function clearSuggestions() external onlyOwner {
    delete suggestions;
}
```

6. **Access Control:**

```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Only the owner can perform this action");
    _;
}
```

By leveraging TEN's encryption features, this Anon Suggestion Box ensures true suggestion secrecy. The content of suggestions remains hidden from everyone except the authorized user, providing a secure and truly private feedback mechanism.

Find the complete contract & frontend here: [https://github.com/ten-protocol/sample-applications/tree/main/Anon%20Suggestion%20Box]
