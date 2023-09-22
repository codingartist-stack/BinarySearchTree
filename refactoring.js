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
      return new Node(arr[0]);
    }
    const mid = Math.floor(arr.length / 2);
    const parent = new Node(arr[mid]);

    parent.left = buildTree(arr.slice(0, mid));
    parent.right = buildTree(arr.slice(mid + 1));

    return parent;
  }

  const prettyPrint = (node = root, prefix = '', isLeft = true) => {
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

  let root = buildTree(sortedArray);

  const insert = (val, node = root) => {
    if (node == null) {
      node = new Node(val);
      return node;
    }

    if (val < node.data) {
      node.left = insert(val, node.left);
    } else if (val > node.data) {
      node.right = insert(val, node.right);
    }
    return node;
  };

  const remove = (val, node = root) => {
    if (node === null) {
      return node;
    }

    if (node.data > val) {
      node.left = remove(val, node.left);
      return node;
    } else if (node.data < val) {
      node.right = remove(val, node.right);
      return node;
    }

    if (node.left === null) {
      let temp = node.right;
      delete node;
      return temp;
    } else if (node.right === null) {
      let temp = node.left;
      delete node;
      return temp;
    } else {
      let succParent = node;

      let succ = node.right;
      while (succ.left !== null) {
        succParent = succ;
        succ = succ.left;
      }

      if (succParent !== node) {
        succParent.left = succ.right;
      } else {
        succParent.right = succ.right;
      }

      node.data = succ.data;

      delete succ;
      return node;
    }
  };

  const find = (val, node = root) => {
    if (node === null) {
      console.log(`${val} is not found in the tree`);
      return;
    }

    if (node.data == val) {
      return node;
    }

    if (node.data > val) {
      return find(val, node.left);
    } else {
      return find(val, node.right);
    }
  };

  const levelOrder = (node = root) => {
    // breadth-first level order
    if (node === null) {
      return [];
    }

    let values = [];
    let queue = [node];

    while (queue.length > 0) {
      const current = queue.shift();
      values.push(current.data);
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
    return values;
  };

  const inOrder = (node = root) => {
    if (node === null) return node;

    //rewrote the level order function to practice writing it.

    let values = [];
    let queue = [node];

    while (queue.length > 0) {
      const current = queue.shift();
      values.push(current.data);
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
    values.sort(function (a, b) {
      return a - b;
    });

    return values;
  };

  const preOrder = (node = root) => {
    //depth first appoarch
    if (node === null) return node;

    const values = [];
    const stack = [node];

    while (stack.length > 0) {
      const current = stack.pop();
      values.push(current.data);
      if (current.right !== null) {
        stack.push(current.right);
      }
      if (current.left !== null) {
        stack.push(current.left);
      }
    }

    return values;
  };

  const postOrder = (node = root) => {
    if (node === null) return node;

    const values = [];
    const stack = [node];

    while (stack.length > 0) {
      const current = stack.pop();
      values.push(current.data);
      if (current.left !== null) {
        stack.push(current.left);
      }
      if (current.right !== null) {
        stack.push(current.right);
      }
    }

    return values.reverse();
  };

  const height = (node = root) => {
    if (node === null) return node;

    let depth = 0;
    let queue = [];

    queue.push(node);
    queue.push(null);

    while (queue.length > 0) {
      let temp = queue.shift();
      if (temp == null) {
        depth += 1;
      }

      if (temp !== null) {
        if (temp.left !== null) {
          queue.push(temp.left);
        }
        if (temp.right !== null) {
          queue.push(temp.right);
        }
      } else if (queue.length > 0) {
        queue.push(null);
      }
    }

    return depth;
  };

  const depth = (val, node = root) => {
    if (node === null) return 0;

    let edges = 0;
    let stack = [root];

    while (stack.length > 0) {
      let current = stack.shift();
      if (current == null) {
        console.log(`${val} is not found in the tree`);
        return;
      }
      if (current.data == val) {
        return edges;
      }
      if (current.data > val) {
        edges += 1;
        stack.push(current.left);
      } else {
        edges += 1;
        stack.push(current.right);
      }
    }
  };

  const isBalanced = (node = root) => {
    if (node == null) {
      return true;
    }

    let leftHeight = height(node.left);
    let rightHeight = height(node.right);

    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      isBalanced(node.left) == true &&
      isBalanced(node.right) == true
    ) {
      return true;
    }

    return false;
  };

  return {
    prettyPrint,
    insert,
    remove,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
  };
}

let bigArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let smallArray = [2, 4, 6];
let geeksEX = [10, 30, 20, 150, 300, 200, 100];
let num = [3];

let theTree = Tree(bigArray);
theTree.prettyPrint();
theTree.insert(2);
theTree.prettyPrint();
console.log(theTree.isBalanced());
