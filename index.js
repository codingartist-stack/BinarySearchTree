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
  //mid
  //left
  //right
  array.sort();

  if (array < 2) return array;

  const mid = Math.floor(array.length / 2);
  let left = array.slice(0, mid);
  let right = array.slice(mid);
}
