function Tree(array) {
  const removeDuplicates = (arr) => new Float64Array(new Set(arr));
  const sortedArray = removeDuplicates(array).sort(function (a, b) {
    return a - b;
  });

  const root = buildTree(sortedArray);

  function TreeNode(data, left = null, right = null) {
    function insert(val) {
      if (val < data) {
        if (left === null) {
          left = TreeNode(val);
        } else {
          left.insert(val);
        }
      } else {
        if (right === null) {
          right = TreeNode(val);
        } else {
          right.insert(val);
        }
      }
    }

    const prettyPrint = (prefix = '', isLeft, isRoot = false) => {
      if (right !== null) {
        right.prettyPrint(
          `${prefix}${isLeft && !isRoot ? '│   ' : '    '}`,
          false
        );
      }
      if (isRoot) {
        console.log(`${data}`);
      } else {
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${data}`);
      }
      if (left !== null) {
        left.prettyPrint(
          `${prefix}${isLeft || isRoot ? '    ' : '│   '}`,
          true
        );
      }
    };

    return {
      data,
      getLeft: () => left,
      setLeft: (node) => {
        left = node;
      },
      getRight: () => right,
      setRight: (node) => {
        right = node;
      },
      insert,
      prettyPrint,
    };
  }

  function buildTree(array) {
    if (array.length < 1) return null;
    if (array.length < 2) return TreeNode(array[0]);

    const mid = Math.floor(array.length / 2);
    let left = array.slice(0, mid);
    let right = array.slice(mid + 1);

    let parent = TreeNode(array[mid]);
    parent.setLeft(buildTree(left));
    parent.setRight(buildTree(right));

    return parent;
  }

  const insert = (val) => {
    if (root === null) {
      root = TreeNode(val);
    } else {
      root.insert(val);
    }
  };

  const find = (val, node = root) => {
    if (node === null) {
      return null;
    }

    if (node.data === val) return node;

    if (node.data > val) {
      return find(val, node.getLeft());
    } else {
      return find(val, node.getRight());
    }
  };

  //delete leaf -> make parent.left/right equal to null
  //delete node with one child -> replace with child
  //delete node with two children -> find the next biggest(right subtree) and replace it with node
  const deleteNode = (node) => {
    //call find from here
    let value = find(node);

    if (value === null) {
      return null;
    }

    // console.log(value.getLeft());
    // console.log(value.getRight());

    if (value.getLeft() === null) {
      let temp = value.getRight();
      delete value;
      return temp;
    } else {
      return root;
    }
  };

  const prettyPrint = () => {
    root?.prettyPrint('', true, true);
  };

  return {
    insert,
    prettyPrint,
    contains: (val) => find(val) !== null,
    deleteNode,
  };
}

let testArray = [7, 55, 88, 22, 9, 5, 7, 9, 67, 6345, 324, 78];

const tree = Tree(testArray);
console.log(tree.contains(5));
console.log(JSON.stringify(tree.deleteNode(5)));
console.log(tree.prettyPrint());
