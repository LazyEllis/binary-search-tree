import Tree from "./tree.js";

// Create a binary search tree with an array of values
const values = [10, 5, 15, 3, 7, 12, 18];
const tree = new Tree(values);

// Print the tree
console.log("Binary Search Tree:");
tree.prettyPrint();

// Test insertion
console.log("\nInserting value 8...");
tree.insert(8);
console.log("Tree after insertion:");
tree.prettyPrint();

// Test removal
console.log("\nRemoving value 12...");
tree.remove(12);
console.log("Tree after removal:");
tree.prettyPrint();

// Test finding a value
console.log("\nFinding value 7...");
const foundNode = tree.find(7);
console.log("Node found:", foundNode);

// Test traversals
console.log("\nLevel-order traversal:", tree.traverseLevelOrder());
console.log("In-order traversal:", tree.traverseInOrder());
console.log("Pre-order traversal:", tree.traversePreOrder());
console.log("Post-order traversal:", tree.traversePostOrder());

// Test height and depth
console.log("\nHeight of the tree:", tree.height());
console.log("Depth of value 15:", tree.depth(15));

// Test if the tree is balanced
console.log("\nIs the tree balanced?", tree.isBalanced() ? "Yes" : "No");

// Test rebalancing the tree
console.log("\nRebalancing the tree...");
tree.rebalance();
console.log("Tree after rebalancing:");
tree.prettyPrint();
