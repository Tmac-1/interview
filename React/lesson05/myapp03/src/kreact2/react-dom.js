
import { TEXT, PLACEMENT } from "./const";

// 下一个单元任务 fiber
let nextUnitWork = null;
// work in progress fiber root (正在执行的根fiber)
let wipRoot = null;
// 当前的根节点
let currentRoot = null;
// work in progress fiber  (正在执行的fiber)
let wipFiber = null;



/**
 * fiber架构
 * type：标记节点类型
 * key：标记当前层级的唯一性
 * child：第一个子元素 fiber
 * sibling：下一个兄弟元素
 * return：父fiber
 * node：真实dom节点
 * props：属性值
 * base: 上次的节点 fiber （用于比较新旧节点）
 * effectTag：标记要执行的操作类型（删除、插入、更新）
 * */

// ! vnode  虚拟dom对象
// ! node  真实dom

function render(vnode, container) {
  // vnode->node
  // const node = createNode(vnode);
  // // 再把node插入container
  // container.appendChild(node);
  console.log("vnode1", vnode, container); //sy-log

  // 初始值
  wipRoot = {
    node: container,
    props: {
      children: [vnode]
    }
  };
  nextUnitWork = wipRoot
}

// 创建node
function createNode(vnode) {
  // console.log('createNode',vnode)
  const { type, props } = vnode;
  let node = null;
  // 判断节点类型
  if (type === TEXT) {
    node = document.createTextNode("");
    // console.log('node',node,props)
  } else if (typeof type === "string") {
    node = document.createElement(type);
  } else if (typeof type === "function") {
    // 判断是函数组件还是类组件
    // console.log('type.prototype.isReactComponent',type.prototype.isReactComponent)
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else {
    node = document.createDocumentFragment();
    // console.log('createDocumentFragment')
  }

  // 把props.children遍历，转成真实dom节点 ，再插入node
  // reconcileChildren(props.children, node);
  // 更新属性节点
  updateNode(node, props);
  return node;
}

// 类组件
// function updateClassComponent(vnode) {
//   const { type, props } = vnode;
//   // console.log('type',type,props)
//   let cmp = new type(props);
//   const vvnode = cmp.render();
//   // 生成node节点
//   const node = createNode(vvnode);
//   return node;
// }
function updateClassComponent(fiber) {
  const { type, props } = fiber;
  // console.log('type',type,props)
  let cmp = new type(props);
  const vvnode = cmp.render();
  const children = [vvnode]
  reconcileChildren(fiber, children)
}


// 函数组件
// function updateFunctionComponent(vnode) {
//   const { type, props } = vnode;
//   const vvnode = type(props);
//   // 生成node节点
//   const node = createNode(vvnode);
//   return node;
// }
function updateFunctionComponent(fiber) {
  wipFiber = fiber
  wipFiber.hooks = []
  wipFiber.hooksIndex = 0
  const { type, props } = fiber;
  const children = [type(props)]
  reconcileChildren(fiber, children)
}

// 更新属性值，如className、nodeValue等
function updateNode(node, nextVal) {
  // console.log('node nextVal',node,nextVal, Object.keys(nextVal))
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      // 合成事件，先模拟，源码中用了事件代理
      if (k.slice(0, 2) === 'on') {
        let eventName = k.slice(2).toLowerCase();
        // console.log('nextVal[k]',nextVal[k])
        node.addEventListener(eventName, nextVal[k])
      } else {
        node[k] = nextVal[k];
      }

      // console.log(node)
    });
}

// ! 源码childrne可以是单个对象或者是数组，我们这里统一处理成了数组（在createElement里）
function reconcileChildren_old(children, node) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    if (Array.isArray(child)) {
      for (let j = 0; j < child.length; j++) {
        render(child[j], node);
      }
    } else {
      render(child, node);
    }
  }
}

