
import { TEXT, PLACEMENT, UPDATE, DELETION } from "./const";

// 下一个单元任务 fiber
let nextUnitWork = null;
// work in progress fiber root (正在执行的根fiber)
let wipRoot = null;
// 当前的根节点
let currentRoot = null;
// work in progress fiber  (正在执行的fiber)
let wipFiber = null;

let deletions = null;

/**
 * fiber架构
 * type：标记节点类型
 * key：标记当前层级的唯一性
 * index：记录当前fiber在当前层级下的下标
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
    },
    base: currentRoot
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
  updateNode(node, {}, props);
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
  console.log('updateFunctionComponent',fiber)
}

// 更新属性值，如className、nodeValue等
function updateNode(node, prevVal, nextVal) {
  // console.log('node nextVal',node,nextVal, Object.keys(nextVal))
  /**
   *  如果说prevVal,nextVal里有相同的属性值，这个时候不用管
   *  如果prevVal里有,nextVal没有，需要遍历prevVal执行删除操作
   *  如果说prevVal里没有，nextVal有，这个时候不用管
   * */
  Object.keys(prevVal)
    .filter(k => k !== "children")
    .forEach(k => {
      // 合成事件，先模拟，源码中用了事件代理
      if (k.slice(0, 2) === 'on') {
        let eventName = k.slice(2).toLowerCase();
        node.removeEventListener(eventName, prevVal[k])
      } else {
        if (!(k in nextVal)) {
          node[k] = ""
        }
      }
    });
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
function reconcileChildren_old2(workInProgressFiber, children) {
  // console.log('workInProgressFiber',workInProgressFiber,children)
  //  构建fiber架构
  let prevSlibling = null;
  //  获取老的fiber的第一个子节点
  let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    let newFiber = null;
    // 复用的前提是key和type相同，这里我们先不考虑key
    const sameType = child && oldFiber && child.type === oldFiber.type;
    if (sameType) {
      // 类型相同，复用
      newFiber = {
        type: child.type,
        props: child.props,
        node: oldFiber.node,
        base: oldFiber,
        return: workInProgressFiber,
        effectTag: UPDATE,
      }
    }
    if (!sameType && child) {
      // 创建一个新的fiber
      newFiber = {
        type: child.type,
        props: child.props,
        node: null,
        base: null,
        return: workInProgressFiber,
        effectTag: PLACEMENT,
      }
    }
    if (!sameType && oldFiber) {
      // 删除节点
      oldFiber.effectTag = DELETION;
      deletions.push(oldFiber)
    }
    // 链表往后走
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
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
    // console.log('prevSlibling',prevSlibling)
  }
}
function reconcileChildren(returnFiber, newChildren) {
  let previousNewFiber = null;
  // oldfiber的第一个子fiber
  let oldFiber = returnFiber.base && returnFiber.base.child;
  // console.log('oldFiber1',oldFiber,returnFiber,newChildren)
  // 记录上次的插入位置
  let lastPlacedIndex = 0;
  // 做累加，遍历newChildren数组
  let newIdx = 0;
  // oldFiber的中转，记录下个oldFiber
  let nextOldFiber = null;
  let shouldTrackSideEffects = true;
  if (!oldFiber) {
    //  初次渲染
    shouldTrackSideEffects = false
  }
  //1. 更新阶段
  for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
    let newChild = newChildren[newIdx];
    // 判断相对位置
    // console.log('oldFiber',oldFiber)
    if (oldFiber.index > newIdx) {
      nextOldFiber = oldFiber;
      oldFiber = null
    } else {
      nextOldFiber = oldFiber.sibling;
    }
    if (!(newChild.key === oldFiber.key && newChild.type === oldFiber.type)) {
      if (oldFiber === null) {
        oldFiber = nextOldFiber;
      }
      break;
    }
    const newFiber = {
      key: newChild.key,
      type: newChild.type,
      props: newChild.props,
      node: oldFiber.node,
      base: oldFiber,
      return: returnFiber,
      effectTag: UPDATE,
    }
    lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx, shouldTrackSideEffects)
    if (previousNewFiber === null) {
      returnFiber.child = newFiber
    } else {
      previousNewFiber.sibling = newFiber
    }
    previousNewFiber = newFiber
    oldFiber = nextOldFiber;
  }
  if (newIdx === newChildren.length) {
    // We've reached the end of the new children. We can delete the rest.
    // deleteRemainingChildren(returnFiber, oldFiber);
    // return resultingFirstChild;
    while (oldFiber) {
      deletions.push({
        ...oldFiber,
        effectTag: DELETION
      });
      oldFiber = oldFiber.sibling;
    }
  }

  //2. 新增fiber 老链表已经遍历完
  if (oldFiber === null) {
    for (; newIdx < newChildren.length; newIdx++) {
      let newChild = newChildren[newIdx];
      // console.log('newChild',newChild)
      const newFiber = {
        key:newChild.key,
        type: newChild.type,
        props: newChild.props,
        node: null,
        base: null,
        return: returnFiber,
        effectTag: PLACEMENT,
      };
      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx, shouldTrackSideEffects)
      if (previousNewFiber === null) {
        returnFiber.child = newFiber
      } else {
        previousNewFiber.sibling = newFiber
      }
      previousNewFiber = newFiber
    }
    return
  }
  //3. 新老链表都有参数值
  // 生成map图，方便链表查找、设置和删除
  const existingChildren = mapRemainingChildren(returnFiber, oldFiber)
  for (; newIdx < newChildren.length; newIdx++) {
    let newChild = newChildren[newIdx];
    let newFiber = {
      key: newChild.key,
      type: newChild.type,
      props: newChild.props,
      return: returnFiber,
      // node: null,
      // base: null,
      // effectTag: PLACEMENT,
    };
    // 判断新增还是复用
    let matchedFiber = existingChildren.get(newChild.key === null ? newIdx : newChild.key)
    if (matchedFiber) {
      newFiber = {
        ...newFiber,
        node: matchedFiber.node,
        base: matchedFiber,
        effectTag: UPDATE,
      };
      // 找到就要删除链表上的元素，防止重复查找
      shouldTrackSideEffects && existingChildren.delete(newChild.key === null ? newIdx : newChild.key)
    } else {
      newFiber = {
        ...newFiber,
        node: null,
        base: null,
        effectTag: PLACEMENT,
      };
    }
    lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx, shouldTrackSideEffects)
    if (previousNewFiber === null) {
      returnFiber.child = newFiber
    } else {
      previousNewFiber.sibling = newFiber
    }
    previousNewFiber = newFiber
  }
  if(shouldTrackSideEffects){
    existingChildren.forEach(child=>deletions.push({...child,effectTag:DELETION}))
  }
}

