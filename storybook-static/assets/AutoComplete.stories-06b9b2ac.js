import{j as t,c as A}from"./index-c36107a0.js";import{r as n}from"./index-76fb7be0.js";import{u as te}from"./useClickOutside-ced69aeb.js";import{T as ne}from"./index-7a7bd5ef.js";import{I as re}from"./input-8e8dbd89.js";import{T as O}from"./index-5f85594f.js";import"./_commonjsHelpers-de833af9.js";import"./index-edafa35b.js";import"./index-8d47fad6.js";import"./inheritsLoose-9eefaa95.js";import"./index-d3ea75b5.js";function ae(c,l=300){const[s,r]=n.useState(c);return n.useEffect(()=>{const o=window.setTimeout(()=>{r(c)},l);return()=>{clearTimeout(o)}},[c,l]),s}function se(c,l){const s=l,r=c,o=n.useRef(null),m=n.useRef(null),i=n.useRef(-1),a=n.useRef(2),y=n.useRef(-1),f=n.useRef(-1);return{setScrollbarIndex:d=>{if(r.current!==null&&(o.current=s[0].getBoundingClientRect().height,m.current=r.current.getBoundingClientRect().height),o.current&&m.current&&(i.current=Math.floor(m.current/o.current),y.current=s.length*o.current,f.current=s.length-1),o.current&&m.current){if(y.current<=m.current)return;d<0&&(d=f.current),d>f.current&&(d=0),i.current!==-1&&d>=i.current*(a.current-1)&&(d>=i.current*a.current&&a.current++,d<i.current*a.current&&(r.current.scrollTop=i.current*(a.current-1)*o.current),d===i.current*(a.current-1)&&(a.current--,r.current.scrollTop=i.current*a.current*o.current)),d===0&&a.current>=2&&(a.current=2,r.current.scrollTop=0),d===f.current&&(a.current=Math.floor(s.length/i.current+1),r.current.scrollTop=i.current*a.current*o.current)}}}}const R=c=>{const{inputSize:l,defSize:s,remind:r,onSelect:o,onChange:m,fetchSuggestions:i,renderOption:a,style:y,value:f,disabled:d,debounceTime:L,...M}=c,[x,I]=n.useState(f),[h,T]=n.useState([]),[q,v]=n.useState(!1),[$,S]=n.useState(!1),[p,j]=n.useState(0),[B,g]=n.useState(!1),C=n.useRef(!1),w=n.useRef(null),E=ae(x,L),D=[],_=n.useRef(null),{setScrollbarIndex:z}=se(_,D);function V(){T([])}te(w,()=>{V(),r&&g(!1)}),n.useEffect(()=>{if(E&&C.current){V();const e=i(E);e instanceof Promise?(v(!0),e.then(u=>{v(!1),T(u),u.length>0&&S(!0),r&&u.length!==0?g(!1):g(!0)})):(T(e),e.length>0&&S(!0),r&&e.length!==0?g(!1):g(!0))}else S(!1);j(0)},[E,i]);const N=e=>{const u=h.length-1;e<0&&(e=u),e>u&&(e=0),j(e)},K=e=>{const u=e.target.value.trim();m&&m(u),I(u),C.current=!0},F=e=>{o&&o(e),typeof e=="string"&&I(e),typeof e=="object"&&I(e.value),S(!1),C.current=!1},U=e=>{switch(e.key){case"ArrowUp":N(p-1),z(p-1);break;case"ArrowDown":N(p+1),z(p+1);break;case"Enter":h[p]&&F(h[p]);break;case"Escape":V();break}},G=e=>a?a(e):typeof e=="string"?e:e.value,Q=()=>h.map((e,u)=>{const ee=A("suggestion-item",{"is-active":u===p});return t.jsx(t.Fragment,{children:t.jsx("li",{className:ee,onClick:F.bind(null,e),ref:k=>{k&&D.push(k)},children:G(e)},u)})}),W=()=>t.jsx(t.Fragment,{children:t.jsx(O,{in:$||q,animation:"scale-in-top",timeout:300,onExited:()=>{V()},children:t.jsxs("ul",{className:"sd-suggestion-list",ref:_,children:[q&&t.jsx("div",{className:"icon-loading",children:t.jsx(ne,{icon:"spinner",spin:!0})}),Q()]})})}),Y=()=>t.jsx(t.Fragment,{children:t.jsx(O,{in:B&&C.current&&!q,animation:"scale-in-top",timeout:300,onExited:()=>{r&&g(!1)},children:r&&x?t.jsx("ul",{className:"sd-suggestion-list",children:r?t.jsx("li",{className:"suggestion-remind",children:r}):t.jsx(t.Fragment,{})}):t.jsx(t.Fragment,{})})}),Z=()=>{const e=A("sd-auto-complete",{[`auto-complete-size-${l}`]:l}),u={width:`${s==null?void 0:s.width}`,height:`${s==null?void 0:s.height}`,...y};return t.jsx(t.Fragment,{children:t.jsxs("div",{className:e,ref:w,style:s,children:[t.jsx(re,{value:x,style:u,onChange:K,onKeyDown:U,disabled:d,...M}),h.length!==0?W():Y()]})})};return t.jsx(t.Fragment,{children:Z()})};try{autoComplete.displayName="autoComplete",autoComplete.__docgenInfo={description:"",displayName:"autoComplete",props:{inputSize:{defaultValue:null,description:"",name:"inputSize",required:!1,type:{name:"enum",value:[{value:'"lg"'},{value:'"md"'},{value:'"sm"'}]}},defSize:{defaultValue:null,description:"",name:"defSize",required:!1,type:{name:"DefInputSize"}},remind:{defaultValue:null,description:"",name:"remind",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},debounceTime:{defaultValue:null,description:"",name:"debounceTime",required:!1,type:{name:"number"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!1,type:{name:"((item: DataSourceType<{}>) => void)"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"((value: string) => void)"}},fetchSuggestions:{defaultValue:null,description:"",name:"fetchSuggestions",required:!0,type:{name:"(str: string) => DataSourceType<{}>[] | Promise<DataSourceType<{}>[]>"}},renderOption:{defaultValue:null,description:"",name:"renderOption",required:!1,type:{name:"((item: DataSourceType<{}>) => ReactElement<any, string | JSXElementConstructor<any>>)"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"IconProp"}},prepend:{defaultValue:null,description:"",name:"prepend",required:!1,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},append:{defaultValue:null,description:"",name:"append",required:!1,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}}}}}catch{}try{R.displayName="AutoComplete",R.__docgenInfo={description:"",displayName:"AutoComplete",props:{inputSize:{defaultValue:null,description:"",name:"inputSize",required:!1,type:{name:"enum",value:[{value:'"lg"'},{value:'"md"'},{value:'"sm"'}]}},defSize:{defaultValue:null,description:"",name:"defSize",required:!1,type:{name:"DefInputSize"}},remind:{defaultValue:null,description:"",name:"remind",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},debounceTime:{defaultValue:null,description:"",name:"debounceTime",required:!1,type:{name:"number"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!1,type:{name:"((item: DataSourceType<{}>) => void)"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"((value: string) => void)"}},fetchSuggestions:{defaultValue:null,description:"",name:"fetchSuggestions",required:!0,type:{name:"(str: string) => DataSourceType<{}>[] | Promise<DataSourceType<{}>[]>"}},renderOption:{defaultValue:null,description:"",name:"renderOption",required:!1,type:{name:"((item: DataSourceType<{}>) => ReactElement<any, string | JSXElementConstructor<any>>)"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"IconProp"}},prepend:{defaultValue:null,description:"",name:"prepend",required:!1,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},append:{defaultValue:null,description:"",name:"append",required:!1,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}}}}}catch{}const Se={component:R,parameters:{layout:"centered"}},P=["臺北市","新北市","桃園市","臺中市","臺南市","高雄市","新竹縣","苗栗縣","彰化縣","南投縣","雲林縣","嘉義縣","屏東縣","宜蘭縣","花蓮縣","臺東縣","澎湖縣","金門縣","連江縣","基隆市","新竹市","嘉義市"],ue=c=>(console.log(P.filter(l=>l.includes(c))),P.filter(l=>l.includes(c)).map(l=>({value:l}))),b={render:()=>t.jsx(R,{inputSize:"md",defSize:{width:"500px",height:"40px"},remind:"查無此地名",fetchSuggestions:ue,placeholder:"臺灣地名"})};var J,X,H;b.parameters={...b.parameters,docs:{...(J=b.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <AutoComplete inputSize="md" defSize={{
    width: '500px',
    height: '40px'
  }} remind="查無此地名" fetchSuggestions={handleFetch} placeholder="臺灣地名" />
}`,...(H=(X=b.parameters)==null?void 0:X.docs)==null?void 0:H.source}}};const Ce=["Example"];export{b as Example,Ce as __namedExportsOrder,Se as default};
//# sourceMappingURL=AutoComplete.stories-06b9b2ac.js.map