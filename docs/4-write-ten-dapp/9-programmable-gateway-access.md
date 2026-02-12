---
sidebar_position: 9
---

# Programmable Access to Gateway

## TEN Network Gateway API (testnet)

**Base URL (testnet gateway):** `https://testnet-rpc.ten.xyz`

**Testnet frontend (UI):** [`https://testnet.ten.xyz`](https://testnet.ten.xyz) – hosted gateway UI that talks to the same testnet gateway.

All HTTP endpoints below are served under the gateway base URL and versioned under `/v1`.

### High‑level flow

- **1. Create a user & encryption token** via `/v1/join/`.
- **2. Get a message to sign** via `/v1/getmessage/` using that token.
- **3. Authenticate** by sending the signed message to `/v1/authenticate/`.
- **4. (Optional) Query registration state** for specific addresses via `/v1/query/`.
- **5. (Optional) Revoke** the token via `/v1/revoke/`.
- **6. Call JSON‑RPC** using the token as a query parameter.

---

## 1. Get Encryption Token

**Endpoint:** `POST /v1/join/`

Creates a new gateway user, generates a fresh viewing key pair, and returns the corresponding **encryption token** (also called “gateway token”) as a hex string. This token is used with both HTTP endpoints and JSON‑RPC.

```bash
curl -X POST https://testnet-rpc.ten.xyz/v1/join/
```

```javascript
const response = await fetch("https://testnet-rpc.ten.xyz/v1/join/", {
  method: "POST",
});
const encryptionToken = await response.text(); // hex string
```

---

## 2. Get Message to Sign

**Endpoint:** `POST /v1/getmessage/`

Generates and returns an authentication message for the user to sign based on the provided encryption token. The gateway can return either an EIP‑712 typed message or a `personal_sign` message.

**Request body:**

```json
{
  "encryptionToken": "<hex user token>",
  "formats": ["EIP712", "personal_sign"] // optional; order is preference
}
```

**Example (cURL):**

```bash
curl -X POST "https://testnet-rpc.ten.xyz/v1/getmessage/" \
  -H "Content-Type: application/json" \
  -d '{
    "encryptionToken": "<EncryptionToken>",
    "formats": ["EIP712"]
  }'
```

**Example (JavaScript):**

```javascript
const msgRes = await fetch("https://testnet-rpc.ten.xyz/v1/getmessage/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    encryptionToken,
    formats: ["EIP712"],
  }),
});

const { message, type } = await msgRes.json(); // type: "EIP712" | "personal_sign"
```

You then pass `message` to the user’s wallet to be signed.

---

## 3. Authenticate User

**Endpoint:** `POST /v1/authenticate/?token=<EncryptionToken>`

Submits the signed message and proves wallet ownership. The gateway verifies the signature and binds the wallet address to the user identified by `token`.

**Request body:**

```json
{
  "address": "0x...",
  "signature": "0x...",
  "type": "EIP712" // optional, defaults to EIP712
}
```

**Example (cURL):**

```bash
curl -X POST "https://testnet-rpc.ten.xyz/v1/authenticate/?token=<EncryptionToken>" \
  -H "Content-Type: application/json" \
  -d '{
    "address": "0xYourAddress",
    "signature": "0xYourSignature",
    "type": "EIP712"
  }'
```

**Example (JavaScript):**

```javascript
await fetch(
  `https://testnet-rpc.ten.xyz/v1/authenticate/?token=${encryptionToken}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      address,
      signature: sig,
      type: "EIP712",
    }),
  },
);
```

Multiple addresses can be associated with a single encryption token.

---

## 4. Query Address Registration

**Endpoint:** `GET /v1/query/?token=<EncryptionToken>&a=<Address>`

Returns whether a given address is already registered (bound) for the user.

**Example (cURL):**

```bash
curl "https://testnet-rpc.ten.xyz/v1/query/?token=<EncryptionToken>&a=0xYourAddress"
```

**Response:**

```json
{
  "status": true
}
```

**Example (JavaScript):**

```javascript
const res = await fetch(
  `https://testnet-rpc.ten.xyz/v1/query/?token=${encryptionToken}&a=${address}`,
);
const data = await res.json(); // { status: boolean }
```

---

## 5. Revoke Access

**Endpoint:** `POST /v1/revoke/?token=<EncryptionToken>`

Deletes the user identified by `token` along with associated viewing keys and session keys in the gateway.

```bash
curl -X POST "https://testnet-rpc.ten.xyz/v1/revoke/?token=<EncryptionToken>"
```

```javascript
await fetch(`https://testnet-rpc.ten.xyz/v1/revoke/?token=${encryptionToken}`, {
  method: "POST",
});
```

---

## 6. JSON‑RPC Usage

After authenticating at least one address for a user, you can send Ethereum‑style JSON‑RPC requests through the gateway by including the encryption token as a query parameter.

**RPC endpoint (HTTP):**

```text
https://testnet-rpc.ten.xyz/v1/?token=<EncryptionToken>
```

Example payload:

```bash
curl -X POST "https://testnet-rpc.ten.xyz/v1/?token=<EncryptionToken>" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "eth_getBalance",
    "params": ["0xYourAddress", "latest"]
  }'
```

The gateway enforces that reads and writes are scoped to accounts that are bound to the encryption token and forwards calls to the TEN node over an encrypted channel.

---

## 7. Health & Network Endpoints

These endpoints are useful for monitoring and discovering network configuration:

- **`GET /v1/ready/`** – lightweight readiness probe indicating the gateway process is up.
- **`GET /v1/health/`** – basic health check of the gateway itself (cached briefly).
- **`GET /v1/network-health/`** – TEN node health wrapped in a JSON‑RPC‑like response.
- **`GET /v1/network-config/`** – static network configuration (contract addresses, registries, etc.).
- **`GET /v1/version/`** – current gateway version as a plain string.

All are exposed under `https://testnet-rpc.ten.xyz/v1/...`.

---

## 8. Token Cookie Helper Endpoints (Browser flows)

When integrating with a browser frontend, the gateway can store the encryption token in a secure cookie (domain‑wide on `.ten.xyz`):

- **`GET /v1/get-token/`**
  - Reads the gateway token cookie, validates it, ensures the user exists, and returns the token as a hex string.

- **`POST /v1/set-token/`**
  - Request body:
    ```json
    {
      "token": "<hex user token>"
    }
    ```
  - Validates the token, checks that the user exists, and sets a long‑lived `HttpOnly`, `Secure` cookie for use by browser dApps.

Both endpoints are also served under `https://testnet-rpc.ten.xyz/v1/...` and are guarded by CORS based on the configured frontend URL.

---

## 9. Using the TEN Hardhat plugin

For Hardhat‑based development, you can also integrate with the TEN testnet gateway using the **TEN Hardhat plugin**:

- **Package:** `@tenprotocol/ten-hardhat-plugin`
- **Docs & usage:** see the plugin README on npm:  
  [`https://www.npmjs.com/package/@tenprotocol/ten-hardhat-plugin`](https://www.npmjs.com/package/@tenprotocol/ten-hardhat-plugin)

The plugin configures a Hardhat network to talk to the same JSON‑RPC gateway at `https://testnet-rpc.ten.xyz` and is the recommended way to interact with TEN from Hardhat projects.
