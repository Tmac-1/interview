function render(vnode,container) {
    console.log("render",vnode)
    mount(vnode,container)
}

// vnode -> node
function mount(vnode, container) {
   const {vtype} = vnode;
   if(!vtype){
     mountTextNode(vnode,container) //处理文本节点
   }
   if(vtype==1){
     mountHtml(vnode,container)
   }
   if(vtype==2){
     mountClass(vnode,container)
   }
   if(vtype==3){
     mountFunc(vnode,container)
   }
}

// 处理文本节点
function mountTextNode(vnode,container){
    const node = document.createTextNode(vnode)
    container.appendChild(node)
}

// 处理原生标签
function mountHtml(vnode,container){
    const {type,props} = vnode;
    const node = document.createElement(type);
    const {children,...rest} = props;
    children.map(item=>{
        mount(item,node)
    })
    Object.keys(rest).map(item=>{
      if(item == 'className'){
         node.setAttribute("class",rest[item])
      }
      if(item.slice(0,2)=='on'){
         node.addEventListener('click',rest[item])
      }
    })
    container.appendChild(node)
}

// 处理函数组件
function mountFunc(vnode,container){
    const { type , props } = vnode;
    const node = new type(props);
    mount(node,container)
}

// 处理Class组件
function mountClass(vnode,container){
    const { type , props } = vnode;
    const cmp = new type(props);
    const node = cmp.render()
    mount(node,container)
}


export default {
    render
}





