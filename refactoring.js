function Tree(array) {
  const removeDuplicates = (arr) => new Float64Array(new Set(arr));
  const sortedArray = removeDuplicates(array).sort(function (a, b) {
    return a - b;
  });

  class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }

  function buildTree(arr) {
    if (arr.length === 0) {
      return null;
    }
    if (arr.length < 2) {
      return new Node(arr);
    }
    const mid = Math.floor(arr.length / 2);
    const parent = new Node(arr[mid]);

    parent.left = buildTree(arr.slice(0, mid));
    parent.right = buildTree(arr.slice(mid + 1));

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
  // do a printTree function to call

  let root = buildTree(sortedArray);

  const insert = (val) => {
    root = insertRecursive(val, root);
    console.log(`updated tree: `);
    prettyPrint(root);
    return;
  };

  function insertRecursive(val, node) {
    if (node == null) {
      node = new Node(val);
      return node;
    }

    if (val < node.data) {
      node.left = insertRecursive(val, node.left);
    } else if (val > node.data) {
      node.right = insertRecursive(val, node.right);
    }

    return node;
  }

  function deleteNode(val) {
    root = deleteValue(val, root);
    prettyPrint(root);
  }

  function deleteValue(val, node) {
    if (node === null) {
      return node;
    }

    if (node.data > val) {
      node.left = deleteNode(val, root.left);
      return node;
    } else if (node.data < val) {
      node.right = deleteNode(val, node.right);
      return node;
    }
  }

  prettyPrint(root);

  return {
    prettyPrint,
    insert,
    deleteNode,
  };
}

let bigArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let smallArray = [2, 4, 6];
let num = [3];

Tree(smallArray).insert(3);
