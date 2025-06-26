# Programmable Access to Gateway

# TEN Network Gateway API

Base URL: `https://testnet.ten.xyz`

## 1. Get Encryption Token[​](#1-get-encryption-token "Direct link to 1. Get Encryption Token")

**Endpoint:** `GET /v1/join`

Generates and returns an EncryptionToken.

```
curl -X GET https://testnet.ten.xyz/v1/join
```

```
const response = await fetch('https://testnet.ten.xyz/v1/join');
const token = await response.text();
```

## 2. Get Message to Sign[​](#2-get-message-to-sign "Direct link to 2. Get Message to Sign")

**Endpoint:** `POST /v1/getmessage`

Generates and returns a message (if needed 712 typed message too) for the user to sign based on the provided encryption token.

```
curl -X POST "https://testnet.ten.xyz/v1/getmessage/" \
  -H "Content-Type: application/json" \
  -d '{
    "encryptionToken": "$EncryptionToken",
    "formats": ["EIP712"]
  }'
```

```
const msgRes = await fetch('https://testnet.ten.xyz/v1/getmessage/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    encryptionToken: token,
    formats: ['EIP712'],
  }),
});
const data = await msgRes.json();
```

## 3. Authenticate User[​](#3-authenticate-user "Direct link to 3. Authenticate User")

**Endpoint:** `POST /v1/authenticate?token=$EncryptionToken`

Submits a signed message in the format address & signature, proving ownership of the private keys for the account, and links that account with the encryption token.

```
curl -X POST "https://testnet.ten.xyz/v1/authenticate/?token=$EncryptionToken" \
  -H "Content-Type: application/json" \
  -d '{
    "address": "$Address",
    "signature": "$Signature"
  }'
```

```
await fetch(`https://testnet.ten.xyz/v1/authenticate/?token=${EncryptionToken}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    address,
    signature: sig
  }),
});
```

## 4. Query Address Registration[​](#4-query-address-registration "Direct link to 4. Query Address Registration")

**Endpoint:** `GET /v1/query/address?token=$EncryptionToken&a=$Address`

Returns a JSON response indicating whether the address "a" is registered for the user.

```
curl -X GET "https://testnet.ten.xyz/v1/query/address?token=$EncryptionToken&a=$Address"
```

```
const response = await fetch(`https://testnet.ten.xyz/v1/query/address?token=${token}&a=${address}`);
const data = await response.text();
```

## 5. Revoke Access[​](#5-revoke-access "Direct link to 5. Revoke Access")

**Endpoint:** `POST /v1/revoke?token=$EncryptionToken`

Deletes encryption token associated with the account.

```
curl -X POST "https://testnet.ten.xyz/v1/revoke?token=abc123"
```

```
await fetch(`https://testnet.ten.xyz/v1/revoke?token=${token}`, {
  method: 'POST'
});
```

## RPC Usage[​](#rpc-usage "Direct link to RPC Usage")

After authentication, use the encryption token with RPC calls:

```
https://testnet.ten.xyz/v1/?token=<EncryptionToken>
```
