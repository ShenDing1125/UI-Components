import{c as x,j as e}from"./index-c36107a0.js";import{r as c,R as v}from"./index-76fb7be0.js";import{r as w}from"./reserveChildrenType-97ca2648.js";import"./_commonjsHelpers-de833af9.js";const h=c.createContext({isUseAlone:!0}),i=l=>{const{defaultIndex:r,className:s,onSelect:m,mode:u,disabled:j,children:N}=l,p=w(N,"object",[]),[b,g]=c.useState(r),q=(n,t)=>{t||(g(n),m&&m(n))},V=x("sd-tab-nav",{"tab-nav-line":u==="line","tab-nav-card":u==="card"}),C={disabled:j,isUseAlone:!1},S=()=>v.Children.map(p,(n,t)=>{const f=n,{label:A,disabled:y}=f.props,{displayName:F}=f.type,R=x("tab-nav-item",{"is-active":b===t,disabled:y});if(F==="TableItem")return e.jsx(e.Fragment,{children:e.jsx("li",{className:R,onClick:()=>{q(t,y)},children:A},`nav-item-${t}`)});console.error("Warring: Table has a child which is not a TableItem component")}),E=()=>v.Children.map(p,(n,t)=>t===b&&n);return e.jsx(e.Fragment,{children:e.jsxs("div",{className:s,children:[e.jsx("ul",{className:V,children:S()}),e.jsx("div",{className:"sd-tab-content",children:e.jsx(h.Provider,{value:C,children:E()})})]})})};i.defaultProps={defaultIndex:0,mode:"line"};try{i.displayName="Table",i.__docgenInfo={description:"",displayName:"Table",props:{defaultIndex:{defaultValue:{value:"0"},description:"",name:"defaultIndex",required:!1,type:{name:"number"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!1,type:{name:"((selectedIndex: number) => void)"}},mode:{defaultValue:{value:"line"},description:"",name:"mode",required:!1,type:{name:"enum",value:[{value:'"line"'},{value:'"card"'}]}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}}}}}catch{}try{table.displayName="table",table.__docgenInfo={description:"",displayName:"table",props:{defaultIndex:{defaultValue:{value:"0"},description:"",name:"defaultIndex",required:!1,type:{name:"number"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!1,type:{name:"((selectedIndex: number) => void)"}},mode:{defaultValue:{value:"line"},description:"",name:"mode",required:!1,type:{name:"enum",value:[{value:'"line"'},{value:'"card"'}]}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}}}}}catch{}const o=({children:l,disabled:r})=>{const s=c.useContext(h);if(s.disabled&&(r=!0),s.isUseAlone)console.error("Warring: MenuItem can not be used alone");else return e.jsx(e.Fragment,{children:e.jsx("div",{className:"sd-tab-item",children:l})})};o.displayName="TableItem";try{o.displayName="TableItem",o.__docgenInfo={description:"",displayName:"TableItem",props:{label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string | ReactElement<any, string | JSXElementConstructor<any>>"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}}}}}catch{}const a=i;a.Item=o;try{a.displayName="TransTable",a.__docgenInfo={description:"",displayName:"TransTable",props:{defaultIndex:{defaultValue:null,description:"",name:"defaultIndex",required:!1,type:{name:"number"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!1,type:{name:"((selectedIndex: number) => void)"}},mode:{defaultValue:null,description:"",name:"mode",required:!1,type:{name:"enum",value:[{value:'"line"'},{value:'"card"'}]}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}}}}}catch{}const J={component:a,parameters:{layout:"centered"}},d={render:()=>e.jsx(e.Fragment,{children:e.jsxs("div",{style:{position:"relative",width:"320px"},children:[e.jsx("div",{style:{position:"absolute",left:"0"},children:e.jsxs(a,{mode:"card",children:[e.jsx(a.Item,{label:"1"}),e.jsx(a.Item,{label:"2"}),e.jsx(a.Item,{label:"3"})]})}),e.jsx("div",{style:{position:"absolute",right:"0"},children:e.jsxs(a,{mode:"line",children:[e.jsx(a.Item,{label:"1"}),e.jsx(a.Item,{label:"2"}),e.jsx(a.Item,{label:"3"})]})})]})})};var T,I,_;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <>\r
            <div style={{
      position: 'relative',
      width: '320px'
    }}>\r
                <div style={{
        position: 'absolute',
        left: '0'
      }}>\r
                    <TransTable mode="card">\r
                        <TransTable.Item label="1" />\r
                        <TransTable.Item label="2" />\r
                        <TransTable.Item label="3" />\r
                    </TransTable>\r
                </div>\r
                <div style={{
        position: 'absolute',
        right: '0'
      }}>\r
                    <TransTable mode="line">\r
                        <TransTable.Item label="1" />\r
                        <TransTable.Item label="2" />\r
                        <TransTable.Item label="3" />\r
                    </TransTable>\r
                </div>\r
            </div>\r
        </>
}`,...(_=(I=d.parameters)==null?void 0:I.docs)==null?void 0:_.source}}};const M=["Example"];export{d as Example,M as __namedExportsOrder,J as default};
//# sourceMappingURL=Table.stories-d31529ad.js.map
