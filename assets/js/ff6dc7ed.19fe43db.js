"use strict";(self.webpackChunkobscuro_docs=self.webpackChunkobscuro_docs||[]).push([[907],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>g});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=c(n),m=a,g=p["".concat(l,".").concat(m)]||p[m]||d[m]||o;return n?r.createElement(g,s(s({ref:t},u),{},{components:n})):r.createElement(g,s({ref:t},u))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:a,s[1]=i;for(var c=2;c<o;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5052:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=n(7462),a=(n(7294),n(3905));const o={sidebar_position:1},s="Explore Contracts in Obscuro",i={unversionedId:"getting-started/for-developers/explore-contracts-in-obscuro",id:"getting-started/for-developers/explore-contracts-in-obscuro",title:"Explore Contracts in Obscuro",description:"Obscuro offers a distinct environment for smart contract development, differing slightly from traditional Solidity. This guide elucidates these nuances:",source:"@site/docs/getting-started/for-developers/explore-contracts-in-obscuro.md",sourceDirName:"getting-started/for-developers",slug:"/getting-started/for-developers/explore-contracts-in-obscuro",permalink:"/obscuro-documentation/docs/getting-started/for-developers/explore-contracts-in-obscuro",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/getting-started/for-developers/explore-contracts-in-obscuro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"For Developers",permalink:"/obscuro-documentation/docs/category/for-developers"},next:{title:"Set Up Dev Environment",permalink:"/obscuro-documentation/docs/getting-started/for-developers/setup-dev-env"}},l={},c=[{value:"1. Accessing Storage Values",id:"1-accessing-storage-values",level:2},{value:"Ethereum&#39;s Transparency Challenge",id:"ethereums-transparency-challenge",level:3},{value:"Obscuro&#39;s Privacy Solution",id:"obscuros-privacy-solution",level:3},{value:"2. Access Control for Functions",id:"2-access-control-for-functions",level:2},{value:"Access Control Using <code>require</code>",id:"access-control-using-require",level:3},{value:"3. Event Visibility",id:"3-event-visibility",level:2},{value:"4. Secure Random Number Generation in Obscuro",id:"4-secure-random-number-generation-in-obscuro",level:2},{value:"Challenges with On-Chain Randomness",id:"challenges-with-on-chain-randomness",level:3},{value:"Obscuro&#39;s Solution",id:"obscuros-solution",level:3},{value:"5. Gas Consumption",id:"5-gas-consumption",level:2}],u={toc:c},p="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"explore-contracts-in-obscuro"},"Explore Contracts in Obscuro"),(0,a.kt)("p",null,"Obscuro offers a distinct environment for smart contract development, differing slightly from traditional Solidity. This guide elucidates these nuances:"),(0,a.kt)("h2",{id:"1-accessing-storage-values"},"1. Accessing Storage Values"),(0,a.kt)("p",null,"While both Ethereum and Obscuro allow easy access to public variables, their handling of private variables differs significantly, highlighting Ethereum's transparency challenges and Obscuro's privacy solutions."),(0,a.kt)("h3",{id:"ethereums-transparency-challenge"},"Ethereum's Transparency Challenge"),(0,a.kt)("p",null,"In Ethereum, private variables are intended to be accessed solely through functions. However, due to Ethereum's transparent nature, a workaround exists using the ",(0,a.kt)("inlineCode",{parentName:"p"},"getStorageAt")," function. This method can bypass the designated functions, making true private data storage unattainable."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Example"),":\nAccessing a private variable in Ethereum:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-solidity"},"uint256 value = eth.getStorageAt(contractAddress, position);\n")),(0,a.kt)("h3",{id:"obscuros-privacy-solution"},"Obscuro's Privacy Solution"),(0,a.kt)("p",null,"To address Ethereum's privacy shortcomings, Obscuro has disabled the ",(0,a.kt)("inlineCode",{parentName:"p"},"getStorageAt")," function. This ensures that private variables can only be accessed via their associated functions, providing genuine programmable privacy."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Example"),":\nAccessing a private variable in Obscuro:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-solidity"},"private uint256 privateVariable;\n\nfunction getPrivateVariable() public view returns (uint256) {\n    return privateVariable;\n}\n")),(0,a.kt)("p",null,"In summary, while Ethereum's transparency poses challenges for true data privacy, Obscuro offers a robust solution by ensuring that private data remains genuinely private."),(0,a.kt)("h2",{id:"2-access-control-for-functions"},"2. Access Control for Functions"),(0,a.kt)("p",null,"In smart contract development, it's essential to ensure that only authorized entities can access certain functions. This is achieved using access control mechanisms."),(0,a.kt)("h3",{id:"access-control-using-require"},"Access Control Using ",(0,a.kt)("inlineCode",{parentName:"h3"},"require")),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"require")," statement in Solidity is a straightforward way to enforce access control. It checks a condition, and if the condition is not met, the function execution stops, and an optional error message is thrown."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Example"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-solidity"},'address owner = msg.sender;\n\nfunction restrictedFunction() public {\n    require(msg.sender == owner, "Only the owner can call this function.");\n    // Rest of the function logic\n}\n')),(0,a.kt)("p",null,"This example ensures that only the contract's owner can call the ",(0,a.kt)("inlineCode",{parentName:"p"},"restrictedFunction"),"."),(0,a.kt)("h2",{id:"3-event-visibility"},"3. Event Visibility"),(0,a.kt)("p",null,"Obscuro has specific event visibility rules:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Lifecycle events without an address parameter are public."),(0,a.kt)("li",{parentName:"ul"},"Events with an address parameter related to an account are private.")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Example"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-solidity"},"// Public event on Obscuro\nevent LifecycleEvent(uint256 indexed value);\n\n// Private event on Obscuro\nevent AccountEvent(address indexed account, uint256 value);\n")),(0,a.kt)("h2",{id:"4-secure-random-number-generation-in-obscuro"},"4. Secure Random Number Generation in Obscuro"),(0,a.kt)("p",null,"Random number generation on blockchains is challenging due to timing, delay, complexity, and fees. Obscuro offers a unique, immediate, and secure solution."),(0,a.kt)("h3",{id:"challenges-with-on-chain-randomness"},"Challenges with On-Chain Randomness"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("strong",{parentName:"li"},"Timing"),": If block producers predict randomness, they can manipulate results."),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("strong",{parentName:"li"},"Delay"),": Many solutions introduce a delay, affecting user experience."),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("strong",{parentName:"li"},"Complexity & Fees"),": Solutions like oracles add overhead and costs.")),(0,a.kt)("h3",{id:"obscuros-solution"},"Obscuro's Solution"),(0,a.kt)("p",null,"Obscuro nodes run on secure enclave's, ensuring:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Immediate Randomness"),": No delays."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Unpredictability"),": Random numbers are based on an inaccessible private seed."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Simplicity & No Extra Fees"),": Every transaction gets its random seed.")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Example"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-solidity"},"function getRandomNumber() public view returns (uint256) {\n    return uint256(blockhash(block.number - 1));\n}\n")),(0,a.kt)("p",null,"Obscuro's approach ensures secure and straightforward random number generation."),(0,a.kt)("h2",{id:"5-gas-consumption"},"5. Gas Consumption"),(0,a.kt)("p",null,"Gas consumption is a vital consideration in smart contract development. On Obscuro, it's essential to optimize your contract functions to ensure efficient gas usage. Always test your contracts in a simulated environment before deploying to gauge gas consumption."))}d.isMDXComponent=!0}}]);