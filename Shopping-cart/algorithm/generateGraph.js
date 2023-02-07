import { products } from "./data/products.js";
import { Graph } from "./graph.js";

const retornaNumeroAleatorio = () => {
  return Math.floor((Math.random() * 100) % 30);
}

export default function generateGraph() {
  const graph = new Graph(products.length);

  for (let i = 0; i < products.length; i++) {
    graph.insertNode(products[i].price, null, products[i].weight, null, products[i].name);
    
    if (i > 0) {
      let cost = Math.floor(Math.random() * 100) + 1;
      graph.insertEdge(i, i - 1, cost);
    }
  }

  for (let i = 1; i < products.length; i++) {
    let otherEdge = retornaNumeroAleatorio();

    while (otherEdge == i - 1) {
      otherEdge = retornaNumeroAleatorio();
    }

    let cost = Math.floor(Math.random() * 100) + 1;
    graph.insertEdge(i, otherEdge, cost);

    otherEdge = retornaNumeroAleatorio();
    while (otherEdge == i - 1) {
      otherEdge = retornaNumeroAleatorio();
    }

    cost = Math.floor(Math.random() * 100) + 1;
    graph.insertEdge(i, otherEdge, cost);
  }

  return graph;
}

generateGraph();