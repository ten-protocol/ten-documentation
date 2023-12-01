---
sidebar_position: 3
---

# Hosted Gateway

The Ten Gateway is a critical application that facilitates communication between a Ten node and various tools that require a connection to it, such as MetaMask. Due to the encryption of data within a Ten node, direct communication is not feasible.

The program conforms to the Ethereum JSON-RPC specification ([Ethereum JSON-RPC Specification](https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/eth1.0-apis/assembled-spec/openrpc.json)) and also supports additional APIs to ensure compatibility with popular tools like MetaMask.

You have the flexibility to host the Ten Gateway yourself or use one of the hosted gateways if you choose to join Ten. You also have the option to run and use the program independently. The diagram below illustrates different usage scenarios, with Bob and Charlie using the hosted version and Alice managing it independently.

## Workflow

The onboarding process is straightforward and requires only a few clicks:

1. The user navigates to a website where a hosted Ten Gateway is running and clicks on "Join Ten." This action will add a network to their wallet.
2. The user then connects their wallet and switches to the Ten network, if they have not done so already.
3. In the wallet popup, the user is prompted to sign over an EIP-712 formatted message including encryption token.

## Endpoints

### GET /join

This endpoint generates a key-pair, saves it in the database, derives an encryption token from the keys, and returns the encryption token.

### POST /authenticate?token=$EncryptionToken

This endpoint enables the addition of multiple addresses for each encryption token. Prior to saving, it performs several checks on the signature and encryption token.

Here's an example of the POST request body for the /authenticate endpoint:

```json
{
    "address": "0xEF1C76228AeaDE07B74eA4a749d02f539cCff16a",
    "signature": "0x781699d25d62ebaa3cc0901ac1fd9fda4e7e3b143bee854b262434e3e22021d1607b5680924ac439dec9838344d6785100c7043312cec07b7fd1e9d26983f69f1b"
}
```

Typically, a JavaScript function initiates this call.
Signed message must be in following format:

```
{
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
      ],
      Authentication: [
        { name: "Encryption Token", type: "address" },
      ],
    },
    primaryType: "Authentication",
    domain: {
      name: "Ten",
      version: "1.0",
      chainId: <TenChainID>,
    },
    message: {
      "Encryption Token": <encryptionToken>
    },
}
```

### GET /query/address?token=$EncryptionToken&a=$Address

This endpoint returns a boolean value (true or false) based on whether the given address is registered with the provided encryption token.

### GET /revoke?token=$EncryptionToken

This endpoint facilitates the removal of a certain encryption token's access by deleting the key-pair from the database. This is particularly useful when a user wishes to revoke access for a specific encryption token.
