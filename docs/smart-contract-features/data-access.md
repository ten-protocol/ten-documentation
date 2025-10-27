# Data Access

Solidity encapsulates "private" state variables in a way that prevents them from being accessed by other contracts.

However, private variables are readable externally via [getStorageAt](https://docs.alchemy.com/reference/eth-getstorageat), meaning contracts can't truly have secrets.

TEN overcomes this limitation by offering "Data Access Control" primitives.

To achieve this, we had to:

1. Run the Ethereum Virtual Machine inside a Trusted Execution Environment (TEE) and store the state in encrypted storage. This prevents the node operator from accessing the data.
2. Disable the `getStorageAt` method, so now contracts can have secrets (as long as the `private` state variables are not exposed via public view functions). This prevents anyone with RPC access to the node from reading the data.
3. Authenticate "view function calls" so that the smart contract knows who is calling the view function. Without this feature there is no "Data Access **Control**", because the dApp developer can't write access control logic.
4. Event logs are another way to expose data from a contract to the outside world. A practical platform needs a way to configure who can read the various event logs.
5. Control access to the "Transaction Receipts", which contain the logs and status of the transaction.

## Data Access Control Rules[​](#data-access-control-rules "Direct link to Data Access Control Rules")

Here, we'll list the platform rules. The examples below will showcase how exactly to use these rules in practice.

* Any contract can be configured to be "transparent" or "private". By default, it is "private", which means the internal storage is not accessible. "Transparent" contracts behave exactly like Ethereum.

* Any RPC call accessing data like: `eth_call`, `eth_estimateGas`, `eth_getTransactionReceipt`, `eth_logs`, must be signed by a [viewing key (VK)](/docs/smart-contract-features/4-smart-contracts.md). The VK itself must be signed by the main account. (Note that this is behind the scenes.)

* Event log visibility is configurable. Each event log can be visible to one or multiple of the topics (indexed fields), and the sender of the transaction, only if the topic is the `address` of an "Externally owned Account" (EOA). The event log can also be configured to be "public" - visible to everyone.

* When there is no configuration, the default event log visibility is:

  <!-- -->

  * Rule 1: Event logs that contain EOAs as topics are only visible to those EOAs.
  * Rule 2: Event logs that don't contain any EOA are visible to everyone.

* As a general rule, transaction receipts are visible to:

  <!-- -->

  * anyone who can access at least one event log emitted by that transaction,
  * the sender of the transaction, and
  * everyone, if the transaction called a transparent contract.

* `eth_getStorageAt` can be called on "transparent" contracts.

## Data Access Control Example[​](#data-access-control-example "Direct link to Data Access Control Example")

Let's illustrate with a basic storage dApp example where users can store and retrieve a number.

At every step, we'll add a new feature and explain the difference between `TEN` and `Ethereum`.

### Step 1: Basic contract with a Public Variable[​](#step-1-basic-contract-with-a-public-variable "Direct link to Step 1: Basic contract with a Public Variable")

#### Code[​](#code "Direct link to Code")

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StorageExample {
    mapping(address => uint256) public storedValues;

    function storeValue(uint256 value) public {
        storedValues[tx.origin] = value;
    }
}
```

#### Explanation[​](#explanation "Direct link to Explanation")

In this step, we created a public variable `storedValues` that maps the provided value to the address of the user who called the `storeValue` function.

Because the variable is public, Solidity will provide a default public getter for it.

Since there are no data access restrictions, on both Ethereum and TEN, everyone will be able to read the values of all users by just calling the default public getter.

### Step 2: Converting to a Private Variable with an explicit Getter Function[​](#step-2-converting-to-a-private-variable-with-an-explicit-getter-function "Direct link to Step 2: Converting to a Private Variable with an explicit Getter Function")

#### Code[​](#code-1 "Direct link to Code")

```
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

#### Explanation[​](#explanation-1 "Direct link to Explanation")

The `storedValues` variable is now private, and we added a basic `getValue` function for users to retrieve their value.

On both Ethereum and TEN, anyone can call `getValue` to retrieve any value.<br /><!-- -->On Ethereum, `_storedValues` can also be accessed directly with `getStorageAt`

### Step 3: Data Access Control[​](#step-3-data-access-control "Direct link to Step 3: Data Access Control")

In this step, we'll add restrictions so users can only access their own data.

#### Code[​](#code-2 "Direct link to Code")

```
contract StorageExample {
    mapping(address => uint256) private _storedValues;

    function storeValue(uint256 value) public {
        _storedValues[tx.origin] = value;
    }

    function getValue(address account) public view returns (uint256) {
        require(tx.origin == account, "Not authorised!");
        return _storedValues[account];
    }
}
```

#### Explanation[​](#explanation-2 "Direct link to Explanation")

The key line is: `require(tx.origin == account, "Not authorised!");`, which ensures that the caller of the view function is the owner of the data.

**When deployed on TEN, this code guarantees that all users can only access their own values, and nobody can read the `_storedValues`.**

On Ethereum, the `tx.origin` is not authenticated, so the check above is not effective and `eth_getStorageAt` is available.

### Step 4: Emitting Events - Default Visibility[​](#step-4-emitting-events---default-visibility "Direct link to Step 4: Emitting Events - Default Visibility")

Event logs notify UIs about state changes in smart contracts.

To improve our smart contract, we’ll emit an event when a user stores a value and milestone events when a specific size threshold is met.

#### Code[​](#code-3 "Direct link to Code")

```
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
        require(tx.origin == account, "Not authorised!");
        return _storedValues[account];
    }
}
```

#### Explanation[​](#explanation-3 "Direct link to Explanation")

Notice how we defined the two events: `DataChanged` and `MilestoneReached`, and are emitting them in the `storeValue` function.

In Ethereum, everyone can query and subscribe to these events. If this was possible on TEN, it would completely break the functionality because you can see all the secret values.

Notice how in this version, we have no configuration for event log visibility, so we are relying on the default rules:

* Rule 1: Event logs that contain ("Externally owned Account") EOAs as indexed fields (topics) are only visible to those EOAs.
* Rule 2: Event logs that don't contain any EOA are visible to everyone.

In our case, the default rules ensure that:

* `DataChanged` is visible only to the address that is storing the value.
* `MilestoneReached` is publicly visible.

### Step 5: Customising Event Visibility[​](#step-5-customising-event-visibility "Direct link to Step 5: Customising Event Visibility")

The default visibility rules are a good starting point, but complex dApps require greater flexibility.

TEN gives you explicit control over event visibility.

#### Code[​](#code-4 "Direct link to Code")

```

// when implementing this interface, the platform will configure the visibility rules
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
        require(tx.origin == account, "Not authorised!");
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

#### Explanation[​](#explanation-4 "Direct link to Explanation")

The [`ContractTransparencyConfig`](https://github.com/ten-protocol/go-ten/blob/main/contracts/src/system/config/IContractTransparencyConfig.sol) interface is known by the TEN platform. When a contract is deployed, the platform will call the `visibilityRules` function, and store the `VisibilityConfig`.

For each event type, you can configure which fields can access it.

Notice how in the `visibilityRules` above, we configure the `DataChanged` event to be visible to the first field and the sender, and the `MilestoneReached` to be visible to everyone.

The other configuration: `VisibilityConfig.contractCfg` applies to the entire contract:

* `ContractCfg.TRANSPARENT`: The contracts will have public storage and events, behaving exactly like Ethereum.
* `ContractCfg.PRIVATE`: The default TEN behaviour, where the storage is not accessible and the events are individually configurable.
