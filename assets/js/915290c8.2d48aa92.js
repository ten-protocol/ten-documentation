"use strict";(self.webpackChunkten_docs=self.webpackChunkten_docs||[]).push([[1203],{2459:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>d});var i=t(5893),a=t(1151);const o={sidebar_position:4},r="Migrate your dApp to Ten",s={id:"introduction/developer-quickstart",title:"Migrate your dApp to Ten",description:"Migrating to Ten is a straight-forward process that immediately unlocks private state.",source:"@site/docs/introduction/developer-quickstart.md",sourceDirName:"introduction",slug:"/introduction/developer-quickstart",permalink:"/docs/introduction/developer-quickstart",draft:!1,unlisted:!1,editUrl:"https://github.com/ten-protocol/ten-documentation/blob/main/docs/introduction/developer-quickstart.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Technology",permalink:"/docs/introduction/technology"},next:{title:"Getting started",permalink:"/docs/category/getting-started"}},l={},d=[{value:"1. Configuring Hardhat",id:"1-configuring-hardhat",level:2},{value:"1.1 Installing the Ten Hardhat Plugin",id:"11-installing-the-ten-hardhat-plugin",level:3},{value:"1.2 Configuring <code>hardhat.config.js</code>",id:"12-configuring-hardhatconfigjs",level:3},{value:"Step 1: Declaring a Public Variable",id:"step-1-declaring-a-public-variable",level:2},{value:"Code:",id:"code",level:3},{value:"Explanation:",id:"explanation",level:3},{value:"Step 2: Transitioning to a Private Variable with a Getter Function",id:"step-2-transitioning-to-a-private-variable-with-a-getter-function",level:2},{value:"Code:",id:"code-1",level:3},{value:"Explanation:",id:"explanation-1",level:3},{value:"Step 3: Implementing Data Access Control",id:"step-3-implementing-data-access-control",level:2},{value:"Code:",id:"code-2",level:3},{value:"Explanation:",id:"explanation-2",level:3},{value:"Step 4: Emitting Events",id:"step-4-emitting-events",level:2},{value:"Code:",id:"code-3",level:3},{value:"Explanation:",id:"explanation-3",level:3}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"migrate-your-dapp-to-ten",children:"Migrate your dApp to Ten"}),"\n",(0,i.jsx)(n.p,{children:"Migrating to Ten is a straight-forward process that immediately unlocks private state.\nThere are three main types of changes you need to make:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Change your hardhat deployment script so that you can use --network ten"}),"\n",(0,i.jsx)(n.li,{children:"Add logic to your view functions to protect data (if needed)."}),"\n",(0,i.jsx)(n.li,{children:"Add a widget to your javascript UI to onboard Ten users."}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"1-configuring-hardhat",children:"1. Configuring Hardhat"}),"\n",(0,i.jsx)(n.p,{children:"To begin building on Ten, start by setting up a Hardhat project as usual."}),"\n",(0,i.jsx)(n.h3,{id:"11-installing-the-ten-hardhat-plugin",children:"1.1 Installing the Ten Hardhat Plugin"}),"\n",(0,i.jsx)(n.p,{children:"To integrate the Ten Network into your Hardhat project, install the ten-hardhat-plugin:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"npm install ten-hardhat-plugin\n"})}),"\n",(0,i.jsx)(n.p,{children:"You can extend the functionality of Hardhat by installing plugins. Install them using npm or Yarn & configure it in the next step."}),"\n",(0,i.jsxs)(n.h3,{id:"12-configuring-hardhatconfigjs",children:["1.2 Configuring ",(0,i.jsx)(n.code,{children:"hardhat.config.js"})]}),"\n",(0,i.jsxs)(n.p,{children:["Open ",(0,i.jsx)(n.code,{children:"hardhat.config.js"})," in your project's root directory and configure it in the following way:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:'import {HardhatUserConfig} from "hardhat/config";\nimport "@nomiclabs/hardhat-waffle";\nimport \'ten-hardhat-plugin\'\n\nmodule.exports = {\n  solidity: "0.8.10",\n  networks: {\n    hardhat: {\n        // Configuration for the Hardhat Network\n    },\n    ten: {\n        url: "https://testnet.ten.xyz/v1/", \n        chainId: 443, \n        accounts: ["your-private-key"],\n    },\n  },\n};\n\nexport default config;\n'})}),"\n",(0,i.jsx)(n.p,{children:"Now, start writing the smart contracts for your project."}),"\n",(0,i.jsx)(n.h1,{id:"2-writing-smart-contracts",children:"2. Writing Smart Contracts"}),"\n",(0,i.jsx)(n.p,{children:"Ten performs bytecode execution in the EVM identically to Ethereum, allowing developers to leverage their existing codebase and tools."}),"\n",(0,i.jsx)(n.p,{children:"The main difference and advantage of Ten is that on Ten, during execution, private variables and the internal state of the contract are hidden from everyone, including node operators and the sequencer."}),"\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsx)(n.p,{children:"In Ten, the internal node database is encrypted, and the execution itself is also encrypted inside the TEE."})}),"\n",(0,i.jsxs)(n.p,{children:["The calls to ",(0,i.jsx)(n.a,{href:"https://docs.alchemy.com/reference/eth-getstorageat",children:"getStorageAt"})," are disabled, so all data access will be performed through view functions which are under the control of the smart contract developer. Public variables are accessible to everyone because Solidity automatically generates a getter function for them."]}),"\n",(0,i.jsx)(n.p,{children:"We'll illustrate how this works by creating a simple data storage example. In this dApp, users can store a number and retrieve it later."}),"\n",(0,i.jsx)(n.h2,{id:"step-1-declaring-a-public-variable",children:"Step 1: Declaring a Public Variable"}),"\n",(0,i.jsx)(n.h3,{id:"code",children:"Code:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-solidity",children:"// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract StorageExample {\n    mapping(address => uint256) public storedValues;\n\n    function storeValue(uint256 value) public {\n        storedValues[tx.origin] = value;\n    }\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"explanation",children:"Explanation:"}),"\n",(0,i.jsxs)(n.p,{children:["In this step, we've declared a public variable ",(0,i.jsx)(n.code,{children:"storedValues"}),". Solidity automatically generates a public getter view function for it, so on both Ethereum and Ten, you can call this view function without any restrictions. We also created a function that allows users to store a value against their address."]}),"\n",(0,i.jsx)(n.h2,{id:"step-2-transitioning-to-a-private-variable-with-a-getter-function",children:"Step 2: Transitioning to a Private Variable with a Getter Function"}),"\n",(0,i.jsx)(n.h3,{id:"code-1",children:"Code:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-solidity",children:"contract StorageExample {\n    mapping(address => uint256) private _storedValues;\n\n    function storeValue(uint256 value) public {\n        _storedValues[tx.origin] = value;\n    }\n    \n    function getValue(address account) public view returns (uint256) {\n        return _storedValues[account];\n    }\n}\n"})}),"\n",(0,i.jsx)(n.h3,{id:"explanation-1",children:"Explanation:"}),"\n",(0,i.jsxs)(n.p,{children:["We've now made our data variable private, meaning it can't be accessed directly from outside the contract. To fetch its value, we've provided a custom public view function ",(0,i.jsx)(n.code,{children:"getValue"})," where the user provides the address. On both Ethereum and Ten, if you call this function you will retrieve the number stored by that address."]}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsxs)(n.p,{children:["In Ethereum, the ",(0,i.jsx)(n.code,{children:"_storedValues"})," variable can also be accessed directly using the ",(0,i.jsx)(n.code,{children:"getStorageAt"})," method, but not in Ten."]})}),"\n",(0,i.jsx)(n.h2,{id:"step-3-implementing-data-access-control",children:"Step 3: Implementing Data Access Control"}),"\n",(0,i.jsxs)(n.p,{children:["In this step, our aim is to restrict users to only access their own value. This feature can only be implemented in Ten because as mentioned above, ",(0,i.jsx)(n.code,{children:"_storedValues"})," is not hidden in Ethereum."]}),"\n",(0,i.jsx)(n.h3,{id:"code-2",children:"Code:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-solidity",children:'contract StorageExample {\n    mapping(address => uint256) private _storedValues;\n\n    function storeValue(uint256 value) public {\n        _storedValues[tx.origin] = value;\n    }\n\n    function getValue(address account) public view returns (uint256) {\n        require(tx.origin == account, "Not authorized!");\n        return _storedValues[account];\n    }\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"explanation-2",children:"Explanation:"}),"\n",(0,i.jsxs)(n.p,{children:["Since ",(0,i.jsx)(n.code,{children:"getValue"})," is the only function which exposes the values, we can add a check like this: ",(0,i.jsx)(n.code,{children:'require(tx.origin == account, "Not authorized!");'})," If anyone, other than the original account, asks for the value, they will get an error."]}),"\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsxs)(n.p,{children:["In Ethereum, since all data is accessible anyway, there is no need to sign calls to view functions, so ",(0,i.jsx)(n.code,{children:"tx.origin"})," can be spoofed."]})}),"\n",(0,i.jsxs)(n.p,{children:["In Ten, the platform ensures that calls to view functions are authenticated. Which means that behind the scenes, there is a signature of the ",(0,i.jsx)(n.code,{children:"tx.origin"})," address."]}),"\n",(0,i.jsx)(n.h2,{id:"step-4-emitting-events",children:"Step 4: Emitting Events"}),"\n",(0,i.jsx)(n.p,{children:"Events in Ethereum are crucial for UIs to react to smart contract state changes. In this step, we'll emit an event when a user stores a value. We'll also gauge the popularity of our contract by emitting an event when certain milestones are reached."}),"\n",(0,i.jsx)(n.h3,{id:"code-3",children:"Code:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-solidity",children:'contract StorageExample {\n    mapping(address => uint256) private _storedValues;\n    uint256 private totalCalls = 0;\n\n    event DataChanged(address indexed account, uint256 newValue);\n    event MilestoneReached(uint256 noStoredValues);\n\n    function storeValue(uint256 value) public {\n        _storedValues[tx.origin] = value;\n        emit DataChanged(tx.origin, value);\n        totalCalls++;\n        if (totalCalls % 1000 == 0) {\n            emit MilestoneReached(totalCalls);\n        }\n    }\n\n    function getValue(address account) public view returns (uint256) {\n        require(tx.origin == account, "Not authorized!");\n        return _storedValues[account];\n    }\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"explanation-3",children:"Explanation:"}),"\n",(0,i.jsxs)(n.p,{children:["On Ethereum, events are visible to anyone. For example, you can subscribe to the ",(0,i.jsx)(n.code,{children:"DataChanged"})," event and receive notifications in real-time about the data of everyone else. In Ten, we wanted to do better than that."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["The ",(0,i.jsx)(n.code,{children:"DataChanged"})," event is specific to an account, so it should only be received by that user."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"MilestoneReached"}),", on the other hand, is intended for everyone, as we want to show how popular our contract is."]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["The behavior you desire is to restrict the visibility of ",(0,i.jsx)(n.code,{children:"DataChanged"}),", but not that of ",(0,i.jsx)(n.code,{children:"MilestoneReached"}),". ",(0,i.jsx)(n.strong,{children:"This is exactly how it works by default!"})]}),"\n",(0,i.jsx)(n.p,{children:"How it works:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"DataChanged"})," - has an address as a topic (an indexed field), which makes it relevant to that address."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"MilestoneReached"})," - has no address topic, so it is visible to everyone."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"All you have to do is emit events as usual, and the platform applies common-sense visibility rules."})]})}function h(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>s,a:()=>r});var i=t(7294);const a={},o=i.createContext(a);function r(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);