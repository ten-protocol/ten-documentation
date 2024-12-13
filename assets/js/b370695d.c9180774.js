"use strict";(self.webpackChunkten_docs=self.webpackChunkten_docs||[]).push([[1846],{3603:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>c});var o=t(5893),s=t(1151);const i={sidebar_position:3},a="Hosted Gateway",r={id:"tools-infrastructure/hosted-gateway",title:"Hosted Gateway",description:"The Ten Gateway is a critical application that facilitates communication between a Ten node and various tools that require a connection to it, such as MetaMask. Due to the encryption of data within a Ten node, direct communication is not feasible.",source:"@site/docs/tools-infrastructure/hosted-gateway.md",sourceDirName:"tools-infrastructure",slug:"/tools-infrastructure/hosted-gateway",permalink:"/docs/tools-infrastructure/hosted-gateway",draft:!1,unlisted:!1,editUrl:"https://github.com/ten-protocol/ten-documentation/blob/main/docs/tools-infrastructure/hosted-gateway.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Ten Faucet",permalink:"/docs/tools-infrastructure/obscuro-faucet"},next:{title:"Gateway Widget",permalink:"/docs/tools-infrastructure/gateway-widget"}},d={},c=[{value:"Workflow",id:"workflow",level:2},{value:"Endpoints",id:"endpoints",level:2},{value:"GET /join",id:"get-join",level:3},{value:"GET /getmessage",id:"get-getmessage",level:3},{value:"POST /authenticate?token=$EncryptionToken",id:"post-authenticatetokenencryptiontoken",level:3},{value:"GET /query/address?token=$EncryptionToken&amp;a=$Address",id:"get-queryaddresstokenencryptiontokenaaddress",level:3},{value:"GET /revoke?token=$EncryptionToken",id:"get-revoketokenencryptiontoken",level:3}];function l(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"hosted-gateway",children:"Hosted Gateway"}),"\n",(0,o.jsx)(n.p,{children:"The Ten Gateway is a critical application that facilitates communication between a Ten node and various tools that require a connection to it, such as MetaMask. Due to the encryption of data within a Ten node, direct communication is not feasible."}),"\n",(0,o.jsxs)(n.p,{children:["The program conforms to the Ethereum JSON-RPC specification (",(0,o.jsx)(n.a,{href:"https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/eth1.0-apis/assembled-spec/openrpc.json",children:"Ethereum JSON-RPC Specification"}),") and also supports additional APIs to ensure compatibility with popular tools like MetaMask."]}),"\n",(0,o.jsx)(n.p,{children:"You have the flexibility to host the Ten Gateway yourself or use one of the hosted gateways if you choose to join Ten. You also have the option to run and use the program independently. The diagram below illustrates different usage scenarios, with Bob and Charlie using the hosted version and Alice managing it independently."}),"\n",(0,o.jsx)(n.h2,{id:"workflow",children:"Workflow"}),"\n",(0,o.jsx)(n.p,{children:"The onboarding process is straightforward and requires only a few clicks:"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:'The user navigates to a website where a hosted Ten Gateway is running and clicks on "Join Ten." This action will add a network to their wallet.'}),"\n",(0,o.jsx)(n.li,{children:"The user then connects their wallet and switches to the Ten network, if they have not done so already."}),"\n",(0,o.jsx)(n.li,{children:"In the wallet popup, the user is prompted to sign over an EIP-712 formatted message or text message which includes an encryption token."}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"endpoints",children:"Endpoints"}),"\n",(0,o.jsx)(n.h3,{id:"get-join",children:"GET /join"}),"\n",(0,o.jsx)(n.p,{children:"This endpoint generates a key-pair, saves it in the database, derives an encryption token from the keys, and returns the encryption token."}),"\n",(0,o.jsx)(n.h3,{id:"get-getmessage",children:"GET /getmessage"}),"\n",(0,o.jsx)(n.p,{children:"This endpoint generates a message for the user to sign in order to authenticate their address. We currently support EIP712 messages and simple text messages that need to be signed with Personal sign by the user."}),"\n",(0,o.jsx)(n.p,{children:"Here is an example for the GET request body:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-json",children:'{\n    "encryptionToken": "2d127471df48dad460a60194496f975fd9d558d1",\n    "formats": ["EIP712", "Personal"]\n}\n'})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"encryptionToken"})," is mandatory and is the encryption token generated by the /join endpoint."]}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"formats"}),' is optional and can be either "EIP712" or "Personal". If not provided / or both are provided, the default value is "EIP712".']}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Message returned by the endpoint is in the following format:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-json",children:'{\n    "message": "<message>",\n    "type": "<EIP712/Personal>"\n}\n'})}),"\n",(0,o.jsx)(n.p,{children:"EIP712 Message uses following format:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-json",children:'{\n    types: {\n      EIP712Domain: [\n        { name: "name", type: "string" },\n        { name: "version", type: "string" },\n        { name: "chainId", type: "uint256" },\n      ],\n      Authentication: [\n        { name: "Encryption Token", type: "address" },\n      ],\n    },\n    primaryType: "Authentication",\n    domain: {\n      name: "Ten",\n      version: "1.0",\n      chainId: <TenChainID>,\n    },\n    message: {\n      "Encryption Token": <encryptionToken>\n    },\n}\n'})}),"\n",(0,o.jsx)(n.p,{children:"And Personal Message uses following format:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"Token: %s on chain: %d version: %d\n"})}),"\n",(0,o.jsx)(n.h3,{id:"post-authenticatetokenencryptiontoken",children:"POST /authenticate?token=$EncryptionToken"}),"\n",(0,o.jsx)(n.p,{children:"This endpoint enables the addition of multiple addresses for each encryption token. Prior to saving, it performs several checks on the signature and encryption token."}),"\n",(0,o.jsx)(n.p,{children:"Here's an example of the POST request body for the /authenticate endpoint:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-json",children:'{\n    "address": "0xEF1C76228AeaDE07B74eA4a749d02f539cCff16a",\n    "signature": "0x781699d25d62ebaa3cc0901ac1fd9fda4e7e3b143bee854b262434e3e22021d1607b5680924ac439dec9838344d6785100c7043312cec07b7fd1e9d26983f69f1b",\n    "type": "EIP712"\n}\n'})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"address"})," is mandatory and is the address of the user who is trying to authenticate"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"signature"})," is mandatory and is the signature of the message generated by the /getmessage endpoint"]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"type"}),' is optional and can be either "EIP712" or "Personal". If not provided, the default value is "EIP712".']}),"\n"]}),"\n",(0,o.jsx)(n.h3,{id:"get-queryaddresstokenencryptiontokenaaddress",children:"GET /query/address?token=$EncryptionToken&a=$Address"}),"\n",(0,o.jsx)(n.p,{children:"This endpoint returns a boolean value (true or false) based on whether the given address is registered with the provided encryption token."}),"\n",(0,o.jsx)(n.h3,{id:"get-revoketokenencryptiontoken",children:"GET /revoke?token=$EncryptionToken"}),"\n",(0,o.jsx)(n.p,{children:"This endpoint facilitates the removal of a certain encryption token's access by deleting the key-pair from the database. This is particularly useful when a user wishes to revoke access for a specific encryption token."})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>r,a:()=>a});var o=t(7294);const s={},i=o.createContext(s);function a(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);