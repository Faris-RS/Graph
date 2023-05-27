// Graph representation using an adjacency list
const graph = {};

// Function to insert a node into the graph
function insertNode(node) {
  if (!(node in graph)) {
    graph[node] = [];
    console.log(`Node '${node}' inserted.`);
  } else {
    console.log(`Node '${node}' already exists.`);
  }
}

// Function to insert an edge between two nodes
function insertEdge(node1, node2) {
  if (node1 in graph && node2 in graph) {
    graph[node1].push(node2);
    graph[node2].push(node1);
    console.log(`Edge between '${node1}' and '${node2}' inserted.`);
  } else {
    console.log("One or both nodes do not exist.");
  }
}

// Function to delete a node from the graph
function deleteNode(node) {
  if (node in graph) {
    delete graph[node];
    for (const currentNode in graph) {
      const index = graph[currentNode].indexOf(node);
      if (index !== -1) {
        graph[currentNode].splice(index, 1);
      }
    }
    console.log(`Node '${node}' deleted.`);
  } else {
    console.log(`Node '${node}' does not exist.`);
  }
}

// Function to check if a node exists in the graph
function checkNode(node) {
  if (node in graph) {
    console.log(`Node '${node}' exists in the graph.`);
  } else {
    console.log(`Node '${node}' does not exist in the graph.`);
  }
}


function hasCycle(graph) {
    const visited = {};
  
    function dfs(node, parent) {
      visited[node] = true;
  
      for (const adjacentNode of graph[node]) {
        if (!visited[adjacentNode]) {
          if (dfs(adjacentNode, node)) {
            return true;
          }
        } else if (adjacentNode !== parent) {
          return true;
        }
      }
  
      return false;
    }
  
    for (const node in graph) {
      if (!visited[node]) {
        if (dfs(node, null)) {
          return true;
        }
      }
    }
  
    return false;
  }

// Breadth-First Search (BFS) traversal
function bfs(startNode) {
  if (!(startNode in graph)) {
    console.log(`Node '${startNode}' does not exist.`);
    return;
  }

  const visited = new Set();
  const queue = [];

  visited.add(startNode);
  queue.push(startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift();
    console.log(currentNode);

    for (const adjacentNode of graph[currentNode]) {
      if (!visited.has(adjacentNode)) {
        visited.add(adjacentNode);
        queue.push(adjacentNode);
      }
    }
  }
}

// Depth-First Search (DFS) traversal
function dfs(startNode) {
  if (!(startNode in graph)) {
    console.log(`Node '${startNode}' does not exist.`);
    return;
  }

  const visited = new Set();

  function dfsTraversal(node) {
    visited.add(node);
    console.log(node);

    for (const adjacentNode of graph[node]) {
      if (!visited.has(adjacentNode)) {
        dfsTraversal(adjacentNode);
      }
    }
  }

  dfsTraversal(startNode);
}

// Example usage:
insertNode("A");
insertNode("B");
insertNode("C");
insertNode("D");
insertEdge("A", "B");
insertEdge("B", "C");
insertEdge("C", "D");
insertEdge("D", "A");

console.log(hasCycle(graph)); // Output: true

// deleteNode("B");
// checkNode("C");
// checkNode("E");
// bfs("A");
// dfs("A");
