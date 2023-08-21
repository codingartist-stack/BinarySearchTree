function Node(data, leftChild = null, rightChild = null) {
  return {
    data,
    leftChild,
    rightChild,
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
  array.sort();
  //remove duplicates

  if (array < 2) return Node(array);

  const mid = Math.floor(array.length / 2);
  let left = array.slice(0, mid);
  let right = array.slice(mid);

  let node = Node(mid);
  node.leftChild = buildTree(left);
  node.rightChild = buildTree(right);

  return node;
}
