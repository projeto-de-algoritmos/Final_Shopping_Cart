class Node {
  constructor(idx, price, cost, weight, next, name) {
    this.idx = idx;
    this.price = price;
    this.cost = cost;
    this.weight = weight;
    this.next = next;
    this.choiced = false;
    this.name = name;
    this.isPath = false;
  }
}

export class Graph {
  constructor(N) {
    this.N = N;
    this.i = 0;
    this.e = 0;
    this.adj = [];

    for (let i = 0; i < N; i++) {
      this.adj.push(null);
    }
  }

  insertEdge(n1, n2, cost) {
    if (!this.adj[n1] || !this.adj[n2]) {
      console.error("n1 ou n2 inexistentes");
      return;
    }

    this.e++;

    const nodeToLink = this.adj[n2];

    this.adj[n1].next = new Node(
      nodeToLink.idx,
      nodeToLink.price,
      cost,
      nodeToLink.weight,
      this.adj[n1].next,
      nodeToLink.name
    );

    this.adj[n2].next = new Node(
      this.adj[n1].idx,
      this.adj[n1].price,
      cost,
      this.adj[n1].weight,
      this.adj[n2].next,
      this.adj[n1].name
    );
  }

  insertNode(price, cost, weight, next, name) {
    this.adj[this.i] = new Node(this.i, price, cost, weight, next, name);
    this.i++;

    return this.i;
  }

  searchNodes(path) {
    for (let i = 0; i < path.length - 1; i++) {
      this.adj[path[i]].choiced = true;
      

    }
  }
}

export class Dijkstra {
  constructor(graph) {
    this.graph = graph;
    this.pa = {};
    this.dist = {};
  }

  createCPT(s) {
    const max = 2147483647;
    const mature = {};

    this.graph.adj.forEach((v) => {
      this.pa[v.idx] = -1;
      this.dist[v.idx] = max;
      mature[v.idx] = false;
    });

    this.pa[s.idx] = s.idx;
    this.dist[s.idx] = 0;

    while (1) {
      let min = max;
      let y;

      this.graph.adj.forEach((n) => {
        if (!mature[n.idx] && this.dist[n.idx] < min) {
          min = this.dist[n.idx];
          y = n.idx;
        }
      });

      if (min === max) break;

      let node = this.graph.adj[y].next;

      while (node) {
        if (
          !mature[node.idx] &&
          node.idx != s.idx &&
          this.dist[y] + node.cost < this.dist[node.idx]
        ) {
          this.dist[node.idx] = this.dist[y] + node.cost;
          this.pa[node.idx] = y;
        }
        node = node.next;
      }

      mature[y] = 1;
    }
  }

  findMinPath(start, end) {
    const max = 2147483647;
    const mature = {};
    const pa = {};
    const dist = {};

    this.graph.adj.forEach((v) => {
      pa[v.idx] = -1;
      dist[v.idx] = max;
      mature[v.idx] = false;
    });

    pa[start.idx] = start.idx;

    dist[start.idx] = 0;

    while (1) {
      let min = max;
      let y;

      this.graph.adj.forEach((n) => {
        if (!mature[n.idx] && dist[n.idx] < min) {
          min = dist[n.idx];
          y = n.idx;
        }
      });

      if (min === max) break;

      let node = this.graph.adj[y].next;

      while (node) {
        if (
          !mature[node.idx] &&
          node.idx != start.idx &&
          dist[y] + node.cost < dist[node.idx]
        ) {
          dist[node.idx] = dist[y] + node.cost;
          pa[node.idx] = y;
        }
        node = node.next;
      }

      if (y === end.idx) {
        break;
      }

      mature[y] = 1;
    }

    const path = [end.idx];
    let parent = pa[end.idx];
    while (parent != start.idx) {
      path.unshift(parent);
      parent = pa[parent];
    }
    path.unshift(start.idx);

    return {
      cost: dist[end.idx],
      path
    }
  }
}

// module.exports = {
//   Graph,
//   Node,
//   Dijkstra,
// };