function mapRemainingChildren(returnFiber, currentFirstChild) {
  // Add the remaining children to a temporary map so that we can find them by
  // keys quickly. Implicit (null) keys get added to this set with their index
  // instead.
  const existingChildren = new Map();

  let existingChild = currentFirstChild;
  while (existingChild) {
    if (existingChild.key !== null) {
      existingChildren.set(existingChild.key, existingChild);
    } else {
      existingChildren.set(existingChild.index, existingChild);
    }
    existingChild = existingChild.sibling;
  }
  return existingChildren;
}

function placeChild(newFiber, lastPlacedIndex, newIdx, shouldTrackSideEffects) {
  newFiber.index = newIdx;
  if (!shouldTrackSideEffects) {
    // 初次渲染
    return lastPlacedIndex
  }
  // 界面更新阶段，但是这里的fiber有可能新增或者更新
  let base = newFiber.base;
  if (base !== null) {
    // 复用oldFiber
    let oldIndex = base.index;
    if (oldIndex < lastPlacedIndex) {
      return lastPlacedIndex
    } else {
      return oldIndex
    }
  } else {
    // 证明是新插入的节点
    newFiber.effectTag = PLACEMENT;
    return lastPlacedIndex
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
  // console.log('updateHostComponent---', fiber)
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
  let nextFiber = fiber;
  while (nextFiber) {
    // 找到兄弟
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    /**
     * 没有兄弟 往祖先上找 直到return为underfined，
     * performUnitOfWork函数默认返回underfined,nextUnitWork=underfined,workLoop循环终止
     * */
    nextFiber = nextFiber.return;
  }
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
  deletions && deletions.forEach(commitWorker)
  commitWorker(wipRoot.child)
  currentRoot = wipRoot;
  wipRoot = null
}


function getHostSibling(fiber) {
  let sibling = fiber.return.child;
  while (sibling) {
    if (fiber.index + 1 === sibling.index && sibling.effectTag === UPDATE) {
      return sibling.stateNode;
    }
    sibling = sibling.sibling;
  }

  return null;
}
function insertOrAppend(fiber,parentNode){
  let berfore = getHostSibling(fiber);
  let node = fiber.node;
  if(berfore){
    parentNode.insertBefore(node,berfore)
  }else{
    parentNode.appendChild(node)
  }
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
    // 新增插入(dom 父子关系插入)
    // parentNode.appendChild(fiber.node)
    insertOrAppend(fiber,parentNode)
  } else if (fiber.effectTag === UPDATE && fiber.node != null) {
    // 更新插入
    updateNode(fiber.node, fiber.base.props, fiber.props)
  } else if (fiber.effectTag === DELETION && fiber.node != null) {
    // 删除
    commitDeletions(fiber, parentNode)
  }
  commitWorker(fiber.child)
  commitWorker(fiber.sibling)
}

function commitDeletions(fiber, parentNode) {
  if (fiber.node) {
    parentNode.removeChild(fiber.node)
  } else {
    // 因为有些fiber没有node节点，如Consumer
    commitDeletions(fiber.child, parentNode)
  }
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
  hook.queue.forEach(action => (hook.state = action))
  const setState = (action) => {
    hook.queue.push(action);
    wipRoot = {
      node: currentRoot.node,
      props: currentRoot.props,
      base: currentRoot
    }
    nextUnitWork = wipRoot
    deletions = []
    // console.log(111)
  }
  wipFiber.hooks.push(hook)
  wipFiber.hooksIndex++
  return [hook.state, setState]
}

export default { render };
