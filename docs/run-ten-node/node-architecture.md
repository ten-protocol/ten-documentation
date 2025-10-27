# Node Architecture

## SGX Enclave and Trusted Execution Environment (TEE)[​](#sgx-enclave-and-trusted-execution-environment-tee "Direct link to SGX Enclave and Trusted Execution Environment (TEE)")

The TEN network leverages Intel Software Guard Extensions (SGX) enclaves to create a secure and trusted execution environment (TEE) for processing transactions and executing smart contracts. SGX enclaves are isolated regions of memory that are encrypted and protected from unauthorised access, ensuring that sensitive data remains confidential and secure. Every transaction and smart contract execution on the TEN network is processed within an SGX enclave, guaranteeing the integrity and confidentiality of the data involved. Additionally, SGX enclaves provide hardware-based attestation, enabling nodes to verify the authenticity of each other and establish trust within the network.

## Node Composition[​](#node-composition "Direct link to Node Composition")

![TEN Validator Composition](/assets/images/ten-validator-composition-06841f0021b4acb068aff3f1318eb9d3.png)

The TEN Validator is composed of the following components:

## Host and Enclave Architecture[​](#host-and-enclave-architecture "Direct link to Host and Enclave Architecture")

#### Process Separation[​](#process-separation "Direct link to Process Separation")

* Separate OS processes for Host and Enclave
* Communication via gRPC
* Enclave managed by independent supervisor

#### Security Considerations[​](#security-considerations "Direct link to Security Considerations")

* Minimized TCB (Trusted Computing Base)
* Reduced attestation frequency

### Host Component Responsibilities[​](#host-component-responsibilities "Direct link to Host Component Responsibilities")

* External request handling
* L1/L2 network synchronization
* Secret management and rollup publishing
* Peer node communication
* High-availability management

### Enclave Components and Responsibilities[​](#enclave-components-and-responsibilities "Direct link to Enclave Components and Responsibilities")

* Transaction validation and execution
* Smart contract computation
* Cryptographic operations and key management
* State management and confidential data processing
* Attestation generation and verification
* Secure random number generation
* Batch processing and sequencing

## Deployment Containerization[​](#deployment-containerization "Direct link to Deployment Containerization")

There are four deployment containers on a TEN Validator node:

* **Host**: The host component is responsible for external communications and network operations.
* **HostDB/Postgres**: Postgres is used to store the validator's host state.
* **Enclave**: The enclave component is responsible for sensitive computations and data processing (SGX).
* **EnclaveDB/Edgeless**: Edgeless is used to store the validator's enclave state (SGX).

Running a TEN validator will automatically deploy these containers.
