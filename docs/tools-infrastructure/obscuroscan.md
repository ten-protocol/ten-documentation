---
sidebar_position: 1
---

# TenScan

![Ten Block Explorer](../assets/obscuroscan.png)

[TenScan](https://tenscan.io) is a blockchain explorer for the Ten Testnet - Ten’s equivalent of Etherscan. TenScan allows you to view the latest rollups and transactions on the Testnet, as well as search for historical rollups and transactions. Its functionality will be expanded over time.

:::info
TenScan is still in its testnet phase. Expect to be able to view individual transactions and accounts encrypted in the future.
:::

## How does Testnet handle encryption?

:::warning
On the Testnet, transactions are encrypted but can be decrypted because it uses a rollup encryption key that is long-lived and well-known. It's designed to help users understand how Ten works. However, on the Mainnet, rollups will be encrypted with rotating keys, unknown to anyone or anything apart from the Ten enclaves.
:::

Transactions in Ten are encrypted by default and their contents cannot be viewed by anyone, but how do we know it's really encrypted? Because we can decrypt the transaction batches. 

## Decryption of Transaction Blobs

1. Head over to [TenScan Batches](https://tenscan.io/batches) page. Batches can contain 0, 1 or more transactions.
2. Scroll down the page and make sure that the choosen batch contain at least 1 transaction (see *"No. of Transactions"*)
3. Copy Encrypted Tx Blob, just click on it!
4. Find the *"Resources"* dropdown menu in the top right corner of TenScan and select 
[*"Decrypt."*](https://tenscan.io/resources/decrypt)
5. Paste the copied Tx Blob and hit **decrypt** button. Awesome! The result is presented as raw decrypted text.

:::tip
To decode numeric values, such as 'value', you need to use [hex to decimal converters](https://www.binaryhexconverter.com/hex-to-decimal-converter). In the case of Value, the result will be represented in wei. 
:::
