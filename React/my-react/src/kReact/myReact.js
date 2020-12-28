function createElement(type,props,...children){
    
    console.log('createElement',...arguments)
    // props.children = children;
    // let vtype;
    // if(typeof type === 'string'){
    //     vtype = 1;
    // }
    // if(typeof type === 'function'){
    //     vtype = type.isReactComponent ? 2 : 3
    // }
    // return {
    //     vtype,
    //     type,
    //     props
    // }
    return {
        type,
        props:{
            ...props,
            children
        }
    }
}

class Component {
    static isReactComponent = {};
    constructor(props){
        this.props = props;
    }
}

function render(vnode,container){
   container.innerHTML = `<pre>${JSON.stringify(vnode,null,2)}</pre>`
}

export default {
    createElement,
    render
}

/**
 * webpack+babel编译时，替换jsx为React.createElement(type,props,...children)
 * 所有React.createElement执行结束后得到一个js对象即vdom，它能够完整描述dom结构
 * React.render(vdom,container)可以将vdom转换成dom并追加到container中
 * 实际上，转换过程需要经过一个diff过程，比对实际更新补丁操作dom
 * */ 

/**
 * 为什么setState只有在React合成事件和生命周期中是异步的，
 * 在原生事件和setTimeout、setInterval、addEventListener中是同步的
 * 
 * 原生事件绑定不会通过合成事件的方式处理，自然也不会进入更新事务的处理流程
 * setTimeout也一样，setTimeout回调执行已完成了原更新组件流程，也不会再进入异步更新流程，
 * 其结果自然是同步的了
 * */  

/**
 * setState总结
 * 
 * setState()执行时，updater会将partialState添加到它维护的pendingStates中，等到
 * updateComponent负责合并pendingStates中所有的state变成一个state
 * forceUpdate执行新旧vdom比对diff以及实际更新操作
 * */  