import Node from "./node.js";

/**
 * Class representing a binary search tree.
 */
class Tree {
  /**
   * Create a binary search tree.
   * @param {Array} array - The array of values to build the tree from.
   */
  constructor(array) {
    this.root = this.buildTree(array);
  }

  /**
   * Build a binary search tree from a sorted array.
   * @param {Array} array - The sorted array of values.
   * @returns {Node} The root node of the built tree.
   */
  buildTree(array) {
    const sortedArray = [...new Set(array)];
    sortedArray.sort((a, b) =>
      typeof a === "string" ? a.localeCompare(b) : a - b
    );
    return this.buildTreeHelper(sortedArray);
  }

  /**
   * Helper function to recursively build the tree.
   * @param {Array} sortedArray - The sorted array of values.
   * @returns {Node} The root node of the built subtree.
   */
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

  /**
   * Print the tree in a readable format.
   * @param {Node} node - The current node to print.
   * @param {string} prefix - The prefix for indentation.
   * @param {boolean} isLeft - Indicates if the node is left child.
   */
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

  /**
   * Insert a value into the tree.
   * @param {*} value - The value to insert.
   * @param {Node} node - The current node to start insertion.
   */
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

  /**
   * Remove a value from the tree.
   * @param {*} value - The value to remove.
   * @param {Node} node - The current node to start removal.
   * @returns {Node} The root node after removal.
   */
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

  /**
   * Find the minimum value node in the tree.
   * @param {Node} node - The starting node to search from.
   * @returns {Node} The node with the minimum value.
   */
  findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  /**
   * Find a value in the tree.
   * @param {*} value - The value to find.
   * @returns {Node} The node containing the value, or null if not found.
   */
  find(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return current;
      current = value < current.value ? current.left : current.right;
    }
    return null;
  }

  /**
   * Perform a level-order traversal of the tree.
   * @returns {Array} The array of values in level-order.
   */
  traverseLevelOrder() {
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

  /**
   * Perform an in-order traversal of the tree.
   * @param {Node} node - The current node to start traversal.
   * @param {Array} array - The array to store traversal results.
   * @returns {Array} The array of values in in-order traversal.
   */
  traverseInOrder(node = this.root, array = []) {
    if (!node) return array;
    this.traverseInOrder(node.left, array);
    array.push(node.value);
    this.traverseInOrder(node.right, array);
    return array;
  }

  /**
   * Perform a pre-order traversal of the tree.
   * @param {Node} node - The current node to start traversal.
   * @param {Array} array - The array to store traversal results.
   * @returns {Array} The array of values in pre-order traversal.
   */
  traversePreOrder(node = this.root, array = []) {
    if (!node) return array;
    array.push(node.value);
    this.traversePreOrder(node.left, array);
    this.traversePreOrder(node.right, array);
    return array;
  }

  /**
   * Perform a post-order traversal of the tree.
   * @param {Node} node - The current node to start traversal.
   * @param {Array} array - The array to store traversal results.
   * @returns {Array} The array of values in post-order traversal.
   */
  traversePostOrder(node = this.root, array = []) {
    if (!node) return array;
    this.traversePostOrder(node.left, array);
    this.traversePostOrder(node.right, array);
    array.push(node.value);
    return array;
  }

  /**
   * Calculate the height of the tree.
   * @param {Node} node - The current node to calculate height.
   * @returns {number} The height of the tree.
   */
  height(node = this.root) {
    if (!node) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  /**
   * Calculate the depth of a node in the tree.
   * @param {*} value - The value of the node to calculate depth.
   * @returns {number} The depth of the node.
   */
  depth(value) {
    return this.depthHelper(this.root, value, 0);
  }

  /**
   * Calculate the depth of a node in the tree.
   * @param {*} value - The value of the node to calculate depth.
   * @returns {number} The depth of the node.
   */
  depthHelper(node, value, depth) {
    if (!node) return -1;
    if (node.value === value) return depth;
    return this.depthHelper(
      value < node.value ? node.left : node.right,
      value,
      depth + 1
    );
  }

  /**
   * Check if the tree is balanced.
   * @returns {boolean} True if the tree is balanced, false otherwise.
   */
  isBalanced() {
    return this.checkBalanced(this.root);
  }

  /**
   * Check if the subtree rooted at a given node is balanced.
   * @param {Node} node - The root node of the subtree to check.
   * @returns {boolean} True if the subtree is balanced, false otherwise.
   */
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

  /**
   * Rebalance the tree.
   */
  rebalance() {
    const array = this.traverseInOrder();
    this.root = this.buildTreeHelper(array);
  }
}

export default Tree;
