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

  const prettyPrint = () => {
    root?.prettyPrint('', true, true);
  };

  //insert - case is to insert leaf.
  //if x < node move left
  //else move right

  return {
    insert,
    prettyPrint,
  };
}

let testArray = [7, 55, 88, 22, 9, 5, 7, 9, 67, 6345, 324, 78];

const tree = Tree(testArray);
tree.insert(1);
tree.insert(2);
tree.insert(3);
console.log(tree.prettyPrint());
