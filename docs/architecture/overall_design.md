---
sidebar_position: 1
---

# Ten Node Architecture

This is an advanced document that describes the technical architecture of a Ten deployment.

While Ten has similarities with other Ethereum L2s, the setup is more complex, as shown in the following diagram 
that depicts the main components and their responsibilities.

![architecture diagram](../assets/ten_node_arch.png)

*Note: The Ethereum node components are developed and maintained by third-parties. E.g.: Infura* 

## Trusted Computing Base (TCB)

Ten makes use of Intel SGX to protect the execution of transactions and the state from node operators.
For development, we use the EGo SDK from Edgeless, and EdgelessDB.

The Ten TCB has two components: the Ten Enclave, and the encrypted database. 

### The Ten Enclave
From a high level, the Ten Enclave (TE) is a process that exposes an RPC server (currently gRPC).

The TE is a process that loads the SGX enclave built from the source code. The EGo SDK handles the low level I/O interactions 
and communication.

The TE has two entry/exit points:
1. The RPC server
2. The Storage 

The next section will cover the main logical components of the TE.

### 1. The RPC server

The Ten Enclave reacts to information like: 
 - Ethereum Transactions: Those submitted to the management contracts and the message bus. 
 - User Transactions: Encrypted Ten transactions submitted by users either via the Gateway or directly to the RPC server.
 - Sequencer Batches and Rollups: Ten batches and rollups submitted by the sequencer.
 - Data Requests: Users can query for transaction receipts or and of the `eth_` requests

There are RPC endpoints for each of these operations, along with a few additional functionalities.

### 2. Transaction Execution Engine

The latest iteration of Ten utilizes the EVM execution engine sourced from go-ethereum. A wrapper has been developed to 
facilitate necessary pre and post-processing operations while maintaining the core execution intact. 

Additionally, the key/value storage system originally employed by the go-ethereum EVM engine has been substituted.

### 3. The Storage
The TE is a stateful component that needs access to both the EVM state and the Ten chain information.

The TE initiates a mutually authenticated TLS connection to another enclave housing a SQL engine. Over this encrypted channel, 
SQL read and write statements are transmitted securely.

### Error Handling

The enclave has the capability to return two types of errors:

1. System Errors: These errors stem from unexpected malfunctions, like disk space exhaustion.
2. User Errors: These errors arise due to unprocessable user requests.

For User Errors, the TE encrypts the error message to ensure that only the corresponding user can decipher it. System Errors 
are returned in plain text to facilitate straightforward handling.


### EdglessDB


## The "Host" Component

## The Ten Gateway




* **The enclave:** The trusted part of the Ten node that runs inside a trusted execution environment (TEE)
* **The host:** The remainder of the Ten node that runs outside the TEE
* **The Ten management contract:** The Ethereum mainnet contracts required by the Ten protocol, described 
  [here](https://whitepaper.obscu.ro/Ten-whitepaper/l1-contracts)
* **Client apps:** Applications that interact with the Ten node (e.g. Ten wallets)

## Host/enclave split

The node is divided into two components, the host and the enclave. Wherever reasonable, node logic should be part of 
the host rather than the enclave. This has two benefits:

* It minimises the amount of code in the 
  [trusted computing base (TCB)](https://en.wikipedia.org/wiki/Trusted_computing_base)
* It reduces churn in the TCB, reducing the frequency of re-attestations

The host and the enclave are two separate OS processes, rather than separate threads in a single process. This is 
because our initial target TEE, [Intel SGX](https://en.wikipedia.org/wiki/Software_Guard_Extensions), requires the 
TEE to execute as a separate process.

The host and the enclave communicate via RPC, using the [gRPC](https://grpc.io/) library. gRPC was selected as it is 
open-source (Apache 2.0) and has broad adoption.

For simplicity, this transport is not authenticated (e.g. using TLS or credentials). One possible attack vector is for 
a _parasite_ aggregator to only run the host software, and connect to another aggregator's enclave to submit 
transactions, in order to economise on operating costs. To avoid this scenario, the enclave is designed to have full 
control over which account receives the rollup rewards, meaning that a would-be parasite aggregator does not receive 
any rewards for acting in this manner.

To reduce coupling, the enclave process will be monitored and managed by a supervisor, and not by the host process.

## Host design

The host has a lot of responsibilities, including:
- serving requests for data and transaction submissions
- feeding data to the enclave to keep it up-to-date with the L1 and L2 networks
- publishing secret request/responses and (for the sequencer) rollups to the L1 network
- receiving and publishing Ten data (e.g. batches and mempool transactions) with peer nodes
- managing failover and recovery for the enclave for high-availability (HA) nodes

The host will be organised with a variety of services to manage these responsibilities.

The following diagram shows a high-level view of the main services involved:

![host services diagram](../assets/host_arch.png)