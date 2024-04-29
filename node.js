/**
 * Class representing a node in a binary search tree.
 */
class Node {
  /**
   * Create a new Node.
   * @param {*} value - The value to be stored in the node. Defaults to null.
   */
  constructor(value = null) {
    this.value = value; // Store the value in the node
    this.left = null; // Initialize the left pointer to null
    this.right = null; // Initialize the right pointer to null
  }
}

export default Node;