// workInProgressFiber Fiber
function reconcileChildren(workInProgressFiber, children) {
  // console.log('workInProgressFiber',workInProgressFiber,children)
  //  构建fiber架构
  let prevSlibling = null;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    // 现在只考虑初次渲染
    // 创建一个新的fiber
    let newFiber = {
      type: child.type,
      props: child.props,
      node: null,
      base: null,
      return: workInProgressFiber,
      effectTag: PLACEMENT,
    }
    // 形成一个链表
    if (i == 0) {
      workInProgressFiber.child = newFiber
    } else {
      prevSlibling.sibling = newFiber
    }
    /**
     * 终于知道为什么第一个元素需要div包裹了，不然第一次循环prevSlibling会null
    */
    prevSlibling = newFiber   
    console.log('prevSlibling',prevSlibling)
  }
}
/**
 * 更新原生节点元素 
 * */ 
function updateHostComponent(fiber) {
  if (!fiber.node) {
    fiber.node = createNode(fiber)
  }
  // 协调子元素
  const { children } = fiber.props;
  reconcileChildren(fiber, children)
  console.log('fiber', fiber)
}

function performUnitOfWork(fiber) {
  // 执行当前任务
  const { type } = fiber
  if (typeof type == 'function') {
    type.prototype.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else {
    // 原生标签  这里给fiber加上了child，或者sibling属性
    updateHostComponent(fiber) 
  }

  // 获取下一个子任务(fiber)
  if (fiber.child) {
    return fiber.child
  }
  // 一个节点的fiber创建完毕，开始寻找上面的节点
  // let nextFiber = fiber;
  // while (nextFiber) {
  //   // 找到兄弟
  //   if (nextFiber.sibling) {
  //     return nextFiber.sibling
  //   }
  //   /**
  //    * 没有兄弟 往祖先上找 直到return为underfined，
  //    * performUnitOfWork函数默认返回underfined,nextUnitWork=underfined,workLoop循环终止
  //    * */ 
  //   nextFiber = nextFiber.return;
  // }
}

function workLoop(deadline) {
  // console.log(111,nextUnitWork )
  // performUnitOfWork(nextUnitWork)
  // 有下一个任务，并且当前帧没有结束
  while (nextUnitWork && deadline.timeRemaining() > 1) {
    // console.log(222)
    // 执行当前任务
    // 获取下一个子任务(fiber)
    nextUnitWork = performUnitOfWork(nextUnitWork)
  }
  if (!nextUnitWork && wipRoot) {
    //  提交
    commitRoot()
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

// 提交
function commitRoot() {
  // console.log(111)
  commitWorker(wipRoot.child)
  currentRoot = wipRoot;
  wipRoot = null
}
function commitWorker(fiber) {
  if (!fiber) return
  // 寻找parentNode 找到最近的有node节点的祖先fiber
  let parentNodeFiber = fiber.return;
  // console.log('parentNodeFiber.node', parentNodeFiber.node)
  while (!parentNodeFiber.node) {
    parentNodeFiber = parentNodeFiber.return
  }
  // console.log('parentNodeFiber',parentNodeFiber)
  const parentNode = parentNodeFiber.node;
  if (fiber.effectTag === PLACEMENT && fiber.node != null) {
    // 新增插入
    parentNode.appendChild(fiber.node)
  }
  commitWorker(fiber.child)
  commitWorker(fiber.sibling)
}


// 初次渲染（用init） 还是更新（在init的基础上更新）
export function useState(init) {
  // 判断有没有老的hook
  const oldHook = wipFiber.base && wipFiber.base.hooks[wipFiber.hooksIndex];
  const hook = oldHook ?
    {
      state: oldHook.state,
      queue: oldHook.queue
    } : { state: init, queue: [] }
  // 更新hook.state 这里模拟一下批量更新
  hook.queue.forEach(action=>(hook.state=action))
  const setState = (action) => {
    hook.queue.push(action);
    wipRoot = {
      node: currentRoot.node,
      props: currentRoot.props,
      base: currentRoot
    }
    nextUnitWork = wipRoot
    // console.log(111)
  }
  wipFiber.hooks.push(hook)
  wipFiber.hooksIndex++
  return [hook.state, setState]
}

export default { render };
