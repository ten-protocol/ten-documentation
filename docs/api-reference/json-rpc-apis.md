# JSON-RPC API

TEN offers compatibility with a subset of Ethereum's [JSON-RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/). This document outlines the supported JSON-RPC API methods.

## Supported Methods[​](#supported-methods "Direct link to Supported Methods")

TEN nodes cater to the following JSON-RPC API methods, accessible via both HTTP and websockets:

* `eth_blockNumber`
* `eth_call`
* `eth_chainId`
* `eth_estimateGas`
* `eth_gasPrice`
* `eth_getBalance`
* `eth_getBlockByHash`
* `eth_getBlockByNumber`
* `eth_getCode`
* `eth_getLogs`
* `eth_getTransactionByHash`
* `eth_getTransactionCount`
* `eth_getTransactionReceipt`
* `eth_sendRawTransaction`

## Websocket Subscriptions[​](#websocket-subscriptions "Direct link to Websocket Subscriptions")

For websocket connections, additional API methods include:

* `eth_subscribe`
* `eth_unsubscribe`

Currently, the sole supported subscription type is `logs`.
