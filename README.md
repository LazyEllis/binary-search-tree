# Binary Search Tree

This repository contains a JavaScript implementation of a binary search tree (BST). A BST is a data structure that allows for efficient searching, insertion, and removal operations.

## Table of Contents

- [Introduction](#introduction)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Introduction

A binary search tree is a hierarchical data structure consisting of nodes, where each node has at most two children: a left child and a right child. The key property of a BST is that the value of nodes in the left subtree is less than the value of the root, and the value of nodes in the right subtree is greater than the value of the root. This property allows for efficient search operations.

This repository provides classes for creating and manipulating binary search trees, including functionality for building a tree from an array of values, inserting and removing nodes, traversing the tree in various orders, calculating the height and depth of the tree, checking if the tree is balanced, and rebalancing the tree.

## Usage

To use this BST implementation, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/example/repo.git
   ```

2. Import the `Tree` class into your JavaScript files:

   ```javascript
   import Tree from "./tree.js";
   ```

3. Create a binary search tree with an array of values:

   ```javascript
   const values = [10, 5, 15, 3, 7, 12, 18];
   const tree = new Tree(values);
   ```

4. Use the various methods provided by the `Tree` class to manipulate and traverse the tree.

## API

The `Tree` class provides the following methods:

- `constructor(array)`: Constructs a binary search tree from an array of values.
- `prettyPrint()`: Prints the tree in a readable format.
- `insert(value, node)`: Inserts a value into the tree.
- `remove(value, node)`: Removes a value from the tree.
- `find(value)`: Finds a value in the tree.
- `traverseLevelOrder()`: Performs a level-order traversal of the tree.
- `traverseInOrder(node, array)`: Performs an in-order traversal of the tree.
- `traversePreOrder(node, array)`: Performs a pre-order traversal of the tree.
- `traversePostOrder(node, array)`: Performs a post-order traversal of the tree.
- `height(node)`: Calculates the height of the tree.
- `depth(value)`: Calculates the depth of a node in the tree.
- `isBalanced()`: Checks if the tree is balanced.
- `rebalance()`: Re-balances the tree.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on [GitHub](https://github.com/LazyEllis/binary-search-tree/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
