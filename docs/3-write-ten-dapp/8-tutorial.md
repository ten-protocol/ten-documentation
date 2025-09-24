---
sidebar_position: 8
---

# Tutorial

In this tutorial, we'll build a financial markets dApp that leverages TEN's precise timestamping capabilities for high-frequency trading (HFT). This example demonstrates how TEN's unique features enable sophisticated trading strategies that require exact timing and privacy.

## Overview

We'll create a **Flash Arbitrage Trading System** that:
- Detects price differences between multiple trading pairs
- Executes arbitrage trades within precise time windows
- Uses TEN's timestamping to ensure fair execution order
- Maintains trading strategy privacy through encrypted execution

## Prerequisites

- MetaMask wallet configured for TEN Testnet
- Node.js and npm installed
- Hardhat development environment

## Step 1: Project Setup

Note you will need to use npm v22.19.0 to create a hardhat project. 

Create a new Hardhat project - make sure to use Hardhat v3 and select Runner and Viem when asked which type of project you'd like to initialise. 

```bash
mkdir ten-hft-dapp
cd ten-hft-dapp
npx hardhat --init
```

You can test the project is inialised by running `npx hardhat test`. 

Configure Hardhat for TEN Testnet in `hardhat.config.ts`:

```typescript

module.exports = {
  networks: {
    ..., 
    ten: {
      type: "http",
      url: "https://testnet-rpc.ten.xyz/v1/?token=${YOUR_GATEWAY_TOKEN}$",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 8443
    }
  }
};
```

## Step 2: Smart Contract Development

Create `contracts/FlashArbitrageTrader.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FlashArbitrageTrader {
    struct TradeOpportunity {
        address tokenA;
        address tokenB;
        uint256 priceExchangeA;
        uint256 priceExchangeB;
        uint256 timestamp;
        uint256 expiryTime;
        bool executed;
    }
    
    struct TradeExecution {
        uint256 opportunityId;
        uint256 executionTimestamp;
        uint256 profit;
        address executor;
    }
    
    mapping(uint256 => TradeOpportunity) public opportunities;
    mapping(uint256 => TradeExecution) public executions;
    mapping(address => uint256) public traderProfits;
    
    uint256 public nextOpportunityId;
    uint256 public constant EXECUTION_WINDOW = 5; // 5 seconds
    uint256 public constant MIN_PROFIT_THRESHOLD = 1e16; // 0.01 ETH
    
    address private owner;
    
    event OpportunityCreated(
        uint256 indexed opportunityId,
        address indexed tokenA,
        address indexed tokenB,
        uint256 timestamp
    );
    
    event TradeExecuted(
        uint256 indexed opportunityId,
        address indexed executor,
        uint256 profit,
        uint256 executionTime
    );
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Creates a new arbitrage opportunity using TEN's precise timestamping
     */
    function createOpportunity(
        address tokenA,
        address tokenB,
        uint256 priceA,
        uint256 priceB
    ) external onlyOwner returns (uint256) {
        require(tokenA != tokenB, "Invalid token pair");
        
        uint256 priceDiff = priceA > priceB ? priceA - priceB : priceB - priceA;
        require(priceDiff >= MIN_PROFIT_THRESHOLD, "Insufficient profit margin");
        
        uint256 currentTimestamp = block.timestamp;
        
        uint256 opportunityId = nextOpportunityId++;
        
        opportunities[opportunityId] = TradeOpportunity({
            tokenA: tokenA,
            tokenB: tokenB,
            priceExchangeA: priceA,
            priceExchangeB: priceB,
            timestamp: currentTimestamp,
            expiryTime: currentTimestamp + EXECUTION_WINDOW,
            executed: false
        });
        
        emit OpportunityCreated(opportunityId, tokenA, tokenB, currentTimestamp);
        return opportunityId;
    }
    
    /**
     * @dev Executes arbitrage trade with precise timing validation
     */
    function executeArbitrage(
        uint256 opportunityId,
        uint256 amount
    ) external payable {
        TradeOpportunity storage opportunity = opportunities[opportunityId];
        require(!opportunity.executed, "Already executed");
        require(block.timestamp <= opportunity.expiryTime, "Opportunity expired");
        require(amount > 0, "Invalid amount");
        
        uint256 executionTimestamp = block.timestamp;
        require(
            executionTimestamp >= opportunity.timestamp,
            "Execution too early"
        );
        
        // Calculate profit based on price difference
        uint256 profit = calculateProfit(
            opportunity.priceExchangeA,
            opportunity.priceExchangeB,
            amount
        );
        
        require(profit > 0, "No profit available");
        require(msg.value >= amount, "Insufficient payment");
        
        // Mark as executed
        opportunity.executed = true;
        
        // Record execution with precise timestamp
        executions[opportunityId] = TradeExecution({
            opportunityId: opportunityId,
            executionTimestamp: executionTimestamp,
            profit: profit,
            executor: msg.sender
        });
        
        // Update trader profits
        traderProfits[msg.sender] += profit;
        
        // Transfer profit to trader
        payable(msg.sender).transfer(profit);
        
        emit TradeExecuted(opportunityId, msg.sender, profit, executionTimestamp);
    }
    
    /**
     * @dev Gets execution timing statistics
     */
    function getExecutionStats(uint256 opportunityId) external view returns (
        uint256 creationTime,
        uint256 executionTime,
        uint256 latency
    ) {
        TradeOpportunity memory opportunity = opportunities[opportunityId];
        TradeExecution memory execution = executions[opportunityId];
        
        creationTime = opportunity.timestamp;
        executionTime = execution.executionTimestamp;
        latency = executionTime > creationTime ? executionTime - creationTime : 0;
    }
    
    /**
     * @dev Private function to calculate arbitrage profit
     */
    function calculateProfit(
        uint256 priceA,
        uint256 priceB,
        uint256 amount
    ) private pure returns (uint256) {
        if (priceA > priceB) {
            return ((priceA - priceB) * amount) / 1e18;
        } else {
            return ((priceB - priceA) * amount) / 1e18;
        }
    }
    
    // Allow contract to receive ETH
    receive() external payable {}
}
```

## Step 3: Deployment Script

We will make use of Hardhat Ignition to deploy the smart contracts. 

Create `ingnition/modules/FlashArbitrageTrader.ts`:

```typescript
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("FlashArbitrageTraderModule", (m) => {
  const trader = m.contract("FlashArbitrageTrader")
  return { trader }
})


```
## Step 4: Testing and Deployment

Deploy the contract:
```bash
npx hardhat ignition deploy ignition/modules/FlashArbitrageTraderScript.ts --network ten
```

You can make function calls on the contract in `FlashArbitrageTraderScript.ts` 

More information on how to implement ignition modules can be found [here](https://hardhat.org/ignition/docs/guides/creating-modules)

Test TODO

## Key Features Demonstrated

### 1. **Precise Timestamping**
- Uses `block.timestamp` for exact execution timing
- Validates execution windows with precision
- Tracks latency between opportunity creation and execution

### 2. **Privacy Benefits**
- Trading strategies remain confidential
- Competitors cannot front-run opportunities  
- Execution details are encrypted until finalized

### 3. **HFT-Specific Logic**
- Time-bounded trading opportunities
- Automatic expiration of stale opportunities
- Latency measurement and optimization

## Conclusion

This tutorial demonstrates how TEN's precise timestamping enables sophisticated financial applications requiring exact timing. The combination of privacy, accurate timestamps, and Ethereum compatibility makes TEN ideal for HFT and other time-sensitive financial applications.