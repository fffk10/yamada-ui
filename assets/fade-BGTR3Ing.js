import{j as t}from"./jsx-runtime-TtYKBvr-.js";import{A as u}from"./index-GPdqE8CR.js";import{m as v}from"./motion-AgWUVtfu.js";import{f as j}from"./forward-ref-6T0UNPU-.js";import{u as w,a as y}from"./factory-BpP3TutA.js";import{a as A,t as F}from"./utils-g9VGj7JG.js";const P={enter:({transition:a,transitionEnd:e,delay:r,duration:m,enter:c}={})=>({opacity:1,transition:A(a==null?void 0:a.enter)(r,m),transitionEnd:e==null?void 0:e.enter,...c}),exit:({transition:a,transitionEnd:e,delay:r,duration:m,exit:c}={})=>({opacity:0,transition:F(a==null?void 0:a.exit)(r,m),transitionEnd:e==null?void 0:e.exit,...c})},_={initial:"exit",animate:"enter",exit:"exit",variants:P},k=j(({unmountOnExit:a,isOpen:e,transition:r,transitionEnd:m,delay:c,duration:o,className:f,...x},p)=>{const l=e||a?"enter":"exit",s={transition:r,transitionEnd:m,delay:c,duration:o};e=a?e&&a:!0;const i={w:"100%"};return t(u,{custom:s,children:e?t(w.div,{as:v.div,ref:p,className:y("ui-fade",f),custom:s,..._,animate:l,__css:i,...x}):null})});export{k as F,_ as f};
