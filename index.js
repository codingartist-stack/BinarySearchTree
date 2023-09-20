function Tree(array) {
  const removeDuplicates = (arr) => new Float64Array(new Set(arr));
  const sortedArray = removeDuplicates(array).sort(function (a, b) {
    return a - b;
  });

  const root = buildTree(sortedArray);

  function TreeNode(data, left = null, right = null) {
    const insert = (val) => {
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
    };

    const isLeaf = () => left === null && right === null;

    const remove = (value) => {
      if (data === value) throw new Exception('woah, we shouldnt be here');

      if (value < data) {
        // look in left tree
        if (left.isLeaf()) {
          if (left.data === value) {
            // remove?
            console.log('found it!');
          }
          // otherwise the value doesn't exist in this tree, just return
          return;
        } else {
          // not a leaf! keep going
          left.remove(value);
        }
      } else {
        // look in right tree
        if (right.isLeaf()) {
          if (right.data === value) {
            // remove?
            console.log('found it!');
          }
          return;
        } else {
          right.remove(value);
        }
      }
    };

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
      isLeaf,
      remove,
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
  //  const deleteNode = (val, node = root) => {
  //    //find logic
  //    if (node === null) {
  //      return null;
  //    }
  //
  //    const left = node.getLeft();
  //    const right = node.getRight();
  //
  //    if (left.data === val) {
  //      node.left = null;
  //      return node;
  //    }
  //    if (right.data === val) {
  //      node.right = null;
  //    }
  //
  //    if (val < node.data) {
  //      return deleteNode(val, node.getLeft());
  //    } else {
  //      return deleteNode(val, node.getRight());
  //    }
  //
  //    // look at left node
  //    // null
  //    // if (left === null) {
  //    // }
  //    // found it
  //    // if (left.data === val) {
  //    //   // delete it!
  //    //   left.data = null;
  //    //   return node;
  //    // }
  //
  //    // look at right node
  //    // null
  //    // less than
  //    // greater than
  //  };
  const remove = (value) => {
    root.remove(value);
  };

  const prettyPrint = () => {
    root?.prettyPrint('', true, true);
  };

  return {
    insert,
    prettyPrint,
    contains: (val) => find(val) !== null,
    remove,
  };
}

let testArray = [7, 55, 88, 22, 9, 5, 7, 9, 67, 6345, 324, 78];

const tree = Tree(testArray);
console.log(tree.contains(5));
console.log(JSON.stringify(tree.remove(5)));
console.log(tree.prettyPrint());
