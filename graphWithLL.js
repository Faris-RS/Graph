function createGraph() {
  const graph = {};

  function addNode(node) {
    if (!(node in graph)) {
      graph[node] = [];
      console.log(`Node '${node}' added to the graph.`);
    } else {
      console.log(`Node '${node}' already exists in the graph.`);
    }
  }

  function removeNode(node) {
    if (node in graph) {
      delete graph[node];
      for (const currentNode in graph) {
        const index = graph[currentNode].indexOf(node);
        if (index !== -1) {
          graph[currentNode].splice(index, 1);
        }
      }
      console.log(`Node '${node}' removed from the graph.`);
    } else {
      console.log(`Node '${node}' does not exist in the graph.`);
    }
  }

  function addEdge(node1, node2) {
    if (node1 in graph && node2 in graph) {
      graph[node1].push(node2);
      graph[node2].push(node1);
      console.log(`Edge added between '${node1}' and '${node2}'.`);
    } else {
      console.log("One or both nodes do not exist in the graph.");
    }
  }

  function removeEdge(node1, node2) {
    if (node1 in graph && node2 in graph) {
      const index1 = graph[node1].indexOf(node2);
      const index2 = graph[node2].indexOf(node1);
      if (index1 !== -1 && index2 !== -1) {
        graph[node1].splice(index1, 1);
        graph[node2].splice(index2, 1);
        console.log(`Edge removed between '${node1}' and '${node2}'.`);
      } else {
        console.log(`No edge exists between '${node1}' and '${node2}'.`);
      }
    } else {
      console.log("One or both nodes do not exist in the graph.");
    }
  }

  function hasEdge(node1, node2) {
    if (node1 in graph && node2 in graph) {
      return graph[node1].includes(node2);
    }
    return false;
  }

  function bfs(startNode) {
    if (!(startNode in graph)) {
      console.log(`Node '${startNode}' does not exist in the graph.`);
      return;
    }

    const visited = {};
    const queue = [];

    visited[startNode] = true;
    queue.push(startNode);

    while (queue.length > 0) {
      const currentNode = queue.shift();
      console.log(currentNode);

      for (const adjacentNode of graph[currentNode]) {
        if (!visited[adjacentNode]) {
          visited[adjacentNode] = true;
          queue.push(adjacentNode);
        }
      }
    }
  }

  function dfs(startNode) {
    if (!(startNode in graph)) {
      console.log(`Node '${startNode}' does not exist in the graph.`);
      return;
    }

    const visited = {};

    function dfsTraversal(node) {
      visited[node] = true;
      console.log(node);

      for (const adjacentNode of graph[node]) {
        if (!visited[adjacentNode]) {
          dfsTraversal(adjacentNode);
        }
      }
    }

    dfsTraversal(startNode);
  }

  function printGraph() {
    for (const node in graph) {
      const adjacentNodes = graph[node].join(", ");
      console.log(`${node}: ${adjacentNodes}`);
    }
  }

  return {
    addNode,
    removeNode,
    addEdge,
    removeEdge,
    hasEdge,
    bfs,
    dfs,
    printGraph,
  };
}

// Example usage:
const graph = createGraph();
graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
graph.addEdge("A", "B");
graph.addEdge("B", "C");
graph.addEdge("C", "D");
graph.addEdge("D", "A");
graph.addEdge("A", "C");

//   console.log("BFS");
//   console.log("---");
//   graph.bfs("A");
//   console.log(' ');
//   console.log('DFS');
//   console.log("---");
//   graph.dfs("A");
//   console.log("---");

graph.removeNode("C");
graph.printGraph();
