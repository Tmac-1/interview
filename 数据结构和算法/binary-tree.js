// 参考链接 https://www.cnblogs.com/jpfss/p/11141956.html

//  function TreeNode(x) {
//     this.val = x;
//     this.left = null;
//     this.right = null;
// } 
// 根据前序遍历和中序遍历重构二叉树
function reConstructBinaryTree(pre, vin){
   if(!pre.length || !vin.length) return null
   let root = pre[0]
   let index = vin.indexOf(root)
   let node = new TreeNode(root)
   let left = vin.slice(0,index)  // 左子树的中序
   let right = vin.slice(index+1) // 右子树的中序
   node.left =  reConstructBinaryTree(pre.slice(1,index+1),left)
   node.right = reConstructBinaryTree(pre.slice(index+1),right)
   return node
}