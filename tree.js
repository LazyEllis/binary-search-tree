import Node from "./node.js";

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sortedArray = [...new Set(array)];
    sortedArray.sort((a, b) =>
      typeof a === "string" ? a.localeCompare(b) : a - b
    );
    return this.buildTreeHelper(sortedArray);
  }

  buildTreeHelper(sortedArray) {
    if (sortedArray.length === 0) return null;
    if (sortedArray.length === 1) return new Node(sortedArray[0]);

    const middleIndex = Math.floor(sortedArray.length / 2);
    const middleValue = sortedArray[middleIndex];
    const leftHalf = sortedArray.slice(0, middleIndex);
    const rightHalf = sortedArray.slice(middleIndex + 1);

    const treeNode = new Node(middleValue);
    treeNode.left = this.buildTreeHelper(leftHalf);
    treeNode.right = this.buildTreeHelper(rightHalf);

    return treeNode;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) return;

    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);

    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value, node = this.root) {
    if (!node) {
      this.root = new Node(value);
      return;
    }

    if (value === node.value) {
      throw new Error("You cannot insert a pre-existing value");
    }

    if (value < node.value) {
      if (!node.left) {
        node.left = new Node(value);
      } else {
        this.insert(value, node.left);
      }
    } else {
      if (!node.right) {
        node.right = new Node(value);
      } else {
        this.insert(value, node.right);
      }
    }
  }

  remove(value, node = this.root) {
    if (!node) return null;

    if (value < node.value) {
      node.left = this.remove(value, node.left);
    } else if (value > node.value) {
      node.right = this.remove(value, node.right);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      const minRight = this.findMin(node.right);
      node.value = minRight.value;
      node.right = this.remove(minRight.value, node.right);
    }

    return node;
  }

  findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  find(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return current;
      current = value < current.value ? current.left : current.right;
    }
    return null;
  }

  levelOrder() {
    if (!this.root) return [];
    const array = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();
      array.push(node.value);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    return array;
  }

  traverseInOrder(node = this.root, array = []) {
    if (!node) return array;
    this.traverseInOrder(node.left, array);
    array.push(node.value);
    this.traverseInOrder(node.right, array);
    return array;
  }

  traversePreOrder(node = this.root, array = []) {
    if (!node) return array;
    array.push(node.value);
    this.traversePreOrder(node.left, array);
    this.traversePreOrder(node.right, array);
    return array;
  }

  traversePostOrder(node = this.root, array = []) {
    if (!node) return array;
    this.traversePostOrder(node.left, array);
    this.traversePostOrder(node.right, array);
    array.push(node.value);
    return array;
  }

  height(node = this.root) {
    if (!node) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(value) {
    return this.depthHelper(this.root, value, 0);
  }

  depthHelper(node, value, depth) {
    if (!node) return -1;
    if (node.value === value) return depth;
    return this.depthHelper(
      value < node.value ? node.left : node.right,
      value,
      depth + 1
    );
  }

  isBalanced() {
    return this.checkBalanced(this.root);
  }

  checkBalanced(node) {
    if (!node) return true;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.checkBalanced(node.left) &&
      this.checkBalanced(node.right)
    );
  }

  rebalance() {
    const array = this.traverseInOrder();
    this.root = this.buildTreeHelper(array);
  }
}

export default Tree;
