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

  var root = null;

  function buildTree(arr) {
    if (arr.length < 1) return null;
    if (arr.length < 2) return new Node(arr[0]);

    let mid = Math.floor(arr.length / 2);
    let leftArr = arr.slice(0, mid);
    let rightArr = arr.slice(mid + 1);

    let parent = new Node(arr[mid]);

    parent.left = buildTree(leftArr);
    parent.right = buildTree(rightArr);

    return parent;
  }

  let theTree = buildTree(sortedArray);
  console.log(JSON.stringify(theTree));

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

  return {
    prettyPrint,
  };
}

let bigArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let smallArray = [2, 4, 6];

Tree(bigArray);
