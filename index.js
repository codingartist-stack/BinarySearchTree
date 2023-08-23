function Tree(array) {
  const removeDuplicates = (arr) => new Float64Array(new Set(arr));
  const sortedArray = removeDuplicates(array).sort(function (a, b) {
    return a - b;
  });

  const root = buildTree(sortedArray);

  function TreeNode(data, left = null, right = null) {
    return {
      data,
      left,
      right,
    };
  }

  function buildTree(array) {
    if (array.length < 2) return TreeNode(array[0]);

    const mid = Math.floor(array.length / 2);
    let left = array.slice(0, mid);
    let right = array.slice(mid + 1);

    let parent = TreeNode(array[mid]);
    parent.left = buildTree(left);
    parent.right = buildTree(right);

    return parent;
  }

  //insert - case is to insert leaf.
  //if x < node move left
  //else move right

  function insert(root, val) {
    if (root === null) {
      root = TreeNode(val);
      return root;
    }

    if (val < root.data) {
      root.left = insert(root.left, val);
    } else {
      root.right = insert(root.right, val);
    }

    return root;
  }

  return {
    root: () => root,
    insert,
  };
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

let testArray = [7, 55, 88, 22, 9, 5, 7, 9, 67, 6345, 324, 78];

const tree = Tree(testArray);
Tree.insert(60);
console.log(prettyPrint(tree.root()));
