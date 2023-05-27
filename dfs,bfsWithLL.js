class Node {
  constructor(value) {
    this.value = value;
    this.neighbors = new Map();
  }

  addNeighbor(neighbor, weight = 1) {
    this.neighbors.set(neighbor, weight);
  }

  getNeighbors() {
    return this.neighbors.keys();
  }
}

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addToTail(value) {
    const newNode = new LinkedListNode(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  removeFromHead() {
    if (this.head === null) {
      return null;
    }

    const value = this.head.value;
    this.head = this.head.next;

    if (this.head === null) {
      this.tail = null;
    }

    return value;
  }

  isEmpty() {
    return this.head === null;
  }
}

class Graph {
  constructor() {
    this.nodes = new Map();
  }

  addNode(value) {
    if (!this.nodes.has(value)) {
      const newNode = new Node(value);
      this.nodes.set(value, newNode);
    }
  }

  getNode(value) {
    return this.nodes.get(value);
  }

  addEdge(source, destination, weight = 1) {
    const sourceNode = this.getNode(source);
    const destinationNode = this.getNode(destination);

    if (sourceNode && destinationNode) {
      sourceNode.addNeighbor(destinationNode, weight);
    }
  }

  depthFirstSearch(startValue) {
    const visited = new Map();
    const stack = new LinkedList();

    const startNode = this.getNode(startValue);
    stack.addToTail(startNode);

    while (!stack.isEmpty()) {
      const currentNode = stack.removeFromHead();

      if (!visited.has(currentNode.value)) {
        visited.set(currentNode.value, true);
        console.log(currentNode.value);

        for (const neighbor of currentNode.getNeighbors()) {
          stack.addToTail(neighbor);
        }
      }
    }
  }

  breadthFirstSearch(startValue) {
    const visited = new Map();
    const queue = new LinkedList();

    const startNode = this.getNode(startValue);
    queue.addToTail(startNode);

    while (!queue.isEmpty()) {
      const currentNode = queue.removeFromHead();

      if (!visited.has(currentNode.value)) {
        visited.set(currentNode.value, true);
        console.log(currentNode.value);

        for (const neighbor of currentNode.getNeighbors()) {
          queue.addToTail(neighbor);
        }
      }
    }
  }
}

// Example usage:
const graph = new Graph();

graph.addNode('A');
graph.addNode('B');
graph.addNode('C');
graph.addNode('D');
graph.addNode('E');
graph.addNode('F');
graph.addNode('G');

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'G');


console.log("DFS Traversal:");
graph.depthFirstSearch('A');

console.log("\nBFS Traversal:");
graph.breadthFirstSearch('A');

