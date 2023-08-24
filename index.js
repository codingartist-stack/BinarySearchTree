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

  //delete leaf -> make parent.left/right equal to null
  //delete node with one child -> replace with child
  //delete node with two children -> find the next biggest(right subtree) and replace it with node
  const deleteNode = (val) => {
    if (root === null) {
      return console.log(`Tree is empty`);
    }
    if (root.data > val) {
      root.getLeft() = deleteNode(root.getLeft());
      return root;
    } else if (root.getRight() < val) {
      root.getRight() = deleteNode(root.getRight());
      return root;
    }

    if (root.getLeft() === null) {
      let temp = root.getRight();
      delete root;
      return temp;
    } else if (root.getRight() === null) {
      let temp = root.getLeft();
      delete root;
      return temp;
    } else {
      let successorParent = root;

      let successor = root.getRight();
      while (successor.getLeft() !== null) {
        successorParent = successor;
        successor = successor.getLeft();
      }

      if (successorParent !== root) {
        successorParent.getLeft() = successor.getRight();
      } else {
        successorParent.getRight() = successor.getRight();
      }

      root.data = successor.data;

      delete successor;
      return root;
    }
  };

  const prettyPrint = () => {
    root?.prettyPrint('', true, true);
  };

  return {
    insert,
    prettyPrint,
    deleteNode,
  };
}

let testArray = [7, 55, 88, 22, 9, 5, 7, 9, 67, 6345, 324, 78];

const tree = Tree(testArray);
tree.deleteNode(5);
console.log(tree.prettyPrint());
