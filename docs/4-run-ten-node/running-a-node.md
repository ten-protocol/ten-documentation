---
sidebar_position: 4
---
# Running a TEN Validator Node on Azure

# TODO Krish to redo for K8s

Use arbitrum docs as a benchmark for detail required https://docs.arbitrum.io/run-arbitrum-node/overview

This guide provides detailed instructions to set up and manage a TEN Validator Node on Azure using Terraform and Ansible. Due to TEN’s use of SGX architecture and cloud-specific security assurances, all current deployments are limited to cloud infrastructure to mitigate risks associated with physical attacks. A proof-of-cloud assertion, provided by TEN, certifies the security and reliability of each validator node running in the cloud.

---

## Overview

The deployment process leverages **Terraform** for Azure infrastructure provisioning and **Ansible** for configuring the Validator Node. By following this guide, you’ll set up a secure, compliant environment that meets TEN’s standards for validator operations.

- **Terraform**: Automates the creation of Azure resources for a TEN Validator Node.
- **Ansible**: Configures and deploys node software on the provisioned infrastructure.

---

## Requirements

Before starting, ensure the following dependencies are installed on your local machine:

- [**Terraform**](https://www.terraform.io/downloads.html) (version >= 0.12)
  - [Terraform Installation Guide](https://learn.hashicorp.com/tutorials/terraform/install-cli)
- [**Ansible**](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)
  - [Ansible Installation guide](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)
  - **Required Ansible Collections**: Install with:
    ```sh
    ansible-galaxy collection install community.docker community.crypto
    ```
- [**Azure CLI**](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli): For authenticating and managing Azure resources.
- [**Docker**](https://docs.docker.com/get-docker/): Required for node deployment.
- [**Docker Compose**](https://docs.docker.com/compose/install/): Used for managing containerized services.
- [**Git**](https://git-scm.com/downloads): For repository cloning and version control.

---
## Clone the TEN Validator Repository
```
git clone https://github.com/ten-protocol/ten-validator.git
cd ten-validator
```
## Azure Setup Instructions (Terraform)

### Step 1: Authenticate and Configure Azure

1. **Log into Azure**:
   ```sh
   az login
2. Set Your Azure Subscription: Specify the Azure subscription for deploying the resources:
   ```sh
   az account set --subscription <your-subscription-id>
   ```

### Step 2: Configure Terraform Variables (optional)
```
cp terraform.tfvars.example terraform.tfvars
```

### Step 3: Deploy the Terraform Script
```
terraform init
terraform apply
```

### Step 4: Access the Validator Node (Optional)
1. ```chmod +x get-key.sh ./get-key.sh```
2. ```ssh -i <path-to-key> <username>@<public-ip>```

## TEN Validator Setup Instructions (Ansible)
1. Network Configuration: Node network settings are located in `ansible/files/network_vars.yml`. These settings are typically not changed and are specific to the L2 network. One will be provided by the TEN team for ITN (testnet) and another for mainnet.
2. Run the Installation Script: Use Ansible to configure and deploy the TEN Validator Node:
    ```
    chmod +x install-ten.sh
    ./install-ten.sh
    ```
    During deployment, you will be prompted to enter:

   -  Host ID: Public key of the validator node wallet

   -  Private Key: Private key of the validator node wallet

   -  Host Public P2P Address: Public IP or DNS of the node

   -  SSH Details: Username and key path (or password if applicable)

   -  L1 WS URL: WebSocket URL for the Layer 1 node (e.g., Infura)

   -  Postgres DB Host: Leave blank to provision a new database

   Note: If Terraform provisioned the VM, default values are often applicable—just press Enter to accept.

## Managing the Validator Node
Coming soon! (monitoring, backups, tear down, etc.)
