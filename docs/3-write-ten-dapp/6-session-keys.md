---
sidebar_position: 6
---
# Account Abstraction - Native Session Keys


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

- Call the RPC ``sessionkeys_Create`` - without any parameters. This will return a hex-encoded address of the SK. 
- Create a normal transaction that transfers some ETH to the SK. The amount depends on how many "moves" the user is prepared to prepay for. 
- Ask the user to sign this transaction with their normal wallet, and submit it to the network using the library of your choice. 
- Once the receipt is received, call ``sessionkeys_Activate``. 

### The game

After activation of the SK, create a transaction for each move, but don't ask the user to sign them.
Instead, submit them to the network unsigned using the RPCs: ``eth_sendRawTransaction`` or ``eth_sendTransaction``. 

Because the SK is active, the platform will sign the transactions on behalf of the user.

As a game developer, you are responsible to keep track of the balance of the SK. You can also query the network for the balance of the address.
If the SK runs out of balance, you have to ask the user to move more funds to the SK.


### Managing Session Keys @TODO Ziga to update

TEN provides additional RPC endpoints for managing session keys:

- `sessionkeys_Delete` - Permanently removes the session key. This can only be called after deactivating the key. This is useful when you want to clean up unused session keys or when a user wants to completely remove their session key.

- `sessionkeys_List` - Returns the address of the current session key, or an empty response if no session key exists. This is useful for checking if a user has an active session key and getting its address.


The session key management endpoints can be called through both HTTP API and RPC methods. For RPC, you can use `eth_getStorageAt` with specific addresses:

- Create: `0x0000000000000000000000000000000000000003`
- Activate: `0x0000000000000000000000000000000000000004`
- Deactivate: `0x0000000000000000000000000000000000000005`
- Delete: `0x0000000000000000000000000000000000000006`
- List: `0x0000000000000000000000000000000000000007`



### Finishing the game
 
When a game ends, you have to move the remaining funds back to the main address and deactivate the key.

- create a Tx that moves the funds back from the SK to the main address. Submit it unsigned, because the funds are controlled by the SK.
- call the RPC: ``sessionkeys_Deactivate``- from now on, unsigned transactions will no longer be signed by the SK.