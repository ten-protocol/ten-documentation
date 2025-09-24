---
sidebar_position: 4
---

# Writing smart contracts for TEN

TEN executes smart contracts within the EVM similarly to Ethereum, so you can reuse your existing code. 
However, the execution and the internal state are hidden from everyone, including node operators and the sequencer.

:::info
TEN encrypts both the execution and its internal database using Trusted Execution Environments (TEEs).
:::

The [getStorageAt](https://docs.alchemy.com/reference/eth-getstorageat) method is disabled by default on TEN, so data access relies on view functions that you define. 
Public variables remain accessible as Solidity automatically creates getters for them.

Let's illustrate with a basic storage dApp example where users can store and retrieve a number.

At every step, we'll add a new feature and explain the difference between `TEN` and `Ethereum`.

### Step 1: Basic contract with a Public Variable

#### Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StorageExample {
    mapping(address => uint256) public storedValues;

    function storeValue(uint256 value) public {
        storedValues[tx.origin] = value;
    }
}
```

#### Explanation

In this step, we created a public variable `storedValues` that maps the provided value to the address of the user who called the `storeValue` function. 

Because the variable is public, Solidity will provide a default public getter for it. 

Since there are no data access restrictions, on both Ethereum and TEN, everyone will be able to read the values of all users.

### Step 2: Converting to a Private Variable with an explicit Getter Function

#### Code

```solidity
contract StorageExample {
    mapping(address => uint256) private _storedValues;

    function storeValue(uint256 value) public {
        _storedValues[tx.origin] = value;
    }
    
    function getValue(address account) public view returns (uint256) {
        return _storedValues[account];
    }
}
```

#### Explanation

The `storedValues` variable is now private, and we added a basic `getValue` function for users to retrieve their value. 

On both Ethereum and TEN, anyone can call `getValue` to retrieve any value.   
On Ethereum, `_storedValues` can also be accessed directly with `getStorageAt`

### Step 3:  Data Access Control

In this step, we'll add restrictions so users can only access their own data. 

#### Code

```solidity
contract StorageExample {
    mapping(address => uint256) private _storedValues;

    function storeValue(uint256 value) public {
        _storedValues[tx.origin] = value;
    }

    function getValue(address account) public view returns (uint256) {
        require(tx.origin == account, "Not authorized!");
        return _storedValues[account];
    }
}
```

#### Explanation

The key line is: ``require(tx.origin == account, "Not authorized!");``, which ensures that the caller of the view function is the owner of the data.

:::info
TEN uses  "Viewing Keys" to authenticate view function calls.
:::

**When deployed on TEN, this code guarantees that all users can only access their own values, and nobody can read the `_storedValues`.**

### Step 4: Emitting Events - Default Visibility

Event logs notify UIs about state changes in smart contracts. 

To improve our smart contract, we’ll emit an event when a user stores a value and milestone events when a specific size threshold is met.

#### Code

```solidity
contract StorageExample {
    mapping(address => uint256) private _storedValues;
    uint256 private totalCalls = 0;

    event DataChanged(address indexed account, uint256 newValue);
    event MilestoneReached(uint256 noStoredValues);

    function storeValue(uint256 value) public {
        _storedValues[tx.origin] = value;
        emit DataChanged(tx.origin, value);
        totalCalls++;
        if (totalCalls % 1000 == 0) {
            emit MilestoneReached(totalCalls);
        }
    }

    function getValue(address account) public view returns (uint256) {
        require(tx.origin == account, "Not authorized!");
        return _storedValues[account];
    }
}
```

#### Explanation

Notice how we defined the two events: `DataChanged` and `MilestoneReached`, and are emitting them in the `storeValue` function.

In Ethereum, everyone can query and subscribe to these events. This obviously can't be the case for TEN because it would completely break the functionality.

Notice how in this version, we have no configuration for event log visibility, so we are relying on the default rules.

Rule 1: Event logs that contain EOAs as indexed fields (topics) are only visible to those EOAs.
Rule 2: Event logs that don't contain any EOA are visible to everyone.

In our case, the default rules ensure that:
- `DataChanged` is visible only to the address that is storing the value.
- `MilestoneReached` is publicly visible.


### Step 5: Customizing Event Visibility

The default visibility rules are a good starting point, but complex dApps require greater flexibility. 

TEN give you explicit control over event visibility. 

#### Code

```solidity
interface ContractTransparencyConfig {
    enum Field { TOPIC1, TOPIC2, TOPIC3, SENDER, EVERYONE }
    enum ContractCfg { TRANSPARENT, PRIVATE }

    struct EventLogConfig {
        bytes32 eventSignature;
        Field[] visibleTo;
    }

    struct VisibilityConfig {
        ContractCfg contractCfg;
        EventLogConfig[] eventLogConfigs;
    }

    function visibilityRules() external pure returns (VisibilityConfig memory);
}

