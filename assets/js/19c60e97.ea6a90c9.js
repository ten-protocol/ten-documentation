"use strict";(self.webpackChunkten_docs=self.webpackChunkten_docs||[]).push([[7956],{6102:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>l,frontMatter:()=>i,metadata:()=>c,toc:()=>d});var t=s(5893),o=s(1151);const i={sidebar_position:3},r="Sensitive APIs",c={id:"api-reference/sensitive-apis",title:"Sensitive APIs",description:"Ten supports a subset of Ethereum's JSON-RPC API.",source:"@site/docs/api-reference/sensitive-apis.md",sourceDirName:"api-reference",slug:"/api-reference/sensitive-apis",permalink:"/docs/api-reference/sensitive-apis",draft:!1,unlisted:!1,editUrl:"https://github.com/ten-protocol/ten-documentation/blob/main/docs/api-reference/sensitive-apis.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Debug JSON-RPC API",permalink:"/docs/api-reference/debug-apis"},next:{title:"Troubleshooting",permalink:"/docs/category/troubleshooting"}},a={},d=[{value:"Sensitive JSON-RPC API Methods",id:"sensitive-json-rpc-api-methods",level:2}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...(0,o.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"sensitive-apis",children:"Sensitive APIs"}),"\n",(0,t.jsxs)(n.p,{children:["Ten supports a subset of Ethereum's ",(0,t.jsx)(n.a,{href:"https://ethereum.org/en/developers/docs/apis/json-rpc/",children:"JSON-RPC API"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["Some of these methods deal with sensitive information. For example, the response to an ",(0,t.jsx)(n.code,{children:"eth_getBalance"})," request will\ncontain the balance of an account. An attacker could intercept this response to discover a user's balance. To avoid\nthis, the requests and responses for methods deemed sensitive are encrypted and decrypted by the\n",(0,t.jsx)(n.a,{href:"/docs/tools-infrastructure/hosted-gateway",children:"hosted gateway"}),". To ensure a good user experience, this process is\ninvisible to the end user."]}),"\n",(0,t.jsx)(n.p,{children:"This page details which JSON-RPC API methods are deemed sensitive, and the rules governing who is able to decrypt the\nresponse to a given method call."}),"\n",(0,t.jsx)(n.h2,{id:"sensitive-json-rpc-api-methods",children:"Sensitive JSON-RPC API Methods"}),"\n",(0,t.jsx)(n.p,{children:"Of the methods above, the following are deemed sensitive, and their requests and responses are encrypted in transit:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"eth_call"}),": Response can only be decrypted by the owner of the account in the request's ",(0,t.jsx)(n.code,{children:"from"})," field"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"eth_estimateGas"}),": Response can only be decrypted by the owner of the account in the request's ",(0,t.jsx)(n.code,{children:"from"})," field"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"eth_getBalance"}),": Response can only be decrypted by:","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"For account addresses: The owner of the account"}),"\n",(0,t.jsx)(n.li,{children:"For contract addresses: The owner of the account that deployed the contract"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"eth_getLogs"}),": Response can only be decrypted by the owner of the account, and only includes logs relevant to that\naccount"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"eth_getTransactionByHash"}),": Response can only be decrypted by the signer of the transaction"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"eth_getTransactionCount"}),": Response can only be decrypted by the owner of the address"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"eth_getTransactionReceipt"}),": Response can only be decrypted by the signer of the transaction"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"eth_sendRawTransaction"}),": Response can only be decrypted by the signer of the transaction"]}),"\n"]})]})}function l(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>c,a:()=>r});var t=s(7294);const o={},i=t.createContext(o);function r(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);