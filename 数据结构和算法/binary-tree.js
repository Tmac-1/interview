// 参考链接 https://www.cnblogs.com/jpfss/p/11141956.html

//  function TreeNode(x) {
//     this.val = x;
//     this.left = null;
//     this.right = null;
// } 
/**
 * 根据前序遍历和中序遍历重构二叉树
 * 1 前序遍历 先根节点，再左节点，再右节点    前序遍历第一个节点肯定是根节点
 * 2 中序遍历 先左节点，再根节点，再右节点    根节点的左边一定是左子树，右边一定是右子树，同时也分别是左子树和右子树的中序遍历的结果
 * 3 后续遍历 先左节点，再右节点，再根节点    后续遍历的最后一个节点一定是根节点
 * */ 
function reConstructBinaryTree(pre, vin){
   if(!pre.length || !vin.length) return null
   let root = pre[0]  // 获取根节点 next.length - 1
   let index = vin.indexOf(root) // 获取根节点在中序遍历中的索引
   let node = new TreeNode(root)
   let left = vin.slice(0,index)  // 左子树的中序
   let right = vin.slice(index+1) // 右子树的中序
   node.left =  reConstructBinaryTree(pre.slice(1,index+1),left) // pre.slice(1,index+1) 的第一位是根节点 next.slice(0,index)
   node.right = reConstructBinaryTree(pre.slice(index+1),right) // pre.slice(1,index+1) 的第一位是根节点 next.slice(index,next.length-1)
   return node
}