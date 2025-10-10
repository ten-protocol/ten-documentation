---
sidebar_position: 6
---

# Account Abstraction

The key feature of ["Account Abstraction"](https://medium.com/p/2e85bde4c54d) (EIP-4337) is "Session keys"(SK) through a proxy smart contract.
SKs allow users to interact with the blockchain without having to sign every transaction, which is a major UX improvement.

TEN supports "native" SKs - these are managed by the platform and do not require a proxy contract.

In TEN, SKs are managed by dApp developers through dedicated RPC endpoints.

## Solution overview

Imagine you're developing an on-chain game, and you want a smooth UX without the distraction of signing every move.

Conceptually, the game will create a session key (SK) for the user, then ask the user to move some funds to that address, and then create "move" transactions signed with the SK.

If the game were to create the SK in the browser, there would be a risk of the user losing the SK, and the funds associated with it, in case of an accidental exit.
With TEN, the dApp developer doesn't have to worry about this, because the SKs are managed by TEEs.

## Usage

The below describe the implementation steps for the game developer - which is the main usecase for SKs.
Note that it can be used for any dApp that requires a no-click UX.

### When the game starts

Before the user can start playing, the game must create the SK and ask the user to move some funds to that address.
The funds will be used to pay for moves.

- Call the RPC `eth_getStorageAt` with address `0x0000000000000000000000000000000000000003` - this will return the hex-encoded address of the SK. The dApp needs to store this address for future use.
- Create a normal transaction that transfers some ETH to the SK. The amount depends on how many "moves" the user is prepared to prepay for.
- Ask the user to sign this transaction with their normal wallet, and submit it to the network using the library of your choice.
- The session ket is automatically activated and ready to use.

### The game

After sending funds to the SK, create a transaction for each move, but don't ask the user to sign them.
Instead, submit them to the network unsigned using the RPC `eth_getStorageAt` with address `0x0000000000000000000000000000000000000005` and the following parameters:

```json
{
  "sessionKeyAddress": "0x...", // The session key address
  "tx": "base64_encoded_transaction" // The unsigned transaction encoded as base64
}
```

The platform will sign the transactions on behalf of the user.

As a game developer, you are responsible to keep track of the balance of the SK. You can also query the network for the balance of the address.
If the SK runs out of balance, you have to ask the user to move more funds to the SK.

### Managing Session Keys

TEN provides additional RPC endpoints for managing session keys:

- `eth_getStorageAt` with address `0x0000000000000000000000000000000000000004` - Permanently removes the session key. This requires the following parameters:

```json
{
  "sessionKeyAddress": "0x..." // The session key address to delete
}
```

### Finishing the game

When a game ends, you have to move the remaining funds back to the main address.

- create a Tx that moves the funds back from the SK to the main address. Submit it unsigned, because the funds are controlled by the SK.

## Example implementation

Here's a complete example of how to implement session keys in a JavaScript dApp:

```javascript
// 1. Create a session key
async function createSessionKey() {
  const response = await fetch("https://testnet.ten.xyz/v1/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_getStorageAt",
      params: ["0x0000000000000000000000000000000000000003", "0x0", "latest"],
      id: 1,
    }),
  });

  const data = await response.json();
  return data.result; // Returns the session key address
}

// 2. Fund the session key (user signs this transaction)
async function fundSessionKey(sessionKeyAddress, amount) {
  // This would be a normal transaction signed by the user's wallet
  // transferring ETH to the session key address
}

// 3. Send unsigned transactions using the session key
async function sendUnsignedTransaction(sessionKeyAddress, unsignedTx) {
  const txBase64 = btoa(JSON.stringify(unsignedTx)); // Convert to base64

  const response = await fetch("https://testnet.ten.xyz/v1/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_getStorageAt",
      params: [
        "0x0000000000000000000000000000000000000005",
        JSON.stringify({
          sessionKeyAddress: sessionKeyAddress,
          tx: txBase64,
        }),
        "latest",
      ],
      id: 1,
    }),
  });

  const data = await response.json();
  return data.result; // Returns the transaction hash
}

// 4. Delete the session key when done
async function deleteSessionKey(sessionKeyAddress) {
  const response = await fetch("https://testnet.ten.xyz/v1/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_getStorageAt",
      params: [
        "0x0000000000000000000000000000000000000004",
        JSON.stringify({
          sessionKeyAddress: sessionKeyAddress,
        }),
        "latest",
      ],
      id: 1,
    }),
  });

  const data = await response.json();
  return data.result; // Returns 0x01 for success, 0x00 for failure
}
```
