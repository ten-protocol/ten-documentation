"use strict";(self.webpackChunkten_docs=self.webpackChunkten_docs||[]).push([[2488],{7248:(e,s,t)=>{t.r(s),t.d(s,{default:()=>l});var n=t(7294),c=t(5893);const l=function(){const[e,s]=(0,n.useState)([]);return(0,n.useEffect)((()=>{fetch("https://api.github.com/repos/ten-protocol/go-ten/releases").then((e=>e.json())).then((e=>s(e)))}),[]),(0,c.jsx)("section",{className:"release-notes",children:e.map((e=>(0,c.jsxs)("article",{className:"release",children:[(0,c.jsx)("h3",{children:e.name}),(0,c.jsx)("ul",{children:e.body.split("\n").map(((e,s)=>(0,c.jsx)("li",{children:e},s)))})]},e.id)))})}}}]);