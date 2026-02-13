# Account Abstraction & Session Keys in TEN

In the classic Account Abstraction model (EIP‑4337) described on [ethereum.org](https://ethereum.org/roadmap/account-abstraction/), “session keys” (SKs) are typically implemented using proxy smart contracts and a bundler.<br /><!-- -->TEN’s Account Abstraction design, outlined in [this post](https://medium.com/p/2e85bde4c54d), instead provides **native session keys managed by the gateway and TEEs**, eliminating the need for proxy contracts or a bundler.

Session keys in TEN are:

* **Ephemeral Ethereum accounts** managed by the gateway on behalf of a user.
* **Linked to the user’s viewing key / encryption token** ([details](https://docs.ten.xyz/docs/write-ten-dapp/programmable-gateway-access)).
* **Used to sign and submit transactions** via the gateway, enabling “no‑click” UX for dApps.

Each user can have **multiple session keys** (up to 100), and the gateway can automatically expire idle keys and recover funds back to the user’s primary account.

***

## High‑level flow for dApps[​](#highlevel-flow-for-dapps "Direct link to High‑level flow for dApps")

Imagine an on‑chain game that wants a smooth UX without prompting the user to sign every move:

1. **User authenticates to the gateway** and gets an `encryptionToken`.
2. **Gateway creates a session key** for this user and exposes its address.
3. **User funds the session key** with a normal, user‑signed transfer.
4. **Game sends transactions using the session key** (no additional wallet popups).
5. **Gateway tracks activity and can expire/clean up idle session keys**, sweeping funds back to the account which was first authenticated with the gateway.

From the dApp’s point of view, a session key behaves like a normal Ethereum account whose private key is held inside the TEE‑backed gateway.

***

## Using session keys via custom queries[​](#using-session-keys-via-custom-queries "Direct link to Using session keys via custom queries")

On TEN, session key management is exposed as **custom queries** behind standard JSON‑RPC, primarily via `eth_getStorageAt` with special “method addresses”.

All examples below assume you are calling through the gateway:

```
https://testnet-rpc.ten.xyz/v1/?token=<EncryptionToken>
```

### 1. Create a session key[​](#1-create-a-session-key "Direct link to 1. Create a session key")

To create a new session key for the authenticated user:

* Call `eth_getStorageAt` with:

  <!-- -->

  * **address**: `0x0000000000000000000000000000000000000003`
  * other parameters can be left as in the example below.

The response returns the **hex‑encoded address** of the new session key.

```
async function createSessionKey(encryptionToken) {
  const response = await fetch(
    `https://testnet-rpc.ten.xyz/v1/?token=${encryptionToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getStorageAt",
        params: [
          "0x0000000000000000000000000000000000000003", // create SK
          "0x0",
          "latest",
        ],
        id: 1,
      }),
    },
  );

  const data = await response.json();
  return data.result; // Session key address (0x...)
}
```

### 2. Fund the session key[​](#2-fund-the-session-key "Direct link to 2. Fund the session key")

Once you have the session key address, fund it with a **normal user‑signed transaction** from the user’s main wallet:

* Build a standard `eth_sendTransaction` / wallet transaction from the user’s account to the session key address.
* Let the wallet sign and submit it.

The gateway observes this and considers the session key funded and ready to use.

***

## Sending transactions with a session key[​](#sending-transactions-with-a-session-key "Direct link to Sending transactions with a session key")

There are two main integration patterns:

1. **Custom‑query based signing** (low‑level; uses `eth_getStorageAt`).
2. **Direct `eth_sendTransaction` from the session key** (simpler, when your client library supports it).

### 1) Custom‑query signing (low‑level)[​](#1-customquery-signing-lowlevel "Direct link to 1) Custom‑query signing (low‑level)")

You can ask the gateway to sign and submit an unsigned transaction using the session key by calling:

* `eth_getStorageAt` with **address** `0x0000000000000000000000000000000000000005`
* The second parameter encodes:

```
{
  "sessionKeyAddress": "0x...", // Session key address
  "tx": "base64_encoded_transaction" // Unsigned transaction, base64‑encoded
}
```

Example:

```
async function sendWithSessionKey(
  encryptionToken,
  sessionKeyAddress,
  unsignedTx,
) {
  const txBase64 = btoa(JSON.stringify(unsignedTx)); // client‑side encoding

  const response = await fetch(
    `https://testnet-rpc.ten.xyz/v1/?token=${encryptionToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getStorageAt",
        params: [
          "0x0000000000000000000000000000000000000005", // sign+send with SK
          JSON.stringify({
            sessionKeyAddress,
            tx: txBase64,
          }),
          "latest",
        ],
        id: 1,
      }),
    },
  );

  const data = await response.json();
  return data.result; // tx hash
}
```

The gateway first confirms that the session key belongs to the user identified by `encryptionToken`. It then signs the transaction with the session key’s private key and sends it to the TEN node.

### 2) Direct `eth_sendTransaction` with a session key[​](#2-direct-eth_sendtransaction-with-a-session-key "Direct link to 2-direct-eth_sendtransaction-with-a-session-key")

You can send transactions directly using `eth_sendTransaction` by setting the `from` field to a session key address that belongs to the authenticated user. The gateway signs the transaction with the session key's private key and broadcasts it.

**Requirements:**

* The request must include the user's `encryptionToken` (same authentication as other gateway calls).
* The `from` address must be a session key owned by that user.
* The transaction must include all required fields (`gas`, `gasPrice` or `maxFeePerGas`/`maxPriorityFeePerGas`, `nonce`, etc.). The gateway does not auto-fill missing fields.

The gateway verifies that the session key belongs to the user identified by `encryptionToken`, signs the transaction with the session key's private key, and sends it to the TEN node.

**Error handling:**

* If `from` is not a session key for the authenticated user, the call fails with an error indicating the session key address was not found.
* If the session key lacks sufficient balance, the transaction is rejected by the network (not by the gateway).
* Standard authentication errors apply if the `encryptionToken` is missing or invalid.

***

## Deleting and expiring session keys[​](#deleting-and-expiring-session-keys "Direct link to Deleting and expiring session keys")

### Manual deletion via custom query[​](#manual-deletion-via-custom-query "Direct link to Manual deletion via custom query")

To explicitly delete a session key:

* Call `eth_getStorageAt` with **address** `0x0000000000000000000000000000000000000004` and a JSON payload:

```
{
  "sessionKeyAddress": "0x..." // Session key address to delete
}
```

The gateway:

* Removes the session key from storage (access to the private key is lost forever).
* **Sweeps remaining funds** back to the user’s primary account, using its internal `TxSender`.

### Automatic expiration & fund recovery[​](#automatic-expiration--fund-recovery "Direct link to Automatic expiration & fund recovery")

In addition, the gateway runs a background **SessionKeyExpirationService**:

* Tracks last activity for each session key.

* Periodically scans for keys older than `--sessionKeyExpirationThreshold`.

* For each candidate, it:

  <!-- -->

  * Reloads the owning user.
  * Attempts to move remaining funds back to the user’s primary account.
  * Removes the key from the activity tracker and persists updated state.

***

## UX & safety considerations for dApp developers[​](#ux--safety-considerations-for-dapp-developers "Direct link to UX & safety considerations for dApp developers")

* **Balance management**: Track the session key’s balance (e.g. via `eth_getBalance`) and top it up when needed.
* **Per‑dApp keys**: Use separate session keys per dApp / game instance if you want stronger isolation.
* **Lifecycle**: Delete or let the gateway expire session keys when they are no longer needed to keep the system tidy.
* **Security**: The session key’s private key never leaves the TEE‑backed gateway, but users should still treat them as scoped spending keys and only fund them with limited amounts.

Combined with **programmable access tokens** (`encryptionToken`) and the TEN gateway, session keys give you EIP‑4337‑style UX without additional contracts or bundler infrastructure.