contract StorageExample is ContractTransparencyConfig {
    mapping(address => uint256) private _storedValues;
    uint256 private totalCalls = 0;

    event DataChanged(address indexed account, uint256 newValue);
    event MilestoneReached(uint256 noStoredValues);

    function storeValue(uint256 value) public {
        _storedValues[tx.origin] = value;
        emit DataChanged(tx.origin, value);
        totalCalls++;
        if (totalCalls % 1000 == 0) {
            emit MilestoneReached(totalCalls);
        }
    }

    function getValue(address account) public view returns (uint256) {
        require(tx.origin == account, "Not authorized!");
        return _storedValues[account];
    }

    function visibilityRules() external pure override returns (VisibilityConfig memory) {
        EventLogConfig[]  memory eventLogConfigs = new EventLogConfig[](2);

        // the signature of "event DataChanged(address indexed account, uint256 newValue);"
        bytes32 dataChangedEventSig = hex"0xec851d5c322f7f1dd5581f7432e9f6683a8709a4b1ca754ccb164742b82a7d2f";
        Field[]  memory relevantTo = new Field[](2);
        relevantTo[0] = Field.TOPIC1;
        relevantTo[1] = Field.SENDER;
        eventLogConfigs[0] = EventLogConfig(dataChangedEventSig, relevantTo);

        // the signature of "event MilestoneReached(uint256 noStoredValues);"
        bytes32 milestoneReachedEventSig = hex"0xd41033274424d56dd572e7196fb4230cf4141d546b91fc00555cab8403965924";
        Field[]  memory relevantTo = new Field[](1);
        relevantTo[0] = Field.EVERYONE;
        eventLogConfigs[1] = EventLogConfig(milestoneReachedEventSig, relevantTo);

        return VisibilityConfig(ContractCfg.PRIVATE, eventLogConfigs);
    }
}
```

#### Explanation

The `ContractTransparencyConfig` interface is known by the TEN platform. 
When a contract is deployed, the platform will call the `visibilityRules` function, and store the `VisibilityConfig`.

For each event type, you can configure which fields can access it. 
This allows the developer to configure an event to be public even if it has EOAs or to allow the sender of the transaction to access events emitted even if the address is not in the event.  

Notice how in the `visibilityRules` above, we configure the `DataChanged` event to be visible to the first field and the sender, and the `MilestoneReached` to be visible to everyone. 

The other configuration: `VisibilityConfig.contractCfg` applies to the entire contract:
- `ContractCfg.TRANSPARENT`: The contracts will have public storage and events, behaving exactly like Ethereum.
- `ContractCfg.PRIVATE`: The default TEN behaviour, where the storage is not accessible and the events are individually configurable.


## Account Abstraction - Native Session Keys

The key feature of ["Account Abstraction"](https://medium.com/p/2e85bde4c54d) (EIP-4337) is "Session keys"(SK) through a proxy smart contract.
SKs allow users to interact with the blockchain without having to sign every transaction, which is a major UX improvement.

TEN supports "native" SKs - these are managed by the platform and do not require a proxy contract.

In TEN, SKs are managed by dApp developers through dedicated RPC endpoints.

### Solution overview

Imagine you're developing an on-chain game, and you want a smooth UX without the distraction of signing every move.

Conceptually, the game will create a session key (SK) for the user, then ask the user to move some funds to that address, and then create "move" transactions signed with the SK.

If the game were to create the SK in the browser, there would be a risk of the user losing the SK, and the funds associated with it, in case of an accidental exit. 
With TEN, the dApp developer doesn't have to worry about this, because the SKs are managed by TEEs.

### Usage

The below describe the implementation steps for the game developer - which is the main usecase for SKs.
Note that it can be used for any dApp that requires a no-click UX.

#### When the game starts

Before the user can start playing, the game must create the SK and ask the user to move some funds to that address. 
The funds will be used to pay for moves. 

- Call the RPC ``sessionkeys_Create`` - without any parameters. This will return a hex-encoded address of the SK. 
- Create a normal transaction that transfers some ETH to the SK. The amount depends on how many "moves" the user is prepared to prepay for. 
- Ask the user to sign this transaction with their normal wallet, and submit it to the network using the library of your choice. 
- Once the receipt is received, call ``sessionkeys_Activate``. 

#### The game

After activation of the SK, create a transaction for each move, but don't ask the user to sign them.
Instead, submit them to the network unsigned using the RPCs: ``eth_sendRawTransaction`` or ``eth_sendTransaction``. 

Because the SK is active, the platform will sign the transactions on behalf of the user.

As a game developer, you are responsible to keep track of the balance of the SK. You can also query the network for the balance of the address.
If the SK runs out of balance, you have to ask the user to move more funds to the SK.


#### Managing Session Keys @TODO Ziga to update

TEN provides additional RPC endpoints for managing session keys:

- `sessionkeys_Delete` - Permanently removes the session key. This can only be called after deactivating the key. This is useful when you want to clean up unused session keys or when a user wants to completely remove their session key.

- `sessionkeys_List` - Returns the address of the current session key, or an empty response if no session key exists. This is useful for checking if a user has an active session key and getting its address.


The session key management endpoints can be called through both HTTP API and RPC methods. For RPC, you can use `eth_getStorageAt` with specific addresses:

- Create: `0x0000000000000000000000000000000000000003`
- Activate: `0x0000000000000000000000000000000000000004`
- Deactivate: `0x0000000000000000000000000000000000000005`
- Delete: `0x0000000000000000000000000000000000000006`
- List: `0x0000000000000000000000000000000000000007`



#### Finishing the game
 
When a game ends, you have to move the remaining funds back to the main address and deactivate the key.

- create a Tx that moves the funds back from the SK to the main address. Submit it unsigned, because the funds are controlled by the SK.
- call the RPC: ``sessionkeys_Deactivate``- from now on, unsigned transactions will no longer be signed by the SK.


## Game Security

Every on-chain game developer knows that every move that relies on entropy must be executed in two steps. 

Imagine you implement an on-chain coin flip game. The player pays 0.1ETH to choose `Heads` or `Tails`. 
If they win, they receive 0.2ETH, otherwise they lose the 0.1ETH.
Even if randomness is unpredictable, this simple game can be exploited in several ways:

- The attacker can create a “proxy” smart contract to play on their behalf. Using a similar mechanism to flash loans in DeFi: the proxy is programmed to make multiple actions, and only “commit” if it can obtain a profit. In our case, if the coin flip is losing, the proxy can just revert. The only cost will be the gas burned. 
- Transactions consume gas, and the gas cost can inadvertently reveal information. For instance, if a winning move is more computationally intensive than a losing one, players could deduce optimal moves by estimating gas costs for various actions.

The typical solution is to use a commit-reveal scheme. The player commits to a move, and then reveals it. This way, the player can't change their mind after seeing the result.
This solution has the major drawback that it introduces extra complexity, latency and cost.

### The on-block-end callback 

The best solution is to decouple the move from the execution without increasing the latency or the cost.
This way, the side-channel attacks are no longer possible because the move is not executed immediately.
To avoid increasing the latency, the move must be executed at the end of the block.
Note that contracts can define the handleRefund function, which will be called with value equal to what is left from the gas processing paid for.
This is called with enough gas to save locally how much should be refunded to whoever paid for the callback.

See below a simple implementation of the coin flip game using the TEN platform:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// this interface is known by the TEN system contract
interface TenCallbacks {
    function register(bytes calldata) external payable returns (uint256);
}

interface Refunds {
    function handleRefund(uint256 callbackId) external payable;
}

contract CoinFlip {
    // Event to emit the result of the coin flip
    event CoinFlipResult(address indexed player, bool didWin, uint256 randomNumber);

    private TenCallbacks tenCallbacks;
    mapping(uint256 callbackId => address player) public callbackToPlayer;
    mapping(address player => uint256 refundAmount) public playerToRefundAmount;



    modifier onlyTenSystemCall() { 
        require(msg.sender == address(tenCallbacks));
        _;
    }

    // you have to pass in the address of the callbacks contract
    constructor(address _tenCallbacksAddress) {
        tenCallbacks = TenCallbacks(_tenCallbacksAddress);
    }

    // Function to initiate a coin flip. 
    // Notice how it doesn't execute the coin flip directly, but instead registers a callback.
    function flipCoin(bool isHeads) external payable {
        // Assume doFlipCoin costs 50_000 gas;
        // We deduct a predetermined amount from the bet to pay for delayed execution.
        uint256 etherGasForCoinFlip = 50_000*block.basefee;
        require(msg.value > etherGasForCoinFlip, "Insufficent gas");

        // Encode the function we want to be called by the TEN system contract.
        bytes memory callbackTargetInfo = abi.encodeWithSelector(this.doFlipCoin.selector, msg.sender, msg.value - etherGasForCoinFlip, isHeads);

        tenCallbacks.register{value: etherGasForCoinFlip}(callbackTargetInfo);
    }

    // Function to simulate a coin flip - notice that this must only be callable by the ten system contract.
    // This function is called by the TEN platform as a synthetic transaction in the same block as the user transaction.
    function doFlipCoin(address bettor, uint256 stake, bool wantsHeads) external onlyTenSystemCall {
        // Assume getRandomNumber() is a function that returns a random number
        uint256 randomNumber = getRandomNumber();

        // Simulate a coin flip: 0 for tails, 1 for heads
        bool isHeads = (randomNumber % 2) == 1;

        if (wantsHeads == isHeads) {
            //pay out to winner
            (bool success, ) = payable(bettor).call{value: stake*2}("");
            require(success, "Payment failed.");
        }
        // Emit the result of the coin flip
        emit CoinFlipResult(msg.sender, isHeads, randomNumber);
    }

    function getRandomNumber() internal view returns (uint256) {
        return block.prevrandao;
    }

    function handleRefund(uint256 callbackId) external payable {
        address player = callbackToPlayer[callbackId];
        playerToRefundAmount[player] += msg.value;
    }

    function claimRefund() external {
        uint256 refundAmount = playerToRefundAmount[msg.sender];
        require(refundAmount > 0, "No refunds to claim");
        playerToRefundAmount[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: refundAmount}("");
        require(success, "Transfer failed");
    }
 
}
```