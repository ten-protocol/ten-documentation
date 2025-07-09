# FAQs

## For Developers[​](#for-developers "Direct link to For Developers")

### How do I access the TEN RPC Endpoint?[​](#how-do-i-access-the-ten-rpc-endpoint "Direct link to How do I access the TEN RPC Endpoint?")

You will need to obtain an account-specific, unique RPC link using [TEN Hosted Gateway](/docs/tools-infrastructure/hosted-gateway.md) and authenticate your account to access the Viewing Key and be able to use the RPC endpoints listed in the [API References](/docs/api-reference/json-rpc-apis.md).

Keep in mind that you will not be able to query data on accounts that have not been authenticated to a specific Encryption token.

### How can I port my dApp from other networks to TEN?[​](#how-can-i-port-my-dapp-from-other-networks-to-ten "Direct link to How can I port my dApp from other networks to TEN?")

You need to follow the following steps:

1. Change the functions of your smart contracts according to the instructions given [here](/docs/getting-started/for-developers/explore-contracts-in-ten.md).
2. Integrate TEN Gateway into your dApp.
3. Deploy your SCs into TEN using [compatible tools](/docs/tools-infrastructure/compatible-tools.md) (e.g. Truffle Suite).
4. Invite your users to learn more about encryption!
