import{j as e,a as z}from"./jsx-runtime-TtYKBvr-.js";import{u as w}from"./index-c2grodQ_.js";import{r as g}from"./index-IybTgENJ.js";import{b as y}from"./icon-C1O_Nmpw.js";import{u as W}from"./index-IsKhnU0y.js";import{c as O,u as D,a as R,I as S,h as I,o as q}from"./factory-BpP3TutA.js";import{u as G,R as H}from"./use-ripple-XZ8Hx3Ay.js";import{f as J}from"./forward-ref-6T0UNPU-.js";import{u as K}from"./use-component-style-heJEaiUP.js";import{o as Q}from"./theme-provider-RZopMVJP.js";const U=s=>e(y,{viewBox:"0 0 16 16",...s,children:e("path",{fill:"currentColor",d:"M2 8c0-.733.6-1.333 1.333-1.333.734 0 1.334.6 1.334 1.333s-.6 1.333-1.334 1.333C2.6 9.333 2 8.733 2 8zm9.333 0c0-.733.6-1.333 1.334-1.333C13.4 6.667 14 7.267 14 8s-.6 1.333-1.333 1.333c-.734 0-1.334-.6-1.334-1.333zM6.667 8c0-.733.6-1.333 1.333-1.333s1.333.6 1.333 1.333S8.733 9.333 8 9.333 6.667 8.733 6.667 8z"})}),X=s=>e(y,{viewBox:"0 0 16 16",...s,children:e("path",{fill:"currentColor",d:"M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z"})}),Y=s=>e(y,{viewBox:"0 0 16 16",...s,children:e("path",{fill:"currentColor",d:"M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z"})}),$=s=>e(y,{viewBox:"0 0 16 16",...s,children:e("path",{fill:"currentColor",d:"M7.219 8l3.3 3.3-.943.943L5.333 8l4.243-4.243.943.943-3.3 3.3z"})}),n1=s=>e(y,{viewBox:"0 0 16 16",...s,children:e("path",{fill:"currentColor",d:"M8.781 8l-3.3-3.3.943-.943L10.667 8l-4.243 4.243-.943-.943 3.3-3.3z"})}),[e1,t1]=O({strict:!1,name:"PaginationContext"}),p=(s,f)=>Array.from({length:f-s+1},(n,m)=>m+s),s1=({page:s,defaultPage:f=1,total:n,siblings:m=1,boundaries:L=1,isDisabled:a=!1,...r})=>{const c=w(m),i=w(L),[d,t]=W({value:s,defaultValue:f,onChange:r.onChange}),h=g.useCallback(()=>t(1),[t]),x=g.useCallback(()=>t(n),[t,n]),l=g.useCallback(()=>t(o=>o===1?o:o-1),[t]),b=g.useCallback(()=>t(o=>o===n?o:o+1),[t,n]),k=g.useCallback(o=>t(o),[t]),N=g.useMemo(()=>{if(c*2+3+i*2>=n)return p(1,n);const v=Math.max(d-c,i),C=Math.min(d+c,n-i),_=v>i+2,u=C<n-(i+1);if(!_&&u){const M=c*2+i+2;return[...p(1,M),"dots",...p(n-(i-1),n)]}if(_&&!u){const M=i+1+2*c;return[...p(1,i),"dots",...p(n-M,n)]}return[...p(1,i),"dots",...p(v,C),"dots",...p(n-i+1,n)]},[i,c,d,n]);return{currentPage:d,total:n,isDisabled:a,onFirst:h,onLast:x,onPrev:l,onNext:b,onChange:k,range:N}},i1={dots:e(U,{}),next:e(n1,{}),prev:e($,{}),first:e(X,{}),last:e(Y,{})},o1=({className:s,isActive:f,page:n,isDisabled:m,disableRipple:L,children:a,...r})=>{const c=t1(),{onClick:i,...d}=G(r);a??(a=i1[n]??n);const t={position:"relative",overflow:"hidden",userSelect:"none",display:"flex",justifyContent:"center",alignItems:"center",...c.item,...c[n]};return z(D.button,{className:R("ui-pagination__item",s),type:"button",tabIndex:n!=="dots"?0:-1,disabled:m,"data-selected":S(f),"data-disabled":S(m),__css:t,...r,onClick:i,children:[a,e(H,{isDisabled:L||m,...d})]})},g1=J((s,f)=>{const[n,m]=K("Pagination",s),{className:L,component:a=o1,itemProps:r,withControls:c=!0,withEdges:i=!1,innerProps:d,controlProps:t,controlPrevProps:h,controlNextProps:x,edgeProps:l,edgeFirstProps:b,edgeLastProps:k,...N}=Q(m),o=w(c),v=w(i),{currentPage:C,total:_,isDisabled:u,onFirst:M,onLast:A,onPrev:Z,onNext:E,onChange:j,range:B}=s1(N),T=g.useMemo(()=>B.map((P,V)=>e(a,{page:P,isActive:C===P,isDisabled:u,...r,onClick:I(r==null?void 0:r.onClick,P!=="dots"?()=>j(P):void 0)},V)),[a,C,u,j,B,r]),F={display:"flex",alignItems:"center",...n.container};return e(e1,{value:n,children:z(D.div,{ref:f,className:R("ui-pagination",L),role:"navigation",__css:F,...q(N,["page","defaultPage","total","siblings","boundaries","isDisabled","onChange"]),"data-disabled":S(u),children:[v?e(a,{page:"first",className:"ui-pagination__item--first",isDisabled:u||C===1,...l,...b,onClick:I(l==null?void 0:l.onClick,b==null?void 0:b.onClick,M)}):null,o?e(a,{page:"prev",className:"ui-pagination__item--prev",isDisabled:u||C===1,...t,...h,onClick:I(t==null?void 0:t.onClick,h==null?void 0:h.onClick,Z)}):null,e(D.div,{className:"ui-pagination-inner",__css:{display:"flex",justifyContent:"center",alignItems:"center",...n.inner},...d,children:T}),o?e(a,{page:"next",className:"ui-pagination__item--next",isDisabled:u||C===_,...t,...x,onClick:I(t==null?void 0:t.onClick,x==null?void 0:x.onClick,E)}):null,v?e(a,{page:"last",className:"ui-pagination__item--last",isDisabled:u||C===_,...l,...k,onClick:I(l==null?void 0:l.onClick,k==null?void 0:k.onClick,A)}):null]})})});export{g1 as P};
