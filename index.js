function TreeNode(data, left = null, right = null) {
  return {
    data,
    left,
    right,
  };
}

function Tree(array) {
  const root = buildTree(array);
  const getRoot = () => root;
  // rebalance tree
  return {
    getRoot,
  };
}

function buildTree(array) {
  //remove duplicates

  if (array.length < 2) return TreeNode(array[0]);

  const mid = Math.floor(array.length / 2);
  let left = array.slice(0, mid);
  let right = array.slice(mid + 1);

  let parent = TreeNode(array[mid]);
  parent.left = buildTree(left);
  parent.right = buildTree(right);

  return parent;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 2, 78];

testArray.sort(function (a, b) {
  return a - b;
});

console.log(prettyPrint(buildTree(testArray)));
