---
sidebar_position: 3
---
# Develop & Deploy dApp

## 1. Develop Smart Contracts
Smart contracts are the backbone of your dApp, defining its rules and operations. Begin your development in Solidity based on the instructions [here](/docs/getting-started/for-developers/explore-contracts-in-obscuro).

## 2. Develop the Frontend
Use common web tools like HTML, CSS, and JavaScript. You can consider ReactJs, VueJs to enhance development. To connect your frontend to Ethereum, choose a library such as Web3.js or Ether.js. See supported libraries [here](#).

## 3. Integrating Obscuro Gateway
Users need to configure their wallets to connect with Obscuro the first time they access an Obscuro dApp. There are two options:
  1. **Obscuro Gateway Widget**: Integrate this widget into your dApp for smooth user onboarding. It makes wallet configuration easier. Follow the [instructions](/docs/tools-infrastructure/gateway-widget) to integrate the widget.
  2. **Hosted Gateway**: Alternatively, during the initial user onboarding, prompt users to visit the Obscuro Hosted Gateway. By clicking "join" and following the on-screen instructions, they can easily configure their wallets. Learn more about the Hosted Obscuro Gateway [here](/docs/tools-infrastructure/hosted-gateway).

## 4. Test & Deploy the Dapp
Before the final deployment, test your dApp in a controlled environment. This ensures that it interacts correctly with the blockchain and provides the desired user experience. Once satisfied with your dApp's functionality and performance, deploy it for public access.

## 5. Verify & Track the Deployment
Post-Deployment it's essential to monitor your dApps performance and user interactions. Use the ObscuroScan block explorer to verify and inspect the details of your deployed contract. This tool provides insights into transactions, contract interactions, and more. Learn how to use the block explorer [here](/docs/tools-infrastructure/obscuroscan).
