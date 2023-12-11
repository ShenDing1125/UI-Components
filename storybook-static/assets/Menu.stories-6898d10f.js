import{c as C,j as e}from"./index-c36107a0.js";import{r as y,R as M}from"./index-76fb7be0.js";import{r as F}from"./reserveChildrenType-97ca2648.js";import{T as w}from"./index-34249dab.js";import{T as A}from"./index-5f85594f.js";import"./_commonjsHelpers-de833af9.js";import"./index-edafa35b.js";import"./index-8d47fad6.js";import"./inheritsLoose-9eefaa95.js";import"./index-d3ea75b5.js";const q=y.createContext({index:"0",isUseAlone:!0}),_=r=>{const{className:a,mode:i,style:p,children:d,defaultIndex:f,onSelect:n,defaultOpenSubMenus:u}=r,h=F(d,"object",[]),[l,c]=y.useState(f),o=C("sd-menu",a,{"menu-vertical":i==="vertical","menu-horizontal":i!=="vertical"}),v={index:l||"0",onSelect:m=>{c(m),n&&n(m)},mode:i,defaultOpenSubMenus:u,isUseAlone:!1},S=()=>M.Children.map(h,(m,j)=>{const b=m,{displayName:g}=b.type;if(g==="MenuItem"||g==="SubMenu")return M.cloneElement(b,{index:j.toString()});console.error("Warring: Menu has a child which is not a MenuItem or SubMenu component")});return e.jsx(e.Fragment,{children:e.jsx("ul",{className:o,style:p,children:e.jsx(q.Provider,{value:v,children:S()})})})};_.defaultProps={defaultIndex:"0",mode:"horizontal",defaultOpenSubMenus:[]};try{_.displayName="Menu",_.__docgenInfo={description:"",displayName:"Menu",props:{defaultIndex:{defaultValue:{value:"0"},description:"",name:"defaultIndex",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},mode:{defaultValue:{value:"horizontal"},description:"",name:"mode",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!1,type:{name:"SelectCallback"}},defaultOpenSubMenus:{defaultValue:{value:"[]"},description:"",name:"defaultOpenSubMenus",required:!1,type:{name:"string[]"}}}}}catch{}try{menu.displayName="menu",menu.__docgenInfo={description:"",displayName:"menu",props:{defaultIndex:{defaultValue:{value:"0"},description:"",name:"defaultIndex",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},mode:{defaultValue:{value:"horizontal"},description:"",name:"mode",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!1,type:{name:"SelectCallback"}},defaultOpenSubMenus:{defaultValue:{value:"[]"},description:"",name:"defaultOpenSubMenus",required:!1,type:{name:"string[]"}}}}}catch{}const x=r=>{const{index:a,title:i,className:p,children:d}=r,f=F(d,"object",[]),n=y.useContext(q),u=n.defaultOpenSubMenus,h=a&&n.mode==="vertical"?u.includes(a):!1,[l,c]=y.useState(h),o=C("menu-item sub-menu",p,{"is-active":n.index===a,"is-opened":l,"is-vertical":n.mode==="vertical"}),V=s=>{s.preventDefault(),c(!l)};let v;const S=(s,T)=>{clearTimeout(v),s.preventDefault(),v=setTimeout(()=>{c(T)},300)},m=n.mode==="vertical"?{onClick:V}:{},j=n.mode!=="vertical"?{onMouseEnter:s=>{S(s,!0)},onMouseLeave:s=>{S(s,!1)}}:{},b=()=>{const s=M.Children.map(f,(T,P)=>{const O=T;if(O.type.displayName==="MenuItem")return M.cloneElement(O,{index:`${a}-${P}`});console.error("Warning: SubMenu has a child which is not a MenuItem component")});return e.jsx(e.Fragment,{children:e.jsx(A,{in:l,timeout:300,animation:"scale-in-top",children:e.jsx("ul",{className:"sub-menu-container",children:s})})})},g=()=>{if(n.isUseAlone)console.error("Warring: SubMenu can not be used alone");else return e.jsx(e.Fragment,{children:e.jsxs("li",{className:o,...j,children:[e.jsxs("div",{className:"sub-menu-title",...m,children:[i,e.jsx(w,{icon:"angle-down",className:"arrow-icon",size:"sm"})]}),b()]},a)})};return e.jsx(e.Fragment,{children:g()})};x.defaultProps={title:"Title"};x.displayName="SubMenu";try{x.displayName="SubMenu",x.__docgenInfo={description:"",displayName:"SubMenu",props:{index:{defaultValue:null,description:"",name:"index",required:!1,type:{name:"string"}},title:{defaultValue:{value:"Title"},description:"",name:"title",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const N=r=>{const{index:a,disabled:i,className:p,style:d,children:f}=r,n=y.useContext(q),u=C("menu-item",p,{"is-disabled":i,"is-active":n.index===a}),h=()=>M.Children.map(f,o=>{if(typeof o=="string")return e.jsx(e.Fragment,{children:u.includes("is-disabled")?e.jsx("div",{className:"cursor-default",children:e.jsx("li",{className:u,style:d,onClick:l,children:o})}):e.jsx("li",{className:u,style:d,onClick:l,children:o})});console.error("Warring: The type of MenuItem is not string")}),l=()=>{n.onSelect&&!i&&typeof a=="string"&&n.onSelect(a)},c=()=>{if(n.isUseAlone)console.error("Warring: MenuItem can not be used alone");else return e.jsx(e.Fragment,{children:h()})};return e.jsx(e.Fragment,{children:c()})};N.displayName="MenuItem";try{N.displayName="MenuItem",N.__docgenInfo={description:"",displayName:"MenuItem",props:{index:{defaultValue:null,description:"",name:"index",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}}}}}catch{}const t=_;t.Item=N;t.SubMenu=x;try{t.displayName="TransMenu",t.__docgenInfo={description:"",displayName:"TransMenu",props:{defaultIndex:{defaultValue:null,description:"",name:"defaultIndex",required:!1,type:{name:"string"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},mode:{defaultValue:null,description:"",name:"mode",required:!1,type:{name:"enum",value:[{value:'"horizontal"'},{value:'"vertical"'}]}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"CSSProperties"}},onSelect:{defaultValue:null,description:"",name:"onSelect",required:!1,type:{name:"SelectCallback"}},defaultOpenSubMenus:{defaultValue:null,description:"",name:"defaultOpenSubMenus",required:!1,type:{name:"string[]"}}}}}catch{}const K={component:t,parameters:{layout:"centered"}},I={render:()=>e.jsx(e.Fragment,{children:e.jsxs("div",{style:{position:"relative",width:"320px"},children:[e.jsx("div",{style:{position:"absolute",left:"0"},children:e.jsx(t,{mode:"vertical",children:e.jsxs(t.SubMenu,{title:"vertical",children:[e.jsx(t.Item,{children:"1"}),e.jsx(t.Item,{children:"2"}),e.jsx(t.Item,{children:"3"})]})})}),e.jsx("div",{style:{position:"absolute",right:"0"},children:e.jsx(t,{mode:"horizontal",children:e.jsxs(t.SubMenu,{title:"horizontal",children:[e.jsx(t.Item,{children:"1"}),e.jsx(t.Item,{children:"2"}),e.jsx(t.Item,{children:"3"})]})})})]})})};var z,E,k;I.parameters={...I.parameters,docs:{...(z=I.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <>\r
            <div style={{
      position: 'relative',
      width: '320px'
    }}>\r
                <div style={{
        position: 'absolute',
        left: '0'
      }}>\r
                    <TransMenu mode="vertical">\r
                        <TransMenu.SubMenu title="vertical">\r
                            <TransMenu.Item>1</TransMenu.Item>\r
                            <TransMenu.Item>2</TransMenu.Item>\r
                            <TransMenu.Item>3</TransMenu.Item>\r
                        </TransMenu.SubMenu>\r
                    </TransMenu>\r
                </div>\r
                <div style={{
        position: 'absolute',
        right: '0'
      }}>\r
                    <TransMenu mode="horizontal">\r
                        <TransMenu.SubMenu title="horizontal">\r
                            <TransMenu.Item>1</TransMenu.Item>\r
                            <TransMenu.Item>2</TransMenu.Item>\r
                            <TransMenu.Item>3</TransMenu.Item>\r
                        </TransMenu.SubMenu>\r
                    </TransMenu>\r
                </div>\r
            </div>\r
        </>
}`,...(k=(E=I.parameters)==null?void 0:E.docs)==null?void 0:k.source}}};const Q=["Example"];export{I as Example,Q as __namedExportsOrder,K as default};
//# sourceMappingURL=Menu.stories-6898d10f.js.map
