// This algorithm is used to find shortest path between 2 nodes
function createGraph() {
  const graph = {};

  function addNode(node) {
    if (!(node in graph)) {
      graph[node] = {};
      console.log(`Node '${node}' added to the graph.`);
    } else {
      console.log(`Node '${node}' already exists in the graph.`);
    }
  }

  function addEdge(node1, node2, weight) {
    if (node1 in graph && node2 in graph) {
      graph[node1][node2] = weight;
      graph[node2][node1] = weight;
      console.log(
        `Edge added between '${node1}' and '${node2}' with weight ${weight}.`
      );
    } else {
      console.log("One or both nodes do not exist in the graph.");
    }
  }

  function dijkstra(startNode) {
    if (!(startNode in graph)) {
      console.log(`Node '${startNode}' does not exist in the graph.`);
      return;
    }

    const distances = {};
    const visited = {};
    const previous = {};

    for (const node in graph) {
      distances[node] = Infinity;
      visited[node] = false;
      previous[node] = null;
    }

    distances[startNode] = 0;

    while (true) {
      let minDistance = Infinity;
      let closestNode = null;

      for (const node in graph) {
        if (distances[node] < minDistance && !visited[node]) {
          minDistance = distances[node];
          closestNode = node;
        }
      }

      if (closestNode === null) {
        break;
      }

      visited[closestNode] = true;

      for (const neighbor in graph[closestNode]) {
        const distance = graph[closestNode][neighbor];
        const totalDistance = distances[closestNode] + distance;
        if (totalDistance < distances[neighbor]) {
          distances[neighbor] = totalDistance;
          previous[neighbor] = closestNode;
        }
      }
    }

    return { distances, previous };
  }

  return {
    addNode,
    addEdge,
    dijkstra,
  };
}

// Example usage:
const graph = createGraph();
graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
graph.addNode("E");
graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "E", 1);
graph.addEdge("D", "E", 3);
const result = graph.dijkstra("A");
console.log(result.distances); // Output: { A: 0, B: 3, C: 2, D: 4, E: 3 }
console.log(result.previous); // Output: { A: null, B: 'A', C: 'A', D: 'C', E: 'C' }
